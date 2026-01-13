import React from 'react';

export default function AdPlaceholder({ variant = 'horizontal', className = '' }) {
  // Ad unit configurations matching standard Google AdSense sizes
  const variants = {
    // Horizontal ads between tools
    horizontal: {
      className: 'h-20 sm:h-24 md:h-28 w-full',
      label: '728x90 Leaderboard',
      description: 'Horizontal banner ad'
    },
    
    // Top banner ad
    banner: {
      className: 'h-24 sm:h-28 md:h-32 w-full',
      label: '970x90 Large Leaderboard',
      description: 'Top banner ad'
    },
    
    // Sidebar ads (left and right)
    sidebar: {
      className: 'w-full h-[600px]',
      label: '300x600 Half Page',
      description: 'Vertical sidebar ad'
    },
    
    // Square ad for mobile
    square: {
      className: 'w-full h-[250px]',
      label: '300x250 Medium Rectangle',
      description: 'Square ad unit'
    },
    
    // Skyscraper for larger screens
    skyscraper: {
      className: 'w-full h-[600px]',
      label: '160x600 Wide Skyscraper',
      description: 'Tall sidebar ad'
    }
  };

  const config = variants[variant] || variants.horizontal;

  return (
    <div
      className={`${config.className} ${className} bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 hover:border-slate-300`}
      aria-label="Advertisement"
      data-ad-variant={variant}
    >
      {/* Placeholder content - will be replaced with real ads */}
      <div className="text-center pointer-events-none select-none px-4">
        <div className="mb-2">
          <svg 
            className="w-8 h-8 mx-auto text-slate-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" 
            />
          </svg>
        </div>
        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
          Advertisement
        </p>
        <p className="text-[10px] text-slate-300 mt-1">
          {config.label}
        </p>
        <p className="text-[9px] text-slate-200 mt-0.5">
          Google AdSense Slot
        </p>
      </div>

      {/* Corner indicator for development */}
      <div className="absolute top-2 right-2 bg-slate-200 text-slate-400 text-[8px] px-1.5 py-0.5 rounded">
        {variant.toUpperCase()}
      </div>
    </div>
  );
}
