import React, { useState } from 'react';
import { Search, Loader, CreditCard, Building, MapPin, Globe } from 'lucide-react';

export default function BINChecker() {
  const [bin, setBin] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const checkBIN = async () => {
    if (!bin || bin.length < 6) {
      setError('Please enter at least 6 digits');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`https://lookup.binlist.net/${bin.slice(0, 8)}`);
      
      if (!response.ok) {
        throw new Error('BIN not found');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to lookup BIN');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            BIN / IIN Number
          </span>
          <input
            type="text"
            value={bin}
            onChange={(e) => setBin(e.target.value.replace(/\D/g, '').slice(0, 8))}
            placeholder="Enter first 6-8 digits"
            className="w-full h-14 px-4 text-lg rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors font-mono"
            maxLength="8"
          />
          <p className="text-xs text-slate-500 mt-2">
            Enter the first 6-8 digits of a card number
          </p>
        </label>

        <button
          onClick={checkBIN}
          disabled={loading || bin.length < 6}
          className="w-full h-12 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Check BIN
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-red-900">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Card Information</h3>
          
          <div className="space-y-3">
            {result.scheme && (
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Card Brand</p>
                  <p className="font-medium text-slate-900">{result.scheme.toUpperCase()}</p>
                </div>
              </div>
            )}

            {result.type && (
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Card Type</p>
                  <p className="font-medium text-slate-900">{result.type.toUpperCase()}</p>
                </div>
              </div>
            )}

            {result.bank?.name && (
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Bank</p>
                  <p className="font-medium text-slate-900">{result.bank.name}</p>
                  {result.bank.phone && (
                    <p className="text-sm text-slate-600">{result.bank.phone}</p>
                  )}
                </div>
              </div>
            )}

            {result.country && (
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Country</p>
                  <p className="font-medium text-slate-900">
                    {result.country.emoji} {result.country.name}
                  </p>
                </div>
              </div>
            )}

            {result.bank?.url && (
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Website</p>
                  <a 
                    href={result.bank.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-teal-600 hover:text-teal-700"
                  >
                    {result.bank.url}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-900">
        <p className="font-medium mb-1">What is a BIN?</p>
        <p>A Bank Identification Number (BIN) is the first 4-8 digits of a payment card that identify the issuing institution.</p>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-500 text-center">
          🔒 Privacy: Your data is not stored. BIN lookups are performed via a third-party API and no personal information is logged by the Toolific Hub.
        </p>
      </div>
    </div>
  );
}
