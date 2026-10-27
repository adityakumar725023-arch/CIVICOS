import React from 'react';
import { 
  ThumbsUp, 
  MapPin, 
  Clock, 
  Building2, 
  CheckCircle2, 
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../common/Badge';

export const IssueCard = ({ complaint, onSelect, onToggleUpvote }) => {
  const isResolved = complaint.status === 'RESOLVED';
  const hasProof = Boolean(complaint.resolutionProofImage);

  // Format date readable
  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group">
      
      <div>
        {/* Card Header & Photo */}
        <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
          <img 
            src={isResolved && hasProof ? complaint.resolutionProofImage : complaint.image} 
            alt={complaint.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Overlaid Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 items-center">
            <StatusBadge status={complaint.status} size="xs" />
            <PriorityBadge priority={complaint.priority} size="xs" />
          </div>

          {/* Resolved Proof Ribbon */}
          {isResolved && hasProof && (
            <div className="absolute bottom-2 left-2.5 bg-emerald-700/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Resolution Proof</span>
            </div>
          )}

          {/* Ticket ID Tag */}
          <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-white font-mono text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-xs">
            {complaint.id}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <CategoryBadge categoryId={complaint.category} />
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(complaint.createdAt)}
            </span>
          </div>

          <h3 
            onClick={() => onSelect(complaint)}
            className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {complaint.title}
          </h3>

          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
            {complaint.description}
          </p>

          {/* Ward & Location */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-start gap-1.5 text-xs text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <div className="truncate">
              <span className="font-medium text-slate-700 block truncate">{complaint.locationText}</span>
              <span className="text-[11px] text-slate-400 truncate block">{complaint.ward}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Upvote + Details Trigger */}
      <div className="px-4 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
        
        {/* Upvote Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleUpvote(complaint.id);
          }}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            complaint.upvotedByMe
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
          title="Endorse this civic issue in your neighborhood"
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${complaint.upvotedByMe ? 'fill-white' : ''}`} />
          <span>{complaint.upvotes || 0}</span>
          <span className="hidden sm:inline text-[11px] font-normal">Upvotes</span>
        </button>

        <div className="flex items-center gap-2">
          {complaint.comments?.length > 0 && (
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              {complaint.comments.length}
            </span>
          )}

          <button
            onClick={() => onSelect(complaint)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900 group/btn"
          >
            <span>View Timeline</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>

    </div>
  );
};
