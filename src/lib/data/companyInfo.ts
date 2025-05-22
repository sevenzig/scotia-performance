/**
 * Company information for Scotia Performance Auto
 * This file serves as a single source of truth for company details
 * used throughout the application.
 */

import { businessHoursService } from '$lib/services/businessHours';

export const companyInfo = {
  name: 'Scotia Performance Auto',
  address: {
    street: '24 Sacandaga Rd',
    city: 'Scotia',
    state: 'NY',
    zip: '12302',
    full: '24 Sacandaga Rd, Scotia, NY 12302'
  },
  phone: {
    raw: '5182801698',
    formatted: '(518) 280-1698',
    link: 'tel:+15182801698'
  },
  email: 'info@scotiaauto.com', // Replace with actual email if available
  // Use the business hours from the service
  getBusinessHours: () => businessHoursService.getBusinessHours(),
  getCurrentStatus: () => businessHoursService.getCurrentStatus()
};

export default companyInfo; 