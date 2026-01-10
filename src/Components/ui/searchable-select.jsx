import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';

function DropdownPortal({ children, triggerRect, isOpen }) {
  if (!isOpen || !triggerRect) return null;

  const style = {
    position: 'fixed',
    top: `${triggerRect.bottom + 8}px`,
    left: `${triggerRect.left}px`,
    width: `${triggerRect.width}px`,
    zIndex: 9999,
  };

  // Check if dropdown would go off bottom of screen
  const maxHeight = window.innerHeight - triggerRect.bottom - 16;
  if (maxHeight < 200 && triggerRect.top > 300) {
    // Flip to top
    style.top = 'auto';
    style.bottom = `${window.innerHeight - triggerRect.top + 8}px`;
  }

  return createPortal(
    <div style={style}>
      {children}
    </div>,
    document.body
  );
}

export default function SearchableSelect({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  highlightDetected = false,
  variant = 'default',
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [triggerRect, setTriggerRect] = useState(null);
  const buttonRef = useRef(null);

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        // Check if click is inside the portal dropdown
        const portal = document.getElementById('dropdown-portal-content');
        if (!portal || !portal.contains(e.target)) {
          setOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Update position on open
  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setTriggerRect(rect);
    }
  }, [open]);

  // Update position on scroll/resize
  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setTriggerRect(rect);
      }
    };

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open]);

  const selectedLabel =
    options.find(o => o.value === value)?.label || placeholder;

  const borderClass = variant === 'teal' ? 'border-teal-200' : 'border-slate-200';
  const chevronClass = variant === 'teal' ? 'text-teal-600' : 'text-slate-400';

  return (
    <>
      <div className="relative w-full">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen(v => !v)}
          className={`w-full h-14 rounded-xl border ${borderClass} px-4 pr-12 bg-white text-left truncate focus:border-teal-500 focus:outline-none transition-colors relative`}
        >
          <span className={highlightDetected ? 'font-medium' : ''}>
            {selectedLabel}
          </span>
        </button>
        <ChevronDown 
          className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 ${chevronClass} transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </div>

      <DropdownPortal triggerRect={triggerRect} isOpen={open}>
        <div 
          id="dropdown-portal-content"
          className="bg-white rounded-xl border border-slate-200 shadow-xl max-h-[70vh] overflow-hidden"
        >
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-3 border-b border-slate-200 outline-none text-sm focus:bg-slate-50"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
            {filtered.map(opt => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                  setQuery('');
                }}
                className="w-full px-4 py-2.5 text-left hover:bg-slate-50 text-sm transition-colors"
              >
                {opt.label}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="px-4 py-6 text-sm text-slate-400 text-center">
                No results found
              </div>
            )}
          </div>
        </div>
      </DropdownPortal>
    </>
  );
}
