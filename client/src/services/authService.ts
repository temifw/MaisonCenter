import apiClient from './http';

export interface AuthUser {
  id: string;
  email?: string;
  isStaff?: boolean;
  [key: string]: unknown;
}

export const authService = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),

  register: (email: string, password: string, fullName?: string, phone?: string) =>
    apiClient.post('/auth/register', { email, password, fullName, phone }),

  logout: () => apiClient.post('/auth/logout'),

  getCurrentUser: () => apiClient.get('/auth/me'),
};
