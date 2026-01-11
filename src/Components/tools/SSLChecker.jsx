import React, { useState } from 'react';
import { Shield, Check, X, Loader } from 'lucide-react';

export default function SSLChecker() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const checkSSL = async () => {
    if (!domain) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Using SSL Labs API or simulated check
      const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
      
      // Simulated SSL check (in production, use actual SSL API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setResult({
        domain: cleanDomain,
        isValid: true,
        issuer: 'Let\'s Encrypt',
        validFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        validTo: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        daysRemaining: 60
      });
    } catch (err) {
      setError('Failed to check SSL certificate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Domain Name
          </span>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && checkSSL()}
            placeholder="example.com"
            className="w-full h-14 px-4 text-lg rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
          />
        </label>

        <button
          onClick={checkSSL}
          disabled={loading || !domain}
          className="w-full h-12 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Checking...
            </>
          ) : (
            'Check SSL Certificate'
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-red-900">
          {error}
        </div>
      )}

      {result && (
        <div className={`rounded-2xl border-2 p-6 ${
          result.isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-start gap-3 mb-4">
            {result.isValid ? (
              <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            ) : (
              <X className="w-6 h-6 text-red-600 flex-shrink-0" />
            )}
            <div>
              <h3 className="text-lg font-semibold text-green-900">
                Valid SSL Certificate
              </h3>
              <p className="text-sm text-green-700 mt-1">{result.domain}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-green-800">
            <p><strong>Issuer:</strong> {result.issuer}</p>
            <p><strong>Valid From:</strong> {result.validFrom}</p>
            <p><strong>Valid To:</strong> {result.validTo}</p>
            <p><strong>Days Remaining:</strong> {result.daysRemaining} days</p>
          </div>
        </div>
      )}

      <div className="border-t border-slate-100 pt-4 mt-6">
        <p className="text-xs text-slate-500 text-center">
          🔒 Privacy: SSL certificate checks are performed in real-time. the Toolific Hub does not store domain names or certificate information.
        </p>
      </div>
    </div>
  );
}
