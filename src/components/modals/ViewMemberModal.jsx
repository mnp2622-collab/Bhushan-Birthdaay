import React from 'react';
import { Modal } from '../common/Modal';
import { Shield, Phone, Mail, MapPin, Calendar, Dumbbell, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export const ViewMemberModal = ({ isOpen, onClose, member, onRenewClick }) => {
  if (!member) return null;

  const isExpired = member.status === 'Expired';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Member Profile Details (${member.member_code})`} maxWidth="max-w-2xl">
      <div className="space-y-6">
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 p-6 rounded-2xl bg-gradient-to-r from-white/[0.05] to-transparent border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Dumbbell className="w-32 h-32 text-[#8DFF2F]" />
          </div>

          <img
            src={member.avatar_url}
            alt={member.full_name}
            className="w-24 h-24 rounded-2xl object-cover border-2 border-[#8DFF2F] shadow-[0_0_20px_rgba(141,255,47,0.3)] shrink-0"
          />

          <div className="flex-1 text-center sm:text-left z-10">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h3 className="text-2xl font-extrabold text-white">{member.full_name}</h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                  member.status === 'Active'
                    ? 'bg-[#8DFF2F]/15 text-[#8DFF2F] border-[#8DFF2F]/30'
                    : 'bg-red-500/15 text-red-400 border-red-500/30'
                }`}
              >
                {member.status}
              </span>
            </div>

            <p className="text-xs font-semibold text-gray-400 mb-3">{member.membership_name} Member</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-gray-300">
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#8DFF2F]" /> {member.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#8DFF2F]" /> {member.mobile}</span>
            </div>
          </div>
        </div>

        {/* Detailed Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Membership Validity</div>
            <div className="flex items-center justify-between text-xs text-white">
              <span>Join Date:</span>
              <span className="font-mono font-semibold">{member.joining_date}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-white">
              <span>Expiry Date:</span>
              <span className={`font-mono font-semibold ${isExpired ? 'text-red-400' : 'text-[#8DFF2F]'}`}>
                {member.expiry_date}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Coaching & Profile</div>
            <div className="flex items-center justify-between text-xs text-white">
              <span>Assigned Trainer:</span>
              <span className="font-semibold text-[#8DFF2F]">{member.assigned_trainer || 'Unassigned'}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-white">
              <span>Gender / DOB:</span>
              <span className="font-semibold">{member.gender} ({member.dob})</span>
            </div>
          </div>
        </div>

        {/* Emergency Contact & Address */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-gray-300">
            <Shield className="w-4 h-4 text-[#8DFF2F]" />
            <span>Emergency Contact</span>
          </div>
          <p className="text-xs text-white font-medium pl-6">{member.emergency_contact || 'None Provided'}</p>

          <div className="flex items-center space-x-2 text-xs font-bold text-gray-300 pt-2 border-t border-white/5">
            <MapPin className="w-4 h-4 text-[#8DFF2F]" />
            <span>Address</span>
          </div>
          <p className="text-xs text-gray-300 pl-6">{member.address || 'Not specified'}</p>
        </div>

        {/* Medical Notes Alert */}
        {member.medical_notes && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-amber-300 mb-0.5">Medical Notice / Notes:</span>
              {member.medical_notes}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
          {onRenewClick && (
            <button
              onClick={() => {
                onClose();
                onRenewClick(member);
              }}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#8DFF2F] text-black font-extrabold text-xs hover:bg-[#7CE822] shadow-[0_0_15px_rgba(141,255,47,0.3)] transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>Renew Subscription</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
          >
            Close Profile
          </button>
        </div>
      </div>
    </Modal>
  );
};
