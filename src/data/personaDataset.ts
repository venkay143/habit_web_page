import { Persona, Habit } from '../types/habits';

export const PERSONAS: Persona[] = [
  {
    id: 'engineer',
    title: 'Software Engineer & Builder',
    role: 'Technical Problem Solver',
    archetype: 'Systematic Builder',
    description: 'Designed for engineers balancing cognitively demanding deep work, posture resilience, and screen hygiene.',
    quote: 'Simplicity is prerequisite for reliability.',
    quoteAuthor: 'Edsger W. Dijkstra',
    iconName: 'Terminal',
    color: {
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/30',
      accent: 'text-sky-600 dark:text-sky-400',
      text: 'text-sky-900 dark:text-sky-100',
    },
    habits: [
      {
        name: '90-Min Deep Work Block (Zero Distractions)',
        category: 'Deep Work & Focus',
        description: 'Tackle the hardest architecture or code challenge before opening Slack or email.',
        timeOfDay: 'morning',
        targetDaysPerWeek: 5,
        initialCompletedPastDays: 5,
      },
      {
        name: 'Ergonomic 20-20-20 Posture & Eye Reset',
        category: 'Health & Fitness',
        description: 'Stand up, decompress spine, and look 20 feet away to alleviate digital eye strain.',
        timeOfDay: 'afternoon',
        targetDaysPerWeek: 7,
        initialCompletedPastDays: 4,
      },
      {
        name: 'Peer Code Review & Technical Triage',
        category: 'Deep Work & Focus',
        description: 'Provide constructive feedback on team pull requests before noon.',
        timeOfDay: 'morning',
        targetDaysPerWeek: 5,
        initialCompletedPastDays: 3,
      },
      {
        name: 'Electrolyte & Water Hydration (2.5L Target)',
        category: 'Health & Fitness',
        description: 'Maintain cellular hydration to prevent cognitive fog during prolonged problem-solving.',
        timeOfDay: 'anytime',
        targetDaysPerWeek: 7,
        initialCompletedPastDays: 6,
      },
      {
        name: 'Daily Git / Engineering Log Entry',
        category: 'Learning & Growth',
        description: 'Document 3 technical decisions made and 1 lesson learned today.',
        timeOfDay: 'evening',
        targetDaysPerWeek: 5,
        initialCompletedPastDays: 4,
      },
      {
        name: 'Screen Shutdown Protocol (9:30 PM)',
        category: 'Mind & Stillness',
        description: 'Step away from backlit displays to protect circadian melatonin production.',
        timeOfDay: 'evening',
        targetDaysPerWeek: 7,
        initialCompletedPastDays: 2,
      },
    ],
  },
  {
    id: 'student',
    title: 'University Scholar & Researcher',
    role: 'Academic & Knowledge Worker',
    archetype: 'Curious Scholar',
    description: 'Engineered for students and researchers optimizing retention, neuroplasticity, and focused study sprints.',
    quote: 'Knowledge isn’t power until it is applied and remembered.',
    quoteAuthor: 'Richard Feynman',
    iconName: 'GraduationCap',
    color: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/30',
      accent: 'text-indigo-600 dark:text-indigo-400',
      text: 'text-indigo-900 dark:text-indigo-100',
    },
    habits: [
      {
        name: 'Active Recall & Spaced Repetition (25m)',
        category: 'Learning & Growth',
        description: 'Test conceptual flashcards without passive re-reading.',
        timeOfDay: 'morning',
        targetDaysPerWeek: 6,
        initialCompletedPastDays: 5,
      },
      {
        name: 'Primary Literature / Textbook Synthesis (45m)',
        category: 'Deep Work & Focus',
        description: 'Engage with dense academic texts taking analytical marginalia notes.',
        timeOfDay: 'morning',
        targetDaysPerWeek: 5,
        initialCompletedPastDays: 4,
      },
      {
        name: 'Feynman Technique: Explain 1 Concept in Plain Words',
        category: 'Learning & Growth',
        description: 'Teach today’s core lesson out loud as if explaining to a 12-year-old.',
        timeOfDay: 'afternoon',
        targetDaysPerWeek: 5,
        initialCompletedPastDays: 3,
      },
      {
        name: '30-Minute Daylight Walk Without Earphones',
        category: 'Mind & Stillness',
        description: 'Diffuse mode thinking outdoors to let newly learned neural connections settle.',
        timeOfDay: 'afternoon',
        targetDaysPerWeek: 7,
        initialCompletedPastDays: 6,
      },
      {
        name: 'Strict 8-Hour Sleep Recovery Window',
        category: 'Health & Fitness',
        description: 'Sleep is when the brain flushes metabolic waste and locks in memory consolidation.',
        timeOfDay: 'evening',
        targetDaysPerWeek: 7,
        initialCompletedPastDays: 7,
      },
    ],
  },
  {
    id: 'athlete',
    title: 'High-Performance Athlete',
    role: 'Physical Discipline & Conditioning',
    archetype: 'Kinetic Master',
    description: 'Calibrated for physical endurance, joint longevity, targeted fueling, and restorative recovery.',
    quote: 'Discipline is doing what needs to be done, even when you do not want to.',
    quoteAuthor: 'Jesse Owens',
    iconName: 'Activity',
    color: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      accent: 'text-emerald-600 dark:text-emerald-400',
      text: 'text-emerald-900 dark:text-emerald-100',
    },
    habits: [
      {
        name: 'Dawn Joint Mobility & Dynamic Flow (15m)',
        category: 'Health & Fitness',
        description: 'Ankle dorsiflexion, thoracic openers, and hip capsule glides before breakfast.',
        timeOfDay: 'morning',
        targetDaysPerWeek: 7,
        initialCompletedPastDays: 7,
      },
      {
        name: 'Target Protein & Clean Fuel (140g+ Target)',
        category: 'Health & Fitness',
        description: 'Hit baseline lean protein distribution across whole-food meals.',
        timeOfDay: 'anytime',
        targetDaysPerWeek: 7,
        initialCompletedPastDays: 5,
      },
      {
        name: 'Structured Training: Zone 2 Cardio or Strength',
        category: 'Health & Fitness',
        description: 'Cardiovascular base building or controlled progressive overload session.',
        timeOfDay: 'morning',
        targetDaysPerWeek: 5,
        initialCompletedPastDays: 4,
      },
      {
        name: 'Contrast Recovery / Foam Rolling Routine',
        category: 'Health & Fitness',
        description: 'Down-regulate sympathetic tension with myofascial release and cool rinse.',
        timeOfDay: 'evening',
        targetDaysPerWeek: 6,
        initialCompletedPastDays: 3,
      },
      {
        name: 'Nightly Sleep Tracking & HRV Audit',
        category: 'Health & Fitness',
        description: 'Monitor resting heart rate trends and ensure 19°C cool bedroom environment.',
        timeOfDay: 'evening',
        targetDaysPerWeek: 7,
        initialCompletedPastDays: 6,
      },
    ],
  },
  {
    id: 'minimalist',
    title: 'Mindful Minimalist & Zen Seeker',
    role: 'Inner Calm & Intentional Living',
    archetype: 'Conscious Observer',
    description: 'Curated for intentional presence, sensory decluttering, emotional clarity, and digital balance.',
    quote: 'The ability to simplify means to eliminate the unnecessary so that the necessary may speak.',
    quoteAuthor: 'Hans Hofmann',
    iconName: 'Compass',
    color: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      accent: 'text-amber-600 dark:text-amber-400',
      text: 'text-amber-900 dark:text-amber-100',
    },
    habits: [
      {
        name: '15-Min Dawn Breathwork & Silence',
        category: 'Mind & Stillness',
        description: 'Box breathing and grounding observation before daily inputs start rushing in.',
        timeOfDay: 'morning',
        targetDaysPerWeek: 7,
        initialCompletedPastDays: 7,
      },
      {
        name: 'Three Gratitudes Hand-Written Journal',
        category: 'Mind & Stillness',
        description: 'Record three specific, non-obvious moments of appreciation in physical notebook.',
        timeOfDay: 'morning',
        targetDaysPerWeek: 7,
        initialCompletedPastDays: 6,
      },
      {
        name: 'No Smartphone for the First 45 Minutes',
        category: 'Mind & Stillness',
        description: 'Keep your mind sovereign from notifications during the waking transition.',
        timeOfDay: 'morning',
        targetDaysPerWeek: 7,
        initialCompletedPastDays: 5,
      },
      {
        name: 'Mindful Tea / Coffee Ritual (Zero Multitasking)',
        category: 'Daily Craft & Rituals',
        description: 'Drink your morning beverage with singular sensory focus on taste, warmth, and aroma.',
        timeOfDay: 'morning',
        targetDaysPerWeek: 7,
        initialCompletedPastDays: 6,
      },
      {
        name: 'Evening Environment & Surface Reset (10m)',
        category: 'Daily Craft & Rituals',
        description: 'Clear desk and kitchen surfaces to wake up to a clutter-free visual canvas.',
        timeOfDay: 'evening',
        targetDaysPerWeek: 7,
        initialCompletedPastDays: 4,
      },
    ],
  },
  {
    id: 'executive',
    title: 'Strategic Executive & Founder',
    role: 'High-Leverage Decision Maker',
    archetype: 'Strategic Director',
    description: 'Built for founders and executives who need high-leverage prioritization, asynchronous communication, and team alignment.',
    quote: 'You do not rise to the level of your goals. You fall to the level of your systems.',
    quoteAuthor: 'James Clear',
    iconName: 'Target',
    color: {
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      accent: 'text-rose-600 dark:text-rose-400',
      text: 'text-rose-900 dark:text-rose-100',
    },
    habits: [
      {
        name: 'The Daily Rule of 3 (Core Business Outcomes)',
        category: 'Deep Work & Focus',
        description: 'Define the 3 indispensable victories that move the company needle today.',
        timeOfDay: 'morning',
        targetDaysPerWeek: 5,
        initialCompletedPastDays: 5,
      },
      {
        name: 'Batch Asynchronous Communications (30m Sprint)',
        category: 'Deep Work & Focus',
        description: 'Process all pending approvals and messages in a single focused window.',
        timeOfDay: 'morning',
        targetDaysPerWeek: 5,
        initialCompletedPastDays: 4,
      },
      {
        name: '15-Minute Walking Check-in or Standup',
        category: 'Health & Fitness',
        description: 'Take 1 key alignment call on foot to maintain metabolic vitality.',
        timeOfDay: 'afternoon',
        targetDaysPerWeek: 5,
        initialCompletedPastDays: 3,
      },
      {
        name: 'Personal Recognition Note to Teammate',
        category: 'Daily Craft & Rituals',
        description: 'Send one unprompted, genuine note of acknowledgment to a team member.',
        timeOfDay: 'afternoon',
        targetDaysPerWeek: 5,
        initialCompletedPastDays: 4,
      },
      {
        name: 'Evening Executive Day Shutdown & Docket Review',
        category: 'Deep Work & Focus',
        description: 'Review tomorrow’s calendar traps, resolve bottlenecks, and close the laptop.',
        timeOfDay: 'evening',
        targetDaysPerWeek: 5,
        initialCompletedPastDays: 5,
      },
    ],
  },
  {
    id: 'creative',
    title: 'Creative Writer & Visual Artist',
    role: 'Original Synthesis & Expression',
    archetype: 'Intuitive Creator',
    description: 'Tailored for writers, artists, and designers guarding creative flow, feeding inspiration, and shipping art.',
    quote: 'Inspiration exists, but it has to find you working.',
    quoteAuthor: 'Pablo Picasso',
    iconName: 'Feather',
    color: {
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/30',
      accent: 'text-violet-600 dark:text-violet-400',
      text: 'text-violet-900 dark:text-violet-100',
    },
    habits: [
      {
        name: 'Morning Pages (750 Words Unfiltered Stream)',
        category: 'Mind & Stillness',
        description: 'Clear the mental pipes through continuous handwriting before editing kicks in.',
        timeOfDay: 'morning',
        targetDaysPerWeek: 7,
        initialCompletedPastDays: 6,
      },
      {
        name: 'Curate 1 Striking Reference or Texture',
        category: 'Learning & Growth',
        description: 'Archive a high-quality typographic specimen, painting, or musical motif.',
        timeOfDay: 'morning',
        targetDaysPerWeek: 6,
        initialCompletedPastDays: 4,
      },
      {
        name: 'Dedicated Studio Flow (60m Uninterrupted)',
        category: 'Deep Work & Focus',
        description: 'Pure creative output on your primary canvas or manuscript.',
        timeOfDay: 'afternoon',
        targetDaysPerWeek: 6,
        initialCompletedPastDays: 5,
      },
      {
        name: 'Read 25 Pages of Timeless Non-Fiction/Poetry',
        category: 'Learning & Growth',
        description: 'Nourish the artistic subconscious with high-grade written craft.',
        timeOfDay: 'evening',
        targetDaysPerWeek: 7,
        initialCompletedPastDays: 5,
      },
      {
        name: 'Studio Space Reset & Palette Preparation',
        category: 'Daily Craft & Rituals',
        description: 'Clean tools and set out tomorrow’s notebook so starting has zero friction.',
        timeOfDay: 'evening',
        targetDaysPerWeek: 7,
        initialCompletedPastDays: 3,
      },
    ],
  },
];

