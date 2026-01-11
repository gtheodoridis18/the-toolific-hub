import React, { useState } from 'react';
import { FileText } from 'lucide-react';

export default function TextSummarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');

  const summarize = () => {
    if (!text.trim()) return;

    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    if (sentences.length <= 3) {
      setSummary(text);
      return;
    }

    // Simple extractive summarization - first and last sentences + middle important ones
    const firstSentence = sentences[0];
    const lastSentence = sentences[sentences.length - 1];
    const middleImportant = sentences.slice(1, -1).sort((a, b) => b.length - a.length)[0];

    setSummary([firstSentence, middleImportant, lastSentence].join(' '));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Text to Summarize
          </span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here..."
            className="min-h-[200px] w-full text-base leading-relaxed resize-none rounded-xl border border-slate-200 p-4 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </label>

        <button
          onClick={summarize}
          disabled={!text.trim()}
          className="w-full h-12 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium disabled:opacity-50"
        >
          Summarize Text
        </button>
      </div>

      {summary && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">Summary</h3>
          <p className="text-slate-700 leading-relaxed">{summary}</p>
          
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500">Original Length</p>
              <p className="font-medium">{text.length} characters</p>
            </div>
            <div>
              <p className="text-slate-500">Summary Length</p>
              <p className="font-medium text-green-600">{summary.length} characters</p>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-slate-100 pt-4 mt-6">
        <p className="text-xs text-slate-500 text-center">
          🔒 Privacy: Text summarization is processed locally in your browser. the Toolific Hub does not collect, store, or transmit your text content.
        </p>
      </div>
    </div>
  );
}
