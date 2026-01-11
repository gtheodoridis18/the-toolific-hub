import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [generated, setGenerated] = useState('');

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const generateParagraph = (isFirst) => {
    const sentenceCount = Math.floor(Math.random() * 3) + 4;
    let paragraph = '';

    for (let i = 0; i < sentenceCount; i++) {
      const wordCount = Math.floor(Math.random() * 10) + 5;
      let sentence = '';

      for (let j = 0; j < wordCount; j++) {
        if (i === 0 && j === 0 && isFirst && startWithLorem) {
          sentence += 'Lorem ipsum dolor sit amet';
          j += 4;
        } else {
          const word = loremWords[Math.floor(Math.random() * loremWords.length)];
          sentence += (j === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word) + ' ';
        }
      }

      paragraph += sentence.trim() + '. ';
    }

    return paragraph.trim();
  };

  const generate = () => {
    const result = [];
    for (let i = 0; i < paragraphs; i++) {
      result.push(generateParagraph(i === 0));
    }
    setGenerated(result.join('\n\n'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Controls */}
      <div className="bg-slate-50 rounded-2xl p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Number of Paragraphs
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={paragraphs}
              onChange={(e) => setParagraphs(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
              className="w-full h-12 px-4 text-lg rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 h-12 cursor-pointer">
              <input
                type="checkbox"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm text-slate-700">Start with "Lorem ipsum..."</span>
            </label>
          </div>
        </div>

        <button
          onClick={generate}
          className="w-full h-12 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <RefreshCw className="w-5 h-5" />
          Generate Lorem Ipsum
        </button>
      </div>

      {/* Result */}
      {generated && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Generated Text</h3>
            <button
              onClick={copyToClipboard}
              className="h-10 px-4 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>

          <div className="prose max-w-none">
            {generated.split('\n\n').map((para, idx) => (
              <p key={idx} className="text-slate-700 leading-relaxed mb-4 last:mb-0">
                {para}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
