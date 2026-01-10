import React, { useEffect, useRef } from 'react';

/**
 * Google AdSense Component
 * 
 * This component will replace AdPlaceholder when you're ready to switch to real ads.
 * 
 * Usage:
 * <AdSense adSlot="1234567890" adFormat="auto" />
 * 
 * Props:
 * - adSlot: Your Google AdSense ad slot ID (required)
 * - adFormat: 'auto', 'fluid', 'rectangle', etc. (default: 'auto')
 * - fullWidthResponsive: true/false (default: true)
 * - style: Custom inline styles
 * - className: Additional CSS classes
 */

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  style = {},
  className = ''
}) {
  const adRef = useRef(null);

  useEffect(() => {
    // Only push to adsbygoogle if the element exists and hasn't been loaded yet
    if (adRef.current && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  // If no ad slot provided, show development message
  if (!adSlot) {
    return (
      <div className={`${className} bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-center`}>
        <p className="text-yellow-800 text-sm font-semibold">
          ⚠️ AdSense component missing adSlot prop
        </p>
        <p className="text-yellow-600 text-xs mt-1">
          Add your Google AdSense ad slot ID to display ads
        </p>
      </div>
    );
  }

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          ...style
        }}
        data-ad-client="ca-pub-XXXXXXXXX" // REPLACE with your AdSense client ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}

// Example configurations for different ad types
export const AdSenseConfig = {
  // Top banner (970x90 or responsive)
  banner: {
    adFormat: 'auto',
    fullWidthResponsive: true,
    style: { display: 'block' }
  },
  
  // Sidebar ads (300x600 or 300x250)
  sidebar: {
    adFormat: 'auto',
    fullWidthResponsive: false,
    style: { display: 'block', minHeight: '600px' }
  },
  
  // Square ads (300x250)
  square: {
    adFormat: 'rectangle',
    fullWidthResponsive: false,
    style: { display: 'inline-block', width: '300px', height: '250px' }
  },
  
  // Horizontal between content (728x90)
  horizontal: {
    adFormat: 'horizontal',
    fullWidthResponsive: true,
    style: { display: 'block' }
  }
};

/* 
IMPLEMENTATION STEPS:

1. Add AdSense script to index.html <head>:
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXX"
        crossorigin="anonymous"></script>

2. Replace "ca-pub-XXXXXXXXX" above with your AdSense publisher ID

3. Get ad slot IDs from Google AdSense dashboard for each ad unit

4. Replace AdPlaceholder components with AdSense components:
   
   Before:
   <AdPlaceholder variant="banner" />
   
   After:
   <AdSense 
     adSlot="1234567890" 
     {...AdSenseConfig.banner}
   />

5. Test thoroughly before deploying to production

EXAMPLE REPLACEMENTS:

// Top Banner
<AdSense 
  adSlot="1234567890"
  {...AdSenseConfig.banner}
/>

// Left Sidebar
<AdSense 
  adSlot="0987654321"
  {...AdSenseConfig.sidebar}
/>

// Horizontal Between Tools
<AdSense 
  adSlot="1122334455"
  {...AdSenseConfig.horizontal}
/>
*/
