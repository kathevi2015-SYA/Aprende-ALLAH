import React, { useState } from 'react';
import { PROPHETS } from '../constants';
import { getProphetStory } from '../services/geminiService';
import { GeneratedContent, Prophet } from '../types';
import { Book, ChevronRight, X, Loader2 } from 'lucide-react';

const ProphetStories: React.FC = () => {
  const [selectedProphet, setSelectedProphet] = useState<Prophet | null>(null);
  const [story, setStory] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(false);

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-emerald-700 mb-4">Historias de los Profetas</h1>
        <p className="text-xl text-gray-600">Descubre la vida de los 25 profetas mencionados en el Sagrado Corán.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {PROPHETS.map((prophet) => (
          <button
            key={prophet.id}
            onClick={() => handleSelectProphet(prophet)}
            className="bg-white border-l-4 border-emerald-400 p-4 rounded-r-xl shadow-md hover:shadow-xl hover:scale-105 transition-all flex justify-between items-center group text-left"
          >
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Profeta #{prophet.id}</span>
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600">{prophet.name}</h3>
            </div>
            <div className="bg-emerald-50 rounded-full p-2 group-hover:bg-emerald-500 transition-colors">
              <Book className="w-4 h-4 text-emerald-500 group-hover:text-white" />
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedProphet && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl animate-fade-in-up">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-emerald-100 p-3 rounded-2xl">
                   <Book className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-emerald-800">{selectedProphet.name}</h2>
                  <p className="text-emerald-600">La paz sea con él</p>
                </div>
              </div>

              {loading ? (
                <div className="flex flex-col items-center py-12 text-emerald-600">
                  <Loader2 className="w-12 h-12 animate-spin mb-4" />
                  <p>Buscando la historia en la biblioteca...</p>
                </div>
              ) : story ? (
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{story.title}</h3>
                  <div className="text-gray-600 leading-relaxed space-y-4 whitespace-pre-line">
                    {story.content}
                  </div>
                </div>
              ) : (
                 <p>No se pudo cargar la historia.</p>
              )}
            </div>
            
            <div className="bg-emerald-50 p-6 text-center rounded-b-3xl">
               <button onClick={closeModal} className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-colors shadow-lg">
                 Cerrar Libro
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProphetStories;
