import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shirt, Utensils, Droplets, BookOpen, Star, Heart, CheckCircle, AlertCircle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

type Room = 'BEDROOM' | 'KITCHEN' | 'BATHROOM' | 'MOSQUE';
type Outfit = 'CASUAL' | 'SUNNAH';

const IsmiGame: React.FC = () => {
  const [room, setRoom] = useState<Room>('BEDROOM');
  const [stats, setStats] = useState({
    happiness: 50,
    hunger: 50, // 100 is full
    hygiene: 50,
    iman: 50
  });
  const [outfit, setOutfit] = useState<Outfit>('CASUAL');
  const [message, setMessage] = useState("¡Salam! Soy Ismi. Cuídame y enséñame.");
  const [wuduStep, setWuduStep] = useState(0);
  const [duaState, setDuaState] = useState<'NONE' | 'ENTER' | 'EXIT'>('NONE');

  // Generate consistent-ish avatar based on state
  const getAvatarUrl = () => {
    const basePrompt = "cute cartoon muslim boy character chibi style happy friendly";
    const outfitPrompt = outfit === 'SUNNAH' ? "wearing white thobe and kufi cap" : "wearing colorful t-shirt and jeans";
    const roomContext = 
      room === 'BEDROOM' ? "in cozy bedroom" :
      room === 'KITCHEN' ? "eating in kitchen" :
      room === 'BATHROOM' ? "washing in bathroom sink clean water" :
      "reading quran in beautiful mosque";
    
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(`${basePrompt} ${outfitPrompt} ${roomContext} flat vector illustration`)}?width=400&height=400&nologo=true`;
  };

  const updateStat = (stat: keyof typeof stats, amount: number) => {
    setStats(prev => ({
      ...prev,
      [stat]: Math.min(100, Math.max(0, prev[stat] + amount))
    }));
  };

  const showFeedback = (msg: string) => {
    setMessage(msg);
    // Reset after 3 seconds
    // setTimeout(() => setMessage("..."), 3000);
  };

  // --- ROOM ACTIONS ---

  // Bedroom: Change Clothes
  const toggleOutfit = () => {
    const newOutfit = outfit === 'CASUAL' ? 'SUNNAH' : 'CASUAL';
    setOutfit(newOutfit);
    updateStat('happiness', 10);
    showFeedback(newOutfit === 'SUNNAH' 
      ? "¡Mashallah! Me veo muy bien con ropa Sunnah." 
      : "Ropa cómoda para jugar.");
  };

  // Kitchen: Eat
  const [hasSaidBismillah, setHasSaidBismillah] = useState(false);
  
  const eatFood = (type: 'HALAL' | 'HARAM') => {
    if (!hasSaidBismillah) {
      showFeedback("¡Espera! ¿Qué decimos antes de comer?");
      return;
    }

    if (type === 'HALAL') {
      updateStat('hunger', 30);
      updateStat('happiness', 10);
      setHasSaidBismillah(false);
      showFeedback("¡Alhamdulillah! Estaba delicioso y es Halal.");
    } else {
      updateStat('happiness', -10);
      showFeedback("¡Astaghfirullah! Eso no es Halal. No debo comerlo.");
    }
  };

  // Bathroom: Wudu & Duas
  const wuduSequence = [
    { name: "Manos", icon: "👐" },
    { name: "Boca y Nariz", icon: "👄" },
    { name: "Cara", icon: "😊" },
    { name: "Brazos", icon: "💪" },
    { name: "Cabeza", icon: "💆" },
    { name: "Pies", icon: "🦶" }
  ];

  const handleWuduClick = (index: number) => {
    if (duaState !== 'ENTER') {
       showFeedback("Primero debes entrar al baño con la Dua correcta.");
       return;
    }

    if (index === wuduStep) {
      if (index === wuduSequence.length - 1) {
        updateStat('hygiene', 100);
        updateStat('iman', 20);
        setWuduStep(0);
        showFeedback("¡Wudu completado perfectamente!");
      } else {
        setWuduStep(prev => prev + 1);
        showFeedback(`Bien, ahora lava: ${wuduSequence[index + 1].name}`);
      }
    } else {
      showFeedback("Ese no es el orden correcto. Intenta de nuevo.");
      setWuduStep(0);
    }
  };

  const bathroomDua = (type: 'ENTER' | 'EXIT') => {
    if (type === 'ENTER') {
      setDuaState('ENTER');
      showFeedback("Dua entrada: 'Allahumma inni a'udhu bika minal khubuthi wal khaba'ith'.");
    } else {
      if (wuduStep !== 0) {
        showFeedback("Termina tu Wudu primero.");
        return;
      }
      setDuaState('EXIT');
      showFeedback("Dua salida: 'Ghufranaka'. ¡Tus pecados caen con el agua!");
    }
  };

  // Mosque: Quran
  const readQuran = () => {
    if (stats.hygiene < 50) {
      showFeedback("Debería hacer Wudu antes de tocar el Corán.");
      return;
    }
    updateStat('iman', 30);
    updateStat('happiness', 20);
    showFeedback("Recitar las palabras de Allah llena mi corazón de luz.");
  };

  return (
    <div className="min-h-screen bg-sky-100 font-[Fredoka] py-6 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/juegos" className="bg-white p-2 rounded-full shadow-sm text-sky-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-sky-700">Ismi, mi Amigo</h1>
          <div className="w-10"></div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-md mb-6 grid grid-cols-4 gap-2 text-center text-xs font-bold">
           <div className="flex flex-col items-center text-pink-500">
             <Heart className="w-5 h-5 mb-1 fill-current" />
             {stats.happiness}%
           </div>
           <div className="flex flex-col items-center text-orange-500">
             <Utensils className="w-5 h-5 mb-1" />
             {stats.hunger}%
           </div>
           <div className="flex flex-col items-center text-blue-500">
             <Droplets className="w-5 h-5 mb-1 fill-current" />
             {stats.hygiene}%
           </div>
           <div className="flex flex-col items-center text-purple-500">
             <Star className="w-5 h-5 mb-1 fill-current" />
             {stats.iman}%
           </div>
        </div>

        {/* Main View (Avatar) */}
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl border-4 border-sky-200 relative aspect-square mb-6">
           <img 
             src={getAvatarUrl()} 
             alt="Ismi Avatar" 
             className="w-full h-full object-cover"
           />
           
           {/* Message Bubble */}
           <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg border-2 border-sky-100">
             <p className="text-sky-800 text-center font-medium">{message}</p>
           </div>
        </div>

        {/* Room Navigation */}
        <div className="flex justify-between bg-white p-2 rounded-full shadow-md mb-6">
           {[
             { id: 'BEDROOM', icon: <Shirt className="w-5 h-5"/>, color: 'text-pink-500' },
             { id: 'KITCHEN', icon: <Utensils className="w-5 h-5"/>, color: 'text-orange-500' },
             { id: 'BATHROOM', icon: <Droplets className="w-5 h-5"/>, color: 'text-blue-500' },
             { id: 'MOSQUE', icon: <BookOpen className="w-5 h-5"/>, color: 'text-purple-500' },
           ].map((r) => (
             <button
               key={r.id}
               onClick={() => {
                 setRoom(r.id as Room);
                 setMessage("¿Qué hacemos ahora?");
                 setWuduStep(0);
               }}
               className={`p-3 rounded-full transition-colors ${
                 room === r.id ? 'bg-sky-100 ' + r.color : 'text-gray-400 hover:text-gray-600'
               }`}
             >
               {r.icon}
             </button>
           ))}
        </div>

        {/* Action Area */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-gray-100 min-h-[200px]">
          
          {/* BEDROOM ACTIONS */}
          {room === 'BEDROOM' && (
            <div className="text-center">
              <h3 className="text-xl font-bold text-pink-500 mb-4">Vestidor</h3>
              <button 
                onClick={toggleOutfit}
                className="bg-pink-100 text-pink-600 px-6 py-3 rounded-xl font-bold hover:bg-pink-200 transition-colors flex items-center gap-2 mx-auto"
              >
                <Shirt className="w-6 h-6" />
                Cambiar Ropa ({outfit === 'CASUAL' ? 'Casual' : 'Sunnah'})
              </button>
              <p className="mt-4 text-gray-500 text-sm">Viste a Ismi con ropa modesta y limpia.</p>
            </div>
          )}

          {/* KITCHEN ACTIONS */}
          {room === 'KITCHEN' && (
            <div className="text-center">
              <h3 className="text-xl font-bold text-orange-500 mb-4">Hora de Comer</h3>
              
              {!hasSaidBismillah ? (
                <button 
                  onClick={() => {
                    setHasSaidBismillah(true);
                    showFeedback("¡Bismillah! (En el nombre de Allah)");
                  }}
                  className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg animate-pulse"
                >
                  Decir "Bismillah"
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => eatFood('HALAL')} className="bg-green-100 p-4 rounded-xl border-2 border-green-300 hover:bg-green-200">
                    <span className="text-4xl block mb-2">🍎</span>
                    <span className="font-bold text-green-700">Manzana</span>
                  </button>
                  <button onClick={() => eatFood('HARAM')} className="bg-red-100 p-4 rounded-xl border-2 border-red-300 hover:bg-red-200">
                    <span className="text-4xl block mb-2">🥓</span>
                    <span className="font-bold text-red-700">Tocino</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* BATHROOM ACTIONS */}
          {room === 'BATHROOM' && (
            <div className="text-center">
               <h3 className="text-xl font-bold text-blue-500 mb-2">Wudu y Limpieza</h3>
               
               {duaState === 'NONE' && (
                 <button onClick={() => bathroomDua('ENTER')} className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
                   Entrar (Dua)
                 </button>
               )}

               <div className="grid grid-cols-3 gap-2 mb-4">
                 {wuduSequence.map((step, idx) => (
                   <button
                     key={idx}
                     onClick={() => handleWuduClick(idx)}
                     disabled={wuduStep > idx || duaState !== 'ENTER'} // Can revisit logic
                     className={`p-2 rounded-lg border-2 ${
                       idx < wuduStep ? 'bg-green-100 border-green-300 opacity-50' : 
                       idx === wuduStep ? 'bg-white border-blue-500 animate-bounce' :
                       'bg-gray-50 border-gray-200'
                     }`}
                   >
                     <div className="text-2xl">{step.icon}</div>
                     <div className="text-[10px] font-bold text-gray-600">{step.name}</div>
                   </button>
                 ))}
               </div>

               {wuduStep === 0 && duaState === 'ENTER' && (
                  <p className="text-xs text-gray-500 mb-4">Toca los iconos en orden para hacer Wudu</p>
               )}

               {duaState === 'ENTER' && (
                 <button onClick={() => bathroomDua('EXIT')} className="bg-gray-500 text-white px-6 py-2 rounded-full font-bold text-sm">
                   Salir (Dua)
                 </button>
               )}
            </div>
          )}

          {/* MOSQUE ACTIONS */}
          {room === 'MOSQUE' && (
            <div className="text-center">
              <h3 className="text-xl font-bold text-purple-500 mb-4">Rincón de Oración</h3>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={readQuran}
                  className="bg-purple-100 text-purple-700 px-6 py-4 rounded-xl font-bold hover:bg-purple-200 transition-colors flex items-center justify-center gap-3"
                >
                  <BookOpen className="w-6 h-6" />
                  Leer Corán
                </button>
                <button 
                  onClick={() => {
                    if(stats.hygiene < 50) showFeedback("¡Wudu primero!");
                    else {
                      updateStat('iman', 10);
                      showFeedback("Allah escucha tus oraciones.");
                    }
                  }}
                  className="bg-emerald-100 text-emerald-700 px-6 py-4 rounded-xl font-bold hover:bg-emerald-200 transition-colors flex items-center justify-center gap-3"
                >
                  <Star className="w-6 h-6" />
                  Hacer Dua
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IsmiGame;
