import React, { useState, useEffect, useMemo } from 'react';
import { Habit, Persona, PersonaId, TimeOfDay, HabitCategory } from './types/habits';
import { PERSONAS } from './data/personaDataset';
import { 
  loadHabits, 
  saveHabits, 
  todayKey, 
  formatHeaderDate, 
  getWeekDays, 
  toggleHabitDate, 
  computeHabitStats
} from './utils/habitStorage';
import { generateInitialHabits } from './data/personaDataset';
import { Header } from './components/Header';
import { StatsStrip } from './components/StatsStrip';
import { AddHabitBar } from './components/AddHabitBar';
import { HabitCard } from './components/HabitCard';
import { WeeklyMatrix } from './components/WeeklyMatrix';
import { PersonaShowcase } from './components/PersonaShowcase';
import { HabitAnalyticsModal } from './components/HabitAnalyticsModal';
import { EditHabitModal } from './components/EditHabitModal';
import { 
  Search, 
  Filter, 
  Sun, 
  Sunset, 
  Moon, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  Plus,
  RefreshCw,
  Trophy,
  BookOpen
} from 'lucide-react';

export default function App() {
  const [habits, setHabits] = useState<Habit[]>(() => loadHabits());
  const [currentTab, setCurrentTab] = useState<'tracker' | 'personas' | 'matrix' | 'analytics'>('tracker');
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('habitcraft_theme') === 'dark' || 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState<'all' | TimeOfDay>('all');
  const [personaFilter, setPersonaFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'completed'>('all');

  // Modals & temporary state
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const todayStr = useMemo(() => todayKey(), []);
  const currentDateFormatted = useMemo(() => formatHeaderDate(), []);
  const weekDays = useMemo(() => getWeekDays(), []);
  const stats = useMemo(() => computeHabitStats(habits), [habits]);

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('habitcraft_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('habitcraft_theme', 'light');
    }
  }, [isDark]);

  // Save habits on change
  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Habit Actions
  const handleToggleToday = (id: number) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const updated = toggleHabitDate(h, todayStr);
          const wasDone = h.completedDates.includes(todayStr);
          if (!wasDone) {
            showToast(`Completed: ${h.name} 🔥`);
          }
          return updated;
        }
        return h;
      })
    );
  };

  const handleToggleDate = (id: number, dateKey: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          return toggleHabitDate(h, dateKey);
        }
        return h;
      })
    );
  };

  const handleAddHabit = (data: {
    name: string;
    category: HabitCategory;
    timeOfDay: TimeOfDay;
    personaId?: PersonaId | 'custom';
    personaLabel?: string;
    description?: string;
  }) => {
    const newHabit: Habit = {
      id: Date.now(),
      name: data.name,
      category: data.category,
      timeOfDay: data.timeOfDay,
      personaId: data.personaId || 'custom',
      personaLabel: data.personaLabel || 'Personal Habit',
      description: data.description || '',
      streak: 0,
      bestStreak: 0,
      completedDates: [],
      targetDaysPerWeek: 7,
      createdAt: todayStr,
    };

    setHabits((prev) => [newHabit, ...prev]);
    showToast(`Added habit: ${data.name}`);
  };

  const handleDeleteHabit = (id: number) => {
    const target = habits.find((h) => h.id === id);
    if (!target) return;
    setHabits((prev) => prev.filter((h) => h.id !== id));
    showToast(`Removed "${target.name}"`);
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsEditModalOpen(true);
  };

  const handleSaveEditedHabit = (updated: Habit) => {
    setHabits((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));
    showToast(`Updated "${updated.name}"`);
  };

  const handleSaveNote = (id: number, dateKey: string, note: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const updatedNotes = { ...(h.notes || {}), [dateKey]: note };
          return { ...h, notes: updatedNotes };
        }
        return h;
      })
    );
    showToast(`Note saved for today.`);
  };

  // Persona Adoption
  const existingHabitNames = useMemo(() => new Set(habits.map((h) => h.name)), [habits]);

  const handleAdoptPersona = (persona: Persona) => {
    let addedCount = 0;
    const newItems: Habit[] = [];

    persona.habits.forEach((h, idx) => {
      if (!existingHabitNames.has(h.name)) {
        addedCount++;
        newItems.push({
          id: Date.now() + idx,
          name: h.name,
          category: h.category,
          personaId: persona.id,
          personaLabel: persona.title,
          description: h.description,
          timeOfDay: h.timeOfDay,
          streak: 0,
          bestStreak: 0,
          completedDates: [],
          targetDaysPerWeek: h.targetDaysPerWeek,
          createdAt: todayStr,
        });
      }
    });

    if (addedCount > 0) {
      setHabits((prev) => [...newItems, ...prev]);
      showToast(`Adopted ${addedCount} habits from ${persona.title}!`);
      setCurrentTab('tracker');
    } else {
      showToast(`All habits from ${persona.title} are already in your system.`);
    }
  };

  const handleAddIndividualHabit = (data: {
    name: string;
    category: HabitCategory;
    description: string;
    timeOfDay: TimeOfDay;
    personaId: PersonaId | 'custom';
    personaLabel: string;
    targetDaysPerWeek: number;
  }) => {
    if (existingHabitNames.has(data.name)) {
      showToast(`"${data.name}" is already in your tracker.`);
      return;
    }

    const newHabit: Habit = {
      id: Date.now(),
      name: data.name,
      category: data.category,
      personaId: data.personaId,
      personaLabel: data.personaLabel,
      description: data.description,
      timeOfDay: data.timeOfDay,
      streak: 0,
      bestStreak: 0,
      completedDates: [],
      targetDaysPerWeek: data.targetDaysPerWeek,
      createdAt: todayStr,
    };

    setHabits((prev) => [newHabit, ...prev]);
    showToast(`Added: ${data.name}`);
  };

  const handleResetToBaseline = () => {
    const initial = generateInitialHabits();
    setHabits(initial);
    showToast('Reset to original baseline persona habits.');
  };

  const handleImportHabits = (imported: Habit[]) => {
    setHabits(imported);
    showToast(`Imported ${imported.length} habits successfully.`);
  };

  // Filtered habits
  const filteredHabits = useMemo(() => {
    return habits.filter((h) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = h.name.toLowerCase().includes(q);
        const matchesCategory = h.category.toLowerCase().includes(q);
        const matchesDesc = (h.description || '').toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesDesc) return false;
      }

      // Time of Day
      if (timeFilter !== 'all') {
        if (h.timeOfDay !== timeFilter && h.timeOfDay !== 'anytime') return false;
      }

      // Persona
      if (personaFilter !== 'all') {
        if (h.personaId !== personaFilter) return false;
      }

      // Status
      if (statusFilter !== 'all') {
        const isDone = h.completedDates.includes(todayStr);
        if (statusFilter === 'todo' && isDone) return false;
        if (statusFilter === 'completed' && !isDone) return false;
      }

      return true;
    });
  }, [habits, searchQuery, timeFilter, personaFilter, statusFilter, todayStr]);

  const allCompletedToday = stats.total > 0 && stats.completedToday === stats.total;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Bar Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'analytics') {
            setIsAnalyticsModalOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        onOpenAddModal={() => {
          setCurrentTab('tracker');
          // Focus input or show add bar
          const input = document.querySelector('input[type="text"]') as HTMLInputElement;
          input?.focus();
        }}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 border border-stone-800 dark:border-stone-200 animate-in fade-in slide-in-from-bottom-2">
            <Sparkles className="w-4 h-4 text-amber-400 dark:text-amber-600" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab 1: Daily Tracker View */}
        {currentTab === 'tracker' && (
          <div className="space-y-6">
            {/* Stats Strip with Circular Progress Ring */}
            <StatsStrip stats={stats} currentDateText={currentDateFormatted} />

            {/* 100% Celebration Banner */}
            {allCompletedToday && (
              <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500 text-white">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                      Flawless Day! All Habits Completed
                    </h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">
                      You've fulfilled your entire routine for today. Great momentum.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentTab('matrix')}
                  className="px-3 py-1.5 bg-white dark:bg-stone-900 border border-emerald-300 dark:border-emerald-700 text-xs font-semibold text-emerald-800 dark:text-emerald-200 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors whitespace-nowrap shrink-0"
                >
                  View Weekly Matrix
                </button>
              </div>
            )}

            {/* Add Habit Bar (Frictionless inline creation) */}
            <AddHabitBar onAddHabit={handleAddHabit} />

            {/* Habit Filter & Search Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2">
              {/* Search input */}
              <div className="relative flex-1 max-w-xs">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search habits or categories..."
                  className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Segmented Controls (Interactive filter buttons conforming to zero-pill rule) */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Time of Day Filter */}
                <div className="flex items-center gap-0.5 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-lg text-xs">
                  <button
                    onClick={() => setTimeFilter('all')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      timeFilter === 'all'
                        ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    All Times
                  </button>
                  <button
                    onClick={() => setTimeFilter('morning')}
                    className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors ${
                      timeFilter === 'morning'
                        ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    <Sun className="w-3 h-3 text-amber-500" />
                    <span>Morning</span>
                  </button>
                  <button
                    onClick={() => setTimeFilter('afternoon')}
                    className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors ${
                      timeFilter === 'afternoon'
                        ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    <Sunset className="w-3 h-3 text-orange-500" />
                    <span>Afternoon</span>
                  </button>
                  <button
                    onClick={() => setTimeFilter('evening')}
                    className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors ${
                      timeFilter === 'evening'
                        ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    <Moon className="w-3 h-3 text-indigo-400" />
                    <span>Evening</span>
                  </button>
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-0.5 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-lg text-xs">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      statusFilter === 'all'
                        ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                        : 'text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setStatusFilter('todo')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      statusFilter === 'todo'
                        ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                        : 'text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    To Do
                  </button>
                  <button
                    onClick={() => setStatusFilter('completed')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      statusFilter === 'completed'
                        ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                        : 'text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    Done
                  </button>
                </div>

                {/* Persona filter dropdown */}
                <select
                  value={personaFilter}
                  onChange={(e) => setPersonaFilter(e.target.value)}
                  className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-700 dark:text-stone-300 outline-none"
                >
                  <option value="all">All Personas & Custom</option>
                  {PERSONAS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                  <option value="custom">Personal Only</option>
                </select>
              </div>
            </div>

            {/* Habit Cards List */}
            {filteredHabits.length === 0 ? (
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-12 text-center shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400 dark:text-stone-500 mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  No habits match this filter
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm mx-auto">
                  Try clearing your search query or switching filters to see all habits in your system.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setTimeFilter('all');
                      setPersonaFilter('all');
                      setStatusFilter('all');
                    }}
                    className="px-3.5 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => setCurrentTab('personas')}
                    className="px-3.5 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors flex items-center gap-1"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Explore Personas</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredHabits.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    todayKey={todayStr}
                    weekDays={weekDays}
                    onToggleToday={handleToggleToday}
                    onToggleDate={handleToggleDate}
                    onDelete={handleDeleteHabit}
                    onEdit={handleEditHabit}
                    onSaveNote={handleSaveNote}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Categorized Personas Showcase */}
        {currentTab === 'personas' && (
          <PersonaShowcase
            onAdoptPersona={handleAdoptPersona}
            onAddIndividualHabit={handleAddIndividualHabit}
            existingHabitNames={existingHabitNames}
          />
        )}

        {/* Tab 3: Weekly Matrix Grid */}
        {currentTab === 'matrix' && (
          <div className="space-y-6">
            <WeeklyMatrix
              habits={habits}
              weekDays={weekDays}
              onToggleDate={handleToggleDate}
            />
          </div>
        )}
      </main>

      {/* Edit Habit Modal */}
      <EditHabitModal
        habit={editingHabit}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingHabit(null);
        }}
        onSave={handleSaveEditedHabit}
      />

      {/* Analytics & Data Modal */}
      <HabitAnalyticsModal
        isOpen={isAnalyticsModalOpen}
        onClose={() => setIsAnalyticsModalOpen(false)}
        habits={habits}
        stats={stats}
        weekDays={weekDays}
        onResetToBaseline={handleResetToBaseline}
        onImportHabits={handleImportHabits}
      />

      {/* Footer strictly adhering to frontend design constitution */}
      <footer className="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 py-6 text-xs text-stone-500 dark:text-stone-400 transition-colors mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-800 dark:text-stone-200">HabitCraft</span>
            <span aria-hidden="true">·</span>
            <span>Local persistence enabled</span>
            <span aria-hidden="true">·</span>
            <span>Resets daily at midnight</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAnalyticsModalOpen(true)}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            >
              System Analytics & Backup
            </button>
            <button
              onClick={() => setCurrentTab('personas')}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            >
              Persona Blueprints
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
