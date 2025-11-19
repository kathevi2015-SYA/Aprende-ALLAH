import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-pink-500 text-center mb-8">Contáctanos</h1>
      
      <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-pink-100">
        {sent ? (
          <div className="text-center py-12 animate-fade-in">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Mensaje Enviado!</h2>
            <p className="text-gray-600">Gracias por escribirnos. Que Allah te bendiga.</p>
            <button onClick={() => setSent(false)} className="mt-6 text-pink-500 font-bold hover:underline">Enviar otro mensaje</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Tu Nombre</label>
              <input type="text" required className="w-full px-4 py-3 rounded-xl bg-pink-50 border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all" placeholder="¿Cómo te llamas?" />
            </div>
            
            <div>
              <label className="block text-gray-700 font-bold mb-2">Tu Correo (o el de tus papás)</label>
              <input type="email" required className="w-full px-4 py-3 rounded-xl bg-pink-50 border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all" placeholder="correo@ejemplo.com" />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Mensaje</label>
              <textarea required rows={4} className="w-full px-4 py-3 rounded-xl bg-pink-50 border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all" placeholder="Escribe aquí..." />
            </div>

            <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl transition-colors flex justify-center items-center gap-2">
              <Send className="w-5 h-5" /> Enviar Mensaje
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
