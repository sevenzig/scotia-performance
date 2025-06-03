/**
 * Company information for Scotia Performance Auto
 * This file serves as a single source of truth for company details
 * used throughout the application.
 */

import { businessHoursService } from '$lib/services/businessHours';

// Types for better TypeScript support
export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogImage: string;
  lastModified: string;
}

export interface ServiceInfo {
  name: string;
  description: string;
  category: 'maintenance' | 'performance' | 'diagnostic';
}

export const companyInfo = {
  name: 'Scotia Performance Auto',
  shortName: 'Scotia Performance',
  address: {
    street: '24 Sacandaga Rd',
    city: 'Scotia',
    state: 'NY',
    zip: '12302',
    full: '24 Sacandaga Rd, Scotia, NY 12302',
    // Add coordinates for structured data
    coordinates: {
      latitude: 42.82889119837178,
      longitude: -73.96725658970267
    }
  },
  phone: {
    raw: '5182801698',
    formatted: '(518) 280-1698',
    link: 'tel:+15182801698'
  },
  email: 'info@scotiaauto.com',
  
  // Social media (add as available)
  social: {
    facebook: 'https://www.facebook.com/scotiaperformance',
    instagram: 'https://www.instagram.com/scotiaperformance',
    // twitter: 'https://twitter.com/scotiaperformance'
  },
  
  // Website info
  website: {
    domain: 'scotiaperformance.com',
    baseUrl: 'https://scotiaperformance.com'
  },
  
  // Business description
  description: 'Professional auto repair, AC replacement, and performance tuning in Scotia, NY. ASE certified mechanics specializing in air conditioning repair, brake service, engine diagnostics, and custom tuning.',
  
  // Use the business hours from the service
  getBusinessHours: () => businessHoursService.getBusinessHours(),
  getCurrentStatus: () => businessHoursService.getCurrentStatus(),
  
  // Get formatted hours for structured data
  getStructuredDataHours: () => {
    const hours = businessHoursService.getBusinessHours();
    // Convert to schema.org format (e.g., "Mo-Fr 08:00-17:00")
    return ['Mo-Fr 08:00-17:00']; // Adjust based on your actual hours
  }
};

// Service catalog based on your search console data
export const services: ServiceInfo[] = [
  {
    name: 'AC Repair & Replacement',
    description: 'Professional air conditioning system repair, replacement, and maintenance services',
    category: 'maintenance'
  },
  {
    name: 'Brake Service',
    description: 'Complete brake system diagnostics, repair and replacement including pads, rotors, and brake lines',
    category: 'maintenance'
  },
  {
    name: 'Performance Tuning',
    description: 'Professional ECU tuning and performance enhancement for maximum power and efficiency',
    category: 'performance'
  },
  {
    name: 'Engine Diagnostics',
    description: 'Computer diagnostics, troubleshooting, and repair for all engine issues',
    category: 'diagnostic'
  },
  {
    name: 'Performance Tuning',
    description: 'Precision dynamometer testing and tuning for optimal performance analysis',
    category: 'performance'
  },
  {
    name: 'Transmission Service',
    description: 'Automatic and manual transmission repair, fluid services, and diagnostics',
    category: 'maintenance'
  },
  {
    name: 'VW & Subaru Specialist',
    description: 'Specialized repair services for Volkswagen and Subaru vehicles',
    category: 'maintenance'
  }
];

// Areas served for local SEO (based on your market area)
export const areasServed = [
  { name: 'Scotia', state: 'New York' },
  { name: 'Schenectady', state: 'New York' },
  { name: 'Amsterdam', state: 'New York' },
  { name: 'Ballston Spa', state: 'New York' },
  { name: 'Saratoga Springs', state: 'New York' }
];

