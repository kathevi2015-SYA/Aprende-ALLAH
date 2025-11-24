import React, { useState, useEffect, useRef } from 'react';
import { getIslamicContent, generateSpeech } from '../services/geminiService';
import { GeneratedContent } from '../types';
import { RefreshCw, Play, Loader2, Heart, Book, Hand, Smile, Mic, BookOpen, FlaskConical, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';

// Categories Configuration
const CATEGORIES = [
  { id: 'WISDOM', label: 'Sabiduría Diaria', icon: <BookOpen className="w-8 h-8" />, color: 'bg-purple-500', desc: 'Hadices y Suras' },
  { id: 'LOVE_PROPHET', label: 'Amor al Profeta (SAW)', icon: <Heart className="w-8 h-8" />, color: 'bg-pink-500', desc: 'Historias para amarlo' },
  { id: 'DUA_ADAB', label: 'Dua y Modales', icon: <Hand className="w-8 h-8" />, color: 'bg-emerald-500', desc: 'Súplicas y etiqueta' },
  { id: 'AKHLAQ', label: 'Buen Carácter', icon: <Smile className="w-8 h-8" />, color: 'bg-orange-500', desc: 'Akhlaq y valores' },
  { id: 'QURAN_LIB', label: 'Biblioteca Coránica', icon: <Book className="w-8 h-8" />, color: 'bg-blue-500', desc: 'Secretos del Corán' },
  { id: 'TAJWEED', label: 'Tajweed y Recitación', icon: <Mic className="w-8 h-8" />, color: 'bg-teal-500', desc: 'Aprende a recitar' },
  { id: 'SEERAH', label: 'Vida de Muhammad', icon: <BookOpen className="w-8 h-8" />, color: 'bg-indigo-500', desc: 'Su biografía' },
  { id: 'SCIENCE', label: 'Ciencia e Islam', icon: <FlaskConical className="w-8 h-8" />, color: 'bg-cyan-500', desc: 'Descubrimientos' },
];

// Audio Decoding Helpers for PCM Data (Gemini 2.5 TTS)
const decodeBase64 = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

const decodeAudioData = async (
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1
): Promise<AudioBuffer> => {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
};

const LearnAllah: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Helper to get animated illustration URL
  const getAnimatedImageUrl = (prompt: string) => {
    return `https://image.pollinations.ai/prompt/cute%202d%20cartoon%20animation%20style%20illustration%20for%20kids%20islamic%20educational%20${encodeURIComponent(prompt)}%20colorful%20flat%20design%20no%20text?width=600&height=400&nologo=true`;
  };

  const stopAudio = () => {
    if (audioSourceRef.current) {
      try {
        audioSourceRef.current.stop();
      } catch (e) {
        // Ignore if already stopped
      }
      audioSourceRef.current = null;
    }
    setIsPlaying(false);
  };

  const playSpeech = async (text: string) => {
    stopAudio();
    setAudioLoading(true);

    try {
      const base64Audio = await generateSpeech(text);
      if (base64Audio) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }

        // Resume if suspended (browser policy)
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        const pcmBytes = decodeBase64(base64Audio);
        const audioBuffer = await decodeAudioData(pcmBytes, audioContextRef.current);
        
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);
        source.onended = () => setIsPlaying(false);
        
        audioSourceRef.current = source;
        source.start();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Failed to play audio", error);
    } finally {
      setAudioLoading(false);
    }
  };

  const fetchContent = async (categoryId: string) => {
    stopAudio();
    setLoading(true);
    setContent(null);
    
    const data = await getIslamicContent(categoryId);
    setContent(data);
    setLoading(false);

    // Auto-play narrative when content loads
    if (data && data.content) {
      // Small delay to allow UI to render first
      setTimeout(() => {
         playSpeech(data.content);
      }, 500);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    fetchContent(categoryId);
  };

  const handleBack = () => {
    stopAudio();
    setSelectedCategory(null);
    setContent(null);
  };

  const activeCategoryData = CATEGORIES.find(c => c.id === selectedCategory);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // --- VIEW: Category Selection (Menu) ---
  if (!selectedCategory) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-bold mb-8 transition-colors bg-white px-4 py-2 rounded-full shadow-sm">
          <ArrowLeft className="w-5 h-5" /> Volver al Inicio
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-sky-600 mb-4 font-[Fredoka]">Aprende Allah</h1>
          <p className="text-xl text-gray-600">Elige un camino para aumentar tu conocimiento</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`${cat.color} text-white p-6 rounded-[2rem] shadow-xl hover:scale-105 transition-transform text-left group relative overflow-hidden min-h-[180px] flex flex-col justify-between`}
            >
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm mb-4">
                {cat.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold font-[Fredoka] leading-tight mb-1">{cat.label}</h3>
                <p className="text-white/80 text-sm font-medium">{cat.desc}</p>
              </div>
              <div className="absolute -bottom-4 -right-4 opacity-20 rotate-12 transform scale-150">
                 {cat.icon}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // --- VIEW: Content Display ---
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={handleBack}
          className="bg-white p-3 rounded-full shadow-md text-gray-600 hover:text-sky-600 transition-colors flex items-center gap-2 font-bold px-6"
        >
          <ArrowLeft className="w-6 h-6" /> Volver al Menú
        </button>
        <div className={`flex items-center gap-3 px-6 py-2 rounded-full text-white font-bold ${activeCategoryData?.color}`}>
          {activeCategoryData?.icon}
          {activeCategoryData?.label}
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-sky-100 min-h-[500px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[500px] text-sky-400 animate-pulse">
            <Loader2 className="w-16 h-16 animate-spin mb-6" />
            <p className="text-2xl font-[Fredoka]">Consultando el libro del saber...</p>
          </div>
        ) : content ? (
          <div className="flex flex-col">
            {/* Generated Animated Image */}
            <div className="w-full h-64 md:h-80 bg-gray-100 relative overflow-hidden group">
               <img 
                 src={getAnimatedImageUrl(content.imagePrompt || `${selectedCategory} islamic illustration`)} 
                 alt="Dibujo animado educativo"
                 className="w-full h-full object-cover"
               />
               <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/50 to-transparent p-6 flex justify-between items-end">
                 <span className="bg-white/90 text-sky-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                   Generado para ti
                 </span>
                 
                 {/* Audio Control Overlay */}
                 <button 
                    onClick={() => isPlaying ? stopAudio() : playSpeech(content.content)}
                    disabled={audioLoading}
                    className={`p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 flex items-center gap-2 font-bold ${
                      isPlaying ? 'bg-red-500 text-white' : 'bg-sky-500 text-white'
                    } ${audioLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                 >
                    {audioLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : isPlaying ? (
                      <>
                        <VolumeX className="w-6 h-6" /> Detener Narración
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-6 h-6" /> Narrar Historia
                      </>
                    )}
                 </button>
               </div>
            </div>

            <div className="p-8 md:p-10 relative">
              {/* Arabic Section (if applicable) */}
              {content.arabic && (
                <div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-100 text-center mb-8 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-200 text-amber-800 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Original
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4 leading-relaxed drop-shadow-sm" dir="rtl">
                    {content.arabic}
                  </h2>
                  {content.translation && (
                    <p className="text-lg text-gray-500 italic">"{content.translation}"</p>
                  )}
                </div>
              )}

              <h2 className="text-4xl font-bold text-gray-800 mb-6 font-[Fredoka] leading-tight">
                {content.title}
              </h2>
              
              <div className="prose prose-lg prose-sky max-w-none text-gray-600 leading-loose">
                 {content.content.split('\n').map((paragraph, idx) => (
                    paragraph.trim() && <p key={idx} className="mb-4">{paragraph}</p>
                 ))}
              </div>
            </div>
            
            {/* Footer Action */}
            <div className="bg-gray-50 p-6 border-t border-gray-100 flex justify-center">
              <button 
                onClick={() => fetchContent(selectedCategory!)}
                className="flex items-center gap-3 bg-sky-500 hover:bg-sky-600 text-white text-lg px-8 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <RefreshCw className="w-6 h-6" />
                ¡Enséñame algo más!
              </button>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-red-400">
            <p>No se pudo cargar el contenido. Intenta de nuevo.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnAllah;