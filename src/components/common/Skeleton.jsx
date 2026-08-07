import React from 'react';

export const Skeleton = ({ className = 'h-6 w-full' }) => {
  return (
    <div className={`animate-pulse rounded-xl bg-white/5 border border-white/5 ${className}`} />
  );
};
