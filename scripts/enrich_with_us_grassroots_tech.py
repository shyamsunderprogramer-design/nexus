import sqlite3
import json
import os

DB_PATH = 'app/data/nexus.sqlite'
FEATURED_PATH = 'public/data/companies_featured.json'

def main():
    print("Loading existing normalized companies...")
    with open(FEATURED_PATH, 'r') as f:
        existing = json.load(f)
    print(f"Current count: {len(existing):,}")
    
    existing_domains = set((c.get('website') or '').lower().replace('https://', '').replace('http://', '').strip('/') for c in existing if c.get('website'))
    existing_names = set((c.get('name') or '').lower() for c in existing)
    
    print("Fetching US grassroots IT companies from SQLite...")
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
    WHERE (category LIKE '%information technology%' 
       OR category LIKE '%computer software%' 
       OR category LIKE '%internet%'
       OR category LIKE '%telecommunications%'
       OR category LIKE '%semiconductors%')
      AND (country = 'united states' OR country = 'United States' OR country = 'us' OR country IS NULL)
      AND name IS NOT NULL
      AND domain IS NOT NULL
    ORDER BY total_employee_estimate DESC NULLS LAST
    LIMIT 100000
    """
    
    c.execute(query)
    rows = c.fetchall()
    print(f"Candidate tech companies: {len(rows):,}")
    
    added = 0
    for r in rows:
        dom = (r[2] or '').lower().strip('/')
        name = (r[1] or '').strip().title()
        
        if dom in existing_domains or name.lower() in existing_names:
            continue
            
        emp = r[7] or 15
        year = int(float(r[8])) if r[8] and str(r[8]).replace('.', '', 1).isdigit() else 0
        desc = f"{r[6].title() if r[6] else 'Technology'} company employing ~{emp:,} professionals{f', founded in {year}' if year else ''}."
        
        existing.append({
            'oid': f"kg_us_{r[0]}",
            'name': name,
            'legal_name': r[1],
            'category': 'Information Technology',
            'subcategory': (r[6] or 'Software & Services').title(),
            'state': r[4].upper() if r[4] else 'US',
            'city': r[3].title() if r[3] else 'HQ',
            'country': 'US',
            'website': f"https://{dom}" if dom else None,
            'careers_url': f"https://{dom}" if dom else None,
            'employees_approx': emp,
            'description': desc,
            'verified': True,
            'source': 'US Grassroots IT Registry'
        })
        existing_domains.add(dom)
        existing_names.add(name.lower())
        added += 1
        
        if len(existing) >= 180000:
            break
            
    print(f"Added {added:,} new grassroots tech companies. Total: {len(existing):,}")
    
    print("Writing compact JSON to public and app data...")
    with open('public/data/companies_featured.json', 'w') as f:
        json.dump(existing, f, separators=(',', ':'))
        
    with open('app/data/companies_featured.json', 'w') as f:
        json.dump(existing, f, separators=(',', ':'))
        
    size_mb = os.path.getsize('public/data/companies_featured.json') / (1024 * 1024)
    print(f"✓ Saved! Total: {len(existing):,} companies. File size: {size_mb:.2f} MB")

if __name__ == '__main__':
    main()
