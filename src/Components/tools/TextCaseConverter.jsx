import React, { useState } from 'react';

export default function TextCaseConverter() {
  const [text, setText] = useState('');

  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const toSentenceCase = (str) =>
    str
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase());

  return (
    <div className="max-w-2xl mx-auto space-y-4">

      {/* Text Input */}
      <div className="bg-slate-50 rounded-2xl p-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full min-h-[160px] resize-none rounded-xl border border-slate-200 p-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setText(text.toUpperCase())}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-medium"
        >
          UPPERCASE
        </button>

        <button
          onClick={() => setText(text.toLowerCase())}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-medium"
        >
          lowercase
        </button>

        <button
          onClick={() => setText(toTitleCase(text))}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-medium"
        >
          Title Case
        </button>

        <button
          onClick={() => setText(toSentenceCase(text))}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-medium"
        >
          Sentence case
        </button>
      </div>

    </div>
  );
}
