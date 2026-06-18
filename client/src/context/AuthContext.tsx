import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { authService, type AuthUser } from '../services/authService';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (email: string, password: string, fullName?: string, phone?: string) => Promise<AuthUser | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoading(false);
      return;
    }
    authService
      .getCurrentUser()
      .then((res) => setUser({ ...res.data.user, isStaff: res.data.isStaff }))
      .catch(() => localStorage.removeItem('authToken'))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authService.login(email, password);
    localStorage.setItem('authToken', res.data.token);
    setUser(res.data.user);
    return res.data.user as AuthUser;
  }, []);

  const register = useCallback(async (email: string, password: string, fullName?: string, phone?: string) => {
    const res = await authService.register(email, password, fullName, phone);
    if (res.data.token) {
      localStorage.setItem('authToken', res.data.token);
      setUser(res.data.user);
    }
    return (res.data.user ?? null) as AuthUser | null;
  }, []);

  const logout = useCallback(() => {
    authService.logout().catch(() => {});
    localStorage.removeItem('authToken');
    setUser(null);
    window.location.href = '/';
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
