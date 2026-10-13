import sqlite3
import json
import os
import sys
import time

DB_PATH = 'app/data/nexus.sqlite'
SHARDS_DIR = 'public/data/shards'

US_STATE_CODES = {
    'alabama': 'AL', 'alaska': 'AK', 'arizona': 'AZ', 'arkansas': 'AR', 'california': 'CA',
    'colorado': 'CO', 'connecticut': 'CT', 'delaware': 'DE', 'florida': 'FL', 'georgia': 'GA',
    'hawaii': 'HI', 'idaho': 'ID', 'illinois': 'IL', 'indiana': 'IN', 'iowa': 'IA',
    'kansas': 'KS', 'kentucky': 'KY', 'louisiana': 'LA', 'maine': 'ME', 'maryland': 'MD',
    'massachusetts': 'MA', 'michigan': 'MI', 'minnesota': 'MN', 'mississippi': 'MS', 'missouri': 'MO',
    'montana': 'MT', 'nebraska': 'NE', 'nevada': 'NV', 'new hampshire': 'NH', 'new jersey': 'NJ',
    'new mexico': 'NM', 'new york': 'NY', 'north carolina': 'NC', 'north dakota': 'ND', 'ohio': 'OH',
    'oklahoma': 'OK', 'oregon': 'OR', 'pennsylvania': 'PA', 'rhode island': 'RI', 'south carolina': 'SC',
    'south dakota': 'SD', 'tennessee': 'TN', 'texas': 'TX', 'utah': 'UT', 'vermont': 'VT',
    'virginia': 'VA', 'washington': 'WA', 'west virginia': 'WV', 'wisconsin': 'WI', 'wyoming': 'WY',
    'district of columbia': 'DC'
}

COUNTRY_MAP = {
    'united kingdom': 'gb', 'gb': 'gb', 'uk': 'gb',
    'canada': 'ca', 'ca': 'ca',
    'india': 'in', 'in': 'in',
    'netherlands': 'nl', 'nl': 'nl',
    'spain': 'es', 'es': 'es',
    'germany': 'de', 'de': 'de',
    'australia': 'au', 'au': 'au',
    'brazil': 'br', 'br': 'br',
    'france': 'fr', 'fr': 'fr',
    'italy': 'it', 'it': 'it'
}

def clean_str(s):
    return (s or '').strip()

def classify(raw_cat):
    if not raw_cat:
        return 11
    c = raw_cat.lower()
    if 'telecommunication' in c:
        return 9
    if any(k in c for k in ['information technology', 'computer software', 'internet', 'semiconductor']):
        return 0
    if any(k in c for k in ['financial', 'banking', 'insurance', 'investment', 'accounting']):
        return 1
    if any(k in c for k in ['health', 'hospital', 'medical', 'pharmaceutical', 'biotechnology', 'wellness']):
        return 2
    if any(k in c for k in ['education', 'e-learning', 'higher education', 'teaching']):
        return 3
    if any(k in c for k in ['retail', 'apparel', 'consumer goods', 'supermarket', 'fashion', 'cosmetics']):
        return 4
    if any(k in c for k in ['automotive', 'manufacturing', 'mechanical', 'industrial', 'aviation', 'aerospace']):
        return 5
    if any(k in c for k in ['construction', 'real estate', 'civil engineering', 'architecture', 'building']):
        return 6
    if any(k in c for k in ['energy', 'oil', 'utilities', 'mining', 'renewables', 'solar']):
        return 7
    if any(k in c for k in ['media', 'entertainment', 'broadcast', 'music', 'animation', 'games', 'publishing']):
        return 8
    if any(k in c for k in ['logistics', 'supply chain', 'transportation', 'freight', 'warehousing', 'shipping']):
        return 10
    return 11

def main():
    os.makedirs(SHARDS_DIR, exist_ok=True)
    print(f"Connecting to {DB_PATH}...")
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    print("Querying verified companies with domains...")
    query = """
    SELECT 
        name, 
        domain, 
        city, 
        state, 
        country, 
        category, 
        industry, 
        total_employee_estimate, 
        year_founded
    FROM companies 
    WHERE domain IS NOT NULL AND domain != ''
    ORDER BY total_employee_estimate DESC NULLS LAST
    """
    
    t0 = time.time()
    c.execute(query)
    
    shards = {}
    total_processed = 0
    total_sharded = 0

    while True:
        rows = c.fetchmany(50000)
        if not rows:
            break
        
        for r in rows:
            total_processed += 1
            name, domain, city, state, country, category, industry, emp, year = r
            if not name or not domain:
                continue

            c_name = clean_str(name).title()
            c_dom = clean_str(domain)
            c_city = clean_str(city).title()
            raw_state = clean_str(state).lower()
            raw_country = clean_str(country).lower()
            ind = clean_str(industry).title() or 'Enterprise'
            size = emp or 10
            yr = int(float(year)) if year and str(year).replace('.', '', 1).isdigit() else 0
            cat_idx = classify(category or industry)

            shard_key = None
            iso_country = 'US'
            st_code = ''

            is_us = raw_country in ['united states', 'us', 'usa', '']
            if is_us:
                if raw_state in US_STATE_CODES:
                    st_code = US_STATE_CODES[raw_state]
                elif raw_state.upper() in US_STATE_CODES.values():
                    st_code = raw_state.upper()

                if st_code:
                    shard_key = f"us_{st_code.lower()}"
                else:
                    shard_key = "us_general"
                iso_country = 'US'
            else:
                for k, v in COUNTRY_MAP.items():
                    if k in raw_country:
                        shard_key = v
                        iso_country = v.upper()
                        break

            if not shard_key:
                continue

            # Limit us_general to top 50,000 to keep file size reasonable
            if shard_key == 'us_general' and len(shards.get(shard_key, [])) >= 50000:
                continue

            if shard_key not in shards:
                shards[shard_key] = []

            # Compact array: [name, domain, city, state, country, catIndex, subcategory, employees, year]
            shards[shard_key].append([c_name, c_dom, c_city, st_code or raw_state.upper(), iso_country, cat_idx, ind, size, yr])
            total_sharded += 1

        print(f"Processed {total_processed:,} rows, sharded {total_sharded:,} companies into {len(shards)} shards...")

    print(f"\nFinished parsing in {time.time()-t0:.1f}s. Writing shard files...")

    manifest = {}
    for key, items in sorted(shards.items(), key=lambda x: -len(x[1])):
        file_name = f"{key}.json"
        file_path = os.path.join(SHARDS_DIR, file_name)
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(items, f, separators=(',', ':'))

        size_kb = os.path.getsize(file_path) / 1024
        manifest[key] = {
            "file": file_name,
            "count": len(items),
            "size_kb": round(size_kb, 1)
        }
        print(f"  ✓ {file_name}: {len(items):,} companies ({size_kb/1024:.2f} MB)")

    manifest_path = os.path.join(SHARDS_DIR, 'manifest.json')
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2)

    print(f"\n✓ Complete! Wrote manifest.json with {len(manifest)} shards ({total_sharded:,} total companies).")

if __name__ == '__main__':
    main()
