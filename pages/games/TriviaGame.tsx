import React, { useState, useEffect } from 'react';
import { getTriviaQuestions } from '../../services/geminiService';
import { TriviaQuestion } from '../../types';
import { CheckCircle, XCircle, Loader2, Trophy, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TriviaGame: React.FC = () => {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const loadTrivia = async () => {
    setLoading(true);
    setScore(0);
    setCurrentQ(0);
    setIsCorrect(null);
    setSelected(null);
    const data = await getTriviaQuestions();
    setQuestions(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTrivia();
  }, []);

  const handleAnswer = (ans: string) => {
    if (selected) return;
    setSelected(ans);
    const correct = ans === questions[currentQ].correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
        setIsCorrect(null);
      } else {
        // End game state handled in render
        setCurrentQ(questions.length);
      }
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-pink-500">
        <Loader2 className="w-10 h-10 animate-spin mr-2 mb-4" />
        <p>Cargando preguntas...</p>
        <Link to="/juegos" className="mt-8 text-gray-400 hover:text-pink-500 underline">Cancelar y Volver</Link>
      </div>
    );
  }

  if (currentQ >= questions.length) {
    return (
      <div className="max-w-lg mx-auto p-8 text-center">
        <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-pink-600 mb-4">¡Juego Terminado!</h2>
        <p className="text-2xl mb-6">Tu puntaje: {score} / {questions.length}</p>
        <button onClick={loadTrivia} className="bg-pink-500 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-600 block w-full mb-4">
          Jugar de Nuevo
        </button>
        <Link to="/juegos" className="text-pink-500 font-bold hover:underline">
          Volver a Juegos
        </Link>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-left mb-4">
        <Link to="/juegos" className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-800 font-bold transition-colors">
          <ArrowLeft className="w-5 h-5" /> Volver a Juegos
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border-b-8 border-pink-200 p-8">
        <div className="flex justify-between text-gray-400 font-bold mb-6 uppercase text-sm tracking-widest">
          <span>Pregunta {currentQ + 1} de {questions.length}</span>
          <span>Puntos: {score}</span>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">{q.question}</h2>

        <div className="grid gap-4">
          {q.options.map((opt) => {
             let btnClass = "bg-gray-50 hover:bg-pink-50 border-2 border-gray-200 text-gray-700";
             if (selected) {
               if (opt === q.correctAnswer) btnClass = "bg-green-100 border-green-500 text-green-700";
               else if (opt === selected) btnClass = "bg-red-100 border-red-500 text-red-700";
               else btnClass = "opacity-50";
             }

             return (
               <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={!!selected}
                className={`p-4 rounded-xl text-lg font-bold transition-all ${btnClass} flex justify-between items-center`}
               >
                 {opt}
                 {selected && opt === q.correctAnswer && <CheckCircle className="w-6 h-6 text-green-600"/>}
                 {selected && opt === selected && opt !== q.correctAnswer && <XCircle className="w-6 h-6 text-red-600"/>}
               </button>
             )
          })}
        </div>
      </div>
    </div>
  );
};

export default TriviaGame;