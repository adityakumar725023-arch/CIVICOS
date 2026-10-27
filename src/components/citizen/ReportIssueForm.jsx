import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Trash2, 
  Lightbulb, 
  Droplets, 
  Building2, 
  ShieldAlert,
  Camera, 
  MapPin, 
  Upload, 
  X, 
  Check, 
  Navigation, 
  Info,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ISSUE_CATEGORIES, DEPARTMENTS, WARDS, PRIORITY_CONFIG, DEMO_PRESETS } from '../../constants/constants';

const CATEGORY_ICONS = {
  roads: AlertTriangle,
  garbage: Trash2,
  streetlights: Lightbulb,
  water: Droplets,
  infrastructure: Building2,
  hazard: ShieldAlert
};

// Preset sample photos for quick testing during demo
const SAMPLE_PHOTOS = [
  { label: 'Pothole', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80' },
  { label: 'Garbage Dump', url: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80' },
  { label: 'Broken Streetlight', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80' },
  { label: 'Water Leak', url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80' },
  { label: 'Damaged Pavement', url: 'https://images.unsplash.com/photo-1584463699042-3e3cb8dca089?auto=format&fit=crop&w=800&q=80' }
];

export const ReportIssueForm = ({ onSubmitSuccess, onCancel }) => {
  const [categoryId, setCategoryId] = useState('roads');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ward, setWard] = useState(WARDS[0]);
  const [locationText, setLocationText] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 28.6139, lng: 77.2090 });
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [priority, setPriority] = useState('HIGH');
  const [imagePreview, setImagePreview] = useState(SAMPLE_PHOTOS[0].url);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reportedBy, setReportedBy] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Auto-detect Department based on Category
  const activeCategory = ISSUE_CATEGORIES.find(c => c.id === categoryId);
  const matchedDepartment = DEPARTMENTS.find(d => d.id === activeCategory?.departmentId);

  // Handle Category Change
  const handleCategorySelect = (id) => {
    setCategoryId(id);
    const cat = ISSUE_CATEGORIES.find(c => c.id === id);
    if (cat) {
      setPriority(cat.defaultPriority);
    }
  };

  // Quick Preset fill
  const handleLoadPreset = (preset) => {
    setTitle(preset.title);
    setCategoryId(preset.categoryId);
    setPriority(preset.priority);
    setWard(preset.ward);
    setLocationText(preset.locationText);
    setDescription(preset.description);
    setImagePreview(preset.image);
    setCoordinates({ lat: preset.lat, lng: preset.lng });
    setErrors({});
  };

  // Browser Geolocation
  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoordinates({
            lat: Number(pos.coords.latitude.toFixed(4)),
            lng: Number(pos.coords.longitude.toFixed(4))
          });
          if (!locationText) {
            setLocationText(`GPS Pin: ${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`);
          }
          setIsDetectingLocation(false);
        },
        () => {
          // Fallback realistic coordinates
          setCoordinates({ lat: 28.6139, lng: 77.2090 });
          if (!locationText) {
            setLocationText('Sector 4 Central Crossing (Detected via IP)');
          }
          setIsDetectingLocation(false);
        },
        { timeout: 6000 }
      );
    } else {
      setIsDetectingLocation(false);
    }
  };

  // Image Upload handler
  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Please provide a descriptive complaint title';
    if (!description.trim() || description.length < 15) {
      newErrors.description = 'Please describe the problem in at least 15 characters';
    }
    if (!locationText.trim()) newErrors.locationText = 'Please specify landmark or street location';
    if (!isAnonymous && !reportedBy.trim()) {
      newErrors.reportedBy = 'Please provide your name or toggle Anonymous reporting';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const payload = {
        categoryId,
        title,
        description,
        ward,
        locationText,
        coordinates,
        priority,
        image: imagePreview,
        isAnonymous,
        reportedBy: isAnonymous ? 'Anonymous Citizen' : reportedBy,
        contactPhone,
        contactEmail
      };

      onSubmitSuccess(payload);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      
      {/* Header with Quick Presets bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
              <Camera className="w-3.5 h-3.5" />
              Direct Public Grievance Portal
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Report a Civic Problem</h1>
            <p className="text-sm text-slate-500 mt-1">
              Your complaint is geo-tagged, assigned a tracking number, and routed directly to the concerned municipal department.
            </p>
          </div>

          {/* Quick Demo Fill Buttons */}
          <div className="shrink-0 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Hackathon Demo Presets:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {DEMO_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLoadPreset(preset)}
                  className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg border border-slate-200 transition-colors"
                >
                  {preset.categoryId === 'roads' ? 'Pothole' : preset.categoryId === 'garbage' ? 'Garbage' : preset.categoryId === 'streetlights' ? 'Streetlight' : 'Water Leak'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          
          {/* Step 1: Issue Category Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
              1. Select Problem Category <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {ISSUE_CATEGORIES.map((cat) => {
                const IconComponent = CATEGORY_ICONS[cat.id] || AlertTriangle;
                const isSelected = categoryId === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div 
                      className={`p-2 rounded-lg shrink-0 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-900 truncate">{cat.name}</div>
                      <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{cat.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Department auto-routing feedback notice */}
            {matchedDepartment && (
              <div className="mt-2.5 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  Auto-routing complaint to: <strong className="text-slate-800">{matchedDepartment.name}</strong>
                </span>
                <span className="text-slate-500 hidden sm:inline text-[11px]">Department Lead: {matchedDepartment.head}</span>
              </div>
            )}
          </div>

          {/* Step 2: Title and Description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Complaint Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Deep dangerous pothole on flyover descent"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors ${
                  errors.title ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
                }`}
              />
              {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Urgency Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              >
                <option value="CRITICAL">Critical (Safety hazard - 4h SLA)</option>
                <option value="HIGH">High Priority (Severe - 24h SLA)</option>
                <option value="MEDIUM">Medium Priority (Standard - 48h SLA)</option>
                <option value="LOW">Low / Routine Maintenance (7d SLA)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what happened, exact location nuances, time noticed, or hazard risks to pedestrians/vehicles..."
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors ${
                errors.description ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
              }`}
            />
            {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
          </div>

          {/* Step 3: Location Details */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                2. Location & Ward Details <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isDetectingLocation}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
              >
                <Navigation className={`w-3.5 h-3.5 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                <span>{isDetectingLocation ? 'Detecting GPS...' : 'Use My Current Location'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-600 mb-1">Administrative Ward</label>
                <select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:outline-hidden focus:border-blue-600"
                >
                  {WARDS.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Street Address or Landmark <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={locationText}
                  onChange={(e) => setLocationText(e.target.value)}
                  placeholder="e.g. Opposite Pillar 14, Near City Hospital"
                  className={`w-full px-3 py-2 rounded-lg border text-sm bg-white focus:outline-hidden focus:border-blue-600 ${
                    errors.locationText ? 'border-red-500' : 'border-slate-200'
                  }`}
                />
                {errors.locationText && <p className="text-xs text-red-600 mt-0.5">{errors.locationText}</p>}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span>Geo-tag:</span>
              <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                Lat: {coordinates.lat}, Lng: {coordinates.lng}
              </span>
            </div>
          </div>

          {/* Step 4: Photo Evidence Upload */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              3. Visual Evidence / Photo
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              {/* Image Preview Box */}
              <div className="md:col-span-1">
                {imagePreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video md:aspect-square bg-slate-100 group">
                    <img 
                      src={imagePreview} 
                      alt="Complaint preview" 
                      className="w-full h-full object-cover" 
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview('')}
                      className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black text-white rounded-full transition-colors"
                      title="Remove photo"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-sm">
                      Geo-tagged Photo
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border-2 border-dashed border-slate-300 p-6 flex flex-col items-center justify-center text-center aspect-video md:aspect-square bg-slate-50">
                    <Camera className="w-8 h-8 text-slate-400 mb-2" />
                    <p className="text-xs text-slate-500">No photo selected</p>
                  </div>
                )}
              </div>

              {/* Upload & Sample Presets */}
              <div className="md:col-span-2 space-y-3">
                <div className="flex flex-wrap gap-2">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:border-slate-400 text-slate-700 shadow-xs transition-colors">
                    <Upload className="w-4 h-4 text-slate-500" />
                    <span>Upload from Device</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageFile} 
                      className="hidden" 
                    />
                  </label>
                </div>

                <div>
                  <p className="text-[11px] text-slate-500 mb-1.5 font-medium">Or select high-res sample civic photo for instant test:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {SAMPLE_PHOTOS.map((sp, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setImagePreview(sp.url)}
                        className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                          imagePreview === sp.url
                            ? 'bg-blue-50 border-blue-400 text-blue-700 font-medium'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {sp.label}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Clear photographs allow the engineering department to assess equipment, asphalt volume, or safety barricades needed before deploying crews.
                </p>
              </div>
            </div>
          </div>

          {/* Step 5: Citizen Contact or Anonymous Reporting */}
          <div className="border-t border-slate-200 pt-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  4. Citizen Identification & Updates
                </label>
                <p className="text-xs text-slate-500">We send real-time SMS & email notifications when your issue moves to In-Progress or Resolved.</p>
              </div>

              {/* Anonymous toggle */}
              <label className="inline-flex items-center cursor-pointer gap-2">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-xs font-medium text-slate-700">Report Anonymously</span>
              </label>
            </div>

            {!isAnonymous ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Your Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={reportedBy}
                    onChange={(e) => setReportedBy(e.target.value)}
                    placeholder="Aditya Verma"
                    className={`w-full px-3 py-2 rounded-lg border text-sm bg-white focus:outline-hidden focus:border-blue-600 ${
                      errors.reportedBy ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.reportedBy && <p className="text-xs text-red-600 mt-0.5">{errors.reportedBy}</p>}
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">Mobile (for SMS Tracking)</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="citizen@example.com"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                <span>You are submitting as an Anonymous Citizen. Your contact details will not be recorded, but you can track this issue anytime with the generated Complaint ID.</span>
              </div>
            )}
          </div>

          {/* Form Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 shadow-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Lodging Grievance...</span>
                </>
              ) : (
                <>
                  <span>Submit Civic Complaint</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
