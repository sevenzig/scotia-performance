/**
 * Service for generating JSON-LD Schema.org markup
 */

export class SchemaService {
  /**
   * Generate the base schema data for the auto repair shop
   * @returns JSON-LD schema data
   */
  static getBaseSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "AutoRepair",
      "name": "Scotia Performance Auto",
      "url": "https://scotiaperformance.com",
      "logo": "https://scotiaperformance.com/images/logo.png",
      "image": "https://scotiaperformance.com/images/shop-photo.jpg",
      "description": "Professional auto repair services in Scotia, NY. ASE certified mechanics specializing in brake service, engine repair, transmission service, and more.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "24 Sacandaga Rd",
        "addressLocality": "Scotia",
        "addressRegion": "NY",
        "postalCode": "12302",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "42.8288669",
        "longitude": "-73.9672425"
      },
      "telephone": "+15183746111",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "17:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "00:00"
        }
      ],
      "priceRange": "$$"
    };
  }

  /**
   * Generate schema for a specific service
   * @param serviceData The service data
   * @returns JSON-LD schema data for the service
   */
  static getServiceSchema(serviceData: {
    name: string;
    description: string;
    url: string;
    image?: string;
  }) {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": serviceData.name,
      "name": serviceData.name,
      "description": serviceData.description,
      "url": serviceData.url,
      "provider": {
        "@type": "AutoRepair",
        "name": "Scotia Performance Auto",
        "url": "https://scotiaperformance.com"
      },
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "42.8288669",
          "longitude": "-73.9672425"
        },
        "geoRadius": "50000"
      },
      "image": serviceData.image || "https://scotiaperformance.com/images/service-default.jpg"
    };
  }
  
  /**
   * Generate JSON-LD script tag content
   * @param data The schema data object
   * @returns JSON string for use in script tag
   */
  static generateSchemaScript(data: any) {
    return JSON.stringify(data);
  }
}

export default SchemaService; 