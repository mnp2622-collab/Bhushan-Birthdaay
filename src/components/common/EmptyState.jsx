import React from 'react';
import { Layers } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Layers,
  title = 'No Data Found',
  description = 'There are no records to display at this moment.',
  actionText,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center glass-card rounded-2xl border border-white/5 my-4">
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[#8DFF2F] mb-4 shadow-[0_0_20px_rgba(141,255,47,0.15)]">
        <Icon className="w-10 h-10" />
      </div>
      <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
      <p className="text-sm text-gray-400 max-w-sm mb-6">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-xl bg-[#8DFF2F] text-black font-bold hover:bg-[#7CE822] shadow-[0_0_15px_rgba(141,255,47,0.3)] transition-all hover:scale-105"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
