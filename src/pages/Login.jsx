import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ADMIN_CONFIG } from '../services/otpService';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, showToast } = useAuth();
  
  // Admin Credentials
  const [email, setEmail] = useState(ADMIN_CONFIG.email);
  const [password, setPassword] = useState('Admin@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [resetSuccessBanner, setResetSuccessBanner] = useState('');

  useEffect(() => {
    // Check if redirected from successful password reset
    if (location.state?.resetSuccessMsg) {
      setResetSuccessBanner(location.state.resetSuccessMsg);
      showToast(location.state.resetSuccessMsg, 'success');
    }
  }, [location, showToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Form Validations
    if (!email || !email.trim()) {
      setError('Email address is required');
      showToast('Email address is required', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      showToast('Please enter a valid email address', 'error');
      return;
    }

    if (!password || !password.trim()) {
      setError('Password is required');
      showToast('Password is required', 'error');
      return;
    }

    // Call Authentication
    const res = await login(email, password, rememberMe);
    if (res.success) {
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError(res.error || 'Invalid credentials');
    }
  };

  const handleFillDemo = () => {
    setEmail(ADMIN_CONFIG.email);
    setPassword('Admin@123');
    setError('');
    showToast(`Default admin credentials filled for ${ADMIN_CONFIG.username}!`, 'info');
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center p-4 relative overflow-hidden selection:bg-[#8DFF2F] selection:text-black">
      {/* Background Glowing Effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8DFF2F]/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md glass-card rounded-3xl p-8 sm:p-10 relative z-10 border border-white/10 shadow-2xl"
      >
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#8DFF2F] to-[#4ADE80] text-black shadow-[0_0_30px_rgba(141,255,47,0.4)] mb-4">
            <Zap className="w-9 h-9 stroke-[2.5]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center justify-center gap-1.5">
            FIT<span className="text-[#8DFF2F]">SPHERE</span>
          </h2>
          <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-widest">
            ADMINISTRATOR AUTHENTICATION
          </p>
        </div>

        {/* Password Reset Success Banner */}
        {resetSuccessBanner && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3.5 rounded-2xl bg-[#8DFF2F]/15 border border-[#8DFF2F]/30 text-xs text-[#8DFF2F] flex items-start space-x-2.5"
          >
            <CheckCircle2 className="w-4 h-4 text-[#8DFF2F] shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{resetSuccessBanner}</div>
          </motion.div>
        )}

        {/* Validation Error Alert Box */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start space-x-2.5"
          >
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{error}</div>
          </motion.div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="manavpadghan2622@gmail.com"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#8DFF2F] focus:ring-1 focus:ring-[#8DFF2F] transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => navigate('/admin/forgot-password')}
                className="text-[11px] font-semibold text-[#8DFF2F] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <div className="relative">
              <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#8DFF2F] focus:ring-1 focus:ring-[#8DFF2F] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#8DFF2F] focus:ring-0 focus:ring-offset-0 accent-[#8DFF2F]"
              />
              <span className="text-xs text-gray-300">Remember session</span>
            </label>

            <span className="text-[10px] font-mono text-gray-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8DFF2F]" /> Admin {ADMIN_CONFIG.username}
            </span>
          </div>

          {/* Login Button with Spinner */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-[#8DFF2F] text-black font-extrabold text-sm tracking-wide hover:bg-[#7CE822] shadow-[0_0_25px_rgba(141,255,47,0.35)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Admin Panel</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </motion.button>
        </form>

        {/* Demo Fill Button */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-gray-400 mb-3">Registered Admin Credentials ({ADMIN_CONFIG.username}):</p>
          <button
            type="button"
            onClick={handleFillDemo}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-semibold text-[#8DFF2F] hover:bg-white/10 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fill Admin Email ({ADMIN_CONFIG.email})</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
