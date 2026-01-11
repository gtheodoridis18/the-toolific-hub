import React, { useState } from 'react';
import { Network, Check, X } from 'lucide-react';

export default function PortScanner() {
  const [host, setHost] = useState('');
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState(null);

  const commonPorts = [
    { port: 21, service: 'FTP' },
    { port: 22, service: 'SSH' },
    { port: 80, service: 'HTTP' },
    { port: 443, service: 'HTTPS' },
    { port: 3306, service: 'MySQL' },
    { port: 5432, service: 'PostgreSQL' },
    { port: 8080, service: 'HTTP Alt' }
  ];

  const scanPorts = async () => {
    if (!host) return;
    setScanning(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulated results (browsers can't actually scan ports)
    const mockResults = commonPorts.map(p => ({
      ...p,
      open: Math.random() > 0.5
    }));
    
    setResults(mockResults);
    setScanning(false);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-900">
        <p className="font-medium">Educational Tool</p>
        <p className="text-xs mt-1">This tool simulates port scanning. Real port scanning requires server-side tools.</p>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <Network className="w-4 h-4" />
            Host or IP Address
          </span>
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="example.com or 192.168.1.1"
            className="w-full h-14 px-4 text-lg rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
          />
        </label>

        <button
          onClick={scanPorts}
          disabled={scanning || !host}
          className="w-full h-12 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium disabled:opacity-50"
        >
          {scanning ? 'Scanning...' : 'Scan Common Ports'}
        </button>
      </div>

      {results && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
          <h3 className="font-semibold text-slate-900 mb-3">Scan Results for {host}</h3>
          {results.map(r => (
            <div key={r.port} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <div>
                <span className="font-mono font-medium">{r.port}</span>
                <span className="text-slate-500 text-sm ml-2">({r.service})</span>
              </div>
              {r.open ? (
                <span className="flex items-center gap-1 text-green-600 text-sm">
                  <Check className="w-4 h-4" /> Open
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-600 text-sm">
                  <X className="w-4 h-4" /> Closed
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-slate-100 pt-4 mt-6">
        <p className="text-xs text-slate-500 text-center">
          🔒 Privacy: This is an educational tool with simulated results. No actual network scanning occurs, and no data is transmitted or stored.
        </p>
      </div>
    </div>
  );
}
