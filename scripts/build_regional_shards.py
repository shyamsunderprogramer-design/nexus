import sqlite3
import json
import os
import re

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

def clean_str(s):
    return (s or '').strip()

def main():
    os.makedirs(SHARDS_DIR, exist_ok=True)
    print("Connecting to SQLite database...")
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    query = """
    SELECT 
        id, 
        name, 
        domain, 
        city, 
        state, 
        country, 
        industry, 
        total_employee_estimate, 
        year_founded
    FROM companies 
    WHERE category LIKE '%information technology%' 
       OR category LIKE '%computer software%' 
       OR category LIKE '%internet%'
       OR category LIKE '%telecommunications%'
       OR category LIKE '%semiconductors%'
    ORDER BY total_employee_estimate DESC NULLS LAST
    """

    print("Fetching all 932k+ tech companies...")
    c.execute(query)
    rows = c.fetchall()
    print(f"Total fetched: {len(rows):,}")

    shards = {}

    for r in rows:
        cid, name, domain, city, state, country, industry, emp, year = r
        if not name:
            continue

        c_name = clean_str(name).title()
        c_dom = clean_str(domain)
        c_city = clean_str(city).title()
        raw_state = clean_str(state).lower()
        raw_country = clean_str(country).lower()
        ind = clean_str(industry).title() or 'Software & Services'
        size = emp or 10
        yr = int(float(year)) if year and str(year).replace('.', '', 1).isdigit() else 0

        # Determine shard key
        shard_key = 'global_other'

        is_us = raw_country in ['united states', 'us', 'usa', '']
        if is_us:
            st_code = None
            if raw_state in US_STATE_CODES:
                st_code = US_STATE_CODES[raw_state]
            elif raw_state.upper() in US_STATE_CODES.values():
                st_code = raw_state.upper()
            
            if st_code:
                shard_key = f"us_{st_code.lower()}"
            else:
                shard_key = "us_general"
        elif 'india' in raw_country:
            shard_key = 'in'
        elif 'united kingdom' in raw_country or raw_country == 'gb' or raw_country == 'uk':
            shard_key = 'gb'
        elif 'canada' in raw_country or raw_country == 'ca':
            shard_key = 'ca'
        elif 'germany' in raw_country or raw_country == 'de':
            shard_key = 'de'
        elif 'france' in raw_country or raw_country == 'fr':
            shard_key = 'fr'
        elif 'australia' in raw_country or raw_country == 'au':
            shard_key = 'au'
        elif 'netherlands' in raw_country:
            shard_key = 'nl'
        elif 'spain' in raw_country:
            shard_key = 'es'
        elif 'brazil' in raw_country:
            shard_key = 'br'

        if shard_key not in shards:
            shards[shard_key] = []

        # Compact array item: [name, domain, city, state, country, industry, employees, year]
        iso_country = 'US' if is_us else shard_key.upper()
        shards[shard_key].append([c_name, c_dom, c_city, raw_state.upper(), iso_country, ind, size, yr])

    print(f"Generated {len(shards)} regional shards. Writing files...")

    manifest = {}
    for key, items in shards.items():
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

    print(f"✓ Success! Wrote manifest.json with {len(manifest)} shards.")

if __name__ == '__main__':
    main()
