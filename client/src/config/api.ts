export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Hotel/Rooms
  ROOMS: '/rooms',
  BOOKINGS: '/bookings',
  BOOKING_LOOKUP: '/bookings/lookup',
};