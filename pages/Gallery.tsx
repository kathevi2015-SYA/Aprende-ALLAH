
import React, { useState } from 'react';
import { ZoomIn, Download, Palette, Image as ImageIcon, Loader2, BookOpen, Star, Printer, Type, Book } from 'lucide-react';

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'color' | 'paint' | 'workbook'>('color');
  const [workbookMode, setWorkbookMode] = useState<'alphabet' | 'grammar' | 'activities'>('alphabet');
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  // Helper for consistent image generation style
  const getImageUrl = (prompt: string) => {
    return `https://image.pollinations.ai/prompt/3d%20cartoon%20disney%20pixar%20style%20illustration%20of%20${encodeURIComponent(prompt)}%20warm%20lighting%20cute%20soft%20colors?width=800&height=600&nologo=true`;
  };

  // Helper for coloring pages (black and white line art)
  const getColoringUrl = (prompt: string) => {
    return `https://image.pollinations.ai/prompt/kids%20coloring%20page%20bold%20black%20lines%20white%20background%20high%20contrast%20simple%20vector%20line%20art%20no%20shading%20no%20gray%20fill%20clear%20distinct%20shapes%20cute%20style%20of%20${encodeURIComponent(prompt)}?width=800&height=600&nologo=true`;
  };

  // NEW: Helper for Workbook illustrations (Strict Black and White Line Art)
  const getWorkbookIllustration = (prompt: string) => {
      // Enforce strict black and white line art parameters
      return `https://image.pollinations.ai/prompt/black%20and%20white%20coloring%20page%20children%20book%20illustration%20of%20${encodeURIComponent(prompt)}%20simple%20thick%20black%20outlines%20white%20background%20no%20shading%20no%20gray%20no%20color%20minimalist%20vector%20line%20art?width=500&height=400&nologo=true`;
  };

  const images = [
    { 
      id: 1, 
      title: "Alegría de la Infancia", 
      subtitle: "Juegos Islámicos",
      url: getImageUrl("muslim kids playing happily in a playground park with a beautiful mosque in the background sunny day birds flying"),
      color: "bg-emerald-500"
    },
    { 
      id: 2, 
      title: "Creencia Firme", 
      subtitle: "Ramadán",
      url: getImageUrl("muslim couple man and woman praying together at night with glowing light large crescent moon spiritual atmosphere magical dust"),
      color: "bg-indigo-500"
    },
    { 
      id: 3, 
      title: "Aprendiendo con Alegría", 
      subtitle: "Educación",
      url: getImageUrl("muslim female teacher with hijab reading a magical pop-up book to happy children sitting in circle in a cozy library classroom"),
      color: "bg-pink-500"
    },
    { 
      id: 4, 
      title: "Nuestra Hermosa Mezquita", 
      subtitle: "Lugares Sagrados",
      url: getImageUrl("beautiful golden mosque architecture with minarets at sunset clouds reflection in water"),
      color: "bg-amber-500"
    },
    { 
      id: 5, 
      title: "El Pequeño Lector", 
      subtitle: "Sagrado Corán",
      url: getImageUrl("cute little muslim boy sitting on a carpet reading the quran with holy light coming from book peaceful"),
      color: "bg-teal-500"
    },
    { 
      id: 6, 
      title: "Naturaleza Perfecta", 
      subtitle: "Creación de Allah",
      url: getImageUrl("beautiful garden paradise nature flowers river birds deer peaceful islamic art style"),
      color: "bg-green-500"
    },
    {
      id: 7,
      title: "Cena de Iftar",
      subtitle: "Familia y Unión",
      url: getImageUrl("happy muslim family sitting on floor around delicious food eating iftar together cozy home warm lighting"),
      color: "bg-orange-500"
    },
    {
      id: 8,
      title: "Gatito en la Mezquita",
      subtitle: "Amor a los Animales",
      url: getImageUrl("cute fluffy cat sitting inside a beautiful mosque on soft carpet sunbeams shining through window"),
      color: "bg-cyan-500"
    },
    {
      id: 9,
      title: "Viaje del Hajj",
      subtitle: "Peregrinación",
      url: getImageUrl("people walking around the holy kaaba in mecca white clothes peaceful crowd aerial view cartoon style"),
      color: "bg-slate-600"
    },
    {
      id: 10,
      title: "Fiesta de Eid",
      subtitle: "Celebración",
      url: getImageUrl("muslim children celebrating eid with balloons gifts sweets colorful fireworks in sky happy jumping"),
      color: "bg-purple-500"
    },
    {
      id: 11,
      title: "Ayudando con Amor",
      subtitle: "Sadaqah",
      url: getImageUrl("cute muslim boy helping an elderly man crossing the street kindness charity cartoon"),
      color: "bg-red-400"
    },
    {
      id: 12,
      title: "Contemplando las Estrellas",
      subtitle: "SubhanAllah",
      url: getImageUrl("muslim girl looking at starry night sky with telescope desert landscape awe wonder"),
      color: "bg-indigo-800"
    },
    {
      id: 13,
      title: "La Araña Protectora",
      subtitle: "Cueva de Thawr",
      url: getImageUrl("spider web covering cave entrance moonlight desert night prophet story"),
      color: "bg-slate-700"
    },
    {
      id: 14,
      title: "La Abeja Trabajadora",
      subtitle: "Surah An-Nahl",
      url: getImageUrl("cute honey bee on a yellow flower sunny garden nature detail"),
      color: "bg-yellow-500"
    },
    {
      id: 15,
      title: "La Hormiga Sabia",
      subtitle: "Profeta Sulaiman",
      url: getImageUrl("cute ant carrying a leaf in green grass macro close up nature"),
      color: "bg-red-600"
    },
    {
      id: 16,
      title: "La Ballena de Yunus",
      subtitle: "Profeta Yunus",
      url: getImageUrl("big blue whale swimming underwater light beams ocean majestic"),
      color: "bg-blue-800"
    },
    {
      id: 17,
      title: "Cosecha de Dátiles",
      subtitle: "Frutos Benditos",
      url: getImageUrl("palm tree full of fresh dates oasis desert landscape sunshine"),
      color: "bg-amber-600"
    },
    {
      id: 18,
      title: "El Olivo",
      subtitle: "Luz sobre Luz",
      url: getImageUrl("ancient olive tree with olives sun rays peaceful garden"),
      color: "bg-green-700"
    },
    {
      id: 19,
      title: "Laylatul Qadr",
      subtitle: "Noche del Destino",
      url: getImageUrl("peaceful night sky open window light shining down spiritual atmosphere"),
      color: "bg-indigo-900"
    },
    {
      id: 20,
      title: "Haciendo Wudu",
      subtitle: "Pureza",
      url: getImageUrl("muslim boy washing hands water fountain running water wudu"),
      color: "bg-cyan-600"
    },
    {
      id: 21,
      title: "Sujood (Postración)",
      subtitle: "Cerca de Allah",
      url: getImageUrl("muslim man in sujood prayer position on prayer rug peaceful"),
      color: "bg-purple-600"
    },
    {
      id: 22,
      title: "Aprendiendo Corán",
      subtitle: "Padre e Hijo",
      url: getImageUrl("muslim father teaching son quran reading together warm lighting home"),
      color: "bg-orange-600"
    },
    {
      id: 23,
      title: "Compartiendo Comida",
      subtitle: "Generosidad",
      url: getImageUrl("muslim neighbors sharing food plate smiling kindness community"),
      color: "bg-pink-500"
    },
    {
      id: 24,
      title: "Una Sonrisa",
      subtitle: "Es Caridad",
      url: getImageUrl("happy muslim child smiling big teeth close up joy sunnah"),
      color: "bg-yellow-400"
    },
    {
      id: 25,
      title: "Plantando un Árbol",
      subtitle: "Sadaqah Jariyah",
      url: getImageUrl("kid planting a small tree sapling in soil gardening nature"),
      color: "bg-emerald-600"
    },
    {
      id: 26,
      title: "Visitando al Enfermo",
      subtitle: "Compasión",
      url: getImageUrl("boy visiting friend in bed bringing flowers get well soon kindness"),
      color: "bg-rose-500"
    },
    {
      id: 27,
      title: "Agua Zamzam",
      subtitle: "Makkah",
      url: getImageUrl("traditional zamzam water pitcher and cup mecca background"),
      color: "bg-blue-400"
    },
    {
      id: 28,
      title: "Monte Arafat",
      subtitle: "Día del Hajj",
      url: getImageUrl("mount arafat hill with people praying white clothes sunny day"),
      color: "bg-stone-500"
    },
    {
      id: 29,
      title: "Oración de Eid",
      subtitle: "Comunidad",
      url: getImageUrl("large group of muslims praying outside green grass eid prayer colorful clothes"),
      color: "bg-teal-500"
    },
    {
      id: 30,
      title: "Mirando la Luna",
      subtitle: "Comienzo del Mes",
      url: getImageUrl("father and daughter looking at crescent moon telescope night sky"),
      color: "bg-indigo-700"
    },
    {
      id: 31,
      title: "El Desierto de Noche",
      subtitle: "Reflexión",
      url: getImageUrl("desert dunes at night stars galaxy milky way beautiful nature"),
      color: "bg-blue-900"
    },
    {
      id: 32,
      title: "Pájaros Volando",
      subtitle: "Libertad",
      url: getImageUrl("flock of white birds flying in blue sky clouds peaceful"),
      color: "bg-sky-400"
    }
  ];

  const coloringImages = [
    {
      id: 101,
      title: "La Mezquita",
      subtitle: "Pinta la Mezquita",
      url: getColoringUrl("beautiful mosque exterior with minarets and dome clouds"),
      color: "bg-slate-500"
    },
    {
      id: 102,
      title: "Alfombra de Oración",
      subtitle: "Diseña tu Alfombra",
      url: getColoringUrl("islamic prayer rug with geometric patterns and arch design"),
      color: "bg-purple-500"
    },
    {
      id: 103,
      title: "La Kaaba",
      subtitle: "La Meca",
      url: getColoringUrl("holy kaaba in mecca simple outline"),
      color: "bg-stone-600"
    },
    {
      id: 104,
      title: "Linterna de Ramadán",
      subtitle: "Fanoos",
      url: getColoringUrl("traditional ramadan lantern fanoos hanging with stars"),
      color: "bg-orange-500"
    },
    {
      id: 105,
      title: "Niño Rezando",
      subtitle: "Salah",
      url: getColoringUrl("cute muslim boy making dua raising hands prayer cap"),
      color: "bg-blue-500"
    },
    {
      id: 106,
      title: "Niña con Hijab",
      subtitle: "Modestia",
      url: getColoringUrl("cute muslim girl with hijab smiling flower in hand"),
      color: "bg-rose-500"
    },
    {
      id: 107,
      title: "El Camello",
      subtitle: "Animales del Corán",
      url: getColoringUrl("cute camel standing in desert near palm tree simple outline"),
      color: "bg-yellow-600"
    },
    {
      id: 108,
      title: "Estrella Geométrica",
      subtitle: "Arte Islámico",
      url: getColoringUrl("islamic geometric star pattern simple mandala style"),
      color: "bg-teal-600"
    },
    {
      id: 109,
      title: "Tasbih (Rosario)",
      subtitle: "Recuerdo de Allah",
      url: getColoringUrl("prayer beads tasbih misbaha simple string of beads outline"),
      color: "bg-green-600"
    },
    {
      id: 110,
      title: "Dando Caridad",
      subtitle: "Zakat",
      url: getColoringUrl("hands giving coin to another hand charity symbol simple outline"),
      color: "bg-emerald-500"
    },
    {
      id: 111,
      title: "El Sagrado Corán",
      subtitle: "Lectura",
      url: getColoringUrl("open quran book on a wooden stand rehal simple outline"),
      color: "bg-amber-700"
    },
    {
      id: 112,
      title: "Dátiles y Agua",
      subtitle: "Romper el Ayuno",
      url: getColoringUrl("plate of dates and glass of water simple food outline"),
      color: "bg-orange-700"
    },
    {
      id: 113,
      title: "La Araña",
      subtitle: "Surah Al-Ankabut",
      url: getColoringUrl("spider on a web simple outline insect nature"),
      color: "bg-slate-600"
    },
    {
      id: 114,
      title: "La Abeja",
      subtitle: "Surah An-Nahl",
      url: getColoringUrl("honey bee on flower simple outline"),
      color: "bg-yellow-600"
    },
    {
      id: 115,
      title: "La Hormiga",
      subtitle: "Surah An-Naml",
      url: getColoringUrl("cute ant walking simple outline"),
      color: "bg-red-500"
    },
    {
      id: 116,
      title: "El Elefante",
      subtitle: "Surah Al-Fil",
      url: getColoringUrl("cute elephant standing simple outline"),
      color: "bg-gray-500"
    },
    {
      id: 117,
      title: "Oveja Lanuda",
      subtitle: "Rebaño",
      url: getColoringUrl("cute fluffy sheep standing in grass simple outline"),
      color: "bg-stone-400"
    },
    {
      id: 118,
      title: "Pez Grande",
      subtitle: "Historia de Yunus",
      url: getColoringUrl("big fish whale underwater simple outline"),
      color: "bg-blue-600"
    },
    {
      id: 119,
      title: "Pájaro Hudhud",
      subtitle: "Historia de Sulaiman",
      url: getColoringUrl("hoopoe bird with crest simple outline branch"),
      color: "bg-orange-600"
    },
    {
      id: 120,
      title: "Rama de Olivo",
      subtitle: "Paz",
      url: getColoringUrl("olive branch with olives simple outline"),
      color: "bg-green-600"
    },
    {
      id: 121,
      title: "Palmera Datilera",
      subtitle: "Naturaleza",
      url: getColoringUrl("palm tree with dates simple outline"),
      color: "bg-amber-600"
    },
    {
      id: 122,
      title: "Granada",
      subtitle: "Fruta del Paraíso",
      url: getColoringUrl("pomegranate fruit open simple outline"),
      color: "bg-red-600"
    },
    {
      id: 123,
      title: "Higo",
      subtitle: "At-Tin",
      url: getColoringUrl("figs on branch simple outline"),
      color: "bg-purple-600"
    },
    {
      id: 124,
      title: "Tawaf",
      subtitle: "Alrededor de Kaaba",
      url: getColoringUrl("kaaba with people walking around simple outline"),
      color: "bg-black"
    },
    {
      id: 125,
      title: "Minarete",
      subtitle: "Adhan",
      url: getColoringUrl("mosque minaret tower simple outline"),
      color: "bg-teal-600"
    },
    {
      id: 126,
      title: "Domo de la Roca",
      subtitle: "Jerusalén",
      url: getColoringUrl("dome of the rock masjid jerusalem simple outline"),
      color: "bg-yellow-500"
    },
    {
      id: 127,
      title: "Misbaha",
      subtitle: "Cuentas",
      url: getColoringUrl("prayer beads close up simple outline"),
      color: "bg-green-500"
    },
    {
      id: 128,
      title: "Rehal",
      subtitle: "Soporte de Corán",
      url: getColoringUrl("wooden book stand rehal simple outline"),
      color: "bg-brown-500"
    },
    {
      id: 129,
      title: "Luna y Estrellas",
      subtitle: "Noche",
      url: getColoringUrl("crescent moon and stars clouds simple outline"),
      color: "bg-indigo-600"
    },
    {
      id: 130,
      title: "Lavando Manos",
      subtitle: "Wudu",
      url: getColoringUrl("hands under water tap washing simple outline"),
      color: "bg-cyan-500"
    },
    {
      id: 131,
      title: "Haciendo Dua",
      subtitle: "Súplica",
      url: getColoringUrl("muslim girl hands raised in dua simple outline"),
      color: "bg-pink-500"
    },
    {
      id: 132,
      title: "Puerta de Mezquita",
      subtitle: "Entrada",
      url: getColoringUrl("beautiful arch door mosque simple outline"),
      color: "bg-emerald-600"
    }
  ];

  const alphabetMap = [
    { letter: "Alif", arabic: "أ", word: "Arnab", es: "Conejo", img: "rabbit" },
    { letter: "Ba", arabic: "ب", word: "Batta", es: "Pato", img: "duck" },
    { letter: "Ta", arabic: "ت", word: "Tuffaha", es: "Manzana", img: "apple" },
    { letter: "Tha", arabic: "ث", word: "Tha'lab", es: "Zorro", img: "fox" },
    { letter: "Jim", arabic: "ج", word: "Jamal", es: "Camello", img: "camel" },
    { letter: "Haa", arabic: "ح", word: "Hisan", es: "Caballo", img: "horse" },
    { letter: "Khaa", arabic: "خ", word: "Kharouf", es: "Oveja", img: "sheep" },
    { letter: "Dal", arabic: "د", word: "Dubb", es: "Oso", img: "teddy bear" },
    { letter: "Dhal", arabic: "ذ", word: "Dhura", es: "Maíz", img: "corn cob" },
    { letter: "Ra", arabic: "ر", word: "Rumman", es: "Granada", img: "pomegranate fruit" },
    { letter: "Zay", arabic: "ز", word: "Zarafa", es: "Jirafa", img: "giraffe" },
    { letter: "Sin", arabic: "س", word: "Samaka", es: "Pez", img: "fish" },
    { letter: "Shin", arabic: "ش", word: "Shams", es: "Sol", img: "sun" },
    { letter: "Sad", arabic: "ص", word: "Sarukh", es: "Cohete", img: "space rocket" },
    { letter: "Dad", arabic: "ض", word: "Difda", es: "Rana", img: "frog" },
    { letter: "Ta", arabic: "ط", word: "Ta'ira", es: "Avión", img: "airplane" },
    { letter: "Zaa", arabic: "ز", word: "Zarf", es: "Sobre", img: "envelope letter" },
    { letter: "Ayn", arabic: "ع", word: "Inab", es: "Uvas", img: "grapes bunch" },
    { letter: "Ghayn", arabic: "غ", word: "Ghayma", es: "Nube", img: "cloud" },
    { letter: "Fa", arabic: "ف", word: "Fil", es: "Elefante", img: "elephant" },
    { letter: "Qaf", arabic: "ق", word: "Qamar", es: "Luna", img: "crescent moon" },
    { letter: "Kaf", arabic: "ك", word: "Kitab", es: "Libro", img: "open book" },
    { letter: "Lam", arabic: "ل", word: "Laymun", es: "Limón", img: "lemon fruit" },
    { letter: "Mim", arabic: "م", word: "Masjid", es: "Mezquita", img: "mosque simple" },
    { letter: "Nun", arabic: "ن", word: "Najma", es: "Estrella", img: "star shape" },
    { letter: "Ha", arabic: "هـ", word: "Hadiyya", es: "Regalo", img: "gift box" },
    { letter: "Waw", arabic: "و", word: "Warda", es: "Rosa", img: "rose flower" },
    { letter: "Ya", arabic: "ي", word: "Yad", es: "Mano", img: "hand open palm" },
  ];

  const handleDownload = async (url: string, title: string, id: number) => {
    try {
      setDownloadingId(id);
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `PequeñoMusulman-${title.replace(/\s+/g, '-')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed", error);
      window.open(url, '_blank');
    } finally {
      setDownloadingId(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const displayData = activeTab === 'color' 
    ? images 
    : coloringImages;

  return (
    <div className="min-h-screen bg-sky-50 py-12 px-4 print:bg-white print:p-0">
      {/* Styles for Printing */}
      <style>{`
        @media print {
          @page { margin: 0; size: auto; }
          body { background: white; margin: 0; padding: 0; }
          nav, footer, .whatsapp-button, .no-print { display: none !important; }
          .print-content { display: block !important; width: 100%; margin: 0; padding: 0; }
          .page-break-after { page-break-after: always; }
          /* Hide everything that is not the print content */
          body > *:not(#root) { display: none; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto print:max-w-none print:w-full">
        <div className="text-center mb-8 space-y-4 print:hidden">
          <h1 className="text-5xl font-bold text-sky-800 drop-shadow-sm font-[Fredoka]">
            Galería Maravillosa
          </h1>
          <p className="text-xl text-sky-600">Imágenes, dibujos y cuadernos para aprender</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 print:hidden">
          <button
            onClick={() => setActiveTab('color')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg transition-all transform hover:scale-105 ${
              activeTab === 'color' 
                ? 'bg-sky-500 text-white shadow-lg ring-4 ring-sky-200' 
                : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            A Todo Color
          </button>
          <button
            onClick={() => setActiveTab('paint')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg transition-all transform hover:scale-105 ${
              activeTab === 'paint' 
                ? 'bg-pink-500 text-white shadow-lg ring-4 ring-pink-200' 
                : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Palette className="w-5 h-5" />
            Para Colorear
          </button>
          <button
            onClick={() => setActiveTab('workbook')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg transition-all transform hover:scale-105 ${
              activeTab === 'workbook' 
                ? 'bg-teal-500 text-white shadow-lg ring-4 ring-teal-200' 
                : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Cuaderno Árabe
          </button>
        </div>
        
        {activeTab === 'workbook' ? (
           // --- WORKBOOK VIEW (Custom Layout) ---
           <div className="space-y-12 max-w-4xl mx-auto print:max-w-none print:w-full">
             
             {/* Workbook Toggle Navigation */}
             <div className="print:hidden flex justify-center gap-4 mb-8 flex-wrap">
                <button 
                  onClick={() => setWorkbookMode('alphabet')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold transition-all ${workbookMode === 'alphabet' ? 'bg-teal-600 text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200'}`}
                >
                  <Type className="w-4 h-4" /> El Alfabeto
                </button>
                <button 
                  onClick={() => setWorkbookMode('grammar')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold transition-all ${workbookMode === 'grammar' ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200'}`}
                >
                  <Book className="w-4 h-4" /> Gramática
                </button>
                <button 
                  onClick={() => setWorkbookMode('activities')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold transition-all ${workbookMode === 'activities' ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200'}`}
                >
                  <Star className="w-4 h-4" /> Actividades Varias
                </button>
             </div>

             <div className="print:hidden bg-teal-50 p-6 rounded-2xl border-2 border-teal-100 text-center flex flex-col items-center">
                <p className="text-teal-800 font-bold mb-4">
                  {workbookMode === 'alphabet' ? '¡Imprime el cuaderno de letras para trazar!' : workbookMode === 'grammar' ? '¡Imprime el cuaderno de gramática para colorear!' : '¡Imprime tu gran libro de actividades islámicas!'}
                </p>
                <button 
                  onClick={handlePrint}
                  className={`${workbookMode === 'alphabet' ? 'bg-teal-600 hover:bg-teal-700' : workbookMode === 'grammar' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-purple-600 hover:bg-purple-700'} text-white px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transition-colors`}
                >
                  <Printer className="w-5 h-5" /> {workbookMode === 'alphabet' ? 'Imprimir Alfabeto' : workbookMode === 'grammar' ? 'Imprimir Gramática' : 'Imprimir Libro de Actividades'}
                </button>
             </div>

             {/* === ALPHABET WORKBOOK === */}
             {workbookMode === 'alphabet' && (
               <div className="animate-fade-in print-content">
                 {/* Cover Page Alphabet */}
                 <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border-4 border-teal-100 text-center print:border-none print:shadow-none" style={{ pageBreakAfter: 'always' }}>
                    <h1 className="text-4xl md:text-6xl font-bold text-teal-600 mb-6 font-[Fredoka]">Mi Libro del Alfabeto Árabe</h1>
                    <p className="text-xl text-gray-600 mb-8">¡Aprende, traza y colorea las letras!</p>
                    <img 
                      src={getWorkbookIllustration("islamic geometric pattern star moon")} 
                      alt="Cover" 
                      className="mx-auto w-64 h-64 object-contain border-4 border-dashed border-teal-200 rounded-xl p-4"
                    />
                    <div className="mt-12 h-1 border-b-4 border-dashed border-gray-300 mx-auto w-3/4"></div>
                    <p className="text-gray-400 mt-2">Nombre del Estudiante</p>
                 </div>

                 {/* Alphabet Pages */}
                 {alphabetMap.map((item, index) => (
                    <div key={index} className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border-4 border-teal-100 print:border-none print:shadow-none print:mt-0" style={{ pageBreakAfter: 'always' }}>
                       <div className="flex justify-between items-center mb-8 border-b-2 border-dashed border-gray-200 pb-4">
                          <h2 className="text-3xl font-bold text-teal-700">Letra {item.letter} ({item.arabic})</h2>
                          <span className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full font-bold">Página {index + 2}</span>
                       </div>

                       <div className="grid md:grid-cols-2 gap-8 items-center">
                          <div className="text-center">
                             {/* Arabic Letter Big Display */}
                             <div className="text-[10rem] leading-none font-bold text-transparent" style={{ WebkitTextStroke: '2px #0d9488' }}>
                                {item.arabic}
                             </div>
                             <p className="text-2xl font-bold text-gray-600 mt-4">{item.letter}</p>
                             <p className="text-gray-400 text-sm">¡Colorea la letra!</p>
                          </div>
                          
                          <div className="border-4 border-dashed border-teal-100 rounded-xl p-4 bg-teal-50/30 print:bg-transparent">
                             <img 
                               src={getWorkbookIllustration(`${item.img}`)} 
                               alt={item.word}
                               className="w-full h-48 object-contain mix-blend-multiply"
                             />
                             <p className="text-center font-bold text-teal-600 mt-2 text-xl">{item.word} ({item.es})</p>
                          </div>
                       </div>

                       {/* Tracing Section */}
                       <div className="mt-12 space-y-8">
                          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 print:bg-transparent print:border-gray-400">
                             <p className="font-bold text-gray-500 mb-4 flex items-center gap-2">
                                <span className="bg-teal-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm print:text-black print:border print:border-black print:bg-transparent">1</span>
                                Traza la letra:
                             </p>
                             <div className="flex justify-between text-6xl text-gray-300 tracking-widest" dir="rtl">
                                <span className="border-b-2 border-dashed border-gray-300 pb-2 w-full text-center relative flex justify-around">
                                  {Array(6).fill(item.arabic).map((char, i) => (
                                    <span key={i} className="hover:text-teal-600 transition-colors cursor-crosshair" style={{ fontFamily: 'sans-serif' }}>{char}</span>
                                  ))}
                                </span>
                             </div>
                          </div>

                          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 print:bg-transparent print:border-gray-400">
                             <p className="font-bold text-gray-500 mb-4 flex items-center gap-2">
                                <span className="bg-teal-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm print:text-black print:border print:border-black print:bg-transparent">2</span>
                                Intenta escribirla tú solo:
                             </p>
                             <div className="h-16 border-b-2 border-gray-300 w-full relative">
                                <div className="absolute top-1/2 w-full border-t border-dashed border-gray-200"></div>
                             </div>
                             <div className="h-16 border-b-2 border-gray-300 w-full relative mt-4">
                                <div className="absolute top-1/2 w-full border-t border-dashed border-gray-200"></div>
                             </div>
                          </div>
                       </div>
                    </div>
                 ))}
               </div>
             )}

             {/* === GRAMMAR WORKBOOK === */}
             {workbookMode === 'grammar' && (
               <div className="animate-fade-in bg-white max-w-4xl mx-auto p-12 rounded-[2rem] shadow-xl border-l-[10px] border-red-500 print-content print:shadow-none print:border-l-0 print:border-none print:p-0" style={{ fontFamily: '"Comic Neue", cursive', backgroundImage: 'linear-gradient(#e1e1e1 1px, transparent 1px)', backgroundSize: '100% 30px' }}>
                  
                  {/* Grammar Cover Page */}
                  <div className="mb-12 text-center border-b-4 border-dashed border-gray-300 pb-12 print:border-none" style={{ pageBreakAfter: 'always' }}>
                     <h1 className="text-4xl md:text-5xl text-slate-700 bg-white inline-block px-6 py-3 rounded-2xl border-4 border-dashed border-yellow-400 font-bold font-[Fredoka] mb-6 print:border-black">
                        Cuaderno de Gramática
                     </h1>
                     <h2 className="text-2xl text-orange-500 font-bold mb-8">Los 3 Vestidos de las Palabras</h2>
                     <img 
                        src={getWorkbookIllustration("cute cartoon arabic letters wearing clothes funny")} 
                        alt="Grammar Cover" 
                        className="mx-auto w-64 h-64 object-contain border-4 border-dashed border-yellow-200 rounded-full p-6 bg-white print:border-black"
                     />
                     <div className="mt-8 h-1 border-b-4 border-dashed border-gray-300 mx-auto w-1/2"></div>
                     <p className="text-gray-400 mt-2">Nombre del Gramático</p>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-3xl mb-10 border-4 border-yellow-400 text-center text-xl text-gray-700 relative shadow-sm print:bg-white print:border-black" style={{ pageBreakAfter: 'always' }}>
                      <p>¡Hola amiguito! 🌟<br />
                      En árabe, las palabras cambian su "vestido" al final según lo que hacen en la oración. <br />
                      ¡Vamos a descubrir sus 3 superpoderes!</p>
                  </div>

                  {/* Section 1: RAF */}
                  <div className="mb-12 bg-white border-4 border-gray-200 rounded-3xl overflow-hidden shadow-sm print:border-black" style={{ pageBreakInside: 'avoid' }}>
                      <div className="bg-sky-500 text-white p-4 text-center text-2xl font-bold print:bg-white print:text-black print:border-b-2 print:border-black">1. Estado de Raf' (El Protagonista)</div>
                      <div className="p-8 flex flex-col items-center">
                          <div className="text-xl text-center mb-6 max-w-lg">
                              Cuando la palabra es el <b>SUJETO</b> (quien hace la acción), lleva una <b>DAMMA</b> (u).<br />
                              ¡Es como un pequeño lazo arriba!
                          </div>
                          
                          <div className="w-48 h-48 border-4 border-dashed border-gray-400 rounded-2xl mb-6 flex justify-center items-center bg-white p-2">
                               <img src={getWorkbookIllustration("cartoon boy wearing a crown raising hand happy")} alt="Drawing placeholder" className="w-full h-full object-contain" />
                          </div>

                          <div className="font-['Amiri'] text-7xl mb-4 dir-rtl text-gray-800" dir="rtl">
                              الْوَلَد<span className="text-sky-500 font-bold print:text-black">ُ</span>
                          </div>
                          <div className="text-gray-500 text-lg mb-6">(Al-walad<b>u</b>) - El niño</div>

                          <div className="bg-gray-50 border-2 border-dashed border-gray-300 p-4 w-full text-center rounded-2xl mb-6 print:bg-white">
                              <p className="text-lg text-gray-600 mb-2">Ejemplo: "El niño escribió"</p>
                              <div className="font-['Amiri'] text-4xl dir-rtl text-gray-800" dir="rtl">كَتَبَ <span className="text-sky-500 font-bold print:text-black">الْوَلَدُ</span></div>
                          </div>

                          <p className="text-orange-600 font-bold text-lg mb-4">✏️ ¡Repasa las letras grises!</p>
                          <div className="w-full">
                              <div className="h-20 border-b-2 border-gray-400 border-t border-dashed border-gray-200 relative mb-4 flex items-end justify-end pr-6">
                                  <span className="font-['Amiri'] text-5xl text-gray-200 tracking-widest leading-none dir-rtl select-none" dir="rtl">الْوَلَدُ &nbsp; &nbsp; الْوَلَدُ &nbsp; &nbsp; الْوَلَدُ</span>
                              </div>
                              <div className="h-20 border-b-2 border-gray-400 border-t border-dashed border-gray-200 relative mb-4"></div>
                          </div>
                      </div>
                  </div>

                  {/* Section 2: NASB */}
                  <div className="mb-12 bg-white border-4 border-gray-200 rounded-3xl overflow-hidden shadow-sm print:border-black" style={{ pageBreakBefore: 'always' }}>
                      <div className="bg-red-500 text-white p-4 text-center text-2xl font-bold print:bg-white print:text-black print:border-b-2 print:border-black">2. Estado de Nasb (El Objeto)</div>
                      <div className="p-8 flex flex-col items-center">
                          <div className="text-xl text-center mb-6 max-w-lg">
                              Cuando la palabra <b>RECIBE</b> la acción, lleva una <b>FATHA</b> (a).<br />
                              ¡Es una rayita arriba!
                          </div>

                          <div className="w-48 h-48 border-4 border-dashed border-gray-400 rounded-2xl mb-6 flex justify-center items-center bg-white p-2">
                               <img src={getWorkbookIllustration("cartoon boy receiving a gift box happy")} alt="Drawing placeholder" className="w-full h-full object-contain" />
                          </div>

                          <div className="font-['Amiri'] text-7xl mb-4 dir-rtl text-gray-800" dir="rtl">
                              الْوَلَد<span className="text-red-500 font-bold print:text-black">َ</span>
                          </div>
                          <div className="text-gray-500 text-lg mb-6">(Al-walad<b>a</b>) - Al niño</div>

                          <div className="bg-gray-50 border-2 border-dashed border-gray-300 p-4 w-full text-center rounded-2xl mb-6 print:bg-white">
                              <p className="text-lg text-gray-600 mb-2">Ejemplo: "Yo vi al niño"</p>
                              <div className="font-['Amiri'] text-4xl dir-rtl text-gray-800" dir="rtl">رَأَيْتُ <span className="text-red-500 font-bold print:text-black">الْوَلَدَ</span></div>
                          </div>

                          <p className="text-orange-600 font-bold text-lg mb-4">✏️ ¡A practicar la Fatha!</p>
                          <div className="w-full">
                              <div className="h-20 border-b-2 border-gray-400 border-t border-dashed border-gray-200 relative mb-4 flex items-end justify-end pr-6">
                                  <span className="font-['Amiri'] text-5xl text-gray-200 tracking-widest leading-none dir-rtl select-none" dir="rtl">الْوَلَدَ &nbsp; &nbsp; الْوَلَدَ &nbsp; &nbsp; الْوَلَدَ</span>
                              </div>
                              <div className="h-20 border-b-2 border-gray-400 border-t border-dashed border-gray-200 relative mb-4"></div>
                          </div>
                      </div>
                  </div>

                  {/* Section 3: JARR */}
                  <div className="mb-12 bg-white border-4 border-gray-200 rounded-3xl overflow-hidden shadow-sm print:border-black" style={{ pageBreakBefore: 'always' }}>
                      <div className="bg-emerald-500 text-white p-4 text-center text-2xl font-bold print:bg-white print:text-black print:border-b-2 print:border-black">3. Estado de Jarr (Después de preposición)</div>
                      <div className="p-8 flex flex-col items-center">
                          <div className="text-xl text-center mb-6 max-w-lg">
                              Cuando la palabra va después de palabras como "en", "sobre" o "de", lleva una <b>KASRA</b> (i).<br />
                              ¡Es una rayita abajo!
                          </div>

                          <div className="w-48 h-48 border-4 border-dashed border-gray-400 rounded-2xl mb-6 flex justify-center items-center bg-white p-2">
                               <img src={getWorkbookIllustration("cartoon boy sitting under a tree peaceful")} alt="Drawing placeholder" className="w-full h-full object-contain" />
                          </div>

                          <div className="font-['Amiri'] text-7xl mb-4 dir-rtl text-gray-800" dir="rtl">
                              الْوَلَد<span className="text-emerald-500 font-bold print:text-black">ِ</span>
                          </div>
                          <div className="text-gray-500 text-lg mb-6">(Al-walad<b>i</b>) - Del niño / Con el niño</div>

                          <div className="bg-gray-50 border-2 border-dashed border-gray-300 p-4 w-full text-center rounded-2xl mb-6 print:bg-white">
                              <p className="text-lg text-gray-600 mb-2">Ejemplo: "Fui hacia el niño"</p>
                              <div className="font-['Amiri'] text-4xl dir-rtl text-gray-800" dir="rtl">ذَهَبْتُ إِلَى <span className="text-emerald-500 font-bold print:text-black">الْوَلَدِ</span></div>
                          </div>

                          <p className="text-orange-600 font-bold text-lg mb-4">✏️ ¡Cuidado, la rayita va abajo!</p>
                          <div className="w-full">
                              <div className="h-20 border-b-2 border-gray-400 border-t border-dashed border-gray-200 relative mb-4 flex items-end justify-end pr-6">
                                  <span className="font-['Amiri'] text-5xl text-gray-200 tracking-widest leading-none dir-rtl select-none" dir="rtl">الْوَلَدِ &nbsp; &nbsp; الْوَلَدِ &nbsp; &nbsp; الْوَلَدِ</span>
                              </div>
                              <div className="h-20 border-b-2 border-gray-400 border-t border-dashed border-gray-200 relative mb-4"></div>
                          </div>
                      </div>
                  </div>

                  <div className="text-center mt-12 print:break-inside-avoid">
                      <h3 className="text-2xl font-bold text-yellow-600 bg-yellow-50 inline-block px-8 py-4 rounded-full border-2 border-yellow-300 shadow-md print:border-black print:bg-white print:text-black">
                          🌟 ¡Buen trabajo! ¡Has completado la tarea! 🌟
                      </h3>
                  </div>
               </div>
             )}

             {/* === ACTIVITIES WORKBOOK (EXTENDED WITH COLORING IMAGES) === */}
             {workbookMode === 'activities' && (
                <div className="animate-fade-in flex flex-col items-center space-y-8 print:space-y-0 print:block print-content">
                    
                    {/* Page 1: Cover */}
                    <div className="bg-white w-full max-w-[210mm] min-h-[297mm] p-[20mm] shadow-xl border border-gray-200 print:shadow-none print:border-none print:w-full print:h-full box-border flex flex-col justify-center items-center border-box" style={{ pageBreakAfter: 'always' }}>
                         <div className="border-[6px] border-double border-black h-full w-full p-8 flex flex-col justify-center items-center rounded-xl">
                             <h1 className="text-5xl font-bold text-center mb-12 uppercase leading-tight font-[Comic Neue]">Mi Gran Libro<br/>de Actividades Islámicas</h1>
                             <div className="w-full h-[350px] border-4 border-dashed border-black rounded-2xl flex justify-center items-center mb-12 p-4">
                                 <img src={getWorkbookIllustration("muslim kids reading quran under a tree cute cartoon coloring page")} alt="Cover" className="w-full h-full object-contain" />
                             </div>
                             <div className="text-center w-full mt-8">
                                 <p className="text-2xl font-bold mb-4 font-[Comic Neue]">Este libro pertenece a:</p>
                                 <div className="border-b-4 border-black w-3/4 mx-auto h-12"></div>
                             </div>
                         </div>
                    </div>

                    {/* Page 2: 5 Pillars - COLORING EDITION */}
                    <div className="bg-white w-full max-w-[210mm] min-h-[297mm] p-[20mm] shadow-xl border border-gray-200 print:shadow-none print:border-none print:w-full print:h-full box-border" style={{ pageBreakAfter: 'always' }}>
                         <h1 className="text-3xl font-bold text-center border-4 border-black rounded-2xl p-4 mb-8 uppercase font-[Comic Neue]">Los 5 Pilares del Islam</h1>
                         <p className="text-center text-lg mb-8 font-[Comic Neue]">¡Colorea los dibujos de cada pilar!</p>
                         
                         {/* Centered Flex Container for Pillars */}
                         <div className="flex flex-wrap justify-center gap-6">
                             {[
                                 { num: 1, name: "Shahada", arabic: "الشَّهَادَة", img: "hand pointing finger index tawhid outline" },
                                 { num: 2, name: "Salah", arabic: "الصَّلَاة", img: "prayer rug carpet outline" },
                                 { num: 3, name: "Zakah", arabic: "الزَّكَاة", img: "money bag sack with coins outline" },
                                 { num: 4, name: "Sawm", arabic: "الصَّوْم", img: "bowl of dates and water glass outline" },
                                 { num: 5, name: "Hajj", arabic: "الْحَجّ", img: "kaaba mecca simple outline" }
                             ].map((p) => (
                                 <div key={p.num} className="w-[30%] border-2 border-black rounded-t-xl p-2 text-center mb-4 flex flex-col items-center">
                                     <h3 className="font-bold font-[Comic Neue] text-lg mb-2">{p.num}. {p.name}</h3>
                                     <div className="h-28 w-full border-2 border-dashed border-black rounded-lg mb-2 flex items-center justify-center p-2">
                                         <img src={getWorkbookIllustration(p.img)} alt={p.name} className="h-full object-contain" />
                                     </div>
                                     <div className="font-['Amiri'] text-2xl text-gray-300 font-bold tracking-widest">{p.arabic}</div>
                                 </div>
                             ))}
                         </div>

                         <div className="mt-4 border-4 border-dashed border-black p-6 rounded-xl font-[Comic Neue]">
                             <h3 className="text-xl font-bold mb-4 text-center">¡Une con una línea!</h3>
                             <ul className="space-y-4 text-xl">
                                 <li className="flex justify-between items-center px-8"><span>Salah</span> <span>⭕ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ⭕</span> <span>Peregrinación</span></li>
                                 <li className="flex justify-between items-center px-8"><span>Hajj</span> <span>⭕ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ⭕</span> <span>Oración</span></li>
                                 <li className="flex justify-between items-center px-8"><span>Zakah</span> <span>⭕ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ⭕</span> <span>Ayuno</span></li>
                                 <li className="flex justify-between items-center px-8"><span>Sawm</span> <span>⭕ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ⭕</span> <span>Caridad</span></li>
                             </ul>
                         </div>
                    </div>

                    {/* Page 3: 6 Pillars of Iman - COLORING ICONS */}
                    <div className="bg-white w-full max-w-[210mm] min-h-[297mm] p-[20mm] shadow-xl border border-gray-200 print:shadow-none print:border-none print:w-full print:h-full box-border" style={{ pageBreakAfter: 'always' }}>
                        <h1 className="text-3xl font-bold text-center border-4 border-black rounded-2xl p-4 mb-8 uppercase font-[Comic Neue]">Los 6 Pilares de la Fe</h1>
                        <p className="text-center text-lg mb-8 font-[Comic Neue]">Colorea lo que creemos en nuestro corazón.</p>

                        <div className="grid grid-cols-2 gap-8 mb-8">
                            {[
                                { num: 1, title: "Creer en Allah", arabic: "اللّٰه", img: "word allah in arabic calligraphy outline" },
                                { num: 2, title: "Sus Ángeles", arabic: "المَلَائِكَة", img: "wings of angel light outline" },
                                { num: 3, title: "Sus Libros", arabic: "الكُتُب", img: "holy quran book open outline" },
                                { num: 4, title: "Sus Profetas", arabic: "الرُّسُل", img: "minaret mosque outline" },
                                { num: 5, title: "El Último Día", arabic: "اليَوْم الآخِر", img: "scales of justice balance outline" },
                                { num: 6, title: "El Destino", arabic: "القَدْر", img: "scroll paper with writing pen outline" },
                            ].map((item) => (
                                <div key={item.num} className="border-4 border-black rounded-3xl p-4 text-center aspect-video flex flex-col justify-center items-center bg-white shadow-sm relative">
                                    <div className="absolute top-2 left-2 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">{item.num}</div>
                                    <div className="h-16 w-full mb-2 flex justify-center">
                                       <img src={getWorkbookIllustration(item.img)} className="h-full object-contain" />
                                    </div>
                                    <b className="font-[Comic Neue] text-lg">{item.title}</b>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Page 4: Wudu Steps - COLORING SEQUENCING */}
                    <div className="bg-white w-full max-w-[210mm] min-h-[297mm] p-[20mm] shadow-xl border border-gray-200 print:shadow-none print:border-none print:w-full print:h-full box-border" style={{ pageBreakAfter: 'always' }}>
                        <h1 className="text-3xl font-bold text-center border-4 border-black rounded-2xl p-4 mb-8 uppercase font-[Comic Neue]">¡Hora del Wudu!</h1>
                        <p className="text-center text-lg mb-8 font-[Comic Neue]">¡Colorea los pasos para estar limpio!</p>

                        <div className="grid grid-cols-2 gap-4 font-[Comic Neue]">
                            {[
                                { step: 1, title: "Las Manos", desc: "Lavar 3 veces", img: "hands washing water tap outline" },
                                { step: 2, title: "Boca y Nariz", desc: "Enjuagar 3 veces", img: "boy washing mouth water outline" },
                                { step: 3, title: "La Cara", desc: "Lavar cara completa", img: "boy washing face water outline" },
                                { step: 4, title: "Los Brazos", desc: "Hasta el codo", img: "washing arm elbow water outline" },
                                { step: 5, title: "La Cabeza", desc: "Pasar manos mojadas", img: "wiping head hair water outline" },
                                { step: 6, title: "Los Pies", desc: "Hasta tobillos", img: "washing feet foot water outline" },
                            ].map((s) => (
                                <div key={s.step} className="border-2 border-black p-2 flex flex-col items-center rounded-lg">
                                    <div className="w-full h-32 border border-dashed border-black mb-2 p-2 rounded">
                                        <img src={getWorkbookIllustration(s.img)} alt={s.title} className="w-full h-full object-contain" />
                                    </div>
                                    <b className="text-lg">{s.step}. {s.title}</b>
                                    <p className="text-sm text-gray-500">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Page 5: Mosque Coloring Page */}
                    <div className="bg-white w-full max-w-[210mm] min-h-[297mm] p-[20mm] shadow-xl border border-gray-200 print:shadow-none print:border-none print:w-full print:h-full box-border font-[Comic Neue]" style={{ pageBreakAfter: 'always' }}>
                        <h1 className="text-3xl font-bold text-center border-4 border-black rounded-2xl p-4 mb-8 uppercase">¡Vamos a la Mezquita!</h1>
                        <p className="text-center text-lg mb-4">Usa tus colores favoritos para pintar esta hermosa mezquita.</p>
                        
                        <div className="w-full h-[600px] border-4 border-black rounded-xl p-2">
                           <img src={getWorkbookIllustration("beautiful big mosque with minarets and dome garden coloring page outline")} className="w-full h-full object-contain" />
                        </div>
                    </div>

                    {/* Page 6: Ramadan & Eid */}
                    <div className="bg-white w-full max-w-[210mm] min-h-[297mm] p-[20mm] shadow-xl border border-gray-200 print:shadow-none print:border-none print:w-full print:h-full box-border font-[Comic Neue]" style={{ pageBreakAfter: 'always' }}>
                        <h1 className="text-3xl font-bold text-center border-4 border-black rounded-2xl p-4 mb-8 uppercase">Ramadán y Eid</h1>

                        <div className="border-4 border-black p-6 mb-8 rounded-xl flex-1">
                            <h2 className="text-2xl font-bold mb-4">🌙 Pinta el Fanous (Linterna)</h2>
                            <div className="h-64 border-4 border-dashed border-black rounded-xl mb-6 flex justify-center p-2">
                                <img src={getWorkbookIllustration("ramadan fanous lantern hanging stars coloring page outline")} alt="Fanous" className="h-full object-contain" />
                            </div>
                        </div>

                        <div className="border-4 border-black p-6 rounded-xl flex-1">
                            <h2 className="text-2xl font-bold mb-4">🎉 ¡Celebración de Eid!</h2>
                            <div className="h-64 border-4 border-dashed border-black rounded-xl mb-6 flex justify-center p-2">
                                 <img src={getWorkbookIllustration("happy muslim kids celebrating eid balloons candy coloring page outline")} alt="Eid" className="h-full object-contain" />
                            </div>
                            <div className="font-['Amiri'] text-5xl text-gray-300 text-center font-bold tracking-wider mt-4">عِيد مُبَارَك</div>
                        </div>
                    </div>

                    {/* Page 7: Animals */}
                    <div className="bg-white w-full max-w-[210mm] min-h-[297mm] p-[20mm] shadow-xl border border-gray-200 print:shadow-none print:border-none print:w-full print:h-full box-border font-[Comic Neue]" style={{ pageBreakAfter: 'always' }}>
                        <h1 className="text-3xl font-bold text-center border-4 border-black rounded-2xl p-4 mb-8 uppercase">Animales del Corán</h1>
                        <p className="text-center text-lg mb-8">¡Colorea estos animales especiales!</p>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { num: 1, name: "Camello", img: "cute camel desert coloring page outline" },
                                { num: 2, name: "Oveja", img: "cute sheep fluffy coloring page outline" },
                                { num: 3, name: "Ballena", img: "big whale ocean coloring page outline" },
                                { num: 4, name: "Hormiga", img: "cute ant insect coloring page outline" },
                                { num: 5, name: "Elefante", img: "cute elephant coloring page outline" },
                                { num: 6, name: "Abeja", img: "cute bee flower coloring page outline" },
                            ].map((a) => (
                                <div key={a.num} className="border-2 border-black p-4 rounded-xl flex flex-col h-full">
                                    <b className="block mb-2 text-lg text-center">{a.name}</b>
                                    <div className="flex-1 border-2 border-dashed border-black rounded-lg flex justify-center items-center p-2 h-40">
                                         <img src={getWorkbookIllustration(a.img)} alt={a.name} className="h-full w-full object-contain" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
             )}

           </div>
        ) : (
          // --- GRID VIEW (Color, Paint) ---
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 print:hidden">
              {displayData.map((img) => (
                <div key={img.id} className="group relative bg-white rounded-[2rem] shadow-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border-4 border-white">
                  {/* Image Container */}
                  <div className={`aspect-w-4 aspect-h-5 overflow-hidden relative ${activeTab === 'color' ? 'bg-gray-200' : 'bg-white'}`}>
                    <img 
                      src={img.url} 
                      alt={img.title}
                      className={`w-full h-full object-contain p-2 transform group-hover:scale-105 transition-transform duration-700 ${activeTab !== 'color' ? 'group-hover:scale-110' : 'object-cover p-0'}`}
                      loading="lazy"
                    />
                    
                    {/* Overlay Buttons */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <button 
                         onClick={() => window.open(img.url, '_blank')}
                         className="bg-white text-gray-800 p-3 rounded-full hover:bg-sky-100 transition-colors"
                         title="Ver Grande"
                      >
                        <ZoomIn className="w-6 h-6" />
                      </button>
                      <button 
                         onClick={() => handleDownload(img.url, img.title, img.id)}
                         className="bg-emerald-500 text-white p-3 rounded-full hover:bg-emerald-600 transition-colors shadow-lg"
                         title="Descargar"
                         disabled={downloadingId === img.id}
                      >
                        {downloadingId === img.id ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 relative">
                    <div className={`absolute -top-6 right-6 ${img.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                      {img.subtitle}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1 font-[Fredoka]">{img.title}</h3>
                    
                    {(activeTab === 'paint' || activeTab === 'workbook') && (
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Palette className="w-4 h-4" /> Listo para imprimir
                      </p>
                    )}
                    
                    <div className={`h-1 w-12 ${img.color} rounded-full mt-2`}></div>
                  </div>
                </div>
              ))}
            </div>

            {(activeTab === 'paint') && (
               <div className="mt-12 text-center bg-white p-6 rounded-2xl shadow-sm border border-sky-100 print:hidden">
                 <p className="text-lg text-sky-600 font-bold">
                   💡 Tip: ¡Descarga, imprime en papel tamaño A4 y diviértete aprendiendo!
                 </p>
               </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;
