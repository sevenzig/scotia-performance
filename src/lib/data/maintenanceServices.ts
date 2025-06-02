export interface MaintenanceService {
    id: string;
    title: string;
    description: string;
    link: string;
    icon: string;
    services: string[];
    interval?: string;
    estimatedTime?: string;
  }
  
  export const maintenanceServices: MaintenanceService[] = [
    {
      id: 'oil-change',
      title: 'Oil Change & Lubrication Services',
      description: 'Complete oil change services using premium oils and filters. Includes multi-point inspection, fluid top-offs, and maintenance recommendations.',
      link: '/services/maintenance/oil-change',
      icon: '<path d="M16 2v5h-5"></path><path d="M21 6a2 2 0 0 1 0 4H3a2 2 0 0 1 0-4"></path><path d="M14 12.4V18a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-5.6l-3.6 1.8a1 1 0 0 1-1.4-.9v-2.3a1 1 0 0 1 .5-.9L12 7l8.5 3.1a1 1 0 0 1 .5.9v2.3a1 1 0 0 1-1.4.9L16 12.4"></path>',
      services: [
        'Conventional oil change service',
        'Full synthetic oil change',
        'High-mileage oil formulations',
        'Premium oil filter replacement',
        'Fluid level checks and top-offs',
        'Multi-point safety inspection',
        'Oil life monitoring system reset',
        'Disposal of used oil and filters'
      ],
      interval: 'Every 3,000-7,500 miles',
      estimatedTime: '30-45 minutes'
    },
    {
      id: 'brake-maintenance',
      title: 'Brake System Maintenance & Repair',
      description: 'Comprehensive brake system services including pad replacement, rotor service, brake fluid changes, and complete brake system inspections.',
      link: '/services/maintenance/brake-maintenance',
      icon: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>',
      services: [
        'Brake pad inspection and replacement',
        'Brake rotor resurfacing and replacement',
        'Brake fluid flush and replacement',
        'Brake line inspection and repair',
        'Caliper service and replacement',
        'Parking brake adjustment',
        'ABS system diagnostics',
        'Brake noise diagnosis and repair'
      ],
      interval: 'Every 25,000-50,000 miles',
      estimatedTime: '1-3 hours'
    },
    {
      id: 'scheduled-maintenance',
      title: 'Factory Scheduled Maintenance',
      description: 'Complete factory-recommended maintenance services following manufacturer specifications to maintain warranty coverage and optimal vehicle performance.',
      link: '/services/maintenance/scheduled-maintenance',
      icon: '<path d="M12 2v20m8-10H4"></path><circle cx="12" cy="12" r="10"></circle>',
      services: [
        'Manufacturer-recommended service intervals',
        'Engine air filter replacement',
        'Cabin air filter replacement',
        'Spark plug replacement',
        'Transmission service',
        'Coolant system service',
        'Belt and hose inspection',
        'Battery and charging system test'
      ],
      interval: 'Per manufacturer schedule',
      estimatedTime: '2-4 hours'
    },
    {
      id: 'state-inspection',
      title: 'State Safety & Emissions Inspection',
      description: 'Official state safety and emissions inspections to ensure your vehicle meets all regulatory requirements for registration and road safety.',
      link: '/services/maintenance/state-inspection',
      icon: '<path d="M9 12l2 2 4-4"></path><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M12 15v7"></path>',
      services: [
        'Safety inspection checklist',
        'Emissions testing and certification',
        'Headlight and taillight inspection',
        'Horn and windshield wiper test',
        'Tire tread depth measurement',
        'Steering and suspension check',
        'Exhaust system inspection',
        'Official inspection sticker issuance'
      ],
      interval: 'Annually (varies by state)',
      estimatedTime: '30-60 minutes'
    },
    {
      id: 'wheel-alignment',
      title: 'Wheel Alignment & Tire Services',
      description: 'Precision wheel alignment services to ensure proper tire wear, optimal handling, and improved fuel economy. Complete tire services included.',
      link: '/services/maintenance/wheel-alignment',
      icon: '<circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>',
      services: [
        'Four-wheel computer alignment',
        'Tire rotation and balancing',
        'Tire pressure monitoring system service',
        'Tire tread depth inspection',
        'Wheel bearing inspection',
        'Suspension component check',
        'Steering system evaluation',
        'Road force balancing'
      ],
      interval: 'Every 12,000 miles or annually',
      estimatedTime: '1-2 hours'
    },
    {
      id: 'fluid-services',
      title: 'Automotive Fluid Services',
      description: 'Complete fluid maintenance including transmission, coolant, power steering, and differential services to keep all systems operating smoothly.',
      link: '/services/maintenance/fluid-services',
      icon: '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>',
      services: [
        'Transmission fluid service',
        'Coolant flush and refill',
        'Power steering fluid service',
        'Differential fluid change',
        'Windshield washer fluid refill',
        'Air conditioning refrigerant service',
        'Hydraulic fluid services',
        'Fluid leak diagnosis and repair'
      ],
      interval: 'Varies by fluid type',
      estimatedTime: '1-2 hours'
    },
    {
      id: 'battery-electrical',
      title: 'Battery & Electrical System Service',
      description: 'Complete electrical system diagnostics, battery testing, alternator and starter service to ensure reliable vehicle operation.',
      link: '/services/maintenance/battery-electrical',
      icon: '<path d="M6 7h3m6 0h3"></path><path d="M9 7v10a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1Z"></path>',
      services: [
        'Battery load testing and replacement',
        'Alternator testing and service',
        'Starter motor diagnostics',
        'Charging system evaluation',
        'Electrical connection cleaning',
        'Fuse and relay inspection',
        'Lighting system check',
        'Computer system diagnostics'
      ],
      interval: 'As needed or every 3-5 years',
      estimatedTime: '30 minutes - 2 hours'
    },
    {
      id: 'air-conditioning',
      title: 'Air Conditioning System Service',
      description: 'Complete A/C system maintenance including refrigerant service, leak detection, and component replacement for optimal cooling performance.',
      link: '/services/maintenance/air-conditioning',
      icon: '<path d="M17 14V2"></path><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 0-3-3.88Z"></path>',
      services: [
        'A/C system performance evaluation',
        'Refrigerant recovery and recharge',
        'Leak detection and repair',
        'Compressor service and replacement',
        'Evaporator and condenser service',
        'Cabin air filter replacement',
        'A/C belt inspection',
        'Climate control diagnostics'
      ],
      interval: 'Annually or as needed',
      estimatedTime: '1-3 hours'
    },
    {
      id: 'tire-services',
      title: 'Complete Tire Services',
      description: 'Full-service tire center offering tire sales, installation, repair, and maintenance services for all vehicle types and driving conditions.',
      link: '/services/maintenance/tire-services',
      icon: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="2" x2="12" y2="5"></line><line x1="12" y1="19" x2="12" y2="22"></line>',
      services: [
        'New tire sales and installation',
        'Tire rotation and balancing',
        'Flat tire repair and patching',
        'Tire pressure monitoring system reset',
        'Seasonal tire changeovers',
        'Tire storage services',
        'Wheel refinishing',
        'Custom wheel and tire packages'
      ],
      interval: 'As needed',
      estimatedTime: '30 minutes - 2 hours'
    },
    {
      id: 'diagnostics',
      title: 'Computer Diagnostics & Check Engine Light',
      description: 'Advanced computer diagnostics to identify and resolve check engine lights, performance issues, and electronic system problems.',
      link: '/services/maintenance/diagnostics',
      icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path>',
      services: [
        'Check engine light diagnosis',
        'Computer system scanning',
        'Trouble code interpretation',
        'Performance issue diagnosis',
        'Emissions system diagnosis',
        'Network communication testing',
        'Module programming and updates',
        'Diagnostic report generation'
      ],
      interval: 'As needed',
      estimatedTime: '1-2 hours'
    },
    {
      id: 'pre-purchase-inspection',
      title: 'Pre-Purchase Vehicle Inspection',
      description: 'Comprehensive inspection service for used vehicle purchases to identify potential issues and provide peace of mind before buying.',
      link: '/services/maintenance/pre-purchase-inspection',
      icon: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>',
      services: [
        'Complete vehicle history review',
        'Engine and transmission inspection',
        'Brake and suspension evaluation',
        'Electrical system testing',
        'Fluid condition assessment',
        'Tire and wheel inspection',
        'Interior and exterior evaluation',
        'Detailed written report'
      ],
      interval: 'Before vehicle purchase',
      estimatedTime: '2-3 hours'
    },
    {
      id: 'preventive-maintenance',
      title: 'Preventive Maintenance Programs',
      description: 'Customized preventive maintenance programs designed to extend vehicle life, prevent breakdowns, and maintain optimal performance.',
      link: '/services/maintenance/preventive-maintenance',
      icon: '<path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
      services: [
        'Custom maintenance scheduling',
        'Service reminder notifications',
        'Comprehensive vehicle inspections',
        'Wear item replacement',
        'Fluid condition monitoring',
        'Performance optimization',
        'Cost-effective maintenance planning',
        'Vehicle history tracking'
      ],
      interval: 'Ongoing program',
      estimatedTime: 'Varies by service'
    }
  ];
  
  // Featured maintenance services for quick access
  export const featuredMaintenanceServices = [
    {
      title: 'Oil Change & Multi-Point Inspection',
      description: 'Quick and comprehensive oil change service with complimentary multi-point safety inspection.',
      icon: '<path d="M16 2v5h-5"></path><path d="M21 6a2 2 0 0 1 0 4H3a2 2 0 0 1 0-4"></path>',
      link: '#oil-change'
    },
    {
      title: 'Brake Service & Safety',
      description: 'Complete brake system inspection, maintenance, and repair services for optimal stopping power.',
      icon: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle>',
      link: '#brake-maintenance'
    },
    {
      title: 'State Inspection Services',
      description: 'Official state safety and emissions inspections to keep your vehicle legally compliant.',
      icon: '<path d="M9 12l2 2 4-4"></path><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>',
      link: '#state-inspection'
    },
    {
      title: 'Wheel Alignment & Tire Care',
      description: 'Precision alignment services and complete tire care to maximize tire life and vehicle safety.',
      icon: '<circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>',
      link: '#wheel-alignment'
    }
  ];
  
  // Common maintenance intervals and recommendations
  export const maintenanceIntervals = {
    'Every 3,000-5,000 miles': [
      'Oil and filter change (conventional oil)',
      'Tire rotation',
      'Multi-point inspection'
    ],
    'Every 6,000-7,500 miles': [
      'Oil and filter change (synthetic oil)',
      'Battery test',
      'Fluid level checks'
    ],
    'Every 12,000 miles': [
      'Air filter replacement',
      'Cabin air filter replacement',
      'Wheel alignment check'
    ],
    'Every 15,000-30,000 miles': [
      'Transmission service',
      'Brake fluid replacement',
      'Coolant service'
    ],
    'Every 30,000-60,000 miles': [
      'Spark plug replacement',
      'Fuel filter replacement',
      'Major service inspection'
    ],
    'Annually': [
      'State inspection',
      'A/C system check',
      'Comprehensive vehicle inspection'
    ]
  };