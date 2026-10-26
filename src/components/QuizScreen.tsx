import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, Flame, Star, ArrowRight, X, RotateCcw, CheckCircle, HelpCircle } from 'lucide-react';
import { Question, ClassLevel, Category, Language } from '../types';
import { Mascot, MascotMood } from './Mascot';
import { playSound } from '../utils/sound';
import { speakText, stopSpeech } from '../utils/speech';
import { TRANSLATIONS, CLASS_LEVELS_TRANSLATIONS, CATEGORIES_TRANSLATIONS } from '../utils/translations';
import { getLocalizedQuestion } from '../data/hindiTranslations';

interface QuizScreenProps {
  questions: Question[];
  classLevel: ClassLevel;
  categoryName: string;
  soundEnabled: boolean;
  language: Language;
  onFinishQuiz: (results: {
    totalQuestions: number;
    correctAnswers: number;
    score: number;
    starsEarned: number;
    maxStreak: number;
    answersRecord: { question: Question; selectedAnswer: string; isCorrect: boolean }[];
  }) => void;
  onExitQuiz: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  classLevel,
  categoryName,
  soundEnabled,
  language,
  onFinishQuiz,
  onExitQuiz,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Score keeping during current quiz run
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [starsEarned, setStarsEarned] = useState(0);

  // History tracking for final review
  const [answersRecord, setAnswersRecord] = useState<
    { question: Question; selectedAnswer: string; isCorrect: boolean }[]
  >([]);

  const t = TRANSLATIONS[language];
  const classText = CLASS_LEVELS_TRANSLATIONS[language][classLevel]?.title || classLevel;
  const categoryText = CATEGORIES_TRANSLATIONS[language][categoryName] || categoryName;

  // Mascot state
  const [mascotMood, setMascotMood] = useState<MascotMood>('happy');
  const [mascotMessage, setMascotMessage] = useState<string>(t.mascotReady);

  const rawQuestion = questions[currentIndex];
  // Localize question based on current language
  const currentQuestion = rawQuestion ? getLocalizedQuestion(rawQuestion, language) : null;
  const progressPercent = Math.round(((currentIndex) / questions.length) * 100);

