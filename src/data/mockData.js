export const INITIAL_COMPLAINTS = [
  {
    id: 'CV-2026-1042',
    title: 'Hazardous Crater Pothole on Ring Road Flyover Descent',
    category: 'roads',
    departmentId: 'dept_roads',
    description: 'A deep pothole of roughly 1.5 ft width has formed right at the descent of the flyover. High-speed traffic is forced to swerve suddenly into adjacent lanes, causing near-accidents.',
    ward: 'Ward 1 - Central Business District',
    locationText: 'Ring Road Flyover descent, 100m before City Hospital signal',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    reportedBy: 'Kunal Singhania',
    contactPhone: '+91 98201 44512',
    contactEmail: 'kunal.s@gmail.com',
    isAnonymous: false,
    createdAt: '2026-10-25T09:30:00.000Z',
    updatedAt: '2026-10-26T14:15:00.000Z',
    upvotes: 34,
    upvotedByMe: false,
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    resolutionProofImage: null,
    resolutionNotes: 'Rapid repair crew dispatched with cold asphalt mix. Patching underway; expected completion by 6:00 PM today.',
    resolvedAt: null,
    assignedOfficer: 'Er. Rajesh Sharma (Roads Division)',
    timeline: [
      {
        timestamp: '2026-10-25T09:30:00.000Z',
        status: 'PENDING',
        actor: 'Citizen (Kunal Singhania)',
        note: 'Complaint registered via CivicSOS Mobile Portal with geotagged photo.'
      },
      {
        timestamp: '2026-10-25T11:45:00.000Z',
        status: 'IN_REVIEW',
        actor: 'Central Control Dispatcher',
        note: 'Assigned to Roads & Bridges Department. Priority classified as HIGH due to flyover descent location.'
      },
      {
        timestamp: '2026-10-26T14:15:00.000Z',
        status: 'IN_PROGRESS',
        actor: 'Er. Rajesh Sharma',
        note: 'Field engineer site inspection completed. Cold-patch repair team Unit-7 deployed on site.'
      }
    ],
    comments: [
      {
        id: 'c1',
        author: 'Ravi Teja (Citizen)',
        role: 'Citizen',
        text: 'Nearly fell off my bike here yesterday night. Thank you for taking this up urgently!',
        timestamp: '2026-10-25T18:20:00.000Z'
      },
      {
        id: 'c2',
        author: 'Er. Rajesh Sharma',
        role: 'Municipal Officer',
        text: 'Safety cones placed around the crater. Permanent asphalt curing in progress.',
        timestamp: '2026-10-26T14:30:00.000Z'
      }
    ]
  },
  {
    id: 'CV-2026-1038',
    title: 'Overflowing Commercial Dumpster Spilling into Vegetable Market',
    category: 'garbage',
    departmentId: 'dept_sanitation',
    description: 'Community garbage dumpster has not been emptied for 4 days. Waste has spilled over 15 meters across the pedestrian walkway, attracting stray cattle and causing foul odor.',
    ward: 'Ward 6 - Old City Market',
    locationText: 'Opposite Subzi Mandi Gate 3, Cross Road 4',
    coordinates: { lat: 28.6250, lng: 77.2180 },
    status: 'RESOLVED',
    priority: 'MEDIUM',
    reportedBy: 'Meera Iyer',
    contactPhone: '+91 97112 88290',
    contactEmail: 'meera.iyer@outlook.com',
    isAnonymous: false,
    createdAt: '2026-10-24T08:15:00.000Z',
    updatedAt: '2026-10-25T16:45:00.000Z',
    upvotes: 47,
    upvotedByMe: true,
    image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80',
    resolutionProofImage: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    resolutionNotes: 'Sanitation Compactor Truck No. DL-1C-4421 cleared 3.2 tons of mixed solid waste. Area bleached and sanitized with lime powder.',
    resolvedAt: '2026-10-25T16:45:00.000Z',
    assignedOfficer: 'Dr. Sunita Rao (Sanitation Board)',
    timeline: [
      {
        timestamp: '2026-10-24T08:15:00.000Z',
        status: 'PENDING',
        actor: 'Citizen (Meera Iyer)',
        note: 'Issue reported with photo evidence.'
      },
      {
        timestamp: '2026-10-24T10:00:00.000Z',
        status: 'IN_REVIEW',
        actor: 'Sanitation Zonal Supervisor',
        note: 'Route rescheduled for morning compactor.'
      },
      {
        timestamp: '2026-10-25T11:00:00.000Z',
        status: 'IN_PROGRESS',
        actor: 'Sanitation Crew',
        note: 'Compactor vehicle arrived on site.'
      },
      {
        timestamp: '2026-10-25T16:45:00.000Z',
        status: 'RESOLVED',
        actor: 'Dr. Sunita Rao',
        note: 'Area cleared, disinfected, and secondary bin installed.'
      }
    ],
    comments: [
      {
        id: 'c3',
        author: 'Dr. Sunita Rao',
        role: 'Municipal Officer',
        text: 'Secondary waste bin has also been positioned to prevent future overflow on weekend market days.',
        timestamp: '2026-10-25T17:00:00.000Z'
      }
    ]
  },
  {
    id: 'CV-2026-1051',
    title: 'High Pressure Water Pipeline Rupture Flooding Main Road',
    category: 'water',
    departmentId: 'dept_water',
    description: 'Underground drinking water main line burst this morning. Drinking water is flooding Avenue Road and seeping into basement parking of nearby residential complexes.',
    ward: 'Ward 3 - Green Park & University',
    locationText: 'Avenue Road, between Pillars 45 and 46',
    coordinates: { lat: 28.6050, lng: 77.2200 },
    status: 'PENDING',
    priority: 'CRITICAL',
    reportedBy: 'Vikramaditya Bose',
    contactPhone: '+91 98110 99401',
    contactEmail: 'vbose@edu.in',
    isAnonymous: false,
    createdAt: '2026-10-27T07:15:00.000Z',
    updatedAt: '2026-10-27T07:15:00.000Z',
    upvotes: 59,
    upvotedByMe: false,
    image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
    resolutionProofImage: null,
    resolutionNotes: null,
    resolvedAt: null,
    assignedOfficer: 'Er. Pradeep Nair (Water Authority)',
    timeline: [
      {
        timestamp: '2026-10-27T07:15:00.000Z',
        status: 'PENDING',
        actor: 'Citizen (Vikramaditya Bose)',
        note: 'Urgent pipeline failure reported. Marked as CRITICAL severity.'
      }
    ],
    comments: []
  },
  {
    id: 'CV-2026-1025',
    title: 'Five Consecutive Unlit Streetlights on Residential Link Road',
    category: 'streetlights',
    departmentId: 'dept_electric',
    description: 'Entire block of streetlights has been out for over a week. Narrow road is pitch black at night, making it very hazardous for women returning from work and school students.',
    ward: 'Ward 4 - Gandhi Nagar Residential',
    locationText: 'Block C Lane 4, near Children Public Park',
    coordinates: { lat: 28.6380, lng: 77.2050 },
    status: 'IN_REVIEW',
    priority: 'MEDIUM',
    reportedBy: 'Anonymous Citizen',
    contactPhone: '',
    contactEmail: '',
    isAnonymous: true,
    createdAt: '2026-10-26T18:40:00.000Z',
    updatedAt: '2026-10-27T09:00:00.000Z',
    upvotes: 21,
    upvotedByMe: false,
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    resolutionProofImage: null,
    resolutionNotes: null,
    resolvedAt: null,
    assignedOfficer: 'Er. Ankit Verma (Electrical Dept)',
    timeline: [
      {
        timestamp: '2026-10-26T18:40:00.000Z',
        status: 'PENDING',
        actor: 'Anonymous Citizen',
        note: 'Anonymous complaint filed.'
      },
      {
        timestamp: '2026-10-27T09:00:00.000Z',
        status: 'IN_REVIEW',
        actor: 'Er. Ankit Verma',
        note: 'Transformer fuse and line cable fault identified; hydraulic hoist truck requested.'
      }
    ],
    comments: []
  },
  {
    id: 'CV-2026-1019',
    title: 'Broken Paver Blocks and Damaged Tactile Footpath for Visually Impaired',
    category: 'infrastructure',
    departmentId: 'dept_works',
    description: 'Interlocking paver tiles and yellow tactile guidance tiles are shattered and dislodged over a 20-meter stretch right outside the Senior Citizen Center.',
    ward: 'Ward 2 - Metro Station North',
    locationText: 'Adjacent to Metro Pillar 114, Sector 7 Footpath',
    coordinates: { lat: 28.6420, lng: 77.2150 },
    status: 'RESOLVED',
    priority: 'LOW',
    reportedBy: 'Devendra Pandey',
    contactPhone: '+91 99100 12044',
    contactEmail: 'dpandey@post.com',
    isAnonymous: false,
    createdAt: '2026-10-20T11:20:00.000Z',
    updatedAt: '2026-10-23T15:30:00.000Z',
    upvotes: 18,
    upvotedByMe: false,
    image: 'https://images.unsplash.com/photo-1584463699042-3e3cb8dca089?auto=format&fit=crop&w=800&q=80',
    resolutionProofImage: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80',
    resolutionNotes: 'New heavy-duty anti-skid tactile blocks laid down. Curb cement reinforced.',
    resolvedAt: '2026-10-23T15:30:00.000Z',
    assignedOfficer: 'Ar. Neha Kulkarni (Public Works)',
    timeline: [
      {
        timestamp: '2026-10-20T11:20:00.000Z',
        status: 'PENDING',
        actor: 'Citizen (Devendra Pandey)',
        note: 'Complaint filed.'
      },
      {
        timestamp: '2026-10-21T14:00:00.000Z',
        status: 'IN_PROGRESS',
        actor: 'PWD Masonry Contractor',
        note: 'Old broken blocks removed and ground leveled.'
      },
      {
        timestamp: '2026-10-23T15:30:00.000Z',
        status: 'RESOLVED',
        actor: 'Ar. Neha Kulkarni',
        note: 'Masonry work completed and tactile alignment verified.'
      }
    ],
    comments: [
      {
        id: 'c4',
        author: 'Devendra Pandey',
        role: 'Citizen',
        text: 'Walkway is now smooth and safe for our elderly walking club. Great job team!',
        timestamp: '2026-10-24T09:10:00.000Z'
      }
    ]
  },
  {
    id: 'CV-2026-1060',
    title: 'Missing Manhole Cover on Busy School Bus Route',
    category: 'hazard',
    departmentId: 'dept_health',
    description: 'Heavy storm water manhole cover was displaced or stolen. Depth is over 7 feet. School buses pass within inches of it twice a day.',
    ward: 'Ward 5 - Industrial Corridor East',
    locationText: 'Intersection of Road 8 and Factory Gate 4',
    coordinates: { lat: 28.6180, lng: 77.2350 },
    status: 'IN_PROGRESS',
    priority: 'CRITICAL',
    reportedBy: 'Kavita Chawla',
    contactPhone: '+91 98711 02918',
    contactEmail: 'kavita.chawla@gmail.com',
    isAnonymous: false,
    createdAt: '2026-10-26T16:00:00.000Z',
    updatedAt: '2026-10-27T08:30:00.000Z',
    upvotes: 68,
    upvotedByMe: true,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    resolutionProofImage: null,
    resolutionNotes: 'High-visibility safety barricade and solar warning light placed immediately. Heavy duty ductile iron cover dispatched from central depot.',
    resolvedAt: null,
    assignedOfficer: 'Dr. Manoj Patel (Disaster Management)',
    timeline: [
      {
        timestamp: '2026-10-26T16:00:00.000Z',
        status: 'PENDING',
        actor: 'Citizen (Kavita Chawla)',
        note: 'Critical hazard flagged.'
      },
      {
        timestamp: '2026-10-26T16:40:00.000Z',
        status: 'IN_REVIEW',
        actor: 'Emergency Control Room',
        note: 'Quick Response Team alerted.'
      },
      {
        timestamp: '2026-10-26T17:15:00.000Z',
        status: 'IN_PROGRESS',
        actor: 'Emergency Response Squad 3',
        note: 'Barricade installed. Awaiting replacement frame and lid.'
      }
    ],
    comments: []
  },
  {
    id: 'CV-2026-1064',
    title: 'Illegal Dumping of Construction Debris on Green Belt',
    category: 'garbage',
    departmentId: 'dept_sanitation',
    description: 'Tractor trolley dumped concrete slabs and plaster waste directly onto the saplings planted along the municipal green belt last monsoon.',
    ward: 'Ward 7 - Westside Suburbs & Tech Zone',
    locationText: 'Green Belt Parkway, Opposite Cyber Tower B',
    coordinates: { lat: 28.5980, lng: 77.1950 },
    status: 'PENDING',
    priority: 'MEDIUM',
    reportedBy: 'Amitabh Sen',
    contactPhone: '+91 98450 11928',
    contactEmail: 'amitabh.s@techcorp.io',
    isAnonymous: false,
    createdAt: '2026-10-27T10:10:00.000Z',
    updatedAt: '2026-10-27T10:10:00.000Z',
    upvotes: 12,
    upvotedByMe: false,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    resolutionProofImage: null,
    resolutionNotes: null,
    resolvedAt: null,
    assignedOfficer: null,
    timeline: [
      {
        timestamp: '2026-10-27T10:10:00.000Z',
        status: 'PENDING',
        actor: 'Citizen (Amitabh Sen)',
        note: 'Incident registered. CCTV check requested.'
      }
    ],
    comments: []
  },
  {
    id: 'CV-2026-1008',
    title: 'Fallen Banyan Tree Branch Blocking Riverfront Promenade',
    category: 'infrastructure',
    departmentId: 'dept_works',
    description: 'Large banyan branch snapped during high winds, completely blocking both the pedestrian walking path and the cycling track.',
    ward: 'Ward 8 - Riverfront Boulevard',
    locationText: 'Riverfront Promenade, near Boating Club jetty',
    coordinates: { lat: 28.6090, lng: 77.2280 },
    status: 'RESOLVED',
    priority: 'HIGH',
    reportedBy: 'Shreya Mathur',
    contactPhone: '+91 97200 48921',
    contactEmail: 'shreya.m@gmail.com',
    isAnonymous: false,
    createdAt: '2026-10-18T06:45:00.000Z',
    updatedAt: '2026-10-19T14:00:00.000Z',
    upvotes: 29,
    upvotedByMe: false,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    resolutionProofImage: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    resolutionNotes: 'Horticulture chainsaw team sectioned timber and cleared path within 18 hours. Wood transported to municipal compost yard.',
    resolvedAt: '2026-10-19T14:00:00.000Z',
    assignedOfficer: 'Ar. Neha Kulkarni (Public Works)',
    timeline: [
      {
        timestamp: '2026-10-18T06:45:00.000Z',
        status: 'PENDING',
        actor: 'Citizen (Shreya Mathur)',
        note: 'Reported by morning cyclist.'
      },
      {
        timestamp: '2026-10-18T08:30:00.000Z',
        status: 'IN_PROGRESS',
        actor: 'PWD Tree Clearing Squad',
        note: 'Chainsaw crew on site.'
      },
      {
        timestamp: '2026-10-19T14:00:00.000Z',
        status: 'RESOLVED',
        actor: 'Ar. Neha Kulkarni',
        note: 'Path cleared, swept, and opened for public access.'
      }
    ],
    comments: []
  }
];
