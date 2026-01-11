import React, { useState, useEffect } from 'react';
import { Save, Download, FileText, Trash2 } from 'lucide-react';

export default function OnlineNotepad() {
  const [text, setText] = useState('');
  const [savedTime, setSavedTime] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('notepad-content');
    if (saved) {
      setText(saved);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('notepad-content', text);
    setSavedTime(new Date().toLocaleTimeString());
    setTimeout(() => setSavedTime(null), 3000);
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `note-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm('Clear all text? This cannot be undone.')) {
      setText('');
      localStorage.removeItem('notepad-content');
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 rounded-xl p-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <FileText className="w-4 h-4" />
          <span>{wordCount} words</span>
          <span className="text-slate-300">•</span>
          <span>{charCount} characters</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="h-9 px-4 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={handleDownload}
            disabled={!text}
            className="h-9 px-4 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm font-medium disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button
            onClick={handleClear}
            disabled={!text}
            className="h-9 px-4 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 text-sm font-medium disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>

      {savedTime && (
        <div className="text-sm text-green-600 text-center bg-green-50 rounded-lg py-2">
          Saved at {savedTime}
        </div>
      )}

      {/* Text Area */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing your notes here... They'll be saved automatically to your browser."
        className="min-h-[400px] w-full text-base leading-relaxed resize-none rounded-2xl border border-slate-200 p-6 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono"
        spellCheck="true"
      />

      <p className="text-xs text-slate-400 text-center">
        Your notes are stored locally in your browser. Use "Save" to preserve them or "Download" to export as a file.
      </p>
    </div>
  );
}
