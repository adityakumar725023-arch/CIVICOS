import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileSpreadsheet,
  Building2,
  ChevronDown
} from 'lucide-react';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../common/Badge';
import { DEPARTMENTS, STATUS_CONFIG } from '../../constants/constants';

export const ComplaintTable = ({ 
  complaints, 
  onSelectComplaint, 
  onOpenStatusUpdate, 
  onExportCSV 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const filtered = useMemo(() => {
    return complaints.filter((c) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const mId = c.id.toLowerCase().includes(q);
        const mTitle = c.title.toLowerCase().includes(q);
        const mLoc = c.locationText.toLowerCase().includes(q);
        const mOfficer = (c.assignedOfficer || '').toLowerCase().includes(q);
        if (!mId && !mTitle && !mLoc && !mOfficer) return false;
      }
      if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
      if (deptFilter !== 'ALL' && c.departmentId !== deptFilter) return false;
      if (priorityFilter !== 'ALL' && c.priority !== priorityFilter) return false;
      return true;
    });
  }, [complaints, searchTerm, statusFilter, deptFilter, priorityFilter]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      
      {/* Table Controls Bar */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search complaints by ID, title, officer, or locality..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:border-blue-600"
          />
        </div>

        {/* Filter dropdowns */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending Review</option>
            <option value="IN_REVIEW">Under Review</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>

          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">All Departments</option>
            {DEPARTMENTS.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">All Priorities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          <button
            onClick={onExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 font-medium"
            title="Download CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-4 py-3">Case ID</th>
              <th className="px-4 py-3">Grievance & Category</th>
              <th className="px-4 py-3">Ward & Locality</th>
              <th className="px-4 py-3">Priority / SLA</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Assigned Dept & Officer</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length > 0 ? (
              filtered.map((c) => {
                const isOverdue = c.priority === 'CRITICAL' && c.status === 'PENDING';
                return (
                  <tr 
                    key={c.id} 
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isOverdue ? 'bg-red-50/20' : ''
                    }`}
                  >
                    
                    {/* Case ID */}
                    <td className="px-4 py-3 font-mono font-semibold text-slate-900 whitespace-nowrap">
                      <button
                        onClick={() => onSelectComplaint(c)}
                        className="hover:text-blue-700 hover:underline"
                      >
                        {c.id}
                      </button>
                    </td>

                    {/* Grievance & Category */}
                    <td className="px-4 py-3 max-w-xs">
                      <div className="font-semibold text-slate-900 line-clamp-1">{c.title}</div>
                      <div className="mt-1">
                        <CategoryBadge categoryId={c.category} />
                      </div>
                    </td>

                    {/* Ward & Locality */}
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-800 line-clamp-1">{c.locationText}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{c.ward.split(' - ')[0]}</div>
                    </td>

                    {/* Priority */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <PriorityBadge priority={c.priority} size="xs" />
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={c.status} size="xs" />
                    </td>

                    {/* Dept & Officer */}
                    <td className="px-4 py-3 max-w-[180px]">
                      <div className="text-slate-800 font-medium truncate">
                        {c.assignedOfficer || 'Unassigned'}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {DEPARTMENTS.find(d => d.id === c.departmentId)?.name || 'General Works'}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onSelectComplaint(c)}
                          className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-slate-100 rounded-md transition-colors"
                          title="View full audit trail & details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onOpenStatusUpdate(c)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-900 text-white rounded-md text-xs font-semibold hover:bg-blue-950 transition-colors shadow-2xs"
                          title="Update status & resolution notes"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-300" />
                          <span>Action</span>
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-400 italic">
                  No complaints found matching current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-4 py-3 border-t border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs text-slate-500">
        <span>Showing <strong className="text-slate-800">{filtered.length}</strong> of {complaints.length} municipal records</span>
        <span className="text-[11px] text-slate-400">Click Action to update SLA status & field dispatch notes</span>
      </div>

    </div>
  );
};