  // Auto speech read-aloud when question loads if on LKG / UKG, or if user triggers
  useEffect(() => {
    // Reset option selection
    setSelectedOption(null);
    setIsAnswered(false);
    setMascotMood('happy');
    setMascotMessage(t.mascotQuestionPrompt(currentIndex + 1));
    stopSpeech();

    // Small delay to allow child to hear automatically if LKG/UKG
    if (classLevel === 'LKG' || classLevel === 'UKG') {
      const timer = setTimeout(() => {
        handleReadQuestion();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, language]);

  const handleReadQuestion = () => {
    if (!currentQuestion) return;
    setIsSpeaking(true);
    const textToRead = `${currentQuestion.question}. ${
      language === 'hi' ? 'विकल्प हैं:' : 'Options are:'
    } ${currentQuestion.options.join(', ')}`;
    speakText(textToRead, () => setIsSpeaking(false), language);
  };

  const handleSelectAnswer = (option: string) => {
    if (isAnswered || !currentQuestion) return; // Prevent double taps
    stopSpeech();
    setIsSpeaking(false);

    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === currentQuestion.correctAnswer;
    const newAnswers = [
      ...answersRecord,
      { question: currentQuestion, selectedAnswer: option, isCorrect },
    ];
    setAnswersRecord(newAnswers);

    if (isCorrect) {
      playSound('correct', soundEnabled);
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      // 10 base points + streak bonus!
      const streakBonus = Math.min(newStreak * 5, 25);
      const pointsWon = 10 + streakBonus;
      setScore((prev) => prev + pointsWon);
      setCorrectCount((prev) => prev + 1);
      setStarsEarned((prev) => prev + 1);

      setMascotMood('cheering');
      setMascotMessage(
        newStreak >= 3
          ? t.mascotStreak(newStreak, pointsWon)
          : t.mascotCorrect(pointsWon)
      );
    } else {
      playSound('wrong', soundEnabled);
      setCurrentStreak(0);
      setMascotMood('encouraging');
      setMascotMessage(t.mascotWrong);
    }
  };

  const handleNext = () => {
    playSound('click', soundEnabled);
    stopSpeech();

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Quiz complete!
      onFinishQuiz({
        totalQuestions: questions.length,
        correctAnswers: correctCount,
        score,
        starsEarned,
        maxStreak,
        answersRecord,
      });
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
      {/* Quiz Top Status Bar */}
      <div className="bg-white rounded-3xl p-3.5 sm:p-5 border-3 border-amber-200 shadow-md">
        <div className="flex items-center justify-between gap-3 mb-2.5">
          {/* Class & Category Badge */}
          <div className="flex items-center gap-2">
            <span className="bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs sm:text-sm px-2.5 py-1 rounded-xl">
              {classText}
            </span>
            <span className="bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm px-2.5 py-1 rounded-xl hidden sm:inline">
              {categoryText}
            </span>
          </div>

          {/* Question Counter */}
          <div className="font-['Fredoka','Mukta',sans-serif] font-black text-slate-800 text-base sm:text-lg">
            {t.question} <span className="text-amber-600">{currentIndex + 1}</span> / {questions.length}
          </div>

          {/* Streak & Exit */}
          <div className="flex items-center gap-2">
            {currentStreak > 1 && (
              <div className="flex items-center gap-1 bg-rose-100 border border-rose-300 text-rose-700 font-extrabold text-xs sm:text-sm px-2.5 py-1 rounded-full animate-bounce">
                <Flame size={16} className="fill-rose-500" />
                <span>{currentStreak} {t.streakAlert}</span>
              </div>
            )}
            <button
              onClick={onExitQuiz}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 flex items-center justify-center transition-colors"
              title="Quit Quiz"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full bg-slate-100 h-3.5 sm:h-4 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          />
        </div>
      </div>

      {/* Mascot & Speech Bar */}
      <div className="bg-amber-100/70 border-2 border-amber-200 rounded-3xl p-3 sm:p-4 shadow-sm">
        <Mascot mood={mascotMood} speechText={mascotMessage} size="md" />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border-4 border-amber-300 shadow-xl space-y-6">
        {/* Question Header & Speech Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="font-['Fredoka','Mukta',sans-serif] text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
            {currentQuestion.question}
          </h2>

          <button
            onClick={handleReadQuestion}
            className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-sm ${
              isSpeaking
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 active:scale-95'
            }`}
            title="Read Question Aloud"
          >
            <Volume2 size={18} />
            <span>{isSpeaking ? t.listening : t.readToMe}</span>
          </button>
        </div>

        {/* 4 Large MCQ Option Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-2">
          {currentQuestion.options.map((option: string, idx: number) => {
            const isSelected = selectedOption === option;
            const isCorrectOption = option === currentQuestion.correctAnswer;

            // Determine styling based on state
            let buttonStyle = 'bg-white hover:bg-amber-50/60 border-slate-200 text-slate-800 shadow-[0_4px_0_#cbd5e1]';

            if (isAnswered) {
              if (isCorrectOption) {
                // Correct answer is bright green
                buttonStyle =
                  'bg-emerald-500 border-emerald-600 text-white shadow-[0_5px_0_#065f46] scale-[1.02] ring-4 ring-emerald-200';
              } else if (isSelected && !isCorrectOption) {
                // Chosen wrong answer is soft coral
                buttonStyle =
                  'bg-rose-100 border-rose-300 text-rose-900 opacity-90 shadow-none';
              } else {
                // Other options fade out slightly
                buttonStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60 shadow-none';
              }
            } else {
              buttonStyle =
                'bg-amber-50/40 hover:bg-amber-100/60 border-amber-200 hover:border-amber-400 text-slate-800 shadow-[0_5px_0_#fcd34d] hover:shadow-[0_3px_0_#fcd34d] hover:translate-y-0.5 active:translate-y-1.5 active:shadow-none';
            }

            const letters = ['A', 'B', 'C', 'D'];

            return (
              <button
                key={option}
                disabled={isAnswered}
                onClick={() => handleSelectAnswer(option)}
                className={`relative flex items-center gap-3.5 p-4 sm:p-5 rounded-3xl border-3 font-['Fredoka','Mukta',sans-serif] font-bold text-lg sm:text-xl text-left transition-all min-h-[72px] sm:min-h-[80px] ${buttonStyle}`}
              >
                {/* Option Letter Tag */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center text-sm sm:text-base font-black shrink-0 transition-colors ${
                    isAnswered && isCorrectOption
                      ? 'bg-white text-emerald-700'
                      : isAnswered && isSelected
                      ? 'bg-rose-200 text-rose-800'
                      : 'bg-white border-2 border-amber-200 text-amber-800'
                  }`}
                >
                  {isAnswered && isCorrectOption ? '✓' : letters[idx]}
                </div>

                {/* Option Text */}
                <span className="flex-1 leading-snug">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback & Explanation Card */}
        {isAnswered && (
          <div
            className={`rounded-2xl p-4 sm:p-5 border-2 animate-fadeIn transition-all ${
              selectedOption === currentQuestion.correctAnswer
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl shrink-0">
                {selectedOption === currentQuestion.correctAnswer ? '⭐' : '💡'}
              </span>
              <div className="space-y-1 flex-1">
                <div className="font-['Fredoka','Mukta',sans-serif] font-black text-lg sm:text-xl">
                  {selectedOption === currentQuestion.correctAnswer
                    ? t.greatJob
                    : t.niceTry}
                </div>
                <p className="text-sm sm:text-base font-semibold text-slate-700">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>

            {/* Next Question Button */}
            <div className="mt-4 pt-3 border-t border-black/10 flex justify-end">
              <button
                onClick={handleNext}
                className="w-full sm:w-auto font-['Fredoka','Mukta',sans-serif] font-black text-lg bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-2xl shadow-[0_5px_0_#065f46] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <span>{currentIndex + 1 === questions.length ? t.seeResultsAction : t.nextQuestion}</span>
                <ArrowRight size={22} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quiz Live Stats Footer */}
      <div className="flex items-center justify-around bg-white/80 rounded-2xl p-3 border border-amber-200 text-xs sm:text-sm font-bold text-slate-600">
        <div className="flex items-center gap-1.5">
          <Star size={16} className="text-yellow-500 fill-yellow-400" />
          <span>{starsEarned} {t.starsEarned}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>🎯</span>
          <span>{score} {t.points}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>✅</span>
          <span>{correctCount} / {currentIndex + (isAnswered ? 1 : 0)} {t.correct}</span>
        </div>
      </div>
    </div>
  );
};
