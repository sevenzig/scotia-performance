// src/routes/location/+page.server.ts

import type { PageServerLoad } from './$types';
import { companyInfo } from '$lib/data/companyInfo';

export const load: PageServerLoad = async ({ url, getClientAddress }) => {
  // You could potentially use server-side IP geolocation here
  // const clientIP = getClientAddress();
  
  return {
    seo: {
      title: `Directions to ${companyInfo.name} | Scotia, NY Auto Repair`,
      description: `Get directions to ${companyInfo.name} at ${companyInfo.address.full}. Located in Scotia, NY serving Schenectady, Amsterdam, Rotterdam and surrounding areas.`,
      keywords: 'directions Scotia Performance, auto repair Scotia NY location, how to get to Scotia Performance, automotive service directions',
      canonicalUrl: url.href,
      ogImage: '/images/location-og.jpg',
      lastModified: new Date().toISOString()
    },
    companyInfo: {
      name: companyInfo.name,
      address: companyInfo.address,
      phone: companyInfo.phone,
      coordinates: companyInfo.address.coordinates
    }
  };
};