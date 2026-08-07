import React from 'react';
import { Modal } from '../common/Modal';
import { AlertTriangle, Trash2 } from 'lucide-react';

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title = 'Confirm Deletion', message = 'Are you sure you want to delete this record? This action cannot be undone.' }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="space-y-5 text-center">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h4 className="text-base font-bold text-white">Permanently Remove Item</h4>
          <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">{message}</p>
        </div>

        <div className="flex items-center justify-center space-x-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all hover:scale-105"
          >
            <Trash2 className="w-4 h-4" />
            <span>Confirm Delete</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
