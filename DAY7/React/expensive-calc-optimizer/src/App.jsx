import { useState } from 'react';
import NumberAnalyzer from './components/NumberAnalyzer';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-gray-900 text-white'
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Number Analyzer</h1>
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          <NumberAnalyzer theme={theme} />
        </div>
      </div>
    </div>
  );
}

export default App;
