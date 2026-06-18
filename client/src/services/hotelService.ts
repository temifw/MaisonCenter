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
  room_id: string;
  check_in: string;
  check_out: string;
  status: string;
  total_price: number;
  rooms?: { room_number: string; room_types?: { name: string } };
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
  getMyBookings: () => apiClient.get<Booking[]>('/bookings'),
  cancelBooking: (id: string) => apiClient.post(`/bookings/${id}/cancel`),
};
