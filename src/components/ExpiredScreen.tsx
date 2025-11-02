import { Clock } from 'lucide-react';

function ExpiredScreen() {
  const handlePaidClick = () => {
    alert('Envía tu comprobante a rznavarrojb977@gmail.com');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <Clock className="w-16 h-16 text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Tu período de prueba ha expirado
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Para continuar usando Dashboard Pro, envía tu pago de $20 USD
        </p>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <p className="text-sm text-gray-600 mb-2">Enviar pago a:</p>
          <p className="text-2xl font-bold text-blue-800 mb-1">PayPal</p>
          <p className="text-lg text-gray-800 font-mono break-all">
            rznavarrojb977@gmail.com
          </p>
        </div>

        <button
          onClick={handlePaidClick}
          className="w-full max-w-md mx-auto bg-blue-800 hover:bg-blue-900 text-white font-semibold text-lg py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Ya pagué
        </button>

        <p className="text-sm text-gray-500 mt-6">
          Una vez realizado el pago, envía tu comprobante al correo indicado para activar tu acceso completo
        </p>
      </div>
    </div>
  );
}

export default ExpiredScreen;
