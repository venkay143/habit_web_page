import React, { useState } from 'react';
import { HabitCategory, TimeOfDay, PersonaId } from '../types/habits';
import { PERSONAS } from '../data/personaDataset';
import { Plus, SlidersHorizontal, Sun, Sunset, Moon, Clock } from 'lucide-react';

interface AddHabitBarProps {
  onAddHabit: (habitData: {
    name: string;
    category: HabitCategory;
    timeOfDay: TimeOfDay;
    personaId?: PersonaId | 'custom';
    personaLabel?: string;
    description?: string;
  }) => void;
}

const CATEGORIES: HabitCategory[] = [
  'Deep Work & Focus',
  'Health & Fitness',
  'Mind & Stillness',
  'Learning & Growth',
  'Daily Craft & Rituals',
];

export const AddHabitBar: React.FC<AddHabitBarProps> = ({ onAddHabit }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<HabitCategory>('Deep Work & Focus');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning');
  const [selectedPersona, setSelectedPersona] = useState<string>('custom');
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    const personaObj = PERSONAS.find(p => p.id === selectedPersona);

    onAddHabit({
      name: trimmed,
      category,
      timeOfDay,
      personaId: selectedPersona === 'custom' ? 'custom' : (selectedPersona as PersonaId),
      personaLabel: personaObj ? personaObj.title : 'Custom Habit',
      description: '',
    });

    setName('');
    setShowOptions(false);
  };

  return (
    <div className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-3 shadow-xs transition-all">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add a new habit... (e.g. 20-min morning mobility, read 15 pages)"
          maxLength={80}
          className="flex-1 bg-transparent px-3 py-2 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 outline-none rounded-lg focus:ring-1 focus:ring-indigo-500 border border-stone-200 dark:border-stone-700/80 transition-colors"
        />

        <button
          type="button"
          onClick={() => setShowOptions(!showOptions)}
          className={`p-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer flex items-center gap-1 shrink-0 ${
            showOptions
              ? 'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100'
              : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800'
          }`}
          title="Configure time of day & category"
          aria-label="Toggle habit options"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Options</span>
        </button>

        <button
          type="submit"
          disabled={!name.trim()}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </form>

      {/* Expanded configuration options */}
      {showOptions && (
        <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Time of Day */}
          <div>
            <label className="block text-stone-500 dark:text-stone-400 mb-1 font-medium">Time of Day</label>
            <div className="flex gap-1 p-0.5 bg-stone-100 dark:bg-stone-800 rounded-lg">
              <button
                type="button"
                onClick={() => setTimeOfDay('morning')}
                className={`flex-1 py-1 px-1.5 rounded-md flex items-center justify-center gap-1 transition-colors ${
                  timeOfDay === 'morning' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-medium' : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                <Sun className="w-3 h-3 text-amber-500" />
                <span>Morning</span>
              </button>
              <button
                type="button"
                onClick={() => setTimeOfDay('afternoon')}
                className={`flex-1 py-1 px-1.5 rounded-md flex items-center justify-center gap-1 transition-colors ${
                  timeOfDay === 'afternoon' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-medium' : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                <Sunset className="w-3 h-3 text-orange-500" />
                <span>Afternoon</span>
              </button>
              <button
                type="button"
                onClick={() => setTimeOfDay('evening')}
                className={`flex-1 py-1 px-1.5 rounded-md flex items-center justify-center gap-1 transition-colors ${
                  timeOfDay === 'evening' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-medium' : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                <Moon className="w-3 h-3 text-indigo-400" />
                <span>Evening</span>
              </button>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-stone-500 dark:text-stone-400 mb-1 font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as HabitCategory)}
              className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 dark:text-stone-200 outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Persona System */}
          <div>
            <label className="block text-stone-500 dark:text-stone-400 mb-1 font-medium">Persona Blueprint</label>
            <select
              value={selectedPersona}
              onChange={(e) => setSelectedPersona(e.target.value)}
              className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 dark:text-stone-200 outline-none"
            >
              <option value="custom">Personal (Custom Habit)</option>
              {PERSONAS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
