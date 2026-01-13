import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

export default function InfoTooltip({ content }) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isPositioned, setIsPositioned] = useState(false);
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);

  // Close tooltip on ANY scroll
  useEffect(() => {
    const handleScroll = () => {
      setShow(false);
      setIsPositioned(false);
    };

    if (show) {
      window.addEventListener('scroll', handleScroll, true);
      return () => window.removeEventListener('scroll', handleScroll, true);
    }
  }, [show]);

  // Calculate position when tooltip shows
  useEffect(() => {
    if (!show || !buttonRef.current) {
      setIsPositioned(false);
      return;
    }

    const calculatePosition = () => {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const isMobile = window.innerWidth < 640;
      
      if (isMobile) {
        // Mobile: Find the parent tool card and position tooltip below it
        let toolCard = buttonRef.current;
        
        while (toolCard && !toolCard.classList.contains('rounded-2xl')) {
          toolCard = toolCard.parentElement;
        }
        
        if (toolCard) {
          const cardRect = toolCard.getBoundingClientRect();
          setPosition({
            top: cardRect.bottom + 8,
            left: Math.max(16, Math.min(cardRect.left, window.innerWidth - (window.innerWidth - 32) - 16))
          });
        } else {
          setPosition({
            top: buttonRect.bottom + 8,
            left: 16
          });
        }
      } else {
        // Desktop: Position to the right of the button
        const tooltipWidth = 320;
        const padding = 16;
        
        let top = buttonRect.top;
        let left = buttonRect.right + 8;
        
        if (left + tooltipWidth > window.innerWidth - padding) {
          left = buttonRect.left - tooltipWidth - 8;
        }
        
        if (left < padding) {
          left = Math.max(padding, (window.innerWidth - tooltipWidth) / 2);
        }
        
        const tooltipHeight = tooltipRef.current?.offsetHeight || 100;
        if (top + tooltipHeight > window.innerHeight - padding) {
          top = Math.max(padding, window.innerHeight - tooltipHeight - padding);
        }
        
        if (top < padding) {
          top = padding;
        }
        
        setPosition({ top, left });
      }
      
      // Mark as positioned to make visible
      setIsPositioned(true);
    };

    // Small delay to ensure DOM is ready
    requestAnimationFrame(() => {
      calculatePosition();
    });
    
    const handleResize = () => {
      if (show) calculatePosition();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [show]);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShow(!show);
  };

  // Close when clicking outside
  useEffect(() => {
    if (!show) return;

    const handleClickOutside = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target) && 
          buttonRef.current && !buttonRef.current.contains(e.target)) {
        setShow(false);
        setIsPositioned(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('touchstart', handleClickOutside, true);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
    };
  }, [show]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onMouseEnter={() => window.innerWidth >= 640 && setShow(true)}
        onMouseLeave={() => window.innerWidth >= 640 && setShow(false)}
        onClick={handleToggle}
        className="p-1 text-slate-400 hover:text-teal-600 transition-colors rounded-full hover:bg-slate-100 touch-manipulation flex-shrink-0"
        aria-label="More information"
        aria-expanded={show}
      >
        <HelpCircle className="w-4 h-4" />
      </button>
      
      {show && (
        <div 
          ref={tooltipRef}
          className={`fixed z-[9999] w-[calc(100vw-2rem)] sm:w-80 max-h-[70vh] overflow-y-auto p-3 bg-slate-900 text-white text-xs leading-relaxed rounded-lg shadow-2xl transition-opacity duration-150 ${
            isPositioned ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
          onMouseEnter={() => window.innerWidth >= 640 && setShow(true)}
          onMouseLeave={() => window.innerWidth >= 640 && setShow(false)}
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
      )}
    </>
  );
}
