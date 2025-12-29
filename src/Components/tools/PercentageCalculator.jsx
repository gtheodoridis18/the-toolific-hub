import React, { useState, useEffect } from 'react';

export default function PercentageCalculator() {
  const [percent, setPercent] = useState('');
  const [baseValue, setBaseValue] = useState('');
  const [increaseBase, setIncreaseBase] = useState('');
  const [decreaseBase, setDecreaseBase] = useState('');

  const calculatePercentageOf = () => {
    if (percent === '' || baseValue === '') return '';
    return ((parseFloat(percent) / 100) * parseFloat(baseValue)).toFixed(2);
  };

  const calculateIncrease = () => {
    if (percent === '' || increaseBase === '') return '';
    const result =
      parseFloat(increaseBase) +
      (parseFloat(percent) / 100) * parseFloat(increaseBase);
    return result.toFixed(2);
  };

  const calculateDecrease = () => {
    if (percent === '' || decreaseBase === '') return '';
    const result =
      parseFloat(decreaseBase) -
      (parseFloat(percent) / 100) * parseFloat(decreaseBase);
    return result.toFixed(2);
  };

  return (
    <div className="max-w-md mx-auto space-y-4">

      {/* X% of Y */}
      <div className="bg-slate-50 rounded-2xl p-4">
        <p className="text-sm font-medium text-slate-600 mb-2">
          Calculate X% of Y
        </p>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="X (%)"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            className="flex-1 h-12 rounded-xl border border-slate-200 px-3"
          />
          <input
            type="number"
            placeholder="Y"
            value={baseValue}
            onChange={(e) => setBaseValue(e.target.value)}
            className="flex-1 h-12 rounded-xl border border-slate-200 px-3"
          />
        </div>
        <div className="mt-2 text-slate-700">
          Result: <span className="font-medium">{calculatePercentageOf() || '—'}</span>
        </div>
      </div>

      {/* Percentage Increase */}
      <div className="bg-slate-50 rounded-2xl p-4">
        <p className="text-sm font-medium text-slate-600 mb-2">
          Percentage Increase
        </p>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Original value"
            value={increaseBase}
            onChange={(e) => setIncreaseBase(e.target.value)}
            className="flex-1 h-12 rounded-xl border border-slate-200 px-3"
          />
          <input
            type="number"
            placeholder="Increase (%)"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            className="flex-1 h-12 rounded-xl border border-slate-200 px-3"
          />
        </div>
        <div className="mt-2 text-slate-700">
          Result: <span className="font-medium">{calculateIncrease() || '—'}</span>
        </div>
      </div>

      {/* Percentage Decrease */}
      <div className="bg-slate-50 rounded-2xl p-4">
        <p className="text-sm font-medium text-slate-600 mb-2">
          Percentage Decrease
        </p>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Original value"
            value={decreaseBase}
            onChange={(e) => setDecreaseBase(e.target.value)}
            className="flex-1 h-12 rounded-xl border border-slate-200 px-3"
          />
          <input
            type="number"
            placeholder="Decrease (%)"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            className="flex-1 h-12 rounded-xl border border-slate-200 px-3"
          />
        </div>
        <div className="mt-2 text-slate-700">
          Result: <span className="font-medium">{calculateDecrease() || '—'}</span>
        </div>
      </div>

    </div>
  );
}
