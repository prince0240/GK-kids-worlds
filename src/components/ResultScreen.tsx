import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Home, ArrowRight, Award, Star, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { Question, ClassLevel, Language } from '../types';
import { BADGES } from '../data/badges';
import { Mascot } from './Mascot';
import { playSound } from '../utils/sound';
import { TRANSLATIONS, CLASS_LEVELS_TRANSLATIONS, CATEGORIES_TRANSLATIONS } from '../utils/translations';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  starsEarned: number;
  newBadges: string[];
  classLevel: ClassLevel;
  categoryName: string;
  soundEnabled: boolean;
  language: Language;
  answersRecord: { question: Question; selectedAnswer: string; isCorrect: boolean }[];
  onTryAgain: () => void;
  onNextQuiz: () => void;
  onGoHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  totalQuestions,
  correctAnswers,
  starsEarned,
  newBadges,
  classLevel,
  categoryName,
  soundEnabled,
  language,
  answersRecord,
  onTryAgain,
  onNextQuiz,
  onGoHome,
}) => {
  const [showReview, setShowReview] = useState(false);
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const t = TRANSLATIONS[language];
  const classText = CLASS_LEVELS_TRANSLATIONS[language][classLevel]?.title || classLevel;
  const categoryText = CATEGORIES_TRANSLATIONS[language][categoryName] || categoryName;

  useEffect(() => {
    playSound('fanfare', soundEnabled);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'],
      });

      if (percentage >= 80) {
        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          });
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          });
        }, 300);
      }
    } catch (e) {}
  }, [percentage, soundEnabled]);

  let cheerTitle = language === 'hi' ? 'सुपरस्टार! 🌟' : 'Superstar! 🌟';
  let cheerMsg =
    language === 'hi'
      ? 'लाजवाब प्रदर्शन! आपने एक सच्चे चैंपियन की तरह उत्तर दिए!'
      : 'Incredible job! You answered like a true champion!';

  if (percentage === 100) {
    cheerTitle = language === 'hi' ? 'शत-प्रतिशत सही! 🏆' : 'PERFECT 10! 🏆';
    cheerMsg =
      language === 'hi'
        ? 'कमाल कर दिया! आपने सभी प्रश्नों के बिल्कुल सही उत्तर दिए!'
        : 'Flawless score! You got every single question right!';
  } else if (percentage >= 70) {
    cheerTitle = language === 'hi' ? 'बहुत बढ़िया! ⭐' : 'Great Job! ⭐';
    cheerMsg =
      language === 'hi'
        ? 'आप बहुत समझदार और होशियार हैं! शाबाश!'
        : 'You are super smart! High five!';
  } else if (percentage >= 50) {
    cheerTitle = language === 'hi' ? 'अच्छा प्रयास! 🎈' : 'Good Effort! 🎈';
    cheerMsg =
      language === 'hi'
        ? 'शाबाश! अभ्यास से आप और भी बेहतर बनेंगे!'
        : 'Well done! Practice makes you even better!';
  } else {
    cheerTitle = language === 'hi' ? 'सीखते रहो! 🌱' : 'Nice Try! 🌱';
    cheerMsg =
      language === 'hi'
        ? 'हर क्विज़ से आपका ज्ञान और आत्मविश्वास बढ़ता है!'
        : 'Every quiz helps your brain grow stronger!';
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Main Result Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white border-4 border-amber-300 p-6 sm:p-8 shadow-2xl text-center space-y-6">
        <div className="absolute top-3 left-4 text-3xl opacity-20 select-none animate-spin-slow">⭐</div>
        <div className="absolute top-4 right-4 text-3xl opacity-20 select-none animate-bounce">🎉</div>

        <div className="flex justify-center">
          <Mascot
            mood="celebrating"
            speechText={
              language === 'hi'
                ? `वाह! आपने ${totalQuestions} में से ${correctAnswers} अंक प्राप्त किए! 🌟`
                : `Woohoo! You scored ${correctAnswers}/${totalQuestions}! 🌟`
            }
            size="lg"
          />
        </div>

        <div>
          <div className="inline-block bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs sm:text-sm px-4 py-1 rounded-full uppercase tracking-wider mb-2">
            {t.quizCompleted} • {classText} ({categoryText})
          </div>
          <h1 className="font-['Fredoka','Mukta',sans-serif] text-3xl sm:text-4xl font-black text-slate-800">
            🎉 {cheerTitle}
          </h1>
          <p className="text-slate-600 font-bold text-base mt-1">{cheerMsg}</p>
        </div>

        {/* Big Score Box */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-3xl p-5 border-3 border-amber-200 shadow-inner max-w-md mx-auto space-y-3">
          <div className="text-xs font-bold text-amber-800 uppercase tracking-widest">
            {t.yourScore}
          </div>

          <div className="font-['Fredoka',sans-serif] text-5xl sm:text-6xl font-black text-amber-950 flex items-center justify-center gap-2">
            <span>{correctAnswers}</span>
            <span className="text-3xl text-amber-500 font-bold">/</span>
            <span className="text-3xl text-amber-700">{totalQuestions}</span>
          </div>

          {/* Golden Stars display row */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1">
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <span
                key={i}
                className={`text-2xl sm:text-3xl transition-transform ${
                  i < correctAnswers ? 'scale-110 drop-shadow' : 'opacity-25 grayscale'
                }`}
              >
                ⭐
              </span>
            ))}
          </div>

          <div className="text-xs font-bold text-amber-700">
            {correctAnswers} {t.starsEarnedText} • {percentage}% {t.accuracy}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
            <div className="text-xs font-bold text-slate-500">{t.points}</div>
            <div className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-black text-emerald-600">
              +{score}
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
            <div className="text-xs font-bold text-slate-500">{t.starsSoFar}</div>
            <div className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-black text-yellow-600">
              +{starsEarned}
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
            <div className="text-xs font-bold text-slate-500">{t.correct}</div>
            <div className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-black text-sky-600">
              {correctAnswers}/{totalQuestions}
            </div>
          </div>
        </div>

        {/* Newly Unlocked Badges Showcase */}
        {newBadges.length > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-4 text-left space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 font-['Fredoka','Mukta',sans-serif] font-bold text-base text-purple-900">
              <Sparkles size={18} className="text-purple-600 animate-spin-slow" />
              <span>{t.newBadgesUnlocked}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {newBadges.map((badgeId) => {
                const b = BADGES.find((x) => x.id === badgeId);
                if (!b) return null;
                const bTitle = (language === 'hi' && b.titleHi) ? b.titleHi : b.title;
                const bDesc = (language === 'hi' && b.descriptionHi) ? b.descriptionHi : b.description;
                return (
                  <div
                    key={b.id}
                    className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-purple-200 shadow-sm"
                  >
                    <span className="text-3xl">{b.icon}</span>
                    <div>
                      <div className="font-bold text-sm text-slate-800">{bTitle}</div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {bDesc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3 Main Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            onClick={() => {
              playSound('click', soundEnabled);
              onTryAgain();
            }}
            className="flex items-center justify-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-['Fredoka','Mukta',sans-serif] font-bold text-base py-3.5 px-4 rounded-2xl border-2 border-amber-300 shadow-sm active:scale-95 transition-all"
          >
            <RotateCcw size={18} />
            <span>{t.tryAgain}</span>
          </button>

          <button
            onClick={() => {
              playSound('click', soundEnabled);
              onNextQuiz();
            }}
            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-['Fredoka','Mukta',sans-serif] font-black text-base py-3.5 px-4 rounded-2xl shadow-[0_4px_0_#065f46] active:translate-y-1 active:shadow-none transition-all"
          >
            <span>{t.nextQuiz}</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => {
              playSound('click', soundEnabled);
              onGoHome();
            }}
            className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-['Fredoka','Mukta',sans-serif] font-bold text-base py-3.5 px-4 rounded-2xl shadow-[0_4px_0_#0369a1] active:translate-y-1 active:shadow-none transition-all"
          >
            <Home size={18} />
            <span>{t.goHome}</span>
          </button>
        </div>

        {/* Option to Review Answers */}
        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={() => setShowReview(!showReview)}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 underline decoration-slate-300"
          >
            {showReview ? t.hideReview : t.showReview}
          </button>
        </div>
      </div>

      {/* Answer Review Section */}
      {showReview && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-slate-200 shadow-md space-y-4 animate-fadeIn">
          <h3 className="font-['Fredoka','Mukta',sans-serif] text-xl font-bold text-slate-800">
            📝 {t.questionReviewTitle}
          </h3>

          <div className="space-y-3">
            {answersRecord.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border-2 text-left space-y-1 ${
                  item.isCorrect
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-rose-50/60 border-rose-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-bold text-slate-800 text-sm">
                    {idx + 1}. {item.question.question}
                  </div>
                  {item.isCorrect ? (
                    <span className="flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                      <CheckCircle2 size={14} /> {language === 'hi' ? 'सही' : 'Correct'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-black text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full shrink-0">
                      <XCircle size={14} /> {language === 'hi' ? 'अच्छा प्रयास' : 'Good Try'}
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-600">
                  <span className="font-semibold">{t.yourChoice}:</span> {item.selectedAnswer}
                </div>

                {!item.isCorrect && (
                  <div className="text-xs text-emerald-800 font-bold">
                    <span>{t.correctAnswerText}:</span> {item.question.correctAnswer}
                  </div>
                )}

                <div className="text-xs text-slate-500 italic pt-1 border-t border-black/5">
                  💡 {item.question.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
