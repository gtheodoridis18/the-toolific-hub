import React, { useState } from 'react';
import { TrendingUp, Search } from 'lucide-react';

export default function SERPTracker() {
  const [keyword, setKeyword] = useState('');
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);

  const track = () => {
    if (!keyword || !url) return;
    setResult({
      position: Math.floor(Math.random() * 50) + 1,
      previousPosition: Math.floor(Math.random() * 50) + 1,
      searchVolume: Math.floor(Math.random() * 10000)
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-2">Target Keyword</span>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. online calculator"
            className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-2">Your URL</span>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
          />
        </label>

        <button
          onClick={track}
          disabled={!keyword || !url}
          className="w-full h-12 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          Check Ranking
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="text-center">
            <p className="text-sm text-slate-500 mb-2">Current Position</p>
            <p className="text-5xl font-light text-teal-600">#{result.position}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div>
              <p className="text-xs text-slate-500">Previous</p>
              <p className="text-xl font-medium">#{result.previousPosition}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Search Volume</p>
              <p className="text-xl font-medium">{result.searchVolume.toLocaleString()}/mo</p>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-slate-100 pt-4 mt-6">
        <p className="text-xs text-slate-500 text-center">
          🔒 Privacy: This tool provides simulated ranking data for demonstration purposes. the Toolific Hub does not track or store your keywords or URLs.
        </p>
      </div>
    </div>
  );
}
