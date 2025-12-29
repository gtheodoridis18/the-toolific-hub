import React, { useState, useEffect } from 'react';
import { Calendar, Cake, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState(null);

  useEffect(() => {
    if (!birthDate) {
      setAge(null);
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();

    if (birth > today) {
      setAge(null);
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil(
      (nextBirthday - today) / (1000 * 60 * 60 * 24)
    );

    setAge({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      daysUntilBirthday,
      dayOfWeek: birth.toLocaleDateString('en-US', { weekday: 'long' }),
    });
  }, [birthDate]);

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-slate-50 rounded-2xl p-6 mb-6">
        <label
          htmlFor="birthdate"
          className="text-sm font-medium text-slate-600 mb-2 block"
        >
          Enter your date of birth
        </label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            id="birthdate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="h-14 pl-12 text-lg rounded-xl border border-slate-200 w-full"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <AnimatePresence>
        {age && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
              <p className="text-teal-100 text-sm uppercase tracking-wide mb-2">
                Your Age
              </p>
              <div className="flex items-baseline gap-3">
                <div className="text-center">
                  <span className="text-5xl font-light">{age.years}</span>
                  <p className="text-teal-200 text-sm mt-1">Years</p>
                </div>
                <span className="text-3xl text-teal-300">·</span>
                <div className="text-center">
                  <span className="text-4xl font-light">{age.months}</span>
                  <p className="text-teal-200 text-sm mt-1">Months</p>
                </div>
                <span className="text-3xl text-teal-300">·</span>
                <div className="text-center">
                  <span className="text-4xl font-light">{age.days}</span>
                  <p className="text-teal-200 text-sm mt-1">Days</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">
                  Total Days Lived
                </p>
                <p className="text-2xl font-light text-slate-900">
                  {age.totalDays.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">
                  Total Weeks
                </p>
                <p className="text-2xl font-light text-slate-900">
                  {age.totalWeeks.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">
                  Total Months
                </p>
                <p className="text-2xl font-light text-slate-900">
                  {age.totalMonths.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">
                  Total Hours
                </p>
                <p className="text-2xl font-light text-slate-900">
                  {age.totalHours.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 bg-amber-50 rounded-xl p-4 border border-amber-100">
                <div className="flex items-center gap-2 mb-1">
                  <Cake className="w-4 h-4 text-amber-600" />
                  <p className="text-amber-700 text-xs uppercase tracking-wide">
                    Next Birthday
                  </p>
                </div>
                <p className="text-xl font-light text-amber-900">
                  {age.daysUntilBirthday === 0
                    ? '🎉 Today!'
                    : `${age.daysUntilBirthday} days`}
                </p>
              </div>
              <div className="flex-1 bg-purple-50 rounded-xl p-4 border border-purple-100">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <p className="text-purple-700 text-xs uppercase tracking-wide">
                    Born On
                  </p>
                </div>
                <p className="text-xl font-light text-purple-900">
                  {age.dayOfWeek}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
