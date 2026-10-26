export type ClassLevel = 'LKG' | 'UKG' | 'Class 1' | 'Class 2' | 'Class 3' | 'Class 4' | 'Class 5';

export type Category = 
  | 'Animals'
  | 'Fruits & Vegetables'
  | 'World'
  | 'India'
  | 'Space'
  | 'Science'
  | 'Sports'
  | 'Computers'
  | 'Environment'
  | 'Mixed GK';

export type Language = 'en' | 'hi';

export interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  classLevel: ClassLevel;
  icon: string;
  category: Category;
  color: string;
}

export interface Question {
  id: string;
  question: string;
  questionHi?: string;
  options: string[];
  optionsHi?: string[];
  correctAnswer: string;
  correctAnswerHi?: string;
  explanation: string;
  explanationHi?: string;
  classLevel: ClassLevel;
  category: Category;
  difficulty: 'easy' | 'medium' | 'hard';
  emoji?: string;
  chapterId?: string;
}

export interface Badge {
  id: string;
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
  icon: string;
  category: 'quiz' | 'streak' | 'subject' | 'special';
  unlockedAt?: string;
}

export interface QuizAttempt {
  id: string;
  date: string;
  classLevel: ClassLevel;
  category: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  starsEarned: number;
}

export interface CategoryStat {
  attempted: number;
  correct: number;
}

export interface UserProgress {
  nickname: string;
  avatar: string;
  stars: number;
  points: number;
  streak: number;
  highestStreak: number;
  quizzesCompleted: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  unlockedBadgeIds: string[];
  categoryStats: Record<string, CategoryStat>;
  dailyChallengeCompletedDate: string | null;
  dailyStreak: number;
  soundEnabled: boolean;
  voiceReadEnabled: boolean;
  hideFromLeaderboard: boolean;
  language: Language;
  completedChapterIds?: string[];
}

export interface LeaderboardEntry {
  id: string;
  nickname: string;
  avatar: string;
  stars: number;
  quizzes: number;
  isCurrentUser?: boolean;
}
