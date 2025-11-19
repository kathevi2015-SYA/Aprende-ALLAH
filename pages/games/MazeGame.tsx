import React, { useState, useEffect, useCallback } from 'react';
import { MAZE_LEVELS } from '../../constants';
import { ArrowDown, ArrowUp, ArrowLeft, ArrowRight, RefreshCcw, Star } from 'lucide-react';

const MazeGame: React.FC = () => {
  const [level, setLevel] = useState(0);
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [won, setWon] = useState(false);

  const currentMaze = MAZE_LEVELS[level];
  const pillars = ["Shahada (Fe)", "Salat (Oración)", "Zakat (Caridad)", "Sawm (Ayuno)", "Hajj (Peregrinación)"];

  const resetLevel = useCallback(() => {
    // Find start pos (2)
    for(let y=0; y<currentMaze.length; y++) {
      for(let x=0; x<currentMaze[y].length; x++) {
        if(currentMaze[y][x] === 2) {
          setPlayerPos({x, y});
          return;
        }
      }
    }
  }, [currentMaze]);

  useEffect(() => {
    resetLevel();
    setWon(false);
  }, [level, resetLevel]);

  const move = (dx: number, dy: number) => {
    if (won) return;
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    // Check bounds
    if (newY < 0 || newY >= currentMaze.length || newX < 0 || newX >= currentMaze[0].length) return;

    const cell = currentMaze[newY][newX];
    if (cell === 1) return; // Wall

    setPlayerPos({ x: newX, y: newY });

    if (cell === 3) {
      setWon(true);
    }
  };

  const nextLevel = () => {
    if (level < MAZE_LEVELS.length - 1) {
      setLevel(level + 1);
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') move(0, -1);
      if (e.key === 'ArrowDown') move(0, 1);
      if (e.key === 'ArrowLeft') move(-1, 0);
      if (e.key === 'ArrowRight') move(1, 0);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerPos, won]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold text-amber-600 mb-2">Nivel {level + 1}: {pillars[level]}</h1>
      <p className="mb-6 text-gray-600">Guía la estrella hacia la meta usando las flechas.</p>

      <div className="inline-block bg-amber-100 p-4 rounded-xl shadow-inner mb-8">
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: `repeat(${currentMaze[0].length}, 40px)`,
            gap: '2px'
          }}
        >
          {currentMaze.map((row, y) => (
            row.map((cell, x) => {
              let bg = 'bg-white';
              if (cell === 1) bg = 'bg-amber-700 rounded-sm'; // Wall
              if (cell === 3) bg = 'bg-green-400 animate-pulse rounded-full'; // Goal
              
              const isPlayer = playerPos.x === x && playerPos.y === y;
              
              return (
                <div key={`${x}-${y}`} className={`w-10 h-10 flex items-center justify-center ${bg}`}>
                   {isPlayer && <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />}
                   {cell === 2 && !isPlayer && <div className="w-4 h-4 bg-gray-300 rounded-full"></div>}
                </div>
              );
            })
          ))}
        </div>
      </div>

      {/* Controls for mobile */}
      <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto mb-6">
        <div></div>
        <button onClick={() => move(0, -1)} className="bg-amber-500 text-white p-4 rounded-xl active:scale-95"><ArrowUp/></button>
        <div></div>
        <button onClick={() => move(-1, 0)} className="bg-amber-500 text-white p-4 rounded-xl active:scale-95"><ArrowLeft/></button>
        <button onClick={() => move(0, 1)} className="bg-amber-500 text-white p-4 rounded-xl active:scale-95"><ArrowDown/></button>
        <button onClick={() => move(1, 0)} className="bg-amber-500 text-white p-4 rounded-xl active:scale-95"><ArrowRight/></button>
      </div>

      {won && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl animate-bounce text-center">
            <h2 className="text-4xl font-bold text-green-600 mb-4">¡Nivel Completado!</h2>
            <p className="text-xl text-gray-700 mb-6">Has aprendido sobre: {pillars[level]}</p>
            {level < MAZE_LEVELS.length - 1 ? (
              <button onClick={nextLevel} className="bg-green-500 text-white px-8 py-3 rounded-full text-xl font-bold hover:bg-green-600">
                Siguiente Nivel
              </button>
            ) : (
              <div className="text-2xl font-bold text-amber-500">¡Felicidades! Has completado todos los pilares.</div>
            )}
          </div>
        </div>
      )}

      <button onClick={resetLevel} className="text-gray-400 flex items-center gap-2 mx-auto hover:text-gray-600">
        <RefreshCcw className="w-4 h-4" /> Reiniciar Nivel
      </button>
    </div>
  );
};

export default MazeGame;
