import React, { useState, useEffect, useCallback } from 'react';
import { Smile, RefreshCw, AlertTriangle, CheckCircle, Heart, Trophy, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const GRID_SIZE = 10;
const MAX_ITEMS_ON_SCREEN = 8;

type FoodType = 'halal' | 'haram';

interface FoodItem {
  name: string;
  emoji: string;
  type: FoodType;
  reason: string;
}

interface ActiveFood {
  id: number;
  x: number;
  y: number;
  data: FoodItem;
}

const FOODS: FoodItem[] = [
  // Halal
  { name: 'Manzana', emoji: '🍎', type: 'halal', reason: '¡Las frutas son regalos saludables de Allah!' },
  { name: 'Pescado', emoji: '🐟', type: 'halal', reason: 'Todo lo que viene del mar es Halal y bueno para ti.' },
  { name: 'Pollo', emoji: '🍗', type: 'halal', reason: 'Carne permitida y sacrificada en nombre de Allah.' },
  { name: 'Uvas', emoji: '🍇', type: 'halal', reason: 'Fruta deliciosa mencionada en el Corán.' },
  { name: 'Agua', emoji: '💧', type: 'halal', reason: 'La mejor bebida para el cuerpo.' },
  { name: 'Leche', emoji: '🥛', type: 'halal', reason: 'Pura y nutritiva, nos da fuerza.' },
  { name: 'Dátiles', emoji: '🌴', type: 'halal', reason: '¡El alimento favorito del Profeta (SAW)!' },
  { name: 'Miel', emoji: '🍯', type: 'halal', reason: 'Es curación para la humanidad.' },
  
  // Haram
  { name: 'Cerdo', emoji: '🐷', type: 'haram', reason: 'Allah nos prohibió comer cerdo porque es impuro.' },
  { name: 'Vino', emoji: '🍷', type: 'haram', reason: 'El alcohol nubla nuestra mente y nos aleja de Allah.' },
  { name: 'Cerveza', emoji: '🍺', type: 'haram', reason: 'Las bebidas con alcohol están prohibidas (Haram).' },
  { name: 'Tocino', emoji: '🥓', type: 'haram', reason: 'Proviene del cerdo, no debemos comerlo.' },
];

const POSITIVE_PHRASES = ["¡Muy bien!", "¡Halal!", "¡Mashallah!", "¡Delicioso!", "¡Sano!"];

const PacmanGame: React.FC = () => {
  const [pos, setPos] = useState({x: 0, y: 0});
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [activeFoods, setActiveFoods] = useState<ActiveFood[]>([]);
  const [gameState, setGameState] = useState<'PLAYING' | 'EXPLAINING' | 'LEVEL_COMPLETE' | 'GAME_OVER'>('PLAYING');
  const [explanation, setExplanation] = useState<{title: string, text: string, isBad: boolean} | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Animation States
  const [facing, setFacing] = useState(1); // 1 = Right, -1 = Left
  const [runFrame, setRunFrame] = useState(0);

  // Lock scroll when game is mounted
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Running Animation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setRunFrame(prev => (prev === 0 ? 1 : 0));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Generate multiple food items
  const spawnLevelFoods = useCallback(() => {
    const newFoods: ActiveFood[] = [];
    const occupied = new Set<string>();
    occupied.add(`0,0`); // Player start

    let halalCount = 0;
    
    // Ensure at least some Halal food
    while (newFoods.length < MAX_ITEMS_ON_SCREEN) {
      const x = Math.floor(Math.random() * GRID_SIZE);
      const y = Math.floor(Math.random() * GRID_SIZE);
      const key = `${x},${y}`;

      if (!occupied.has(key)) {
        // 60% chance of Halal
        const isHalal = Math.random() > 0.4;
        const type = isHalal ? 'halal' : 'haram';
        const options = FOODS.filter(f => f.type === type);
        const foodData = options[Math.floor(Math.random() * options.length)];

        newFoods.push({
          id: Math.random(),
          x,
          y,
          data: foodData
        });
        occupied.add(key);
        if (isHalal) halalCount++;
      }
    }
    
    // If by bad luck no halal, replace one
    if (halalCount === 0) {
       newFoods[0].data = FOODS.find(f => f.type === 'halal')!;
    }

    setActiveFoods(newFoods);
  }, []);

  // Initial spawn
  useEffect(() => {
    spawnLevelFoods();
  }, [spawnLevelFoods]);

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setPos({x: 0, y: 0});
    setFacing(1);
    setGameState('PLAYING');
    setExplanation(null);
    spawnLevelFoods();
  };

  const nextLevel = () => {
    setLevel(l => l + 1);
    setPos({x: 0, y: 0});
    setFacing(1);
    setGameState('PLAYING');
    spawnLevelFoods();
  };

  const showFeedback = (text: string) => {
    setFeedback(text);
    setTimeout(() => setFeedback(null), 1000);
  };

  const move = (dx: number, dy: number) => {
    if (gameState !== 'PLAYING') return;

    if (dx !== 0) setFacing(dx);

    const newX = Math.max(0, Math.min(GRID_SIZE - 1, pos.x + dx));
    const newY = Math.max(0, Math.min(GRID_SIZE - 1, pos.y + dy));
    
    setPos({x: newX, y: newY});

    // Check Collision
    const eatenFoodIndex = activeFoods.findIndex(f => f.x === newX && f.y === newY);

    if (eatenFoodIndex !== -1) {
      const food = activeFoods[eatenFoodIndex];
      
      if (food.data.type === 'halal') {
        // Good Logic
        setScore(s => s + 10);
        showFeedback(POSITIVE_PHRASES[Math.floor(Math.random() * POSITIVE_PHRASES.length)]);
        
        // Remove food
        const updatedFoods = [...activeFoods];
        updatedFoods.splice(eatenFoodIndex, 1);
        setActiveFoods(updatedFoods);

        // Check if Level Complete (No Halal left)
        const remainingHalal = updatedFoods.filter(f => f.data.type === 'halal').length;
        if (remainingHalal === 0) {
          setGameState('LEVEL_COMPLETE');
        }

      } else {
        // Bad Logic
        setGameState('EXPLAINING');
        setExplanation({
          title: `¡Oh no! Es ${food.data.name}`,
          text: food.data.reason,
          isBad: true
        });
        // Remove the haram food so they don't hit it again immediately
        const updatedFoods = [...activeFoods];
        updatedFoods.splice(eatenFoodIndex, 1);
        setActiveFoods(updatedFoods);
      }
    }
  };

  const handleModalClose = () => {
    if (explanation?.isBad) {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        setGameState('GAME_OVER');
      } else {
        setGameState('PLAYING');
      }
    }
    setExplanation(null);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      if (gameState !== 'PLAYING') return;
      if(e.key === 'ArrowUp') move(0, -1);
      if(e.key === 'ArrowDown') move(0, 1);
      if(e.key === 'ArrowLeft') move(-1, 0);
      if(e.key === 'ArrowRight') move(1, 0);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos, activeFoods, gameState]);

  return (
    <div className="max-w-md mx-auto px-4 py-8 text-center relative h-screen flex flex-col justify-center">
      <div className="text-left mb-2">
        <Link to="/juegos" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-800 font-bold transition-colors">
          <ArrowLeft className="w-5 h-5" /> Volver a Juegos
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-emerald-600 mb-2">Cazador de Halal</h1>
      
      {/* HUD */}
      <div className="flex justify-between items-center px-4 mb-4 bg-white p-4 rounded-2xl shadow-sm border border-emerald-100">
        <div className="flex flex-col items-start">
           <span className="text-xs text-gray-500 uppercase font-bold">Puntos</span>
           <span className="text-2xl font-bold text-emerald-600">{score}</span>
        </div>
        <div className="flex flex-col items-center">
           <span className="text-xs text-gray-500 uppercase font-bold mb-1">Nivel</span>
           <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">{level}</span>
        </div>
        <div className="flex flex-col items-end">
           <span className="text-xs text-gray-500 uppercase font-bold mb-1">Vidas</span>
           <div className="flex gap-1">
             {[...Array(3)].map((_, i) => (
               <Heart key={i} className={`w-6 h-6 ${i < lives ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
             ))}
           </div>
        </div>
      </div>

      {/* Game Board */}
      <div 
        className="bg-slate-800 mx-auto relative rounded-xl shadow-2xl border-4 border-slate-600 overflow-hidden select-none"
        style={{
          width: '300px',
          height: '300px',
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {/* Floating Feedback */}
        {feedback && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="text-yellow-400 font-black text-3xl animate-bounce-in drop-shadow-md stroke-black text-stroke">
              {feedback}
            </div>
          </div>
        )}

        {Array.from({length: GRID_SIZE * GRID_SIZE}).map((_, i) => {
           const x = i % GRID_SIZE;
           const y = Math.floor(i / GRID_SIZE);
           const isPlayer = x === pos.x && y === pos.y;
           const foodAtLoc = activeFoods.find(f => f.x === x && f.y === y);

           return (
             <div key={i} className="w-full h-full flex items-center justify-center relative border border-slate-700/20">
                {/* Food */}
                {foodAtLoc && (
                  <span className={`text-2xl animate-pulse filter drop-shadow-lg transition-transform ${foodAtLoc.data.type === 'halal' ? 'scale-100' : 'scale-90 grayscale-[0.2]'}`}>
                    {foodAtLoc.data.emoji}
                  </span>
                )}

                {/* Player */}
                {isPlayer && (
                  <div 
                    className="z-10 transition-transform duration-100 ease-in-out"
                    style={{ 
                      transform: `scaleX(${facing}) translateY(${runFrame ? '-3px' : '0px'})` 
                    }}
                  >
                    <div className="text-3xl filter drop-shadow-lg leading-none">🏃</div>
                  </div>
                )}
             </div>
           );
        })}
      </div>

      {/* Instruction */}
      <div className="mt-4 text-gray-600 text-sm font-medium">
         Come todo lo <span className="text-green-600 font-bold">Halal</span> para pasar de nivel.
      </div>

      {/* Explanation Modal (Warning) */}
      {gameState === 'EXPLAINING' && explanation && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 rounded-xl p-4">
          <div className="bg-white p-6 rounded-3xl shadow-2xl animate-bounce-in max-w-xs border-b-8 border-red-400">
            <div className="flex justify-center mb-4">
                <div className="bg-red-100 p-4 rounded-full">
                  <AlertTriangle className="w-12 h-12 text-red-500" />
                </div>
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">{explanation.title}</h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              {explanation.text}
            </p>
            <button 
              onClick={handleModalClose}
              className="w-full bg-red-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-red-600 shadow-lg"
            >
              Entendido (Perder Vida)
            </button>
          </div>
        </div>
      )}

      {/* Level Complete Modal */}
      {gameState === 'LEVEL_COMPLETE' && (
        <div className="absolute inset-0 bg-emerald-600/90 backdrop-blur-sm flex items-center justify-center z-50 rounded-xl p-4">
          <div className="bg-white p-6 rounded-3xl shadow-2xl animate-fade-in-up max-w-xs text-center">
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-emerald-600 mb-2">¡Nivel {level} Completado!</h2>
            <p className="text-gray-600 mb-6">Has elegido correctamente. ¡Allah está complacido con las buenas acciones!</p>
            <button 
              onClick={nextLevel}
              className="w-full bg-emerald-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-emerald-600 shadow-lg flex items-center justify-center gap-2"
            >
              Siguiente Nivel <Smile className="w-5 h-5"/>
            </button>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {gameState === 'GAME_OVER' && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-xl p-4">
           <div className="bg-white p-6 rounded-3xl shadow-2xl animate-bounce-in max-w-xs text-center border-b-8 border-gray-400">
            <div className="text-6xl mb-4">😢</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Juego Terminado</h2>
            <p className="text-xl text-gray-600 mb-6">Puntaje Final: <span className="font-bold text-emerald-600">{score}</span></p>
            <button 
              onClick={restartGame}
              className="w-full bg-emerald-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-emerald-600 shadow-lg"
            >
              Intentar de Nuevo
            </button>
            <Link to="/juegos" className="block mt-4 text-gray-400 hover:text-white underline">Salir al menú</Link>
          </div>
        </div>
      )}

      {/* Mobile controls */}
      <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto mt-6 select-none touch-manipulation">
        <div></div>
        <button onClick={() => move(0, -1)} className="bg-emerald-100 text-emerald-700 p-4 rounded-2xl active:bg-emerald-200 active:scale-95 border-b-4 border-emerald-200 font-bold text-xl">↑</button>
        <div></div>
        <button onClick={() => move(-1, 0)} className="bg-emerald-100 text-emerald-700 p-4 rounded-2xl active:bg-emerald-200 active:scale-95 border-b-4 border-emerald-200 font-bold text-xl">←</button>
        <button onClick={() => move(0, 1)} className="bg-emerald-100 text-emerald-700 p-4 rounded-2xl active:bg-emerald-200 active:scale-95 border-b-4 border-emerald-200 font-bold text-xl">↓</button>
        <button onClick={() => move(1, 0)} className="bg-emerald-100 text-emerald-700 p-4 rounded-2xl active:bg-emerald-200 active:scale-95 border-b-4 border-emerald-200 font-bold text-xl">→</button>
      </div>
    </div>
  );
};

export default PacmanGame;