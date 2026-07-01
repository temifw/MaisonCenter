import axios from 'axios';
import { API_BASE_URL } from '../config/api';

// The customer site is now fully public — bookings are created as a guest
// and retrieved with a booking code + email. There is no customer login,
// so we no longer attach an auth token or redirect on 401.
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
