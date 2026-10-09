import json
import os

input_file = '/Volumes/Storage/D Drive /Rep/companies/data/us-all/records/formd.jsonl'
output_file = '/Volumes/Storage/D Drive /Rep/companies/data/us/companies_grassroots_it.json'

grassroots = []
print(f"Reading from {input_file}...")
count = 0
with open(input_file, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
        except:
            continue
            
        cats = data.get("categories", [])
        subcat = data.get("subcategory", "")
        
        is_it = False
        if cats and "IT" in cats:
            is_it = True
        elif "Technology" in subcat or "Software" in subcat or "Computers" in subcat:
            is_it = True
            
        if is_it:
            grassroots.append({
                "name": data.get("name"),
                "legal_name": data.get("legal_name"),
                "category": "Information Technology",
                "subcategory": subcat.replace("Private-offering filer — ", "") if subcat else "Grassroots Tech Startup",
                "city": data.get("hq_city"),
                "state": data.get("hq_state"),
                "country": "US",
                "description": data.get("description"),
                "ats": "Unknown",
                "careers_url": ""
            })
            if len(grassroots) >= 15000:
                break

os.makedirs(os.path.dirname(output_file), exist_ok=True)
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(grassroots, f, indent=4)

print(f"Extracted {len(grassroots)} grassroots IT/Tech startups.")
