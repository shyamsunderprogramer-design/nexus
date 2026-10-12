import sqlite3
import json
import os

DB_PATH = 'app/data/nexus.sqlite'
OUT_PUBLIC = 'public/data/tech_directory_massive.json'
OUT_APP = 'app/data/tech_directory_massive.json'

def main():
    print("Extracting all 932k+ grassroots & enterprise tech companies from SQLite...")
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    
    query = """
    SELECT 
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
       OR category LIKE '%computer hardware%'
       OR category LIKE '%semiconductors%'
       OR category LIKE '%computer networking%'
    ORDER BY total_employee_estimate DESC NULLS LAST
    """
    
    c.execute(query)
    rows = c.fetchall()
    print(f"Fetched {len(rows):,} tech companies.")
    
    formatted = []
    for r in rows:
        name = r[0].title() if r[0] else 'Tech Entity'
        domain = r[1] or ''
        city = r[2].title() if r[2] else ''
        state = r[3].upper() if r[3] else ''
        country = 'US' if (r[4] in ['united states', 'United States', 'us', None]) else (r[4].upper() if r[4] else 'US')
        industry = (r[5] or 'Technology').title()
        size = r[6] or 10
        year = int(float(r[7])) if r[7] and str(r[7]).replace('.', '', 1).isdigit() else 0
        
        # Ultra compact array: [name, domain, city, state, country, industry, size, year]
        formatted.append([name, domain, city, state, country, industry, size, year])
        
    print(f"Writing to {OUT_PUBLIC}...")
    os.makedirs(os.path.dirname(OUT_PUBLIC), exist_ok=True)
    with open(OUT_PUBLIC, 'w') as f:
        json.dump(formatted, f, separators=(',', ':'))
        
    print(f"Writing to {OUT_APP}...")
    os.makedirs(os.path.dirname(OUT_APP), exist_ok=True)
    with open(OUT_APP, 'w') as f:
        json.dump(formatted, f, separators=(',', ':'))
        
    size_mb = os.path.getsize(OUT_PUBLIC) / (1024 * 1024)
    print(f"✓ Success! Generated {len(formatted):,} tech companies. File size: {size_mb:.2f} MB")

if __name__ == '__main__':
    main()
