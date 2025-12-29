import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, RefreshCw } from 'lucide-react';

const exchangeRates = {
  USD: { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 154.5, CAD: 1.36, AUD: 1.53, CHF: 0.88, CNY: 7.24, INR: 83.12, MXN: 17.15 },
  EUR: { USD: 1.09, EUR: 1, GBP: 0.86, JPY: 168.2, CAD: 1.48, AUD: 1.67, CHF: 0.96, CNY: 7.88, INR: 90.48, MXN: 18.67 },
  GBP: { USD: 1.27, EUR: 1.16, GBP: 1, JPY: 195.6, CAD: 1.72, AUD: 1.94, CHF: 1.11, CNY: 9.17, INR: 105.22, MXN: 21.72 },
  JPY: { USD: 0.0065, EUR: 0.0059, GBP: 0.0051, JPY: 1, CAD: 0.0088, AUD: 0.0099, CHF: 0.0057, CNY: 0.047, INR: 0.54, MXN: 0.11 },
  CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 113.6, CAD: 1, AUD: 1.13, CHF: 0.65, CNY: 5.32, INR: 61.12, MXN: 12.61 },
  AUD: { USD: 0.65, EUR: 0.6, GBP: 0.52, JPY: 100.98, CAD: 0.89, AUD: 1, CHF: 0.57, CNY: 4.73, INR: 54.33, MXN: 11.21 },
  CHF: { USD: 1.14, EUR: 1.04, GBP: 0.9, JPY: 175.57, CAD: 1.54, AUD: 1.74, CHF: 1, CNY: 8.23, INR: 94.45, MXN: 19.49 },
  CNY: { USD: 0.14, EUR: 0.13, GBP: 0.11, JPY: 21.34, CAD: 0.19, AUD: 0.21, CHF: 0.12, CNY: 1, INR: 11.48, MXN: 2.37 },
  INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095, JPY: 1.86, CAD: 0.016, AUD: 0.018, CHF: 0.011, CNY: 0.087, INR: 1, MXN: 0.21 },
  MXN: { USD: 0.058, EUR: 0.054, GBP: 0.046, JPY: 9.01, CAD: 0.079, AUD: 0.089, CHF: 0.051, CNY: 0.42, INR: 4.85, MXN: 1 },
};

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
];

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromValue, setFromValue] = useState('100');
  const [toValue, setToValue] = useState('');

  useEffect(() => {
    if (fromValue === '' || isNaN(fromValue)) {
      setToValue('');
      return;
    }
    const rate = exchangeRates[fromCurrency][toCurrency];
    setToValue((parseFloat(fromValue) * rate).toFixed(2));
  }, [fromValue, fromCurrency, toCurrency]);

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromValue(toValue);
  };

  const fromData = currencies.find(c => c.code === fromCurrency);
  const toData = currencies.find(c => c.code === toCurrency);

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="bg-slate-50 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{fromData?.flag}</span>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="flex-1 h-10 rounded-xl border border-slate-200 bg-white px-3"
          >
            {currencies.map(c => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code} – {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            {fromData?.symbol}
          </span>
          <input
            type="number"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            className="h-14 text-2xl font-light pl-10 rounded-xl border border-slate-200 w-full"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={swap}
          className="rounded-full h-12 w-12 border border-slate-200 hover:bg-teal-50 hover:border-teal-200 flex items-center justify-center"
        >
          <ArrowRightLeft className="w-5 h-5 text-teal-600" />
        </button>
      </div>

      <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{toData?.flag}</span>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="flex-1 h-10 rounded-xl border border-teal-200 bg-white px-3"
          >
            {currencies.map(c => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code} – {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600 text-lg">
            {toData?.symbol}
          </span>
          <div className="h-14 bg-white rounded-xl flex items-center pl-10 text-2xl font-light border border-teal-200">
            {toValue || '0.00'}
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-slate-500 pt-2">
        <p>
          1 {fromCurrency} = {exchangeRates[fromCurrency][toCurrency].toFixed(4)} {toCurrency}
        </p>
        <p className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
          <RefreshCw className="w-3 h-3" /> Rates are illustrative
        </p>
      </div>
    </div>
  );
}
