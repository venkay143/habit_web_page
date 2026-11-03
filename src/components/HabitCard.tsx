import React, { useState } from 'react';
import { Habit } from '../types/habits';
import { WeekDay } from '../utils/habitStorage';
import { 
  Flame, 
  Trash2, 
  Edit3, 
  MessageSquare, 
  Check, 
  Sun, 
  Sunset, 
  Moon, 
  Clock,
  Sparkles
} from 'lucide-react';

interface HabitCardProps {
  habit: Habit;
  todayKey: string;
  weekDays: WeekDay[];
  onToggleToday: (id: number) => void;
  onToggleDate: (id: number, dateKey: string) => void;
  onDelete: (id: number) => void;
  onEdit: (habit: Habit) => void;
  onSaveNote: (id: number, dateKey: string, note: string) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  todayKey,
  weekDays,
  onToggleToday,
  onToggleDate,
  onDelete,
  onEdit,
  onSaveNote,
}) => {
  const isDoneToday = habit.completedDates.includes(todayKey);
  const [showNoteDrawer, setShowNoteDrawer] = useState(false);
  const [noteText, setNoteText] = useState(habit.notes?.[todayKey] || '');

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveNote(habit.id, todayKey, noteText);
    setShowNoteDrawer(false);
  };

  const renderTimeIcon = () => {
    switch (habit.timeOfDay) {
      case 'morning':
        return <Sun className="w-3 h-3 text-amber-500 inline mr-1" />;
      case 'afternoon':
        return <Sunset className="w-3 h-3 text-orange-500 inline mr-1" />;
      case 'evening':
        return <Moon className="w-3 h-3 text-indigo-400 inline mr-1" />;
      default:
        return <Clock className="w-3 h-3 text-stone-400 inline mr-1" />;
    }
  };

  return (
    <div
      className={`group relative bg-white dark:bg-stone-900 border transition-all duration-200 rounded-xl p-4 shadow-xs hover:shadow-md ${
        isDoneToday
          ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10'
          : 'border-stone-200 dark:border-stone-800'
      }`}
    >
      <div className="flex items-start sm:items-center justify-between gap-3">
        {/* Custom Interactive Checkbox (matching prototype) */}
        <button
          onClick={() => onToggleToday(habit.id)}
          className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center shrink-0 cursor-pointer transition-all duration-200 ${
            isDoneToday
              ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 border-transparent text-white shadow-xs scale-105'
              : 'border-stone-300 dark:border-stone-600 hover:border-emerald-500 dark:hover:border-emerald-400 bg-stone-50 dark:bg-stone-800/50'
          }`}
          aria-label={isDoneToday ? 'Mark habit incomplete' : 'Mark habit complete'}
        >
          {isDoneToday && <Check className="w-4 h-4 stroke-[3]" />}
        </button>

        {/* Habit Information & Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3
              className={`text-sm sm:text-base font-semibold transition-all break-words ${
                isDoneToday
                  ? 'line-through text-stone-400 dark:text-stone-500'
                  : 'text-stone-900 dark:text-stone-100'
              }`}
            >
              {habit.name}
            </h3>
          </div>

          {habit.description && (
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
              {habit.description}
            </p>
          )}

          {/* Clean Unboxed Metadata Line (No Pill Enclosures) */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500 dark:text-stone-400 mt-1.5 font-normal">
            {/* Streak Counter */}
            <div className="flex items-center gap-1 font-medium text-amber-600 dark:text-amber-400">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              <span className="font-mono tabular-nums">{habit.streak}</span>
              <span className="text-[11px] text-stone-500">day streak</span>
            </div>

            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>

            {/* Time of Day */}
            <span className="capitalize flex items-center">
              {renderTimeIcon()}
              <span>{habit.timeOfDay}</span>
            </span>

            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>

            {/* Category */}
            <span>{habit.category}</span>

            {habit.personaLabel && (
              <>
                <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                <span className="text-stone-400 dark:text-stone-500">{habit.personaLabel}</span>
              </>
            )}
          </div>
        </div>

        {/* Right side: 7-day mini tracker & action buttons */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 shrink-0">
          {/* 7-Day Consistency Mini-Dots */}
          <div className="hidden lg:flex items-center gap-1 bg-stone-50 dark:bg-stone-800/60 p-1.5 rounded-lg border border-stone-100 dark:border-stone-800">
            {weekDays.map((day) => {
              const isChecked = habit.completedDates.includes(day.dateKey);
              return (
                <button
                  key={day.dateKey}
                  type="button"
                  onClick={() => onToggleDate(habit.id, day.dateKey)}
                  className={`w-6 h-6 rounded-md flex flex-col items-center justify-center text-[10px] font-mono transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-emerald-500 text-white font-bold shadow-xs'
                      : day.isToday
                      ? 'border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                      : 'text-stone-400 dark:text-stone-500 hover:bg-stone-200/60 dark:hover:bg-stone-700/50'
                  }`}
                  title={`${day.dateKey}: ${isChecked ? 'Completed' : 'Missed'} (click to toggle)`}
                >
                  <span className="text-[9px] leading-none">{day.dayLetter}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setShowNoteDrawer(!showNoteDrawer)}
              className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Add / view today note"
              aria-label="Add reflection note"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onEdit(habit)}
              className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Edit habit"
              aria-label="Edit habit"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onDelete(habit.id)}
              className="p-1.5 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              title="Remove habit"
              aria-label="Delete habit"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Note drawer / Today's reflection */}
      {showNoteDrawer && (
        <form onSubmit={handleNoteSubmit} className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 flex gap-2">
          <input
            type="text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Log quick reflection (e.g., 'Target met with 2.8L water', 'Finished early morning')"
            className="flex-1 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-lg px-3 py-1.5 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 outline-none"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-semibold rounded-lg transition-colors shrink-0"
          >
            Save Note
          </button>
        </form>
      )}

      {/* Display note if saved for today */}
      {habit.notes?.[todayKey] && !showNoteDrawer && (
        <div className="mt-2 text-xs text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/40 px-2.5 py-1.5 rounded-lg flex items-center justify-between border border-stone-100 dark:border-stone-800">
          <span className="italic">"{habit.notes[todayKey]}"</span>
          <button
            onClick={() => setShowNoteDrawer(true)}
            className="text-[10px] text-stone-400 hover:text-stone-600 underline ml-2"
          >
            edit
          </button>
        </div>
      )}
    </div>
  );
};
