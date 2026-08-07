import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { RefreshCw, Sparkles, Calendar, CreditCard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RenewMemberModal = ({ isOpen, onClose, member, onRenew }) => {
  const { showToast } = useAuth();
  const [months, setMonths] = useState(6);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!member) return null;

  const currentExpiry = new Date(member.expiry_date || new Date());
  const newExpiry = new Date(currentExpiry);
  newExpiry.setMonth(newExpiry.getMonth() + Number(months));

  const handleRenewSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onRenew(member.id, months);
      showToast(`Subscription for ${member.full_name} renewed by +${months} months!`, 'success');
      onClose();
    } catch (err) {
      showToast(err.message || 'Renewal failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Renew Membership - ${member.full_name}`} maxWidth="max-w-md">
      <form onSubmit={handleRenewSubmit} className="space-y-5">
        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
          <img
            src={member.avatar_url}
            alt={member.full_name}
            className="w-14 h-14 rounded-xl object-cover border border-[#8DFF2F]"
          />
          <div>
            <h4 className="text-sm font-bold text-white">{member.full_name}</h4>
            <p className="text-xs text-gray-400">{member.membership_name} ({member.member_code})</p>
            <span className="text-[10px] text-amber-400 font-semibold block mt-0.5">
              Current Expiry: {member.expiry_date}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
            Select Extension Duration
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[1, 6, 12].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMonths(m)}
                className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${
                  months === m
                    ? 'bg-[#8DFF2F]/20 text-[#8DFF2F] border-[#8DFF2F] shadow-[0_0_12px_rgba(141,255,47,0.2)]'
                    : 'bg-white/[0.03] text-gray-400 border-white/10 hover:border-white/20'
                }`}
              >
                +{m} {m === 1 ? 'Month' : 'Months'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 text-xs">
          <div className="flex justify-between text-gray-400">
            <span>Extension Term:</span>
            <span className="text-white font-semibold">+{months} Months</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>New Expiry Date:</span>
            <span className="text-[#8DFF2F] font-bold font-mono">{newExpiry.toISOString().split('T')[0]}</span>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#8DFF2F] text-black font-extrabold text-xs hover:bg-[#7CE822] shadow-[0_0_20px_rgba(141,255,47,0.3)] transition-all hover:scale-105"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Confirm Renewal</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
