import { UserProgress, QuizAttempt, LeaderboardEntry } from '../types';
import { BADGES } from '../data/badges';

const STORAGE_KEY = 'gk_kids_world_user_progress_v1';
const ATTEMPTS_KEY = 'gk_kids_world_quiz_attempts_v1';

export const INITIAL_PROGRESS: UserProgress = {
  nickname: '⭐ Little Star',
  avatar: '🦉',
  stars: 12,
  points: 120,
  streak: 0,
  highestStreak: 3,
  quizzesCompleted: 1,
  totalQuestionsAnswered: 5,
  totalCorrectAnswers: 5,
  unlockedBadgeIds: ['first_quiz'],
  categoryStats: {
    'Animals': { attempted: 3, correct: 3 },
    'India': { attempted: 2, correct: 2 },
  },
  dailyChallengeCompletedDate: null,
  dailyStreak: 1,
  soundEnabled: true,
  voiceReadEnabled: true,
  hideFromLeaderboard: false,
  language: 'en',
  completedChapterIds: [],
};

export const getSavedProgress = (): UserProgress => {
  if (typeof window === 'undefined') return INITIAL_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveProgress(INITIAL_PROGRESS);
      return INITIAL_PROGRESS;
    }
    return { ...INITIAL_PROGRESS, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Failed reading storage', e);
    return INITIAL_PROGRESS;
  }
};

export const saveProgress = (progress: UserProgress): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed saving progress', e);
  }
};

export const getQuizAttempts = (): QuizAttempt[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ATTEMPTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const saveQuizAttempt = (attempt: QuizAttempt): void => {
  if (typeof window === 'undefined') return;
  try {
    const attempts = getQuizAttempts();
    attempts.unshift(attempt);
    // keep latest 30
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts.slice(0, 30)));
  } catch (e) {
    console.error('Failed saving attempt', e);
  }
};

export interface UpdateScoreResult {
  updatedProgress: UserProgress;
  newBadges: string[];
}

export const recordQuizCompletion = (
  attempt: QuizAttempt,
  maxStreakInQuiz: number,
  chapterId?: string
): UpdateScoreResult => {
  const current = getSavedProgress();
  const newBadges: string[] = [];

  const updatedQuizzesCompleted = current.quizzesCompleted + 1;
  const updatedTotalQuestions = current.totalQuestionsAnswered + attempt.totalQuestions;
  const updatedTotalCorrect = current.totalCorrectAnswers + attempt.correctAnswers;
  const updatedStars = current.stars + attempt.starsEarned;
  const updatedPoints = current.points + attempt.score;
  const updatedHighestStreak = Math.max(current.highestStreak, maxStreakInQuiz);

  const completedChapterIds = new Set(current.completedChapterIds || []);
  if (chapterId && attempt.correctAnswers >= Math.ceil(attempt.totalQuestions * 0.5)) {
    completedChapterIds.add(chapterId);
  }

  const updatedCategoryStats = { ...current.categoryStats };
  const prevCat = updatedCategoryStats[attempt.category] || { attempted: 0, correct: 0 };
  updatedCategoryStats[attempt.category] = {
    attempted: prevCat.attempted + attempt.totalQuestions,
    correct: prevCat.correct + attempt.correctAnswers,
  };

  const unlockedIds = new Set(current.unlockedBadgeIds);

  const unlockBadge = (id: string) => {
    if (!unlockedIds.has(id)) {
      unlockedIds.add(id);
      newBadges.push(id);
    }
  };

  // Badge logic
  unlockBadge('first_quiz');

  if (maxStreakInQuiz >= 5 || updatedHighestStreak >= 5) {
    unlockBadge('streak_5');
  }

  if (attempt.correctAnswers === attempt.totalQuestions && attempt.totalQuestions >= 5) {
    unlockBadge('perfect_10');
  }

  if (updatedQuizzesCompleted >= 10) {
    unlockBadge('gk_champion');
  }

  if (updatedStars >= 100) {
    unlockBadge('super_brain');
  }

  if (attempt.category === 'Animals' && attempt.correctAnswers >= 4) {
    unlockBadge('animal_expert');
  }

  if (attempt.category === 'Space' && attempt.correctAnswers >= 4) {
    unlockBadge('space_explorer');
  }

  if (attempt.category === 'India' && attempt.correctAnswers >= 4) {
    unlockBadge('india_expert');
  }

  if (attempt.category === 'Science' && attempt.correctAnswers >= 4) {
    unlockBadge('science_whiz');
  }

  if (attempt.category === 'Sports' && attempt.correctAnswers >= 4) {
    unlockBadge('sports_star');
  }

  if (attempt.category === 'Computers' && attempt.correctAnswers >= 4) {
    unlockBadge('tech_kid');
  }

  const updatedProgress: UserProgress = {
    ...current,
    quizzesCompleted: updatedQuizzesCompleted,
    totalQuestionsAnswered: updatedTotalQuestions,
    totalCorrectAnswers: updatedTotalCorrect,
    stars: updatedStars,
    points: updatedPoints,
    highestStreak: updatedHighestStreak,
    categoryStats: updatedCategoryStats,
    unlockedBadgeIds: Array.from(unlockedIds),
    completedChapterIds: Array.from(completedChapterIds),
  };

  saveProgress(updatedProgress);
  saveQuizAttempt(attempt);

  return { updatedProgress, newBadges };
};

