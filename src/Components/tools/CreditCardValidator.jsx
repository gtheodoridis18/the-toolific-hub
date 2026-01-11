import React, { useState } from 'react';
import { CreditCard, Check, X, AlertCircle } from 'lucide-react';

export default function CreditCardValidator() {
  const [cardNumber, setCardNumber] = useState('');
  const [result, setResult] = useState(null);

  const detectCardType = (number) => {
    const patterns = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      jcb: /^(?:2131|1800|35\d{3})\d{11}$/
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(number)) {
        return type;
      }
    }
    return 'unknown';
  };

  const luhnCheck = (num) => {
    let sum = 0;
    let isEven = false;

    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  const validate = () => {
    const cleaned = cardNumber.replace(/\s/g, '');

    if (!cleaned || !/^\d+$/.test(cleaned)) {
      setResult({
        isValid: false,
        message: 'Please enter a valid card number'
      });
      return;
    }

    if (cleaned.length < 13 || cleaned.length > 19) {
      setResult({
        isValid: false,
        message: 'Card number must be between 13-19 digits'
      });
      return;
    }

    const isValid = luhnCheck(cleaned);
    const cardType = detectCardType(cleaned);

    setResult({
      isValid,
      cardType,
      length: cleaned.length,
      message: isValid ? 'Valid card number' : 'Invalid card number (failed Luhn check)'
    });
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const handleInput = (e) => {
    const value = e.target.value.replace(/[^\d\s]/g, '');
    setCardNumber(value);
    setResult(null);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Card Number
          </span>
          <input
            type="text"
            value={cardNumber}
            onChange={handleInput}
            placeholder="4532 1234 5678 9010"
            maxLength="23"
            className="w-full h-14 px-4 text-lg rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors font-mono"
          />
        </label>

        <button
          onClick={validate}
          disabled={!cardNumber}
          className="w-full h-12 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Validate Card
        </button>
      </div>

      {result && (
        <div className={`rounded-2xl border-2 p-6 ${
          result.isValid 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-start gap-3">
            {result.isValid ? (
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            ) : (
              <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            )}
            <div className="flex-1">
              <h3 className={`text-lg font-semibold mb-2 ${
                result.isValid ? 'text-green-900' : 'text-red-900'
              }`}>
                {result.message}
              </h3>
              {result.isValid && (
                <div className="space-y-2 text-sm text-green-800">
                  <p><strong>Card Type:</strong> {result.cardType.toUpperCase()}</p>
                  <p><strong>Length:</strong> {result.length} digits</p>
                  <p><strong>Luhn Check:</strong> Passed ✓</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900">
          <p className="font-medium mb-1">Note:</p>
          <p>This tool validates card number format using the Luhn algorithm. It does not verify if the card is active or has sufficient funds.</p>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-500 text-center">
          🔒 Your privacy matters: the Toolific Hub does not collect, store, or transmit any data you enter. All validation happens locally in your browser.
        </p>
      </div>
    </div>
  );
}
