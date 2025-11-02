import { Clock } from 'lucide-react';

function ExpiredScreen() {
  const handlePaidClick = () => {
    alert('Envía tu comprobante a rznavarrojb977@gmail.com');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 text-center border border-gray-700">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <Clock className="w-16 h-16 text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Your trial period has expired
        </h1>

        <p className="text-lg text-gray-300 mb-8">
          To continue using Dashboard Pro, send your $20 USD payment
        </p>

        <div className="bg-gradient-to-r from-purple-50 to-amber-50 border-2 border-purple-200 rounded-xl p-6 mb-8">
          <p className="text-sm text-gray-600 mb-2">Send payment to:</p>
          <p className="text-2xl font-bold text-purple-800 mb-1">PayPal</p>
          <p className="text-lg text-gray-800 font-mono break-all">
            rznavarrojb977@gmail.com
          </p>
        </div>

        <button
          onClick={handlePaidClick}
          className="w-full max-w-md mx-auto bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white font-semibold text-lg py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          I already paid
        </button>

        <p className="text-sm text-gray-400 mt-6">
          Once payment is made, send your receipt to the indicated email to activate your full access
        </p>
      </div>
    </div>
  );
}

export default ExpiredScreen;
