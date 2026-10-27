import React from 'react';
import { STATUS_CONFIG, PRIORITY_CONFIG, ISSUE_CATEGORIES } from '../../constants/constants';
import { 
  Clock, Eye, Wrench, CheckCircle2, XCircle, 
  AlertTriangle, Trash2, Lightbulb, Droplets, Building2, ShieldAlert 
} from 'lucide-react';

const CATEGORY_ICONS = {
  roads: AlertTriangle,
  garbage: Trash2,
  streetlights: Lightbulb,
  water: Droplets,
  infrastructure: Building2,
  hazard: ShieldAlert
};

export const StatusBadge = ({ status, size = 'sm' }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
  const sizeClasses = size === 'xs' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.color} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
      {config.label}
    </span>
  );
};

export const PriorityBadge = ({ priority, size = 'sm' }) => {
  const config = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.MEDIUM;
  const sizeClasses = size === 'xs' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${config.badge} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
};

export const CategoryBadge = ({ categoryId }) => {
  const cat = ISSUE_CATEGORIES.find(c => c.id === categoryId) || { name: categoryId, color: '#64748b' };
  const IconComponent = CATEGORY_ICONS[categoryId] || AlertTriangle;

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
      <IconComponent className="w-3.5 h-3.5 text-slate-500" />
      {cat.name}
    </span>
  );
};
