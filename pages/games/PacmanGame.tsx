import React, { useState, useEffect } from 'react';
import { Cookie, Smile } from 'lucide-react';

const GRID_SIZE = 10;

const PacmanGame: React.FC = () => {
  const [pos, setPos] = useState({x:0, y:0});
  const [score, setScore] = useState(0);
  const [cookiePos, setCookiePos] = useState({x: 5, y: 5});

  const placeCookie = () => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    setCookiePos({x, y});
  };

  const move = (dx: number, dy: number) => {
    const newX = Math.max(0, Math.min(GRID_SIZE - 1, pos.x + dx));
    const newY = Math.max(0, Math.min(GRID_SIZE - 1, pos.y + dy));
    
    setPos({x: newX, y: newY});

    if (newX === cookiePos.x && newY === cookiePos.y) {
      setScore(s => s + 1);
      placeCookie();
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if(e.key === 'ArrowUp') move(0, -1);
      if(e.key === 'ArrowDown') move(0, 1);
      if(e.key === 'ArrowLeft') move(-1, 0);
      if(e.key === 'ArrowRight') move(1, 0);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos, cookiePos]);

  return (
    <div className="max-w-md mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold text-emerald-600 mb-4">Come Galletas Halal</h1>
      <p className="mb-4 text-gray-600">Usa las flechas para recolectar las galletas.</p>
      
      <div className="text-2xl font-bold mb-4 bg-emerald-100 inline-block px-6 py-2 rounded-full">Score: {score}</div>

      <div 
        className="bg-gray-800 mx-auto relative rounded-lg shadow-2xl border-4 border-gray-600"
        style={{
          width: '300px',
          height: '300px',
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {Array.from({length: GRID_SIZE * GRID_SIZE}).map((_, i) => {
           const x = i % GRID_SIZE;
           const y = Math.floor(i / GRID_SIZE);
           const isPlayer = x === pos.x && y === pos.y;
           const isCookie = x === cookiePos.x && y === cookiePos.y;

           return (
             <div key={i} className="w-full h-full flex items-center justify-center">
                {isPlayer && <Smile className="text-yellow-400 w-6 h-6 fill-yellow-400" />}
                {isCookie && <Cookie className="text-orange-400 w-4 h-4" />}
                {!isPlayer && !isCookie && <div className="w-1 h-1 bg-gray-700 rounded-full" />}
             </div>
           );
        })}
      </div>

      {/* Mobile controls */}
      <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto mt-8">
        <div></div>
        <button onClick={() => move(0, -1)} className="bg-emerald-500 text-white p-4 rounded-xl">↑</button>
        <div></div>
        <button onClick={() => move(-1, 0)} className="bg-emerald-500 text-white p-4 rounded-xl">←</button>
        <button onClick={() => move(0, 1)} className="bg-emerald-500 text-white p-4 rounded-xl">↓</button>
        <button onClick={() => move(1, 0)} className="bg-emerald-500 text-white p-4 rounded-xl">→</button>
      </div>
    </div>
  );
};

export default PacmanGame;
