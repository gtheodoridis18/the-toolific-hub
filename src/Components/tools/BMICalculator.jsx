import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Ruler } from 'lucide-react';

export default function BMICalculator() {
  const [unit, setUnit] = useState('metric');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    let heightInMeters, weightInKg;

    if (unit === 'metric') {
      if (!height || !weight) return setBmi(null);
      heightInMeters = parseFloat(height) / 100;
      weightInKg = parseFloat(weight);
    } else {
      if ((!heightFeet && !heightInches) || !weight) return setBmi(null);
      const totalInches =
        (parseFloat(heightFeet) || 0) * 12 +
        (parseFloat(heightInches) || 0);
      heightInMeters = totalInches * 0.0254;
      weightInKg = parseFloat(weight) * 0.453592;
    }

    if (heightInMeters <= 0 || weightInKg <= 0) return setBmi(null);
    setBmi(weightInKg / (heightInMeters * heightInMeters));
  };

  useEffect(() => {
    calculateBMI();
  }, [height, weight, heightFeet, heightInches, unit]);

  const getBMICategory = (bmi) => {
    if (bmi < 20) return { label: 'Underweight', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (bmi < 25) return { label: 'Normal', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
    return { label: 'Obese', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
  };

  const getPointerPosition = (bmi) => {
    // Scale: 15 to 40, but visually divided into 4 EQUAL sections
    // Each section = 25% of the visual bar
    // 15-20 = 0-25%, 20-25 = 25-50%, 25-30 = 50-75%, 30-40 = 75-100%
    
    if (bmi <= 15) return 0;
    if (bmi >= 40) return 100;
    
    // Map BMI to visual position
    if (bmi <= 20) {
      // 15-20: Maps to 0-25%
      return ((bmi - 15) / 5) * 25;
    } else if (bmi <= 25) {
      // 20-25: Maps to 25-50%
      return 25 + ((bmi - 20) / 5) * 25;
    } else if (bmi <= 30) {
      // 25-30: Maps to 50-75%
      return 50 + ((bmi - 25) / 5) * 25;
    } else {
      // 30-40: Maps to 75-100%
      return 75 + ((bmi - 30) / 10) * 25;
    }
  };

  const category = bmi ? getBMICategory(bmi) : null;

  return (
    <div className="max-w-md mx-auto space-y-6">

      {/* Unit Toggle */}
      <div className="flex bg-slate-100 p-1 rounded-xl">
        {['metric', 'imperial'].map((u) => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              unit === u ? 'bg-white shadow' : 'hover:bg-slate-200'
            }`}
          >
            {u === 'metric' ? 'Metric (kg/cm)' : 'Imperial (lb/ft)'}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <div className="bg-slate-50 rounded-2xl p-4">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
            <Ruler className="w-4 h-4" /> Height
          </label>

          {unit === 'metric' ? (
            <div className="relative">
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="h-14 w-full px-4 pr-14 text-lg rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
                placeholder="e.g. 170"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                cm
              </span>
            </div>
          ) : (
            <div className="flex gap-3">
              {/* FEET */}
              <div className="relative w-full">
                <input
                  type="number"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(e.target.value)}
                  className="h-14 w-full px-4 pr-14 text-lg rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
                  placeholder="e.g. 5"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  ft
                </span>
              </div>

              {/* INCHES */}
              <div className="relative w-full">
                <input
                  type="number"
                  value={heightInches}
                  onChange={(e) => setHeightInches(e.target.value)}
                  className="h-14 w-full px-4 pr-14 text-lg rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
                  placeholder="e.g. 10"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  in
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-50 rounded-2xl p-4">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-2">
            <Scale className="w-4 h-4" /> Weight
          </label>
          <div className="relative">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="h-14 w-full px-4 pr-14 text-lg rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
              placeholder={unit === 'metric' ? 'e.g. 70' : 'e.g. 154'}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              {unit === 'metric' ? 'kg' : 'lb'}
            </span>
          </div>
        </div>
      </div>

      {/* Result */}
      <AnimatePresence mode="wait">
        {bmi && category && (
          <motion.div
            key={`${category.label}-${bmi.toFixed(1)}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0.0, 0.2, 1]
            }}
            className="space-y-4"
          >
            <div 
              className={`${category.bg} ${category.border} border rounded-2xl p-6 text-center`}
            >
              <p className="text-slate-500 text-sm uppercase tracking-wide mb-2">
                Your BMI
              </p>
              <p 
                className={`text-5xl font-light ${category.color}`}
              >
                {bmi.toFixed(1)}
              </p>
              <p 
                className={`text-lg font-medium ${category.color} mt-2`}
              >
                {category.label}
              </p>
            </div>

            {/* Scale - EQUAL WIDTH COLOR SECTIONS */}
            <motion.div 
              className="bg-white rounded-2xl p-4 border border-slate-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="relative h-8 mb-2">
                {/* 4 EQUAL sections - each 25% wide */}
                <div className="absolute inset-0 flex rounded-full overflow-hidden">
                  <div className="bg-blue-400" style={{ width: '25%' }} />
                  <div className="bg-green-400" style={{ width: '25%' }} />
                  <div className="bg-amber-400" style={{ width: '25%' }} />
                  <div className="bg-red-400" style={{ width: '25%' }} />
                </div>
                {/* Pointer */}
                <motion.div
                  className="absolute top-0 w-1 h-8 bg-slate-900 rounded-full shadow-lg"
                  initial={{ left: '50%' }}
                  animate={{ left: `${getPointerPosition(bmi)}%` }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 150, 
                    damping: 20,
                    mass: 0.8
                  }}
                  style={{ transform: 'translateX(-50%)' }}
                />
              </div>
              {/* Labels aligned with equal sections */}
              <div className="relative h-4">
                <span className="absolute text-xs text-slate-500" style={{ left: '0%', transform: 'translateX(-50%)' }}>15</span>
                <span className="absolute text-xs text-slate-500" style={{ left: '25%', transform: 'translateX(-50%)' }}>20</span>
                <span className="absolute text-xs text-slate-500" style={{ left: '50%', transform: 'translateX(-50%)' }}>25</span>
                <span className="absolute text-xs text-slate-500" style={{ left: '75%', transform: 'translateX(-50%)' }}>30</span>
                <span className="absolute text-xs text-slate-500" style={{ left: '100%', transform: 'translateX(-50%)' }}>40</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
