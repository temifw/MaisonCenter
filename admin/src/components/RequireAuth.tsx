import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// Wrap any staff-only page. While the session hydrates we show a spinner;
// if there's no authenticated staff user we bounce to /sign-in.
export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, isStaff } = useAuth();

  useEffect(() => {
    if (!loading && (!user || !isStaff)) {
      window.location.href = '/sign-in';
    }
  }, [loading, user, isStaff]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface text-secondary">
        <span className="material-symbols-outlined animate-spin text-3xl">progress_activity</span>
      </div>
    );
  }

  if (!user || !isStaff) return null; // redirecting

  return <>{children}</>;
};
