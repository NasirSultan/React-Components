
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const CalculatorModal = ({ onResult }) => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('+');
  const [calcResult, setCalcResult] = useState(null);


  const calculate = () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    let res = 0;
    switch (operator) {
      case '+': res = a + b; break;
      case '-': res = a - b; break;
      case '*': res = a * b; break;
      case '/': res = b !== 0 ? a / b : '∞'; break;
      default: res = 0;
    }
    setCalcResult(res);
    onResult(res.toString()); 
  };


  
  return (
    <>
      <button
        onClick={() => setShowCalculator(true)}
        className="fixed bottom-[168px] right-6 bg-green-500/30 backdrop-blur text-white rounded-full p-4 shadow-lg border border-green-300/50 z-50"
      >
        <Calculator size={18} />
      </button>

      {showCalculator && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowCalculator(false)}
        >
          <div
            className="bg-black text-white rounded-xl shadow-2xl p-4 w-[95%] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap gap-2 justify-center items-center text-sm sm:text-base">
              <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                placeholder="1st Amount"
                className="px-3 py-2 rounded bg-zinc-800 w-28 sm:w-32"
              />
              <select
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className="px-3 py-2 rounded bg-zinc-800 text-center w-12 sm:w-14"
              >
                <option value="+">+</option>
                <option value="-">−</option>
                <option value="*">×</option>
                <option value="/">÷</option>
              </select>
              <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                placeholder="2nd Amount"
                className="px-3 py-2 rounded bg-zinc-800 w-28 sm:w-32"
              />
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={calculate}
                className="w-full px-4 py-2 rounded bg-green-600 hover:bg-green-700"
              >
                Calculate
              </button>
              <button
                onClick={() => {
                  setNum1('');
                  setNum2('');
                  setCalcResult(null);
                }}
                className="w-full px-4 py-2 rounded bg-red-500 hover:bg-red-600"
              >
                Clear
              </button>
            </div>

            {calcResult !== null && (
              <div
                onClick={() => setNum1(calcResult.toString())}
                className="mt-4 text-center bg-green-900 text-green-200 px-4 py-1 rounded cursor-pointer hover:bg-green-800 transition font-semibold"
                title="Click to set result as first input"
              >
                Result: {calcResult}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CalculatorModal;
