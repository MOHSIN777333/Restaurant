export type DietaryTag = 
  | 'Vegetarian' 
  | 'Vegan' 
  | 'Gluten-Free' 
  | 'Halal' 
  | 'Nut-Free' 
  | 'Chef Selection' 
  | 'Organic';

export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'mains' | 'grills' | 'desserts' | 'drinks' | 'tasting';
  description: string;
  price: number;
  image: string;
  dietaryTags: DietaryTag[];
  isAvailable: boolean;
  isPopular?: boolean;
  calories?: number;
  ingredients?: string[];
  allergens?: string[];
  winePairing?: string;
  preparationTime?: string;
}

export type ReservationStatus = 'pending' | 'confirmed' | 'seated' | 'cancelled' | 'completed';

export type SeatingArea = 'Main Dining Room' | 'Chef’s Tasting Counter' | 'Private Garden Terrace' | 'Wine Cellar Vault';

export interface Reservation {
  id: string;
  confirmationCode: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  partySize: number;
  seatingArea: SeatingArea;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  status: ReservationStatus;
  createdAt: string;
  tableNumber?: number;
}

export interface OperatingHour {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  dayName: string;
  openTime: string; // e.g. "11:30"
  closeTime: string; // e.g. "23:00"
  isClosed: boolean;
  serviceType: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead?: boolean;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  description: string;
  foundedYear: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  headChef: string;
  sommelier: string;
  rating: number;
  reviewCount: number;
  dressCode: string;
  parkingInfo: string;
  socials: {
    instagram: string;
    facebook: string;
    tripadvisor: string;
  };
}
