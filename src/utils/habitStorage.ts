import { Habit } from '../types/habits';
import { generateInitialHabits } from '../data/personaDataset';

const STORAGE_KEY = 'habitcraft_habits_v2';
const PERSONA_FAV_KEY = 'habitcraft_selected_persona';

/**
 * Returns today's ISO date string "YYYY-MM-DD"
 */
export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Format date for pleasant display (e.g. "Tuesday, November 3, 2026")
 */
export function formatHeaderDate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Returns array of the 7 days of the current week (Mon -> Sun) or the past 7 days
 */
export interface WeekDay {
  dateKey: string; // YYYY-MM-DD
  dayLetter: string; // 'M', 'T', 'W', etc.
  dayNumber: number; // 1-31
  isToday: boolean;
  isPast: boolean;
  isFuture: boolean;
}

export function getWeekDays(): WeekDay[] {
  const today = new Date();
  const todayStr = todayKey();
  const days: WeekDay[] = [];

  // Let's compute a 7-day window ending today, or Monday-to-Sunday of current week
  // A 7-day window ending today (6 days ago -> today) is intuitive for immediate habit reflection
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateKey = d.toISOString().slice(0, 10);
    const dayLetter = d.toLocaleDateString('en-US', { weekday: 'narrow' });
    const dayNumber = d.getDate();

    days.push({
      dateKey,
      dayLetter,
      dayNumber,
      isToday: dateKey === todayStr,
      isPast: dateKey < todayStr,
      isFuture: dateKey > todayStr,
    });
  }

  return days;
}

/**
 * Recalculate streak ending today or yesterday
 */
export function recalcStreak(dates: string[]): { streak: number; bestStreak: number } {
  if (!dates || dates.length === 0) return { streak: 0, bestStreak: 0 };
  const dateSet = new Set(dates);
  const today = todayKey();

  // Streak can either include today, or if not yet completed today, continue from yesterday
  let streak = 0;
  const d = new Date();

  // Check if today is completed
  const hasToday = dateSet.has(today);
  if (!hasToday) {
    // Check if yesterday was completed
    d.setDate(d.getDate() - 1);
  }

  while (true) {
    const key = d.toISOString().slice(0, 10);
    if (dateSet.has(key)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }

  // Calculate best all-time streak in the dates array
  const sorted = Array.from(dateSet).sort();
  let maxStreak = 0;
  let currentRun = 0;
  let prevDate: Date | null = null;

  for (const dateStr of sorted) {
    const curDate = new Date(dateStr + 'T00:00:00');
    if (!prevDate) {
      currentRun = 1;
    } else {
      const diffDays = Math.round((curDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        currentRun++;
      } else if (diffDays > 1) {
        currentRun = 1;
      }
    }
    if (currentRun > maxStreak) {
      maxStreak = currentRun;
    }
    prevDate = curDate;
  }

  return {
    streak,
    bestStreak: Math.max(streak, maxStreak),
  };
}

/**
 * Load habits from localStorage or generate defaults
 */
export function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read habits from storage, initializing defaults', err);
  }

  const initial = generateInitialHabits();
  saveHabits(initial);
  return initial;
}

/**
 * Save habits to localStorage
 */
export function saveHabits(habits: Habit[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  } catch (err) {
    console.error('Failed to save habits to localStorage', err);
  }
}

/**
 * Toggle a completion date for a habit and return the updated habit
 */
export function toggleHabitDate(habit: Habit, dateKey: string): Habit {
  const isDone = habit.completedDates.includes(dateKey);
  const updatedDates = isDone
    ? habit.completedDates.filter(d => d !== dateKey)
    : [...habit.completedDates, dateKey];

  const { streak, bestStreak } = recalcStreak(updatedDates);

  return {
    ...habit,
    completedDates: updatedDates,
    streak,
    bestStreak: Math.max(habit.bestStreak, bestStreak),
  };
}

/**
 * Aggregate summary statistics
 */
export interface HabitStats {
  total: number;
  completedToday: number;
  percentageToday: number;
  bestStreak: number;
  weeklyCompletions: number;
  weeklyTargetCompletions: number;
  weeklyConsistencyRate: number;
}

export function computeHabitStats(habits: Habit[]): HabitStats {
  const today = todayKey();
  const weekDays = getWeekDays();
  const weekDateKeys = new Set(weekDays.map(w => w.dateKey));

  const total = habits.length;
  const completedToday = habits.filter(h => h.completedDates.includes(today)).length;
  const percentageToday = total > 0 ? Math.round((completedToday / total) * 100) : 0;
  const bestStreak = habits.length > 0 ? Math.max(...habits.map(h => h.bestStreak || h.streak || 0)) : 0;

  // Weekly stats
  let weeklyCompletions = 0;
  habits.forEach(h => {
    h.completedDates.forEach(d => {
      if (weekDateKeys.has(d)) weeklyCompletions++;
    });
  });

  const weeklyTargetCompletions = habits.reduce((acc, h) => acc + (h.targetDaysPerWeek || 7), 0);
  const weeklyConsistencyRate = weeklyTargetCompletions > 0 
    ? Math.min(100, Math.round((weeklyCompletions / weeklyTargetCompletions) * 100))
    : 0;

  return {
    total,
    completedToday,
    percentageToday,
    bestStreak,
    weeklyCompletions,
    weeklyTargetCompletions,
    weeklyConsistencyRate,
  };
}
