import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

export default function QRCodeGenerator() {
  const [input, setInput] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    if (!input) {
      setQrUrl('');
      return;
    }

    QRCode.toDataURL(input, { width: 240, margin: 2 })
      .then(setQrUrl)
      .catch(() => setQrUrl(''));
  }, [input]);

  return (
    <div className="max-w-md mx-auto space-y-4">

      {/* Input */}
      <div className="bg-slate-50 rounded-2xl p-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text or URL..."
          className="w-full h-12 rounded-xl border border-slate-200 px-3 text-base"
        />
      </div>

      {/* Output */}
      {qrUrl && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex justify-center">
          <img
            src={qrUrl}
            alt="Generated QR Code"
            className="w-48 h-48"
          />
        </div>
      )}

    </div>
  );
}