// SEO data for different pages
export const seoData = {
  homepage: {
    title: `${companyInfo.shortName} | Auto Repair & AC Service Scotia, NY`,
    description: `${companyInfo.description} Call ${companyInfo.phone.formatted}`,
    keywords: 'auto repair Scotia NY, AC replacement Scotia NY, air conditioner repair Scotia, brake service, performance tuning, performance diagnostics, car repair near me, VW repair, Subaru auto shop',
    canonicalUrl: companyInfo.website.baseUrl,
    ogImage: '/images/scotia-performance-og.jpg',
    lastModified: '2025-05-28'
  } as SEOData,
  
  services: {
    title: `Auto Repair Services | ${companyInfo.shortName} Scotia, NY`,
    description: `Complete auto repair services in Scotia, NY including brake service, AC repair, engine diagnostics, transmission service, and more. Professional ASE certified mechanics.`,
    keywords: 'auto repair services Scotia NY, brake service, AC repair, engine diagnostics, transmission service, oil change',
    canonicalUrl: `${companyInfo.website.baseUrl}/services`,
    ogImage: '/images/services-og.jpg',
    lastModified: '2025-05-28'
  } as SEOData,
  
  performance: {
    title: `Performance Tuning & Diagnostics Services | ${companyInfo.shortName}`,
    description: 'Professional performance tuning and diagnostics services in Scotia, NY. ECU tuning, engine modifications, turbo/supercharger installation, and custom performance builds.',
    keywords: 'performance tuning Scotia NY, performance diagnostics, ECU tuning, engine modification, turbo installation, custom performance',
    canonicalUrl: `${companyInfo.website.baseUrl}/performance`,
    ogImage: '/images/performance-og.jpg',
    lastModified: '2025-05-28'
  } as SEOData
};

// Structured data generators
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": `${companyInfo.website.baseUrl}/#organization`,
    "name": companyInfo.name,
    "alternateName": companyInfo.shortName,
    "url": companyInfo.website.baseUrl,
    "logo": `${companyInfo.website.baseUrl}/images/scotia-performance-logo.png`,
    "description": companyInfo.description,
    "telephone": companyInfo.phone.formatted,
    "email": companyInfo.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": companyInfo.address.street,
      "addressLocality": companyInfo.address.city,
      "addressRegion": companyInfo.address.state,
      "postalCode": companyInfo.address.zip,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": companyInfo.address.coordinates.latitude,
      "longitude": companyInfo.address.coordinates.longitude
    },
    "openingHours": companyInfo.getStructuredDataHours(),
    "priceRange": "$$",
    "areaServed": areasServed.map(area => ({
      "@type": "City",
      "name": area.name,
      "containedInPlace": {
        "@type": "State",
        "name": area.state
      }
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Auto Repair Services",
      "itemListElement": services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description
        }
      }))
    },
    "sameAs": Object.values(companyInfo.social).filter(Boolean)
  };
}

export function generateWebPageSchema(pageSEO: SEOData) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageSEO.canonicalUrl}#webpage`,
    "url": pageSEO.canonicalUrl,
    "name": pageSEO.title,
    "description": pageSEO.description,
    "dateModified": pageSEO.lastModified,
    "inLanguage": "en-US",
    "isPartOf": {
      "@id": `${companyInfo.website.baseUrl}/#website`
    },
    "about": {
      "@id": `${companyInfo.website.baseUrl}/#organization`
    },
    "mainEntity": {
      "@type": "AutomotiveBusiness",
      "@id": `${companyInfo.website.baseUrl}/#organization`
    }
  };
}

