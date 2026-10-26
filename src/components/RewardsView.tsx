import React from 'react';
import { Award, Star, Flame, Sparkles, Lock, CheckCircle2 } from 'lucide-react';
import { UserProgress } from '../types';
import { BADGES } from '../data/badges';
import { Mascot } from './Mascot';
import { TRANSLATIONS } from '../utils/translations';

interface RewardsViewProps {
  progress: UserProgress;
  onGoHome: () => void;
}

export const RewardsView: React.FC<RewardsViewProps> = ({
  progress,
  onGoHome,
}) => {
  const lang = progress.language || 'en';
  const t = TRANSLATIONS[lang];

  const unlockedSet = new Set(progress.unlockedBadgeIds);
  const unlockedCount = progress.unlockedBadgeIds.length;
  const totalBadges = BADGES.length;
  const percentComplete = Math.round((unlockedCount / totalBadges) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Rewards Header Card */}
      <div className="bg-gradient-to-r from-yellow-200 via-amber-100 to-amber-200 rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
          <Mascot
            size="lg"
            mood={unlockedCount >= 3 ? 'cheering' : 'happy'}
            speechText={
              lang === 'hi'
                ? `अपनी ट्रॉफियां देखिए! आपने ${unlockedCount} पदक अनलॉक कर लिए हैं! ⭐`
                : `Look at your trophies! You have unlocked ${unlockedCount} badges! ⭐`
            }
          />
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-amber-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider mb-2">
              <Award size={16} /> {t.trophyCabinet}
            </div>
            <h1 className="font-['Fredoka','Mukta',sans-serif] text-3xl sm:text-4xl font-black text-slate-800">
              ⭐ {t.myStarsBadges}
            </h1>
            <p className="text-slate-700 font-bold text-sm sm:text-base mt-1">
              {t.rewardsDesc}
            </p>
          </div>
        </div>

        {/* Big Counter Totals */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-white/95 rounded-2xl p-4 border-2 border-amber-200 shadow-md text-center min-w-[110px]">
            <div className="text-2xl mb-1">⭐</div>
            <div className="font-['Fredoka',sans-serif] text-2xl font-black text-amber-900">
              {progress.stars}
            </div>
            <div className="text-xs font-bold text-slate-500">{t.starsSoFar}</div>
          </div>

          <div className="bg-white/95 rounded-2xl p-4 border-2 border-amber-200 shadow-md text-center min-w-[110px]">
            <div className="text-2xl mb-1">🎯</div>
            <div className="font-['Fredoka',sans-serif] text-2xl font-black text-emerald-700">
              {progress.points}
            </div>
            <div className="text-xs font-bold text-slate-500">{t.points}</div>
          </div>
        </div>
      </div>

      {/* Progress Bar for Badge Collection */}
      <div className="bg-white rounded-2xl p-4 border-2 border-amber-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between font-bold text-sm text-slate-700">
          <span>{t.badgesCollectionProgress}</span>
          <span className="text-amber-800 font-black">
            {unlockedCount} / {totalBadges} {t.unlocked} ({percentComplete}%)
          </span>
        </div>
        <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(5, percentComplete)}%` }}
          />
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {BADGES.map((badge) => {
          const isUnlocked = unlockedSet.has(badge.id);
          const title = lang === 'hi' && badge.titleHi ? badge.titleHi : badge.title;
          const desc = lang === 'hi' && badge.descriptionHi ? badge.descriptionHi : badge.description;

          return (
            <div
              key={badge.id}
              className={`relative overflow-hidden rounded-3xl p-5 border-3 transition-all ${
                isUnlocked
                  ? 'bg-white border-amber-300 shadow-md hover:-translate-y-1'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              {/* Unlocked tag */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${
                    isUnlocked
                      ? 'bg-gradient-to-tr from-yellow-300 to-amber-200 border-2 border-amber-300'
                      : 'bg-slate-200 grayscale'
                  }`}
                >
                  {badge.icon}
                </div>

                {isUnlocked ? (
                  <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-black px-2.5 py-1 rounded-full border border-emerald-300">
                    <CheckCircle2 size={13} /> {t.unlocked}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 bg-slate-200 text-slate-600 text-[11px] font-black px-2.5 py-1 rounded-full">
                    <Lock size={12} /> {t.locked}
                  </span>
                )}
              </div>

              <h3 className="font-['Fredoka','Mukta',sans-serif] text-lg font-black text-slate-800">
                {title}
              </h3>
              <p className="text-xs font-semibold text-slate-600 mt-1">
                {desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
