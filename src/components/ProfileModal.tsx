import React, { useState } from 'react';
import { X, Check, Sparkles, Smile } from 'lucide-react';
import { UserProgress } from '../types';
import { saveProgress } from '../utils/storage';
import { playSound } from '../utils/sound';

interface ProfileModalProps {
  progress: UserProgress;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updated: UserProgress) => void;
}

const AVATARS = ['🦉', '🦁', '🚀', '🐬', '🐼', '🐯', '🌟', '🌈', '🐶', '🦊', '🐰', '🦄', '🦖', '🐻', '🐝'];

const PRESET_NAMES = [
  '⭐ Quiz Star',
  '🌟 GK Champ',
  '🚀 Smart Explorer',
  '🦁 Brave Cub',
  '🐬 Ocean Sparkle',
  '🐼 Panda Buddy',
  '🐯 Little Tiger',
  '🌈 Rainbow Kid',
  '🦉 Ollie Scout',
  '🦖 Dino Friend',
];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  progress,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [nickname, setNickname] = useState(progress.nickname);
  const [avatar, setAvatar] = useState(progress.avatar);

  if (!isOpen) return null;

  const handleSave = () => {
    playSound('click', progress.soundEnabled);
    const updated = {
      ...progress,
      nickname: nickname.trim() || '⭐ Quiz Star',
      avatar,
    };
    saveProgress(updated);
    onUpdate(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl border-4 border-amber-300 shadow-2xl p-6 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
        >
          <X size={20} />
        </button>

        <div className="text-center space-y-1">
          <div className="text-4xl">{avatar}</div>
          <h2 className="font-['Fredoka',sans-serif] text-2xl font-black text-slate-800">
            My Kid Profile
          </h2>
          <p className="text-xs font-semibold text-slate-500">
            Pick a cute animal avatar and fun nickname!
          </p>
        </div>

        {/* Avatars */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-2">
            Choose Your Avatar:
          </label>
          <div className="grid grid-cols-5 gap-2">
            {AVATARS.map((av) => (
              <button
                key={av}
                onClick={() => {
                  playSound('click', progress.soundEnabled);
                  setAvatar(av);
                }}
                className={`text-2xl h-12 rounded-2xl flex items-center justify-center border-2 transition-transform active:scale-90 ${
                  avatar === av
                    ? 'bg-amber-300 border-amber-500 scale-110 shadow-sm'
                    : 'bg-amber-50/50 border-amber-200 hover:bg-amber-100'
                }`}
              >
                {av}
              </button>
            ))}
          </div>
        </div>

        {/* Nicknames */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">
            Quick Nicknames:
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {PRESET_NAMES.map((name) => (
              <button
                key={name}
                onClick={() => {
                  playSound('click', progress.soundEnabled);
                  setNickname(name);
                }}
                className={`text-xs font-bold px-2.5 py-1 rounded-xl border transition-all ${
                  nickname === name
                    ? 'bg-amber-400 border-amber-500 text-amber-950 font-black'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50'
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          <input
            type="text"
            maxLength={20}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full bg-slate-50 border-2 border-amber-300 rounded-2xl px-4 py-2.5 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="Type your kid nickname..."
          />
        </div>

        {/* Questions per Quiz Session Setting */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-600">
              Questions per Quiz:
            </label>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
              {progress.questionsPerQuiz || 10} Questions
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[5, 8, 10, 15].map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() => {
                  playSound('click', progress.soundEnabled);
                  onUpdate({ ...progress, questionsPerQuiz: cnt });
                }}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  (progress.questionsPerQuiz || 10) === cnt
                    ? 'bg-amber-400 border-amber-500 text-amber-950 font-black shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-amber-50'
                }`}
              >
                {cnt} Qs
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl font-bold text-sm text-slate-600 bg-slate-100 hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-2xl font-['Fredoka',sans-serif] font-black text-base text-white bg-emerald-500 hover:bg-emerald-600 shadow-[0_4px_0_#065f46] active:translate-y-1 transition-all flex items-center justify-center gap-1.5"
          >
            <Check size={18} />
            <span>Save Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};
