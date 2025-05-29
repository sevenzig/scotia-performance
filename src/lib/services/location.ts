// src/lib/services/location.ts

import { companyInfo } from '$lib/data/companyInfo';

export interface UserLocation {
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  accuracy?: number;
}

export interface DirectionInfo {
  distance: string;
  duration: string;
  durationInMinutes: number;
  route: string;
  directionsUrl: string;
}

export interface NearbyArea {
  name: string;
  directions: string;
  estimatedTime: string;
  distance: string;
}

// Predefined directions from nearby communities
export const nearbyAreas: NearbyArea[] = [
  {
    name: "Schenectady",
    directions: "Take NY-5 West for 3 miles. Turn right onto Sacandaga Rd. We're on the right.",
    estimatedTime: "8-12 minutes",
    distance: "3.2 miles"
  },
  {
    name: "Amsterdam", 
    directions: "Take NY-5 East for 8 miles. Turn left onto Sacandaga Rd. We're on the right.",
    estimatedTime: "12-18 minutes",
    distance: "8.1 miles"
  },
  {
    name: "Rotterdam",
    directions: "Take Guilderland Ave, Broadway, Western Gateway Bridge and Mohawk Ave to 1st St in Scotia",
    estimatedTime: "10-15 minutes", 
    distance: "9.3 miles"
  },
  {
    name: "Ballston Spa",
    directions: "Take NY-50 South to NY-67 West. Continue to NY-5 West, turn right on Sacandaga Rd.",
    estimatedTime: "20-25 minutes",
    distance: "12.5 miles"
  },
  {
    name: "Saratoga Springs",
    directions: "Take I-87 South to Exit 13N. Follow NY-9 to NY-67 West to NY-5 West.",
    estimatedTime: "25-30 minutes",
    distance: "18.2 miles"
  },
  {
    name: "Troy",
    directions: "Take NY-2 West to I-890 West. Exit 5 to Scotia, turn right on Sacandaga Rd.",
    estimatedTime: "20-25 minutes",
    distance: "11.8 miles"
  },
  {
    name: "Albany",
    directions: "Take I-90 West to I-890 West. Exit 5 to Scotia, turn right on Sacandaga Rd.",
    estimatedTime: "25-30 minutes",
    distance: "15.4 miles"
  }
];

class LocationService {
  private shopLocation = {
    lat: companyInfo.address.coordinates.latitude,
    lng: companyInfo.address.coordinates.longitude
  };

  // Get user's current location using browser geolocation
  async getUserLocation(): Promise<UserLocation | null> {
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by this browser');
      return null;
    }

    return new Promise((resolve) => {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes cache
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          console.warn('Error getting location:', error.message);
          resolve(null);
        },
        options
      );
    });
  }

  // Calculate distance between two points using Haversine formula
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3959; // Earth's radius in miles
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private toRad(deg: number): number {
    return deg * (Math.PI/180);
  }

  // Estimate travel time based on distance (rough calculation)
  estimateTravelTime(distanceInMiles: number): number {
    // Assume average 30 mph in local area (accounting for traffic, lights, etc.)
    const avgSpeed = 30;
    return Math.round((distanceInMiles / avgSpeed) * 60); // Convert to minutes
  }

  // Get directions info from user location
  async getDirectionsFromUserLocation(userLocation: UserLocation): Promise<DirectionInfo | null> {
    try {
      const distance = this.calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        this.shopLocation.lat,
        this.shopLocation.lng
      );

      const durationInMinutes = this.estimateTravelTime(distance);
      
      // Generate Google Maps directions URL
      const directionsUrl = this.generateDirectionsUrl(
        userLocation.latitude,
        userLocation.longitude
      );

      return {
        distance: `${distance.toFixed(1)} miles`,
        duration: this.formatDuration(durationInMinutes),
        durationInMinutes,
        route: this.generateSimpleRoute(distance),
        directionsUrl
      };
    } catch (error) {
      console.error('Error calculating directions:', error);
      return null;
    }
  }

  // Generate Google Maps directions URL
  generateDirectionsUrl(fromLat: number, fromLng: number): string {
    const destination = `${this.shopLocation.lat},${this.shopLocation.lng}`;
    const origin = `${fromLat},${fromLng}`;
    return `https://www.google.com/maps/dir/${origin}/${destination}`;
  }

  // Generate Apple Maps directions URL (for iOS devices)
  generateAppleMapsUrl(fromLat: number, fromLng: number): string {
    return `https://maps.apple.com/?saddr=${fromLat},${fromLng}&daddr=${this.shopLocation.lat},${this.shopLocation.lng}`;
  }

  // Format duration for display
  private formatDuration(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} minutes`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 
        ? `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minutes`
        : `${hours} hour${hours > 1 ? 's' : ''}`;
    }
  }

  // Generate simple route description based on distance
  private generateSimpleRoute(distance: number): string {
    if (distance < 2) {
      return "Very close to our location";
    } else if (distance < 5) {
      return "Short local drive via main roads";
    } else if (distance < 15) {
      return "Drive via local highways (NY-5, I-890)";
    } else {
      return "Drive via major highways (I-90, I-87, I-890)";
    }
  }

  // Find the closest predefined area to user location
  findClosestPredefinedArea(userLocation: UserLocation): NearbyArea | null {
    // This is a simplified version - you could enhance with actual city detection
    const knownCities = [
      { name: "Schenectady", lat: 42.8142, lng: -73.9396 },
      { name: "Amsterdam", lat: 42.9387, lng: -74.1887 },
      { name: "Rotterdam", lat: 42.7887, lng: -73.9798 },
      { name: "Ballston Spa", lat: 43.0009, lng: -73.8515 },
      { name: "Saratoga Springs", lat: 43.0831, lng: -73.7854 },
      { name: "Troy", lat: 42.7284, lng: -73.6918 },
      { name: "Albany", lat: 42.6526, lng: -73.7562 }
    ];

    let closestCity: string | null = null;
    let closestDistance = Infinity;

    knownCities.forEach(city => {
      const distance = this.calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        city.lat,
        city.lng
      );
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestCity = city.name;
      }
    });

    return closestCity ? nearbyAreas.find(area => area.name === closestCity) || null : null;
  }

  // Get user's approximate city using reverse geocoding (optional)
  async getUserCity(userLocation: UserLocation): Promise<string | null> {
    try {
      // Using a simple reverse geocoding approach
      // In production, you might want to use a proper geocoding service
      const closestArea = this.findClosestPredefinedArea(userLocation);
      return closestArea?.name || null;
    } catch (error) {
      console.error('Error getting user city:', error);
      return null;
    }
  }
}

export const locationService = new LocationService();