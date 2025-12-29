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
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (bmi < 25) return { label: 'Normal', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
    return { label: 'Obese', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
  };

  const category = bmi ? getBMICategory(bmi) : null;

  return (
    <div className="max-w-md mx-auto">
      {/* Unit Toggle */}
      <div className="flex mb-6 bg-slate-100 p-1 rounded-xl">
        {['metric', 'imperial'].map((u) => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              unit === u ? 'bg-white shadow' : 'hover:bg-slate-200'
            }`}
          >
            {u === 'metric' ? 'Metric (kg/cm)' : 'Imperial (lb/ft)'}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="space-y-4 mb-6">
        <div className="bg-slate-50 rounded-2xl p-4">
          <label className="text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">
            <Ruler className="w-4 h-4" /> Height
          </label>

          {unit === 'metric' ? (
            <div className="relative">
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="h-12 w-full pr-12 text-lg rounded-xl border border-slate-200"
                placeholder="170"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                cm
              </span>
            </div>
          ) : (
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="number"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(e.target.value)}
                  className="h-12 w-full pr-8 text-lg rounded-xl border border-slate-200"
                  placeholder="5"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ft
                </span>
              </div>
              <div className="relative flex-1">
                <input
                  type="number"
                  value={heightInches}
                  onChange={(e) => setHeightInches(e.target.value)}
                  className="h-12 w-full pr-8 text-lg rounded-xl border border-slate-200"
                  placeholder="10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  in
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-50 rounded-2xl p-4">
          <label className="text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">
            <Scale className="w-4 h-4" /> Weight
          </label>
          <div className="relative">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="h-12 w-full pr-12 text-lg rounded-xl border border-slate-200"
              placeholder={unit === 'metric' ? '70' : '154'}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              {unit === 'metric' ? 'kg' : 'lb'}
            </span>
          </div>
        </div>
      </div>

      {/* Result */}
      <AnimatePresence>
        {bmi && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`${category.bg} ${category.border} border rounded-2xl p-6 text-center`}
          >
            <p className="text-slate-500 text-sm uppercase tracking-wide mb-2">
              Your BMI
            </p>
            <p className={`text-5xl font-light ${category.color}`}>
              {bmi.toFixed(1)}
            </p>
            <p className={`text-lg font-medium ${category.color} mt-2`}>
              {category.label}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
