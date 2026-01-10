import React, { useState, useCallback } from 'react';
import { Delete } from 'lucide-react';

function Button({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`flex items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
}

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = useCallback((digit) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  }, [display, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const backspace = useCallback(() => {
    if (waitingForOperand) return;
    
    if (display.length === 1 || (display.length === 2 && display[0] === '-')) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  }, [display, waitingForOperand]);

  const performOperation = useCallback((nextOperation) => {
    const inputValue = parseFloat(display);

    if (isNaN(inputValue)) {
      return;
    }

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation && !waitingForOperand) {
      const currentValue = previousValue || 0;
      let result;

      switch (operation) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '×':
          result = currentValue * inputValue;
          break;
        case '÷':
          if (inputValue === 0) {
            result = 'Error';
          } else {
            result = currentValue / inputValue;
          }
          break;
        default:
          result = inputValue;
      }

      // Handle precision issues
      if (result !== 'Error' && typeof result === 'number') {
        result = Math.round(result * 100000000) / 100000000;
      }

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation, waitingForOperand]);

  const calculate = useCallback(() => {
    if (!operation || previousValue === null || waitingForOperand) return;

    const inputValue = parseFloat(display);
    let result;

    switch (operation) {
      case '+':
        result = previousValue + inputValue;
        break;
      case '-':
        result = previousValue - inputValue;
        break;
      case '×':
        result = previousValue * inputValue;
        break;
      case '÷':
        if (inputValue === 0) {
          result = 'Error';
        } else {
          result = previousValue / inputValue;
        }
        break;
      default:
        result = inputValue;
    }

    // Handle precision issues
    if (result !== 'Error' && typeof result === 'number') {
      result = Math.round(result * 100000000) / 100000000;
    }

    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  }, [display, previousValue, operation, waitingForOperand]);

  const toggleSign = useCallback(() => {
    if (display === '0' || display === 'Error') return;
    setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
  }, [display]);

  const percentage = useCallback(() => {
    const value = parseFloat(display);
    if (!isNaN(value)) {
      setDisplay(String(value / 100));
    }
  }, [display]);

  const buttonClass = "h-14 text-lg font-medium rounded-xl transition-all duration-150 active:scale-95 touch-manipulation";

  return (
    <div className="max-w-xs mx-auto">
      <div className="bg-slate-900 rounded-2xl p-4 mb-4">
        <div className="text-right">
          {previousValue !== null && operation && (
            <div className="text-slate-500 text-sm h-5 truncate">
              {previousValue} {operation}
            </div>
          )}
          <div className="text-white text-4xl font-light tracking-tight overflow-hidden text-ellipsis">
            {display}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Button 
          onClick={clear} 
          className={`${buttonClass} bg-slate-200 hover:bg-slate-300 text-slate-900`}
        >
          AC
        </Button>
        <Button 
          onClick={toggleSign} 
          className={`${buttonClass} bg-slate-200 hover:bg-slate-300 text-slate-900`}
        >
          ±
        </Button>
        <Button 
          onClick={percentage} 
          className={`${buttonClass} bg-slate-200 hover:bg-slate-300 text-slate-900`}
        >
          %
        </Button>
        <Button 
          onClick={() => performOperation('÷')} 
          className={`${buttonClass} bg-teal-500 hover:bg-teal-600 text-white ${operation === '÷' && waitingForOperand ? 'ring-2 ring-white' : ''}`}
        >
          ÷
        </Button>

        {['7', '8', '9'].map((digit) => (
          <Button 
            key={digit}
            onClick={() => inputDigit(digit)} 
            className={`${buttonClass} bg-white hover:bg-slate-50 text-slate-900 border border-slate-200`}
          >
            {digit}
          </Button>
        ))}
        <Button 
          onClick={() => performOperation('×')} 
          className={`${buttonClass} bg-teal-500 hover:bg-teal-600 text-white ${operation === '×' && waitingForOperand ? 'ring-2 ring-white' : ''}`}
        >
          ×
        </Button>

        {['4', '5', '6'].map((digit) => (
          <Button 
            key={digit}
            onClick={() => inputDigit(digit)} 
            className={`${buttonClass} bg-white hover:bg-slate-50 text-slate-900 border border-slate-200`}
          >
            {digit}
          </Button>
        ))}
        <Button 
          onClick={() => performOperation('-')} 
          className={`${buttonClass} bg-teal-500 hover:bg-teal-600 text-white ${operation === '-' && waitingForOperand ? 'ring-2 ring-white' : ''}`}
        >
          −
        </Button>

        {['1', '2', '3'].map((digit) => (
          <Button 
            key={digit}
            onClick={() => inputDigit(digit)} 
            className={`${buttonClass} bg-white hover:bg-slate-50 text-slate-900 border border-slate-200`}
          >
            {digit}
          </Button>
        ))}
        <Button 
          onClick={() => performOperation('+')} 
          className={`${buttonClass} bg-teal-500 hover:bg-teal-600 text-white ${operation === '+' && waitingForOperand ? 'ring-2 ring-white' : ''}`}
        >
          +
        </Button>

        <Button 
          onClick={() => inputDigit('0')} 
          className={`${buttonClass} col-span-1 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200`}
        >
          0
        </Button>
        <Button 
          onClick={inputDecimal} 
          className={`${buttonClass} bg-white hover:bg-slate-50 text-slate-900 border border-slate-200`}
        >
          .
        </Button>
        <Button 
          onClick={backspace} 
          className={`${buttonClass} bg-white hover:bg-slate-50 text-slate-900 border border-slate-200`}
        >
          <Delete className="w-5 h-5" />
        </Button>
        <Button 
          onClick={calculate} 
          className={`${buttonClass} bg-teal-600 hover:bg-teal-700 text-white`}
        >
          =
        </Button>
      </div>
    </div>
  );
}
