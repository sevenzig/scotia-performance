/**
 * Service for managing business hours
 */

// Define business hours type
export const businessHours = [
  { day: "Monday", hours: "8:00 AM - 5:00 PM" },
  { day: "Tuesday", hours: "8:00 AM - 5:00 PM" },
  { day: "Wednesday", hours: "8:00 AM - 5:00 PM" },
  { day: "Thursday", hours: "8:00 AM - 5:00 PM" },
  { day: "Friday", hours: "8:00 AM - 5:00 PM" },
  { day: "Saturday", hours: "Closed" },
  { day: "Sunday", hours: "Closed" }
];

/**
 * Business hours service with basic functionality
 */
export const businessHoursService = {
  /**
   * Returns the business hours
   */
  getBusinessHours() {
    return businessHours;
  },

  /**
   * Returns the current business status
   */
  getCurrentStatus() {
    const date = new Date();
    const day = date.getDay();
    const hours = date.getHours();
    
    // Basic implementation
    const isOpen = day >= 1 && day <= 5 && hours >= 8 && hours < 17;
    const message = isOpen ? "Open today until 5PM" : "Currently closed until 8AM Monday";
    
    return { isOpen, message };
  }
};

// Default export for flexibility
export default businessHoursService; 