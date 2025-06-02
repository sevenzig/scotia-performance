export interface RepairService {
    id: string;
    title: string;
    description: string;
    link: string;
    icon: string;
    services: string[];
    commonIssues?: string[];
    warrantyInfo?: string;
    urgencyLevel?: 'Low' | 'Medium' | 'High' | 'Critical';
  }
  
  export const repairServices: RepairService[] = [
    {
      id: 'engine-repair-diagnostics',
      title: 'Engine Repair & Diagnostics',
      description: 'Complete engine repair services from minor tune-ups to major overhauls. Advanced diagnostics to identify and resolve performance issues, check engine lights, and mechanical problems.',
      link: '/services/repair/engine-repair-diagnostics',
      icon: '<path d="M14 6.45V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v4.45"></path><path d="M18 6.45V2a1 1 0 0 0-1-1l-7 5"></path><path d="M9 10 2 4.5V14l7 5.5"></path><path d="m22 4.5-7 5.5"></path><path d="m22 14-7-5.5"></path><path d="M14 22V9"></path>',
      services: [
        'Engine diagnostic scanning and analysis',
        'Check engine light diagnosis and repair',
        'Cylinder head repair and replacement',
        'Engine block machining and repair',
        'Timing belt and chain replacement',
        'Water pump and thermostat replacement',
        'Engine mount replacement',
        'Valve adjustment and repair',
        'Piston and ring replacement',
        'Crankshaft and camshaft repair',
        'Engine rebuild and overhaul services',
        'Performance engine modifications'
      ],
      commonIssues: [
        'Check engine light illuminated',
        'Engine overheating',
        'Poor fuel economy',
        'Rough idle or stalling',
        'Loss of power',
        'Strange engine noises'
      ],
      warrantyInfo: '12 months / 12,000 miles on major repairs',
      urgencyLevel: 'High'
    },
    {
      id: 'transmission-repair',
      title: 'Transmission Repair & Service',
      description: 'Expert transmission repair for automatic and manual transmissions. Complete rebuilds, fluid services, and diagnostic services to keep your drivetrain operating smoothly.',
      link: '/services/repair/transmission-repair',
      icon: '<path d="M6 9v12"></path><path d="M18 9v12"></path><path d="M4 9h16"></path><path d="M4 15h16"></path><path d="M8 21h8"></path><path d="M7 3h10"></path><path d="M5 3a2 2 0 0 0-2 2v4h18V5a2 2 0 0 0-2-2h-2"></path>',
      services: [
        'Transmission diagnostic testing',
        'Automatic transmission rebuild',
        'Manual transmission repair',
        'CVT transmission service',
        'Transmission fluid flush and filter',
        'Clutch replacement and adjustment',
        'Torque converter repair',
        'Transmission mount replacement',
        'Shift solenoid replacement',
        'Valve body repair and replacement',
        'Differential repair and service',
        'Driveline component replacement'
      ],
      commonIssues: [
        'Slipping or delayed shifting',
        'Transmission fluid leaks',
        'Grinding or whining noises',
        'Burning smell from transmission',
        'Hard shifting or won\'t shift',
        'Clutch slipping (manual)'
      ],
      warrantyInfo: '24 months / 24,000 miles on rebuilds',
      urgencyLevel: 'Critical'
    },
    {
      id: 'brake-repair-service',
      title: 'Brake Repair & Service',
      description: 'Professional brake repair services including pad and rotor replacement, brake line repair, and complete brake system overhauls for maximum safety and stopping power.',
      link: '/services/repair/brake-repair-service',
      icon: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>',
      services: [
        'Brake pad replacement and installation',
        'Brake rotor resurfacing and replacement',
        'Brake caliper rebuild and replacement',
        'Brake line and hose replacement',
        'Master cylinder repair and replacement',
        'Brake booster service and replacement',
        'ABS system diagnosis and repair',
        'Parking brake adjustment and repair',
        'Brake fluid flush and bleeding',
        'Brake noise diagnosis and elimination',
        'Emergency brake repair',
        'Brake warning light diagnosis'
      ],
      commonIssues: [
        'Squealing or grinding brake noise',
        'Brake pedal feels spongy',
        'Vehicle pulls to one side when braking',
        'Brake warning light illuminated',
        'Brake pedal goes to floor',
        'Vibration when braking'
      ],
      warrantyInfo: '12 months / 12,000 miles on parts and labor',
      urgencyLevel: 'Critical'
    },
    {
      id: 'ac-climate-control',
      title: 'AC & Climate Control Repair',
      description: 'Complete air conditioning and heating system repair services. From refrigerant leaks to compressor replacement, we keep you comfortable year-round.',
      link: '/services/repair/ac-climate-control',
      icon: '<path d="M17 14V2"></path><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 0-3-3.88Z"></path>',
      services: [
        'A/C compressor replacement',
        'Refrigerant leak detection and repair',
        'Evaporator core replacement',
        'Condenser replacement and repair',
        'A/C clutch replacement',
        'Heater core replacement',
        'Blower motor replacement',
        'Climate control module repair',
        'A/C hose and fitting repair',
        'Expansion valve replacement',
        'Cabin air filter replacement',
        'System evacuation and recharge'
      ],
      commonIssues: [
        'No cold air from A/C',
        'A/C blows warm air intermittently',
        'Strange smells from vents',
        'A/C makes unusual noises',
        'Heater not working properly',
        'Fogged windows won\'t clear'
      ],
      warrantyInfo: '12 months / 12,000 miles on repairs',
      urgencyLevel: 'Medium'
    },
    {
      id: 'suspension-steering',
      title: 'Suspension & Steering Repair',
      description: 'Professional suspension and steering system repair to restore ride comfort, handling, and safety. From struts to steering racks, we handle it all.',
      link: '/services/repair/suspension-steering',
      icon: '<path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16-.21 2.31-.54 3.43-1.02"></path><path d="M22 12c0 1.25-.29 2.44-.81 3.5"></path>',
      services: [
        'Strut and shock absorber replacement',
        'Coil spring replacement',
        'Control arm replacement',
        'Ball joint replacement',
        'Tie rod end replacement',
        'Steering rack and pinion repair',
        'Power steering pump replacement',
        'Sway bar link replacement',
        'Wheel bearing replacement',
        'CV joint and axle replacement',
        'Alignment correction services',
        'Steering wheel and column repair'
      ],
      commonIssues: [
        'Vehicle pulls to one side',
        'Excessive bouncing or rough ride',
        'Steering wheel vibration',
        'Clunking noises over bumps',
        'Difficulty steering',
        'Uneven tire wear patterns'
      ],
      warrantyInfo: '12 months / 12,000 miles on parts and labor',
      urgencyLevel: 'High'
    },
    {
      id: 'tire-wheel-repair',
      title: 'Tire & Wheel Repair Services',
      description: 'Complete tire and wheel repair services including flat tire repair, wheel refinishing, and tire replacement for all vehicle types.',
      link: '/services/repair/tire-wheel-repair',
      icon: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="2" x2="12" y2="5"></line><line x1="12" y1="19" x2="12" y2="22"></line><line x1="19" y1="12" x2="22" y2="12"></line><line x1="2" y1="12" x2="5" y2="12"></line>',
      services: [
        'Flat tire repair and patching',
        'Tire replacement and installation',
        'Wheel balancing and alignment',
        'Tire rotation services',
        'TPMS sensor replacement',
        'Wheel refinishing and repair',
        'Tire pressure monitoring reset',
        'Run-flat tire service',
        'Tire bead sealing',
        'Valve stem replacement',
        'Wheel straightening',
        'Custom wheel installation'
      ],
      commonIssues: [
        'Flat or punctured tire',
        'Tire pressure warning light',
        'Uneven tire wear',
        'Vibration at highway speeds',
        'Damaged or bent wheels',
        'Tire bead leaks'
      ],
      warrantyInfo: 'Varies by tire manufacturer',
      urgencyLevel: 'Medium'
    },
    {
      id: 'electrical-system',
      title: 'Electrical System Repair',
      description: 'Advanced electrical system diagnostics and repair including alternator, starter, wiring, and computer module repair for all vehicle electrical issues.',
      link: '/services/repair/electrical-system',
      icon: '<path d="M6 7h3m6 0h3"></path><path d="M9 7v10a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1Z"></path><path d="M20 7 10 17l-5-5"></path>',
      services: [
        'Alternator testing and replacement',
        'Starter motor repair and replacement',
        'Battery testing and replacement',
        'Wiring harness repair',
        'Fuse and relay replacement',
        'Computer module programming',
        'Lighting system repair',
        'Power window and lock repair',
        'Horn and alarm system repair',
        'Charging system diagnosis',
        'Electrical short circuit repair',
        'Accessory installation and repair'
      ],
      commonIssues: [
        'Vehicle won\'t start',
        'Dead battery frequently',
        'Lights not working properly',
        'Power accessories not functioning',
        'Charging system warning',
        'Electrical shorts or blown fuses'
      ],
      warrantyInfo: '12 months / 12,000 miles on repairs',
      urgencyLevel: 'High'
    },
    {
      id: 'exhaust-system',
      title: 'Exhaust System Repair',
      description: 'Complete exhaust system repair including muffler replacement, catalytic converter service, and emissions system repair to keep your vehicle running clean and quiet.',
      link: '/services/repair/exhaust-system',
      icon: '<path d="M3 12h18l-3-3v6l3-3"></path><path d="M3 6h18"></path><path d="M3 18h18"></path>',
      services: [
        'Muffler replacement and repair',
        'Catalytic converter replacement',
        'Exhaust pipe repair and replacement',
        'Exhaust manifold repair',
        'Oxygen sensor replacement',
        'EGR valve service',
        'Exhaust leak detection and repair',
        'Emissions system diagnosis',
        'Resonator replacement',
        'Exhaust hanger replacement',
        'Custom exhaust fabrication',
        'Performance exhaust installation'
      ],
      commonIssues: [
        'Loud exhaust noise',
        'Exhaust leaks',
        'Failed emissions test',
        'Rattling from exhaust',
        'Strong exhaust odors',
        'Check engine light (emissions)'
      ],
      warrantyInfo: '12 months / 12,000 miles on parts and labor',
      urgencyLevel: 'Medium'
    },
    {
      id: 'cooling-system',
      title: 'Cooling System Repair',
      description: 'Professional cooling system repair to prevent overheating including radiator repair, water pump replacement, and complete cooling system overhauls.',
      link: '/services/repair/cooling-system',
      icon: '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>',
      services: [
        'Radiator repair and replacement',
        'Water pump replacement',
        'Thermostat replacement',
        'Cooling fan repair and replacement',
        'Hose and clamp replacement',
        'Coolant leak detection and repair',
        'Head gasket replacement',
        'Coolant flush and refill',
        'Temperature sensor replacement',
        'Radiator cap replacement',
        'Overflow tank replacement',
        'Cooling system pressure testing'
      ],
      commonIssues: [
        'Engine overheating',
        'Coolant leaks',
        'Temperature gauge running hot',
        'Steam from engine bay',
        'Sweet smell from coolant',
        'Milky oil (head gasket)'
      ],
      warrantyInfo: '12 months / 12,000 miles on repairs',
      urgencyLevel: 'Critical'
    },
    {
      id: 'fuel-system',
      title: 'Fuel System Repair',
      description: 'Comprehensive fuel system repair including fuel pump replacement, injector cleaning, and fuel line repair to ensure optimal engine performance and fuel economy.',
      link: '/services/repair/fuel-system',
      icon: '<path d="M3 12h18l-3-3v6l3-3"></path><path d="M3 6h18"></path><path d="M3 18h18"></path>',
      services: [
        'Fuel pump replacement',
        'Fuel injector cleaning and replacement',
        'Fuel filter replacement',
        'Fuel line repair and replacement',
        'Fuel rail service',
        'Fuel pressure regulator replacement',
        'Gas tank repair and replacement',
        'Fuel cap replacement',
        'Carbon canister replacement',
        'Fuel sending unit replacement',
        'Fuel system cleaning',
        'Evaporative emissions repair'
      ],
      commonIssues: [
        'Engine won\'t start',
        'Poor fuel economy',
        'Engine sputtering or hesitation',
        'Fuel smell in vehicle',
        'Check engine light',
        'Hard starting when hot'
      ],
      warrantyInfo: '12 months / 12,000 miles on parts and labor',
      urgencyLevel: 'High'
    },
    {
      id: 'drivetrain-repair',
      title: 'Drivetrain & Differential Repair',
      description: 'Expert drivetrain repair including CV joints, axles, differential service, and driveshaft repair to maintain proper power delivery to your wheels.',
      link: '/services/repair/drivetrain-repair',
      icon: '<path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M12 8A4 4 0 0 1 8 4"></path><path d="M12 16a4 4 0 0 0 4 4"></path>',
      services: [
        'CV joint replacement',
        'Half-shaft and axle replacement',
        'Differential repair and service',
        'Driveshaft repair and balancing',
        'U-joint replacement',
        'Transfer case service',
        'All-wheel drive system repair',
        'Front-wheel drive repair',
        'Rear-wheel drive repair',
        'Differential fluid service',
        'Axle bearing replacement',
        'Drive belt replacement'
      ],
      commonIssues: [
        'Clicking noise when turning',
        'Vibration during acceleration',
        'Grinding from differential',
        'Loss of power to wheels',
        'Whining noise from drivetrain',
        'Leaking differential fluid'
      ],
      warrantyInfo: '12 months / 12,000 miles on repairs',
      urgencyLevel: 'High'
    },
    {
      id: 'body-frame-repair',
      title: 'Body & Frame Repair',
      description: 'Professional body and frame repair services including collision repair, rust repair, and structural damage repair to restore your vehicle\'s safety and appearance.',
      link: '/services/repair/body-frame-repair',
      icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>',
      services: [
        'Collision damage repair',
        'Frame straightening and alignment',
        'Rust repair and prevention',
        'Dent removal and bodywork',
        'Paint repair and refinishing',
        'Bumper repair and replacement',
        'Door and panel replacement',
        'Window and glass replacement',
        'Structural welding repair',
        'Insurance claim assistance',
        'Paint matching and blending',
        'Protective coating application'
      ],
      commonIssues: [
        'Collision damage',
        'Rust and corrosion',
        'Dents and scratches',
        'Frame damage',
        'Paint damage',
        'Broken glass'
      ],
      warrantyInfo: 'Lifetime warranty on paint and bodywork',
      urgencyLevel: 'Low'
    }
  ];
  
  // Featured repair services for quick access
  export const featuredRepairServices = [
    {
      title: 'Engine Diagnostics & Repair',
      description: 'Advanced engine diagnostics and comprehensive repair services for all engine-related issues.',
      icon: '<path d="M14 6.45V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v4.45"></path><path d="M18 6.45V2a1 1 0 0 0-1-1l-7 5"></path>',
      link: '#engine-repair-diagnostics'
    },
    {
      title: 'Brake System Repair',
      description: 'Complete brake repair services to ensure your vehicle\'s safety and stopping power.',
      icon: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle>',
      link: '#brake-repair-service'
    },
    {
      title: 'Transmission Repair',
      description: 'Expert transmission repair and rebuild services for automatic and manual transmissions.',
      icon: '<path d="M6 9v12"></path><path d="M18 9v12"></path><path d="M4 9h16"></path>',
      link: '#transmission-repair'
    },
    {
      title: 'AC & Climate Control',
      description: 'Professional air conditioning and heating system repair to keep you comfortable.',
      icon: '<path d="M17 14V2"></path><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 0-3-3.88Z"></path>',
      link: '#ac-climate-control'
    }
  ];
  
  // Emergency repair services that need immediate attention
  export const emergencyRepairServices = [
    'Engine overheating',
    'Brake failure',
    'Transmission not shifting',
    'Vehicle won\'t start',
    'Flat tire or blowout',
    'Check engine light flashing',
    'Steering problems',
    'Coolant leak',
    'Electrical system failure',
    'Major fluid leaks'
  ];
  
  // Warranty information by service type
  export const warrantyCategories = {
    'Major Repairs': '24 months / 24,000 miles',
    'Standard Repairs': '12 months / 12,000 miles',
    'Electrical Work': '12 months / 12,000 miles',
    'Bodywork & Paint': 'Lifetime warranty',
    'Tires': 'Manufacturer warranty',
    'Oil Changes': '3 months / 3,000 miles'
  };
  
  // Service urgency levels for prioritization
  export const urgencyLevels = {
    'Critical': 'Immediate attention required - safety concern',
    'High': 'Schedule within 1-2 days',
    'Medium': 'Schedule within 1-2 weeks',
    'Low': 'Can be scheduled at convenience'
  };