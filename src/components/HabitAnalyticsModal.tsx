import React, { useRef } from 'react';
import { Habit } from '../types/habits';
import { HabitStats, WeekDay, todayKey } from '../utils/habitStorage';
import { 
  X, 
  BarChart2, 
  Download, 
  Upload, 
  RotateCcw, 
  Flame, 
  PieChart, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

interface HabitAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  habits: Habit[];
  stats: HabitStats;
  weekDays: WeekDay[];
  onResetToBaseline: () => void;
  onImportHabits: (habits: Habit[]) => void;
}

export const HabitAnalyticsModal: React.FC<HabitAnalyticsModalProps> = ({
  isOpen,
  onClose,
  habits,
  stats,
  weekDays,
  onResetToBaseline,
  onImportHabits,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Compute category breakdown
  const categoryMap: Record<string, { total: number; completedToday: number }> = {};
  const currentTodayKey = todayKey();

  habits.forEach((h) => {
    if (!categoryMap[h.category]) {
      categoryMap[h.category] = { total: 0, completedToday: 0 };
    }
    categoryMap[h.category].total++;
    if (h.completedDates.includes(currentTodayKey)) {
      categoryMap[h.category].completedToday++;
    }
  });

  // Top streak habits
  const topStreakHabits = [...habits].sort((a, b) => b.streak - a.streak).slice(0, 5);

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(habits, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `habitcraft_backup_${currentTodayKey}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          onImportHabits(parsed);
          onClose();
        } else {
          alert('Invalid habit data structure.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-2xl w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Habit System Analytics & Data
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Quantitative performance, category balance, and backup options
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-6 mt-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-stone-50 dark:bg-stone-800/40 p-3 rounded-xl border border-stone-100 dark:border-stone-800 text-center">
              <div className="text-xs text-stone-500 dark:text-stone-400">Today's Rate</div>
              <div className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400 tabular-nums mt-0.5">
                {stats.percentageToday}%
              </div>
            </div>
            <div className="bg-stone-50 dark:bg-stone-800/40 p-3 rounded-xl border border-stone-100 dark:border-stone-800 text-center">
              <div className="text-xs text-stone-500 dark:text-stone-400">7-Day Consistency</div>
              <div className="text-xl font-bold font-mono text-teal-600 dark:text-teal-400 tabular-nums mt-0.5">
                {stats.weeklyConsistencyRate}%
              </div>
            </div>
            <div className="bg-stone-50 dark:bg-stone-800/40 p-3 rounded-xl border border-stone-100 dark:border-stone-800 text-center">
              <div className="text-xs text-stone-500 dark:text-stone-400">Peak Streak</div>
              <div className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400 tabular-nums mt-0.5">
                {stats.bestStreak}d
              </div>
            </div>
          </div>

          {/* Category Proportions */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3 flex items-center gap-1.5">
              <PieChart className="w-3.5 h-3.5" />
              <span>Category Distribution</span>
            </h4>
            <div className="space-y-2">
              {Object.entries(categoryMap).map(([category, count]) => {
                const pct = Math.round((count.total / habits.length) * 100);
                const donePct = count.total > 0 ? Math.round((count.completedToday / count.total) * 100) : 0;

                return (
                  <div key={category} className="bg-stone-50 dark:bg-stone-800/40 p-3 rounded-xl border border-stone-100 dark:border-stone-800">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium text-stone-800 dark:text-stone-200">{category}</span>
                      <span className="text-stone-500 dark:text-stone-400 font-mono tabular-nums">
                        {count.completedToday}/{count.total} today ({donePct}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full transition-all duration-300"
                        style={{ width: `${donePct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Streak Leaders</span>
            </h4>
            <div className="space-y-1.5">
              {topStreakHabits.map((h, i) => (
                <div
                  key={h.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-stone-400 w-4">{i + 1}.</span>
                    <span className="font-medium text-stone-900 dark:text-stone-100">{h.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-mono font-bold">
                    <Flame className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{h.streak} days</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backup & Data Actions */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3">
              Data Management & Backup
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleExportJSON}
                className="px-3.5 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON Backup</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Import JSON Backup</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={() => {
                  if (confirm('Reset your habits to the default baseline persona dataset?')) {
                    onResetToBaseline();
                    onClose();
                  }
                }}
                className="px-3.5 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Baseline</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
