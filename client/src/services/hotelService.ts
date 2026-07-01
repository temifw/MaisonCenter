import apiClient from './http';

export interface RoomType {
  id: string;
  name: string;
  description?: string;
  base_price: number;
  capacity: number;
  amenities?: string[];
}

export interface Booking {
  id: string;
  booking_code: string;
  room_id: string;
  check_in: string;
  check_out: string;
  status: string;
  total_price: number;
  rooms?: { room_number: string; room_types?: { name: string } };
}

// Shape returned by the public code+email lookup (get_booking_by_code RPC).
export interface BookingLookup {
  booking_code: string;
  status: string;
  check_in: string;
  check_out: string;
  guests_count: number;
  total_price: number;
  special_requests?: string | null;
  created_at: string;
  guest_name: string;
  room_number: string;
  room_type: string;
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
}

export const hotelService = {
  getRoomTypes: () => apiClient.get<RoomType[]>('/rooms/types'),
  getAvailability: (roomTypeId: string, checkIn: string, checkOut: string) =>
    apiClient.get('/rooms/availability', { params: { roomTypeId, checkIn, checkOut } }),
  createBooking: (data: NewBookingPayload) => apiClient.post<Booking>('/bookings', data),
  // Public: find a reservation with the booking code + the email it was made with.
  lookupBooking: (code: string, email: string) =>
    apiClient.post<BookingLookup>('/bookings/lookup', { code, email }),
};
