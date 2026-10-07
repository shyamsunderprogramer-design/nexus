import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Load In-Memory Data for Sub-5ms Query Latency
const DATA_DIR = path.join(__dirname, '..', 'app', 'data');

console.log('Loading NEXUS datasets into memory...');
const stats = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'stats.json'), 'utf-8'));
const stateBridge = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'state_bridge.json'), 'utf-8'));
const universities = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'universities.json'), 'utf-8'));
const companies = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'companies_featured.json'), 'utf-8'));

console.log(`✓ Loaded ${universities.length} universities and ${companies.length} featured employers.`);

// API Endpoints

// 1. Executive Stats & KPIs
app.get('/api/stats', (_req: Request, res: Response) => {
  res.json(stats);
});

// 2. Universities Endpoint with High-Performance Search & Faceting
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

  if (country !== 'ALL') {
    results = results.filter((u: any) => u.country === country);
  }
  if (state !== 'ALL') {
    results = results.filter((u: any) => u.state === state);
  }
  if (stem) {
    results = results.filter((u: any) => u.stem_share && u.stem_share >= 0.20);
  }
  if (h1b) {
    results = results.filter((u: any) => u.h1b_exempt);
  }
  if (r1) {
    results = results.filter((u: any) => (u.carnegie || '').includes('Very High'));
  }
  if (ats) {
    results = results.filter((u: any) => (u.jobs_ats || '').toLowerCase() === ats);
  }
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

  res.json({
    total,
    page,
    totalPages,
    limit,
    data: paginated
  });
});

// 3. Companies Endpoint with Facets & Tickers
app.get('/api/companies', (req: Request, res: Response) => {
  const q = String(req.query.q || '').toLowerCase().trim();
  const category = String(req.query.category || 'ALL');
  const state = String(req.query.state || 'ALL');
  const page = Math.max(1, parseInt(String(req.query.page || '1'), 10));
  const limit = Math.min(100, Math.max(1, parseInt(String(req.query.limit || '24'), 10)));

  let results = companies;

  if (category !== 'ALL') {
    results = results.filter((c: any) => c.category === category);
  }
  if (state !== 'ALL') {
    results = results.filter((c: any) => c.state === state);
  }
  if (q) {
    results = results.filter((c: any) => 
      (c.name || '').toLowerCase().includes(q) ||
      (c.legal_name || '').toLowerCase().includes(q) ||
      (c.ticker || '').toLowerCase().includes(q) ||
      (c.city || '').toLowerCase().includes(q)
    );
  }

  const total = results.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const paginated = results.slice((page - 1) * limit, page * limit);

  res.json({
    total,
    page,
    totalPages,
    limit,
    data: paginated
  });
});

// 4. Regional Talent Bridge Endpoint
app.get('/api/bridge/:state', (req: Request, res: Response) => {
  const st = req.params.state.toUpperCase();
  const data = stateBridge[st];
  if (!data) {
    return res.status(404).json({ error: `State or province ${st} not found in bridge index.` });
  }
  res.json(data);
});

// 5. Global Unified Typeahead Search
app.get('/api/search', (req: Request, res: Response) => {
  const q = String(req.query.q || '').toLowerCase().trim();
  if (!q) {
    return res.json({ universities: [], companies: [] });
  }

  const matchedUnis = universities
    .filter((u: any) => (u.name || '').toLowerCase().includes(q) || (u.city || '').toLowerCase().includes(q))
    .slice(0, 6);

  const matchedComps = companies
    .filter((c: any) => (c.name || '').toLowerCase().includes(q) || (c.ticker || '').toLowerCase().includes(q))
    .slice(0, 6);

  res.json({
    universities: matchedUnis,
    companies: matchedComps
  });
});

// Production Static Serving
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
