// Helper function to check if a specific date matches a holiday
function isHoliday(date) {
    const year = date.getFullYear();

    // Define specific holiday dates
    const holidays = [
        new Date(year, 0, 1),     // New Year's Day (Jan 1)
        getMLKDay(year),          // Martin Luther King Jr. Day (Third Monday in Jan)
        getPresidentsDay(year),   // Presidents' Day (Third Monday in Feb)
        getMemorialDayDate(year), // Memorial Day (Last Monday in May)
        new Date(year, 5, 19),    // Juneteenth National Independence Day (June 19)
        new Date(year, 6, 4),     // Independence Day (July 4)
        getLaborDayDate(year),    // Labor Day (First Monday in Sept)
        getColumbusDayDate(year), // Columbus Day (Second Monday in Oct)
        new Date(year, 10, 11),   // Veterans Day (Nov 11)
        getThanksgivingDate(year), // Thanksgiving (4th Thursday in Nov)
        new Date(year, 11, 24),   // Christmas Eve (Dec 24)
        new Date(year, 11, 25),   // Christmas Day (Dec 25)
    ];

    // Check if the current date matches any holiday
    return holidays.some(holiday => holiday.toDateString() === date.toDateString());
}

// Helper function to calculate Martin Luther King Jr. Day (3rd Monday in January)
function getMLKDay(year) {
    const january = new Date(year, 0, 1);
    const dayOfWeek = january.getDay();
    const daysUntilMonday = (1 - dayOfWeek + 7) % 7;
    return new Date(january.setDate(1 + daysUntilMonday + 14));
}

// Helper function to calculate Presidents' Day (3rd Monday in February)
function getPresidentsDay(year) {
    const february = new Date(year, 1, 1);
    const dayOfWeek = february.getDay();
    const daysUntilMonday = (1 - dayOfWeek + 7) % 7;
    return new Date(february.setDate(1 + daysUntilMonday + 14));
}

// Helper function to calculate Labor Day (First Monday in September)
function getLaborDayDate(year) {
    const september = new Date(year, 8, 1);
    const dayOfWeek = september.getDay();
    const daysUntilMonday = (1 - dayOfWeek + 7) % 7;
    return new Date(september.setDate(1 + daysUntilMonday));
}

// Helper function to calculate Columbus Day (Second Monday in October)
function getColumbusDayDate(year) {
    const october = new Date(year, 9, 1);
    const dayOfWeek = october.getDay();
    const daysUntilMonday = (1 - dayOfWeek + 7) % 7;
    return new Date(october.setDate(1 + daysUntilMonday + 7));
}

// Helper function to calculate Thanksgiving date (4th Thursday in November)
function getThanksgivingDate(year) {
    const november = new Date(year, 10, 1);
    const dayOfWeek = november.getDay();
    const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
    return new Date(november.setDate(1 + daysUntilThursday + 21));
}

// Helper function to calculate Memorial Day date (last Monday in May)
function getMemorialDayDate(year) {
    const may = new Date(year, 4, 1);
    const dayOfWeek = may.getDay();
    const daysUntilMonday = (1 - dayOfWeek + 7) % 7;
    return new Date(may.setDate(1 + daysUntilMonday + 28));
}

// Main business hours function
function getBusinessHours() {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Check if today is a holiday
    if (isHoliday(now)) {
        return "Closed for Holiday - Opens tomorrow at 8AM";
    }

    // Check if it's a weekend
    if (day === 0 || day === 6) { // Sunday (0) or Saturday (6)
        return "Closed - Opens Monday at 8AM";
    }

    // Weekday hours (Monday to Friday)
    if (day >= 1 && day <= 5) {
        // Check if we're about to close (within 15 minutes of closing)
        if (hours === 16 && minutes >= 45) {
            return "Closing soon at 5PM";
        }
        
        if (hours >= 8 && hours < 17) {
            return "Open today until 5PM";
        } else if (hours < 8) {
            return "Opening today at 8AM";
        } else {
            if (day === 5) { // Friday
                return "Closed - Opens Monday at 8AM";
            }
            return "Closed - Opens tomorrow at 8AM";
        }
    }

    return "Closed - Opens Monday at 8AM";
}

// Update all hours displays on the page
function updateAllHoursDisplays() {
    const hoursElements = document.querySelectorAll('[id^="hours-text"]');
    const hours = getBusinessHours();
    
    hoursElements.forEach(element => {
        if (element) {
            element.textContent = hours;
        }
    });
}

// Business hours initialization
function initializeBusinessHours() {
    function getBusinessHours() {
        const now = new Date();
        const day = now.getDay();
        const hours = now.getHours();
        console.log('Getting hours for day:', day, 'hour:', hours);
        
        if (day >= 1 && day <= 5) {
            if (hours >= 8 && hours < 17) {
                return "Open today until 5PM";
            } else if (hours < 8) {
                return "Opening today at 8AM";
            } else {
                if (day === 5) {
                    return "Closed - Opens Monday at 8AM";
                }
                return "Closed - Opens tomorrow at 8AM";
            }
        }
        return "Closed - Opens Monday at 8AM";
    }

    // Update Hours Display for all elements with hours information
    function updateAllHoursDisplays() {
        const hoursElements = [
            document.getElementById('hours-text'),
            document.getElementById('mega-menu-hours-text'),
            document.getElementById('mobile-menu-hours-text')
        ];
        
        const hoursText = getBusinessHours();
        console.log('Updating all hours displays with:', hoursText);
        
        hoursElements.forEach(element => {
            if (element) {
                element.textContent = hoursText;
                console.log(`Updated hours for ${element.id}`);
            }
        });
    }

    // Initialize hours and set interval
    updateAllHoursDisplays();
    setInterval(updateAllHoursDisplays, 60000); // Update every minute
} 