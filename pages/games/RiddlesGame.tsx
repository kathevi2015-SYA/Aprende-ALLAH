import React, { useState, useEffect } from 'react';
import { getRiddle } from '../../services/geminiService';
import { HelpCircle, Eye, RefreshCw } from 'lucide-react';

const RiddlesGame: React.FC = () => {
  const [currentRiddle, setCurrentRiddle] = useState<{riddle: string, answer: string} | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchRiddle = async () => {
    setLoading(true);
    setShowAnswer(false);
    const data = await getRiddle();
    setCurrentRiddle(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRiddle();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-orange-500 mb-8">Adivina Adivinador</h1>

      <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-orange-200 relative">
         <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-orange-500 p-4 rounded-full border-4 border-white shadow-lg">
            <HelpCircle className="w-10 h-10 text-white" />
         </div>

         <div className="mt-8 min-h-[150px] flex items-center justify-center">
            {loading ? (
              <p className="text-gray-400 animate-pulse">Pensando una adivinanza...</p>
            ) : (
              <p className="text-2xl font-bold text-gray-700">{currentRiddle?.riddle}</p>
            )}
         </div>

         <div className="mt-8 p-6 bg-orange-50 rounded-2xl">
            {showAnswer ? (
              <div>
                <p className="text-sm text-orange-400 uppercase font-bold mb-2">La respuesta es:</p>
                <p className="text-3xl font-extrabold text-orange-600 animate-bounce">{currentRiddle?.answer}</p>
              </div>
            ) : (
              <button 
                onClick={() => setShowAnswer(true)}
                disabled={loading}
                className="flex items-center gap-2 mx-auto text-orange-500 font-bold hover:text-orange-600"
              >
                <Eye className="w-5 h-5" /> Ver Respuesta
              </button>
            )}
         </div>
      </div>

      <button 
        onClick={fetchRiddle}
        disabled={loading}
        className="mt-8 bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
      >
        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        Otra Adivinanza
      </button>
    </div>
  );
};

export default RiddlesGame;
