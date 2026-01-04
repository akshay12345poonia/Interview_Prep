import { Clock } from 'lucide-react';

export default function RecentActivityWidget() {
  const activities = [
    { user: 'John Doe', action: 'Created new project', time: '2 minutes ago' },
    { user: 'Jane Smith', action: 'Updated dashboard', time: '15 minutes ago' },
    { user: 'Mike Johnson', action: 'Completed task', time: '1 hour ago' },
    { user: 'Sarah Williams', action: 'Added new user', time: '2 hours ago' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-gray-900 font-medium">{activity.user}</p>
              <p className="text-sm text-gray-600">{activity.action}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
