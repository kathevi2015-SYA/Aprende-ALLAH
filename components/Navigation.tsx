import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Image as ImageIcon, Gamepad2, Phone, Moon } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Dynamic logo generation: Mecca background, children reading Quran in front, circular logo style
  const logoUrl = "https://image.pollinations.ai/prompt/cute%20cartoon%20logo%20illustration%20group%20of%20muslim%20children%20reading%20quran%20book%20with%20holy%20kaaba%20mecca%20in%20background%20circular%20vector%20flat%20design?width=200&height=200&nologo=true";

  const navItems = [
    { path: '/aprende', label: 'Aprende Allah', icon: <Moon className="w-5 h-5" />, color: 'text-purple-600' },
    { path: '/profetas', label: 'Historia Profetas', icon: <BookOpen className="w-5 h-5" />, color: 'text-emerald-600' },
    { path: '/galeria', label: 'Galería', icon: <ImageIcon className="w-5 h-5" />, color: 'text-blue-500' },
    { path: '/juegos', label: 'Juegos', icon: <Gamepad2 className="w-5 h-5" />, color: 'text-orange-500' },
    { path: '/contacto', label: 'Contacto', icon: <Phone className="w-5 h-5" />, color: 'text-pink-500' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={logoUrl} 
                alt="Pequeño Musulmán Logo" 
                className="w-12 h-12 rounded-full border-2 border-sky-100 shadow-md object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <span className="font-[Fredoka] text-2xl font-bold text-sky-600 tracking-wide">Pequeño Musulmán</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2
                  ${isActive(item.path) 
                    ? 'bg-sky-100 text-sky-700 shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`}
              >
                <span className={isActive(item.path) ? item.color : ''}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl font-bold text-base transition-colors flex items-center gap-3
                  ${isActive(item.path)
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