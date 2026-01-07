import { useState, useMemo, useRef } from 'react';
import { isPrime, getFactors, sumOfFactors } from '../utils/calculations';

function NumberAnalyzer({ theme }) {
  const [number, setNumber] = useState('');
  const calculationCount = useRef(0);

  const results = useMemo(() => {
    if (!number || isNaN(number) || number === '') {
      return null;
    }

    calculationCount.current += 1;

    const num = parseInt(number);
    const prime = isPrime(num);
    const factors = getFactors(num);
    const sum = sumOfFactors(factors);

    return {
      isPrime: prime,
      factors: factors,
      sum: sum
    };
  }, [number]);

  const handleInputChange = (e) => {
    setNumber(e.target.value);
  };

  return (
    <div className={`rounded-xl shadow-lg p-6 ${
      theme === 'dark'
        ? 'bg-gray-800 border border-gray-700'
        : 'bg-white border border-gray-200'
    }`}>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="number-input" className="block text-sm font-medium">
            Enter a Number
          </label>
          <span className={`text-xs px-2 py-1 rounded ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            Calculations: {calculationCount.current}
          </span>
        </div>
        <input
          id="number-input"
          type="number"
          value={number}
          onChange={handleInputChange}
          placeholder="Enter a positive integer"
          className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
          }`}
        />
      </div>

      {results && (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h3 className="text-sm font-medium mb-2 opacity-70">Is Prime?</h3>
            <p className={`text-2xl font-bold ${
              results.isPrime ? 'text-green-500' : 'text-red-500'
            }`}>
              {results.isPrime ? 'Yes ✓' : 'No ✗'}
            </p>
          </div>

          <div className={`p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h3 className="text-sm font-medium mb-2 opacity-70">Factors</h3>
            <div className="flex flex-wrap gap-2">
              {results.factors.map((factor, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    theme === 'dark'
                      ? 'bg-blue-900 text-blue-200'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {factor}
                </span>
              ))}
            </div>
          </div>

          <div className={`p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h3 className="text-sm font-medium mb-2 opacity-70">Sum of Factors</h3>
            <p className="text-2xl font-bold text-blue-500">
              {results.sum}
            </p>
          </div>
        </div>
      )}

      {!results && (
        <div className={`text-center py-12 ${
          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
        }`}>
          <p>Enter a number to see the analysis</p>
        </div>
      )}

      <div className={`mt-6 p-4 rounded-lg border-2 border-dashed ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
      }`}>
        {/* <h4 className="font-medium mb-2 text-sm">Performance Note:</h4> */}
        {/* <p className="text-sm opacity-70">
          The calculation count above shows how many times the expensive calculations
          have been performed. Try toggling the theme - notice the count doesn't increase!
          This is because we're using <code className={`px-1 py-0.5 rounded ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
          }`}>useMemo</code> to optimize performance.
        </p> */}
      </div>
    </div>
  );
}

export default NumberAnalyzer;
