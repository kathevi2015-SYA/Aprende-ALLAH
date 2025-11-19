import React, { useState } from 'react';
import { DOTS_DATA } from '../../constants';

const ConnectDots: React.FC = () => {
  const [nextDot, setNextDot] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [lines, setLines] = useState<{x1:number, y1:number, x2:number, y2:number}[]>([]);

  const handleDotClick = (id: number) => {
    if (id === nextDot) {
      if (id > 1) {
         // Draw line from previous dot
         const prev = DOTS_DATA[id - 2]; // id is 1-based
         const current = DOTS_DATA[id - 1];
         setLines([...lines, { x1: prev.x, y1: prev.y, x2: current.x, y2: current.y }]);
      }

      if (id === DOTS_DATA.length) {
        setCompleted(true);
      } else {
        setNextDot(id + 1);
      }
    }
  };

  const reset = () => {
    setNextDot(1);
    setCompleted(false);
    setLines([]);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Une los Puntos</h1>
      <p className="mb-8 text-gray-600">Haz clic en los números en orden para revelar el símbolo.</p>

      <div className="relative w-[300px] h-[300px] mx-auto bg-indigo-50 rounded-3xl shadow-inner border-4 border-indigo-200">
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
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
            />
          ))}
        </svg>

        {DOTS_DATA.map((dot) => (
          <button
            key={dot.id}
            onClick={() => handleDotClick(dot.id)}
            disabled={completed || dot.id !== nextDot && dot.id < nextDot}
            className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
              ${dot.id < nextDot ? 'bg-indigo-500 text-white border-indigo-600' : 'bg-white text-indigo-600 border-indigo-300 hover:scale-110'}
              ${dot.id === nextDot ? 'animate-bounce ring-4 ring-indigo-200' : ''}
            `}
            style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
          >
            {dot.id}
          </button>
        ))}

        {completed && (
           <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-3xl">
             <div className="text-center">
                <h2 className="text-3xl font-bold text-indigo-600 mb-2">¡Una Estrella!</h2>
                <button onClick={reset} className="bg-indigo-500 text-white px-6 py-2 rounded-full">Jugar otra vez</button>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default ConnectDots;
