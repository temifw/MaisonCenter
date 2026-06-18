import apiClient from './http';

// ---- Shared types (loose; the API returns Supabase rows) -------------
export interface RoomType {
  id: string;
  name: string;
  description?: string;
  base_price: number;
  capacity: number;
  amenities?: string[];
  is_active?: boolean;
}

export interface Room {
  id: string;
  room_number: string;
  room_type_id: string;
  floor?: number | null;
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
  notes?: string | null;
  is_active?: boolean;
  room_types?: RoomType;
}

export interface Booking {
  id: string;
  room_id: string;
  guest_id: string;
  check_in: string;
  check_out: string;
  status: string;
  source: string;
  total_price: number;
  rooms?: { room_number: string; room_types?: { name: string } };
  guests?: { full_name: string; email?: string; phone?: string };
}

export interface Guest {
  id: string;
  full_name: string;
  email?: string;
  phone?: string;
  created_at?: string;
}

export interface DashboardStats {
  date: string;
  rooms: {
    total: number;
    byStatus: { available: number; occupied: number; cleaning: number; maintenance: number };
  };
  arrivalsToday: number;
  departuresToday: number;
  inHouse: number;
}

export interface NewBookingPayload {
  roomTypeId: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestEmail?: string;
  guestPhone?: string;
  guestsCount?: number;
  specialRequests?: string;
  roomId?: string;
  source?: 'online' | 'walk_in' | 'phone';
}

// ---- API surface -----------------------------------------------------
export const hotelService = {
  // Rooms & types
  getRoomTypes: () => apiClient.get<RoomType[]>('/rooms/types'),
  getRooms: () => apiClient.get<Room[]>('/rooms'),
  getAvailability: (roomTypeId: string, checkIn: string, checkOut: string) =>
    apiClient.get<Room[]>('/rooms/availability', {
      params: { roomTypeId, checkIn, checkOut },
    }),
  addRoom: (data: { roomNumber: string; roomTypeId: string; floor?: number; notes?: string }) =>
    apiClient.post<Room>('/rooms', data),
  updateRoom: (id: string, data: Record<string, unknown>) =>
    apiClient.put<Room>(`/rooms/${id}`, data),
  setRoomStatus: (id: string, status: Room['status']) =>
    apiClient.put<Room>(`/rooms/${id}`, { status }),
  deleteRoom: (id: string) => apiClient.delete(`/rooms/${id}`),

  // Bookings
  getBookings: () => apiClient.get<Booking[]>('/bookings'),
  getCalendar: (from: string, to: string) =>
    apiClient.get<Booking[]>('/bookings/calendar', { params: { from, to } }),
  createBooking: (data: NewBookingPayload) => apiClient.post<Booking>('/bookings', data),
  cancelBooking: (id: string) => apiClient.post(`/bookings/${id}/cancel`),

  // Guests
  getGuests: (search = '') => apiClient.get<Guest[]>('/guests', { params: { search } }),
  getGuestBookings: (id: string) => apiClient.get<Booking[]>(`/guests/${id}/bookings`),

  // Reports
  getDashboard: () => apiClient.get<DashboardStats>('/reports/dashboard'),
};
