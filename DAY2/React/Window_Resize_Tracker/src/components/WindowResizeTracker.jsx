import { useState, useEffect } from 'react';

export default function WindowResizeTracker() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    // Handler to update dimensions
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  // Determine device type based on width
  const getDeviceType = (width) => {
    if (width < 768) return 'Mobile';
    if (width >= 768 && width <= 1024) return 'Tablet';
    return 'Desktop';
  };

  const deviceType = getDeviceType(dimensions.width);

  

  const getDeviceColor = (type) => {
    switch (type) {
      case 'Mobile': return 'bg-blue-500';
      case 'Tablet': return 'bg-purple-500';
      case 'Desktop': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  }
  const getDeviceIcon = (type) => {
    switch (type) {
      case 'Mobile': return '📱';
      case 'Tablet': return '📲';
      case 'Desktop': return '🖥️';
      default: return '📟';
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Window Resize Tracker
        </h1>


        <div className="flex justify-center mb-6">
          <div className={`${getDeviceColor(deviceType)} text-white px-6 py-3 rounded-full font-semibold text-lg flex items-center gap-2 shadow-lg`}>
            <span className="text-2xl">{getDeviceIcon(deviceType)}</span>
            {deviceType}
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Width</div>
            <div className="text-3xl font-bold text-gray-800">
              {dimensions.width}px
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Height</div>
            <div className="text-3xl font-bold text-gray-800">
              {dimensions.height}px
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-6 text-center shadow-lg">
          <div className="text-white text-sm font-medium mb-2">
            Current Dimensions
          </div>
          <div className="text-white text-2xl font-bold">
            {dimensions.width} × {dimensions.height}
          </div>
        </div>

        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <div className="font-semibold mb-2">Breakpoints:</div>
          <div className="space-y-1">
            <div>📱 Mobile: &lt; 768px</div>
            <div>📲 Tablet: 768px - 1024px</div>
            <div>🖥️ Desktop: &gt; 1024px</div>
          </div>
        </div>

        
        <div className="mt-6 text-center text-sm text-gray-500">
          Try resizing your browser window!
        </div>
      </div>
    </div>
  );
}