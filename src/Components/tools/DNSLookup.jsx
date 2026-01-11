import React, { useState } from 'react';
import { Globe, Loader } from 'lucide-react';

export default function DNSLookup() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const lookup = async () => {
    if (!domain) return;
    setLoading(true);
    setResult(null);
    
    try {
      const cleanDomain = domain.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
      const response = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(cleanDomain)}&type=A`);
      
      if (!response.ok) {
        throw new Error('DNS lookup failed');
      }
      
      const data = await response.json();
      
      if (data.Status === 0 && data.Answer) {
        setResult(data);
      } else if (data.Status === 3) {
        setResult({ error: 'Domain not found (NXDOMAIN)' });
      } else {
        setResult({ error: 'No DNS records found for this domain' });
      }
    } catch (err) {
      setResult({ error: 'Failed to lookup domain. Please check the domain name and try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Domain Name
          </span>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && lookup()}
            placeholder="example.com"
            className="w-full h-14 px-4 text-lg rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
          />
        </label>

        <button
          onClick={lookup}
          disabled={loading || !domain}
          className="w-full h-12 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Looking up...
            </>
          ) : (
            'Lookup DNS Records'
          )}
        </button>
      </div>

      {result && !result.error && result.Answer && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
          <h3 className="font-semibold text-slate-900">DNS Records for {domain}</h3>
          {result.Answer.map((record, idx) => (
            <div key={idx} className="border-b border-slate-100 pb-2 last:border-0">
              <p className="text-xs text-slate-500">A Record</p>
              <p className="font-mono font-medium">{record.data}</p>
            </div>
          ))}
        </div>
      )}

      {result?.error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-red-900">
          {result.error}
        </div>
      )}

      <div className="border-t border-slate-100 pt-4 mt-6">
        <p className="text-xs text-slate-500 text-center">
          🔒 Privacy: DNS queries are processed through a public DNS service. the Toolific Hub does not log domain lookups or store query history.
        </p>
      </div>
    </div>
  );
}
