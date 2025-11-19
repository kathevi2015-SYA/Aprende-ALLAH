import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Star, BookOpen, Image as ImageIcon, Gamepad2, Phone, Moon } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/aprende', label: 'Aprende Allah', icon: <Moon className="w-5 h-5" />, color: 'text-purple-600' },
    { path: '/profetas', label: 'Historia Profetas', icon: <BookOpen className="w-5 h-5" />, color: 'text-emerald-600' },
    { path: '/galeria', label: 'Galería', icon: <ImageIcon className="w-5 h-5" />, color: 'text-blue-500' },
    { path: '/juegos', label: 'Juegos', icon: <Gamepad2 className="w-5 h-5" />, color: 'text-orange-500' },
    { path: '/contacto', label: 'Contacto', icon: <Phone className="w-5 h-5" />, color: 'text-pink-500' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b-4 border-yellow-400 sticky top-0 z-50 rounded-b-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="bg-yellow-400 p-2 rounded-full group-hover:rotate-12 transition-transform duration-300">
                <Star className="h-8 w-8 text-white fill-white" />
              </div>
              <span className="font-bold text-2xl text-slate-700 tracking-wider font-[Fredoka]">Pequeño Musulmán</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all duration-200 ${
                  isActive(item.path) 
                    ? 'bg-sky-100 text-sky-700 shadow-inner ring-2 ring-sky-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:scale-105'
                }`}
              >
                <span className={item.color}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-sky-600 hover:bg-sky-50 focus:outline-none"
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white rounded-b-2xl shadow-xl border-t border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 block px-4 py-3 rounded-xl text-lg font-bold ${
                  isActive(item.path)
                    ? 'bg-sky-50 text-sky-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                 <span className={item.color}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
