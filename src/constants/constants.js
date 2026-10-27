export const ISSUE_CATEGORIES = [
  {
    id: 'roads',
    name: 'Roads & Potholes',
    icon: 'AlertTriangle',
    departmentId: 'dept_roads',
    color: '#e11d48',
    defaultPriority: 'HIGH',
    description: 'Potholes, damaged asphalt, cave-ins, and uneven road surfaces'
  },
  {
    id: 'garbage',
    name: 'Garbage & Sanitation',
    icon: 'Trash2',
    departmentId: 'dept_sanitation',
    color: '#d97706',
    defaultPriority: 'MEDIUM',
    description: 'Overflowing dumpsters, roadside waste piles, and unsanitary conditions'
  },
  {
    id: 'streetlights',
    name: 'Streetlights & Electrical',
    icon: 'Lightbulb',
    departmentId: 'dept_electric',
    color: '#eab308',
    defaultPriority: 'MEDIUM',
    description: 'Flickering or unlit streetlights, exposed wires, and power poles'
  },
  {
    id: 'water',
    name: 'Water & Drainage',
    icon: 'Droplets',
    departmentId: 'dept_water',
    color: '#0284c7',
    defaultPriority: 'HIGH',
    description: 'Burst pipelines, contaminated water, clogged storm drains, and sewage overflow'
  },
  {
    id: 'infrastructure',
    name: 'Public Infrastructure',
    icon: 'Building2',
    departmentId: 'dept_works',
    color: '#7c3aed',
    defaultPriority: 'LOW',
    description: 'Broken footpaths, damaged road dividers, vandalized bus stops, and railings'
  },
  {
    id: 'hazard',
    name: 'Health & Public Safety',
    icon: 'ShieldAlert',
    departmentId: 'dept_health',
    color: '#dc2626',
    defaultPriority: 'CRITICAL',
    description: 'Fallen trees, hazardous chemicals, stagnant mosquito water, and structural danger'
  }
];

export const DEPARTMENTS = [
  { id: 'dept_roads', name: 'Roads & Bridges Department', head: 'Er. Rajesh Sharma', email: 'roads@civic.gov', phone: '+91 98100 23451' },
  { id: 'dept_sanitation', name: 'Solid Waste & Sanitation Board', head: 'Dr. Sunita Rao', email: 'sanitation@civic.gov', phone: '+91 98100 23452' },
  { id: 'dept_electric', name: 'Municipal Electricity Board', head: 'Er. Ankit Verma', email: 'electrical@civic.gov', phone: '+91 98100 23453' },
  { id: 'dept_water', name: 'Water Supply & Sewerage Authority', head: 'Er. Pradeep Nair', email: 'water@civic.gov', phone: '+91 98100 23454' },
  { id: 'dept_works', name: 'Public Works & Urban Amenities', head: 'Ar. Neha Kulkarni', email: 'pworks@civic.gov', phone: '+91 98100 23455' },
  { id: 'dept_health', name: 'Public Health & Disaster Management', head: 'Dr. Manoj Patel', email: 'health@civic.gov', phone: '+91 98100 23456' }
];

export const STATUS_CONFIG = {
  PENDING: {
    label: 'Pending Review',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    dotColor: 'bg-amber-500',
    markerColor: '#d97706',
    icon: 'Clock'
  },
  IN_REVIEW: {
    label: 'Under Review',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    dotColor: 'bg-blue-500',
    markerColor: '#2563eb',
    icon: 'Eye'
  },
  IN_PROGRESS: {
    label: 'In Progress',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    dotColor: 'bg-purple-500',
    markerColor: '#9333ea',
    icon: 'Wrench'
  },
  RESOLVED: {
    label: 'Resolved',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotColor: 'bg-emerald-500',
    markerColor: '#16a34a',
    icon: 'CheckCircle2'
  },
  REJECTED: {
    label: 'Declined',
    color: 'bg-slate-100 text-slate-700 border-slate-200',
    dotColor: 'bg-slate-400',
    markerColor: '#64748b',
    icon: 'XCircle'
  }
};

export const PRIORITY_CONFIG = {
  CRITICAL: {
    label: 'Critical',
    sla: '4-8 Hours',
    badge: 'bg-red-50 text-red-700 border-red-200 font-medium',
    dot: 'bg-red-600'
  },
  HIGH: {
    label: 'High Priority',
    sla: '24 Hours',
    badge: 'bg-orange-50 text-orange-700 border-orange-200 font-medium',
    dot: 'bg-orange-500'
  },
  MEDIUM: {
    label: 'Medium Priority',
    sla: '48 Hours',
    badge: 'bg-amber-50 text-amber-700 border-amber-200 font-medium',
    dot: 'bg-amber-500'
  },
  LOW: {
    label: 'Standard / Low',
    sla: '7 Days',
    badge: 'bg-slate-50 text-slate-600 border-slate-200 font-medium',
    dot: 'bg-slate-400'
  }
};

export const WARDS = [
  'Ward 1 - Central Business District',
  'Ward 2 - Metro Station North',
  'Ward 3 - Green Park & University',
  'Ward 4 - Gandhi Nagar Residential',
  'Ward 5 - Industrial Corridor East',
  'Ward 6 - Old City Market',
  'Ward 7 - Westside Suburbs & Tech Zone',
  'Ward 8 - Riverfront Boulevard'
];

export const DEMO_PRESETS = [
  {
    title: 'Severe Deep Pothole after Heavy Rain',
    categoryId: 'roads',
    priority: 'HIGH',
    ward: 'Ward 1 - Central Business District',
    locationText: 'Near City Hospital Crossing, Main Ring Road',
    description: 'Deep circular pothole approximately 1.5 feet wide and 8 inches deep in the middle lane. Two two-wheelers skidded this morning during peak office traffic.',
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    lat: 28.6139,
    lng: 77.2090
  },
  {
    title: 'Overflowing Municipal Dumpster and Stray Cattle',
    categoryId: 'garbage',
    priority: 'MEDIUM',
    ward: 'Ward 6 - Old City Market',
    locationText: 'Opposite Community Hall, 3rd Cross Road',
    description: 'Waste has not been cleared for 4 days. Strong foul odor causing distress to nearby school students. Garbage spilling onto walking footpath.',
    image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80',
    lat: 28.6250,
    lng: 77.2180
  },
  {
    title: 'Non-Functional Streetlights for 300m Stretch',
    categoryId: 'streetlights',
    priority: 'MEDIUM',
    ward: 'Ward 4 - Gandhi Nagar Residential',
    locationText: 'Block C Lane 4, near Children Public Park',
    description: 'Five consecutive street lamp posts are completely dark since Friday thunderstorm. Area is unsafe for women pedestrians and evening joggers.',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    lat: 28.6380,
    lng: 77.2050
  },
  {
    title: 'Main Drinking Water Pipeline Burst with Severe Flooding',
    categoryId: 'water',
    priority: 'CRITICAL',
    ward: 'Ward 3 - Green Park & University',
    locationText: 'Outside University Gate No. 2, Avenue Road',
    description: 'High-pressure clean water gushing out onto road from underground pipe joint. Road is inundated with 6 inches of water, causing severe traffic diversion and water wastage.',
    image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
    lat: 28.6050,
    lng: 77.2200
  }
];
