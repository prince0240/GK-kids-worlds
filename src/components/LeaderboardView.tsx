import React, { useState } from 'react';
import { Trophy, Star, Shield, Eye, EyeOff, Edit3, Check } from 'lucide-react';
import { UserProgress, LeaderboardEntry } from '../types';
import { getLeaderboardData, saveProgress } from '../utils/storage';
import { playSound } from '../utils/sound';
import { TRANSLATIONS } from '../utils/translations';

interface LeaderboardViewProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
}

const FUN_NICKNAMES_EN = [
  '⭐ Quiz Star',
  '🌟 GK Champ',
  '🚀 Smart Explorer',
  '🦁 Brave Cub',
  '🐬 Ocean Dolphin',
  '🐼 Panda Buddy',
  '🐯 Little Tiger',
  '🦉 Ollie Scout',
  '🌈 Rainbow Kid',
  '⚡ Lightning Brain',
];

const FUN_NICKNAMES_HI = [
  '⭐ क्विज़ स्टार',
  '🌟 जीके चैंपियन',
  '🚀 नन्हे वैज्ञानिक',
  '🦁 नन्हा शेर',
  '🐬 प्यारी डॉल्फ़िन',
  '🐼 पांडा दोस्त',
  '🐯 छोटा टाइगर',
  '🦉 बुद्धिमान उल्लू',
  '🌈 सतरंगी किरण',
  '⚡ बिजली दिमाग',
];

