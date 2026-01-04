import { Plus, Download, Settings, Mail } from 'lucide-react';

export default function QuickActionsWidget() {
  const actions = [
    { label: 'New Project', icon: Plus, color: 'bg-blue-500 hover:bg-blue-600' },
    { label: 'Export Data', icon: Download, color: 'bg-green-500 hover:bg-green-600' },
    { label: 'Settings', icon: Settings, color: 'bg-gray-500 hover:bg-gray-600' },
    { label: 'Send Email', icon: Mail, color: 'bg-orange-500 hover:bg-orange-600' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className={`${action.color} text-white p-4 rounded-lg transition-all transform hover:scale-105 shadow-md`}
            >
              <Icon className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
