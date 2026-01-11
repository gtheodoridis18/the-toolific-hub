import React, { useState } from 'react';
import { Shield, Check, X, Eye, EyeOff, RefreshCw, Copy } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [testPassword, setTestPassword] = useState('');

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) {
      setPassword('');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const testStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (pass.length >= 12) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^a-zA-Z0-9]/.test(pass)) strength++;

    if (strength <= 2) return { level: 'Weak', color: 'red', score: strength };
    if (strength <= 4) return { level: 'Medium', color: 'amber', score: strength };
    return { level: 'Strong', color: 'green', score: strength };
  };

  const strength = testPassword ? testStrength(testPassword) : null;

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Generator */}
      <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-teal-600" />
          Password Generator
        </h3>

        {password && (
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              readOnly
              className="w-full h-14 px-4 pr-24 text-lg rounded-xl border border-slate-200 font-mono bg-white"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <button
                onClick={copyPassword}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <div>
          <label className="text-sm text-slate-700 mb-2 block">
            Length: {length}
          </label>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-teal-600"
            />
            <span className="text-sm">Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-teal-600"
            />
            <span className="text-sm">Lowercase (a-z)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-teal-600"
            />
            <span className="text-sm">Numbers (0-9)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-teal-600"
            />
            <span className="text-sm">Symbols (!@#$%)</span>
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full h-12 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Generate Password
        </button>
      </div>

      {/* Strength Tester */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Test Password Strength</h3>

        <input
          type="text"
          value={testPassword}
          onChange={(e) => setTestPassword(e.target.value)}
          placeholder="Enter a password to test..."
          className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
        />

        {strength && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Strength:</span>
              <span className={`text-sm font-semibold text-${strength.color}-600`}>
                {strength.level}
              </span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2">
              <div
                className={`bg-${strength.color}-500 h-2 rounded-full transition-all duration-300`}
                style={{ width: `${(strength.score / 6) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                {testPassword.length >= 8 ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <X className="w-4 h-4 text-red-600" />
                )}
                <span>8+ characters</span>
              </div>
              <div className="flex items-center gap-2">
                {/[A-Z]/.test(testPassword) ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <X className="w-4 h-4 text-red-600" />
                )}
                <span>Uppercase</span>
              </div>
              <div className="flex items-center gap-2">
                {/[a-z]/.test(testPassword) ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <X className="w-4 h-4 text-red-600" />
                )}
                <span>Lowercase</span>
              </div>
              <div className="flex items-center gap-2">
                {/[0-9]/.test(testPassword) ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <X className="w-4 h-4 text-red-600" />
                )}
                <span>Numbers</span>
              </div>
              <div className="flex items-center gap-2">
                {/[^a-zA-Z0-9]/.test(testPassword) ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <X className="w-4 h-4 text-red-600" />
                )}
                <span>Symbols</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-slate-100 pt-4 mt-6">
        <p className="text-xs text-slate-500 text-center">
          🔒 Privacy: All passwords are generated locally in your browser. the Toolific Hub does not collect, store, or transmit any passwords or data.
        </p>
      </div>
    </div>
  );
}
