import React from 'react';
import { 
  PlusCircle, 
  Layers, 
  MapPin, 
  ShieldCheck, 
  BarChart3, 
  Info,
  Clock,
  PhoneCall,
  CheckCircle2,
  Building
} from 'lucide-react';

export const Sidebar = ({ 
  currentTab, 
  setCurrentTab, 
  userRole, 
  setUserRole, 
  stats 
}) => {
  const navItems = [
    {
      id: 'report',
      label: 'Report Issue',
      description: 'Submit civic problem',
      icon: PlusCircle,
      highlight: true
    },
    {
      id: 'feed',
      label: 'Public Feed',
      description: 'Track all civic issues',
      icon: Layers,
      count: stats?.total
    },
    {
      id: 'map',
      label: 'City Map View',
      description: 'Geospatial issue map',
      icon: MapPin
    },
    {
      id: 'admin',
      label: 'Authority Portal',
      description: 'Review & resolve complaints',
      icon: ShieldCheck,
      badge: stats?.pending > 0 ? `${stats.pending} New` : null,
      adminOnly: false
    },
    {
      id: 'analytics',
      label: 'Civic Analytics',
      description: 'SLA & resolution metrics',
      icon: BarChart3
    },
    {
      id: 'about',
      label: 'Architecture & Docs',
      description: 'Hackathon specs',
      icon: Info
    }
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0">
      
      {/* Navigation Links */}
      <div className="p-4 space-y-1">
        
        {/* Quick File CTA for Citizens */}
        <div className="mb-4">
          <button
            onClick={() => setCurrentTab('report')}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-xs transition-all ${
              currentTab === 'report'
                ? 'bg-blue-800 ring-2 ring-blue-600 ring-offset-2'
                : 'bg-blue-700 hover:bg-blue-800'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-blue-200" />
            <span>Report Civic Problem</span>
          </button>
        </div>

        <div className="pt-1 pb-2">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Navigation</p>
        </div>

        {navItems.map((item) => {
          if (item.id === 'report') return null; // already at top CTA
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                if (item.id === 'admin' && userRole !== 'admin') {
                  setUserRole('admin');
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left group ${
                isActive
                  ? 'bg-blue-50/80 text-blue-900 border border-blue-200/60 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-blue-700' : 'text-slate-400 group-hover:text-slate-600'
                }`} />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                  {item.badge}
                </span>
              )}

              {item.count !== undefined && !item.badge && (
                <span className="text-xs text-slate-400 font-normal">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Municipal SLA & Helpline Box */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/60 m-3 rounded-xl border">
        <div className="flex items-center gap-2 mb-2">
          <Building className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-semibold text-slate-800">Municipal Desk</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Standard Civic SLA: <strong className="text-slate-700">48h response</strong>. Emergency repairs within <strong className="text-slate-700">6 hours</strong>.
        </p>
        <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
          <span>Toll-Free Control Room</span>
          <strong className="text-blue-800 font-mono">1800-248-426</strong>
        </div>
      </div>

    </aside>
  );
};
