import { MenuItem, Reservation, ContactMessage, OperatingHour } from '../types';
import { INITIAL_MENU_ITEMS, INITIAL_RESERVATIONS, OPERATING_HOURS } from '../data/restaurantData';

const STORAGE_KEYS = {
  RESERVATIONS: 'aura_reservations_v1',
  MENU_ITEMS: 'aura_menu_items_v1',
  CONTACT_MESSAGES: 'aura_contact_messages_v1',
};

// Maximum concurrent tables available per 30-min timeslot
const MAX_TABLES_PER_SLOT = 4;

export const StorageService = {
  // --- RESERVATIONS ---
  getReservations(): Reservation[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read reservations from storage', e);
    }
    // Initialize default seed
    try {
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(INITIAL_RESERVATIONS));
    } catch {
      // Ignore
    }
    return INITIAL_RESERVATIONS;
  },

  saveReservations(reservations: Reservation[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
    } catch (e) {
      console.error('Could not save reservations', e);
    }
  },

  createReservation(reservationData: Omit<Reservation, 'id' | 'confirmationCode' | 'createdAt' | 'status'>): { success: boolean; reservation?: Reservation; error?: string } {
    const reservations = this.getReservations();

    // Check for double booking or slot capacity
    const conflictingBookings = reservations.filter(
      (r) => r.date === reservationData.date && r.time === reservationData.time && r.status !== 'cancelled'
    );

    if (conflictingBookings.length >= MAX_TABLES_PER_SLOT) {
      return {
        success: false,
        error: `All dining tables for ${reservationData.time} on this date are fully reserved. Please select an adjacent time slot.`,
      };
    }

    const uniqueNum = Math.floor(10000 + Math.random() * 90000);
    const confirmationCode = `AUR-${uniqueNum}`;

    const newReservation: Reservation = {
      ...reservationData,
      id: 'res-' + Date.now(),
      confirmationCode,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      tableNumber: Math.floor(1 + Math.random() * 24),
    };

    const updated = [newReservation, ...reservations];
    this.saveReservations(updated);

    return {
      success: true,
      reservation: newReservation,
    };
  },

  updateReservationStatus(id: string, status: Reservation['status']): Reservation[] {
    const reservations = this.getReservations();
    const updated = reservations.map((r) => (r.id === id ? { ...r, status } : r));
    this.saveReservations(updated);
    return updated;
  },

  deleteReservation(id: string): Reservation[] {
    const reservations = this.getReservations();
    const updated = reservations.filter((r) => r.id !== id);
    this.saveReservations(updated);
    return updated;
  },

  getAvailableTimeSlots(dateString: string): { time: string; available: boolean; remainingSpots: number }[] {
    if (!dateString) return [];
    
    // Parse date for day of week
    const [year, month, day] = dateString.split('-').map(Number);
    const targetDate = new Date(year, month - 1, day);
    const dayOfWeek = targetDate.getDay();

    const hoursConfig = OPERATING_HOURS.find((h) => h.dayOfWeek === dayOfWeek);
    if (!hoursConfig || hoursConfig.isClosed) {
      return [];
    }

    // Generate 30 minute time intervals from openTime to closeTime - 1 hr
    const slots: { time: string; available: boolean; remainingSpots: number }[] = [];
    const [openH, openM] = hoursConfig.openTime.split(':').map(Number);
    const [closeH, closeM] = hoursConfig.closeTime.split(':').map(Number);

    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM - 45; // Last seating 45m before close

    const reservations = this.getReservations().filter(
      (r) => r.date === dateString && r.status !== 'cancelled'
    );

    for (let m = openMinutes; m <= closeMinutes; m += 30) {
      const h = Math.floor(m / 60);
      const min = m % 60;
      const timeStr = `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;

      const bookedCount = reservations.filter((r) => r.time === timeStr).length;
      const remainingSpots = Math.max(0, MAX_TABLES_PER_SLOT - bookedCount);

      slots.push({
        time: timeStr,
        available: remainingSpots > 0,
        remainingSpots,
      });
    }

    return slots;
  },

  // --- MENU ITEMS ---
  getMenuItems(): MenuItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MENU_ITEMS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read menu items from storage', e);
    }
    try {
      localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(INITIAL_MENU_ITEMS));
    } catch {
      // Ignore
    }
    return INITIAL_MENU_ITEMS;
  },

  saveMenuItems(items: MenuItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
    } catch (e) {
      console.error('Could not save menu items', e);
    }
  },

  toggleMenuItemAvailability(id: string): MenuItem[] {
    const items = this.getMenuItems();
    const updated = items.map((i) => (i.id === id ? { ...i, isAvailable: !i.isAvailable } : i));
    this.saveMenuItems(updated);
    return updated;
  },

  updateMenuItemPrice(id: string, newPrice: number): MenuItem[] {
    const items = this.getMenuItems();
    const updated = items.map((i) => (i.id === id ? { ...i, price: newPrice } : i));
    this.saveMenuItems(updated);
    return updated;
  },

  // --- CONTACT INQUIRIES ---
  getContactMessages(): ContactMessage[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONTACT_MESSAGES);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read contact messages', e);
    }
    return [
      {
        id: 'msg-1',
        name: 'Victoria Sterling',
        email: 'victoria@sterlingbrands.com',
        phone: '+1 (415) 555-7788',
        subject: 'Private Dining Buyout for 40 Guests',
        message: 'Inquiring about hosting an intimate anniversary dinner reception on the Private Garden Terrace next month.',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        isRead: false,
      },
    ];
  },

  saveContactMessage(messageData: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>): ContactMessage {
    const current = this.getContactMessages();
    const newMessage: ContactMessage = {
      ...messageData,
      id: 'msg-' + Date.now(),
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    const updated = [newMessage, ...current];
    try {
      localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(updated));
    } catch (e) {
      console.error('Could not save contact message', e);
    }
    return newMessage;
  },
};
