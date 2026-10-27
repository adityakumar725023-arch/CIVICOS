import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { 
  MapPin, 
  Layers, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Info,
  Maximize2
} from 'lucide-react';
import { StatusBadge, PriorityBadge } from '../common/Badge';
import { ISSUE_CATEGORIES, STATUS_CONFIG } from '../../constants/constants';

// Create custom leaflet DivIcon with dynamic color
const createCustomPin = (status) => {
  const color = STATUS_CONFIG[status]?.markerColor || '#d97706';
  
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2.5px solid white;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 11px;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

export const CivicMap = ({ complaints, onSelectComplaint }) => {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Filter complaints that have coordinates
  const filteredComplaints = complaints.filter(c => {
    if (!c.coordinates || !c.coordinates.lat || !c.coordinates.lng) return false;
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (categoryFilter !== 'ALL' && c.category !== categoryFilter) return false;
    return true;
  });

  const defaultCenter = [28.6189, 77.2140]; // Central Municipal Zone

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-4">
      
      {/* Top Map Header & Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-700" />
            <span>Geospatial Incident Command Map</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time GPS distribution of municipal grievances across sectors.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-hidden"
            >
              <option value="ALL">All Statuses ({complaints.length})</option>
              <option value="PENDING">Pending Review</option>
              <option value="IN_REVIEW">Under Review</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-hidden"
            >
              <option value="ALL">All Categories</option>
              {ISSUE_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Map Legend Banner */}
      <div className="bg-slate-50 rounded-lg border border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-semibold text-slate-700">Map Legend:</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Pending Review
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Under Review
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> In Progress
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Resolved
          </span>
        </div>

        <span className="text-[11px] text-slate-400">
          Showing <strong className="text-slate-700">{filteredComplaints.length}</strong> geolocated incidents
        </span>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs relative h-[580px] w-full">
        <MapContainer
          center={defaultCenter}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredComplaints.map((c) => (
            <Marker
              key={c.id}
              position={[c.coordinates.lat, c.coordinates.lng]}
              icon={createCustomPin(c.status)}
            >
              <Popup>
                <div className="p-3 max-w-xs font-sans">
                  <div className="relative aspect-video rounded-md overflow-hidden mb-2 bg-slate-100">
                    <img 
                      src={c.status === 'RESOLVED' && c.resolutionProofImage ? c.resolutionProofImage : c.image} 
                      alt={c.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-1 right-1 bg-black/75 text-white font-mono text-[10px] px-1.5 py-0.5 rounded-sm">
                      {c.id}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mb-1">
                    <StatusBadge status={c.status} size="xs" />
                    <PriorityBadge priority={c.priority} size="xs" />
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">{c.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{c.locationText}</p>

                  <button
                    onClick={() => onSelectComplaint(c)}
                    className="mt-2.5 w-full py-1.5 px-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md text-xs font-semibold text-center transition-colors block"
                  >
                    Open Incident Timeline
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

    </div>
  );
};
