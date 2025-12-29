import React, { useState, useEffect } from 'react';

export default function LoanCalculator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [emi, setEmi] = useState('');

  useEffect(() => {
    if (!amount || !rate || !years) {
      setEmi('');
      return;
    }

    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const durationYears = parseFloat(years);

    if (principal <= 0 || annualRate <= 0 || durationYears <= 0) {
      setEmi('');
      return;
    }

    const monthlyRate = annualRate / 100 / 12;
    const months = durationYears * 12;

    const emiValue =
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    setEmi(emiValue.toFixed(2));
  }, [amount, rate, years]);

  return (
    <div className="max-w-md mx-auto space-y-4">

      {/* Loan Amount */}
      <div className="bg-slate-50 rounded-2xl p-4">
        <p className="text-sm font-medium text-slate-600 mb-2">
          Loan Amount
        </p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 10000"
          className="w-full h-12 rounded-xl border border-slate-200 px-3"
        />
      </div>

      {/* Interest Rate */}
      <div className="bg-slate-50 rounded-2xl p-4">
        <p className="text-sm font-medium text-slate-600 mb-2">
          Interest Rate (% per year)
        </p>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="e.g. 5"
          className="w-full h-12 rounded-xl border border-slate-200 px-3"
        />
      </div>

      {/* Duration */}
      <div className="bg-slate-50 rounded-2xl p-4">
        <p className="text-sm font-medium text-slate-600 mb-2">
          Loan Duration (years)
        </p>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          placeholder="e.g. 3"
          className="w-full h-12 rounded-xl border border-slate-200 px-3"
        />
      </div>

      {/* Result */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
        <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
          Monthly Payment
        </p>
        <p className="text-3xl font-light text-slate-900">
          {emi ? `$${emi}` : '—'}
        </p>
      </div>

    </div>
  );
}
