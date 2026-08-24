import React, { useState } from 'react';
import { Sparkles, MessageCircle, Send, Volume2, HelpCircle, Loader2 } from 'lucide-react';
import { askKikiOceanQuestion } from '../services/geminiAskService';
import { kidsVoiceService } from '../services/voiceService';
import { kidsAudioEngine } from '../services/kidsAudioEngine';
import { KikiNarratorAvatar } from './KikiNarratorAvatar';

export const AskKikiModal: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [answerData, setAnswerData] = useState<{
    answer: string;
    funFact: string;
    creatureEmoji: string;
  } | null>({
    answer: 'Halo adik manis! Ada yang ingin kamu tanyakan pada Kiki tentang hewan laut dan rahasia samudra? Pilih pertanyaan di bawah atau ketik sendiri ya! 🌊',
    funFact: 'Laut menyimpan jutaan jenis makhluk ajaib yang menunggu untuk kita pelajari bersama!',
    creatureEmoji: '🐬'
  });
  const [isSpeaking, setIsSpeaking] = useState(false);

  const quickQuestions = [
    'Kenapa air laut rasanya asin? 🧂',
    'Apakah ikan paus tidur di dalam air? 😴',
    'Kenapa ikan badut tidak tersengat anemon? 🐠',
    'Berapa jumlah gigi ikan hiu? 🦈',
    'Kenapa gurita punya tinta hitam? 🐙',
    'Apakah bintang laut bisa jalan? ⭐'
  ];

  const handleAsk = async (qText: string) => {
    if (!qText.trim()) return;

    kidsAudioEngine.playBubblePop();
    setLoading(true);
    kidsVoiceService.stop();

    try {
      const res = await askKikiOceanQuestion(qText);
      setAnswerData(res);
      kidsAudioEngine.playCheerChime();

      // Read aloud the answer in Kiki voice
      kidsVoiceService.setCallbacks((speaking) => setIsSpeaking(speaking));
      kidsVoiceService.speak(res.answer);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeakCurrentAnswer = () => {
    if (!answerData) return;
    kidsAudioEngine.playBubblePop();
    kidsVoiceService.setCallbacks((speaking) => setIsSpeaking(speaking));
    kidsVoiceService.speak(answerData.answer);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 relative z-10 select-none pb-12">
      
      <div className="bg-sky-950/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-2xl flex flex-col gap-6">
        
        {/* Header with Kiki */}
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-sky-800 pb-6">
          <KikiNarratorAvatar
            isSpeaking={isSpeaking}
            expression="happy"
            size="md"
            customDialogue="Tanya apa saja ke Kiki! 💬"
          />

          <div className="flex-1 text-center sm:text-left">
            <span className="inline-block text-xs font-kids font-bold bg-amber-400 text-slate-950 px-3 py-1 rounded-full mb-2">
              Tanya Kiki Si Penyelam Cilik ✨
            </span>
            <h2 className="font-kids font-bold text-2xl sm:text-3xl text-white">
              Punya Rasa Ingin Tahu tentang Laut?
            </h2>
            <p className="text-sky-200 text-sm sm:text-base font-kids mt-1">
              Kiki siap menjawab pertanyaanmu dengan cerita yang seru dan mudah dipahami!
            </p>
          </div>
        </div>

        {/* Quick Question Buttons */}
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-kids font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>Pilih Pertanyaan Cepat:</span>
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuestion(q);
                  handleAsk(q);
                }}
                disabled={loading}
                className="p-3 bg-sky-900/80 hover:bg-sky-800 text-sky-100 rounded-2xl font-kids text-xs sm:text-sm font-semibold text-left border border-sky-700 hover:border-amber-400 shadow transition-all active:scale-98 flex items-center gap-2"
              >
                <span className="text-amber-400">❓</span>
                <span>{q}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(question);
          }}
          className="flex items-center gap-2 bg-sky-900/90 p-2 rounded-2xl border-2 border-sky-700 focus-within:border-amber-400 transition-colors"
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ketik pertanyaanmu di sini... (contoh: Kenapa paus bisa menyanyi?)"
            className="flex-1 bg-transparent px-3 py-2 text-white font-kids text-sm sm:text-base placeholder-sky-400 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-kids font-bold text-sm sm:text-base rounded-xl shadow flex items-center gap-2 active:scale-95 transition-transform shrink-0"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Tanya Kiki</span>
              </>
            )}
          </button>
        </form>

        {/* Answer Display Box */}
        {answerData && (
          <div className="bg-gradient-to-r from-amber-50 to-yellow-100 text-slate-900 p-6 rounded-3xl border-4 border-amber-300 shadow-xl flex flex-col gap-4 animate-fadeIn">
            
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{answerData.creatureEmoji}</span>
                <span className="font-kids font-bold text-amber-950 text-base sm:text-lg">
                  Jawaban Kapten Kiki:
                </span>
              </div>

              <button
                onClick={handleSpeakCurrentAnswer}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-kids font-bold text-xs sm:text-sm rounded-xl shadow flex items-center gap-1.5 active:scale-95 transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>Dengarkan Suara 🔊</span>
              </button>
            </div>

            <p className="font-kids text-base sm:text-xl font-medium text-slate-800 leading-relaxed">
              {answerData.answer}
            </p>

            {answerData.funFact && (
              <div className="bg-amber-200/70 p-3 rounded-2xl border border-amber-300 text-xs sm:text-sm font-kids font-bold text-amber-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Fakta Tambahan: {answerData.funFact}</span>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