export const recordDailyChallengeCompleted = (starsWon: number, pointsWon: number): UpdateScoreResult => {
  const current = getSavedProgress();
  const todayStr = new Date().toISOString().split('T')[0];
  const newBadges: string[] = [];

  const unlockedIds = new Set(current.unlockedBadgeIds);
  if (!unlockedIds.has('daily_hero')) {
    unlockedIds.add('daily_hero');
    newBadges.push('daily_hero');
  }

  const updatedProgress: UserProgress = {
    ...current,
    stars: current.stars + starsWon,
    points: current.points + pointsWon,
    dailyChallengeCompletedDate: todayStr,
    dailyStreak: (current.dailyStreak || 0) + 1,
    unlockedBadgeIds: Array.from(unlockedIds),
  };

  saveProgress(updatedProgress);
  return { updatedProgress, newBadges };
};

export const resetAllProgress = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(ATTEMPTS_KEY);
};

// Fun child-safe leaderboard entries
const SAMPLE_LEADERBOARD_KIDS: Omit<LeaderboardEntry, 'isCurrentUser'>[] = [
  { id: 'kid-1', nickname: '🌟 Astro Champ', avatar: '🚀', stars: 240, quizzes: 28 },
  { id: 'kid-2', nickname: '🐯 Tiger Scout', avatar: '🐯', stars: 215, quizzes: 24 },
  { id: 'kid-3', nickname: '🐬 Ocean Sparkle', avatar: '🐬', stars: 190, quizzes: 21 },
  { id: 'kid-4', nickname: '🌈 Rainbow Ray', avatar: '🌈', stars: 165, quizzes: 18 },
  { id: 'kid-5', nickname: '🐼 Panda Buddy', avatar: '🐼', stars: 140, quizzes: 16 },
  { id: 'kid-6', nickname: '🦁 Brave Lion', avatar: '🦁', stars: 120, quizzes: 14 },
  { id: 'kid-7', nickname: '🦉 Smart Ollie', avatar: '🦉', stars: 95, quizzes: 11 },
  { id: 'kid-8', nickname: '🍎 Sunny Apple', avatar: '🍎', stars: 70, quizzes: 8 },
];

export const getLeaderboardData = (user: UserProgress): LeaderboardEntry[] => {
  const list: LeaderboardEntry[] = [...SAMPLE_LEADERBOARD_KIDS];

  if (!user.hideFromLeaderboard) {
    list.push({
      id: 'current-user',
      nickname: user.nickname || '⭐ You',
      avatar: user.avatar || '🦉',
      stars: user.stars,
      quizzes: user.quizzesCompleted,
      isCurrentUser: true,
    });
  }

  // Sort descending by stars
  list.sort((a, b) => b.stars - a.stars);
  return list;
};
