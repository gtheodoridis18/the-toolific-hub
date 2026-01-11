import React, { useState, useRef } from 'react';
import { FileImage, Download } from 'lucide-react';

export default function SVGConverter() {
  const [svg, setSvg] = useState(null);
  const [converted, setConverted] = useState(null);
  const fileInputRef = useRef();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setSvg(event.target.result);
    };
    reader.readAsText(file);
  };

  const convertToPNG = () => {
    if (!svg) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new window.Image();
    
    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      canvas.width = img.width || 512;
      canvas.height = img.height || 512;
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        setConverted(URL.createObjectURL(blob));
        URL.revokeObjectURL(url);
      }, 'image/png');
    };
    
    img.src = url;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".svg"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <button
          onClick={() => fileInputRef.current.click()}
          className="w-full h-14 rounded-xl bg-white border-2 border-dashed border-slate-300 hover:border-teal-500 transition-colors flex items-center justify-center gap-2 text-slate-700"
        >
          <FileImage className="w-5 h-5" />
          Select SVG File
        </button>

        {svg && (
          <button
            onClick={convertToPNG}
            className="w-full h-12 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium"
          >
            Convert to PNG
          </button>
        )}
      </div>

      {converted && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <img src={converted} alt="Converted" className="w-full max-w-md mx-auto rounded-xl border border-slate-200" />
          
          <a
            href={converted}
            download="converted.png"
            className="block w-full h-12 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download PNG
          </a>
        </div>
      )}

      <div className="border-t border-slate-100 pt-4 mt-6">
        <p className="text-xs text-slate-500 text-center">
          🔒 Privacy: SVG conversion is performed entirely in your browser. the Toolific Hub does not upload, store, or transmit your SVG files.
        </p>
      </div>
    </div>
  );
}
