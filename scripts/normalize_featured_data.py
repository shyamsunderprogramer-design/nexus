import json
import os

INPUT_PATH = 'public/data/companies_featured.json'

def normalize_category(c):
    raw = ((c.get('category') or '') + ' ' + (c.get('subcategory') or '')).lower()
    if any(k in raw for k in ['software', 'information technology', 'internet', 'computer', 'semiconductor', 'tech', 'data']):
        return 'Information Technology'
    if any(k in raw for k in ['financial', 'banking', 'insurance', 'accounting', 'investment', 'fintech']):
        return 'Banking & Financial Services'
    if any(k in raw for k in ['health', 'hospital', 'pharma', 'medical', 'biotech']):
        return 'Healthcare & Pharmaceuticals'
    if any(k in raw for k in ['automotive', 'manufacturing', 'mechanical', 'industrial', 'engineering']):
        return 'Automotive & Manufacturing'
    if any(k in raw for k in ['education', 'e-learning', 'school', 'university', 'college']):
        return 'Education & EdTech'
    if any(k in raw for k in ['real estate', 'construction', 'architecture']):
        return 'Infrastructure & Real Estate'
    if any(k in raw for k in ['oil', 'energy', 'mining', 'metals', 'utilities', 'power']):
        return 'Energy & Natural Resources'
    if any(k in raw for k in ['telecom', 'wireless']):
        return 'Telecommunications'
    if any(k in raw for k in ['entertainment', 'media', 'broadcast', 'music', 'gaming', 'film']):
        return 'Media, Gaming & Entertainment'
    if any(k in raw for k in ['retail', 'apparel', 'fashion', 'consumer goods', 'fmcg', 'food', 'supermarket']):
        return 'Retail & Fashion Apparel'
    if any(k in raw for k in ['logistics', 'transport', 'freight', 'supply chain', 'trucking']):
        return 'Logistics & Supply Chain'
    return 'Other Industries'

def normalize_country(c):
    raw = (c.get('country') or '').strip().upper()
    if not raw or raw in ['US', 'UNITED STATES', 'USA']:
        return 'US'
    if raw in ['IN', 'INDIA']:
        return 'IN'
    if raw in ['GB', 'UNITED KINGDOM', 'UK', 'ENGLAND', 'GREAT BRITAIN']:
        return 'GB'
    if raw in ['CA', 'CANADA']:
        return 'CA'
    if raw in ['DE', 'GERMANY', 'DEUTSCHLAND']:
        return 'DE'
    if raw in ['AU', 'AUSTRALIA']:
        return 'AU'
    if raw in ['FR', 'FRANCE']:
        return 'FR'
    return raw

def main():
    print("Loading companies_featured.json...")
    with open(INPUT_PATH, 'r') as f:
        companies = json.load(f)
    print(f"Loaded {len(companies):,} companies.")
    
    normalized = []
    for c in companies:
        name = c.get('name') or 'Enterprise Organization'
        if name.islower():
            name = name.title()
            
        norm_cat = normalize_category(c)
        norm_country = normalize_country(c)
        
        c['name'] = name
        c['category'] = norm_cat
        c['country'] = norm_country
        
        # Ensure careers_url
        if not c.get('careers_url') and c.get('website'):
            c['careers_url'] = c['website']
            
        normalized.append(c)
        
    print("Saving normalized data to public and app directories...")
    with open('public/data/companies_featured.json', 'w') as f:
        json.dump(normalized, f)
        
    with open('app/data/companies_featured.json', 'w') as f:
        json.dump(normalized, f)
        
    size_mb = os.path.getsize('public/data/companies_featured.json') / (1024 * 1024)
    print(f"✓ Success! Cleaned and normalized {len(normalized):,} companies. File size: {size_mb:.2f} MB")

if __name__ == '__main__':
    main()
