import React from 'react';
import { Volume2, VolumeX, Trophy, Star, Award, Shield, Sparkles, Flame, User, Languages } from 'lucide-react';
import { UserProgress } from '../types';
import { playSound } from '../utils/sound';
import { TRANSLATIONS } from '../utils/translations';

interface NavbarProps {
  progress: UserProgress;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onToggleSound: () => void;
  onToggleLanguage: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  progress,
  activeTab,
  setActiveTab,
  onToggleSound,
  onToggleLanguage,
  onOpenProfile,
}) => {
  const lang = progress.language || 'en';
  const t = TRANSLATIONS[lang];

  const handleNav = (tab: string) => {
    playSound('click', progress.soundEnabled);
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b-4 border-amber-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Logo / Brand */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2 group text-left transition-transform active:scale-95 shrink-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-md border-2 border-yellow-200 group-hover:rotate-6 transition-transform">
            <span className="text-2xl">🌟</span>
          </div>
          <div>
            <div className="font-['Fredoka',sans-serif] font-bold text-lg sm:text-xl md:text-2xl text-amber-900 tracking-wide flex items-center gap-1 leading-none">
              {t.appName}
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-amber-600 tracking-wider">
              {t.appSub}
            </div>
          </div>
        </button>

        {/* Center Navigation Links - Desktop & Tablets */}
        <nav className="hidden md:flex items-center gap-1 font-bold text-sm">
          <button
            onClick={() => handleNav('home')}
            className={`px-2.5 lg:px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'home'
                ? 'bg-amber-400 text-amber-950 shadow-sm font-extrabold'
                : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            🏠 {t.home}
          </button>
          <button
            onClick={() => handleNav('classes')}
            className={`px-2.5 lg:px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'classes'
                ? 'bg-amber-400 text-amber-950 shadow-sm font-extrabold'
                : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            📚 {t.classes}
          </button>
          <button
            onClick={() => handleNav('daily')}
            className={`px-2.5 lg:px-3 py-1.5 rounded-xl transition-all relative ${
              activeTab === 'daily'
                ? 'bg-amber-400 text-amber-950 shadow-sm font-extrabold'
                : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            🌅 {t.dailyChallenge}
            {!progress.dailyChallengeCompletedDate && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
            )}
          </button>
          <button
            onClick={() => handleNav('leaderboard')}
            className={`px-2.5 lg:px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-amber-400 text-amber-950 shadow-sm font-extrabold'
                : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            🏆 {t.leaderboard}
          </button>
          <button
            onClick={() => handleNav('rewards')}
            className={`px-2.5 lg:px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'rewards'
                ? 'bg-amber-400 text-amber-950 shadow-sm font-extrabold'
                : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            ⭐ {t.badges}
          </button>
          <button
            onClick={() => handleNav('parents')}
            className={`px-2.5 py-1.5 rounded-xl transition-all text-xs ${
              activeTab === 'parents'
                ? 'bg-slate-700 text-white font-extrabold'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            👨‍👩‍👧 {t.parents}
          </button>
        </nav>

        {/* Right Stats & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Toggle Button */}
          <button
            onClick={onToggleLanguage}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs sm:text-sm font-black border-2 transition-all active:scale-95 shadow-sm ${
              lang === 'hi'
                ? 'bg-orange-500 hover:bg-orange-600 text-white border-orange-600 ring-2 ring-orange-200'
                : 'bg-gradient-to-r from-emerald-50 to-teal-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300'
            }`}
            title={lang === 'hi' ? 'Switch to English' : 'हिंदी में बदलें (Convert to Hindi)'}
          >
            <Languages size={15} className="shrink-0" />
            <span>{lang === 'hi' ? '🇬🇧 English' : '🇮🇳 हिन्दी'}</span>
          </button>

          {/* Star Counter Pill */}
          <div className="flex items-center gap-1 bg-yellow-100/90 border-2 border-yellow-300 text-yellow-900 font-extrabold px-2 sm:px-2.5 py-1 rounded-full text-xs sm:text-sm shadow-inner">
            <span className="text-base animate-pulse">⭐</span>
            <span>{progress.stars}</span>
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={onToggleSound}
            aria-label={progress.soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 flex items-center justify-center text-amber-900 transition-transform active:scale-90"
            title={progress.soundEnabled ? 'Mute sounds' : 'Turn on sounds'}
          >
            {progress.soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* User Nickname & Avatar Pill */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1 bg-sky-100 hover:bg-sky-200 border-2 border-sky-300 px-2 sm:px-2.5 py-1 rounded-full text-xs font-bold text-sky-950 transition-all active:scale-95"
            title="Edit My Kid Avatar & Nickname"
          >
            <span className="text-base sm:text-lg">{progress.avatar}</span>
            <span className="hidden lg:inline max-w-[70px] truncate">{progress.nickname}</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden border-t border-amber-200 bg-amber-50/80 px-2 py-1.5 flex items-center justify-around text-[11px] font-bold">
        <button
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center py-0.5 px-2 rounded-lg ${
            activeTab === 'home' ? 'text-amber-900 font-black' : 'text-slate-600'
          }`}
        >
          <span className="text-base">🏠</span>
          <span>{t.home}</span>
        </button>
        <button
          onClick={() => handleNav('classes')}
          className={`flex flex-col items-center py-0.5 px-2 rounded-lg ${
            activeTab === 'classes' ? 'text-amber-900 font-black' : 'text-slate-600'
          }`}
        >
          <span className="text-base">📚</span>
          <span>{t.classes}</span>
        </button>
        <button
          onClick={() => handleNav('daily')}
          className={`flex flex-col items-center py-0.5 px-2 rounded-lg relative ${
            activeTab === 'daily' ? 'text-amber-900 font-black' : 'text-slate-600'
          }`}
        >
          <span className="text-base">🌅</span>
          <span>{t.dailyChallenge.split(' ')[0]}</span>
          {!progress.dailyChallengeCompletedDate && (
            <span className="absolute top-0 right-2 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
          )}
        </button>
        <button
          onClick={() => handleNav('rewards')}
          className={`flex flex-col items-center py-0.5 px-2 rounded-lg ${
            activeTab === 'rewards' ? 'text-amber-900 font-black' : 'text-slate-600'
          }`}
        >
          <span className="text-base">⭐</span>
          <span>{t.badges}</span>
        </button>
        <button
          onClick={() => handleNav('leaderboard')}
          className={`flex flex-col items-center py-0.5 px-2 rounded-lg ${
            activeTab === 'leaderboard' ? 'text-amber-900 font-black' : 'text-slate-600'
          }`}
        >
          <span className="text-base">🏆</span>
          <span>{t.ranks}</span>
        </button>
        <button
          onClick={() => handleNav('parents')}
          className={`flex flex-col items-center py-0.5 px-2 rounded-lg ${
            activeTab === 'parents' ? 'text-slate-900 font-black' : 'text-slate-500'
          }`}
        >
          <span className="text-base">👨‍👩‍👧</span>
          <span>{t.parents}</span>
        </button>
      </div>
    </header>
  );
};
