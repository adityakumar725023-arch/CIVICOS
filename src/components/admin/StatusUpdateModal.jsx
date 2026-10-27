import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Upload, 
  Camera, 
  FileText, 
  UserCheck, 
  AlertTriangle 
} from 'lucide-react';
import { DEPARTMENTS, STATUS_CONFIG, PRIORITY_CONFIG } from '../../constants/constants';

const RESOLUTION_SAMPLE_PHOTOS = [
  { label: 'Repaired Pothole / Road', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80' },
  { label: 'Cleared Garbage Dump', url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80' },
  { label: 'Repaired Footpath Tiles', url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80' },
  { label: 'Cleared Fallen Tree', url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80' }
];

export const StatusUpdateModal = ({ complaint, onClose, onSave }) => {
  const [status, setStatus] = useState(complaint?.status || 'IN_PROGRESS');
  const [priority, setPriority] = useState(complaint?.priority || 'HIGH');
  const [departmentId, setDepartmentId] = useState(complaint?.departmentId || 'dept_roads');
  const [officerName, setOfficerName] = useState(complaint?.assignedOfficer || 'Er. Rajesh Sharma (Field Engineer)');
  const [notes, setNotes] = useState(complaint?.resolutionNotes || '');
  const [proofImage, setProofImage] = useState(complaint?.resolutionProofImage || '');
  const [isSaving, setIsSaving] = useState(false);

  if (!complaint) return null;

  const handleProofUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSampleProof = (url) => {
    setProofImage(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      onSave(complaint.id, {
        status,
        priority,
        departmentId,
        assignedOfficer: officerName,
        notes: notes.trim(),
        proofImage: proofImage || null,
        officerName: officerName || 'Municipal Authority Officer'
      });
      setIsSaving(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Municipal Action & Status Update</h3>
              <p className="text-xs text-slate-500 font-mono">Case File: {complaint.id}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          
          {/* Target Complaint Summary */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-400 block">Incident Title</span>
            <span className="font-semibold text-slate-800 text-xs block truncate">{complaint.title}</span>
            <span className="text-slate-500 text-[11px] block mt-0.5">{complaint.locationText} ({complaint.ward})</span>
          </div>

          {/* Workflow Status Dropdown */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Update Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-hidden focus:border-blue-600 font-medium"
              >
                <option value="PENDING">Pending Review</option>
                <option value="IN_REVIEW">Under Review</option>
                <option value="IN_PROGRESS">In Progress (Crew Deployed)</option>
                <option value="RESOLVED">Resolved (Completed)</option>
                <option value="REJECTED">Declined / Out of Scope</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Priority Classification</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-hidden focus:border-blue-600 font-medium"
              >
                <option value="CRITICAL">Critical (4h SLA)</option>
                <option value="HIGH">High Priority (24h SLA)</option>
                <option value="MEDIUM">Medium Priority (48h SLA)</option>
                <option value="LOW">Low / Routine (7d SLA)</option>
              </select>
            </div>
          </div>

          {/* Department & Officer */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Assigned Department</label>
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-hidden focus:border-blue-600"
              >
                {DEPARTMENTS.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Responsible Officer / Engineer</label>
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                placeholder="e.g. Er. Rajesh Sharma"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-hidden focus:border-blue-600"
              />
            </div>
          </div>

          {/* Official Resolution / Progress Notes */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Field Progress or Resolution Report Notes <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Road repair squad Unit-4 deployed with hot mix asphalt. Hole filled, roller compacted and open for vehicular traffic."
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-hidden focus:border-blue-600 leading-relaxed"
            />
          </div>

          {/* Resolution Proof Photo (Especially if setting status to RESOLVED) */}
          <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <label className="block font-semibold text-slate-700 flex items-center justify-between">
              <span>Resolution Proof Photograph</span>
              {status === 'RESOLVED' && (
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                  Required for Public Transparency
                </span>
              )}
            </label>

            <div className="flex items-center gap-3">
              {proofImage ? (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                  <img src={proofImage} alt="Proof" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setProofImage('')}
                    className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-black text-white rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-lg border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 bg-white shrink-0">
                  <Camera className="w-5 h-5 mb-1" />
                  <span className="text-[9px]">No Photo</span>
                </div>
              )}

              <div className="flex-1 space-y-1.5">
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 shadow-2xs">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Inspection Photo</span>
                  <input type="file" accept="image/*" onChange={handleProofUpload} className="hidden" />
                </label>

                <p className="text-[10px] text-slate-500 font-medium">Or select standard demo completion proof:</p>
                <div className="flex flex-wrap gap-1">
                  {RESOLUTION_SAMPLE_PHOTOS.map((sp, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSampleProof(sp.url)}
                      className={`text-[10px] px-2 py-0.5 rounded-md border ${
                        proofImage === sp.url
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {sp.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 text-xs"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-semibold text-xs shadow-xs transition-colors"
            >
              {isSaving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Updating Case File...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-300" />
                  <span>Save Official Update</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
