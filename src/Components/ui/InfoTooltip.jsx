import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

export default function InfoTooltip({ content }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="p-1 text-slate-400 hover:text-teal-600 transition-colors rounded-full hover:bg-slate-100"
        aria-label="More information"
      >
        <HelpCircle className="w-4 h-4" />
      </button>
      
      {show && (
        <div className="absolute z-50 w-72 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-xl -top-2 left-6 transform">
          <div className="absolute -left-1 top-3 w-2 h-2 bg-slate-900 transform rotate-45"></div>
          {content}
        </div>
      )}
    </div>
  );
}
