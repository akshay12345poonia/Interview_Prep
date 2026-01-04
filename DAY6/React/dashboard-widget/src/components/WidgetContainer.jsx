import { Eye, EyeOff } from 'lucide-react';

export default function WidgetContainer({ title, isVisible, onToggle, children }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
        title={`Hide ${title}`}
      >
        <EyeOff className="w-4 h-4 text-gray-600" />
      </button>
      {children}
    </div>
  );
}

export function WidgetToggleButton({ title, isVisible, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        isVisible
          ? 'bg-green-500 text-white hover:bg-green-600'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
      <span className="text-sm font-medium">{title}</span>
    </button>
  );
}
