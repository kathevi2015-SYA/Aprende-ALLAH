import React, { useEffect, useState } from 'react';
import { getDailyWisdom } from '../services/geminiService';
import { GeneratedContent } from '../types';
import { RefreshCw, Play, Loader2 } from 'lucide-react';

const LearnAllah: React.FC = () => {
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const data = await getDailyWisdom();
    setContent(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // Simulate audio playing interaction
    setTimeout(() => setIsPlaying(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-purple-300">
        <div className="bg-purple-500 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
          <h1 className="text-4xl font-bold relative z-10">Aprende Allah</h1>
          <p className="text-purple-100 mt-2 relative z-10">Una perla de sabiduría cada día</p>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-purple-400">
              <Loader2 className="w-12 h-12 animate-spin mb-4" />
              <p className="text-xl">Consultando el libro de la sabiduría...</p>
            </div>
          ) : content ? (
            <div className="space-y-8 text-center">
              <div className="bg-purple-50 p-6 rounded-2xl border-2 border-dashed border-purple-200">
                <h2 className="text-3xl font-bold text-purple-800 mb-4 font-[Fredoka]">{content.title}</h2>
                <p className="text-4xl font-serif text-gray-800 mb-4 leading-relaxed" dir="rtl">{content.arabic}</p>
                <p className="text-lg text-gray-600 italic mb-6">"{content.translation}"</p>
                
                <div className="flex justify-center">
                  <button 
                    onClick={toggleAudio}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors ${
                      isPlaying ? 'bg-green-500 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    }`}
                  >
                    <Play className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} fill="currentColor" />
                    {isPlaying ? 'Escuchando...' : 'Escuchar Recitación'}
                  </button>
                  {/* Hidden audio element placeholder */}
                  <audio id="quran-audio" src="https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/001.mp3" ref={(el) => isPlaying && el?.play()} />
                </div>
              </div>

              <div className="bg-sky-50 p-6 rounded-2xl text-left relative">
                 <div className="absolute -top-4 left-6 bg-sky-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                   Explicación para niños
                 </div>
                 <p className="text-xl text-slate-700 leading-8 mt-4">{content.content}</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-red-500">Error al cargar el contenido.</div>
          )}
        </div>

        <div className="bg-gray-50 p-4 flex justify-center border-t border-gray-100">
          <button 
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 text-purple-600 font-bold hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            Nueva Enseñanza
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnAllah;
