import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, RotateCcw, Volume2, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { SEA_CREATURES } from '../data/seaCreatures';
import { kidsAudioEngine } from '../services/kidsAudioEngine';
import { kidsVoiceService } from '../services/voiceService';

export const KidsQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const quizList = SEA_CREATURES.map(c => ({
    creature: c,
    ...c.quiz,
  }));

  const currentQuiz = quizList[currentIdx];

  useEffect(() => {
    // Read the question aloud for 5-year-olds
    if (!isFinished && currentQuiz) {
      kidsVoiceService.speak(`Pertanyaan: ${currentQuiz.question}`);
    }
    return () => {
      kidsVoiceService.stop();
    };
  }, [currentIdx, isFinished]);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;

    setSelectedAnswer(index);
    setIsAnswered(true);

    const isCorrect = index === currentQuiz.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
      kidsAudioEngine.playCheerChime();
      
      // Fire festive kid confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#facc15', '#f43f5e', '#4ade80', '#c084fc']
      });

      kidsVoiceService.speak(`Horeee! Jawabanmu benar sekali! ${currentQuiz.explanation}`);
    } else {
      kidsAudioEngine.playBubblePop();
      kidsVoiceService.speak(`Ups, hampir benar! Jawaban yang tepat adalah: ${currentQuiz.options[currentQuiz.correctIndex]}. ${currentQuiz.explanation}`);
    }
  };

  const handleNextQuestion = () => {
    kidsAudioEngine.playBubblePop();
    if (currentIdx < quizList.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      kidsAudioEngine.playCheerChime();
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 }
      });
      kidsVoiceService.speak(`Selamat teman kecil yang cerdas! Kamu berhasil menyelesaikan kuis laut dengan nilai ${score + (selectedAnswer === currentQuiz.correctIndex ? 1 : 0)} bintang!`);
    }
  };

  const handleRestartQuiz = () => {
    kidsAudioEngine.playBubblePop();
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-sky-950/90 backdrop-blur-md rounded-3xl p-8 border-4 border-amber-400 shadow-2xl text-center flex flex-col items-center gap-6 select-none relative z-10">
        <div className="text-8xl animate-bounce">🏆</div>

        <h2 className="font-kids text-3xl sm:text-4xl font-extrabold text-amber-300">
          Hebat Sekali, Penjelajah Cilik! 🎉
        </h2>

        <p className="font-kids text-lg sm:text-xl text-sky-100">
          Kamu sudah menjawab kuis hewan laut dengan sangat pintar!
        </p>

        {/* Score & Stars Display */}
        <div className="flex items-center gap-2 text-4xl sm:text-5xl text-amber-400">
          {'⭐'.repeat(Math.max(1, Math.min(5, Math.ceil((score / quizList.length) * 5))))}
        </div>

        <div className="bg-sky-900/90 px-6 py-3 rounded-2xl border-2 border-sky-700 font-kids text-xl font-bold text-amber-300">
          Skor: {score} / {quizList.length} Jawaban Benar!
        </div>

        <button
          onClick={handleRestartQuiz}
          className="px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-kids font-bold text-lg rounded-2xl shadow-xl flex items-center gap-3 transition-transform active:scale-95 border-2 border-yellow-200"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Main Kuis Lagi 🌊</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 relative z-10 select-none pb-12">
      
      {/* Quiz Card */}
      <div className="bg-sky-950/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-2xl flex flex-col gap-6">
        
        {/* Header: Question Progress & Star Score */}
        <div className="flex items-center justify-between gap-4 border-b border-sky-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl animate-bounce">❓</span>
            <div>
              <span className="text-xs font-kids font-bold text-amber-400 uppercase tracking-wider">
                Tebak Hewan Laut Ceria
              </span>
              <h3 className="font-kids font-bold text-xl text-white">
                Soal {currentIdx + 1} dari {quizList.length}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-amber-400 text-slate-950 px-4 py-1.5 rounded-full font-kids font-extrabold text-sm shadow">
            <Trophy className="w-4 h-4 text-slate-900" />
            <span>Skor: {score} ⭐</span>
          </div>
        </div>

        {/* Question Arena */}
        <div className="flex flex-col items-center text-center gap-4 py-2">
          <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${currentQuiz.creature.gradient} flex items-center justify-center text-5xl shadow-xl border-3 border-white animate-gentle-pulse`}>
            <span>{currentQuiz.creature.emoji}</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <h2 className="font-kids font-bold text-xl sm:text-2xl text-amber-200 leading-snug">
              {currentQuiz.question}
            </h2>
            <button
              onClick={() => kidsVoiceService.speak(currentQuiz.question)}
              className="p-2 rounded-full bg-sky-800 hover:bg-sky-700 text-amber-300 shadow transition-all active:scale-95"
              title="Dengarkan soal lagi"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Options List */}
        <div className="flex flex-col gap-3.5">
          {currentQuiz.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrectAnswer = idx === currentQuiz.correctIndex;

            let buttonStyle = 'bg-sky-900/80 hover:bg-sky-800/90 text-white border-2 border-sky-700';

            if (isAnswered) {
              if (isCorrectAnswer) {
                buttonStyle = 'bg-emerald-500 text-white border-3 border-emerald-300 ring-4 ring-emerald-400/50 scale-[1.02] shadow-xl';
              } else if (isSelected) {
                buttonStyle = 'bg-rose-500 text-white border-3 border-rose-300';
              } else {
                buttonStyle = 'bg-sky-950/50 text-sky-400 border border-sky-800 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full p-4 sm:p-5 rounded-2xl font-kids font-bold text-base sm:text-lg flex items-center justify-between gap-4 text-left transition-all duration-200 shadow-md transform active:scale-98 ${buttonStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-black shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>

                {isAnswered && (
                  <span className="text-2xl shrink-0">
                    {isCorrectAnswer ? '✅' : isSelected ? '❌' : ''}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Next Button */}
        {isAnswered && (
          <div className="mt-2 p-4 bg-sky-900/90 rounded-2xl border-2 border-sky-700 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
            <p className="font-kids text-sm sm:text-base text-amber-200 font-semibold leading-relaxed">
              💡 {currentQuiz.explanation}
            </p>

            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-kids font-bold text-base rounded-xl shadow-lg flex items-center gap-2 shrink-0 transition-transform active:scale-95 border-2 border-yellow-200"
            >
              <span>{currentIdx < quizList.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Kuis'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
