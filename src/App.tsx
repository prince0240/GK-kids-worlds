/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { ClassSelector } from './components/ClassSelector';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { DailyChallenge } from './components/DailyChallenge';
import { RewardsView } from './components/RewardsView';
import { LeaderboardView } from './components/LeaderboardView';
import { ParentDashboard } from './components/ParentDashboard';
import { ProfileModal } from './components/ProfileModal';
import { ClassLevel, Category, Chapter, Question, UserProgress } from './types';
import { QUESTIONS } from './data/questions';
import {
  getSavedProgress,
  saveProgress,
  recordQuizCompletion,
} from './utils/storage';
import { playSound } from './utils/sound';
import { TRANSLATIONS } from './utils/translations';
import { selectQuizQuestions } from './utils/quizEngine';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => getSavedProgress());
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedClass, setSelectedClass] = useState<ClassLevel | null>('LKG');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const lang = progress.language || 'en';
  const t = TRANSLATIONS[lang];

  // Active quiz session state
  const [activeQuizQuestions, setActiveQuizQuestions] = useState<Question[]>([]);
  const [activeQuizClass, setActiveQuizClass] = useState<ClassLevel>('LKG');
  const [activeQuizCategory, setActiveQuizCategory] = useState<string>('Mixed GK');
  const [activeQuizChapterId, setActiveQuizChapterId] = useState<string | null>(null);

  // Completed quiz results state
  const [lastQuizResult, setLastQuizResult] = useState<{
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    starsEarned: number;
    newBadges: string[];
    classLevel: ClassLevel;
    categoryName: string;
    answersRecord: { question: Question; selectedAnswer: string; isCorrect: boolean }[];
  } | null>(null);

  // Sync state changes with localStorage
  const handleUpdateProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  const handleToggleSound = () => {
    const updated = {
      ...progress,
      soundEnabled: !progress.soundEnabled,
    };
    handleUpdateProgress(updated);
    if (updated.soundEnabled) {
      playSound('click', true);
    }
  };

  const handleToggleLanguage = () => {
    const nextLang = lang === 'en' ? 'hi' : 'en';
    const updated: UserProgress = {
      ...progress,
      language: nextLang,
    };
    handleUpdateProgress(updated);
    playSound('click', progress.soundEnabled);
  };

  // Launch a Random Quiz
  const handleStartRandomQuiz = (customClass?: ClassLevel) => {
    setActiveQuizChapterId(null);
    const targetClass = customClass || selectedClass || 'Class 1';
    let pool = QUESTIONS.filter((q) => q.classLevel === targetClass);
    if (pool.length < 5) {
      pool = [...QUESTIONS];
    }

    const count = progress.questionsPerQuiz || 10;
    const { questions: selected, updatedHistoryIds } = selectQuizQuestions({
      pool,
      count,
      recentlyShownIds: progress.recentlyShownQuestionIds || [],
      shuffleOptions: true,
    });

    // Update user history so these questions are not repeated until bank is exhausted
    const updated = {
      ...progress,
      recentlyShownQuestionIds: updatedHistoryIds,
    };
    setProgress(updated);
    saveProgress(updated);

    setActiveQuizQuestions(selected);
    setActiveQuizClass(targetClass);
    setActiveQuizCategory('🎲 Mixed GK');
    setActiveTab('quiz');
  };

  // Launch a Category-specific Quiz
  const handleStartCategoryQuiz = (category: Category | 'Random') => {
    setActiveQuizChapterId(null);
    const targetClass = selectedClass || 'Class 1';

    if (category === 'Random') {
      handleStartRandomQuiz(targetClass);
      return;
    }

    let matching = QUESTIONS.filter(
      (q) => q.category === category && q.classLevel === targetClass
    );

    if (matching.length < 5) {
      const extra = QUESTIONS.filter(
        (q) => q.category === category && q.classLevel !== targetClass
      );
      matching = [...matching, ...extra];
    }

    const count = progress.questionsPerQuiz || 10;
    const { questions: selected, updatedHistoryIds } = selectQuizQuestions({
      pool: matching,
      count,
      recentlyShownIds: progress.recentlyShownQuestionIds || [],
      shuffleOptions: true,
    });

    const updated = {
      ...progress,
      recentlyShownQuestionIds: updatedHistoryIds,
    };
    setProgress(updated);
    saveProgress(updated);

    setActiveQuizQuestions(selected);
    setActiveQuizClass(targetClass);
    setActiveQuizCategory(category);
    setActiveTab('quiz');
  };

  // Launch a Chapter-specific Quiz
  const handleStartChapterQuiz = (chapter: Chapter) => {
    const targetClass = chapter.classLevel;
    let matching = QUESTIONS.filter((q) => q.chapterId === chapter.id);

    if (matching.length < 5) {
      const fallback = QUESTIONS.filter(
        (q) => q.classLevel === targetClass && q.category === chapter.category
      );
      matching = [...matching, ...fallback];
    }

    const count = progress.questionsPerQuiz || 10;
    const { questions: selected, updatedHistoryIds } = selectQuizQuestions({
      pool: matching,
      count,
      recentlyShownIds: progress.recentlyShownQuestionIds || [],
      shuffleOptions: true,
    });

    const updated = {
      ...progress,
      recentlyShownQuestionIds: updatedHistoryIds,
    };
    setProgress(updated);
    saveProgress(updated);

    const chapterDisplayName =
      lang === 'hi'
        ? `📖 अध्याय ${chapter.chapterNumber}: ${chapter.titleHi}`
        : `📖 Ch ${chapter.chapterNumber}: ${chapter.title}`;

    setActiveQuizChapterId(chapter.id);
    setActiveQuizQuestions(selected);
    setActiveQuizClass(targetClass);
    setActiveQuizCategory(chapterDisplayName);
    setActiveTab('quiz');
  };

  // When a quiz finishes
  const handleFinishQuiz = (results: {
    totalQuestions: number;
    correctAnswers: number;
    score: number;
    starsEarned: number;
    maxStreak: number;
    answersRecord: { question: Question; selectedAnswer: string; isCorrect: boolean }[];
  }) => {
    const attempt = {
      id: `attempt-${Date.now()}`,
      date: new Date().toISOString(),
      classLevel: activeQuizClass,
      category: activeQuizCategory,
      totalQuestions: results.totalQuestions,
      correctAnswers: results.correctAnswers,
      score: results.score,
      starsEarned: results.starsEarned,
    };

    const { updatedProgress, newBadges } = recordQuizCompletion(
      attempt,
      results.maxStreak,
      activeQuizChapterId || undefined
    );

    handleUpdateProgress(updatedProgress);

    setLastQuizResult({
      score: results.score,
      totalQuestions: results.totalQuestions,
      correctAnswers: results.correctAnswers,
      starsEarned: results.starsEarned,
      newBadges,
      classLevel: activeQuizClass,
      categoryName: activeQuizCategory,
      answersRecord: results.answersRecord,
    });

    setActiveTab('result');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-yellow-50/40 to-orange-50/40 text-slate-800 flex flex-col font-['Nunito','Mukta',sans-serif]">
      {/* Top Navigation with Hindi toggle */}
      <Navbar
        progress={progress}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onToggleSound={handleToggleSound}
        onToggleLanguage={handleToggleLanguage}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 md:p-8">
        {activeTab === 'home' && (
          <HomeHero
            progress={progress}
            onStartRandomQuiz={() => handleStartRandomQuiz()}
            onSelectClass={(lvl) => {
              setSelectedClass(lvl);
              setActiveTab('classes');
            }}
            onGoToClasses={() => setActiveTab('classes')}
            onGoToLeaderboard={() => setActiveTab('leaderboard')}
            onGoToRewards={() => setActiveTab('rewards')}
            onGoToDaily={() => setActiveTab('daily')}
          />
        )}

        {activeTab === 'classes' && (
          <ClassSelector
            progress={progress}
            selectedClass={selectedClass}
            onSelectClass={(lvl) => setSelectedClass(lvl)}
            onSelectCategory={handleStartCategoryQuiz}
            onSelectChapter={handleStartChapterQuiz}
            onBackToClasses={() => setSelectedClass(null)}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizScreen
            questions={activeQuizQuestions}
            classLevel={activeQuizClass}
            categoryName={activeQuizCategory}
            soundEnabled={progress.soundEnabled}
            language={lang}
            onFinishQuiz={handleFinishQuiz}
            onExitQuiz={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'result' && lastQuizResult && (
          <ResultScreen
            score={lastQuizResult.score}
            totalQuestions={lastQuizResult.totalQuestions}
            correctAnswers={lastQuizResult.correctAnswers}
            starsEarned={lastQuizResult.starsEarned}
            newBadges={lastQuizResult.newBadges}
            classLevel={lastQuizResult.classLevel}
            categoryName={lastQuizResult.categoryName}
            soundEnabled={progress.soundEnabled}
            language={lang}
            answersRecord={lastQuizResult.answersRecord}
            onTryAgain={() => handleStartRandomQuiz(lastQuizResult.classLevel)}
            onNextQuiz={() => {
              setSelectedClass(lastQuizResult.classLevel);
              setActiveTab('classes');
            }}
            onGoHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'daily' && (
          <DailyChallenge
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            onGoHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'rewards' && (
          <RewardsView
            progress={progress}
            onGoHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardView
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
          />
        )}

        {activeTab === 'parents' && (
          <ParentDashboard
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
          />
        )}
      </main>

      {/* Kid Profile Modal */}
      <ProfileModal
        progress={progress}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onUpdate={handleUpdateProgress}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-amber-200 bg-white/80 py-6 text-center text-xs text-slate-500 space-y-1">
        <div className="font-['Fredoka','Mukta',sans-serif] font-bold text-amber-900 text-sm">
          🌟 {t.appName} • {t.tagline}
        </div>
        <p>
          {lang === 'hi'
            ? '100% निःशुल्क • बच्चों के लिए पूर्ण सुरक्षित • कोई खरीदारी नहीं • कोई व्यक्तिगत डेटा संग्रह नहीं'
            : '100% Free • Safe for Kids • No In-App Purchases • No Personal Data Collected'}
        </p>
      </footer>
    </div>
  );
}
