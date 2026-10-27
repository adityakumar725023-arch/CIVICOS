import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { StatCard } from '../common/StatCard';

export const AnalyticsDashboard = ({ analytics, complaints, onExportCSV }) => {
  // Category data for BarChart
  const categoryChartData = analytics.categoryCounts.map(c => ({
    name: c.name.split(' ')[0], // short name for x-axis
    fullName: c.name,
    Incidents: c.count,
    fill: c.color
  }));

  // Status pie chart colors
  const STATUS_PIE_COLORS = {
    'Pending Review': '#f59e0b',
    'Under Review': '#3b82f6',
    'In Progress': '#a855f7',
    'Resolved': '#10b981'
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Analytics Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-700" />
            <span>Civic Intelligence & Resolution Analytics</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time municipal performance metrics, department response rates, and geospatial breakdown.
          </p>
        </div>

        <button
          onClick={onExportCSV}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors self-start md:self-auto"
        >
          <FileSpreadsheet className="w-4 h-4 text-slate-500" />
          <span>Export Analytics Ledger</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Registered"
          value={analytics.total}
          subtitle="All citizen submissions"
          icon={BarChart3}
          colorClass="text-blue-700 bg-blue-50"
        />

        <StatCard
          title="Resolution Ratio"
          value={`${analytics.resolutionRate}%`}
          subtitle="Grievances successfully closed"
          icon={CheckCircle2}
          colorClass="text-emerald-700 bg-emerald-50"
        />

        <StatCard
          title="Mean Fix Time"
          value={`${analytics.avgResolutionHours} hrs`}
          subtitle="Average field resolution"
          icon={Clock}
          colorClass="text-indigo-700 bg-indigo-50"
        />

        <StatCard
          title="Citizen SLA Compliance"
          value={`${analytics.slaComplianceRate}%`}
          subtitle="Fixed within guaranteed SLA"
          icon={ShieldCheck}
          colorClass="text-amber-700 bg-amber-50"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Incidents by Category */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900">Complaints by Problem Domain</h3>
            <p className="text-xs text-slate-500">Distribution across roads, sanitation, electricity, and drainage</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11, fill: '#64748b' }} 
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  formatter={(val, name, item) => [`${val} complaints`, item.payload.fullName]}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Bar dataKey="Incidents" radius={[6, 6, 0, 0]}>
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill || '#2563eb'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Status Breakdown Donut */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900">Resolution Pipeline Status</h3>
            <p className="text-xs text-slate-500">Breakdown of issues across resolution phases</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {analytics.statusData.map((entry, index) => (
                    <Cell key={`pie-${index}`} fill={STATUS_PIE_COLORS[entry.name] || '#64748b'} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val, name) => [`${val} Cases`, name]}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '11px', color: '#475569' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Ward-Wise Performance */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900">Incident Volume by Administrative Ward</h3>
            <p className="text-xs text-slate-500">Identifying high-frequency infrastructure repair zones</p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.wardData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis dataKey="ward" type="category" tick={{ fontSize: 11, fill: '#334155' }} width={80} />
                <Tooltip 
                  formatter={(val) => [`${val} Complaints`, 'Ward Volume']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#1e3a8a" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Urgency & SLA Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900">Urgency Classification & SLA Deadlines</h3>
            <p className="text-xs text-slate-500">Distribution of cases by severity priority</p>
          </div>

          <div className="space-y-3 pt-2">
            {analytics.priorityData.map((p) => {
              const pct = analytics.total > 0 ? Math.round((p.value / analytics.total) * 100) : 0;
              return (
                <div key={p.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                      {p.name} Severity
                    </span>
                    <span className="text-slate-500 font-mono">{p.value} cases ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ width: `${pct}%`, backgroundColor: p.color }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600">
            <strong>Target SLA Framework:</strong> Critical safety hazards triage within 4 hours; High urgency within 24 hours; Standard municipal work within 48 hours.
          </div>
        </div>

      </div>

    </div>
  );
};
