import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Timer() {
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('5');
  const [seconds, setSeconds] = useState('0');
  const [totalSeconds, setTotalSeconds] = useState(300);
  const [remainingSeconds, setRemainingSeconds] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const total =
      (parseInt(hours) || 0) * 3600 +
      (parseInt(minutes) || 0) * 60 +
      (parseInt(seconds) || 0);
    setTotalSeconds(total);
    setRemainingSeconds(total);
    setIsFinished(false);
  }, [hours, minutes, seconds]);

  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return {
      hours: h.toString().padStart(2, '0'),
      minutes: m.toString().padStart(2, '0'),
      seconds: s.toString().padStart(2, '0'),
    };
  };

  const toggleTimer = () => {
    if (remainingSeconds > 0) {
      setIsRunning(!isRunning);
      setIsFinished(false);
    }
  };

  const reset = () => {
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
    setIsFinished(false);
  };

  const time = formatTime(remainingSeconds);
  const progress =
    totalSeconds > 0
      ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100
      : 0;

  return (
    <div className="max-w-sm mx-auto">
      <AnimatePresence mode="wait">
        {!isRunning && remainingSeconds === totalSeconds ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8"
          >
            <div className="flex gap-3 justify-center items-end">
              <div className="text-center">
                <label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">
                  Hours
                </label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-20 h-14 text-center text-2xl font-light rounded-xl border border-slate-200"
                />
              </div>
              <span className="text-3xl font-light text-slate-300 pb-3">:</span>
              <div className="text-center">
                <label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">
                  Minutes
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="w-20 h-14 text-center text-2xl font-light rounded-xl border border-slate-200"
                />
              </div>
              <span className="text-3xl font-light text-slate-300 pb-3">:</span>
              <div className="text-center">
                <label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">
                  Seconds
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  className="w-20 h-14 text-center text-2xl font-light rounded-xl border border-slate-200"
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="display"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-8"
          >
            <div className="relative">
              <div className="w-48 h-48 mx-auto relative">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#e2e8f0"
                    strokeWidth="8"
                    fill="none"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke={isFinished ? '#ef4444' : '#0d9488'}
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={553}
                    strokeDashoffset={553 - (progress / 100) * 553}
                    initial={{ strokeDashoffset: 553 }}
                    animate={{
                      strokeDashoffset: 553 - (progress / 100) * 553,
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`text-4xl font-light tracking-tight ${
                      isFinished ? 'text-red-500' : 'text-slate-900'
                    }`}
                  >
                    {time.hours !== '00' && <span>{time.hours}:</span>}
                    <span>{time.minutes}:</span>
                    <span>{time.seconds}</span>
                  </div>
                </div>
              </div>
            </div>
            {isFinished && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-red-500 font-medium mt-4"
              >
                Time&apos;s up!
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3 justify-center">
        <button
          onClick={reset}
          className="h-14 w-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <button
          onClick={toggleTimer}
          disabled={totalSeconds === 0}
          className={`h-14 px-8 rounded-full flex items-center justify-center text-white ${
            isRunning
              ? 'bg-amber-500 hover:bg-amber-600'
              : 'bg-teal-600 hover:bg-teal-700'
          } ${totalSeconds === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5 mr-2" /> Pause
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" /> Start
            </>
          )}
        </button>
      </div>
    </div>
  );
}
