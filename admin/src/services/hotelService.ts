import apiClient from './http';

export const hotelService = {
  getRooms: () => apiClient.get('/rooms'),
  getBookings: () => apiClient.get('/bookings'),
  createBooking: (data: any) => apiClient.post('/bookings', data),
  updateRoom: (id: string, data: any) => apiClient.put(`/rooms/${id}`, data),
};