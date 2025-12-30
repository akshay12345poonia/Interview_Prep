import React from 'react';
const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        {[...Array(totalSteps)].map((_, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                index + 1 <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-1 text-gray-600">
              {index === 0 && 'Personal'}
              {index === 1 && 'Account'}
              {index === 2 && 'Preferences'}
              {index === 3 && 'Review'}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;