/**
 * Helper to generate past dates for realistic streaks
 */
export function getPastDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

/**
 * Builds the initial baseline habits dataset for the app
 * Seeds an initial balanced collection with realistic past streaks
 */
export function generateInitialHabits(): Habit[] {
  let idCounter = 1000;
  const initialHabits: Habit[] = [];

  // Seed 2 key habits from Engineer, 2 from Athlete, 1 from Minimalist, 1 from Executive
  const selectedPersonaHabits: { personaId: Persona['id']; habitIndex: number }[] = [
    { personaId: 'engineer', habitIndex: 0 }, // 90-Min Deep Work
    { personaId: 'engineer', habitIndex: 3 }, // Electrolyte & Water Hydration
    { personaId: 'athlete', habitIndex: 0 },  // Dawn Joint Mobility
    { personaId: 'minimalist', habitIndex: 1 }, // Gratitude Journal
    { personaId: 'executive', habitIndex: 0 }, // Daily Rule of 3
    { personaId: 'creative', habitIndex: 0 },  // Morning Pages
  ];

  selectedPersonaHabits.forEach(({ personaId, habitIndex }) => {
    const persona = PERSONAS.find(p => p.id === personaId)!;
    const h = persona.habits[habitIndex];
    idCounter++;

    // Generate realistic completed dates for streaks
    const completedDaysCount = h.initialCompletedPastDays || 3;
    const completedDates: string[] = [];

    // Make some completed today and in past days
    for (let i = 1; i <= completedDaysCount; i++) {
      completedDates.push(getPastDate(i));
    }
    // Also mark first 2 habits completed today for an active ring display
    if (initialHabits.length < 2) {
      completedDates.unshift(getPastDate(0));
    }

    initialHabits.push({
      id: idCounter,
      name: h.name,
      category: h.category,
      personaId: persona.id,
      personaLabel: persona.title,
      description: h.description,
      timeOfDay: h.timeOfDay,
      streak: initialHabits.length < 2 ? completedDaysCount + 1 : completedDaysCount,
      bestStreak: completedDaysCount + 4,
      completedDates,
      targetDaysPerWeek: h.targetDaysPerWeek,
      createdAt: getPastDate(21),
    });
  });

  return initialHabits;
}
