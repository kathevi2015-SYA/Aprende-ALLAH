import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Smile } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-sky-600 mb-6 drop-shadow-sm">
          ¡Bienvenido, Pequeño Musulmán!
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-[Nunito]">
          Un lugar mágico para aprender, jugar y descubrir las maravillas de nuestra fe.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            to="/aprende" 
            title="Aprende Allah" 
            icon={<Star className="w-12 h-12 text-white" />} 
            color="bg-purple-500" 
            desc="Suras y Hadices explicados para ti."
          />
          <FeatureCard 
            to="/profetas" 
            title="Historias" 
            icon={<Heart className="w-12 h-12 text-white" />} 
            color="bg-emerald-500" 
            desc="Conoce a nuestros amados profetas."
          />
           <FeatureCard 
            to="/galeria" 
            title="Galería" 
            icon={<Smile className="w-12 h-12 text-white" />} 
            color="bg-blue-500" 
            desc="Imágenes hermosas del mundo islámico."
          />
           <FeatureCard 
            to="/juegos" 
            title="Juegos" 
            icon={<Star className="w-12 h-12 text-white" />} 
            color="bg-orange-500" 
            desc="¡Diviértete mientras aprendes!"
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ to, title, icon, color, desc }: { to: string; title: string; icon: React.ReactNode; color: string; desc: string }) => (
  <Link 
    to={to} 
    className={`block p-6 rounded-3xl ${color} shadow-xl transform hover:-translate-y-2 transition-all duration-300 group`}
  >
    <div className="flex justify-center mb-4 bg-white/20 rounded-full w-20 h-20 mx-auto items-center">
      {icon}
    </div>
    <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
    <p className="text-white/90 text-lg leading-tight">{desc}</p>
  </Link>
);

export default Home;
