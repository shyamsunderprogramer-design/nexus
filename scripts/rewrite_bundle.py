import json
import os

with open('app/data/stats.json', 'r') as f: stats = json.load(f)
with open('app/data/state_bridge.json', 'r') as f: state_bridge = json.load(f)
with open('app/data/universities.json', 'r') as f: universities = json.load(f)
with open('app/data/companies_featured.json', 'r') as f: companies = json.load(f)

bundle_path = 'app/data/nexus_bundle.js'
with open(bundle_path, "w", encoding="utf-8") as f:
    f.write("window.NEXUS_DATA = {\n")
    f.write("  stats: " + json.dumps(stats, separators=(',', ':')) + ",\n")
    f.write("  bridge: " + json.dumps(state_bridge, separators=(',', ':')) + ",\n")
    f.write("  universities: " + json.dumps(universities, separators=(',', ':')) + ",\n")
    f.write("  companies: " + json.dumps(companies, separators=(',', ':')) + "\n")
    f.write("};\n")
    f.write("console.log('Nexus bundle loaded successfully:', Object.keys(window.NEXUS_DATA));\n")
