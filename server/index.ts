import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, '..', 'app', 'data');
const DB_PATH = path.join(DATA_DIR, 'nexus.sqlite');

// Check if SQLite DB exists
const hasSQLite = fs.existsSync(DB_PATH);
let db: any = null;
if (hasSQLite) {
  console.log(`Loading massive SQLite Database from ${DB_PATH}...`);
  db = new Database(DB_PATH, { readonly: true });
  console.log('✓ SQLite database connected.');
} else {
  console.log('WARNING: nexus.sqlite not found. Serving from JSON only.');
}

console.log('Loading static NEXUS datasets into memory...');
const stats = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'stats.json'), 'utf-8'));
const stateBridge = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'state_bridge.json'), 'utf-8'));
const universities = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'universities.json'), 'utf-8'));

// Only load JSON companies if SQLite doesn't exist
let companies: any[] = [];
if (!hasSQLite) {
    companies = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'companies_featured.json'), 'utf-8'));
    console.log(`✓ Loaded ${companies.length} featured employers from JSON.`);
}
console.log(`✓ Loaded ${universities.length} universities.`);

// API Endpoints

app.get('/api/stats', (_req: Request, res: Response) => {
  // If we have SQLite, update the stats to reflect the real number!
  if (hasSQLite && db) {
    try {
      const row = db.prepare('SELECT COUNT(*) as count FROM companies').get();
      return res.json({
        ...stats,
        total_companies: row.count,
        summary: `Managing ${row.count.toLocaleString()} Global Employers & Startups.`
      });
    } catch {}
  }
  res.json(stats);
});

app.get('/api/universities', (req: Request, res: Response) => {
  const q = String(req.query.q || '').toLowerCase().trim();
  const country = String(req.query.country || 'ALL');
  const state = String(req.query.state || 'ALL');
  const stem = req.query.stem === 'true';
  const h1b = req.query.h1b === 'true';
  const r1 = req.query.r1 === 'true';
  const ats = String(req.query.ats || '').toLowerCase();
  
  const page = Math.max(1, parseInt(String(req.query.page || '1'), 10));
  const limit = Math.min(100, Math.max(1, parseInt(String(req.query.limit || '24'), 10)));

  let results = universities;

  if (country !== 'ALL') results = results.filter((u: any) => u.country === country);
  if (state !== 'ALL') results = results.filter((u: any) => u.state === state);
  if (stem) results = results.filter((u: any) => u.stem_share && u.stem_share >= 0.20);
  if (h1b) results = results.filter((u: any) => u.h1b_exempt);
  if (r1) results = results.filter((u: any) => (u.carnegie || '').includes('Very High'));
  if (ats) results = results.filter((u: any) => (u.jobs_ats || '').toLowerCase() === ats);
  if (q) {
    results = results.filter((u: any) => 
      (u.name || '').toLowerCase().includes(q) ||
      (u.city || '').toLowerCase().includes(q) ||
      (u.state || '').toLowerCase().includes(q) ||
      (u.carnegie || '').toLowerCase().includes(q)
    );
  }

  const total = results.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const paginated = results.slice((page - 1) * limit, page * limit);

  res.json({ total, page, totalPages, limit, data: paginated });
});

app.get('/api/companies', (req: Request, res: Response) => {
  const q = String(req.query.q || '').toLowerCase().trim();
  const category = String(req.query.category || 'ALL');
  const state = String(req.query.state || 'ALL');
  const country = String(req.query.country || 'ALL');
  const page = Math.max(1, parseInt(String(req.query.page || '1'), 10));
  const limit = Math.min(100, Math.max(1, parseInt(String(req.query.limit || '24'), 10)));
  const offset = (page - 1) * limit;

  if (hasSQLite && db) {
    let whereClause = 'WHERE 1=1';
    const params: any[] = [];
    
    if (category !== 'ALL') {
      whereClause += ' AND category LIKE ?';
      params.push(`%${category}%`);
    }
    if (state !== 'ALL') {
      whereClause += ' AND state = ?';
      params.push(state);
    }
    if (country !== 'ALL') {
      if (country === 'US') {
        whereClause += " AND (country = 'United States' OR country = 'us' OR country IS NULL)";
      } else if (country === 'IN') {
        whereClause += " AND (country = 'India' OR country = 'in')";
      } else if (country === 'CA') {
        whereClause += " AND (country = 'Canada' OR country = 'ca')";
      } else {
        whereClause += ' AND country = ?';
        params.push(country);
      }
    }
    if (q) {
      whereClause += ' AND (name LIKE ? OR category LIKE ? OR city LIKE ?)';
      params.push(`%${q}%`, `%${q}%`, `%${q}%`);
    }

    try {
      const totalStmt = db.prepare(`SELECT COUNT(*) as count FROM companies ${whereClause}`);
      const totalRow = totalStmt.get(...params);
      const total = totalRow ? totalRow.count : 0;
      
      const dataStmt = db.prepare(`
        SELECT * FROM companies 
        ${whereClause} 
        ORDER BY total_employee_estimate DESC NULLS LAST 
        LIMIT ? OFFSET ?
      `);
      const data = dataStmt.all(...params, limit, offset);
      
      const totalPages = Math.ceil(total / limit) || 1;
      
      return res.json({ total, page, totalPages, limit, data });
    } catch (e: any) {
      console.error(e);
      return res.status(500).json({ error: 'Database query failed' });
    }
  }

  // Fallback to JSON
  let results = companies;
  if (category !== 'ALL') results = results.filter((c: any) => c.category === category);
  if (state !== 'ALL') results = results.filter((c: any) => c.state === state);
  if (q) {
    results = results.filter((c: any) => 
      (c.name || '').toLowerCase().includes(q) ||
      (c.city || '').toLowerCase().includes(q)
    );
  }

  const total = results.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const paginated = results.slice(offset, offset + limit);

  res.json({ total, page, totalPages, limit, data: paginated });
});

app.get('/api/bridge/:state', (req: Request, res: Response) => {
  const st = req.params.state.toUpperCase();
  const data = stateBridge[st];
  if (!data) return res.status(404).json({ error: `State ${st} not found` });
  res.json(data);
});

app.get('/api/search', (req: Request, res: Response) => {
  const q = String(req.query.q || '').toLowerCase().trim();
  if (!q) return res.json({ universities: [], companies: [] });

  const matchedUnis = universities
    .filter((u: any) => (u.name || '').toLowerCase().includes(q) || (u.city || '').toLowerCase().includes(q))
    .slice(0, 6);

  let matchedComps = [];
  
  if (hasSQLite && db) {
    try {
      matchedComps = db.prepare(`
        SELECT * FROM companies 
        WHERE name LIKE ? OR category LIKE ? 
        ORDER BY total_employee_estimate DESC NULLS LAST 
        LIMIT 6
      `).all(`%${q}%`, `%${q}%`);
    } catch (e) {
      console.error(e);
    }
  } else {
    matchedComps = companies
      .filter((c: any) => (c.name || '').toLowerCase().includes(q))
      .slice(0, 6);
  }

  res.json({
    universities: matchedUnis,
    companies: matchedComps
  });
});

const clientDist = path.join(__dirname, '..', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`⚡ NEXUS Enterprise API Server listening on http://localhost:${PORT}`);
});
