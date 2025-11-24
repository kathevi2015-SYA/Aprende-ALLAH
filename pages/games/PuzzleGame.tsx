import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Trophy, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const IMAGES = [
  { id: 1, title: "La Kaaba", url: "https://image.pollinations.ai/prompt/holy%20kaaba%20mecca%20cartoon%20style%20illustration%20bright%20colors?width=600&height=600&nologo=true" },
  { id: 2, title: "Mezquita Azul", url: "https://image.pollinations.ai/prompt/beautiful%20blue%20mosque%20illustration%20cartoon%20style%20clouds?width=600&height=600&nologo=true" },
  { id: 3, title: "Camello del Desierto", url: "https://image.pollinations.ai/prompt/cute%20camel%20desert%20pyramids%20cartoon%20illustration?width=600&height=600&nologo=true" },
];

const PuzzleGame: React.FC = () => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [selectedImage, setSelectedImage] = useState(IMAGES[0]);
  const [moves, setMoves] = useState(0);

  // Initialize puzzle
  const initGame = () => {
    const solved = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let shuffled = [...solved];
    
    // Simple random shuffle via valid moves simulation to ensure solvability
    let blankIdx = 8;
    for(let i=0; i<100; i++) {
       const neighbors = [];
       if (blankIdx % 3 > 0) neighbors.push(blankIdx - 1); // Left
       if (blankIdx % 3 < 2) neighbors.push(blankIdx + 1); // Right
       if (blankIdx >= 3) neighbors.push(blankIdx - 3); // Up
       if (blankIdx < 6) neighbors.push(blankIdx + 3); // Down
       
       const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
       [shuffled[blankIdx], shuffled[randomNeighbor]] = [shuffled[randomNeighbor], shuffled[blankIdx]];
       blankIdx = randomNeighbor;
    }

    setTiles(shuffled);
    setIsSolved(false);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, [selectedImage]);

  const handleTileClick = (index: number) => {
    if (isSolved) return;

    const blankIndex = tiles.indexOf(8); // 8 is the blank tile (last one)
    const row = Math.floor(index / 3);
    const col = index % 3;
    const blankRow = Math.floor(blankIndex / 3);
    const blankCol = blankIndex % 3;

    // Check adjacency
    const isAdjacent = (Math.abs(row - blankRow) === 1 && col === blankCol) || 
                       (Math.abs(col - blankCol) === 1 && row === blankRow);

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[blankIndex]] = [newTiles[blankIndex], newTiles[index]];
      setTiles(newTiles);
      setMoves(moves + 1);

      // Check win
      const isWin = newTiles.every((val, idx) => val === idx);
      if (isWin) setIsSolved(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-center">
      <div className="text-left mb-4">
        <Link to="/juegos" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-800 font-bold transition-colors">
          <ArrowLeft className="w-5 h-5" /> Volver a Juegos
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-teal-600 mb-2">Rompecabezas Islámico</h1>
      <p className="text-gray-600 mb-6">Ordena la imagen deslizando las piezas.</p>

      {/* Image Selector */}
      <div className="flex justify-center gap-4 mb-8">
        {IMAGES.map((img) => (
          <button
            key={img.id}
            onClick={() => setSelectedImage(img)}
            className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${selectedImage.id === img.id ? 'border-teal-500 scale-110 ring-2 ring-teal-200' : 'border-gray-200 grayscale hover:grayscale-0'}`}
          >
            <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Game Board */}
      <div className="relative inline-block bg-teal-50 p-4 rounded-2xl border-4 border-teal-200 shadow-xl">
        <div className="grid grid-cols-3 gap-1 w-[300px] h-[300px] bg-teal-200">
           {tiles.map((tileNumber, index) => {
             // Calculate position in the original image
             // tileNumber 0 -> x:0, y:0
             // tileNumber 1 -> x:33.3%, y:0
             const x = (tileNumber % 3) * 100 / 2; // 0, 50, 100
             const y = Math.floor(tileNumber / 3) * 100 / 2;

             const isBlank = tileNumber === 8;

             if (isBlank && !isSolved) return <div key={index} className="bg-teal-100/50 rounded-md"></div>;

             return (
               <div
                 key={index}
                 onClick={() => handleTileClick(index)}
                 className={`w-full h-full rounded-md cursor-pointer transition-transform hover:scale-[1.02] ${isSolved ? 'border-none' : 'border border-white/50'}`}
                 style={{
                   backgroundImage: `url(${selectedImage.url})`,
                   backgroundSize: '300% 300%',
                   backgroundPosition: `${x}% ${y}%`
                 }}
               >
               </div>
             );
           })}
        </div>
        
        {isSolved && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10 animate-fade-in">
            <div className="text-center p-6">
               <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-2 animate-bounce" />
               <h2 className="text-2xl font-bold text-teal-800 mb-2">¡Puzzle Resuelto!</h2>
               <p className="text-teal-600 mb-4">En {moves} movimientos.</p>
               <button onClick={initGame} className="bg-teal-500 text-white px-6 py-2 rounded-full font-bold hover:bg-teal-600 shadow-lg">
                 Jugar Otra Vez
               </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
         <button onClick={initGame} className="flex items-center gap-2 text-gray-400 hover:text-teal-500 font-bold">
           <RefreshCw className="w-5 h-5" /> Reiniciar
         </button>
      </div>
    </div>
  );
};

export default PuzzleGame;