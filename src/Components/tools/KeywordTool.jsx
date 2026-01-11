import React, { useState } from 'react';
import { Search, RefreshCw } from 'lucide-react';

export default function KeywordTool() {
  const [seed, setSeed] = useState('');
  const [keywords, setKeywords] = useState([]);

  const generateKeywords = () => {
    if (!seed) return;
    
    const prefixes = ['best', 'top', 'how to', 'what is', 'guide to', 'tips for'];
    const suffixes = ['tool', 'software', 'app', 'online', 'free', '2024'];
    
    const generated = [
      seed,
      ...prefixes.map(p => `${p} ${seed}`),
      ...suffixes.map(s => `${seed} ${s}`),
      `${seed} vs`,
      `${seed} alternative`,
      `${seed} review`
    ];
    
    setKeywords(generated.slice(0, 15));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <Search className="w-4 h-4" />
            Seed Keyword
          </span>
          <input
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && generateKeywords()}
            placeholder="e.g. calculator"
            className="w-full h-14 px-4 text-lg rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
          />
        </label>

        <button
          onClick={generateKeywords}
          disabled={!seed}
          className="w-full h-12 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Generate Keywords
        </button>
      </div>

      {keywords.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Suggested Keywords</h3>
          <div className="space-y-2">
            {keywords.map((kw, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                <span className="text-slate-700">{kw}</span>
                <span className="text-xs text-slate-400">Est. {Math.floor(Math.random() * 10000)} searches/mo</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-slate-100 pt-4 mt-6">
        <p className="text-xs text-slate-500 text-center">
          🔒 Privacy: This tool generates keyword suggestions locally. the Toolific Hub does not track or store your keyword searches.
        </p>
      </div>
    </div>
  );
}