// Enhanced FAQ schema based on search console data analysis
export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      // BIGGEST MISSED OPPORTUNITY: AC Services (423+ impressions, 0 clicks)
      {
        "@type": "Question",
        "name": "Do you provide AC replacement services in Scotia, NY?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, ${companyInfo.name} provides professional AC replacement and air conditioning repair services in Scotia, NY. Our ASE certified technicians can diagnose and repair all types of automotive AC systems including compressors, condensers, evaporators, and refrigerant leaks. Call ${companyInfo.phone.formatted} to schedule service.`
        }
      },
      {
        "@type": "Question",
        "name": "How much does AC repair cost in Scotia, NY?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `AC repair costs vary depending on the issue. Simple refrigerant recharges typically cost $150-250, while major component replacements like compressors can range from $800-1500. At ${companyInfo.name}, we provide free diagnostics and upfront pricing before any work begins. Call ${companyInfo.phone.formatted} for a quote.`
        }
      },
      {
        "@type": "Question", 
        "name": "What are signs my car's AC needs repair?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Common signs include: warm air blowing from vents, weak airflow, strange odors, unusual noises when AC is on, or refrigerant leaks under your car. If you notice any of these symptoms in the Scotia, NY area, our technicians can quickly diagnose the problem."
        }
      },
      
      // PERFORMANCE SERVICES (96+ impressions for "performance")  
      {
        "@type": "Question",
        "name": "What performance services do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${companyInfo.name} specializes in performance tuning including ECU tuning, performance testing, turbo/supercharger installation, exhaust systems, intake modifications, and custom performance builds. We work on all makes and models with state-of-the-art diagnostic equipment for precise tuning.`
        }
      },
      {
        "@type": "Question",
        "name": "Do you have performance testing equipment for tuning?", 
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we have professional diagnostic and testing equipment for accurate performance analysis and tuning. Our testing services include baseline analysis, custom ECU tuning, and performance verification to ensure optimal power and reliability for your vehicle."
        }
      },
      {
        "@type": "Question",
        "name": "Can you tune Subaru and VW vehicles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! We specialize in European and Japanese performance tuning, including Subaru WRX/STI models and Volkswagen GTI/R vehicles. Our technicians have extensive experience with these platforms and use manufacturer-specific tuning software for optimal results."
        }
      },

      // GENERAL AUTO REPAIR SERVICES
      {
        "@type": "Question",
        "name": "What auto repair services do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer comprehensive auto repair services including brake service, engine diagnostics, transmission service, AC repair, oil changes, suspension work, tire service, state inspections, and electrical repairs. We also specialize in performance tuning and diagnostics services for enthusiasts."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work on VW and Subaru vehicles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our experienced technicians work on all makes and models including Volkswagen and Subaru vehicles. We have the specialized knowledge, diagnostic equipment, and tools needed for European and Japanese automotive repair and performance modifications."
        }
      },

      // LOCATION & HOURS
      {
        "@type": "Question",
        "name": "Where are you located in Scotia, NY?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${companyInfo.name} is located at ${companyInfo.address.full}. We serve the greater Capital Region area including Schenectady, Amsterdam, Ballston Spa, and surrounding communities. Easy access from Route 5 and Interstate 890.`
        }
      },
      {
        "@type": "Question",
        "name": "What are your business hours?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `We're typically open Monday through Friday from 8:00 AM to 5:00 PM. For current hours and availability, please call ${companyInfo.phone.formatted} or check our website. We also offer emergency services for urgent repairs.`
        }
      },

      // COMMON AUTO REPAIR QUESTIONS
      {
        "@type": "Question",
        "name": "How often should I service my brakes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Brake pads typically need replacement every 25,000-70,000 miles depending on driving habits and vehicle type. We recommend brake inspections every 12,000 miles or during oil changes. Signs you need brake service include squealing, grinding noises, or a soft brake pedal."
        }
      },
      {
        "@type": "Question",
        "name": "What does a check engine light mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A check engine light indicates your vehicle's computer has detected an issue with the engine, transmission, or emissions system. Common causes include faulty oxygen sensors, catalytic converter issues, or loose gas caps. We offer professional diagnostic services to identify the exact problem."
        }
      },
      {
        "@type": "Question",
        "name": "How long does transmission service take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Basic transmission fluid changes typically take 1-2 hours, while major transmission repairs can take 1-3 days depending on the issue and parts availability. We provide accurate time estimates and keep you informed throughout the repair process."
        }
      },

      // APPOINTMENTS
      {
        "@type": "Question",
        "name": "Do I need an appointment for service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `While we accept walk-ins for basic services, we recommend scheduling an appointment to ensure prompt service. Call ${companyInfo.phone.formatted} or visit our website to book your appointment. Emergency repairs are handled as quickly as possible.`
        }
      },

      // SPECIALIZATIONS
      {
        "@type": "Question",
        "name": "Can you work on modified or performance vehicles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! We specialize in modified and performance vehicles. Our technicians understand aftermarket parts, performance modifications, and tuning requirements. Whether you need maintenance on a tuned car or want to add performance modifications, we have the expertise."
        }
      },
      {
        "@type": "Question",
        "name": "Do you install aftermarket parts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we install high-quality aftermarket performance parts including turbo systems, exhaust systems, suspension components, and engine modifications. We work with reputable brands and ensure proper installation for optimal performance and reliability."
        }
      }
    ]
  };
}

// Generate all structured data for a page
export function generateAllStructuredData(pageSEO: SEOData) {
  return [
    generateOrganizationSchema(),
    generateWebPageSchema(pageSEO),
    generateFAQSchema()
  ];
}

// Helper function to get SEO data by route
export function getSEOData(route: string): SEOData {
  switch (route) {
    case '/':
      return seoData.homepage;
    case '/services':
      return seoData.services;
    case '/performance':
      return seoData.performance;
    default:
      return seoData.homepage;
  }
}

export default companyInfo; 