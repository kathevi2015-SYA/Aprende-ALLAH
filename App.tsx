import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import LearnAllah from './pages/LearnAllah';
import ProphetStories from './pages/ProphetStories';
import Gallery from './pages/Gallery';
import Games from './pages/Games';
import MazeGame from './pages/games/MazeGame';
import ConnectDots from './pages/games/ConnectDots';
import TriviaGame from './pages/games/TriviaGame';
import PacmanGame from './pages/games/PacmanGame';
import RiddlesGame from './pages/games/RiddlesGame';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-sky-50 font-[Nunito]">
        <Navigation />
        
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aprende" element={<LearnAllah />} />
            <Route path="/profetas" element={<ProphetStories />} />
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/juegos" element={<Games />} />
            <Route path="/juegos/laberinto" element={<MazeGame />} />
            <Route path="/juegos/puntos" element={<ConnectDots />} />
            <Route path="/juegos/trivia" element={<TriviaGame />} />
            <Route path="/juegos/galletas" element={<PacmanGame />} />
            <Route path="/juegos/adivinanzas" element={<RiddlesGame />} />
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </main>

        <WhatsAppButton />
        
        <footer className="bg-sky-200 text-sky-800 text-center py-6 mt-auto">
          <p className="font-bold">Hecho con amor para los pequeños creyentes ❤️</p>
          <p className="text-sm mt-2 opacity-75">© {new Date().getFullYear()} Pequeño Musulmán</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
