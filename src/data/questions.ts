import { Question } from '../types';
import { QUESTIONS_LKG } from './questionsLKG';
import { QUESTIONS_UKG } from './questionsUKG';
import { QUESTIONS_CLASS1 } from './questionsClass1';
import { QUESTIONS_CLASS2 } from './questionsClass2';
import { QUESTIONS_CLASS3 } from './questionsClass3';
import { QUESTIONS_CLASS4 } from './questionsClass4';
import { QUESTIONS_CLASS5 } from './questionsClass5';
import { ADDITIONAL_QUESTIONS_LKG } from './moreQuestionsLKG';
import { ADDITIONAL_QUESTIONS_UKG } from './moreQuestionsUKG';
import { ADDITIONAL_QUESTIONS_CLASS1 } from './moreQuestionsClass1';
import { ADDITIONAL_QUESTIONS_CLASS2 } from './moreQuestionsClass2';
import { ADDITIONAL_QUESTIONS_CLASS3 } from './moreQuestionsClass3';
import { ADDITIONAL_QUESTIONS_CLASS4 } from './moreQuestionsClass4';
import { ADDITIONAL_QUESTIONS_CLASS5 } from './moreQuestionsClass5';

export const QUESTIONS: Question[] = [
  ...QUESTIONS_LKG,
  ...ADDITIONAL_QUESTIONS_LKG,
  ...QUESTIONS_UKG,
  ...ADDITIONAL_QUESTIONS_UKG,
  ...QUESTIONS_CLASS1,
  ...ADDITIONAL_QUESTIONS_CLASS1,
  ...QUESTIONS_CLASS2,
  ...ADDITIONAL_QUESTIONS_CLASS2,
  ...QUESTIONS_CLASS3,
  ...ADDITIONAL_QUESTIONS_CLASS3,
  ...QUESTIONS_CLASS4,
  ...ADDITIONAL_QUESTIONS_CLASS4,
  ...QUESTIONS_CLASS5,
  ...ADDITIONAL_QUESTIONS_CLASS5,
];

export const CLASS_LEVELS = [
  { level: 'LKG' as const, emoji: '🧸', title: 'LKG', desc: 'Ages 3-4 • Pictures & Sounds', bg: 'from-pink-400 to-rose-400', border: 'border-rose-300' },
  { level: 'UKG' as const, emoji: '🌈', title: 'UKG', desc: 'Ages 4-5 • Fun Animals & Colors', bg: 'from-amber-400 to-orange-400', border: 'border-amber-300' },
  { level: 'Class 1' as const, emoji: '🚀', title: 'Class 1', desc: 'Ages 5-6 • First Big Steps', bg: 'from-blue-400 to-cyan-400', border: 'border-cyan-300' },
  { level: 'Class 2' as const, emoji: '⭐', title: 'Class 2', desc: 'Ages 6-7 • Nature & India', bg: 'from-emerald-400 to-teal-400', border: 'border-emerald-300' },
  { level: 'Class 3' as const, emoji: '🦁', title: 'Class 3', desc: 'Ages 7-8 • Space & World', bg: 'from-violet-400 to-purple-400', border: 'border-violet-300' },
  { level: 'Class 4' as const, emoji: '🧠', title: 'Class 4', desc: 'Ages 8-9 • Science & Tech', bg: 'from-indigo-400 to-blue-500', border: 'border-indigo-300' },
  { level: 'Class 5' as const, emoji: '🏆', title: 'Class 5', desc: 'Ages 9-10 • Master GK Quizzer', bg: 'from-fuchsia-400 to-pink-500', border: 'border-fuchsia-300' },
];

export const CATEGORIES_CONFIG = [
  { name: 'Animals' as const, emoji: '🐶', color: 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200' },
  { name: 'Fruits & Vegetables' as const, emoji: '🍎', color: 'bg-rose-100 text-rose-800 border-rose-300 hover:bg-rose-200' },
  { name: 'World' as const, emoji: '🌎', color: 'bg-sky-100 text-sky-800 border-sky-300 hover:bg-sky-200' },
  { name: 'India' as const, emoji: '🇮🇳', color: 'bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200' },
  { name: 'Space' as const, emoji: '🚀', color: 'bg-indigo-100 text-indigo-800 border-indigo-300 hover:bg-indigo-200' },
  { name: 'Science' as const, emoji: '🔬', color: 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200' },
  { name: 'Sports' as const, emoji: '🏏', color: 'bg-lime-100 text-lime-800 border-lime-300 hover:bg-lime-200' },
  { name: 'Computers' as const, emoji: '💻', color: 'bg-cyan-100 text-cyan-800 border-cyan-300 hover:bg-cyan-200' },
  { name: 'Environment' as const, emoji: '🌱', color: 'bg-teal-100 text-teal-800 border-teal-300 hover:bg-teal-200' },
  { name: 'Mixed GK' as const, emoji: '🧠', color: 'bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200' },
];
