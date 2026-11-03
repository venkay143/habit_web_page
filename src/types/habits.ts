export type PersonaId = 
  | 'engineer' 
  | 'student' 
  | 'athlete' 
  | 'minimalist' 
  | 'executive' 
  | 'creative';

export type HabitCategory = 
  | 'Deep Work & Focus' 
  | 'Health & Fitness' 
  | 'Mind & Stillness' 
  | 'Learning & Growth' 
  | 'Daily Craft & Rituals';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'anytime';

export interface Habit {
  id: number;
  name: string;
  category: HabitCategory;
  personaId?: PersonaId | 'custom';
  personaLabel?: string;
  description?: string;
  timeOfDay: TimeOfDay;
  streak: number;
  bestStreak: number;
  completedDates: string[]; // YYYY-MM-DD
  targetDaysPerWeek: number;
  createdAt: string;
  notes?: Record<string, string>; // dateKey -> personal note
}

export interface Persona {
  id: PersonaId;
  title: string;
  role: string;
  description: string;
  archetype: string;
  quote: string;
  quoteAuthor: string;
  iconName: string;
  color: {
    bg: string;
    border: string;
    accent: string;
    text: string;
  };
  habits: {
    name: string;
    category: HabitCategory;
    description: string;
    timeOfDay: TimeOfDay;
    targetDaysPerWeek: number;
    initialCompletedPastDays?: number; // for realistic baseline preview
  }[];
}
