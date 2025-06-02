export interface TireWheelService {
    id: string;
    title: string;
    description: string;
    link: string;
    icon: string;
    services: string[];
    performanceFeatures?: string[];
    benefits?: string[];
    recommendedFor?: string[];
    serviceTime?: string;
    warranty?: string;
  }
  
  export const tiresWheelsServices: TireWheelService[] = [
    {
      id: 'performance-tires',
      title: 'Performance Tires & Racing Compounds',
      description: 'High-performance tire selection and installation featuring premium brands, track-focused compounds, and specialized tires for maximum grip, handling, and performance applications.',
      link: '/services/tires-wheels/performance-tires',
      icon: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path>',
      services: [
        'Ultra-high performance summer tires',
        'Track day and autocross tire packages',
        'Drag racing slick and DOT tires',
        'All-season performance tire selection',
        'Winter performance tire installation',
        'Run-flat performance tire mounting',
        'Custom tire sizing and fitment',
        'Tire compound consultation',
        'Performance tire pressure optimization',
        'Track tire storage and swapping',
        'Competition tire mounting and balancing',
        'Tire temperature monitoring setup'
      ],
      performanceFeatures: [
        'Maximum grip compounds',
        'Reinforced sidewall construction',
        'Heat-resistant materials',
        'Optimized tread patterns',
        'Low rolling resistance',
        'Enhanced cornering stability'
      ],
      benefits: [
        'Improved lap times and performance',
        'Enhanced cornering capabilities',
        'Better braking performance',
        'Increased driver confidence',
        'Optimal heat dissipation',
        'Consistent performance under stress'
      ],
      recommendedFor: [
        'Track day enthusiasts',
        'Autocross competitors',
        'Performance car owners',
        'Racing applications',
        'Spirited street driving'
      ],
      serviceTime: '1-2 hours',
      warranty: 'Manufacturer warranty plus installation guarantee'
    },
    {
      id: 'performance-wheels',
      title: 'Performance Wheels & Custom Fitments',
      description: 'Lightweight forged wheels, custom wheel packages, and performance wheel upgrades designed to reduce unsprung weight and enhance vehicle dynamics.',
      link: '/services/tires-wheels/performance-wheels',
      icon: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="2" x2="12" y2="5"></line><line x1="12" y1="19" x2="12" y2="22"></line><line x1="19" y1="12" x2="22" y2="12"></line><line x1="2" y1="12" x2="5" y2="12"></line><line x1="16.24" y1="7.76" x2="18.36" y2="5.64"></line><line x1="5.64" y1="18.36" x2="7.76" y2="16.24"></line><line x1="16.24" y1="16.24" x2="18.36" y2="18.36"></line><line x1="5.64" y1="5.64" x2="7.76" y2="7.76"></line>',
      services: [
        'Lightweight forged wheel installation',
        'Flow-formed performance wheel mounting',
        'Custom wheel offset and sizing',
        'Concave and deep dish wheel fitment',
        'Multi-piece wheel assembly',
        'Track-specific wheel packages',
        'Wheel refinishing and customization',
        'Hub-centric ring installation',
        'Extended wheel stud conversion',
        'Wheel weight optimization',
        'Custom wheel color matching',
        'Performance wheel storage'
      ],
      performanceFeatures: [
        'Reduced unsprung weight',
        'Enhanced heat dissipation',
        'Increased structural rigidity',
        'Optimized spoke designs',
        'Precision manufacturing',
        'Track-proven durability'
      ],
      benefits: [
        'Improved acceleration and braking',
        'Enhanced steering response',
        'Better suspension performance',
        'Reduced rotational mass',
        'Improved fuel economy',
        'Distinctive appearance'
      ],
      recommendedFor: [
        'Performance enthusiasts',
        'Track day participants',
        'Show car owners',
        'Weight reduction builds',
        'Handling upgrades'
      ],
      serviceTime: '2-4 hours',
      warranty: '1 year against manufacturing defects'
    },
    {
      id: 'precision-alignment',
      title: 'Precision Wheel Alignment & Corner Balancing',
      description: 'Advanced wheel alignment services using state-of-the-art equipment for optimal tire wear, handling characteristics, and performance tuning.',
      link: '/services/tires-wheels/precision-alignment',
      icon: '<path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path>',
      services: [
        'Four-wheel computerized alignment',
        'Performance alignment specifications',
        'Corner weight balancing',
        'Camber and caster adjustment',
        'Toe adjustment and optimization',
        'Thrust angle correction',
        'Suspension geometry analysis',
        'Alignment for lowered vehicles',
        'Track-specific alignment settings',
        'Racing alignment consultation',
        'Alignment verification and testing',
        'Pre and post alignment reports'
      ],
      performanceFeatures: [
        'Precision measurement technology',
        'Performance-oriented specifications',
        'Custom alignment settings',
        'Real-time adjustment monitoring',
        'Comprehensive reporting',
        'Track-proven settings'
      ],
      benefits: [
        'Even tire wear patterns',
        'Improved handling precision',
        'Enhanced stability at speed',
        'Optimal tire contact patch',
        'Better fuel economy',
        'Predictable vehicle behavior'
      ],
      recommendedFor: [
        'Performance vehicles',
        'Lowered or modified cars',
        'Track day preparation',
        'New tire installations',
        'Suspension modifications'
      ],
      serviceTime: '1-2 hours',
      warranty: '6 months / 6,000 miles'
    },
    {
      id: 'wheel-balancing',
      title: 'Dynamic Wheel Balancing & Road Force Correction',
      description: 'Advanced wheel balancing services including road force balancing to eliminate vibrations and ensure smooth operation at all speeds.',
      link: '/services/tires-wheels/wheel-balancing',
      icon: '<circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>',
      services: [
        'Dynamic wheel balancing',
        'Road force variation correction',
        'High-speed balancing verification',
        'Wheel weight optimization',
        'Rim straightening assessment',
        'Tire uniformity testing',
        'Vibration diagnosis and correction',
        'Performance wheel balancing',
        'Racing wheel preparation',
        'Wheel and tire matching',
        'Balance weight placement optimization',
        'Post-balance test drive verification'
      ],
      performanceFeatures: [
        'Advanced balancing technology',
        'Road force measurement',
        'Precision weight placement',
        'High-speed verification',
        'Uniformity analysis',
        'Vibration elimination'
      ],
      benefits: [
        'Smooth operation at all speeds',
        'Eliminated steering wheel vibration',
        'Extended tire and suspension life',
        'Improved comfort and handling',
        'Reduced vehicle stress',
        'Enhanced safety'
      ],
      recommendedFor: [
        'New tire installations',
        'Vibration issues',
        'High-performance applications',
        'Track preparation',
        'Comfort optimization'
      ],
      serviceTime: '30-60 minutes per set',
      warranty: '30 days / 1,000 miles'
    },
    {
      id: 'tire-rotation',
      title: 'Performance Tire Rotation & Wear Analysis',
      description: 'Comprehensive tire rotation services with detailed wear pattern analysis to maximize tire life and maintain optimal performance characteristics.',
      link: '/services/tires-wheels/tire-rotation',
      icon: '<path d="M21 12a9 9 0 1 1-6.219-8.56"></path><path d="M9 12l2 2 4-4"></path>',
      services: [
        'Directional tire rotation patterns',
        'Asymmetrical tire rotation service',
        'Staggered wheel setup rotation',
        'Tire wear pattern analysis',
        'Tread depth measurement',
        'Pressure optimization after rotation',
        'Performance tire rotation consultation',
        'Track tire rotation strategies',
        'Seasonal tire rotation',
        'Custom rotation patterns',
        'Tire condition documentation',
        'Rotation interval recommendations'
      ],
      performanceFeatures: [
        'Scientific rotation patterns',
        'Wear pattern analysis',
        'Precision pressure settings',
        'Performance optimization',
        'Documentation tracking',
        'Custom strategies'
      ],
      benefits: [
        'Extended tire life',
        'Even wear patterns',
        'Maintained traction levels',
        'Cost savings over time',
        'Consistent performance',
        'Early problem detection'
      ],
      recommendedFor: [
        'Regular maintenance',
        'Performance tire setups',
        'Cost-conscious drivers',
        'Track day participants',
        'High-mileage vehicles'
      ],
      serviceTime: '30-45 minutes',
      warranty: 'Service guarantee'
    },
    {
      id: 'tpms-service',
      title: 'TPMS Service & Performance Monitoring',
      description: 'Complete tire pressure monitoring system service including sensor replacement, programming, and advanced pressure monitoring solutions.',
      link: '/services/tires-wheels/tpms-service',
      icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path>',
      services: [
        'TPMS sensor replacement',
        'TPMS programming and relearning',
        'Aftermarket TPMS installation',
        'Performance TPMS upgrades',
        'TPMS valve stem replacement',
        'System diagnostics and troubleshooting',
        'Sensor battery replacement',
        'TPMS warning light reset',
        'Custom pressure threshold programming',
        'Racing TPMS solutions',
        'Wireless monitoring systems',
        'TPMS maintenance and service'
      ],
      performanceFeatures: [
        'Real-time pressure monitoring',
        'Temperature sensing',
        'Wireless connectivity',
        'Custom alert thresholds',
        'Performance-oriented features',
        'Track-day monitoring'
      ],
      benefits: [
        'Optimal tire pressure maintenance',
        'Improved safety and performance',
        'Enhanced fuel economy',
        'Extended tire life',
        'Real-time monitoring',
        'Peace of mind'
      ],
      recommendedFor: [
        'New wheel installations',
        'TPMS warning lights',
        'Performance applications',
        'Track day preparation',
        'Safety-conscious drivers'
      ],
      serviceTime: '1-2 hours',
      warranty: '1 year on sensors and programming'
    },
    {
      id: 'track-tire-services',
      title: 'Track Day & Racing Tire Services',
      description: 'Specialized tire services for track day and racing applications including tire warming, pressure optimization, and competition preparation.',
      link: '/services/tires-wheels/track-tire-services',
      icon: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>',
      services: [
        'Track tire mounting and balancing',
        'Racing slick installation',
        'Tire warming and conditioning',
        'Competition pressure optimization',
        'Track-specific tire selection',
        'Tire temperature monitoring setup',
        'Quick-change wheel packages',
        'Tire graining and wear analysis',
        'Competition tire storage',
        'Track day preparation packages',
        'Racing tire consultation',
        'Post-session tire evaluation'
      ],
      performanceFeatures: [
        'Competition-grade compounds',
        'Track-optimized construction',
        'Temperature monitoring',
        'Pressure optimization',
        'Quick-change capability',
        'Performance analysis'
      ],
      benefits: [
        'Maximum track performance',
        'Optimal lap times',
        'Enhanced safety margins',
        'Consistent performance',
        'Professional preparation',
        'Competitive advantage'
      ],
      recommendedFor: [
        'Track day enthusiasts',
        'Racing competitors',
        'Autocross participants',
        'Performance driving schools',
        'Time attack events'
      ],
      serviceTime: '1-3 hours',
      warranty: 'Track preparation guarantee'
    },
    {
      id: 'custom-packages',
      title: 'Custom Wheel & Tire Packages',
      description: 'Complete custom wheel and tire packages tailored to specific performance goals, vehicle applications, and aesthetic preferences.',
      link: '/services/tires-wheels/custom-packages',
      icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="12 6.81 12 12.01 16.5 14.61"></polyline>',
      services: [
        'Performance package consultation',
        'Custom fitment calculations',
        'Brand and model selection',
        'Performance-oriented sizing',
        'Aesthetic customization options',
        'Complete installation packages',
        'Performance testing and validation',
        'Package pricing and financing',
        'Seasonal package swaps',
        'Track and street combinations',
        'Weight optimization packages',
        'Show car presentation packages'
      ],
      performanceFeatures: [
        'Tailored specifications',
        'Performance optimization',
        'Custom aesthetic options',
        'Quality brand partnerships',
        'Professional consultation',
        'Complete solutions'
      ],
      benefits: [
        'Optimized performance characteristics',
        'Perfect fitment guarantee',
        'Enhanced vehicle appearance',
        'Professional recommendations',
        'Turnkey solutions',
        'Long-term satisfaction'
      ],
      recommendedFor: [
        'Performance builds',
        'Show cars',
        'Track-focused vehicles',
        'Style upgrades',
        'Complete makeovers'
      ],
      serviceTime: '2-6 hours',
      warranty: 'Comprehensive package warranty'
    }
  ];
  
  // Featured tire and wheel services for quick access
  export const featuredTireWheelServices = [
    {
      title: 'Performance Tire Installation',
      description: 'High-performance tire selection and professional installation for maximum grip and handling.',
      icon: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle>',
      link: '#performance-tires'
    },
    {
      title: 'Lightweight Performance Wheels',
      description: 'Forged and flow-formed performance wheels to reduce unsprung weight and enhance dynamics.',
      icon: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle>',
      link: '#performance-wheels'
    },
    {
      title: 'Precision Wheel Alignment',
      description: 'Advanced alignment services for optimal tire wear and handling characteristics.',
      icon: '<path d="M12 2L2 7l10 5 10-5-10-5z"></path>',
      link: '#precision-alignment'
    },
    {
      title: 'Track Day Preparation',
      description: 'Complete track tire and wheel preparation for optimal performance and safety.',
      icon: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>',
      link: '#track-tire-services'
    }
  ];
  
  // Performance tire categories and applications
  export const performanceTireCategories = {
    'Ultra High Performance Summer': {
      description: 'Maximum dry and wet grip for spirited street driving',
      applications: ['Performance cars', 'Sports cars', 'Track-capable vehicles'],
      brands: ['Michelin Pilot Sport', 'Continental ExtremeContact', 'Bridgestone Potenza']
    },
    'Track Day & Autocross': {
      description: 'Optimized for track use with maximum grip compounds',
      applications: ['Track days', 'Autocross', 'Time attack', 'HPDE events'],
      brands: ['Toyo Proxes', 'Falken Azenis', 'BFGoodrich g-Force']
    },
    'Drag Racing': {
      description: 'Specialized tires for drag strip performance',
      applications: ['Drag racing', 'Roll racing', 'Acceleration events'],
      brands: ['Mickey Thompson', 'Nitto', 'Hoosier']
    },
    'All-Season Performance': {
      description: 'Year-round performance with good grip in varied conditions',
      applications: ['Daily driving', 'Performance cars', 'All-weather use'],
      brands: ['Michelin Pilot Sport A/S', 'Continental DWS06', 'Pirelli P Zero All Season']
    }
  };
  
  // Performance wheel categories and benefits
  export const performanceWheelCategories = {
    'Forged Wheels': {
      description: 'Maximum strength-to-weight ratio with premium construction',
      benefits: ['Lightest weight', 'Highest strength', 'Best performance'],
      applications: ['Track use', 'High-performance street', 'Racing']
    },
    'Flow-Formed Wheels': {
      description: 'Advanced manufacturing for strength and weight savings',
      benefits: ['Good weight savings', 'Excellent strength', 'Value performance'],
      applications: ['Performance street', 'Track days', 'Enthusiast builds']
    },
    'Multi-Piece Wheels': {
      description: 'Customizable construction with premium aesthetics',
      benefits: ['Custom offsets', 'Rebuildable', 'Distinctive appearance'],
      applications: ['Show cars', 'Custom builds', 'Luxury performance']
    }
  };
  
  // Service recommendations by vehicle type
  export const vehicleTypeRecommendations = {
    'Sports Cars': [
      'Ultra high performance tires',
      'Lightweight forged wheels',
      'Track-focused alignment',
      'Performance TPMS'
    ],
    'Track Cars': [
      'Competition tire compounds',
      'Track-specific wheels',
      'Racing alignment settings',
      'Tire warming services'
    ],
    'Daily Drivers': [
      'All-season performance tires',
      'Flow-formed wheels',
      'Standard alignment',
      'Regular rotation service'
    ],
    'Show Cars': [
      'Custom wheel packages',
      'Aesthetic tire selection',
      'Concave wheel fitments',
      'Detailed finishing'
    ]
  };