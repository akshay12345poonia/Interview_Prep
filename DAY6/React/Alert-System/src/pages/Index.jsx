import React from 'react';
import { useAlerts } from '../components/Alert';

const Index = () => {
  const { success, error, warning, info } = useAlerts();

  const showSampleAlerts = () => {
    success('Success! Your changes have been saved.');
    setTimeout(() => error('Error! Something went wrong.'), 200);
    setTimeout(() => warning('Warning! Please review your input.'), 400);
    setTimeout(() => info('Info: New updates are available.'), 600);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white tracking-tight">
            Alert System Demo
          </h1>
          <p className="text-xl text-slate-300">
            Click the button to see all 4 alert types in action
          </p>
        </div>
        
        <button
          onClick={showSampleAlerts}
          className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl shadow-lg hover:bg-slate-100 hover:scale-105 transition-all duration-200"
        >
          Show Sample Alerts
        </button>
        
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-12">
          <button
            onClick={() => success('Success message!')}
            className="px-4 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Success
          </button>
          <button
            onClick={() => error('Error message!')}
            className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Error
          </button>
          <button
            onClick={() => warning('Warning message!')}
            className="px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Warning
          </button>
          <button
            onClick={() => info('Info message!')}
            className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
