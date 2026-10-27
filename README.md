# CivicSOS — Smart Civic Issue Reporting & Resolution Platform

> **Hackathon Prototype** | Developed with React, Vite, Tailwind CSS, Leaflet, and Recharts.

---

## 🌟 Overview & Vision

**CivicSOS** is a modern, transparent civic-tech SaaS platform designed to transform how citizens report local urban infrastructure problems and how municipal authorities triage, prioritize, and resolve them.

### The Complete Workflow Journey
1. **Citizen Lodges Issue:** Geotagged photo upload, category selection, automatic department routing (Roads, Sanitation, Electricity, Water Board, Public Works).
2. **Instant Ticket & SLA:** Citizen receives an official grievance ticket number (e.g. `CV-2026-1042`), downloadable receipt, and SLA countdown.
3. **Public Transparency Feed:** Neighbors can search, filter by ward, and upvote/endorse the issue to signal collective urgency.
4. **Authority Command Center:** Municipal officers review pending queues, flag critical emergencies (e.g., missing manhole, water main burst), deploy field teams, and update progress in real time.
5. **Resolution Verification:** Before closing an incident, officers upload resolution proof photos and field reports so citizens can inspect the Before vs. After results.
6. **City-Wide Analytics:** Live dashboard tracking resolution ratios, mean turnaround hours, ward-wise incident density, and department SLA adherence.

---

## 🚀 Live Demo & Quick Start

The application runs locally using Vite:

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Open your browser at **`http://localhost:5173/`**.

---

## 🎯 Features Designed for Hackathon Judges

- **One-Click "Demo Incident" Button:** Located in the top navigation bar. Instantly loads a realistic civic scenario for a 5-second live demo!
- **Instant Photo Presets:** In the complaint filing form, judges can click one of the preset high-resolution civic photos (Pothole, Waste, Streetlight, Pipeline) without needing local files.
- **Before vs. After Photo Inspection:** Check resolved complaints (like `CV-2026-1038` or `CV-2026-1019`) in the Public Feed to see side-by-side verification photos.
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
| **Future Backend** | Node.js + Express | RESTful API specifications (`/api/v1/complaints`) |
| **Future Database** | PostgreSQL + PostGIS | Geospatial indexing for geo-fencing and clustering |

---

## 🏛️ Project Directory Structure

```
c:\Users\adity\OneDrive\Desktop\OSEN HACKATHON
├── src/
│   ├── assets/                 # Icons and media
│   ├── components/
│   │   ├── about/              # System architecture and hackathon documentation
│   │   ├── admin/              # Municipal Officer Dashboard & Complaint Table
│   │   ├── citizen/            # Report Issue Form & Success Receipt Modal
│   │   ├── common/             # Badges, Notification Toast, Stat Cards
│   │   ├── feed/               # Public Feed, Card view, Detail Timeline Modal
│   │   ├── layout/             # Top Navbar, Compact Sidebar, Footer
│   │   └── map/                # Leaflet Geospatial Incident Map
│   ├── constants/              # Categories, Departments, Wards, Priorities, Presets
│   ├── data/                   # Realistic seed complaint datasets
│   ├── services/               # LocalStorage CRUD, analytics, upvotes, CSV exports
│   ├── App.jsx                 # Top-level state coordinator and view router
│   ├── index.css               # Tailwind directives and Leaflet CSS styles
│   └── main.jsx                # React DOM root entry
├── index.html                  # HTML template with Inter font and Leaflet assets
├── package.json                # Project dependencies and npm scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # CivicSOS color palette and typography
└── vite.config.js              # Vite server configuration
```

---

## 🏆 Presentation Pitch Points (for Hackathon Evaluation)

1. **Impact & Problem Solved:** Eliminates citizen cynicism by replacing "black box" complaints with public timelines and verified resolution photographs.
2. **Speed & Usability:** Frictionless filing in under 45 seconds with GPS auto-detection, photo evidence, and automatic department assignment.
3. **Accountability:** Built-in SLA classification (Critical: 4h, High: 24h, Medium: 48h) alerts administrators to overdue incidents before public escalation.
4. **Community Validation:** Upvote mechanism allows citizens to endorse existing complaints in their area, preventing duplicate tickets while elevating priority.
