import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Mail, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { sendResetOTP, ADMIN_CONFIG } from '../services/otpService';
import { useAuth } from '../context/AuthContext';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const { showToast } = useAuth();
  const [email, setEmail] = useState(ADMIN_CONFIG.email);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !email.trim()) {
      setErrorMsg('Please enter your registered email address.');
      showToast('Email address is required', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setLoading(true);
    const res = await sendResetOTP(email);
    setLoading(false);

    if (res.success) {
      setSuccessMsg(res.message);
      showToast(res.message, 'success');
      setTimeout(() => {
        navigate('/admin/verify-otp');
      }, 1200);
    } else {
      setErrorMsg(res.message);
      showToast(res.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center p-4 relative overflow-hidden selection:bg-[#8DFF2F] selection:text-black">
      {/* Background Glowing Effects */}
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
            STEP 1 OF 3: FORGOT PASSWORD
          </p>
        </div>

        {/* Error Notification Alert */}
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

        {/* Success Notification Alert */}
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
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
              Registered Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="manavpadghan2622@gmail.com"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#8DFF2F] focus:ring-1 focus:ring-[#8DFF2F] transition-all"
              />
            </div>
            <p className="text-[11px] text-gray-400 mt-2">
              Registered Admin: <strong className="text-white">Manav</strong> ({ADMIN_CONFIG.email})
            </p>
          </div>

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
                <span>Send 6-Digit OTP Email</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <button
            type="button"
            onClick={() => navigate('/admin/login')}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Admin Login</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
