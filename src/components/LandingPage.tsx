import { Sparkles } from 'lucide-react';

interface LandingPageProps {
  onActivate: () => void;
}

function LandingPage({ onActivate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-800 p-4 rounded-2xl">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Dashboard Pro
        </h1>

        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Panel organizacional profesional para gestionar tus proyectos y tareas
        </p>

        <button
          onClick={onActivate}
          className="w-full max-w-md mx-auto bg-blue-800 hover:bg-blue-900 text-white font-semibold text-lg py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl mb-4"
        >
          ACTIVAR PRUEBA DE 7 DÍAS
        </button>

        <p className="text-sm text-gray-500">
          Después de 7 días: $20 USD para acceso completo
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
