import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Grip, HelpCircle, Trophy, Cookie } from 'lucide-react';

const Games: React.FC = () => {
  const games = [
    { path: '/juegos/laberinto', title: 'Laberinto de los Pilares', icon: <Grip className="w-10 h-10" />, color: 'bg-amber-500', desc: '5 niveles para completar los 5 pilares.' },
    { path: '/juegos/puntos', title: 'Une los Puntos', icon: <Gamepad2 className="w-10 h-10" />, color: 'bg-indigo-500', desc: 'Crea símbolos islámicos.' },
    { path: '/juegos/trivia', title: 'Trivia de la Fe', icon: <HelpCircle className="w-10 h-10" />, color: 'bg-pink-500', desc: '¿Cuánto sabes sobre el Islam?' },
    { path: '/juegos/galletas', title: 'Come Galletas', icon: <Cookie className="w-10 h-10" />, color: 'bg-emerald-500', desc: 'Recoge buenas acciones.' },
    { path: '/juegos/adivinanzas', title: 'Adivinanzas', icon: <Trophy className="w-10 h-10" />, color: 'bg-orange-500', desc: 'Desafía tu mente.' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold text-center text-orange-500 mb-12">Zona de Juegos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link 
            key={game.path} 
            to={game.path}
            className={`${game.color} block p-6 rounded-3xl shadow-xl hover:scale-105 transition-transform text-white group relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
               <div className="p-3 bg-white/20 rounded-2xl">
                {game.icon}
               </div>
            </div>
            <h3 className="text-2xl font-bold mb-2 relative z-10">{game.title}</h3>
            <p className="text-white/80 relative z-10">{game.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Games;
