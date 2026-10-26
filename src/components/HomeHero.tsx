import React from 'react';
import { Sparkles, Play, BookOpen, Trophy, Award, Flame, Star, Compass } from 'lucide-react';
import { Mascot } from './Mascot';
import { UserProgress, ClassLevel } from '../types';
import { CLASS_LEVELS } from '../data/questions';
import { playSound } from '../utils/sound';
import { TRANSLATIONS, CLASS_LEVELS_TRANSLATIONS } from '../utils/translations';

interface HomeHeroProps {
  progress: UserProgress;
  onStartRandomQuiz: () => void;
  onSelectClass: (level: ClassLevel) => void;
  onGoToClasses: () => void;
  onGoToLeaderboard: () => void;
  onGoToRewards: () => void;
  onGoToDaily: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  progress,
  onStartRandomQuiz,
  onSelectClass,
  onGoToClasses,
  onGoToLeaderboard,
  onGoToRewards,
  onGoToDaily,
}) => {
  const isDailyDone = !!progress.dailyChallengeCompletedDate;
  const lang = progress.language || 'en';
  const t = TRANSLATIONS[lang];
  const classTexts = CLASS_LEVELS_TRANSLATIONS[lang];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-amber-200 via-amber-100 to-yellow-50 border-4 border-amber-300 p-5 sm:p-8 shadow-xl">
        {/* Floating background decorative shapes */}
        <div className="absolute top-4 right-10 text-4xl opacity-30 select-none animate-pulse">✨</div>
        <div className="absolute top-1/2 left-4 text-3xl opacity-25 select-none">🎈</div>
        <div className="absolute bottom-4 right-1/4 text-4xl opacity-25 select-none">🌈</div>
        <div className="absolute top-8 left-1/3 text-3xl opacity-20 select-none">🚀</div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left Text & Mascot */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
            <Mascot
              size="lg"
              mood="cheering"
              speechText={t.mascotHi(progress.nickname.split(' ')[0])}
              className="shrink-0"
            />

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-amber-300 text-amber-950 font-black px-3.5 py-1 rounded-full text-xs sm:text-sm tracking-wide uppercase shadow-sm">
                <Sparkles size={16} /> {t.heroBadge}
              </div>
              <h1 className="font-['Fredoka','Mukta',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black text-amber-950 leading-tight">
                🌟 {t.heroTitlePrefix} <br className="hidden sm:inline" />
                <span className="text-amber-600 underline decoration-yellow-400 decoration-wavy">{t.appName}</span>!
              </h1>
              <p className="font-['Fredoka','Mukta',sans-serif] text-lg sm:text-xl font-bold text-amber-900">
                {t.tagline} ⭐
              </p>
              <p className="text-sm sm:text-base text-slate-600 max-w-md font-medium">
                {t.heroDesc}
              </p>
            </div>
          </div>

          {/* Right Streak / Quick Badge Box */}
          <div className="w-full lg:w-auto flex flex-row lg:flex-col items-center justify-center gap-3">
            <div className="bg-white/90 backdrop-blur rounded-2xl p-3.5 border-2 border-amber-200 shadow-md text-center min-w-[130px]">
              <div className="flex items-center justify-center text-rose-500 mb-0.5">
                <Flame size={26} className="animate-bounce" />
              </div>
              <div className="font-['Fredoka',sans-serif] text-2xl font-black text-slate-800">
                {progress.streak} {t.inARow}
              </div>
              <div className="text-xs font-bold text-slate-500">{t.currentStreak}</div>
            </div>

            <div className="bg-white/90 backdrop-blur rounded-2xl p-3.5 border-2 border-amber-200 shadow-md text-center min-w-[130px]">
              <div className="flex items-center justify-center text-yellow-500 mb-0.5">
                <Star size={26} className="fill-yellow-400" />
              </div>
              <div className="font-['Fredoka',sans-serif] text-2xl font-black text-slate-800">
                {progress.stars} {t.starsSoFar}
              </div>
              <div className="text-xs font-bold text-slate-500">{t.earnedSoFar}</div>
            </div>
          </div>
        </div>

        {/* 4 Main Action Buttons */}
        <div className="relative z-10 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <button
            onClick={() => {
              playSound('click', progress.soundEnabled);
              onStartRandomQuiz();
            }}
            className="group relative flex flex-col sm:flex-row items-center justify-center gap-2 bg-gradient-to-b from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-white font-['Fredoka','Mukta',sans-serif] font-bold text-base sm:text-lg py-3.5 px-4 rounded-2xl shadow-[0_6px_0_#065f46] hover:shadow-[0_4px_0_#065f46] hover:translate-y-0.5 active:translate-y-1.5 active:shadow-none transition-all"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">🎮</span>
            <span>{t.startQuiz}</span>
          </button>

          <button
            onClick={() => {
              playSound('click', progress.soundEnabled);
              onGoToClasses();
            }}
            className="group relative flex flex-col sm:flex-row items-center justify-center gap-2 bg-gradient-to-b from-sky-400 to-sky-500 hover:from-sky-300 hover:to-sky-400 text-white font-['Fredoka','Mukta',sans-serif] font-bold text-base sm:text-lg py-3.5 px-4 rounded-2xl shadow-[0_6px_0_#0369a1] hover:shadow-[0_4px_0_#0369a1] hover:translate-y-0.5 active:translate-y-1.5 active:shadow-none transition-all"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">📚</span>
            <span>{t.chooseClass}</span>
          </button>

          <button
            onClick={() => {
              playSound('click', progress.soundEnabled);
              onGoToLeaderboard();
            }}
            className="group relative flex flex-col sm:flex-row items-center justify-center gap-2 bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 font-['Fredoka','Mukta',sans-serif] font-bold text-base sm:text-lg py-3.5 px-4 rounded-2xl shadow-[0_6px_0_#b45309] hover:shadow-[0_4px_0_#b45309] hover:translate-y-0.5 active:translate-y-1.5 active:shadow-none transition-all"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">🏆</span>
            <span>{t.leaderboard}</span>
          </button>

          <button
            onClick={() => {
              playSound('click', progress.soundEnabled);
              onGoToRewards();
            }}
            className="group relative flex flex-col sm:flex-row items-center justify-center gap-2 bg-gradient-to-b from-purple-400 to-purple-500 hover:from-purple-300 hover:to-purple-400 text-white font-['Fredoka','Mukta',sans-serif] font-bold text-base sm:text-lg py-3.5 px-4 rounded-2xl shadow-[0_6px_0_#581c87] hover:shadow-[0_4px_0_#581c87] hover:translate-y-0.5 active:translate-y-1.5 active:shadow-none transition-all"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">⭐</span>
            <span>{t.myRewards}</span>
          </button>
        </div>
      </div>

      {/* Daily Challenge Promo Banner */}
      <div
        onClick={() => {
          playSound('click', progress.soundEnabled);
          onGoToDaily();
        }}
        className={`cursor-pointer rounded-2xl p-4 sm:p-5 border-3 transition-transform hover:scale-[1.01] active:scale-[0.99] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md ${
          isDailyDone
            ? 'bg-gradient-to-r from-emerald-100 to-teal-50 border-emerald-300'
            : 'bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-100 border-amber-300'
        }`}
      >
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm border border-amber-200 shrink-0">
            {isDailyDone ? '🎉' : '🌅'}
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-['Fredoka','Mukta',sans-serif] font-bold text-lg sm:text-xl text-slate-800">
                🌟 {t.todayDailyGK}
              </span>
              {isDailyDone ? (
                <span className="bg-emerald-500 text-white text-xs font-black px-2 py-0.5 rounded-full">
                  {t.doneToday}
                </span>
              ) : (
                <span className="bg-rose-500 text-white text-xs font-black px-2 py-0.5 rounded-full animate-pulse">
                  {t.newQuestions}
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-slate-600 mt-0.5">
              {isDailyDone ? t.dailyPromoDone : t.dailyPromoActive}
            </p>
          </div>
        </div>

        <button className="w-full sm:w-auto font-['Fredoka','Mukta',sans-serif] font-bold text-base bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl shadow-[0_4px_0_#b45309] shrink-0">
          {isDailyDone ? t.viewResults : t.playToday}
        </button>
      </div>

      {/* Choose Class Cards Grid (7 Grade Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-['Fredoka','Mukta',sans-serif] text-2xl font-bold text-slate-800 flex items-center gap-2">
              <span>📚</span> {t.chooseClassLevel}
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              {t.classSubtitle}
            </p>
          </div>
          <button
            onClick={onGoToClasses}
            className="text-amber-800 hover:text-amber-900 font-bold text-sm underline decoration-amber-400"
          >
            {t.seeAllCategories}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-3.5">
          {CLASS_LEVELS.map((item) => {
            const translatedClass = classTexts[item.level] || { title: item.title, desc: item.desc };
            return (
              <button
                key={item.level}
                onClick={() => {
                  playSound('click', progress.soundEnabled);
                  onSelectClass(item.level);
                }}
                className={`group flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl bg-white border-3 ${item.border} shadow-sm hover:shadow-md hover:-translate-y-1 active:translate-y-0.5 transition-all`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.bg} flex items-center justify-center text-3xl shadow-sm mb-2 group-hover:scale-110 transition-transform`}>
                  {item.emoji}
                </div>
                <div className="font-['Fredoka','Mukta',sans-serif] font-extrabold text-base sm:text-lg text-slate-800">
                  {translatedClass.title}
                </div>
                <div className="text-[11px] font-semibold text-slate-500 mt-0.5 line-clamp-1">
                  {translatedClass.desc.split('•')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
