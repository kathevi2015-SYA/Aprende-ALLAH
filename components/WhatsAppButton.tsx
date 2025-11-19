import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/1234567890" // Replace with actual number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 z-50 flex items-center justify-center animate-bounce"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-8 h-8 fill-current" />
    </a>
  );
};

export default WhatsAppButton;
