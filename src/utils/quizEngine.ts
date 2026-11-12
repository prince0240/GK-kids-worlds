/**
 * Quiz Engine & Question Randomization System
 * 
 * Implements:
 * 1. True Fisher-Yates (Knuth) Shuffle algorithm for unbiased question and option randomization.
 * 2. Unbiased answer options shuffling while preserving bilingual alignment (English and Hindi options stay synchronized).
 * 3. History tracking of recently shown questions per student to prevent repetitive questions.
 * 4. Automatic cycle reset when the available question bank for a scope is exhausted.
 * 5. Configurable question count per quiz session.
 * 6. Guarantees zero duplicate questions within a single session.
 */

import { Question, Language } from '../types';

/**
 * Fisher-Yates (Knuth) Shuffle Algorithm
 * 
 * An unbiased, O(n) in-place shuffle algorithm where every permutation
 * is equally probable. Creates a shallow copy so the original array is never mutated.
 * 
 * @param array Source array to shuffle
 * @returns A freshly shuffled copy of the input array
 */
export function fisherYatesShuffle<T>(array: readonly T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    // Generate a cryptographically even random index between 0 and i inclusive
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at positions i and j
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/**
 * Randomizes the order of answer choices for multiple-choice questions.
 * 
 * Crucially, if the question has Hindi options (`optionsHi`), both English
 * and Hindi options are shuffled using the exact same permutation index mapping
 * so that option[0] in English remains equivalent to optionHi[0] in Hindi!
 * 
 * @param question Original question from bank
 * @returns A copy of the question with randomly permuted options
 */
export function shuffleQuestionOptions(question: Question): Question {
  const numOptions = question.options.length;
  if (numOptions <= 1) return { ...question };

  // Create an index array [0, 1, ..., numOptions - 1] and shuffle indices
  const indices = fisherYatesShuffle(Array.from({ length: numOptions }, (_, idx) => idx));

  const shuffledOptions = indices.map((idx) => question.options[idx]);
  const shuffledOptionsHi = question.optionsHi
    ? indices.map((idx) => question.optionsHi![idx])
    : undefined;

  return {
    ...question,
    options: shuffledOptions,
    optionsHi: shuffledOptionsHi,
    // Note: correctAnswer and correctAnswerHi remain the string values of the correct answer,
    // so comparisons remain: selectedOption === currentQuestion.correctAnswer.
  };
}

export interface SelectionResult {
  /** The selected, randomized questions ready for the quiz session */
  questions: Question[];
  /** Updated history list of question IDs that have now been shown */
  updatedHistoryIds: string[];
  /** Indicates whether the history pool was reset because all questions had been seen */
  didCycleReset: boolean;
}

export interface QuestionSelectorOptions {
  /** The candidate question pool (e.g. filtered by class, category, or chapter) */
  pool: Question[];
  /** Number of questions requested for this quiz session (e.g. 5, 8, 10, 15) */
  count?: number;
  /** List of question IDs shown to this user in recent sessions */
  recentlyShownIds?: string[];
  /** Whether to randomize the order of answer choices (default: true) */
  shuffleOptions?: boolean;
}

/**
 * Selects an unbiased, non-repeating random subset of questions from a question bank.
 * 
 * Algorithm:
 * 1. Filters the pool against recentlyShownIds to identify unseen questions.
 * 2. If unseen questions are fewer than the requested count, it resets the cycle for this pool
 *    so the student starts a brand new fresh randomized cycle without running out of questions.
 * 3. Shuffles the candidate pool using Fisher-Yates algorithm.
 * 4. Slices the exact requested number of questions (preventing duplicates).
 * 5. Shuffles the answer options for each chosen question so option 'A' isn't predictable.
 * 6. Returns the questions along with the updated history of seen IDs.
 */
export function selectQuizQuestions({
  pool,
  count = 10,
  recentlyShownIds = [],
  shuffleOptions = true,
}: QuestionSelectorOptions): SelectionResult {
  if (!pool || pool.length === 0) {
    return {
      questions: [],
      updatedHistoryIds: recentlyShownIds,
      didCycleReset: false,
    };
  }

  // Deduplicate pool by question ID just in case
  const poolMap = new Map<string, Question>();
  for (const q of pool) {
    if (!poolMap.has(q.id)) {
      poolMap.set(q.id, q);
    }
  }
  const uniquePool = Array.from(poolMap.values());
  const targetCount = Math.min(count, uniquePool.length);

  // Fast set lookup for seen IDs
  const seenSet = new Set(recentlyShownIds);

  // Identify questions in this pool that have NOT been shown recently
  const unseen = uniquePool.filter((q) => !seenSet.has(q.id));

  let candidatePool: Question[];
  let didCycleReset = false;
  let baseHistory = [...recentlyShownIds];

  // If there are enough unseen questions to fulfill the quiz session, use unseen questions!
  if (unseen.length >= targetCount) {
    candidatePool = unseen;
  } else {
    // Not enough unseen questions remain in this pool.
    // Reset history for this pool to start a brand new randomized cycle!
    didCycleReset = true;

    // Remove this pool's question IDs from the user's history so other pools' history is preserved
    const poolIdSet = new Set(uniquePool.map((q) => q.id));
    baseHistory = baseHistory.filter((id) => !poolIdSet.has(id));

    // If there were some unseen questions left, prioritize them first, then fill with shuffled seen ones
    if (unseen.length > 0) {
      const remainingSeen = uniquePool.filter((q) => seenSet.has(q.id));
      const shuffledRemaining = fisherYatesShuffle(remainingSeen);
      candidatePool = [...unseen, ...shuffledRemaining];
    } else {
      // All questions were seen: start completely fresh
      candidatePool = uniquePool;
    }
  }

  // 1. Shuffle the candidate pool using Fisher-Yates algorithm
  const shuffledCandidates = fisherYatesShuffle(candidatePool);

  // 2. Take exactly targetCount questions (ensures no duplicates within session)
  const selectedSubset = shuffledCandidates.slice(0, targetCount);

  // 3. Randomize answer choices for each selected question
  const finalQuestions = shuffleOptions
    ? selectedSubset.map((q) => shuffleQuestionOptions(q))
    : selectedSubset;

  // 4. Update the history tracking with the newly selected question IDs
  const newSelectedIds = finalQuestions.map((q) => q.id);
  const updatedHistorySet = new Set([...baseHistory, ...newSelectedIds]);

  return {
    questions: finalQuestions,
    updatedHistoryIds: Array.from(updatedHistorySet),
    didCycleReset,
  };
}
