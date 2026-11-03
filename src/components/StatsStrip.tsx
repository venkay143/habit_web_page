import React from 'react';
import { HabitStats } from '../utils/habitStorage';
import { Flame, CheckCircle2, Award, Zap } from 'lucide-react';

interface StatsStripProps {
  stats: HabitStats;
  currentDateText: string;
}

export const StatsStrip: React.FC<StatsStripProps> = ({ stats, currentDateText }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius; // 150.796...
  const strokeDashoffset = circumference - (circumference * (stats.percentageToday / 100));

  return (
    <div className="w-full">
      {/* Subdued date & status banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs text-stone-500 dark:text-stone-400">
        <div>
          <span>{currentDateText}</span>
          <span className="mx-2" aria-hidden="true">·</span>
          <span>Baseline persona dataset active</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium text-indigo-600 dark:text-indigo-400">
          <Zap className="w-3.5 h-3.5" />
          <span>{stats.completedToday} of {stats.total} habits logged today</span>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Stat 1: Today's Progress Ring */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-xs">
          <div className="relative w-14 h-14 mb-2 flex items-center justify-center">
            <svg width="56" height="56" className="-rotate-90">
              <circle
                cx="28"
                cy="28"
                r={radius}
                fill="none"
                className="stroke-stone-100 dark:stroke-stone-800"
                strokeWidth="5"
              />
              <circle
                cx="28"
                cy="28"
                r={radius}
                fill="none"
                className="stroke-indigo-600 dark:stroke-indigo-400 transition-all duration-500 ease-out"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={isNaN(strokeDashoffset) ? circumference : strokeDashoffset}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">
              {stats.percentageToday}%
            </span>
          </div>
          <div className="text-xs font-medium text-stone-700 dark:text-stone-300">Today's Progress</div>
          <div className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5">
            {stats.completedToday} / {stats.total} completed
          </div>
        </div>

        {/* Stat 2: Total Active Habits */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300 mb-2">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
            {stats.total}
          </div>
          <div className="text-xs font-medium text-stone-700 dark:text-stone-300 mt-0.5">Active Habits</div>
          <div className="text-[11px] text-stone-400 dark:text-stone-500">In your daily system</div>
        </div>

        {/* Stat 3: Best Streak */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center text-amber-500 mb-2">
            <Flame className="w-5 h-5 fill-amber-500/20" />
          </div>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 font-mono tabular-nums flex items-center gap-1">
            <span>{stats.bestStreak}</span>
            <span className="text-xs font-normal text-stone-500">days</span>
          </div>
          <div className="text-xs font-medium text-stone-700 dark:text-stone-300 mt-0.5">Best Streak</div>
          <div className="text-[11px] text-stone-400 dark:text-stone-500">Unbroken momentum</div>
        </div>

        {/* Stat 4: Weekly Consistency */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-teal-500/10 dark:bg-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-2">
            <Award className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 font-mono tabular-nums">
            {stats.weeklyConsistencyRate}%
          </div>
          <div className="text-xs font-medium text-stone-700 dark:text-stone-300 mt-0.5">7-Day Consistency</div>
          <div className="text-[11px] text-stone-400 dark:text-stone-500">
            {stats.weeklyCompletions} logged this week
          </div>
        </div>
      </div>
    </div>
  );
};
