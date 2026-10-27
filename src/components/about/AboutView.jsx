import React from 'react';
import { 
  Shield, 
  Code2, 
  Database, 
  Server, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Sparkles,
  GitBranch,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const AboutView = ({ onNavigateReport, onNavigateFeed }) => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Hero Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-xs">
            <Shield className="w-6 h-6 text-blue-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">CivicSOS Platform Architecture</h1>
            <p className="text-xs text-slate-500">Smart Civic Issue Reporting & Transparent Municipal Resolution</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mt-4">
          Built for the hackathon by a B.Tech CSE engineering student, CivicSOS bridges the communication gap between citizens and municipal municipal departments. It replaces slow bureaucratic paper complaints with a geo-tagged, transparent, verifiable digital resolution journey.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={onNavigateReport}
            className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Try Reporting a Grievance</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onNavigateFeed}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
          >
            Explore Public Feed
          </button>
        </div>
      </div>

      {/* Core Workflow Pipeline */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-700" />
          <span>The Complete 5-Stage Civic Lifecycle</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center mb-2">1</div>
            <h3 className="text-xs font-bold text-slate-900">Citizen Lodges Issue</h3>
            <p className="text-[11px] text-slate-500 mt-1">Geo-tagged photo upload, auto-categorization & instant ticket ID generation.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center mb-2">2</div>
            <h3 className="text-xs font-bold text-slate-900">Auto Department Route</h3>
            <p className="text-[11px] text-slate-500 mt-1">Routed to Roads, Sanitation, Electric, or Water board with target SLA.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center mb-2">3</div>
            <h3 className="text-xs font-bold text-slate-900">Field Crew Action</h3>
            <p className="text-[11px] text-slate-500 mt-1">Inspection done by assigned engineer, status updated to In-Progress.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center mb-2">4</div>
            <h3 className="text-xs font-bold text-slate-900">Proof Verification</h3>
            <p className="text-[11px] text-slate-500 mt-1">Officer uploads resolution photo & field remarks before closing case.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="w-6 h-6 rounded-full bg-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center mb-2">5</div>
            <h3 className="text-xs font-bold text-emerald-950">Citizen Audit & Upvotes</h3>
            <p className="text-[11px] text-emerald-800 mt-1">Public can view before/after evidence, add comments & verify in feed.</p>
          </div>

        </div>
      </div>

      {/* Tech Stack Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-700" />
            <span>Frontend & Client Architecture</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <span><strong>React 18 + Vite:</strong> Ultra-fast component rendering and hot module reloading.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <span><strong>Tailwind CSS 3.4:</strong> Custom Civic Tech design system with muted blues and high-contrast accessibility.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <span><strong>Leaflet + OpenStreetMap:</strong> Geospatial pin rendering, custom HTML DivIcons, and popup cards.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <span><strong>Recharts 2:</strong> Real-time municipal analytics: category bars, status donut, and ward performance.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-700" />
            <span>Backend & Data Persistence Roadmap</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
              <span><strong>Current Phase:</strong> Robust LocalStorage state service with initial mock datasets, export, and reset hooks.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
              <span><strong>Phase 2 (Node.js + Express):</strong> RESTful API routes (`POST /api/v1/complaints`, `PATCH /api/v1/complaints/:id/status`).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
              <span><strong>Phase 3 (PostgreSQL + PostGIS):</strong> Spatial indexing for geo-fenced complaints and neighborhood clustering.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 mt-0.5 shrink-0" />
              <span><strong>AI Extension:</strong> Vision-based automated severity classification & duplicate complaint deduplication.</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
};
