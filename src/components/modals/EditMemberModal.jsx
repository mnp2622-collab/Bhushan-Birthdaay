import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { User, Phone, Mail, MapPin, Calendar, Save, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const EditMemberModal = ({ isOpen, onClose, member, onSave, plans = [] }) => {
  const { showToast } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    gender: 'Male',
    dob: '',
    mobile: '',
    email: '',
    address: '',
    emergency_contact: '',
    membership_name: 'Standard Plan',
    assigned_trainer: 'Unassigned',
    medical_notes: '',
    status: 'Active',
    avatar_url: ''
  });

  useEffect(() => {
    if (member) {
      setFormData({
        full_name: member.full_name || '',
        gender: member.gender || 'Male',
        dob: member.dob || '',
        mobile: member.mobile || '',
        email: member.email || '',
        address: member.address || '',
        emergency_contact: member.emergency_contact || '',
        membership_name: member.membership_name || 'Standard Plan',
        assigned_trainer: member.assigned_trainer || 'Unassigned',
        medical_notes: member.medical_notes || '',
        status: member.status || 'Active',
        avatar_url: member.avatar_url || ''
      });
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(member.id, formData);
      showToast(`Member ${formData.full_name} updated successfully!`, 'success');
      onClose();
    } catch (err) {
      showToast(err.message || 'Failed to update member', 'error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit Member Details (${member?.member_code || ''})`} maxWidth="max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
          <img
            src={formData.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
            alt={formData.full_name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-[#8DFF2F]/50"
          />
          <div className="flex-1 w-full">
            <h4 className="text-sm font-bold text-white mb-1">Avatar Image URL</h4>
            <input
              type="text"
              name="avatar_url"
              value={formData.avatar_url}
              onChange={handleChange}
              placeholder="Paste Image URL"
              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Membership Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
            >
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Membership Plan Tier</label>
            <select
              name="membership_name"
              value={formData.membership_name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
            >
              <option value="Basic Plan">Basic Plan ($49/mo)</option>
              <option value="Standard Plan">Standard Plan ($249/6mo)</option>
              <option value="Premium VIP">Premium VIP ($499/12mo)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Assigned Trainer</label>
            <select
              name="assigned_trainer"
              value={formData.assigned_trainer}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
            >
              <option value="Coach Brandon">Coach Brandon</option>
              <option value="Coach Sophia">Coach Sophia</option>
              <option value="Coach Alex">Coach Alex</option>
              <option value="Unassigned">Unassigned</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Medical & Health Notes</label>
          <textarea
            name="medical_notes"
            rows="2"
            value={formData.medical_notes}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#8DFF2F] text-black font-extrabold text-xs hover:bg-[#7CE822] shadow-[0_0_20px_rgba(141,255,47,0.3)] transition-all hover:scale-105"
          >
            <Save className="w-4 h-4" />
            <span>Update Changes</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
