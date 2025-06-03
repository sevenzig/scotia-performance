export interface PerformanceService {
  id: string;
  title: string;
  description: string;
  link: string;
  icon: string;
  services: string[];
}

export const performanceServices: PerformanceService[] = [
  {
    id: 'braking-systems',
    title: 'High-Performance Braking Systems',
    description: 'Upgrade your vehicle\'s stopping power with professional brake system enhancements including big brake kits, performance pads, upgraded rotors, stainless steel brake lines, and high-temperature brake fluids.',
    link: '/services/performance/braking-systems',
    icon: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>',
    services: [
      'Big brake kit installation and upgrades',
      'Performance brake pad selection and installation',
      'Slotted and drilled rotor upgrades',
      'Stainless steel brake line installation',
      'High-temperature brake fluid service',
      'Brake cooling duct installation',
      'Custom brake system design for track use'
    ]
  },
  {
    id: 'cooling-thermal',
    title: 'Cooling & Thermal Management',
    description: 'Comprehensive cooling system upgrades to manage heat under performance conditions including radiator upgrades, intercoolers, oil coolers, and advanced thermal management solutions.',
    link: '/services/performance/cooling-thermal',
    icon: '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>',
    services: [
      'High-performance radiator upgrades',
      'Intercooler installation and upgrades',
      'Engine and transmission oil coolers',
      'Electric cooling fan conversions',
      'Coolant system flushes and upgrades',
      'Thermostat and water pump upgrades',
      'Heat exchanger installations'
    ]
  },
  {
    id: 'drivetrain-transmission',
    title: 'Drivetrain & Transmission Performance',
    description: 'Strengthen your drivetrain with performance clutches, limited slip differentials, transmission upgrades, and driveline components designed to handle increased power output.',
    link: '/services/performance/drivetrain-transmission',
    icon: '<path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M12 8A4 4 0 0 1 8 4"></path><path d="M12 16a4 4 0 0 0 4 4"></path>',
    services: [
      'Performance clutch kit installation',
      'Limited slip differential upgrades',
      'Transmission rebuild and upgrades',
      'Driveshaft and axle upgrades',
      'Short shifter installations',
      'Flywheel lightening and upgrades',
      'CV joint and half-shaft upgrades'
    ]
  },
  {
    id: 'electronics-tuning',
    title: 'Electronics & Engine Tuning',
    description: 'Professional ECU tuning, standalone engine management, and electronic performance modifications to optimize power delivery, fuel economy, and engine characteristics.',
    link: '/services/performance/electronics-tuning',
    icon: '<path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path><path d="M12 2v2"></path><path d="M12 22v-2"></path>',
    services: [
      'ECU remapping and flash tuning',
      'Standalone engine management systems',
      'Performance tuning and optimization',
      'Performance chip installations',
      'Wideband O2 sensor installations',
      'Data logging and analysis',
      'Custom tuning for modifications'
    ]
  },
  {
    id: 'engine-building',
    title: 'Custom Engine Building',
    description: 'Professional engine building services from mild street builds to full race engines. Precision machining, component selection, and assembly for maximum performance and reliability.',
    link: '/services/performance/engine-building',
    icon: '<path d="M14 6.45V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v4.45"></path><path d="M18 6.45V2a1 1 0 0 0-1-1l-7 5"></path><path d="M9 10 2 4.5V14l7 5.5"></path>',
    services: [
      'Short block and long block assembly',
      'Forged piston and connecting rod upgrades',
      'Cylinder head porting and polishing',
      'Performance camshaft selection',
      'Engine blueprinting and balancing',
      'Crankshaft machining and upgrades',
      'Custom engine builds for any application'
    ]
  },
  {
    id: 'engine-performance',
    title: 'Engine Performance Upgrades',
    description: 'Bolt-on engine modifications including cold air intakes, exhaust systems, headers, and performance accessories to increase horsepower and torque output.',
    link: '/services/performance/engine-performance',
    icon: '<path d="M12 2v20"></path><path d="M8 18V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12"></path>',
    services: [
      'Cold air intake systems',
      'Performance exhaust system installation',
      'Headers and downpipe upgrades',
      'Throttle body and intake manifold upgrades',
      'Performance air filter installations',
      'Exhaust system design and fabrication',
      'Engine breathing modifications'
    ]
  },
  {
    id: 'exterior-aerodynamics',
    title: 'Exterior & Aerodynamic Enhancements',
    description: 'Aerodynamic body modifications, splitters, wings, and exterior performance upgrades designed to improve downforce, reduce drag, and enhance vehicle stability.',
    link: '/services/performance/exterior-aerodynamics',
    icon: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>',
    services: [
      'Front splitter and air dam installation',
      'Rear wing and spoiler mounting',
      'Side skirt and diffuser installation',
      'Hood venting and air extraction',
      'Body kit installation and fitting',
      'Wind tunnel testing and analysis',
      'Custom aerodynamic component fabrication'
    ]
  },
  {
    id: 'forced-induction',
    title: 'Forced Induction Systems',
    description: 'Turbocharger and supercharger installations, upgrades, and tuning. Complete forced induction solutions from bolt-on kits to custom turbo systems.',
    link: '/services/performance/forced-induction',
    icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>',
    services: [
      'Turbocharger installation and upgrades',
      'Supercharger system installation',
      'Intercooler piping and installation',
      'Wastegate and blow-off valve setup',
      'Boost controller installation',
      'Custom turbo manifold fabrication',
      'Forced induction tuning and optimization'
    ]
  },
  {
    id: 'fuel-delivery',
    title: 'Fuel Delivery System Upgrades',
    description: 'High-flow fuel system components including performance fuel pumps, injectors, fuel rails, and complete fuel system upgrades for increased power applications.',
    link: '/services/performance/fuel-delivery',
    icon: '<path d="M3 12h18l-3-3v6l3-3"></path><path d="M3 6h18"></path><path d="M3 18h18"></path>',
    services: [
      'High-flow fuel pump installations',
      'Performance fuel injector upgrades',
      'Fuel rail and regulator upgrades',
      'Fuel line and fitting upgrades',
      'E85 conversion and flex fuel tuning',
      'Fuel system pressure testing',
      'Racing fuel cell installations'
    ]
  },
  {
    id: 'interior-performance',
    title: 'Interior Performance Modifications',
    description: 'Performance-oriented interior upgrades including racing seats, roll cages, gauges, and safety equipment for street and track applications.',
    link: '/services/performance/interior-performance',
    icon: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
    services: [
      'Racing seat installation and mounting',
      'Roll cage design and installation',
      'Performance gauge cluster upgrades',
      'Racing harness and safety equipment',
      'Steering wheel and quick-release hubs',
      'Interior weight reduction modifications',
      'Custom dashboard and console work'
    ]
  },
  {
    id: 'suspension-handling',
    title: 'Suspension & Handling Upgrades',
    description: 'Complete suspension system upgrades including coilovers, sway bars, strut braces, and alignment services to improve handling, cornering, and overall vehicle dynamics.',
    link: '/services/performance/suspension-handling',
    icon: '<path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16-.21 2.31-.54 3.43-1.02"></path><path d="M22 12c0 1.25-.29 2.44-.81 3.5"></path>',
    services: [
      'Coilover suspension installation',
      'Sway bar and anti-roll bar upgrades',
      'Strut tower brace installation',
      'Lowering spring installations',
      'Shock and strut upgrades',
      'Performance alignment services',
      'Bushings and suspension component upgrades'
    ]
  },
  {
    id: 'vehicle-specific-tuning',
    title: 'Vehicle-Specific Performance Tuning',
    description: 'Specialized tuning and modifications tailored to specific vehicle platforms, leveraging manufacturer-specific knowledge and proven modification packages.',
    link: '/services/performance/vehicle-specific-tuning',
    icon: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>',
    services: [
      'BMW N54/N55 turbo upgrades',
      'Subaru EJ/FA engine modifications',
      'Honda K-series performance builds',
      'LS engine swap and tuning',
      'Ford Coyote performance packages',
      'Nissan VQ and SR tuning',
      'Platform-specific turbo kits'
    ]
  },
  {
    id: 'wheels-tires',
    title: 'Performance Wheels & Tires',
    description: 'High-performance wheel and tire packages, including lightweight forged wheels, performance tires, and complete wheel/tire/suspension packages for optimal performance.',
    link: '/services/performance/wheels-tires',
    icon: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="2" x2="12" y2="5"></line><line x1="12" y1="19" x2="12" y2="22"></line>',
    services: [
      'Lightweight forged wheel installations',
      'Performance tire selection and mounting',
      'Track day wheel and tire packages',
      'Custom wheel offset and sizing',
      'Tire pressure monitoring systems',
      'Wheel alignment and balancing',
      'Seasonal tire storage and swaps'
    ]
  }
];

// Featured performance services for the cards section
export const featuredServices = [
  {
    title: 'ECU Tuning & Engine Management',
    description: 'Professional ECU tuning and standalone engine management systems for optimal power delivery and engine characteristics.',
    icon: '<path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>',
    link: '#electronics-tuning'
  },
  {
    title: 'Suspension & Handling',
    description: 'Complete suspension upgrades including coilovers, sway bars, and alignment services for improved cornering and dynamics.',
    icon: '<path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16-.21 2.31-.54 3.43-1.02"></path>',
    link: '#suspension-handling'
  },
  {
    title: 'High-Performance Braking',
    description: 'Upgrade your stopping power with big brake kits, performance pads, and professional brake system enhancements.',
    icon: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle>',
    link: '#braking-systems'
  },
  {
    title: 'Custom Engine Building',
    description: 'From mild street builds to full race engines, we deliver precision machining and assembly for maximum performance.',
    icon: '<path d="M14 6.45V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v4.45"></path>',
    link: '#engine-building'
  }
]; 