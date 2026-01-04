import { useState, useEffect } from 'react';
import UserStatsWidget from './UserStatsWidget';
import RecentActivityWidget from './RecentActivityWidget';
import QuickActionsWidget from './QuickActionsWidget';
import WidgetContainer, { WidgetToggleButton } from './WidgetContainer';
import { LayoutDashboard, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [widgets, setWidgets] = useState(() => {
    const saved = localStorage.getItem('dashboardWidgets');
    return saved ? JSON.parse(saved) : {
      userStats: true,
      recentActivity: true,
      quickActions: true,
    };
  });

  useEffect(() => {
    localStorage.setItem('dashboardWidgets', JSON.stringify(widgets));
  }, [widgets]);

  const toggleWidget = (widgetName) => {
    setWidgets(prev => ({
      ...prev,
      [widgetName]: !prev[widgetName],
    }));
  };

  const allWidgetsHidden = !widgets.userStats && !widgets.recentActivity && !widgets.quickActions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <LayoutDashboard className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-3">Widget Controls:</p>
            <div className="flex flex-wrap gap-3">
              <WidgetToggleButton
                title="User Stats"
                isVisible={widgets.userStats}
                onToggle={() => toggleWidget('userStats')}
              />
              <WidgetToggleButton
                title="Recent Activity"
                isVisible={widgets.recentActivity}
                onToggle={() => toggleWidget('recentActivity')}
              />
              <WidgetToggleButton
                title="Quick Actions"
                isVisible={widgets.quickActions}
                onToggle={() => toggleWidget('quickActions')}
              />
            </div>
          </div>
        </div>

        {allWidgetsHidden ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No widgets selected</h2>
            <p className="text-gray-500">Enable at least one widget to see your dashboard content.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {widgets.userStats && (
              <WidgetContainer
                title="User Stats"
                isVisible={widgets.userStats}
                onToggle={() => toggleWidget('userStats')}
              >
                <UserStatsWidget />
              </WidgetContainer>
            )}

            {widgets.recentActivity && (
              <WidgetContainer
                title="Recent Activity"
                isVisible={widgets.recentActivity}
                onToggle={() => toggleWidget('recentActivity')}
              >
                <RecentActivityWidget />
              </WidgetContainer>
            )}

            {widgets.quickActions && (
              <WidgetContainer
                title="Quick Actions"
                isVisible={widgets.quickActions}
                onToggle={() => toggleWidget('quickActions')}
              >
                <QuickActionsWidget />
              </WidgetContainer>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
