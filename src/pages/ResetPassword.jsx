import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { isOTPVerified, updateAdminPassword, clearOTPSession, ADMIN_CONFIG } from '../services/otpService';
import { useAuth } from '../context/AuthContext';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { showToast } = useAuth();
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    // Require verified OTP session before granting access to Reset Password
    if (!isOTPVerified()) {
      showToast('Please verify OTP before resetting password', 'error');
      navigate('/admin/forgot-password');
    }
  }, [navigate, showToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!newPassword || !newPassword.trim()) {
      setErrorMsg('Please enter a new password.');
      showToast('New password is required', 'error');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    if (!confirmPassword || !confirmPassword.trim()) {
      setErrorMsg('Please confirm your new password.');
      showToast('Please confirm your password', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please ensure both fields match.');
      showToast('Passwords do not match', 'error');
      return;
    }

    setLoading(true);
    try {
      // Store hashed password securely (never plain text)
      await updateAdminPassword(newPassword);
      clearOTPSession();

      const successText = 'Password reset successfully. Please login with your new password.';
      setSuccessMsg(successText);
      showToast(successText, 'success');

      setTimeout(() => {
        // Redirect to Login page with state message
        navigate('/admin/login', {
          replace: true,
          state: { resetSuccessMsg: successText }
        });
      }, 1500);
    } catch (err) {
      setErrorMsg('Failed to update password. Please try again.');
      showToast('Failed to update password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center p-4 relative overflow-hidden selection:bg-[#8DFF2F] selection:text-black">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8DFF2F]/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md glass-card rounded-3xl p-8 sm:p-10 relative z-10 border border-white/10 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#8DFF2F] to-[#4ADE80] text-black shadow-[0_0_30px_rgba(141,255,47,0.4)] mb-4">
            <Zap className="w-9 h-9 stroke-[2.5]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center justify-center gap-1.5">
            FIT<span className="text-[#8DFF2F]">SPHERE</span>
          </h2>
          <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-widest">
            STEP 3 OF 3: SET NEW PASSWORD
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start space-x-2.5"
          >
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{errorMsg}</div>
          </motion.div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3.5 rounded-2xl bg-[#8DFF2F]/15 border border-[#8DFF2F]/30 text-xs text-[#8DFF2F] flex items-start space-x-2.5"
          >
            <CheckCircle2 className="w-4 h-4 text-[#8DFF2F] shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{successMsg}</div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <p className="text-xs text-gray-400 text-center">
            Create a strong new password for admin <strong className="text-white">{ADMIN_CONFIG.username}</strong> ({ADMIN_CONFIG.email})
          </p>

          {/* New Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Enter new password"
                className="w-full pl-11 pr-11 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#8DFF2F] focus:ring-1 focus:ring-[#8DFF2F] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Confirm new password"
                className="w-full pl-11 pr-11 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#8DFF2F] focus:ring-1 focus:ring-[#8DFF2F] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
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
                <span>Update Admin Password</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
