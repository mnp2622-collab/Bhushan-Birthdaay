import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2, Clock, RefreshCw } from 'lucide-react';
import { verifyResetOTP, sendResetOTP, ADMIN_CONFIG } from '../services/otpService';
import { useAuth } from '../context/AuthContext';

export const VerifyOTP = () => {
  const navigate = useNavigate();
  const { showToast } = useAuth();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 5-Minute Timer & Resend Timer State
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [resendCooldown, setResendCooldown] = useState(60);

  useEffect(() => {
    // Check if an OTP session exists
    const sessionRaw = localStorage.getItem('fitsphere_otp_session');
    if (!sessionRaw) {
      navigate('/admin/forgot-password');
      return;
    }

    const session = JSON.parse(sessionRaw);
    const elapsedSeconds = Math.floor((Date.now() - session.createdAt) / 1000);
    const totalExpirySeconds = ADMIN_CONFIG.otpExpiryMinutes * 60;
    const remaining = Math.max(0, totalExpirySeconds - elapsedSeconds);
    setSecondsLeft(remaining);

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setErrorMsg('OTP expired. Please request a new OTP.');
          showToast('OTP expired. Please request a new OTP.', 'error');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const resendTimer = setInterval(() => {
      setResendCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(resendTimer);
    };
  }, [navigate]);

  const formatTimer = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!otp || otp.trim().length !== 6) {
      setErrorMsg('Please enter a valid 6-digit OTP code.');
      showToast('Please enter a 6-digit OTP', 'error');
      return;
    }

    setLoading(true);
    const res = verifyResetOTP(otp);
    setLoading(false);

    if (res.success) {
      setSuccessMsg('OTP verified successfully!');
      showToast('OTP verified successfully!', 'success');
      setTimeout(() => {
        navigate('/admin/reset-password');
      }, 1000);
    } else {
      setErrorMsg(res.message);
      showToast(res.message, 'error');
    }
  };

  const handleResendOTP = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    const res = await sendResetOTP(ADMIN_CONFIG.email);

    if (res.success) {
      setSuccessMsg('OTP sent successfully to your registered email.');
      showToast('OTP sent successfully to your registered email.', 'success');
      setSecondsLeft(300);
      setResendCooldown(60);
    } else {
      setErrorMsg(res.message);
      showToast(res.message, 'error');
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
            STEP 2 OF 3: ENTER 6-DIGIT OTP
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

        <form onSubmit={handleVerify} className="space-y-6">
          <p className="text-xs text-gray-400 text-center">
            A 6-digit OTP code has been sent to <strong className="text-white">{ADMIN_CONFIG.email}</strong>
          </p>

          {/* OTP Input Box */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2 text-center">
              Enter 6-Digit OTP Code
            </label>
            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setOtp(val);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="••••••"
              className="w-full text-center tracking-[12px] font-mono text-2xl py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#8DFF2F] focus:ring-1 focus:ring-[#8DFF2F] transition-all"
            />
          </div>

          {/* Expiry Timer Badge */}
          <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#8DFF2F]" /> OTP Expiry:
            </span>
            <span className={`font-bold ${secondsLeft < 60 ? 'text-red-400 animate-pulse' : 'text-[#8DFF2F]'}`}>
              {formatTimer(secondsLeft)}
            </span>
          </div>

          {/* Action Buttons: Verify OTP & Resend OTP */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || secondsLeft === 0 || otp.length !== 6}
              className="w-full py-3.5 rounded-2xl bg-[#8DFF2F] text-black font-extrabold text-sm tracking-wide hover:bg-[#7CE822] shadow-[0_0_25px_rgba(141,255,47,0.35)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Verify OTP</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </motion.button>

            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resendCooldown > 0}
              className="w-full py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center space-x-2 disabled:opacity-40"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#8DFF2F]" />
              <span>
                {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP Email'}
              </span>
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <button
            type="button"
            onClick={() => navigate('/admin/forgot-password')}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Change Admin Email</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
