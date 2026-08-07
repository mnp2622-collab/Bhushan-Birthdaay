import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({ title, value, change, isPositive = true, icon: Icon, sparkline = [35, 42, 38, 55, 62, 70, 85], subtext = 'vs last month' }) => {
  // Generate mini SVG path for sparkline
  const max = Math.max(...sparkline, 1);
  const min = Math.min(...sparkline, 0);
  const points = sparkline.map((val, idx) => {
    const x = (idx / (sparkline.length - 1)) * 120;
    const y = 35 - ((val - min) / (max - min || 1)) * 28;
    return `${x},${y}`;
  }).join(' ');

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
    >
      {/* Soft Background Radial Gradient */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#8DFF2F]/10 rounded-full blur-2xl group-hover:bg-[#8DFF2F]/20 transition-all duration-500 pointer-events-none" />

      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{title}</span>
          <h3 className="text-3xl font-extrabold tracking-tight text-white mt-2 group-hover:text-[#8DFF2F] transition-colors">
            {value}
          </h3>
        </div>

        <div className="p-3 rounded-xl bg-surface border border-surface-border text-[#8DFF2F] group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(141,255,47,0.3)] transition-all">
          {Icon && <Icon className="w-6 h-6" />}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
              isPositive
                ? 'bg-[#8DFF2F]/15 text-[#8DFF2F] border border-[#8DFF2F]/30'
                : 'bg-red-500/15 text-red-400 border border-red-500/30'
            }`}
          >
            {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {change}
          </span>
          <span className="text-xs text-gray-400">{subtext}</span>
        </div>

        {/* Mini SVG Sparkline */}
        <div className="w-24 h-9">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 120 35">
            <polyline
              fill="none"
              stroke={isPositive ? '#8DFF2F' : '#F87171'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
