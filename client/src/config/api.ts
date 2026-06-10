export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/auth/register',
  
  // Hotel/Rooms
  ROOMS: '/rooms',
  BOOKINGS: '/bookings',
  
  // Admin-specific
  USERS: '/users',
  REPORTS: '/reports',
};