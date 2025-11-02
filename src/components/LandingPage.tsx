import { Sparkles } from 'lucide-react';

interface LandingPageProps {
  onActivate: () => void;
}

function LandingPage({ onActivate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 text-center border border-gray-700">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-800 p-4 rounded-2xl">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Dashboard Pro
        </h1>

        <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
          Professional organizational dashboard for managing your projects and tasks
        </p>

        <button
          onClick={onActivate}
          className="w-full max-w-md mx-auto bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white font-semibold text-lg py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl mb-4"
        >
          ACTIVATE 7-DAY TRIAL
        </button>

        <p className="text-sm text-gray-400">
          After 7 days: $20 USD for full access
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
