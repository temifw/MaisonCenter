import apiClient from './http';

export interface AuthUser {
  id: string;
  email?: string;
  isStaff?: boolean;
  role?: string | null;
  [key: string]: unknown;
}

export const authService = {
  // POST /auth/login -> { token, user }
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),

  // Staff are created in the DB, but we expose register for completeness.
  register: (email: string, password: string, fullName?: string, phone?: string) =>
    apiClient.post('/auth/register', { email, password, fullName, phone }),

  logout: () => apiClient.post('/auth/logout'),

  // GET /auth/me -> { user, profile, isStaff, role }
  getCurrentUser: () => apiClient.get('/auth/me'),
};
