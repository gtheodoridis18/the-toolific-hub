import React, { useState } from 'react';
import { Link, Search } from 'lucide-react';

export default function BacklinkChecker() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);

  const check = () => {
    if (!url) return;
    // Simulated backlink data
    setResult({
      totalBacklinks: Math.floor(Math.random() * 10000),
      domains: Math.floor(Math.random() * 1000),
      doFollow: Math.floor(Math.random() * 5000),
      noFollow: Math.floor(Math.random() * 5000)
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <Link className="w-4 h-4" />
            Website URL
          </span>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full h-14 px-4 text-lg rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
          />
        </label>

        <button
          onClick={check}
          disabled={!url}
          className="w-full h-12 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          Check Backlinks
        </button>
      </div>

      {result && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500 mb-1">Total Backlinks</p>
            <p className="text-2xl font-light text-slate-900">{result.totalBacklinks.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500 mb-1">Referring Domains</p>
            <p className="text-2xl font-light text-slate-900">{result.domains.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500 mb-1">Do-Follow</p>
            <p className="text-2xl font-light text-green-600">{result.doFollow.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500 mb-1">No-Follow</p>
            <p className="text-2xl font-light text-amber-600">{result.noFollow.toLocaleString()}</p>
          </div>
        </div>
      )}

      <div className="border-t border-slate-100 pt-4 mt-6">
        <p className="text-xs text-slate-500 text-center">
          🔒 Privacy: This tool provides simulated backlink data for demonstration purposes. the Toolific Hub does not store URLs or perform actual backlink analysis.
        </p>
      </div>
    </div>
  );
}
