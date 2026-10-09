import csv, json
import os

input_file = '/Volumes/Storage/D Drive /Rep/AI_Assistant_Job_Applier/data_engineering/companies/companies_sorted.csv'
out_data = []

with open(input_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for i, row in enumerate(reader):
        if i >= 100000:
            break
        # only keep essential fields
        out_data.append({
            "name": row['name'].title(),
            "category": row['industry'].title() if row['industry'] else "General",
            "city": row['locality'].title() if row['locality'] else "",
            "country": row['country'].upper() if row['country'] else "",
            "employees": row['current employee estimate'],
            "website": row['domain']
        })

output_file = 'app/data/companies_featured_test.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(out_data, f, separators=(',', ':'))

print(f"Size of 100k companies JSON: {os.path.getsize(output_file) / (1024*1024):.2f} MB")
