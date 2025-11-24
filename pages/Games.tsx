
import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Grip, HelpCircle, Trophy, Cookie, Sword, ArrowLeft, Smile, Puzzle, Activity } from 'lucide-react';

const Games: React.FC = () => {
  const games = [
    { 
      path: '/juegos/laberinto', 
      title: 'Laberinto de los Pilares', 
      icon: <Grip className="w-10 h-10" />, 
      color: 'bg-amber-500', 
      desc: '5 niveles para completar los 5 pilares.' 
    },
    { 
      path: '/juegos/carrera', 
      title: 'Carrera a la Mezquita', 
      icon: <Activity className="w-10 h-10" />, 
      color: 'bg-indigo-500', 
      desc: 'Corre, esquiva lo Haram y llega a la oración.',
      isNew: true
    },
    { 
      path: '/juegos/trivia', 
      title: 'Trivia de la Fe', 
      icon: <HelpCircle className="w-10 h-10" />, 
      color: 'bg-pink-500', 
      desc: '¿Cuánto sabes sobre el Islam?' 
    },
    { 
      path: '/juegos/galletas', 
      title: 'Cazador de Halal', 
      icon: <Cookie className="w-10 h-10" />, 
      color: 'bg-emerald-500', 
      desc: 'Recoge buenas acciones.' 
    },
    { 
      path: '/juegos/jihad', 
      title: 'Guerreros del Corazón', 
      icon: <Sword className="w-10 h-10" />, 
      color: 'bg-red-500', 
      desc: 'El Gran Esfuerzo contra los malos hábitos.'
    },
    { 
      path: '/juegos/ismi', 
      title: 'Ismi, mi Amigo', 
      icon: <Smile className="w-10 h-10" />, 
      color: 'bg-sky-500', 
      desc: 'Cuida, viste y enseña modales a tu amigo.',
      isNew: true
    },
    { 
      path: '/juegos/puzzle', 
      title: 'Rompecabezas', 
      icon: <Puzzle className="w-10 h-10" />, 
      color: 'bg-teal-500', 
      desc: 'Arma hermosas imágenes islámicas.',
      isNew: true
    },
    { 
      path: '/juegos/adivinanzas', 
      title: 'Adivinanzas', 
      icon: <Trophy className="w-10 h-10" />, 
      color: 'bg-orange-500', 
      desc: 'Desafía tu mente.' 
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-bold mb-8 transition-colors bg-white px-4 py-2 rounded-full shadow-sm">
        <ArrowLeft className="w-5 h-5" /> Volver al Inicio
      </Link>

      <h1 className="text-5xl font-bold text-center text-orange-500 mb-12 font-[Fredoka]">Zona de Juegos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link 
            key={game.path} 
            to={game.path}
            className={`${game.color} block p-6 rounded-3xl shadow-xl hover:scale-105 transition-transform text-white group relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
            
            {/* New Badge */}
            {game.isNew && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-red-600 text-xs font-black px-3 py-1 rounded-full shadow-lg rotate-12 animate-pulse z-20">
                ¡NUEVO!
              </div>
            )}

            <div className="flex items-center justify-between mb-4 relative z-10">
               <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                {game.icon}
               </div>
            </div>
            <h3 className="text-2xl font-bold mb-2 relative z-10 font-[Fredoka]">{game.title}</h3>
            <p className="text-white/90 relative z-10 font-medium leading-tight">{game.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Games;
