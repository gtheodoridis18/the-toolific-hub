import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return {
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      centiseconds: centiseconds.toString().padStart(2, '0'),
    };
  };

  const toggleStopwatch = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    const lapTime =
      laps.length > 0 ? time - laps.reduce((a, b) => a + b, 0) : time;
    setLaps([...laps, lapTime]);
  };

  const formatted = formatTime(time);

  const getBestWorst = () => {
    if (laps.length < 2) return { best: -1, worst: -1 };
    const min = Math.min(...laps);
    const max = Math.max(...laps);
    return { best: laps.indexOf(min), worst: laps.indexOf(max) };
  };

  const { best, worst } = getBestWorst();

  return (
    <div className="max-w-sm mx-auto">
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-baseline"
          animate={{ scale: isRunning ? [1, 1.02, 1] : 1 }}
          transition={{ repeat: isRunning ? Infinity : 0, duration: 1 }}
        >
          <span className="text-6xl font-light tracking-tight text-slate-900">
            {formatted.minutes}
          </span>
          <span className="text-6xl font-light text-slate-300 mx-1">:</span>
          <span className="text-6xl font-light tracking-tight text-slate-900">
            {formatted.seconds}
          </span>
          <span className="text-3xl font-light text-slate-400 ml-1">
            .{formatted.centiseconds}
          </span>
        </motion.div>
      </div>

      <div className="flex gap-3 justify-center mb-6">
        <button
          onClick={reset}
          disabled={time === 0}
          className="h-14 w-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-50"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={toggleStopwatch}
          className={`h-14 px-8 rounded-full flex items-center justify-center text-white ${
            isRunning
              ? 'bg-amber-500 hover:bg-amber-600'
              : 'bg-teal-600 hover:bg-teal-700'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5 mr-2" /> Pause
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" /> {time > 0 ? 'Resume' : 'Start'}
            </>
          )}
        </button>

        <button
          onClick={addLap}
          disabled={!isRunning}
          className="h-14 w-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-50"
        >
          <Flag className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence>
        {laps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-slate-200 pt-4"
          >
            <div className="max-h-48 overflow-y-auto space-y-2">
              {[...laps].reverse().map((lap, index) => {
                const actualIndex = laps.length - 1 - index;
                const lapFormatted = formatTime(lap);
                const totalFormatted = formatTime(
                  laps
                    .slice(0, actualIndex + 1)
                    .reduce((a, b) => a + b, 0)
                );

                return (
                  <motion.div
                    key={actualIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex justify-between items-center px-4 py-2 rounded-xl ${
                      actualIndex === best
                        ? 'bg-green-50 text-green-700'
                        : actualIndex === worst
                        ? 'bg-red-50 text-red-700'
                        : 'bg-slate-50'
                    }`}
                  >
                    <span className="font-medium">
                      Lap {actualIndex + 1}
                    </span>
                    <div className="text-right">
                      <span className="font-mono">
                        {lapFormatted.minutes}:{lapFormatted.seconds}.
                        {lapFormatted.centiseconds}
                      </span>
                      <span className="text-slate-400 text-sm ml-2">
                        ({totalFormatted.minutes}:{totalFormatted.seconds})
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
