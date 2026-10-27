import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Wrench, 
  TrendingUp, 
  FileSpreadsheet,
  AlertCircle,
  Users
} from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { ComplaintTable } from './ComplaintTable';
import { PriorityBadge } from '../common/Badge';

export const AdminDashboard = ({ 
  complaints, 
  analytics, 
  onSelectComplaint, 
  onOpenStatusUpdate, 
  onExportCSV 
}) => {
  // Urgent critical complaints needing immediate action
  const criticalPending = complaints.filter(c => c.priority === 'CRITICAL' && c.status === 'PENDING');

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Officer Command Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Authority Dispatch Desk
            </span>
            <span className="text-xs text-slate-400 font-mono">Control Room Station #04</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Municipal Command & Incident Management</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Triage public complaints, assign regional field engineers, review resolution photographs, and ensure citizen SLA compliance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-xs border border-white/15 px-4 py-2.5 rounded-xl text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">City Resolution SLA</span>
            <span className="text-lg font-bold text-emerald-400">{analytics.slaComplianceRate}% Met</span>
          </div>
        </div>
      </div>

      {/* Critical SLA Alert Banner (If any Critical complaint is Pending) */}
      {criticalPending.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-600 rounded-r-xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-100 text-red-700 shrink-0">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-red-950">
                {criticalPending.length} Critical Public Safety Grievance{criticalPending.length > 1 ? 's' : ''} Awaiting Triage!
              </h3>
              <p className="text-xs text-red-800 mt-0.5">
                Immediate 4-hour SLA response required: {criticalPending.map(c => c.title).slice(0, 2).join(', ')}...
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenStatusUpdate(criticalPending[0])}
            className="px-3.5 py-1.5 rounded-lg bg-red-700 hover:bg-red-800 text-white font-semibold text-xs shrink-0 shadow-xs transition-colors"
          >
            Dispatch First Response Team
          </button>
        </div>
      )}

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Triage Queue"
          value={analytics.pending}
          subtitle="Awaiting initial officer review"
          icon={Clock}
          colorClass="text-amber-700 bg-amber-50"
        />

        <StatCard
          title="Active Repairs"
          value={analytics.inProgress}
          subtitle="Crews deployed on site"
          icon={Wrench}
          colorClass="text-purple-700 bg-purple-50"
        />

        <StatCard
          title="Resolved Cases"
          value={analytics.resolved}
          subtitle={`${analytics.resolutionRate}% total resolution rate`}
          icon={CheckCircle2}
          colorClass="text-emerald-700 bg-emerald-50"
        />

        <StatCard
          title="Avg. Turnaround"
          value={`${analytics.avgResolutionHours} hrs`}
          subtitle="From report to public verification"
          icon={TrendingUp}
          colorClass="text-blue-700 bg-blue-50"
        />
      </div>

      {/* Complaints Management Table Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-base font-bold text-slate-900">Case Ledger & Inspection Directory</h2>
            <p className="text-xs text-slate-500">Filter by jurisdiction, department, or update status with field remarks.</p>
          </div>
        </div>

        <ComplaintTable
          complaints={complaints}
          onSelectComplaint={onSelectComplaint}
          onOpenStatusUpdate={onOpenStatusUpdate}
          onExportCSV={onExportCSV}
        />
      </div>

    </div>
  );
};
