import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Trophy, Heart, AlertTriangle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

type ItemType = 'HALAL' | 'HARAM';

interface GameItem {
  id: number;
  lane: 0 | 1 | 2;
  y: number; // percentage 0-100
  type: ItemType;
  emoji: string;
}

const LANES = [0, 1, 2];
const WIN_DISTANCE = 1000; // Units to run

const HALAL_ITEMS = ['🍎', '📖', '📿', '💧', '🕌'];
const HARAM_ITEMS = ['🔥', '🐷', '🍷', '🤬'];

const MosqueRunGame: React.FC = () => {
  const [playerLane, setPlayerLane] = useState<0 | 1 | 2>(1);
  const [items, setItems] = useState<GameItem[]>([]);
  const [score, setScore] = useState(0);
  const [distance, setDistance] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAME_OVER' | 'WIN'>('START');
  const [feedback, setFeedback] = useState<string | null>(null);
  
  const requestRef = useRef<number>(0);
  const lastSpawnTime = useRef<number>(0);
  const speedRef = useRef<number>(0.8); // Speed of items
  
  // Refs for Game Loop access to avoid stale closures
  const playerLaneRef = useRef(playerLane);
  const gameStateRef = useRef(gameState);

  // Lock scroll when game is mounted
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Sync Refs with State
  useEffect(() => {
    playerLaneRef.current = playerLane;
  }, [playerLane]);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Game Loop
  const updateGame = (time: number) => {
    if (gameStateRef.current !== 'PLAYING') {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        return;
    }

    setDistance(prev => {
      const newDist = prev + 1;
      if (newDist >= WIN_DISTANCE) {
        setGameState('WIN');
      }
      return newDist;
    });

    // Spawn items
    if (time - lastSpawnTime.current > 1200 / speedRef.current) {
      spawnItem();
      lastSpawnTime.current = time;
      // Increase speed slightly over time
      speedRef.current = Math.min(2.5, speedRef.current + 0.01);
    }

    // Move items and check collisions
    setItems(prevItems => {
      const newItems: GameItem[] = [];
      let collisionItem: GameItem | null = null;
      
      prevItems.forEach(item => {
        const newY = item.y + speedRef.current;
        
        // Collision check (Player is at Y ~ 80-90%)
        // Use Ref for current player lane to avoid stale closure
        if (newY > 80 && newY < 95 && item.lane === playerLaneRef.current) {
          collisionItem = item;
          // Item removed
        } else if (newY < 110) {
          newItems.push({ ...item, y: newY });
        }
      });

      // Handle collision outside of the iteration to be cleaner
      if (collisionItem) {
        // Use setTimeout to break out of the render/reducer cycle for state updates
        // (although setting state in updater is generally safe, isolating side effects is better)
        setTimeout(() => handleCollision(collisionItem!), 0);
      }

      return newItems;
    });

    requestRef.current = requestAnimationFrame(updateGame);
  };

  const spawnItem = () => {
    const lane = Math.floor(Math.random() * 3) as 0 | 1 | 2;
    const isHalal = Math.random() > 0.4; // 60% Halal
    const type = isHalal ? 'HALAL' : 'HARAM';
    const list = isHalal ? HALAL_ITEMS : HARAM_ITEMS;
    const emoji = list[Math.floor(Math.random() * list.length)];

    setItems(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        lane,
        y: -10,
        type,
        emoji
      }
    ]);
  };

  const handleCollision = (item: GameItem) => {
    if (item.type === 'HALAL') {
      setScore(s => s + 10);
      setFeedback(`+10 ${item.emoji}`);
    } else {
      setLives(l => {
        const newLives = l - 1;
        if (newLives <= 0) setGameState('GAME_OVER');
        return newLives;
      });
      setFeedback("¡Cuidado!");
    }
    setTimeout(() => setFeedback(null), 500);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
    if (gameStateRef.current !== 'PLAYING') return;
    if (e.key === 'ArrowLeft') setPlayerLane(prev => Math.max(0, prev - 1) as 0|1|2);
    if (e.key === 'ArrowRight') setPlayerLane(prev => Math.min(2, prev + 1) as 0|1|2);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Start/Stop Loop based on Game State
  useEffect(() => {
    if (gameState === 'PLAYING') {
      requestRef.current = requestAnimationFrame(updateGame);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  const startGame = () => {
    setScore(0);
    setDistance(0);
    setLives(3);
    setItems([]);
    setPlayerLane(1);
    speedRef.current = 0.8;
    setGameState('PLAYING');
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-4">
         <Link to="/juegos" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold transition-colors bg-white p-2 rounded-full shadow-sm">
          <ArrowLeft className="w-5 h-5" /> Volver
        </Link>
        <div className="flex items-center gap-2 font-bold text-indigo-800">
           <Trophy className="w-5 h-5 text-yellow-500" /> {score}
        </div>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <Heart key={i} className={`w-6 h-6 ${i < lives ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-4 bg-gray-200 rounded-full mb-4 overflow-hidden border border-gray-300 relative">
        <div 
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${Math.min(100, (distance / WIN_DISTANCE) * 100)}%` }}
        ></div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[10px] font-bold text-gray-600">
           Mezquita 🕌
        </div>
      </div>

      <div className="relative flex-1 bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700 perspective-1000">
        
        {/* Sky / Horizon */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-indigo-900 to-slate-800 z-0">
           <div className="absolute bottom-4 w-full text-center opacity-20">
              <div className="text-6xl">🕌</div>
           </div>
        </div>

        {/* Road */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md h-2/3 bg-gray-600 origin-bottom" style={{ transform: 'perspective(500px) rotateX(40deg) translateX(-50%)' }}>
           {/* Lanes */}
           <div className="absolute inset-0 flex justify-between px-12">
              <div className="w-2 h-full bg-dashed border-l-2 border-dashed border-white/30"></div>
              <div className="w-2 h-full bg-dashed border-l-2 border-dashed border-white/30"></div>
           </div>
        </div>

        {/* Game Area Overlay */}
        <div className="absolute inset-0 overflow-hidden">
           
           {/* Items */}
           {items.map(item => {
              const scale = 0.5 + (item.y / 100) * 0.7;
              const opacity = item.y < 0 ? 0 : 1;
              
              const laneOffsetBase = (item.lane - 1); // -1, 0, 1
              const spread = 10 + (item.y * 0.25); // Spread effect for perspective
              const leftPos = 50 + (laneOffsetBase * spread);

              return (
                <div 
                  key={item.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-none"
                  style={{
                    left: `${leftPos}%`,
                    top: `${item.y}%`,
                    fontSize: `${2 * scale}rem`,
                    opacity: opacity,
                    zIndex: Math.floor(item.y)
                  }}
                >
                   {item.emoji}
                </div>
              );
           })}

           {/* Player */}
           {gameState !== 'GAME_OVER' && (
             <div 
                className="absolute bottom-8 transform -translate-x-1/2 transition-all duration-200 z-50"
                style={{
                  left: playerLane === 0 ? '20%' : playerLane === 1 ? '50%' : '80%',
                }}
             >
                <div className="text-6xl filter drop-shadow-lg relative">
                  🏃
                  {/* Sweat drop if hit */}
                  {feedback === "¡Cuidado!" && <span className="absolute -top-4 right-0 text-2xl">💦</span>}
                </div>
             </div>
           )}

           {/* Feedback Text */}
           {feedback && (
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-400 font-black text-4xl animate-bounce drop-shadow-md z-50 whitespace-nowrap">
               {feedback}
             </div>
           )}

           {/* Overlays */}
           {gameState === 'START' && (
             <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white p-6 text-center z-50">
               <h1 className="text-4xl font-bold text-yellow-400 mb-4">Carrera a la Mezquita</h1>
               <p className="mb-8 text-lg">Corre para llegar a la oración del Jumu'ah a tiempo.</p>
               <div className="flex gap-4 text-sm mb-8 bg-white/10 p-4 rounded-xl">
                 <div>
                   <p className="font-bold text-green-400">Recoge (Halal)</p>
                   <p className="text-2xl">🍎 📖 📿</p>
                 </div>
                 <div className="w-px bg-white/30"></div>
                 <div>
                   <p className="font-bold text-red-400">Esquiva (Haram)</p>
                   <p className="text-2xl">🔥 🐷 🍷</p>
                 </div>
               </div>
               <button onClick={startGame} className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg animate-bounce">
                 ¡Correr!
               </button>
             </div>
           )}

           {gameState === 'GAME_OVER' && (
             <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white p-6 text-center z-50 animate-fade-in">
               <AlertTriangle className="w-20 h-20 text-red-500 mb-4" />
               <h2 className="text-3xl font-bold mb-2">¡Oh no!</h2>
               <p className="mb-6 text-gray-300">Te has distraído con cosas Haram y perdiste el camino.</p>
               <p className="text-xl font-bold mb-8">Puntos: {score}</p>
               <button onClick={startGame} className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg">
                 Intentar de Nuevo
               </button>
             </div>
           )}

           {gameState === 'WIN' && (
             <div className="absolute inset-0 bg-emerald-600/90 flex flex-col items-center justify-center text-white p-6 text-center z-50 animate-fade-in-up">
               <Star className="w-20 h-20 text-yellow-400 mb-4 animate-spin" />
               <h2 className="text-4xl font-bold mb-2">¡Alhamdulillah!</h2>
               <p className="mb-6 text-emerald-100">Llegaste a la Mezquita a tiempo y con buenas acciones.</p>
               <div className="bg-white/20 p-4 rounded-2xl mb-8">
                 <p className="text-sm uppercase tracking-widest">Puntaje Final</p>
                 <p className="text-5xl font-black">{score}</p>
               </div>
               <button onClick={startGame} className="bg-white text-emerald-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-emerald-50">
                 Correr otra vez
               </button>
             </div>
           )}
        </div>

        {/* Controls for Mobile */}
        <div className="absolute bottom-0 w-full h-1/3 flex z-40">
           <div className="w-1/2 h-full" onTouchStart={() => setPlayerLane(prev => Math.max(0, prev - 1) as 0|1|2)}></div>
           <div className="w-1/2 h-full" onTouchStart={() => setPlayerLane(prev => Math.min(2, prev + 1) as 0|1|2)}></div>
        </div>
      </div>

      <div className="mt-4 text-center text-gray-500 text-sm">
        Toca izquierda/derecha o usa las flechas del teclado
      </div>
    </div>
  );
};

export default MosqueRunGame;