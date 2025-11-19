import React from 'react';

const Gallery: React.FC = () => {
  // Using Lorem Picsum with different seeds to simulate variety
  const images = [
    { id: 101, title: "La belleza de la Creación", seed: 200 },
    { id: 102, title: "Mezquitas del Mundo", seed: 201 },
    { id: 103, title: "Naturaleza", seed: 202 },
    { id: 104, title: "El cielo estrellado", seed: 203 },
    { id: 105, title: "Familia", seed: 204 },
    { id: 106, title: "Lectura", seed: 206 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">Galería Maravillosa</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((img) => (
          <div key={img.id} className="bg-white p-4 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="aspect-w-4 aspect-h-3 mb-4 overflow-hidden rounded-2xl bg-gray-200">
              <img 
                src={`https://picsum.photos/id/${img.seed}/500/400`} 
                alt={img.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <h3 className="text-xl font-bold text-center text-gray-700">{img.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
