import sqlite3
import pandas as pd
import json
import os
import time

DB_PATH = 'app/data/nexus.sqlite'
CSV_PATH = '/Volumes/Storage/D Drive /Rep/AI_Assistant_Job_Applier/data_engineering/companies/companies_sorted.csv'

def main():
    print(f"Building SQLite database at {DB_PATH} from {CSV_PATH}")
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)
        
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        domain TEXT,
        year_founded TEXT,
        industry TEXT,
        size_range TEXT,
        locality TEXT,
        country TEXT,
        linkedin_url TEXT,
        current_employee_estimate INTEGER,
        total_employee_estimate INTEGER,
        category TEXT,
        subcategory TEXT,
        city TEXT,
        state TEXT
    )
    ''')
    
    chunk_size = 100000
    print(f"Reading CSV in chunks of {chunk_size}...")
    
    start_time = time.time()
    total_processed = 0
    
    for chunk in pd.read_csv(CSV_PATH, chunksize=chunk_size, low_memory=False):
        if 'Unnamed: 0' in chunk.columns:
            chunk = chunk.drop(columns=['Unnamed: 0'])
            
        chunk = chunk.rename(columns={
            'year founded': 'year_founded',
            'size range': 'size_range',
            'linkedin url': 'linkedin_url',
            'current employee estimate': 'current_employee_estimate',
            'total employee estimate': 'total_employee_estimate'
        })
        
        chunk['category'] = chunk['industry']
        chunk['subcategory'] = chunk['domain']
        chunk['city'] = chunk['locality'].apply(lambda x: str(x).split(',')[0].strip() if pd.notnull(x) else '')
        chunk['state'] = chunk['locality'].apply(lambda x: str(x).split(',')[1].strip() if pd.notnull(x) and len(str(x).split(',')) > 1 else '')
        
        chunk.to_sql('companies', conn, if_exists='append', index=False)
        total_processed += len(chunk)
        print(f"Processed {total_processed:,} rows...")
        
    print("Creating indexes for lightning-fast search...")
    cursor.execute('CREATE INDEX idx_name ON companies(name);')
    cursor.execute('CREATE INDEX idx_country ON companies(country);')
    cursor.execute('CREATE INDEX idx_state ON companies(state);')
    cursor.execute('CREATE INDEX idx_category ON companies(category);')
    
    conn.commit()
    conn.close()
    
    print(f"Successfully built SQLite DB with {total_processed:,} companies in {time.time() - start_time:.2f} seconds.")

if __name__ == '__main__':
    main()
