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
      latitude: 42.8264,
      longitude: -73.9532
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
    name: 'Dyno Tuning',
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
    keywords: 'auto repair Scotia NY, AC replacement Scotia NY, air conditioner repair Scotia, brake service, performance tuning, dyno tuning, car repair near me, VW repair, Subaru auto shop',
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
    title: `Performance Tuning & Dyno Services | ${companyInfo.shortName}`,
    description: 'Professional performance tuning and dyno services in Scotia, NY. ECU tuning, engine modifications, turbo/supercharger installation, and custom performance builds.',
    keywords: 'performance tuning Scotia NY, dyno tuning, ECU tuning, engine modification, turbo installation, custom performance',
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

// FAQ schema based on your search console data
export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do you provide AC replacement services in Scotia, NY?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, ${companyInfo.name} provides professional AC replacement and air conditioning repair services in Scotia, NY. Our ASE certified technicians can diagnose and repair all types of automotive AC systems. Call ${companyInfo.phone.formatted} to schedule service.`
        }
      },
      {
        "@type": "Question",
        "name": "What auto repair services do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer comprehensive auto repair services including brake service, engine diagnostics, transmission service, AC repair, oil changes, suspension work, tire service, and state inspections. We also specialize in performance tuning and dyno services."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work on VW and Subaru vehicles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our experienced technicians work on all makes and models including Volkswagen and Subaru vehicles. We have the specialized knowledge and tools needed for European and Japanese automotive repair."
        }
      },
      {
        "@type": "Question",
        "name": "Where are you located in Scotia, NY?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${companyInfo.name} is located at ${companyInfo.address.full}. We serve the greater Capital Region area including Schenectady, Amsterdam, and surrounding communities.`
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