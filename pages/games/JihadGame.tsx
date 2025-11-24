import React, { useState, useEffect } from 'react';
import { Heart, Shield, Zap, Star, RefreshCw, Trophy, Sparkles, Sword, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Tipos de enemigos y movimientos
type EnemyType = 'LAZINESS' | 'LYING' | 'ANGER' | 'GREED';
type MoveType = 'PRAYER' | 'TRUTH' | 'PATIENCE' | 'GENEROSITY';

interface Enemy {
  id: number;
  name: string;
  type: EnemyType;
  hp: number;
  maxHp: number;
  imagePrompt: string;
  attackMsg: string;
}

interface Move {
  name: string;
  type: MoveType;
  icon: React.ReactNode;
  color: string;
  description: string;
  strongAgainst: EnemyType;
}

const ENEMIES_DATA: Enemy[] = [
  { 
    id: 1, 
    name: "Pereza Dormilona", 
    type: 'LAZINESS', 
    hp: 60, 
    maxHp: 60, 
    imagePrompt: "cute cartoon sleepy blue slime monster with a pillow and sleeping cap drooling",
    attackMsg: "¡Te lanza un bostezó gigante!"
  },
  { 
    id: 2, 
    name: "Sombra de Mentira", 
    type: 'LYING', 
    hp: 70, 
    maxHp: 70, 
    imagePrompt: "cute cartoon sneaky purple shadow ghost with a long nose and mischievous mask",
    attackMsg: "¡Intenta confundirte con un truco!"
  },
  { 
    id: 3, 
    name: "Furia de Fuego", 
    type: 'ANGER', 
    hp: 80, 
    maxHp: 80, 
    imagePrompt: "cute cartoon little red fire ball monster with angry eyebrows and steam coming out",
    attackMsg: "¡Te lanza una chispa caliente!"
  }
];

const MOVES: Move[] = [
  { 
    name: "Luz de Oración", 
    type: 'PRAYER', 
    icon: <Star className="w-6 h-6" />, 
    color: "bg-yellow-500",
    description: "Vence a la Pereza",
    strongAgainst: 'LAZINESS'
  },
  { 
    name: "Espada de Verdad", 
    type: 'TRUTH', 
    icon: <Sword className="w-6 h-6" />, 
    color: "bg-blue-500",
    description: "Vence a la Mentira",
    strongAgainst: 'LYING'
  },
  { 
    name: "Escudo Paciencia", 
    type: 'PATIENCE', 
    icon: <Shield className="w-6 h-6" />, 
    color: "bg-green-500",
    description: "Vence al Enojo",
    strongAgainst: 'ANGER'
  }
];

const JihadGame: React.FC = () => {
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const [enemy, setEnemy] = useState<Enemy>({...ENEMIES_DATA[0]});
  const [playerHp, setPlayerHp] = useState(100);
  const [turn, setTurn] = useState<'PLAYER' | 'ENEMY' | 'WIN' | 'LOSE'>('PLAYER');
  const [battleLog, setBattleLog] = useState<string>("¡Un mal hábito ha aparecido! ¿Qué harás?");
  const [effect, setEffect] = useState<string | null>(null);

  const maxPlayerHp = 100;

  // Generador de imagen
  const getImageUrl = (prompt: string) => {
    return `https://image.pollinations.ai/prompt/3d%20render%20cute%20rpg%20monster%20${encodeURIComponent(prompt)}%20white%20background?width=400&height=400&nologo=true`;
  };

  const handlePlayerMove = (move: Move) => {
    if (turn !== 'PLAYER') return;

    let damage = 10;
    let logMsg = "";
    let isEffective = false;

    // Lógica de efectividad
    if (move.strongAgainst === enemy.type) {
      damage = 25 + Math.floor(Math.random() * 10); // Crítico (25-35)
      isEffective = true;
      logMsg = `¡Súper efectivo! Usaste ${move.name} y debilitaste a ${enemy.name}.`;
      setEffect("CRITICAL!");
    } else {
      damage = 5 + Math.floor(Math.random() * 5); // Normal (5-10)
      logMsg = `Usaste ${move.name}, pero no es muy efectivo contra este hábito.`;
      setEffect("HIT");
    }

    const newEnemyHp = Math.max(0, enemy.hp - damage);
    setEnemy(prev => ({ ...prev, hp: newEnemyHp }));
    setBattleLog(logMsg);

    if (newEnemyHp === 0) {
      setTimeout(() => handleEnemyDefeat(), 1000);
    } else {
      setTurn('ENEMY');
      setTimeout(() => enemyTurn(), 1500);
    }
    
    setTimeout(() => setEffect(null), 1000);
  };

  const enemyTurn = () => {
    const damage = 5 + Math.floor(Math.random() * 10);
    setPlayerHp(prev => Math.max(0, prev - damage));
    setBattleLog(`${enemy.name} ataca: ${enemy.attackMsg} Pierdes ${damage} de energía.`);
    setTurn('PLAYER');
    setEffect("OUCH");
    setTimeout(() => setEffect(null), 1000);
  };

  const handleEnemyDefeat = () => {
    if (currentEnemyIndex < ENEMIES_DATA.length - 1) {
      setBattleLog(`¡Has vencido a ${enemy.name}! Prepárate para el siguiente reto.`);
      setTimeout(() => {
        const nextIndex = currentEnemyIndex + 1;
        setCurrentEnemyIndex(nextIndex);
        setEnemy({...ENEMIES_DATA[nextIndex]});
        setTurn('PLAYER');
        setEffect(null);
      }, 2000);
    } else {
      setTurn('WIN');
    }
  };

  useEffect(() => {
    if (playerHp === 0) {
      setTurn('LOSE');
    }
  }, [playerHp]);

  const resetGame = () => {
    setCurrentEnemyIndex(0);
    setEnemy({...ENEMIES_DATA[0]});
    setPlayerHp(100);
    setTurn('PLAYER');
    setBattleLog("¡Un nuevo reto comienza! Lucha contra tus malos hábitos.");
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4 font-[Fredoka]">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-left mb-4">
          <Link to="/juegos" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-200 font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" /> Volver a Juegos
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
             <Sword className="w-10 h-10 text-yellow-400" />
             Guerreros del Corazón
             <Shield className="w-10 h-10 text-blue-400" />
          </h1>
          <p className="text-blue-200 text-lg">El Gran Esfuerzo (Yihad al-Nafs): Lucha contra tus propios errores.</p>
        </div>

        {/* Game Area */}
        <div className="bg-slate-800 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-slate-600 relative min-h-[600px]">
          
          {/* Background Decoration */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

          {(turn === 'WIN' || turn === 'LOSE') ? (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/90 p-8 text-center animate-fade-in">
              <div className="bg-slate-800 p-8 rounded-3xl border-4 border-yellow-500 shadow-2xl max-w-lg">
                {turn === 'WIN' ? (
                  <>
                    <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-4 animate-bounce" />
                    <h2 className="text-4xl font-bold text-white mb-4">¡Victoria Espiritual!</h2>
                    <p className="text-gray-300 text-lg mb-6">
                      Has vencido a la Pereza, la Mentira y el Enojo. Recuerda: el "Gran Esfuerzo" es mejorarnos a nosotros mismos cada día para complacer a Allah.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-4">😔</div>
                    <h2 className="text-3xl font-bold text-white mb-4">Inténtalo de nuevo</h2>
                    <p className="text-gray-300 text-lg mb-6">
                      Los malos hábitos son fuertes, pero tú lo eres más. ¡No te rindas!
                    </p>
                  </>
                )}
                <div className="space-y-4">
                  <button 
                    onClick={resetGame}
                    className="w-full bg-yellow-500 text-slate-900 font-bold py-3 px-8 rounded-full text-xl hover:scale-105 transition-transform"
                  >
                    Volver a Jugar
                  </button>
                  <Link to="/juegos" className="block text-gray-400 hover:text-white underline">Salir al menú</Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col h-full p-6 md:p-10">
              
              {/* Battle Scene */}
              <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                
                {/* Player Stats */}
                <div className="w-full md:w-1/3 flex flex-col items-center order-2 md:order-1">
                  <div className="relative">
                    <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center border-4 border-blue-500 shadow-lg overflow-hidden">
                      <img src="https://image.pollinations.ai/prompt/cute%20muslim%20kid%20warrior%20holding%20shield%20cartoon%20avatar?width=200&height=200&nologo=true" alt="Player" className="w-full h-full object-cover" />
                    </div>
                    {effect === "OUCH" && <div className="absolute top-0 right-0 text-red-500 font-black text-4xl animate-bounce">¡PUM!</div>}
                  </div>
                  <h3 className="text-white font-bold text-xl mt-2">Guerrero de Luz</h3>
                  
                  {/* Player HP Bar */}
                  <div className="w-full bg-slate-900 h-6 rounded-full mt-2 border border-slate-600 overflow-hidden relative">
                     <div 
                        className="h-full bg-green-500 transition-all duration-500" 
                        style={{width: `${(playerHp / maxPlayerHp) * 100}%`}}
                     ></div>
                     <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-md">
                       {playerHp}/{maxPlayerHp}
                     </span>
                  </div>
                </div>

                {/* VS */}
                <div className="text-yellow-500 font-black text-4xl md:text-6xl opacity-50 order-1 md:order-2 italic">VS</div>

                {/* Enemy Stats */}
                <div className="w-full md:w-1/3 flex flex-col items-center order-1 md:order-3">
                  <div className="relative group">
                    <div className="w-40 h-40 md:w-48 md:h-48 bg-red-100/10 rounded-2xl flex items-center justify-center animate-float border-2 border-red-500/30">
                       <img 
                         src={getImageUrl(enemy.imagePrompt)} 
                         alt={enemy.name} 
                         className="w-full h-full object-contain drop-shadow-2xl filter brightness-110"
                       />
                    </div>
                    {effect === "CRITICAL!" && <div className="absolute -top-4 -right-4 text-yellow-400 font-black text-2xl animate-ping">¡CRÍTICO!</div>}
                  </div>
                  <h3 className="text-red-400 font-bold text-xl mt-4">{enemy.name}</h3>
                  
                  {/* Enemy HP Bar */}
                  <div className="w-full bg-slate-900 h-6 rounded-full mt-2 border border-slate-600 overflow-hidden relative">
                     <div 
                        className="h-full bg-red-500 transition-all duration-500" 
                        style={{width: `${(enemy.hp / enemy.maxHp) * 100}%`}}
                     ></div>
                     <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-md">
                       {enemy.hp}/{enemy.maxHp}
                     </span>
                  </div>
                </div>
              </div>

              {/* Controls Area */}
              <div className="bg-slate-700/50 rounded-2xl p-6 border border-slate-600">
                
                {/* Battle Log */}
                <div className="bg-slate-900 p-4 rounded-xl mb-6 text-center min-h-[60px] flex items-center justify-center border border-slate-700">
                   <p className="text-white text-lg animate-pulse">{battleLog}</p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {MOVES.map((move) => (
                    <button
                      key={move.name}
                      onClick={() => handlePlayerMove(move)}
                      disabled={turn !== 'PLAYER'}
                      className={`
                        ${move.color} 
                        ${turn !== 'PLAYER' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg'}
                        text-white p-4 rounded-xl flex flex-col items-center gap-2 transition-all shadow-md border-b-4 border-black/20
                      `}
                    >
                      <div className="bg-white/20 p-2 rounded-full">
                        {move.icon}
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg">{move.name}</div>
                        <div className="text-xs opacity-90">{move.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JihadGame;