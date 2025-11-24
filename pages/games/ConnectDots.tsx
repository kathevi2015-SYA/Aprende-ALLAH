import React, { useState } from 'react';
import { DOTS_LEVELS } from '../../constants';
import { Trophy, RefreshCw, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConnectDots: React.FC = () => {
  const [levelIndex, setLevelIndex] = useState(0);
  const [nextDot, setNextDot] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [lines, setLines] = useState<{x1:number, y1:number, x2:number, y2:number}[]>([]);

  const currentLevel = DOTS_LEVELS[levelIndex];
  const points = currentLevel.points;

  const handleDotClick = (id: number) => {
    if (id === nextDot) {
      if (id > 1) {
         // Draw line from previous dot
         const prev = points[id - 2]; // id is 1-based, index is 0-based
         const current = points[id - 1];
         setLines([...lines, { x1: prev.x, y1: prev.y, x2: current.x, y2: current.y }]);
      }

      if (id === points.length) {
        setCompleted(true);
      } else {
        setNextDot(id + 1);
      }
    }
  };

  const resetLevel = () => {
    setNextDot(1);
    setCompleted(false);
    setLines([]);
  };

  const nextLevel = () => {
    if (levelIndex < DOTS_LEVELS.length - 1) {
      setLevelIndex(levelIndex + 1);
      resetLevel();
    }
  };

  const restartGame = () => {
    setLevelIndex(0);
    resetLevel();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-center">
      <div className="text-left mb-4">
        <Link to="/juegos" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold transition-colors">
          <ArrowLeft className="w-5 h-5" /> Volver a Juegos
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">Une los Puntos</h1>
        <div className="inline-block bg-indigo-100 px-4 py-1 rounded-full text-indigo-800 font-bold text-sm mb-4">
           Nivel {levelIndex + 1}: {currentLevel.name}
        </div>
        <p className="text-gray-600">Haz clic en los números en orden (1, 2, 3...) para descubrir la figura.</p>
      </div>

      <div className="relative w-[320px] h-[320px] mx-auto bg-white rounded-3xl shadow-xl border-4 border-indigo-200 overflow-hidden">
        {/* Canvas Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
        </div>

        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
          {lines.map((line, i) => (
            <line 
              key={i} 
              x1={`${line.x1}%`} 
              y1={`${line.y1}%`} 
              x2={`${line.x2}%`} 
              y2={`${line.y2}%`} 
              stroke="#6366f1" 
              strokeWidth="4" 
              strokeLinecap="round"
              className="animate-draw"
            />
          ))}
        </svg>

        {points.map((dot) => (
          <button
            key={dot.id}
            onClick={() => handleDotClick(dot.id)}
            disabled={completed || (dot.id !== nextDot && dot.id < nextDot)}
            className={`absolute w-10 h-10 -ml-5 -mt-5 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-all z-20 shadow-sm
              ${dot.id < nextDot ? 'bg-indigo-500 text-white border-indigo-600' : 'bg-white text-indigo-600 border-indigo-300 hover:scale-110'}
              ${dot.id === nextDot ? 'animate-bounce ring-4 ring-indigo-200 scale-110' : ''}
            `}
            style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
          >
            {dot.id}
          </button>
        ))}

        {completed && (
           <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-3xl z-30 animate-fade-in">
             <div className="text-center p-6">
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-2 animate-bounce" />
                <h2 className="text-3xl font-bold text-indigo-800 mb-2">¡Excelente!</h2>
                <p className="text-indigo-600 font-bold text-xl mb-6">Es {currentLevel.name}</p>
                
                {levelIndex < DOTS_LEVELS.length - 1 ? (
                  <button onClick={nextLevel} className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
                    Siguiente Nivel <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <div>
                     <p className="text-lg text-gray-600 mb-4">¡Has completado todos los dibujos!</p>
                     <button onClick={restartGame} className="bg-indigo-500 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-600">
                       Volver a Jugar
                     </button>
                  </div>
                )}
             </div>
           </div>
        )}
      </div>

      <div className="mt-8">
        <button onClick={resetLevel} className="text-gray-400 hover:text-indigo-500 flex items-center gap-2 mx-auto transition-colors">
           <RefreshCw className="w-4 h-4" /> Reiniciar Dibujo
        </button>
      </div>
    </div>
  );
};

export default ConnectDots;