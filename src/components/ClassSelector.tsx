import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Dices, CheckCircle2, BookOpen, Layers, Star, Play } from 'lucide-react';
import { ClassLevel, Category, Chapter, UserProgress } from '../types';
import { CLASS_LEVELS, CATEGORIES_CONFIG, QUESTIONS } from '../data/questions';
import { CHAPTERS } from '../data/chapters';
import { playSound } from '../utils/sound';
import { TRANSLATIONS, CLASS_LEVELS_TRANSLATIONS, CATEGORIES_TRANSLATIONS } from '../utils/translations';

interface ClassSelectorProps {
  progress: UserProgress;
  selectedClass: ClassLevel | null;
  onSelectClass: (level: ClassLevel) => void;
  onSelectCategory: (category: Category | 'Random') => void;
  onSelectChapter: (chapter: Chapter) => void;
  onBackToClasses: () => void;
}

export const ClassSelector: React.FC<ClassSelectorProps> = ({
  progress,
  selectedClass,
  onSelectClass,
  onSelectCategory,
  onSelectChapter,
  onBackToClasses,
}) => {
  const [viewMode, setViewMode] = useState<'chapters' | 'categories'>('chapters');
  const lang = progress.language || 'en';
  const t = TRANSLATIONS[lang];
  const classTexts = CLASS_LEVELS_TRANSLATIONS[lang];
  const catTexts = CATEGORIES_TRANSLATIONS[lang];

  // If no class is chosen yet, show the 7 big class cards
  if (!selectedClass) {
    return (
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-yellow-100 border border-yellow-300 text-yellow-900 font-black px-4 py-1 rounded-full text-xs sm:text-sm">
            <span>🎒</span> {t.chooseClassLevel}
          </div>
          <h2 className="font-['Fredoka','Mukta',sans-serif] text-3xl sm:text-4xl font-black text-slate-800">
            {t.pickLearningLevel}
          </h2>
          <p className="text-slate-600 font-semibold text-sm sm:text-base">
            {t.pickLevelDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {CLASS_LEVELS.map((c) => {
            const count = QUESTIONS.filter((q) => q.classLevel === c.level).length;
            const itemTrans = classTexts[c.level] || { title: c.title, desc: c.desc };

            return (
              <button
                key={c.level}
                onClick={() => {
                  playSound('click', progress.soundEnabled);
                  onSelectClass(c.level);
                }}
                className={`group relative overflow-hidden rounded-3xl bg-white p-5 sm:p-6 border-4 ${c.border} shadow-lg hover:shadow-xl hover:-translate-y-1.5 active:translate-y-1 transition-all text-left flex flex-col justify-between`}
              >
                {/* Top Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block bg-slate-100 text-slate-700 text-xs font-black px-2.5 py-0.5 rounded-full mb-1">
                      {itemTrans.desc}
                    </span>
                    <h3 className="font-['Fredoka','Mukta',sans-serif] text-2xl sm:text-3xl font-black text-slate-900">
                      {itemTrans.title}
                    </h3>
                  </div>
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${c.bg} flex items-center justify-center text-4xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform`}
                  >
                    {c.emoji}
                  </div>
                </div>

                {/* Grade focus summary */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="text-xs text-slate-500 font-semibold mb-2">
                    {c.level === 'LKG' || c.level === 'UKG'
                      ? lang === 'hi'
                        ? '🌸 सरल सचित्र प्रश्न, प्यारे इमोजी और बोलकर पढ़ने की सुविधा'
                        : '🌸 Simple visual questions with friendly emojis & voice read-aloud'
                      : c.level === 'Class 1' || c.level === 'Class 2'
                      ? lang === 'hi'
                        ? '🌿 जानवर, फल, रंग, शरीर के अंग और भारत ज्ञान'
                        : '🌿 Animals, Fruits, Colors, Body parts & India basics'
                      : lang === 'hi'
                      ? '🚀 विज्ञान, अंतरिक्ष, विश्व ज्ञान, इतिहास और तकनीक'
                      : '🚀 Science, Space, World GK, History & Technology'}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                      {count} {t.questionsAvailable}
                    </span>
                    <span className="font-['Fredoka','Mukta',sans-serif] font-bold text-sm text-sky-600 group-hover:translate-x-1 transition-transform">
                      {t.openTopics}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // A class is selected: show categories for that class!
  const currentClassInfo = CLASS_LEVELS.find((c) => c.level === selectedClass);
  const currentClassTrans = classTexts[selectedClass] || { title: selectedClass, desc: '' };
  const questionsInClass = QUESTIONS.filter((q) => q.classLevel === selectedClass);

  return (
    <div className="space-y-6">
      {/* Top Banner with back button & class indicator */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-3xl p-4 sm:p-6 border-3 border-amber-200 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSound('click', progress.soundEnabled);
              onBackToClasses();
            }}
            className="w-10 h-10 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 flex items-center justify-center transition-transform active:scale-90"
            title="Back to all classes"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              {t.selectedLevel}
            </div>
            <h2 className="font-['Fredoka','Mukta',sans-serif] text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
              <span>{currentClassInfo?.emoji}</span> {currentClassTrans.title} {t.quizzes}
            </h2>
          </div>
        </div>

        <button
          onClick={() => {
            playSound('click', progress.soundEnabled);
            onSelectCategory('Random');
          }}
          className="w-full sm:w-auto font-['Fredoka','Mukta',sans-serif] font-black text-base bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white px-5 py-3 rounded-2xl shadow-[0_5px_0_#3730a3] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 transition-all"
        >
          <Dices size={22} className="animate-spin-slow" />
          <span>🎲 {t.playRandomQuiz}</span>
        </button>
      </div>

      {/* Mode Switcher Tabs: Chapters vs Categories */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-amber-200 pb-3">
        <div className="flex items-center gap-2 p-1 bg-amber-100/80 rounded-2xl">
          <button
            onClick={() => {
              playSound('click', progress.soundEnabled);
              setViewMode('chapters');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-['Fredoka','Mukta',sans-serif] font-black text-sm sm:text-base transition-all ${
              viewMode === 'chapters'
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-amber-950 hover:bg-amber-200/60'
            }`}
          >
            <BookOpen size={18} />
            <span>{t.tabChapters}</span>
          </button>

          <button
            onClick={() => {
              playSound('click', progress.soundEnabled);
              setViewMode('categories');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-['Fredoka','Mukta',sans-serif] font-black text-sm sm:text-base transition-all ${
              viewMode === 'categories'
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-amber-950 hover:bg-amber-200/60'
            }`}
          >
            <Layers size={18} />
            <span>{t.tabCategories}</span>
          </button>
        </div>

        <div className="text-xs sm:text-sm font-bold text-slate-500">
          {viewMode === 'chapters' ? t.chapterDescLabel : t.chooseTopicDesc}
        </div>
      </div>

      {/* VIEW 1: CHAPTERS LIST */}
      {viewMode === 'chapters' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHAPTERS.filter((ch) => ch.classLevel === selectedClass).map((ch) => {
              const chQuestions = questionsInClass.filter((q) => q.chapterId === ch.id);
              const isCompleted = progress.completedChapterIds?.includes(ch.id);
              const titleText = lang === 'hi' ? ch.titleHi : ch.title;
              const descText = lang === 'hi' ? ch.descriptionHi : ch.description;

              return (
                <div
                  key={ch.id}
                  className="group relative bg-white rounded-3xl p-5 border-3 border-amber-200 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between overflow-hidden"
                >
                  {/* Card top banner badge */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-100 text-amber-900 border border-amber-300 font-black text-xs px-2.5 py-0.5 rounded-full">
                        {t.chapter} {ch.chapterNumber}
                      </span>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {catTexts[ch.category] || ch.category}
                      </span>
                    </div>

                    {isCompleted && (
                      <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black px-2.5 py-0.5 rounded-full shadow-sm">
                        <CheckCircle2 size={13} className="text-emerald-600" />
                        <span>{t.chapterCompleted}</span>
                      </span>
                    )}
                  </div>

                  {/* Title & icon */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${ch.color} flex items-center justify-center text-3xl shadow-md shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                      {ch.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-['Fredoka','Mukta',sans-serif] font-black text-lg sm:text-xl text-slate-900 leading-snug">
                        {titleText}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1 line-clamp-2">
                        {descText}
                      </p>
                    </div>
                  </div>

                  {/* Card footer with questions count & Play action */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                    <div className="text-xs font-extrabold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg">
                      {chQuestions.length > 0 ? chQuestions.length : 8} {t.question}
                    </div>

                    <button
                      onClick={() => {
                        playSound('click', progress.soundEnabled);
                        onSelectChapter(ch);
                      }}
                      className="font-['Fredoka','Mukta',sans-serif] font-black text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-4 py-2 rounded-xl shadow-[0_3px_0_#c2410c] active:translate-y-0.5 active:shadow-none flex items-center gap-1.5 transition-all"
                    >
                      <Play size={15} fill="currentColor" />
                      <span>{t.startChapterQuiz}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: CATEGORIES / SUBJECTS GRID */}
      {viewMode === 'categories' && (
        <div className="space-y-4">
          <div>
            <h3 className="font-['Fredoka','Mukta',sans-serif] text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>🎯</span> {t.selectGKSubject}
            </h3>
            <p className="text-sm text-slate-600 font-semibold">
              {t.chooseTopicDesc}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {CATEGORIES_CONFIG.map((cat) => {
              const matchingCount = questionsInClass.filter(
                (q) => q.category === cat.name
              ).length;

              const availableCount =
                matchingCount > 0
                  ? matchingCount
                  : QUESTIONS.filter((q) => q.category === cat.name).length;

              const translatedCatName = catTexts[cat.name] || cat.name;

              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    playSound('click', progress.soundEnabled);
                    onSelectCategory(cat.name);
                  }}
                  className={`group flex flex-col items-center text-center p-4 rounded-3xl border-3 shadow-sm hover:shadow-md hover:-translate-y-1 active:translate-y-1 transition-all ${cat.color}`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/80 shadow-sm flex items-center justify-center text-3xl mb-2.5 group-hover:scale-110 transition-transform">
                    {cat.emoji}
                  </div>
                  <div className="font-['Fredoka','Mukta',sans-serif] font-black text-base sm:text-lg leading-tight">
                    {translatedCatName}
                  </div>
                  <div className="text-xs font-bold opacity-75 mt-1">
                    {availableCount} {t.question}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
