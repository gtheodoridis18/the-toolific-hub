import React, { useState, useEffect } from 'react';

const TRACKING_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'ref',
  'fbclid',
  'gclid',
  'mc_cid',
  'mc_eid',
];

export default function URLCleaner() {
  const [inputUrl, setInputUrl] = useState('');
  const [cleanUrl, setCleanUrl] = useState('');

  useEffect(() => {
    try {
      if (!inputUrl) {
        setCleanUrl('');
        return;
      }

      const url = new URL(inputUrl);
      const params = new URLSearchParams(url.search);

      TRACKING_PARAMS.forEach((param) => {
        params.delete(param);
      });

      url.search = params.toString();
      setCleanUrl(url.toString());
    } catch {
      setCleanUrl('');
    }
  }, [inputUrl]);

  return (
    <div className="max-w-2xl mx-auto space-y-4">

      {/* Input */}
      <div className="bg-slate-50 rounded-2xl p-4">
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Paste URL here..."
          className="w-full h-12 rounded-xl border border-slate-200 px-3 text-base"
        />
      </div>

      {/* Output */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
          Clean URL
        </p>
        <div className="break-all text-slate-800 text-sm">
          {cleanUrl || '—'}
        </div>
      </div>

    </div>
  );
}
