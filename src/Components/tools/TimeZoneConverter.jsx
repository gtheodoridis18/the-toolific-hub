import React, { useState, useEffect } from 'react';

const TIME_ZONES = Intl.supportedValuesOf('timeZone');

export default function TimeZoneConverter() {
  const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [fromZone, setFromZone] = useState(localZone);
  const [toZone, setToZone] = useState('UTC');
  const [dateTime, setDateTime] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    if (!dateTime || !fromZone || !toZone) {
      setResult('');
      return;
    }

    try {
      const inputDate = new Date(dateTime);

      const fromTime = new Date(
        inputDate.toLocaleString('en-US', { timeZone: fromZone })
      );

      const toTime = new Date(
        fromTime.toLocaleString('en-US', { timeZone: toZone })
      );

      setResult(
        toTime.toLocaleString(undefined, {
          dateStyle: 'full',
          timeStyle: 'short',
        })
      );
    } catch {
      setResult('');
    }
  }, [dateTime, fromZone, toZone]);

  return (
    <div className="max-w-md mx-auto space-y-4">

      {/* Date & Time */}
      <div className="bg-slate-50 rounded-2xl p-4">
        <p className="text-sm font-medium text-slate-600 mb-2">
          Date & Time
        </p>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="w-full h-12 rounded-xl border border-slate-200 px-3"
        />
      </div>

      {/* From Time Zone */}
      <div className="bg-slate-50 rounded-2xl p-4">
        <p className="text-sm font-medium text-slate-600 mb-2">
          From Time Zone
        </p>
        <select
          value={fromZone}
          onChange={(e) => setFromZone(e.target.value)}
          className="w-full h-12 rounded-xl border border-slate-200 px-3 bg-white"
        >
          {TIME_ZONES.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>

      {/* To Time Zone */}
      <div className="bg-slate-50 rounded-2xl p-4">
        <p className="text-sm font-medium text-slate-600 mb-2">
          To Time Zone
        </p>
        <select
          value={toZone}
          onChange={(e) => setToZone(e.target.value)}
          className="w-full h-12 rounded-xl border border-slate-200 px-3 bg-white"
        >
          {TIME_ZONES.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>

      {/* Result */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
          Converted Time
        </p>
        <p className="text-slate-900 text-base">
          {result || '—'}
        </p>
      </div>

    </div>
  );
}
