import React, { useState } from 'react';
import { Palette, RefreshCw, Copy, Download } from 'lucide-react';

export default function ColorPaletteGenerator() {
  const [palette, setPalette] = useState([]);
  const [baseColor, setBaseColor] = useState('#3B82F6');

  const generatePalette = () => {
    const colors = [];
    const base = hexToRgb(baseColor);
    
    // Generate complementary, analogous, and monochromatic colors
    for (let i = 0; i < 5; i++) {
      const hsl = rgbToHsl(base.r, base.g, base.b);
      const newHue = (hsl.h + (i * 30)) % 360;
      const rgb = hslToRgb(newHue, hsl.s, hsl.l);
      colors.push(rgbToHex(rgb.r, rgb.g, rgb.b));
    }
    
    setPalette(colors);
  };

  const generateRandomPalette = () => {
    const colors = [];
    for (let i = 0; i < 5; i++) {
      const color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
      colors.push(color);
    }
    setPalette(colors);
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return { h: h * 360, s, l };
  };

  const hslToRgb = (h, s, l) => {
    h /= 360;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  const copyColor = (color) => {
    navigator.clipboard.writeText(color);
  };

  const exportPalette = () => {
    const css = palette.map((color, i) => `--color-${i + 1}: ${color};`).join('\n');
    const blob = new Blob([css], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'palette.css';
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Base Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="h-12 w-20 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="flex-1 h-12 px-4 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors font-mono"
              />
            </div>
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={generatePalette}
              className="flex-1 h-12 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Palette className="w-5 h-5" />
              Generate
            </button>
            <button
              onClick={generateRandomPalette}
              className="h-12 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 transition-colors flex items-center justify-center"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {palette.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-2 h-40">
            {palette.map((color, idx) => (
              <button
                key={idx}
                onClick={() => copyColor(color)}
                className="rounded-2xl transition-transform hover:scale-105 active:scale-95 relative group"
                style={{ backgroundColor: color }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-2xl flex items-center justify-center">
                  <Copy className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
            {palette.map((color, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl border border-slate-200"
                    style={{ backgroundColor: color }}
                  />
                  <div>
                    <p className="font-mono text-sm font-medium">{color.toUpperCase()}</p>
                    <p className="text-xs text-slate-500">Color {idx + 1}</p>
                  </div>
                </div>
                <button
                  onClick={() => copyColor(color)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={exportPalette}
            className="w-full h-12 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export as CSS
          </button>
        </div>
      )}
    </div>
  );
}
