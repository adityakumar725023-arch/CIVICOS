import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  MapPin, 
  ArrowRight, 
  Printer, 
  QrCode, 
  Share2,
  Calendar,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { StatusBadge, PriorityBadge } from '../common/Badge';
import { DEPARTMENTS } from '../../constants/constants';

export const ComplaintSuccessModal = ({ complaint, onClose, onViewFeed, onViewMap }) => {
  const [copied, setCopied] = useState(false);

  if (!complaint) return null;

  const matchedDept = DEPARTMENTS.find(d => d.id === complaint.departmentId);

  const handleCopyId = () => {
    navigator.clipboard.writeText(complaint.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Success Header */}
        <div className="text-center pb-5 border-b border-slate-100">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 ring-8 ring-emerald-50">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Complaint Lodged Successfully!</h2>
          <p className="text-xs text-slate-500 mt-1">
            Official acknowledgment generated and dispatched to the municipal engineering squad.
          </p>
        </div>

        {/* Receipt Box */}
        <div className="my-5 bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-3 font-sans">
          
          {/* Tracking ID Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Grievance Ticket ID</span>
              <div className="font-mono text-lg font-bold text-blue-900 tracking-wide">{complaint.id}</div>
            </div>
            <button
              onClick={handleCopyId}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied!' : 'Copy Ticket'}</span>
            </button>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Assigned Department</span>
              <span className="font-semibold text-slate-800">{matchedDept?.name || 'Public Works'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Severity / Priority</span>
              <PriorityBadge priority={complaint.priority} size="xs" />
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Ward & Zone</span>
              <span className="font-medium text-slate-700 truncate block">{complaint.ward}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Expected SLA</span>
              <span className="font-semibold text-emerald-700">Under 24-48 Hours</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/60 text-xs">
            <span className="text-slate-400 block text-[11px]">Location</span>
            <span className="text-slate-700 font-medium">{complaint.locationText}</span>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onClose();
                onViewFeed();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <span>Track in Public Feed</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                onClose();
                onViewMap();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-slate-600" />
              <span>View On City Map</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrint}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 py-1 px-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Acknowledgement</span>
            </button>

            <button
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium py-1 px-2"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
