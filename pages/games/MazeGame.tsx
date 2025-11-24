import React, { useState, useEffect, useCallback } from 'react';
import { MAZE_LEVELS } from '../../constants';
import { ArrowDown, ArrowUp, ArrowLeft, ArrowRight, RefreshCcw, Star, Trophy, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const PILLAR_NAMES = [
  "Shahada (Fe)", 
  "Salat (Oración)", 
  "Zakat (Caridad)", 
  "Sawm (Ayuno)", 
  "Hajj (Peregrinación)"
];

const LEVEL_COLORS = [
  "bg-emerald-700", // Level 1 - Green
  "bg-blue-700",    // Level 2 - Blue
  "bg-purple-700",  // Level 3 - Purple
  "bg-orange-700",  // Level 4 - Orange
  "bg-amber-500"    // Level 5 - Gold
];

const PILLAR_MESSAGES = [
  "¡Excelente trabajo! La Shahada no es solo decir palabras, es sentir en el corazón que Allah es Uno y Muhammad es su Mensajero. Es la base sólida donde construimos toda nuestra vida.",
  "¡Increíble! El Salat es nuestra cita diaria con el Creador. Al rezar 5 veces al día, organizamos nuestro tiempo, encontramos paz y recordamos que Allah siempre nos está viendo.",
  "¡Muy generoso! El Zakat purifica nuestra riqueza. Al compartir el 2.5% de nuestros ahorros, aprendemos que el dinero no es nuestro, sino una bendición de Allah para ayudar a la comunidad.",
  "¡Gran disciplina! En Ramadán, el Sawm nos enseña autocontrol. Al sentir hambre, recordamos a los pobres y fortalecemos nuestra voluntad para obedecer a Allah en todo momento.",
  "¡Misión cumplida! El Hajj es el viaje de la unidad. Millones de musulmanes visten igual y rezan juntos, recordándonos que ante Allah no importa de dónde venimos, sino la pureza de nuestro corazón."
];

const MazeGame: React.FC = () => {
  const [level, setLevel] = useState(0);
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [won, setWon] = useState(false);
  const [timeToNext, setTimeToNext] = useState(8);

  const currentMaze = MAZE_LEVELS[level];
  const wallColor = LEVEL_COLORS[level] || "bg-gray-800";

  // Lock scroll when game is mounted
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const resetLevel = useCallback(() => {
    if (!currentMaze) return;
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
    setTimeToNext(8);
  }, [level, resetLevel]);

  const nextLevel = useCallback(() => {
    if (level < MAZE_LEVELS.length - 1) {
      setLevel(level + 1);
    }
  }, [level]);

  useEffect(() => {
    let interval: number;
    if (won && level < MAZE_LEVELS.length - 1) {
      interval = window.setInterval(() => {
        setTimeToNext((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            nextLevel();
            return 8;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [won, level, nextLevel]);

  const move = (dx: number, dy: number) => {
    if (won) return;
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    if (newY < 0 || newY >= currentMaze.length || newX < 0 || newX >= currentMaze[0].length) return;

    const cell = currentMaze[newY][newX];
    if (cell === 1) return; // Wall

    setPlayerPos({ x: newX, y: newY });

    if (cell === 3) {
      setWon(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
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
    <div className="max-w-4xl mx-auto px-4 py-8 text-center h-screen flex flex-col justify-center">
      <div className="text-left mb-2">
        <Link to="/juegos" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-800 font-bold transition-colors">
          <ArrowLeft className="w-5 h-5" /> Volver a Juegos
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-amber-600 mb-2">Nivel {level + 1}: {PILLAR_NAMES[level]}</h1>
      <p className="mb-4 text-gray-600 font-medium">Encuentra el camino hacia la meta.</p>

      <div className="inline-block bg-white p-4 rounded-xl shadow-xl mb-4 border-4 border-amber-100 mx-auto">
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: `repeat(${currentMaze[0].length}, 24px)`, 
            gap: '1px'
          }}
        >
          {currentMaze.map((row, y) => (
            row.map((cell, x) => {
              let bg = 'bg-sky-50';
              if (cell === 1) bg = `${wallColor} rounded-sm shadow-sm`; // Dynamic Wall Color
              if (cell === 3) bg = 'bg-green-400 animate-pulse rounded-full border-2 border-green-600'; // Goal
              
              const isPlayer = playerPos.x === x && playerPos.y === y;
              
              return (
                <div key={`${x}-${y}`} className={`w-6 h-6 flex items-center justify-center ${bg}`}>
                   {isPlayer && <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-md animate-bounce" />}
                   {cell === 2 && !isPlayer && <div className="w-2 h-2 bg-gray-300 rounded-full"></div>}
                </div>
              );
            })
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 max-w-[180px] mx-auto mb-2 touch-manipulation">
        <div></div>
        <button onClick={() => move(0, -1)} className="bg-amber-500 text-white p-4 rounded-xl active:bg-amber-600 active:scale-95 shadow-md"><ArrowUp/></button>
        <div></div>
        <button onClick={() => move(-1, 0)} className="bg-amber-500 text-white p-4 rounded-xl active:bg-amber-600 active:scale-95 shadow-md"><ArrowLeft/></button>
        <button onClick={() => move(0, 1)} className="bg-amber-500 text-white p-4 rounded-xl active:bg-amber-600 active:scale-95 shadow-md"><ArrowDown/></button>
        <button onClick={() => move(1, 0)} className="bg-amber-500 text-white p-4 rounded-xl active:bg-amber-600 active:scale-95 shadow-md"><ArrowRight/></button>
      </div>

      {won && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl animate-bounce-in max-w-lg w-full text-center border-4 border-amber-200">
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-amber-600 mb-2">¡Camino Encontrado!</h2>
            
            <div className="bg-amber-50 p-6 rounded-xl my-6 border border-amber-100">
              <h3 className="text-xl font-bold text-amber-800 mb-2">{PILLAR_NAMES[level]}</h3>
              <p className="text-lg text-gray-700 font-medium leading-relaxed">
                {PILLAR_MESSAGES[level]}
              </p>
            </div>

            {level < MAZE_LEVELS.length - 1 ? (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                <p>Avanzando al siguiente pilar en <span className="font-bold text-amber-600">{timeToNext}</span> segundos...</p>
                <button onClick={nextLevel} className="text-sm text-amber-500 underline mt-2">Avanzar ya</button>
              </div>
            ) : (
              <div className="text-2xl font-bold text-green-600">
                ¡Has completado el viaje de los 5 Pilares!
                <p className="text-base text-gray-500 mt-2 font-normal">Que Allah guíe siempre tus pasos por el camino recto.</p>
                <button onClick={() => {setLevel(0); setWon(false);}} className="mt-6 block w-full bg-amber-500 text-white py-3 rounded-xl text-lg hover:bg-amber-600 shadow-lg">
                  Volver al Inicio
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <button onClick={resetLevel} className="text-gray-400 flex items-center gap-2 mx-auto hover:text-gray-600 mt-2 transition-colors">
        <RefreshCcw className="w-4 h-4" /> Reiniciar Nivel
      </button>
    </div>
  );
};

export default MazeGame;