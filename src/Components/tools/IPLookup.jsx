import React, { useState } from 'react';
import { MapPin, Loader, Globe } from 'lucide-react';

export default function IPLookup() {
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const lookupIP = async (ipAddress = '') => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const targetIP = ipAddress || ip || '';
      const url = targetIP ? `https://ipapi.co/${targetIP}/json/` : 'https://ipapi.co/json/';
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to lookup IP');
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            IP Address (leave empty for your IP)
          </span>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="8.8.8.8"
            className="w-full h-14 px-4 text-lg rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors font-mono"
          />
        </label>

        <button
          onClick={() => lookupIP()}
          disabled={loading}
          className="w-full h-12 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Looking up...
            </>
          ) : (
            'Lookup IP Address'
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-red-900">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">IP Address</p>
              <p className="font-mono font-medium">{result.ip}</p>
            </div>
          </div>

          {result.city && (
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Location</p>
                <p className="font-medium">{result.city}, {result.region}, {result.country_name}</p>
              </div>
            </div>
          )}

          {result.org && (
            <div>
              <p className="text-xs text-slate-500">ISP / Organization</p>
              <p className="font-medium">{result.org}</p>
            </div>
          )}

          {result.timezone && (
            <div>
              <p className="text-xs text-slate-500">Timezone</p>
              <p className="font-medium">{result.timezone}</p>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-slate-100 pt-4 mt-6">
        <p className="text-xs text-slate-500 text-center">
          🔒 Privacy: IP lookups are performed via a third-party API. the Toolific Hub does not log or store your IP address or search queries.
        </p>
      </div>
    </div>
  );
}
