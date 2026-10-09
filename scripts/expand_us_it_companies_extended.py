import json
import os

# Base list of top 50
with open('/Volumes/Storage/D Drive /Rep/companies/data/us/companies_it_us.json', 'r') as f:
    us_it_companies = json.load(f)

# Extended list
extended = [
    # Cybersecurity
    {"name": "Fortinet", "ticker": "FTNT", "category": "Information Technology", "subcategory": "Cybersecurity", "careers_url": "https://www.fortinet.com/corporate/careers", "ats": "Workday", "city": "Sunnyvale", "state": "CA", "employees": "13000"},
    {"name": "Okta", "ticker": "OKTA", "category": "Information Technology", "subcategory": "Identity & Security", "careers_url": "https://www.okta.com/company/careers/", "ats": "Workday", "city": "San Francisco", "state": "CA", "employees": "5000"},
    {"name": "Zscaler", "ticker": "ZS", "category": "Information Technology", "subcategory": "Cybersecurity", "careers_url": "https://www.zscaler.com/careers", "ats": "Jobvite", "city": "San Jose", "state": "CA", "employees": "6000"},
    {"name": "Tenable", "ticker": "TENB", "category": "Information Technology", "subcategory": "Cybersecurity", "careers_url": "https://careers.tenable.com/", "ats": "Greenhouse", "city": "Columbia", "state": "MD", "employees": "1800"},
    {"name": "Mandiant (Google)", "ticker": "Acquired", "category": "Information Technology", "subcategory": "Cybersecurity", "careers_url": "https://careers.google.com/", "ats": "Proprietary", "city": "Reston", "state": "VA", "employees": "3000"},
    {"name": "SentinelOne", "ticker": "S", "category": "Information Technology", "subcategory": "Cybersecurity", "careers_url": "https://www.sentinelone.com/careers/", "ats": "Greenhouse", "city": "Mountain View", "state": "CA", "employees": "2100"},
    {"name": "Rapid7", "ticker": "RPD", "category": "Information Technology", "subcategory": "Cybersecurity", "careers_url": "https://www.rapid7.com/careers/", "ats": "Greenhouse", "city": "Boston", "state": "MA", "employees": "2600"},
    {"name": "Proofpoint", "ticker": "Private", "category": "Information Technology", "subcategory": "Cybersecurity", "careers_url": "https://www.proofpoint.com/us/company/careers", "ats": "Workday", "city": "Sunnyvale", "state": "CA", "employees": "4000"},
    {"name": "Trellix", "ticker": "Private", "category": "Information Technology", "subcategory": "Cybersecurity", "careers_url": "https://www.trellix.com/en-us/about/careers.html", "ats": "Workday", "city": "San Jose", "state": "CA", "employees": "4000"},
    {"name": "F5 Networks", "ticker": "FFIV", "category": "Information Technology", "subcategory": "Cybersecurity & App Delivery", "careers_url": "https://www.f5.com/company/careers", "ats": "Workday", "city": "Seattle", "state": "WA", "employees": "7000"},

    # SaaS & Enterprise Software
    {"name": "Asana", "ticker": "ASAN", "category": "Information Technology", "subcategory": "Work Management", "careers_url": "https://asana.com/jobs", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "1800"},
    {"name": "Smartsheet", "ticker": "SMAR", "category": "Information Technology", "subcategory": "Work Management", "careers_url": "https://www.smartsheet.com/careers", "ats": "Greenhouse", "city": "Bellevue", "state": "WA", "employees": "3300"},
    {"name": "Box", "ticker": "BOX", "category": "Information Technology", "subcategory": "Cloud Content Management", "careers_url": "https://www.box.com/careers", "ats": "Greenhouse", "city": "Redwood City", "state": "CA", "employees": "2400"},
    {"name": "Splunk", "ticker": "Acquired", "category": "Information Technology", "subcategory": "Data Analytics & SecOps", "careers_url": "https://www.splunk.com/en_us/careers.html", "ats": "Workday", "city": "San Francisco", "state": "CA", "employees": "8000"},
    {"name": "Elastic", "ticker": "ESTC", "category": "Information Technology", "subcategory": "Search & Analytics", "careers_url": "https://www.elastic.co/about/careers/", "ats": "Greenhouse", "city": "Mountain View", "state": "CA", "employees": "3000"},
    {"name": "Confluent", "ticker": "CFLT", "category": "Information Technology", "subcategory": "Data Streaming", "careers_url": "https://www.confluent.io/careers/", "ats": "Greenhouse", "city": "Mountain View", "state": "CA", "employees": "2500"},
    {"name": "HashiCorp", "ticker": "HCP", "category": "Information Technology", "subcategory": "Cloud Infrastructure", "careers_url": "https://www.hashicorp.com/jobs", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "2200"},
    {"name": "New Relic", "ticker": "Private", "category": "Information Technology", "subcategory": "Observability", "careers_url": "https://newrelic.com/about/careers", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "2200"},
    {"name": "Datadog", "ticker": "DDOG", "category": "Information Technology", "subcategory": "Cloud Monitoring & Security", "careers_url": "https://careers.datadoghq.com/", "ats": "Greenhouse", "city": "New York", "state": "NY", "employees": "4800"},
    {"name": "Notion", "ticker": "Private", "category": "Information Technology", "subcategory": "Productivity SaaS", "careers_url": "https://www.notion.so/careers", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "500"},
    {"name": "Airtable", "ticker": "Private", "category": "Information Technology", "subcategory": "Low-Code Platform", "careers_url": "https://airtable.com/careers", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "1200"},
    {"name": "Miro", "ticker": "Private", "category": "Information Technology", "subcategory": "Visual Workspace", "careers_url": "https://miro.com/careers/", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "1800"},
    {"name": "Zendesk", "ticker": "Private", "category": "Information Technology", "subcategory": "Customer Service SaaS", "careers_url": "https://jobs.zendesk.com/", "ats": "Workday", "city": "San Francisco", "state": "CA", "employees": "6000"},
    {"name": "Veeva Systems", "ticker": "VEEV", "category": "Information Technology", "subcategory": "Life Sciences Cloud", "careers_url": "https://careers.veeva.com/", "ats": "Jobvite", "city": "Pleasanton", "state": "CA", "employees": "6500"},
    {"name": "Paycom", "ticker": "PAYC", "category": "Information Technology", "subcategory": "HR & Payroll SaaS", "careers_url": "https://careers.paycom.com/", "ats": "Taleo", "city": "Oklahoma City", "state": "OK", "employees": "6300"},
    {"name": "Paylocity", "ticker": "PCTY", "category": "Information Technology", "subcategory": "HR & Payroll SaaS", "careers_url": "https://www.paylocity.com/careers/", "ats": "Workday", "city": "Schaumburg", "state": "IL", "employees": "5500"},
    {"name": "Bill.com", "ticker": "BILL", "category": "Information Technology", "subcategory": "Financial Automation", "careers_url": "https://www.bill.com/about-us/careers", "ats": "Greenhouse", "city": "San Jose", "state": "CA", "employees": "2400"},
    {"name": "Coupa", "ticker": "Private", "category": "Information Technology", "subcategory": "Business Spend Management", "careers_url": "https://careers.coupa.com/", "ats": "Workday", "city": "San Mateo", "state": "CA", "employees": "3000"},
    {"name": "Gusto", "ticker": "Private", "category": "Information Technology", "subcategory": "HR & Payroll SaaS", "careers_url": "https://gusto.com/about/careers", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "2400"},
    {"name": "Rippling", "ticker": "Private", "category": "Information Technology", "subcategory": "HR & IT SaaS", "careers_url": "https://www.rippling.com/careers", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "2000"},

    # FinTech & Payments
    {"name": "PayPal", "ticker": "PYPL", "category": "Information Technology", "subcategory": "Digital Payments", "careers_url": "https://careers.paypal.com/", "ats": "Workday", "city": "San Jose", "state": "CA", "employees": "29900"},
    {"name": "Mastercard", "ticker": "MA", "category": "Information Technology", "subcategory": "Payment Tech", "careers_url": "https://careers.mastercard.com/", "ats": "Workday", "city": "Purchase", "state": "NY", "employees": "29900"},
    {"name": "Visa", "ticker": "V", "category": "Information Technology", "subcategory": "Payment Tech", "careers_url": "https://www.visa.com/careers", "ats": "SmartRecruiters", "city": "San Francisco", "state": "CA", "employees": "26500"},
    {"name": "Robinhood", "ticker": "HOOD", "category": "Information Technology", "subcategory": "Fintech & Investing", "careers_url": "https://careers.robinhood.com/", "ats": "Greenhouse", "city": "Menlo Park", "state": "CA", "employees": "3200"},
    {"name": "Affirm", "ticker": "AFRM", "category": "Information Technology", "subcategory": "Fintech & BNPL", "careers_url": "https://www.affirm.com/careers", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "2200"},
    {"name": "SoFi", "ticker": "SOFI", "category": "Information Technology", "subcategory": "Fintech & Banking", "careers_url": "https://www.sofi.com/careers/", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "4200"},
    {"name": "Plaid", "ticker": "Private", "category": "Information Technology", "subcategory": "Fintech Infrastructure", "careers_url": "https://plaid.com/careers/", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "1100"},
    {"name": "Chime", "ticker": "Private", "category": "Information Technology", "subcategory": "Neobank", "careers_url": "https://www.chime.com/careers/", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "1300"},
    {"name": "Brex", "ticker": "Private", "category": "Information Technology", "subcategory": "Corporate Cards & Spend", "careers_url": "https://www.brex.com/careers", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "1100"},
    {"name": "Marqeta", "ticker": "MQ", "category": "Information Technology", "subcategory": "Card Issuing Platform", "careers_url": "https://www.marqeta.com/careers", "ats": "Greenhouse", "city": "Oakland", "state": "CA", "employees": "900"},
    {"name": "Toast", "ticker": "TOST", "category": "Information Technology", "subcategory": "Restaurant Tech & POS", "careers_url": "https://careers.toasttab.com/", "ats": "Greenhouse", "city": "Boston", "state": "MA", "employees": "4500"},

    # Developer Tools & Open Source
    {"name": "GitLab", "ticker": "GTLB", "category": "Information Technology", "subcategory": "DevOps Platform", "careers_url": "https://about.gitlab.com/jobs/", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "2100"},
    {"name": "GitHub (Microsoft)", "ticker": "Acquired", "category": "Information Technology", "subcategory": "Developer Tools", "careers_url": "https://github.com/about/careers", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "3000"},
    {"name": "Vercel", "ticker": "Private", "category": "Information Technology", "subcategory": "Frontend Cloud", "careers_url": "https://vercel.com/careers", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "500"},
    {"name": "Supabase", "ticker": "Private", "category": "Information Technology", "subcategory": "Backend-as-a-Service", "careers_url": "https://supabase.com/careers", "ats": "Ashby", "city": "Remote", "state": "US", "employees": "150"},
    {"name": "Netlify", "ticker": "Private", "category": "Information Technology", "subcategory": "Web Development Platform", "careers_url": "https://www.netlify.com/careers/", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "300"},
    {"name": "Docker", "ticker": "Private", "category": "Information Technology", "subcategory": "Containerization", "careers_url": "https://www.docker.com/careers/", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "600"},
    {"name": "CircleCI", "ticker": "Private", "category": "Information Technology", "subcategory": "CI/CD Platform", "careers_url": "https://circleci.com/careers/", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "700"},
    {"name": "Auth0 (Okta)", "ticker": "Acquired", "category": "Information Technology", "subcategory": "Identity API", "careers_url": "https://auth0.com/careers", "ats": "Workday", "city": "Bellevue", "state": "WA", "employees": "1000"},
    {"name": "Hugging Face", "ticker": "Private", "category": "Information Technology", "subcategory": "AI / ML Hub", "careers_url": "https://huggingface.co/careers", "ats": "Ashby", "city": "New York", "state": "NY", "employees": "170"},
    {"name": "Scale AI", "ticker": "Private", "category": "Information Technology", "subcategory": "AI Data Platform", "careers_url": "https://scale.com/careers", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "700"},

    # Travel, Real Estate & Marketplaces
    {"name": "Expedia Group", "ticker": "EXPE", "category": "Information Technology", "subcategory": "Travel Tech", "careers_url": "https://careers.expediagroup.com/", "ats": "Workday", "city": "Seattle", "state": "WA", "employees": "16500"},
    {"name": "Zillow", "ticker": "ZG", "category": "Information Technology", "subcategory": "Real Estate Tech", "careers_url": "https://zillow.wd5.myworkdayjobs.com/Zillow_Group", "ats": "Workday", "city": "Seattle", "state": "WA", "employees": "5700"},
    {"name": "Redfin", "ticker": "RDFN", "category": "Information Technology", "subcategory": "Real Estate Tech", "careers_url": "https://www.redfin.com/about/jobs", "ats": "Workday", "city": "Seattle", "state": "WA", "employees": "4000"},
    {"name": "Instacart", "ticker": "CART", "category": "Information Technology", "subcategory": "Grocery Tech", "careers_url": "https://careers.instacart.com/", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "3400"},
    {"name": "DoorDash", "ticker": "DASH", "category": "Information Technology", "subcategory": "Logistics & Delivery Tech", "careers_url": "https://careers.doordash.com/", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "8600"},
    {"name": "Lyft", "ticker": "LYFT", "category": "Information Technology", "subcategory": "Ride-Hailing Tech", "careers_url": "https://www.lyft.com/careers", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "4000"},
    {"name": "Wayfair", "ticker": "W", "category": "Information Technology", "subcategory": "E-Commerce Tech", "careers_url": "https://www.wayfair.com/careers", "ats": "Workday", "city": "Boston", "state": "MA", "employees": "15000"},
    {"name": "Etsy", "ticker": "ETSY", "category": "Information Technology", "subcategory": "E-Commerce Tech", "careers_url": "https://careers.etsy.com/", "ats": "Greenhouse", "city": "Brooklyn", "state": "NY", "employees": "2700"},
    {"name": "eBay", "ticker": "EBAY", "category": "Information Technology", "subcategory": "E-Commerce Marketplace", "careers_url": "https://careers.ebayinc.com/", "ats": "Workday", "city": "San Jose", "state": "CA", "employees": "11600"},
    {"name": "Chewy", "ticker": "CHWY", "category": "Information Technology", "subcategory": "E-Commerce Tech", "careers_url": "https://careers.chewy.com/", "ats": "Greenhouse", "city": "Plantation", "state": "FL", "employees": "19000"},

    # Telecom, Hardware & Infrastructure
    {"name": "HP Inc.", "ticker": "HPQ", "category": "Information Technology", "subcategory": "Hardware & Computers", "careers_url": "https://jobs.hp.com/", "ats": "Workday", "city": "Palo Alto", "state": "CA", "employees": "58000"},
    {"name": "Hewlett Packard Enterprise", "ticker": "HPE", "category": "Information Technology", "subcategory": "Enterprise Hardware & Cloud", "careers_url": "https://careers.hpe.com/", "ats": "Workday", "city": "Spring", "state": "TX", "employees": "60000"},
    {"name": "Dell Technologies", "ticker": "DELL", "category": "Information Technology", "subcategory": "Hardware & Cloud", "careers_url": "https://jobs.dell.com/", "ats": "Workday", "city": "Round Rock", "state": "TX", "employees": "133000"},
    {"name": "Western Digital", "ticker": "WDC", "category": "Information Technology", "subcategory": "Data Storage", "careers_url": "https://careers.westerndigital.com/", "ats": "Workday", "city": "San Jose", "state": "CA", "employees": "65000"},
    {"name": "Seagate Technology", "ticker": "STX", "category": "Information Technology", "subcategory": "Data Storage", "careers_url": "https://www.seagate.com/jobs/", "ats": "Taleo", "city": "Fremont", "state": "CA", "employees": "40000"},
    {"name": "Micron Technology", "ticker": "MU", "category": "Information Technology", "subcategory": "Semiconductors & Memory", "careers_url": "https://careers.micron.com/", "ats": "SuccessFactors", "city": "Boise", "state": "ID", "employees": "48000"},
    {"name": "Texas Instruments", "ticker": "TXN", "category": "Information Technology", "subcategory": "Semiconductors", "careers_url": "https://careers.ti.com/", "ats": "Taleo", "city": "Dallas", "state": "TX", "employees": "33000"},
    {"name": "Analog Devices", "ticker": "ADI", "category": "Information Technology", "subcategory": "Semiconductors", "careers_url": "https://careers.analog.com/", "ats": "Workday", "city": "Wilmington", "state": "MA", "employees": "24000"},
    {"name": "Broadcom", "ticker": "AVGO", "category": "Information Technology", "subcategory": "Semiconductors & Infrastructure", "careers_url": "https://broadcom.com/company/careers", "ats": "Workday", "city": "San Jose", "state": "CA", "employees": "20000"},
    {"name": "Juniper Networks", "ticker": "JNPR", "category": "Information Technology", "subcategory": "Networking", "careers_url": "https://careers.juniper.net/", "ats": "Jobvite", "city": "Sunnyvale", "state": "CA", "employees": "11000"},
    {"name": "Arista Networks", "ticker": "ANET", "category": "Information Technology", "subcategory": "Cloud Networking", "careers_url": "https://www.arista.com/en/careers", "ats": "Jobvite", "city": "Santa Clara", "state": "CA", "employees": "3200"},
    {"name": "Equinix", "ticker": "EQIX", "category": "Information Technology", "subcategory": "Data Centers", "careers_url": "https://careers.equinix.com/", "ats": "Workday", "city": "Redwood City", "state": "CA", "employees": "12000"},

    # EdTech & HealthTech
    {"name": "Coursera", "ticker": "COUR", "category": "Information Technology", "subcategory": "EdTech", "careers_url": "https://about.coursera.org/careers", "ats": "Greenhouse", "city": "Mountain View", "state": "CA", "employees": "1100"},
    {"name": "Duolingo", "ticker": "DUOL", "category": "Information Technology", "subcategory": "EdTech", "careers_url": "https://careers.duolingo.com/", "ats": "Greenhouse", "city": "Pittsburgh", "state": "PA", "employees": "500"},
    {"name": "Udemy", "ticker": "UDMY", "category": "Information Technology", "subcategory": "EdTech", "careers_url": "https://about.udemy.com/careers/", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "1400"},
    {"name": "Guild Education", "ticker": "Private", "category": "Information Technology", "subcategory": "EdTech", "careers_url": "https://www.guildeducation.com/careers/", "ats": "Greenhouse", "city": "Denver", "state": "CO", "employees": "1200"},
    {"name": "Teladoc Health", "ticker": "TDOC", "category": "Information Technology", "subcategory": "HealthTech", "careers_url": "https://teladochealth.com/about/careers/", "ats": "Workday", "city": "Purchase", "state": "NY", "employees": "5100"},
    {"name": "Veeva Systems", "ticker": "VEEV", "category": "Information Technology", "subcategory": "HealthTech Cloud", "careers_url": "https://careers.veeva.com/", "ats": "Jobvite", "city": "Pleasanton", "state": "CA", "employees": "6500"},
    {"name": "Doximity", "ticker": "DOCS", "category": "Information Technology", "subcategory": "HealthTech Networking", "careers_url": "https://workat.doximity.com/", "ats": "Greenhouse", "city": "San Francisco", "state": "CA", "employees": "900"},
    {"name": "Ro", "ticker": "Private", "category": "Information Technology", "subcategory": "HealthTech Telemedicine", "careers_url": "https://ro.co/careers/", "ats": "Greenhouse", "city": "New York", "state": "NY", "employees": "700"},
    
    # Marketing & Creative SaaS
    {"name": "Klaviyo", "ticker": "KVYO", "category": "Information Technology", "subcategory": "Marketing Automation", "careers_url": "https://www.klaviyo.com/careers", "ats": "Greenhouse", "city": "Boston", "state": "MA", "employees": "1500"},
    {"name": "Mailchimp (Intuit)", "ticker": "Acquired", "category": "Information Technology", "subcategory": "Marketing Automation", "careers_url": "https://mailchimp.com/about/jobs/", "ats": "Greenhouse", "city": "Atlanta", "state": "GA", "employees": "1200"},
    {"name": "Hootsuite", "ticker": "Private", "category": "Information Technology", "subcategory": "Social Media Management", "careers_url": "https://careers.hootsuite.com/", "ats": "Greenhouse", "city": "Vancouver", "state": "BC", "employees": "1000"}, # Though BC, huge US presence
    {"name": "Sprout Social", "ticker": "SPT", "category": "Information Technology", "subcategory": "Social Media SaaS", "careers_url": "https://sproutsocial.com/careers/", "ats": "Greenhouse", "city": "Chicago", "state": "IL", "employees": "1200"},
    {"name": "Yext", "ticker": "YEXT", "category": "Information Technology", "subcategory": "Digital Presence SaaS", "careers_url": "https://www.yext.com/careers", "ats": "Greenhouse", "city": "New York", "state": "NY", "employees": "1300"},
    
    # IT Services & Consulting
    {"name": "Cognizant", "ticker": "CTSH", "category": "Information Technology", "subcategory": "IT Services & Consulting", "careers_url": "https://careers.cognizant.com/global/en", "ats": "Taleo", "city": "Teaneck", "state": "NJ", "employees": "355000"},
    {"name": "EPAM Systems", "ticker": "EPAM", "category": "Information Technology", "subcategory": "Software Engineering Services", "careers_url": "https://www.epam.com/careers", "ats": "SmartRecruiters", "city": "Newtown", "state": "PA", "employees": "59000"},
    {"name": "Gartner", "ticker": "IT", "category": "Information Technology", "subcategory": "IT Research & Advisory", "careers_url": "https://jobs.gartner.com/", "ats": "Avature", "city": "Stamford", "state": "CT", "employees": "19000"}
]

for company in extended:
    company["country"] = "US"

us_it_companies.extend(extended)

with open('/Volumes/Storage/D Drive /Rep/companies/data/us/companies_it_us.json', 'w') as f:
    json.dump(us_it_companies, f, indent=4)
print(f"Generated {len(us_it_companies)} US IT companies.")
