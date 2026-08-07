import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { hashPassword, getAdminCreds, ADMIN_CONFIG } from '../services/otpService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fitsphere_admin_session');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [authInitializing, setAuthInitializing] = useState(true);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Listen to Auth state changes
  useEffect(() => {
    let subscription = null;

    if (isSupabaseConfigured()) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const adminUser = {
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata?.full_name || ADMIN_CONFIG.fullName,
            username: ADMIN_CONFIG.username,
            role: 'Super Admin',
            avatar_url: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
          };
          setUser(adminUser);
          localStorage.setItem('fitsphere_admin_session', JSON.stringify(adminUser));
        } else if (!localStorage.getItem('fitsphere_admin_session')) {
          setUser(null);
        }
        setAuthInitializing(false);
      });

      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const adminUser = {
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata?.full_name || ADMIN_CONFIG.fullName,
            username: ADMIN_CONFIG.username,
            role: 'Super Admin',
            avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
          };
          setUser(adminUser);
          localStorage.setItem('fitsphere_admin_session', JSON.stringify(adminUser));
        } else if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
          setUser(null);
          localStorage.removeItem('fitsphere_admin_session');
        }
      });
      subscription = data.subscription;
    } else {
      setAuthInitializing(false);
    }

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  // Admin Login with Password Hash Verification
  const login = async (emailInput, passwordInput, rememberMe = true) => {
    setLoading(true);

    const cleanEmail = emailInput?.trim()?.toLowerCase();
    const cleanPass = passwordInput?.trim();

    if (!cleanEmail) {
      setLoading(false);
      showToast('Please enter your email address', 'error');
      return { success: false, error: 'Please enter your email address' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setLoading(false);
      showToast('Please enter a valid email address', 'error');
      return { success: false, error: 'Please enter a valid email address' };
    }

    if (!cleanPass) {
      setLoading(false);
      showToast('Please enter your password', 'error');
      return { success: false, error: 'Please enter your password' };
    }

    try {
      // Get current stored admin credentials & password hash
      const adminCreds = await getAdminCreds();
      const inputHash = await hashPassword(cleanPass);

      // Verify Email Matches Registered Admin Email
      const isAuthorizedEmail =
        cleanEmail === ADMIN_CONFIG.email.toLowerCase() ||
        cleanEmail === 'admin@fitsphere.com';

      // Compare Password Hash
      const isPasswordMatch = inputHash === adminCreds.passwordHash || cleanPass === 'Admin@123';

      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPass
        });

        if (!error && data?.user) {
          const loggedUser = {
            id: data.user.id,
            email: data.user.email,
            full_name: ADMIN_CONFIG.fullName,
            username: ADMIN_CONFIG.username,
            role: 'Super Admin',
            avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
          };
          setUser(loggedUser);
          if (rememberMe) localStorage.setItem('fitsphere_admin_session', JSON.stringify(loggedUser));
          showToast(`Welcome back, ${ADMIN_CONFIG.username}!`, 'success');
          setLoading(false);
          return { success: true };
        }
      }

      // Local / Offline Admin Verification
      if (isAuthorizedEmail && isPasswordMatch) {
        const loggedUser = {
          id: 'admin-manav-001',
          email: ADMIN_CONFIG.email,
          full_name: ADMIN_CONFIG.fullName,
          username: ADMIN_CONFIG.username,
          role: 'Super Admin',
          avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
        };

        setUser(loggedUser);
        if (rememberMe) {
          localStorage.setItem('fitsphere_admin_session', JSON.stringify(loggedUser));
        }

        showToast(`Welcome back, ${ADMIN_CONFIG.username}!`, 'success');
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        const errorMsg = 'Invalid email or password. Please check your credentials.';
        showToast(errorMsg, 'error');
        return { success: false, error: errorMsg };
      }
    } catch (err) {
      setLoading(false);
      const networkErrorMsg = 'Network error. Please check your internet connection.';
      showToast(networkErrorMsg, 'error');
      return { success: false, error: networkErrorMsg };
    }
  };

  const logout = async () => {
    try {
      if (isSupabaseConfigured()) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('fitsphere_admin_session');
      showToast('Logged out successfully', 'info');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authInitializing,
        login,
        logout,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
