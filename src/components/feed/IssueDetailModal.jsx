import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  ThumbsUp, 
  CheckCircle2, 
  Send, 
  User, 
  Building2, 
  Calendar, 
  AlertCircle,
  FileCheck2,
  Share2,
  Check,
  Wrench,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../common/Badge';
import { STATUS_CONFIG, DEPARTMENTS } from '../../constants/constants';

export const IssueDetailModal = ({ 
  complaint, 
  onClose, 
  onToggleUpvote, 
  onAddComment, 
  onOpenStatusUpdate,
  userRole 
}) => {
  const [commentText, setCommentText] = useState('');
  const [activePhotoTab, setActivePhotoTab] = useState('reported'); // 'reported' or 'resolved'
  const [copied, setCopied] = useState(false);

  if (!complaint) return null;

  const isResolved = complaint.status === 'RESOLVED';
  const hasProof = Boolean(complaint.resolutionProofImage);
  const matchedDept = DEPARTMENTS.find(d => d.id === complaint.departmentId);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + '?complaint=' + complaint.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onAddComment(complaint.id, {
      author: userRole === 'admin' ? 'Municipal Officer' : 'Concerned Citizen',
      role: userRole === 'admin' ? 'Municipal Officer' : 'Citizen',
      text: commentText.trim()
    });

    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Top Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50/60 rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-sm font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
              {complaint.id}
            </span>
            <StatusBadge status={complaint.status} />
            <PriorityBadge priority={complaint.priority} />
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors"
              title="Copy link to this complaint"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1">
          
          {/* Title & Metadata */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CategoryBadge categoryId={complaint.category} />
              <span className="text-xs text-slate-400">
                Lodged {new Date(complaint.createdAt).toLocaleString()}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">{complaint.title}</h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">{complaint.description}</p>
          </div>

          {/* Visual Evidence Tabs (Before vs Resolution Proof) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Visual Inspection Evidence
              </span>

              {hasProof && (
                <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    onClick={() => setActivePhotoTab('reported')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                      activePhotoTab === 'reported' ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-600'
                    }`}
                  >
                    Initial Problem
                  </button>
                  <button
                    onClick={() => setActivePhotoTab('resolved')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md flex items-center gap-1 transition-all ${
                      activePhotoTab === 'resolved' ? 'bg-emerald-600 text-white shadow-xs font-semibold' : 'text-emerald-700 hover:text-emerald-900'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Resolution Proof</span>
                  </button>
                </div>
              )}
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-950 aspect-video max-h-72 w-full relative">
              <img
                src={activePhotoTab === 'resolved' && hasProof ? complaint.resolutionProofImage : complaint.image}
                alt="Complaint inspection"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md">
                {activePhotoTab === 'resolved' && hasProof ? 'Official Repair / Cleanliness Proof' : 'Initial Citizen Geo-tag Photo'}
              </div>
            </div>
          </div>

          {/* Resolution Remarks Box (If resolved or in progress) */}
          {complaint.resolutionNotes && (
            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-emerald-800">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>Municipal Resolution & Field Remarks:</span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed font-sans">{complaint.resolutionNotes}</p>
              {complaint.resolvedAt && (
                <p className="text-[11px] text-emerald-700 mt-2">
                  Completed: {new Date(complaint.resolvedAt).toLocaleString()}
                </p>
              )}
            </div>
          )}

          {/* Key Incident Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Location & Landmark</span>
              <span className="font-semibold text-slate-800">{complaint.locationText}</span>
              <span className="text-slate-500 block text-[11px] mt-0.5">{complaint.ward}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Department in Charge</span>
              <span className="font-semibold text-slate-800">{matchedDept?.name || 'Municipal Works'}</span>
              <span className="text-slate-500 block text-[11px] mt-0.5">Assigned: {complaint.assignedOfficer || 'Zonal Field Engineer'}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Reported By</span>
              <span className="font-medium text-slate-800">{complaint.reportedBy}</span>
              {complaint.contactPhone && <span className="text-slate-500 block text-[11px]">{complaint.contactPhone}</span>}
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Citizen Community Endorsements</span>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => onToggleUpvote(complaint.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold text-xs transition-colors ${
                    complaint.upvotedByMe
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${complaint.upvotedByMe ? 'fill-white' : ''}`} />
                  <span>{complaint.upvotes || 0} Upvotes</span>
                </button>
              </div>
            </div>
          </div>

          {/* Audit Trail / Timeline */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              Official Resolution Audit Trail
            </h3>

            <div className="border-l-2 border-slate-200 ml-3 space-y-4 pl-4 py-1">
              {complaint.timeline?.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline node */}
                  <span className={`absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                    step.status === 'RESOLVED' ? 'bg-emerald-500' :
                    step.status === 'IN_PROGRESS' ? 'bg-purple-500' :
                    step.status === 'IN_REVIEW' ? 'bg-blue-500' : 'bg-amber-500'
                  }`} />
                  
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-semibold text-slate-800">{step.actor}</span>
                    <span className="text-[11px] text-slate-400">{new Date(step.timestamp).toLocaleDateString()} {new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{step.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Citizen & Authority Comments */}
          <div className="border-t border-slate-200 pt-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Public Discussion & Verification Remarks ({complaint.comments?.length || 0})
            </h3>

            <div className="space-y-2.5 mb-4">
              {complaint.comments && complaint.comments.length > 0 ? (
                complaint.comments.map((c) => (
                  <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <User className="w-3 h-3 text-slate-400" />
                        {c.author}
                        {c.role === 'Municipal Officer' && (
                          <span className="px-1.5 py-0.2 bg-blue-100 text-blue-800 text-[10px] rounded-sm font-semibold">
                            Authority
                          </span>
                        )}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(c.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{c.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">No comments yet. Share an update or neighborhood verification.</p>
              )}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a citizen comment or verification..."
                className="flex-1 px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-hidden focus:border-blue-600"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-medium text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </form>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-slate-200 flex items-center justify-between shrink-0 bg-slate-50/60 rounded-b-2xl">
          <div className="text-xs text-slate-500">
            CivicSOS Open Transparency Engine
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Authority Action trigger if Admin role */}
            <button
              onClick={() => {
                onClose();
                onOpenStatusUpdate(complaint);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-900 text-white hover:bg-blue-950 transition-colors shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
              <span>Update Status / Action</span>
            </button>

            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
