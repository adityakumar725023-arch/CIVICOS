# CivicSOS — Smart Civic Issue Reporting & Resolution Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online%20Preview-emerald?style=for-the-badge&logo=googlechrome&logoColor=white)](https://adityakumar725023-arch.github.io/CIVICOS/)
[![Render](https://img.shields.io/badge/Deploy-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/deploy?repo=https://github.com/adityakumar725023-arch/CIVICOS)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://adityakumar725023-arch.github.io/CIVICOS/)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Tailwind%20%7C%20Leaflet-navy?style=for-the-badge)](https://github.com/adityakumar725023-arch/CIVICOS)

> **CivicTech Hackathon Project** | A transparent digital bridge connecting citizens with municipal authorities to report, track, and resolve urban infrastructure issues.

---

## 🌐 Live Demo Links

| Deployment | Direct URL |
|---|---|
| 🚀 **Deploy to Render (Free)** | [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/adityakumar725023-arch/CIVICOS) |
| ⚡ **One-Click Vercel Deploy** | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fadityakumar725023-arch%2FCIVICOS) |
| 🌐 **GitHub Pages Live App** | **[https://adityakumar725023-arch.github.io/CIVICOS/](https://adityakumar725023-arch.github.io/CIVICOS/)** |
| 💻 **Local Dev Server** | `http://localhost:5173/` |

> 💡 **GitHub Pages Quick Enable**: In your repository, go to **Settings** → **Pages** → under **Build and deployment / Source**, select **GitHub Actions**. The automated workflow will publish the app live to the link above!

---

## 🌟 Overview & Vision

**CivicSOS** replaces traditional bureaucratic grievances with a geo-tagged, transparent, community-validated, and accountable municipal resolution pipeline.

### The Complete 5-Stage Civic Lifecycle:
1. **Citizen Lodges Grievance:** Geo-tagged visual evidence, auto-categorization (Roads, Waste, Electric, Water, Public Works, Safety Hazards).
2. **Automated Department Routing:** Instant ticket ID generated (e.g. `CV-2026-1042`), assigned to zonal engineer with guaranteed SLA timer (4h, 24h, 48h).
3. **Public Transparency & "Me Too" Endorsements:** Citizens browse nearby issues, view map markers, and upvote to elevate civic urgency.
4. **Authority Command Center:** Municipal officers triage queues, review critical emergencies, dispatch field crews, and update live progress.
5. **Resolution Verification Proof:** Officers upload verified resolution photos and field notes before closing, giving citizens side-by-side Before vs. After proof.

---

## 🎯 Features Designed for Hackathon Judges

- **One-Click "Demo Incident" Button:** Located in the top navigation bar. Instantly loads a realistic civic scenario for a 5-second live demo!
- **Instant Photo Presets:** In the complaint filing form, judges can click preset high-resolution civic photos (Pothole, Waste, Streetlight, Pipeline) without needing local files.
- **Before vs. After Photo Inspection:** Check resolved complaints (like `CV-2026-1038` or `CV-2026-1019`) in the Public Feed to inspect verified proof photographs.
- **Interactive OpenStreetMap (Leaflet):** Real-time color-coded pins across municipal wards showing issue locations and statuses.
- **Role Switcher:** Easily toggle between **"Citizen"** and **"Authority Admin"** modes from the top bar to experience both perspectives.
- **Data Export & Reset:** Export the complete complaints ledger as CSV or JSON, or reset to initial mock cases anytime with "Reset Demo".

---

## 🛠️ Technology Stack

| Component | Technology | Rationale |
|---|---|---|
| **Frontend Framework** | React 18 + Vite | Lightning-fast HMR and clean component composition |
| **Styling & UI** | Tailwind CSS 3.4 | Clean, minimal, accessible civic-tech design system |
| **Icons** | Lucide React | High-legibility modern iconography |
| **Geospatial Map** | Leaflet + OpenStreetMap | Interactive, zero-API-key mapping with custom DivIcons |
| **Analytics & Charts** | Recharts 2 | Interactive category bars, status donut, and ward breakdowns |
| **Data Persistence** | Browser LocalStorage | Zero-setup initial state with seed datasets and full CRUD |
| **Deployment** | GitHub Actions + GitHub Pages / Vercel | Automatic CI/CD pipeline |
| **Future Backend** | Node.js + Express | RESTful API specifications (`/api/v1/complaints`) |
| **Future Database** | PostgreSQL + PostGIS | Geospatial indexing for geo-fencing and clustering |

---

## 🚀 Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/adityakumar725023-arch/CIVICOS.git

# 2. Navigate to project directory
cd CIVICOS

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

---

## 🏆 Presentation Pitch Points (for Hackathon Evaluation)

1. **Impact & Problem Solved:** Eliminates citizen cynicism by replacing "black box" complaints with public timelines and verified resolution photographs.
2. **Speed & Usability:** Frictionless filing in under 45 seconds with GPS auto-detection, photo evidence, and automatic department assignment.
3. **Accountability:** Built-in SLA classification (Critical: 4h, High: 24h, Medium: 48h) alerts administrators to overdue incidents before public escalation.
4. **Community Validation:** Upvote mechanism allows citizens to endorse existing complaints in their area, preventing duplicate tickets while elevating priority.

---

## 📄 License & Attribution

Built for the Hackathon by **Aditya Kumar** (B.Tech CSE).  
CivicSOS — Smart Civic Issue Reporting & Resolution Platform &copy; 2026.
