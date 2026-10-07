<div align="center">

# ⚡ NEXUS
### **National Employment & eXploration Unified System**
#### *Unified Campus to Corporate Talent Intelligence Platform*

[![Status](https://img.shields.io/badge/Status-Production%20Ready-emerald?style=for-the-badge&logo=shield)](https://github.com/shyamsunderprogramer-design/nexus)
[![Live Demo](https://img.shields.io/badge/Live%20Web%20App-Open%20Anywhere-7c3aed?style=for-the-badge&logo=google-chrome)](https://shyamsunderprogramer-design.github.io/nexus/)
[![Campuses](https://img.shields.io/badge/Campuses%20Indexed-6%2C244-8b5cf6?style=for-the-badge&logo=google-classroom)](https://github.com/shyamsunderprogramer-design/nexus)
[![Employers](https://img.shields.io/badge/Employers%20Indexed-6.27M-06b6d4?style=for-the-badge&logo=instructure)](https://github.com/shyamsunderprogramer-design/nexus)
[![Verified Links](https://img.shields.io/badge/Verified%20Career%20Portals-79%2C571-10b981?style=for-the-badge&logo=checkmarx)](https://github.com/shyamsunderprogramer-design/nexus)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

<br/>

<p align="center">
  <b>Bridging the Gap Between Higher Education Output and Enterprise Hiring Demand</b><br/>
  An ultra-modern, zero-dependency intelligence platform integrating <b>6,244 postsecondary institutions</b> across the US & Canada with <b>6,274,467 registered employers</b>, direct HR portal links, student career centers, STEM graduation pipelines, and regional talent matrices.
</p>

<p align="center">
  🌐 <b><a href="https://shyamsunderprogramer-design.github.io/nexus/">🚀 LAUNCH LIVE WEB APP: shyamsunderprogramer-design.github.io/nexus</a></b> 🌐
</p>

[Live Web App](https://shyamsunderprogramer-design.github.io/nexus/) • [Pin-to-Pin Feature Walkthrough](#-pin-to-pin-feature-walkthrough) • [Who Benefits & Why](#-who-benefits--why-it-matters) • [Architecture](#-modern-uxui--technical-architecture)

</div>

---

## 🌟 Executive Overview

Historically, the **Academic Higher-Education World** and the **Enterprise Employer World** have operated in disconnected data silos:
- Students and job seekers struggle through spam-ridden third-party aggregators with broken job links and phantom listings.
- University career advisors lack direct, regional employer intelligence showing which corporations are actively recruiting in their state.
- Enterprise talent acquisition leaders have no unified visibility into regional STEM degree output, university student headcounts, or institutional Carnegie research classifications.

**NEXUS** solves this by unifying federal postsecondary databases (NCES IPEDS, Universities Canada, CICan) with federal corporate registers (FMCSA, IRS, CMS NPPES, SEC Form D, USDA, FDIC, NCUA). Every record is strictly verified, and all verified URLs link directly to official employer job portals, school HR career pages, and student career hubs.

---

## 💎 Who Benefits & Why It Matters

NEXUS was architected to deliver actionable value to five core audiences:

### 🎓 1. Students & Recent Graduates
- **Direct Verified Job Portals**: Bypass aggregator spam and headhunter farms. Click straight through to genuine institutional HR job listings and school-hosted career portals.
- **Career Planning & STEM Alignment**: View what percentage of degrees at each school are in DHS STEM-designated fields to benchmark academic programs.
- **Student Career Centers**: Instant access to Handshake links, central campus career hubs, and dedicated alumni job boards.

### 🛂 2. International Students & Visa Candidates
- **H-1B Cap-Exempt Identification**: Instantly filter for higher-ed institutions and affiliated non-profits qualifying for cap-exempt H-1B petitions under HEA 101(a).
- **Canada PGWP & DLI Registry**: Immediately verify whether a Canadian college or university is an authorized Designated Learning Institution (DLI) with Post-Graduation Work Permit (PGWP) eligibility.

### 🏛️ 3. University Leaders, Career Advisors & Counselors
- **Regional Workforce Intelligence**: Use the **Talent-to-Market Bridge** to inspect regional enterprise employer hiring density in your state or province.
- **Hiring System (ATS) Insights**: Know which Applicant Tracking Systems (Workday, PeopleAdmin, NEOGOV, Greenhouse, Taleo) campus employers use to properly prepare students for automated screening.
- **Institutional Benchmarking**: Compare your student enrollment, employee count, and student-to-faculty ratios against peer institutions.

### 🏢 4. Corporate Recruiters, HR Executives & Talent Acquisition
- **STEM Talent Pipelines**: Identify university talent hotspots conferring thousands of STEM degrees annually by state and region.
- **Strategic Campus Outreach**: Target career centers directly using verified links rather than generic inquiry email inboxes.
- **Competitor Hiring Landscape**: Track how other enterprises in logistics, tech, healthcare, and manufacturing are positioning regional hiring hubs.

### 📊 5. Economic Researchers, Policy Analysts & Data Scientists
- **Max-Coverage Unified Dataset**: Access 6.27 million deduplicated federal employer records linked across EINs, USDOT numbers, CIKs, and NPI identifiers.
- **Zero-Hallucination Integrity**: Strict data governance where "blank beats wrong"—every single link was live-opened and name-verified.

---

## 🎯 Pin-to-Pin Feature Walkthrough

NEXUS delivers a rich, responsive Single Page Application (SPA) structured into four dedicated intelligence views plus an interactive slide-out inspector:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXUS PLATFORM WORKSPACE                        │
├─────────────────┬──────────────────┬──────────────────┬────────────────┤
│   📊 View 1     │    🎓 View 2     │    🏢 View 3     │   ⚡ View 4    │
│  Executive KPI  │  Campus & Talent │  Enterprise Index│  Talent-Market │
│   & Analytics   │     Directory    │  (Top Employers) │     Bridge     │
└─────────────────┴──────────────────┴──────────────────┴────────────────┘
                                  │
                                  ▼
               ┌──────────────────────────────────────┐
               │    🔍 Slide-Out Detail Inspector     │
               │   Full Profile, Badges & Deep-Links  │
               └──────────────────────────────────────┘
```

### View 1: 📊 Executive Market Intelligence
- **Real-Time KPI Metric Cards**: High-velocity counters tracking:
  - `6,244` Postsecondary Campuses
  - `6,274,467` Registered Enterprise Employers
  - `79,571` Live-Verified Career and HR Portals
  - `63` States, Territories, and Canadian Provinces
- **ATS Hiring Systems Chart**: Interactive Chart.js visualization identifying enterprise hiring systems across academia (NEOGOV, PeopleAdmin, Workday, Paycom, ADP, Greenhouse, etc.).
- **Macro Economic Industry Breakdown**: Doughnut chart categorizing millions of registered organizations across Logistics, Healthcare, IT/Startups, Manufacturing, and MedTech.

### View 2: 🎓 Campus & Talent Directory
- **Instant Search Bar**: Sub-10ms real-time search across school names, cities, states, and Carnegie classifications.
- **Smart Filter Chips**:
  - `🧪 STEM Heavy (>20%)`: Isolates institutions with dominant STEM degree conferral rates.
  - `🛂 H-1B Cap Exempt`: Filters for public and private nonprofit universities qualifying for cap-exempt work authorization.
  - `🏆 Carnegie R1`: Highlights Doctoral Universities with Very High Research Activity.
  - `💼 Workday ATS`: Pinpoints campuses running Workday HR systems.
- **Campus Cards**: Rich glassmorphic cards showing country/state badges, student population, employee headcount, STEM share, and quick action buttons for **Jobs** and **Career Center**.

### View 3: 🏢 Enterprise Employer Index
- **Curated & Federal Employers**: Explore top verified employers across Logistics, IT, Healthcare, Manufacturing, Energy, and Finance.
- **Corporate Filings & Tickers**: Inspect SEC EDGAR trading tickers (NASDAQ, NYSE) and stock exchange affiliations.
- **Direct Verified Channels**: Instant buttons directing straight to official company homepages and verified corporate careers pages.

### View 4: ⚡ Regional Talent-to-Market Bridge
- **Interactive State/Province Selector**: Choose any of the 50 US states or Canadian provinces (e.g., California, New York, Texas, Washington, Ontario).
- **Side-by-Side Dual Matrix**:
  - *Left Column (Campus Pipeline)*: Total regional student population, annual STEM graduates produced, cap-exempt institutions, and top universities with their student headcounts.
  - *Right Column (Enterprise Hiring Demand)*: Prominent employers operating and hiring locally in that state, industry categories, and direct links to their regional careers hubs.

### 🔍 Slide-Out Inspector Drawer
- Built using cutting-edge CSS `@starting-style` and discrete transition specifications.
- Deep-dive profile inspecting institutional locale, control (Public/Private), Carnegie classifications, exact student/employee numbers, verified URLs, and regulatory source citations.

---

## 💻 Modern UX/UI & Technical Architecture

The platform was built with strict adherence to modern frontend engineering standards:

```text
┌─────────────────────────────────────────────────────────────┐
│                 NEXUS FULL-STACK ARCHITECTURE               │
├─────────────────────────────────────────────────────────────┤
│  Frontend Engine   React 19 + TypeScript + Vite             │
│  UI & Styling      Tailwind CSS 3.x (Glassmorphic obsidian) │
│  Motion & Physics  Framer Motion 12.x (Spring transitions)  │
│  Iconography       Lucide React 1.x (Crisp SVG vector pack) │
│  Backend API       Node.js / Express REST API (TypeScript)  │
│  Endpoints         /api/stats, /api/universities,           │
│                    /api/companies, /api/bridge, /api/search │
│  Data Delivery     Dual-Mode (Express REST API + Offline)   │
└─────────────────────────────────────────────────────────────┘
```

- **Obsidian Dark Palette**: `#070b12` background accented with animated radial mesh gradients (`rgba(124, 58, 237, 0.12)`).
- **Glassmorphic Cards**: `backdrop-filter: blur(16px)` with hairline borders (`rgba(255, 255, 255, 0.08)`) and hover micro-elevations.
- **Persistent Theme Toggle**: Seamless light/dark mode switcher stored in `localStorage`.
- **Dual Execution Modes**:
  - **Full-Stack Mode**: Express REST API on port 3001 proxied to React 19 frontend on port 3000.
  - **Standalone Offline Mode**: Bundled inside `app/data/nexus_bundle.js` allowing users to double-click and launch `app/index.html` directly from Finder/Explorer without requiring a web server or facing CORS browser blocks.

---

## 🚀 Quick Start & How to Run

### Option 1: Full-Stack React + Express Development Server (Recommended)
Clone the repository and launch both the Express REST API and Vite React client with hot module reloading:

```bash
# 1. Clone the repository
git clone https://github.com/shyamsunderprogramer-design/nexus.git
cd nexus

# 2. Install dependencies
npm install

# 3. Launch concurrent Full-Stack development environment (API + Web)
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.
- **Frontend**: `http://localhost:3000` (Vite Hot Module Reloading)
- **REST API**: `http://localhost:3001/api/stats`

---

### Option 2: Production Build & Run
```bash
# Compile TypeScript and build production bundle
npm run build

# Start production server
npm start
```

---

### Option 3: Instant Browser Launch (Zero-Setup, 100% Offline)
No Node.js or build steps required. Simply open the standalone bundle:

```bash
# macOS
open app/index.html

# Linux
xdg-open app/index.html

# Windows
start app/index.html
```

---

## 🛠️ Data Integration & Pipeline Reproduction

All normalized datasets are pre-packaged in `app/data/`. If you want to customize or regenerate the data from raw NCES IPEDS, Universities Canada, CICan, and federal employer registers:

```bash
# Rebuild the integrated payload
python3 scripts/build_nexus_data.py
```

This script:
1. Normalizes 6,035 US postsecondary institutions from IPEDS HD2023.
2. Ingests 209 Canadian universities and colleges with IRCC DLI/PGWP statuses.
3. Incorporates curated employers enriched via SEC EDGAR, Wikidata, and EPA Envirofacts.
4. Generates `stats.json`, `state_bridge.json`, `universities.json`, `companies_featured.json`, and the standalone `nexus_bundle.js`.

---

## 📂 Repository File Tree

```text
nexus/
├── src/                         # Full-Stack React 19 Frontend
│   ├── components/              # Modular UI Components
│   │   ├── Navbar.tsx           # Brand navigation & theme switch
│   │   ├── Hero.tsx             # Animated KPI banner
│   │   ├── ExecutiveDashboard.tsx # Macro market analytics & ATS charts
│   │   ├── CampusDirectory.tsx  # Filterable 6,244 university network
│   │   ├── EnterpriseDirectory.tsx # Filterable 6.27M corporate index
│   │   ├── TalentBridge.tsx     # State-by-state talent & hiring nexus
│   │   └── DetailDrawer.tsx     # Framer Motion slide-out inspector
│   ├── services/
│   │   └── api.ts               # Dual-mode API service layer
│   ├── types/
│   │   └── index.ts             # Strict TypeScript models & contracts
│   ├── App.tsx                  # Root application component
│   ├── main.tsx                 # React DOM mount point
│   └── index.css                # Tailwind directives & glassmorphic tokens
├── server/                      # Full-Stack Express REST API
│   └── index.ts                 # /api/stats, /api/universities, /api/companies, /api/bridge
├── app/                         # Standalone Zero-Dependency SPA Edition
│   ├── index.html               # Self-contained browser application
│   └── data/                    # Pre-aggregated data payloads
├── scripts/
│   └── build_nexus_data.py      # Automated data extraction, merging, and bundling
├── vite.config.ts               # Vite configuration with React & API proxy
├── tsconfig.json                # TypeScript compiler configuration
├── tailwind.config.js           # Tailwind CSS theme extension
├── package.json                 # NPM scripts (npm run dev, npm run build, npm start)
├── .gitignore                   # Clean exclusion rules
├── LICENSE                      # MIT Open Source License
└── README.md                    # Comprehensive Project Documentation
```

---

## 🌐 Deploying to the Web

NEXUS is 100% static and client-side, making deployment completely free and instant on any hosting platform:

### Deploy to GitHub Pages
1. Go to your repository settings on GitHub: **Settings > Pages**.
2. Under **Build and deployment**, set the Source to **Deploy from a branch**.
3. Select `main` branch and folder `/ (root)` or move `app/` contents to root.
4. Click **Save** — your site is live!

### Deploy to Vercel or Netlify
Simply drag and drop the `app/` folder into [Netlify Drop](https://app.netlify.com/drop) or link the repository to [Vercel](https://vercel.com/) with the output directory set to `app`.

---

## 🤝 Contributing

Contributions, feedback, and dataset enhancements are welcome!
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'feat: Add new talent filter'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">
  <sub>Developed by <b>Shyam Sunder Daggupati</b> • Built for campus career advisors, students, and talent leaders across North America.</sub>
</div>
