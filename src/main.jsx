import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './index.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';
import { VerifyOTP } from './pages/VerifyOTP';
import { ResetPassword } from './pages/ResetPassword';
import { Dashboard } from './pages/Dashboard';
import { Members } from './pages/Members';
import { Memberships } from './pages/Memberships';
import { Attendance } from './pages/Attendance';

// ProtectedRoute Component to prevent unauthenticated access
const ProtectedRoute = ({ children }) => {
  const { user, authInitializing } = useAuth();

  if (authInitializing) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#8DFF2F] border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(141,255,47,0.4)]" />
          <p className="text-xs font-mono text-gray-400">Authenticating FitSphere Session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

// AuthRedirectRoute to prevent logged-in users from viewing Login/Forgot Password pages
const AuthRedirectRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route
        path="/admin/login"
        element={
          <AuthRedirectRoute>
            <Login />
          </AuthRedirectRoute>
        }
      />
      <Route
        path="/admin/forgot-password"
        element={
          <AuthRedirectRoute>
            <ForgotPassword />
          </AuthRedirectRoute>
        }
      />
      <Route
        path="/admin/verify-otp"
        element={
          <AuthRedirectRoute>
            <VerifyOTP />
          </AuthRedirectRoute>
        }
      />
      <Route
        path="/admin/reset-password"
        element={
          <AuthRedirectRoute>
            <ResetPassword />
          </AuthRedirectRoute>
        }
      />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="members" element={<Members />} />
        <Route path="memberships" element={<Memberships />} />
        <Route path="attendance" element={<Attendance />} />
      </Route>

      {/* Global Fallbacks */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
