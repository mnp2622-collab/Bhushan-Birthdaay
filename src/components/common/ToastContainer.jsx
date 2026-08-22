import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useAuth();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-[#8DFF2F]" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Info className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getBorder = (type) => {
    switch (type) {
      case 'success':
        return 'border-[#8DFF2F]/40 shadow-[0_0_20px_rgba(141,255,47,0.2)]';
      case 'error':
        return 'border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.2)]';
      default:
        return 'border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none max-w-md w-full px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-2xl bg-[#141418]/90 backdrop-blur-xl border ${getBorder(toast.type)} text-white`}
          >
            <div className="flex items-center space-x-3">
              <div className="p-1 rounded-lg bg-black/40">
                {getIcon(toast.type)}
              </div>
              <p className="text-sm font-medium leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
