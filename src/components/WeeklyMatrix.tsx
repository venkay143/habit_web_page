import React from 'react';
import { Habit } from '../types/habits';
import { WeekDay } from '../utils/habitStorage';
import { Check, Flame, Calendar, Award } from 'lucide-react';

interface WeeklyMatrixProps {
  habits: Habit[];
  weekDays: WeekDay[];
  onToggleDate: (id: number, dateKey: string) => void;
}

export const WeeklyMatrix: React.FC<WeeklyMatrixProps> = ({
  habits,
  weekDays,
  onToggleDate,
}) => {
  return (
    <div className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100 dark:border-stone-800">
        <div>
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Weekly Consistency Matrix</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Click any cell to toggle completion for that day. View weekly adherence across your habits.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1">
            <span className="w-3.5 h-3.5 rounded bg-emerald-500 inline-block" /> Completed
          </span>
          <span className="mx-1">·</span>
          <span className="flex items-center gap-1">
            <span className="w-3.5 h-3.5 rounded bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 inline-block" /> Incomplete
          </span>
        </div>
      </div>

      {/* Grid container with horizontal scroll on small devices */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-100 dark:border-stone-800 text-stone-400 dark:text-stone-500">
              <th className="py-2.5 px-3 font-medium min-w-[200px]">Habit & Blueprint</th>
              <th className="py-2.5 px-2 font-medium text-center">Streak</th>
              {weekDays.map((day) => (
                <th
                  key={day.dateKey}
                  className={`py-2.5 px-2 font-medium text-center min-w-[48px] ${
                    day.isToday ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/40 dark:bg-indigo-950/20 rounded-t' : ''
                  }`}
                >
                  <div className="text-[10px] uppercase font-mono">{day.dayLetter}</div>
                  <div className="text-xs font-semibold tabular-nums">{day.dayNumber}</div>
                </th>
              ))}
              <th className="py-2.5 px-3 font-medium text-right">Week Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80">
            {habits.map((habit) => {
              const weekCompletedCount = weekDays.filter((d) =>
                habit.completedDates.includes(d.dateKey)
              ).length;
              const target = habit.targetDaysPerWeek || 7;
              const pct = Math.min(100, Math.round((weekCompletedCount / target) * 100));

              return (
                <tr
                  key={habit.id}
                  className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors group"
                >
                  {/* Habit title & category */}
                  <td className="py-3 px-3">
                    <div className="font-medium text-stone-900 dark:text-stone-100 text-xs sm:text-sm">
                      {habit.name}
                    </div>
                    <div className="text-[11px] text-stone-400 dark:text-stone-500 flex items-center gap-1.5 mt-0.5">
                      <span>{habit.category}</span>
                      {habit.personaLabel && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{habit.personaLabel}</span>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Current Streak */}
                  <td className="py-3 px-2 text-center">
                    <span className="inline-flex items-center gap-0.5 text-amber-600 dark:text-amber-400 font-mono font-medium text-xs">
                      <Flame className="w-3.5 h-3.5 fill-amber-500" />
                      <span className="tabular-nums">{habit.streak}</span>
                    </span>
                  </td>

                  {/* Day Columns */}
                  {weekDays.map((day) => {
                    const isDone = habit.completedDates.includes(day.dateKey);
                    return (
                      <td
                        key={day.dateKey}
                        className={`py-3 px-2 text-center ${
                          day.isToday ? 'bg-indigo-50/20 dark:bg-indigo-950/10' : ''
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => onToggleDate(habit.id, day.dateKey)}
                          className={`w-7 h-7 mx-auto rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                            isDone
                              ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-xs'
                              : 'border border-stone-200 dark:border-stone-700/80 hover:border-emerald-400 dark:hover:border-emerald-500 text-transparent hover:text-stone-300'
                          }`}
                          title={`${habit.name} - ${day.dateKey}: ${isDone ? 'Done' : 'Not done'}`}
                        >
                          <Check className={`w-3.5 h-3.5 stroke-[3] ${isDone ? 'opacity-100' : 'opacity-0'}`} />
                        </button>
                      </td>
                    );
                  })}

                  {/* Week Progress */}
                  <td className="py-3 px-3 text-right">
                    <div className="font-mono text-xs font-semibold tabular-nums text-stone-700 dark:text-stone-300">
                      {weekCompletedCount}/{target}
                    </div>
                    <div className="w-16 h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full ml-auto mt-1 overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
