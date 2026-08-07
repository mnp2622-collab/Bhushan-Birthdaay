import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { User, Phone, Mail, MapPin, Calendar, AlertCircle, Sparkles, Upload, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AddMemberModal = ({ isOpen, onClose, onSave, plans = [] }) => {
  const { showToast } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    gender: 'Male',
    dob: '1998-05-12',
    mobile: '',
    email: '',
    address: '',
    emergency_contact: '',
    membership_plan_id: plans[0]?.id || 'plan-2',
    assigned_trainer: 'Coach Brandon',
    joining_date: new Date().toISOString().split('T')[0],
    medical_notes: '',
    avatar_url: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.full_name.trim()) errs.full_name = 'Full Name is required';
    if (!formData.mobile.trim()) errs.mobile = 'Mobile number is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid Email is required';
    if (!formData.emergency_contact.trim()) errs.emergency_contact = 'Emergency Contact is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const selectedPlan = plans.find(p => p.id === formData.membership_plan_id) || plans[0];
      const durationMonths = selectedPlan?.duration_months || 1;
      
      const expiryDate = new Date(formData.joining_date || new Date());
      expiryDate.setMonth(expiryDate.getMonth() + durationMonths);

      const memberToSave = {
        ...formData,
        membership_name: selectedPlan?.name || 'Standard Plan',
        expiry_date: expiryDate.toISOString().split('T')[0],
        avatar_url: formData.avatar_url || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250`
      };

      await onSave(memberToSave);
      showToast(`Member ${formData.full_name} added successfully!`, 'success');
      onClose();
    } catch (err) {
      showToast(err.message || 'Failed to add member', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register New Gym Member" maxWidth="max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Photo Uploader Preview */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
          <img
            src={formData.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
            alt="Profile Preview"
            className="w-20 h-20 rounded-2xl object-cover border-2 border-[#8DFF2F]/50 shadow-[0_0_15px_rgba(141,255,47,0.2)]"
          />
          <div className="flex-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-white mb-1">Profile Photograph</h4>
            <p className="text-xs text-gray-400 mb-3">Provide a high quality member photo URL or use default avatar</p>
            <input
              type="text"
              name="avatar_url"
              value={formData.avatar_url}
              onChange={handleChange}
              placeholder="Paste Image URL (Unsplash, Imgur, etc.)"
              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-gray-500 focus:border-[#8DFF2F] focus:outline-none"
            />
          </div>
        </div>

        {/* 2-Column Grid Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Full Name <span className="text-[#8DFF2F]">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="e.g. Marcus Vance"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.05] border ${errors.full_name ? 'border-red-500' : 'border-white/10'} text-xs text-white focus:border-[#8DFF2F] focus:outline-none`}
              />
            </div>
            {errors.full_name && <p className="text-[11px] text-red-400 mt-1">{errors.full_name}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* DOB */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Date of Birth
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Mobile Phone <span className="text-[#8DFF2F]">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.05] border ${errors.mobile ? 'border-red-500' : 'border-white/10'} text-xs text-white focus:border-[#8DFF2F] focus:outline-none`}
              />
            </div>
            {errors.mobile && <p className="text-[11px] text-red-400 mt-1">{errors.mobile}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Email Address <span className="text-[#8DFF2F]">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="member@domain.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.05] border ${errors.email ? 'border-red-500' : 'border-white/10'} text-xs text-white focus:border-[#8DFF2F] focus:outline-none`}
              />
            </div>
            {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
          </div>

          {/* Emergency Contact */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Emergency Contact <span className="text-[#8DFF2F]">*</span>
            </label>
            <div className="relative">
              <Shield className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="emergency_contact"
                value={formData.emergency_contact}
                onChange={handleChange}
                placeholder="Contact Name & Number"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.05] border ${errors.emergency_contact ? 'border-red-500' : 'border-white/10'} text-xs text-white focus:border-[#8DFF2F] focus:outline-none`}
              />
            </div>
            {errors.emergency_contact && <p className="text-[11px] text-red-400 mt-1">{errors.emergency_contact}</p>}
          </div>

          {/* Membership Plan */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Membership Plan Tiers
            </label>
            <select
              name="membership_plan_id"
              value={formData.membership_plan_id}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
            >
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (${p.price} / {p.duration_months} Mo)
                </option>
              ))}
            </select>
          </div>

          {/* Assigned Trainer */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Assigned Trainer
            </label>
            <select
              name="assigned_trainer"
              value={formData.assigned_trainer}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
            >
              <option value="Coach Brandon">Coach Brandon (Strength Master)</option>
              <option value="Coach Sophia">Coach Sophia (HIIT & Cardio)</option>
              <option value="Coach Alex">Coach Alex (Bodybuilding Specialist)</option>
              <option value="Unassigned">Unassigned (Self Guided)</option>
            </select>
          </div>

          {/* Joining Date */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Joining Date
            </label>
            <input
              type="date"
              name="joining_date"
              value={formData.joining_date}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Residential Address
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street, City, State"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Medical Notes */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
            Medical & Health Notes
          </label>
          <textarea
            name="medical_notes"
            rows="2"
            value={formData.medical_notes}
            onChange={handleChange}
            placeholder="List any injury history, allergies, asthma or medical considerations..."
            className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
          />
        </div>

        {/* Modal Action Buttons */}
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
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#8DFF2F] text-black font-extrabold text-xs hover:bg-[#7CE822] shadow-[0_0_20px_rgba(141,255,47,0.3)] transition-all hover:scale-105 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSubmitting ? 'Saving Member...' : 'Register Member'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