const FUN_AVATARS = ['🦉', '🦁', '🚀', '🐬', '🐼', '🐯', '🌟', '🌈', '🐶', '🦊', '🐰', '🦄'];

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const lang = progress.language || 'en';
  const t = TRANSLATIONS[lang];
  const nicknamesList = lang === 'hi' ? FUN_NICKNAMES_HI : FUN_NICKNAMES_EN;

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempNickname, setTempNickname] = useState(progress.nickname);
  const [tempAvatar, setTempAvatar] = useState(progress.avatar);

  const leaderboard = getLeaderboardData(progress);

  const handleToggleHide = () => {
    playSound('click', progress.soundEnabled);
    const updated: UserProgress = {
      ...progress,
      hideFromLeaderboard: !progress.hideFromLeaderboard,
    };
    saveProgress(updated);
    onUpdateProgress(updated);
  };

  const handleSaveProfile = () => {
    playSound('click', progress.soundEnabled);
    const updated: UserProgress = {
      ...progress,
      nickname: tempNickname.trim() || (lang === 'hi' ? '⭐ क्विज़ स्टार' : '⭐ Quiz Star'),
      avatar: tempAvatar,
    };
    saveProgress(updated);
    onUpdateProgress(updated);
    setIsEditingProfile(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-200 rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-white shadow-md flex items-center justify-center text-4xl mb-1">
          🏆
        </div>
        <h1 className="font-['Fredoka','Mukta',sans-serif] text-3xl sm:text-4xl font-black text-slate-900">
          {t.topLearnersTitle}
        </h1>
        <p className="text-slate-700 font-bold text-sm sm:text-base max-w-md mx-auto">
          {t.topLearnersDesc}
        </p>

        {/* Child Safety & Privacy notice */}
        <div className="inline-flex items-center gap-2 bg-white/90 text-slate-700 text-xs font-bold px-4 py-1.5 rounded-full border border-amber-300">
          <Shield size={14} className="text-emerald-600" />
          <span>{t.childPrivacyGuard}</span>
        </div>
      </div>

      {/* User Status & Settings Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-3 border-amber-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="text-3xl">{progress.avatar}</span>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">{t.myPlayerCard}</div>
            <div className="font-['Fredoka','Mukta',sans-serif] font-black text-lg text-slate-800 flex items-center gap-2">
              <span>{progress.nickname}</span>
              <span className="text-amber-600 font-bold text-sm">({progress.stars} ⭐)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="flex items-center gap-1.5 bg-sky-100 hover:bg-sky-200 text-sky-900 text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl transition-all"
          >
            <Edit3 size={15} />
            <span>{t.changeNickname}</span>
          </button>

          <button
            onClick={handleToggleHide}
            className={`flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl transition-all ${
              progress.hideFromLeaderboard
                ? 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
            }`}
          >
            {progress.hideFromLeaderboard ? <EyeOff size={15} /> : <Eye size={15} />}
            <span>
              {progress.hideFromLeaderboard ? t.hiddenFromBoard : t.visibleOnBoard}
            </span>
          </button>
        </div>
      </div>

      {/* Edit Profile Panel */}
      {isEditingProfile && (
        <div className="bg-amber-50 rounded-3xl p-5 border-3 border-amber-300 shadow-md space-y-4 animate-fadeIn">
          <h3 className="font-['Fredoka','Mukta',sans-serif] font-black text-lg text-slate-800">
            {lang === 'hi' ? 'अपना पसंदीदा बाल अवतार और उपनाम चुनें' : 'Choose Your Fun Kid Nickname & Avatar'}
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">
              {lang === 'hi' ? 'अवतार चुनें:' : 'Pick an Avatar:'}
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {FUN_AVATARS.map((av) => (
                <button
                  key={av}
                  onClick={() => setTempAvatar(av)}
                  className={`w-11 h-11 text-2xl rounded-2xl flex items-center justify-center border-2 transition-all ${
                    tempAvatar === av
                      ? 'bg-amber-400 border-amber-600 scale-110 shadow-sm'
                      : 'bg-white border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">
              {lang === 'hi' ? 'सुझाए गए प्यारे नाम (चुनने के लिए टैप करें):' : 'Kid Safe Nicknames (Click to select or type custom):'}
            </label>
            <div className="flex items-center gap-1.5 flex-wrap mb-2">
              {nicknamesList.slice(0, 6).map((name) => (
                <button
                  key={name}
                  onClick={() => setTempNickname(name)}
                  className="bg-white hover:bg-amber-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-xl border border-amber-200"
                >
                  {name}
                </button>
              ))}
            </div>
            <input
              type="text"
              maxLength={20}
              value={tempNickname}
              onChange={(e) => setTempNickname(e.target.value)}
              placeholder={lang === 'hi' ? 'उदा. ⭐ क्विज़ स्टार' : 'e.g. ⭐ Quiz Star'}
              className="w-full bg-white border-2 border-amber-300 rounded-xl px-4 py-2 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditingProfile(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 px-4 py-2"
            >
              {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              onClick={handleSaveProfile}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Check size={16} /> {lang === 'hi' ? 'सहेजें' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border-3 border-amber-200 shadow-md space-y-2.5">
        {leaderboard.map((entry, idx) => {
          const rank = idx + 1;
          const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}`;

          return (
            <div
              key={entry.id}
              className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border-2 transition-all ${
                entry.isCurrentUser
                  ? 'bg-amber-100/80 border-amber-400 ring-2 ring-amber-300/60 shadow-sm'
                  : 'bg-slate-50/60 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-['Fredoka',sans-serif] font-black text-lg ${
                    rank === 1
                      ? 'bg-yellow-300 text-yellow-950 shadow-sm'
                      : rank === 2
                      ? 'bg-slate-200 text-slate-800'
                      : rank === 3
                      ? 'bg-amber-200 text-amber-900'
                      : 'bg-white border border-slate-200 text-slate-600 text-base'
                  }`}
                >
                  {medal}
                </div>

                <div className="text-3xl shrink-0">{entry.avatar}</div>

                <div>
                  <div className="font-['Fredoka','Mukta',sans-serif] font-black text-base sm:text-lg text-slate-900 flex items-center gap-2">
                    <span>{entry.nickname}</span>
                    {entry.isCurrentUser && (
                      <span className="bg-amber-300 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                        {lang === 'hi' ? 'आप!' : 'YOU!'}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-slate-500">
                    {entry.quizzes} {t.quizzesCompletedText}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 font-['Fredoka',sans-serif] font-black text-lg sm:text-xl text-amber-900 bg-amber-50 px-3 py-1.5 rounded-2xl border border-amber-200">
                <span>⭐</span>
                <span>{entry.stars}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
