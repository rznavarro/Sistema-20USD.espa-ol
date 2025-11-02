import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface GrowthGoal {
  id: string;
  description: string;
  targetNumber: string;
  currentProgress: string;
  deadline: string;
}

function ProjectsSection() {
  const [goals, setGoals] = useState<GrowthGoal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    targetNumber: '',
    currentProgress: '',
    deadline: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('growth-goals');
    if (saved) {
      setGoals(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('growth-goals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (!formData.description.trim() || !formData.targetNumber.trim()) return;

    const goal: GrowthGoal = {
      id: Date.now().toString(),
      description: formData.description,
      targetNumber: formData.targetNumber,
      currentProgress: formData.currentProgress,
      deadline: formData.deadline,
    };

    setGoals([...goals, goal]);
    setFormData({
      description: '',
      targetNumber: '',
      currentProgress: '',
      deadline: ''
    });
    setShowForm(false);
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const getProgressPercentage = (current: string, target: string) => {
    const currentNum = parseFloat(current) || 0;
    const targetNum = parseFloat(target) || 1;
    return Math.min((currentNum / targetNum) * 100, 100);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">GROWTH GOALS</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white p-3 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-gray-700 rounded-lg space-y-4">
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Goal Description"
            className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-600 text-white"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              value={formData.targetNumber}
              onChange={(e) => setFormData({ ...formData, targetNumber: e.target.value })}
              placeholder="Target Number"
              className="px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-600 text-white"
            />

            <input
              type="number"
              value={formData.currentProgress}
              onChange={(e) => setFormData({ ...formData, currentProgress: e.target.value })}
              placeholder="Current Progress"
              className="px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-600 text-white"
            />
          </div>

          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-600 text-white"
          />

          <div className="flex gap-3">
            <button
              onClick={addGoal}
              className="flex-1 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white py-3 rounded-lg transition-colors text-lg"
            >
              Add Goal
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-lg transition-colors text-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {goals.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No growth goals</p>
        ) : (
          goals.map(goal => {
            const progressPercent = getProgressPercentage(goal.currentProgress, goal.targetNumber);
            return (
              <div
                key={goal.id}
                className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-white text-lg">{goal.description}</h3>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>Progress: {goal.currentProgress || '0'} / {goal.targetNumber}</span>
                    <span>{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-amber-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {goal.deadline && (
                  <p className="text-sm text-amber-300">Deadline: {goal.deadline}</p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ProjectsSection;
