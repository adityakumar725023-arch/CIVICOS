import React from 'react';
import { Shield, Heart, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-800" />
          <span className="font-semibold text-slate-700">CivicSOS Platform</span>
          <span>&copy; {new Date().getFullYear()} Smart Municipal Governance.</span>
        </div>

        <div className="flex items-center gap-4">
          <span>Open Civic Tech Initiative</span>
          <span>•</span>
          <span>B.Tech CSE Hackathon Prototype</span>
          <span>•</span>
          <span className="text-emerald-700 font-medium">All Systems Operational</span>
        </div>

      </div>
    </footer>
  );
};
