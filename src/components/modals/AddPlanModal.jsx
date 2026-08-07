import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { DollarSign, Clock, CheckCircle2, Sparkles, Plus, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AddPlanModal = ({ isOpen, onClose, onSave, planToEdit }) => {
  const { showToast } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    duration_months: 1,
    price: '',
    facilitiesText: '',
    description: ''
  });

  useEffect(() => {
    if (planToEdit) {
      setFormData({
        name: planToEdit.name || '',
        duration_months: planToEdit.duration_months || 1,
        price: planToEdit.price || '',
        facilitiesText: Array.isArray(planToEdit.facilities) ? planToEdit.facilities.join(', ') : '',
        description: planToEdit.description || ''
      });
    } else {
      setFormData({
        name: '',
        duration_months: 1,
        price: '',
        facilitiesText: 'Gym Access, Locker Room, Cardio Zone',
        description: ''
      });
    }
  }, [planToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      showToast('Plan Name and Price are required', 'error');
      return;
    }

    const facilitiesArray = formData.facilitiesText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload = {
      name: formData.name,
      duration_months: Number(formData.duration_months),
      price: Number(formData.price),
      facilities: facilitiesArray,
      description: formData.description
    };

    try {
      await onSave(payload, planToEdit?.id);
      showToast(`Membership plan ${formData.name} saved!`, 'success');
      onClose();
    } catch (err) {
      showToast(err.message || 'Failed to save plan', 'error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={planToEdit ? 'Edit Membership Plan' : 'Create New Membership Plan'} maxWidth="max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Plan Title Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Platinum Elite Tier"
            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Duration (Months) *</label>
            <select
              name="duration_months"
              value={formData.duration_months}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
            >
              <option value={1}>1 Month (Monthly)</option>
              <option value={3}>3 Months (Quarterly)</option>
              <option value={6}>6 Months (Half-Yearly)</option>
              <option value={12}>12 Months (Annual VIP)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Price ($ USD) *</label>
            <div className="relative">
              <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="49.99"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
            Included Facilities (Comma Separated)
          </label>
          <input
            type="text"
            name="facilitiesText"
            value={formData.facilitiesText}
            onChange={handleChange}
            placeholder="24/7 Access, Personal Trainer, Sauna, Lockers"
            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Plan Overview Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief summary of what this plan tier includes for gym members..."
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
            <Sparkles className="w-4 h-4" />
            <span>{planToEdit ? 'Update Plan' : 'Publish Plan'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
