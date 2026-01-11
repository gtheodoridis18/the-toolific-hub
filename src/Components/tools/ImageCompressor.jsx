import React, { useState, useRef } from 'react';
import { Image, Download, Upload } from 'lucide-react';

export default function ImageCompressor() {
  const [image, setImage] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [quality, setQuality] = useState(80);
  const fileInputRef = useRef();
  const canvasRef = useRef();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        setImage({ file, img, originalSize: file.size });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const compressImage = () => {
    if (!image) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = image.img.width;
    canvas.height = image.img.height;
    
    ctx.drawImage(image.img, 0, 0);
    
    canvas.toBlob(
      (blob) => {
        setCompressed({
          blob,
          url: URL.createObjectURL(blob),
          size: blob.size
        });
      },
      'image/jpeg',
      quality / 100
    );
  };

  const downloadCompressed = () => {
    if (!compressed) return;
    
    const a = document.createElement('a');
    a.href = compressed.url;
    a.download = 'compressed-image.jpg';
    a.click();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <button
          onClick={() => fileInputRef.current.click()}
          className="w-full h-14 rounded-xl bg-white border-2 border-dashed border-slate-300 hover:border-teal-500 transition-colors flex items-center justify-center gap-2 text-slate-700"
        >
          <Upload className="w-5 h-5" />
          Select Image
        </button>

        {image && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <button
              onClick={compressImage}
              className="w-full h-12 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium"
            >
              Compress Image
            </button>
          </>
        )}
      </div>

      {compressed && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <img src={compressed.url} alt="Compressed" className="w-full rounded-xl" />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500">Original Size</p>
              <p className="font-medium">{(image.originalSize / 1024).toFixed(2)} KB</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Compressed Size</p>
              <p className="font-medium text-green-600">{(compressed.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>

          <button
            onClick={downloadCompressed}
            className="w-full h-12 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Compressed Image
          </button>
        </div>
      )}

      <div className="border-t border-slate-100 pt-4 mt-6">
        <p className="text-xs text-slate-500 text-center">
          🔒 Privacy: Image compression is performed entirely in your browser. the Toolific Hub does not upload, store, or transmit your images to any server.
        </p>
      </div>
    </div>
  );
}
