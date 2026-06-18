import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { authService, type AuthUser } from '../services/authService';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;       // true while we hydrate from a stored token
  isStaff: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // On first load (and after full-page navigations) rebuild the session
  // from the token we stored in localStorage.
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoading(false);
      return;
    }
    authService
      .getCurrentUser()
      .then((res) => {
        const { user, isStaff, role } = res.data;
        setUser({ ...user, isStaff, role });
      })
      .catch(() => {
        localStorage.removeItem('authToken'); // token invalid/expired
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authService.login(email, password);
    const { token, user } = res.data;
    localStorage.setItem('authToken', token);
    setUser(user);
    return user as AuthUser;
  }, []);

  const logout = useCallback(() => {
    authService.logout().catch(() => {});
    localStorage.removeItem('authToken');
    setUser(null);
    window.location.href = '/sign-in';
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, isStaff: !!user?.isStaff, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
