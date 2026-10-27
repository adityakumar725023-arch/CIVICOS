import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { IssueCard } from './IssueCard';
import { ISSUE_CATEGORIES, WARDS, STATUS_CONFIG } from '../../constants/constants';

export const PublicFeed = ({ 
  complaints, 
  onSelectComplaint, 
  onToggleUpvote, 
  onNavigateReport 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedWard, setSelectedWard] = useState('ALL');
  const [sortBy, setSortBy] = useState('latest'); // 'latest', 'upvotes', 'priority'

  // Filter and Sort complaints
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      // Search term filter (ID, title, description, location)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesId = c.id.toLowerCase().includes(query);
        const matchesTitle = c.title.toLowerCase().includes(query);
        const matchesDesc = c.description.toLowerCase().includes(query);
        const matchesLoc = c.locationText.toLowerCase().includes(query);
        if (!matchesId && !matchesTitle && !matchesDesc && !matchesLoc) return false;
      }

      // Status filter
      if (selectedStatus !== 'ALL' && c.status !== selectedStatus) return false;

      // Category filter
      if (selectedCategory !== 'ALL' && c.category !== selectedCategory) return false;

      // Ward filter
      if (selectedWard !== 'ALL' && c.ward !== selectedWard) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'upvotes') {
        return (b.upvotes || 0) - (a.upvotes || 0);
      }
      if (sortBy === 'priority') {
        const priorityWeight = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
        return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
      }
      // default: latest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [complaints, searchTerm, selectedStatus, selectedCategory, selectedWard, sortBy]);

  const statusTabs = [
    { id: 'ALL', label: 'All Issues', count: complaints.length },
    { id: 'PENDING', label: 'Pending', count: complaints.filter(c => c.status === 'PENDING').length },
    { id: 'IN_REVIEW', label: 'Under Review', count: complaints.filter(c => c.status === 'IN_REVIEW').length },
    { id: 'IN_PROGRESS', label: 'In Progress', count: complaints.filter(c => c.status === 'IN_PROGRESS').length },
    { id: 'RESOLVED', label: 'Resolved', count: complaints.filter(c => c.status === 'RESOLVED').length }
  ];

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('ALL');
    setSelectedCategory('ALL');
    setSelectedWard('ALL');
    setSortBy('latest');
  };

  const hasActiveFilters = searchTerm !== '' || selectedStatus !== 'ALL' || selectedCategory !== 'ALL' || selectedWard !== 'ALL';

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Top Banner / Feed Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Public Grievance Feed & Transparency Portal</h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse real-time civic issues filed across the city, track repair progress, and upvote local problems to increase municipal priority.
          </p>
        </div>

        <button
          onClick={onNavigateReport}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 transition-colors shadow-xs self-start md:self-auto shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-blue-200" />
          <span>Report New Problem</span>
        </button>
      </div>

      {/* Search & Filters Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        
        {/* Search input + Sort dropdown */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Complaint ID (e.g. CV-2026-1042), keyword, or street..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white text-slate-700 focus:outline-hidden focus:border-blue-600 w-full sm:w-auto"
            >
              <option value="latest">Latest Reported</option>
              <option value="upvotes">Most Upvoted by Citizens</option>
              <option value="priority">Highest Urgency</option>
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none border-t border-slate-100">
          {statusTabs.map((tab) => {
            const isSelected = selectedStatus === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-blue-900 text-white shadow-xs font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filters: Category & Ward */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1 text-slate-500 font-medium mr-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filters:</span>
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1 rounded-md border border-slate-200 text-xs bg-slate-50 text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">All Categories</option>
            {ISSUE_CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Ward Dropdown */}
          <select
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className="px-2.5 py-1 rounded-md border border-slate-200 text-xs bg-slate-50 text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">All Administrative Wards</option>
            {WARDS.map(w => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs text-blue-700 hover:text-blue-900 font-medium px-2 py-1 rounded-md hover:bg-blue-50 transition-colors ml-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

      </div>

      {/* Feed Result Info */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-800">{filteredComplaints.length}</strong> complaints
          {hasActiveFilters && ' (filtered)'}
        </span>
        <span className="text-[11px] text-slate-400">Click any card to inspect full timeline & before/after evidence</span>
      </div>

      {/* Cards Grid */}
      {filteredComplaints.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredComplaints.map((complaint) => (
            <IssueCard
              key={complaint.id}
              complaint={complaint}
              onSelect={onSelectComplaint}
              onToggleUpvote={onToggleUpvote}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
          <AlertTriangle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-800">No matching civic issues found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords, clearing status filters, or lodge a new problem in your area.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={handleResetFilters}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Reset Filters
            </button>
            <button
              onClick={onNavigateReport}
              className="px-3 py-1.5 rounded-lg bg-blue-700 text-xs font-semibold text-white hover:bg-blue-800"
            >
              Lodge Complaint
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
