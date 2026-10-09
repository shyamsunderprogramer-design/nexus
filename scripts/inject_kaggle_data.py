import json
import csv
import os

app_data_file = 'app/data/companies_featured.json'
kaggle_file = '/Volumes/Storage/D Drive /Rep/AI_Assistant_Job_Applier/data_engineering/companies/companies_sorted.csv'

print(f"Loading existing curated companies from {app_data_file}...")
with open(app_data_file, 'r', encoding='utf-8') as f:
    existing_companies = json.load(f)

print(f"Initially loaded {len(existing_companies)} curated companies.")

# Track existing names to avoid duplicates
existing_names = set(c.get('name', '').lower().strip() for c in existing_companies if c.get('name'))
existing_domains = set(c.get('website', '').lower().strip() for c in existing_companies if c.get('website'))

print("Reading Kaggle dataset...")
new_companies = []
with open(kaggle_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for i, row in enumerate(reader):
        name = row.get('name', '').strip()
        domain = row.get('domain', '').strip()
        
        if not name: continue
        
        # Check for duplicates
        if name.lower() in existing_names:
            continue
        if domain and domain.lower() in existing_domains:
            continue
            
        industry = row.get('industry', 'General').title()
        city = row.get('locality', '').title()
        country_str = row.get('country', '').upper()
        if 'UNITED STATES' in country_str: country_str = 'US'
        elif 'INDIA' in country_str: country_str = 'IN'
        elif 'UNITED KINGDOM' in country_str: country_str = 'GB'
        elif 'CANADA' in country_str: country_str = 'CA'
        
        comp = {
            "name": name.title(),
            "category": industry,
            "city": city,
            "country": country_str,
            "employees": row.get('current employee estimate'),
            "website": f"https://www.{domain}" if domain else ""
        }
        
        new_companies.append(comp)
        existing_names.add(name.lower())
        if domain: existing_domains.add(domain.lower())
        
        if len(new_companies) >= 130000:  # Add 130k top companies
            break

print(f"Found {len(new_companies)} new companies from Kaggle dataset.")
combined = existing_companies + new_companies

print(f"Saving a total of {len(combined)} companies to {app_data_file}...")
with open(app_data_file, 'w', encoding='utf-8') as f:
    json.dump(combined, f, separators=(',', ':'))

# Also update the js bundle
bundle_path = 'app/data/nexus_bundle.js'
print(f"Updating {bundle_path}...")
with open(bundle_path, 'r', encoding='utf-8') as f:
    bundle_content = f.read()

# This is tricky since bundle is a js file. We will just rewrite the bundle.
