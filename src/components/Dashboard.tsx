import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { getTimeRemaining, checkTrialStatus } from '../utils/trialManager';
import TasksSection from './TasksSection';
import ProjectsSection from './ProjectsSection';
import NotesSection from './NotesSection';

interface DashboardProps {
  onTrialExpired: () => void;
}

function Dashboard({ onTrialExpired }: DashboardProps) {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      const status = checkTrialStatus();

      if (status === 'expired') {
        clearInterval(interval);
        onTrialExpired();
        return;
      }

      setTimeRemaining(getTimeRemaining());
    }, 60000);

    return () => clearInterval(interval);
  }, [onTrialExpired]);

  const formatTime = () => {
    const { days, hours, minutes } = timeRemaining;

    if (days > 0) {
      return `${days}d ${hours}h`;
    }
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-amber-500 p-2 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Dashboard Pro</h1>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-amber-50 px-4 py-2 rounded-lg border border-purple-200">
              <span className="text-sm font-medium text-purple-800">
                Trial: {formatTime()} remaining
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TasksSection />
          <ProjectsSection />
        </div>

        <div className="mt-6">
          <NotesSection />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
