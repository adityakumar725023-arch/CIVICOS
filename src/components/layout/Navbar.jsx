import React from 'react';
import { 
  Shield, 
  RotateCcw, 
  Sparkles, 
  User, 
  Building2, 
  CheckCircle,
  Download,
  FileSpreadsheet
} from 'lucide-react';

export const Navbar = ({ 
  userRole, 
  setUserRole, 
  onResetData, 
  onQuickPreset, 
  onExportCSV,
  pendingCount = 0
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/90 backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center text-white shadow-xs">
              <Shield className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-slate-900">Civic<span className="text-blue-700">SOS</span></span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  Municipal v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">Smart Civic Issue Reporting & Transparent Resolution</p>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Demo Trigger for Hackathon Judges */}
            <button
              onClick={onQuickPreset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors shadow-xs"
              title="Auto-fill sample civic incident for fast demo"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden md:inline">Demo Incident</span>
              <span className="md:hidden">Demo</span>
            </button>

            {/* Export data */}
            <button
              onClick={onExportCSV}
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Download CSV report of all civic complaints"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>

            {/* Reset mock data */}
            <button
              onClick={onResetData}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Reset complaints to initial sample state"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>

            {/* Role Switcher Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setUserRole('citizen')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  userRole === 'citizen'
                    ? 'bg-white text-blue-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Citizen</span>
              </button>

              <button
                onClick={() => setUserRole('admin')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  userRole === 'admin'
                    ? 'bg-blue-900 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Authority Admin</span>
                {pendingCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400 text-amber-950 font-bold">
                    {pendingCount}
                  </span>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
