import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { QrCode, Clock, CheckCircle2, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const MarkAttendanceModal = ({ isOpen, onClose, members = [], onSave }) => {
  const { showToast } = useAuth();
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id || '');
  const [checkInTime, setCheckInTime] = useState('08:30 AM');
  const [checkOutTime, setCheckOutTime] = useState('In Progress');
  const [status, setStatus] = useState('Present');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMemberId) {
      showToast('Please select a gym member', 'error');
      return;
    }

    try {
      await onSave({
        member_id: selectedMemberId,
        date: new Date().toISOString().split('T')[0],
        check_in: checkInTime,
        check_out: checkOutTime,
        status: status
      });
      showToast('Attendance logged successfully!', 'success');
      onClose();
    } catch (err) {
      showToast(err.message || 'Failed to log attendance', 'error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mark Member Attendance" maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
            Select Member by Name or ID
          </label>
          <select
            value={selectedMemberId}
            onChange={(e) => setSelectedMemberId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#18181C] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
          >
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.full_name} ({m.member_code}) - {m.membership_name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Check-In Time</label>
            <input
              type="text"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Check-Out Status</label>
            <input
              type="text"
              value={checkOutTime}
              onChange={(e) => setCheckOutTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white focus:border-[#8DFF2F] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">Attendance Status</label>
          <div className="flex space-x-3">
            {['Present', 'Late', 'Absent'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatus(st)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                  status === st
                    ? 'bg-[#8DFF2F]/20 text-[#8DFF2F] border-[#8DFF2F]'
                    : 'bg-white/[0.03] text-gray-400 border-white/10'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
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
            <CheckCircle2 className="w-4 h-4" />
            <span>Submit Attendance</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
