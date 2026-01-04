import { Users, TrendingUp, Activity } from 'lucide-react';

export default function UserStatsWidget() {
  const stats = [
    { label: 'Total Users', value: '2,543', icon: Users, color: 'text-blue-600' },
    { label: 'Active Now', value: '847', icon: Activity, color: 'text-green-600' },
    { label: 'Growth', value: '+12%', icon: TrendingUp, color: 'text-purple-600' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">User Stats</h3>
      <div className="space-y-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-gray-700 font-medium">{stat.label}</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
