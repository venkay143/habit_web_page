import React from 'react';
import { Sun, Moon, Plus, Sparkles, LayoutGrid, CheckSquare, BarChart2, Users } from 'lucide-react';

interface HeaderProps {
  currentTab: 'tracker' | 'personas' | 'matrix' | 'analytics';
  onSelectTab: (tab: 'tracker' | 'personas' | 'matrix' | 'analytics') => void;
  onOpenAddModal: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenAddModal,
  isDark,
  onToggleTheme,
}) => {
  return (
    <header className="w-full border-b border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 backdrop-blur sticky top-0 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 flex items-center justify-center text-white shadow-sm font-black text-lg">
            H
          </div>
          <button 
            onClick={() => onSelectTab('tracker')}
            className="text-left group cursor-pointer"
          >
            <span className="text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors whitespace-nowrap">
              HabitCraft
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs text-stone-500 dark:text-stone-400 font-normal">
              Persona Systems
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onSelectTab('tracker')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              currentTab === 'tracker'
                ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800/50'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Daily Tracker</span>
          </button>

          <button
            onClick={() => onSelectTab('personas')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              currentTab === 'personas'
                ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800/50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Persona Blueprints</span>
          </button>

          <button
            onClick={() => onSelectTab('matrix')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              currentTab === 'matrix'
                ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800/50'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Weekly Matrix</span>
          </button>

          <button
            onClick={() => onSelectTab('analytics')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              currentTab === 'analytics'
                ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800/50'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Insights</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Theme Switcher */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
          </button>

          <button
            onClick={onOpenAddModal}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Habit</span>
          </button>
        </div>
      </div>
    </header>
  );
};
