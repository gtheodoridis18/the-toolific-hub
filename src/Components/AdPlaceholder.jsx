import React from 'react';

export default function AdPlaceholder({ variant = 'horizontal' }) {
  const variants = {
    horizontal: 'h-24 md:h-20',
    banner: 'h-28',
    sidebar: 'h-64 w-full max-w-xs mx-auto',
  };

  return (
    <div
      className={`${variants[variant]} bg-gradient-to-r from-slate-100 to-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center relative`}
      aria-label="Advertisement"
    >
      <div className="text-center pointer-events-none select-none">
        <p className="text-xs text-slate-400 uppercase tracking-wider">
          Advertisement
        </p>
        <p className="text-[10px] text-slate-300 mt-1">
          Ad slot — Google AdSense
        </p>
      </div>
    </div>
  );
}
