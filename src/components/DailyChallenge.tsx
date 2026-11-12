import React, { useState, useEffect } from 'react';
import { Calendar, Flame, Sparkles, Star, Award, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { Question, UserProgress } from '../types';
import { QUESTIONS } from '../data/questions';
import { Mascot } from './Mascot';
import { playSound } from '../utils/sound';
import { QuizScreen } from './QuizScreen';
import { recordDailyChallengeCompleted } from '../utils/storage';
import { TRANSLATIONS } from '../utils/translations';
import { shuffleQuestionOptions } from '../utils/quizEngine';
import confetti from 'canvas-confetti';

interface DailyChallengeProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  onGoHome: () => void;
}

export const DailyChallenge: React.FC<DailyChallengeProps> = ({
  progress,
  onUpdateProgress,
  onGoHome,
}) => {
  const lang = progress.language || 'en';
  const t = TRANSLATIONS[lang];

  const todayStr = new Date().toISOString().split('T')[0];
  const isCompletedToday = progress.dailyChallengeCompletedDate === todayStr;

  const [isPlaying, setIsPlaying] = useState(false);
  const [dailyCompletedView, setDailyCompletedView] = useState(isCompletedToday);

  // Generate 5 questions for today using date hash to be consistent per day
  const [dailyQuestions, setDailyQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const dateNum = todayStr
      .split('-')
      .reduce((acc, part) => acc + parseInt(part, 10), 0);

    const shuffled = [...QUESTIONS].sort((a, b) => {
      const codeA = (a.id.charCodeAt(0) + dateNum) % 17;
      const codeB = (b.id.charCodeAt(0) + dateNum) % 17;
      return codeA - codeB;
    });

    setDailyQuestions(shuffled.slice(0, 5).map(q => shuffleQuestionOptions(q)));
  }, [todayStr]);

  const handleStartDaily = () => {
    playSound('click', progress.soundEnabled);
    setIsPlaying(true);
  };

  const handleFinishDaily = (results: {
    totalQuestions: number;
    correctAnswers: number;
    score: number;
    starsEarned: number;
  }) => {
    const bonusPoints = 50 + results.score;
    const bonusStars = 5 + results.starsEarned;

    const { updatedProgress } = recordDailyChallengeCompleted(bonusStars, bonusPoints);
    onUpdateProgress(updatedProgress);

    setIsPlaying(false);
    setDailyCompletedView(true);

    playSound('fanfare', progress.soundEnabled);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  };

  if (isPlaying && dailyQuestions.length > 0) {
    return (
      <QuizScreen
        questions={dailyQuestions}
        classLevel="Class 2"
        categoryName={lang === 'hi' ? '🌟 दैनिक चुनौती' : '🌟 Daily Challenge'}
        soundEnabled={progress.soundEnabled}
        language={lang}
        onFinishQuiz={handleFinishDaily}
        onExitQuiz={() => setIsPlaying(false)}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Daily Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 border-4 border-amber-300 p-6 sm:p-8 shadow-xl text-center space-y-6">
        <div className="flex justify-center">
          <Mascot
            size="lg"
            mood={dailyCompletedView ? 'celebrating' : 'cheering'}
            speechText={
              dailyCompletedView
                ? lang === 'hi'
                  ? 'वाह! आपने आज की चुनौती जीत ली! 🎉'
                  : 'Woohoo! You conquered today’s challenge! 🎉'
                : lang === 'hi'
                ? 'क्या आप आज के सभी 5 प्रश्नों के सही उत्तर दे सकते हैं? चलो शुरू करें! 🚀'
                : 'Can you answer all 5 questions today? Let’s do it! 🚀'
            }
          />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-300 text-amber-950 font-black px-4 py-1 rounded-full text-xs sm:text-sm uppercase tracking-wider mb-2">
            <Calendar size={16} /> {t.dailyChallenge}
          </div>
          <h1 className="font-['Fredoka','Mukta',sans-serif] text-3xl sm:text-4xl font-black text-slate-800">
            🌟 {lang === 'hi' ? 'आज की चुनौती' : "Today's Challenge"}
          </h1>
          <p className="text-slate-600 font-bold text-base sm:text-lg mt-1">
            {dailyCompletedView
              ? lang === 'hi'
                ? 'आपने आज की चुनौती पूरी कर ली है! 🎉'
                : 'You completed today’s challenge! 🎉'
              : lang === 'hi'
              ? '“क्या आप सभी 5 प्रश्नों के उत्तर दे सकते हैं?”'
              : '“Can you answer all 5?”'}
          </p>
        </div>

        {/* Daily Streak & Reward Box */}
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <div className="bg-white rounded-2xl p-4 border-2 border-amber-200 shadow-sm">
            <div className="flex items-center justify-center text-rose-500 mb-1">
              <Flame size={28} className="animate-bounce" />
            </div>
            <div className="font-['Fredoka',sans-serif] text-2xl font-black text-slate-800">
              {progress.dailyStreak || 1} {lang === 'hi' ? 'दिन' : 'Day'}
            </div>
            <div className="text-xs font-bold text-slate-500">
              {lang === 'hi' ? 'दैनिक स्ट्रीक' : 'Daily Streak'}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border-2 border-amber-200 shadow-sm">
            <div className="flex items-center justify-center text-yellow-500 mb-1">
              <Star size={28} className="fill-yellow-400" />
            </div>
            <div className="font-['Fredoka',sans-serif] text-2xl font-black text-slate-800">
              +5 {lang === 'hi' ? 'बोनस' : 'Bonus'}
            </div>
            <div className="text-xs font-bold text-slate-500">
              {lang === 'hi' ? 'रोजाना सितारे' : 'Stars Everyday'}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div>
          {dailyCompletedView ? (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-100 border-2 border-emerald-300 text-emerald-900 font-black px-6 py-2.5 rounded-2xl text-base">
                <CheckCircle2 size={22} className="text-emerald-600" />
                <span>
                  {lang === 'hi'
                    ? 'आज के 5 प्रश्न पूरे हो गए! कल नई चुनौती के लिए वापस आइए!'
                    : "Today's 5 Questions Complete! Come back tomorrow!"}
                </span>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={onGoHome}
                  className="font-['Fredoka','Mukta',sans-serif] font-bold text-base bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-2xl shadow-[0_4px_0_#0369a1] active:translate-y-1 transition-all"
                >
                  {t.goHome} 🏠
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleStartDaily}
              className="w-full sm:w-auto font-['Fredoka','Mukta',sans-serif] font-black text-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white px-10 py-4 rounded-3xl shadow-[0_6px_0_#065f46] hover:shadow-[0_4px_0_#065f46] hover:translate-y-0.5 active:translate-y-1.5 active:shadow-none transition-all flex items-center justify-center gap-3 mx-auto"
            >
              <span>
                {lang === 'hi'
                  ? "आज के 5 प्रश्न शुरू करें! 🚀"
                  : "Start Today's 5 Questions! 🚀"}
              </span>
              <ArrowRight size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
