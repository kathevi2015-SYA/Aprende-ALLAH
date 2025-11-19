import React, { useState } from 'react';
import { PROPHETS } from '../constants';
import { getProphetStory } from '../services/geminiService';
import { GeneratedContent, Prophet } from '../types';
import { BookOpen, X, Loader2, Sparkles } from 'lucide-react';

const ProphetStories: React.FC = () => {
  const [selectedProphet, setSelectedProphet] = useState<Prophet | null>(null);
  const [story, setStory] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(false);

  // Helper function to generate a safe, illustrated image URL based on the prompt
  const getIllustrationUrl = (prompt: string) => {
    // Using Pollinations AI for on-the-fly generated illustrations that are safe and cartoon-style
    // Added 'no people' and specific art style to prompt
    return `https://image.pollinations.ai/prompt/cute%20watercolor%20illustration%20children%20book%20style%20of%20${encodeURIComponent(prompt)}%20no%20people%20soft%20colors?width=800&height=600&nologo=true`;
  };

  const handleSelectProphet = async (prophet: Prophet) => {
    setSelectedProphet(prophet);
    setStory(null);
    setLoading(true);
    const data = await getProphetStory(prophet.name);
    setStory(data);
    setLoading(false);
  };

  const closeModal = () => {
    setSelectedProphet(null);
    setStory(null);
  };

  return (
    <div className="min-h-screen bg-emerald-50/50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold text-emerald-800 drop-shadow-sm">
            Historias de los Profetas
          </h1>
          <p className="text-xl text-emerald-600 max-w-2xl mx-auto">
            Viaja en el tiempo y descubre las increíbles vidas de los mensajeros de Allah. 
            Toca una tarjeta para abrir el libro de historias.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PROPHETS.map((prophet) => (
            <button
              key={prophet.id}
              onClick={() => handleSelectProphet(prophet)}
              className="group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden text-left hover:-translate-y-2"
            >
              {/* Image Placeholder / Header */}
              <div className="h-40 bg-emerald-100 overflow-hidden relative">
                 <img 
                   src={getIllustrationUrl(prophet.imagePrompt)} 
                   alt={prophet.name}
                   loading="lazy"
                   className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                 <div className="absolute bottom-3 left-4">
                    <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Profeta #{prophet.id}
                    </span>
                 </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
                    {prophet.name}
                   </h3>
                   <Sparkles className="w-5 h-5 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-gray-500">La paz sea con él</p>
                
                <div className="mt-4 flex items-center text-emerald-500 font-bold text-sm group-hover:translate-x-2 transition-transform">
                  Leer historia <BookOpen className="w-4 h-4 ml-1" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Story Modal */}
      {selectedProphet && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col md:flex-row">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-red-100 hover:text-red-500 transition-colors shadow-sm"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Side: Image */}
            <div className="md:w-2/5 h-64 md:h-auto bg-emerald-50 relative overflow-hidden">
               <img 
                  src={getIllustrationUrl(selectedProphet.imagePrompt)} 
                  alt="Ilustración de la historia"
                  className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent md:bg-gradient-to-r"></div>
               <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-3xl font-bold mb-1 drop-shadow-lg">{selectedProphet.name}</h2>
                  <p className="opacity-90 font-medium">(AS)</p>
               </div>
            </div>

            {/* Right Side: Content */}
            <div className="md:w-3/5 overflow-y-auto p-8 md:p-12 bg-white custom-scrollbar">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center text-emerald-600 space-y-4">
                  <Loader2 className="w-16 h-16 animate-spin" />
                  <p className="text-xl font-medium animate-pulse">Abriendo el libro de historias...</p>
                </div>
              ) : story ? (
                <div className="animate-fade-in-up">
                  <h3 className="text-3xl font-bold text-emerald-800 mb-6 font-[Fredoka] leading-tight">
                    {story.title}
                  </h3>
                  
                  <div className="prose prose-lg prose-emerald max-w-none">
                    <div className="text-gray-700 leading-relaxed space-y-6 font-[Nunito] text-lg">
                      {story.content.split('\n').map((paragraph, idx) => (
                        paragraph.trim() && <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12 pt-6 border-t-2 border-emerald-100 text-center">
                    <p className="text-emerald-600 italic font-medium">
                      "Ciertamente, en sus historias hay una enseñanza para los dotados de intelecto."
                    </p>
                    <span className="text-sm text-emerald-400 block mt-1">(Corán 12:111)</span>
                  </div>
                </div>
              ) : (
                 <div className="flex items-center justify-center h-full text-red-400">
                   <p>No se pudo cargar la historia. Inténtalo de nuevo.</p>
                 </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProphetStories;