import React, { useState, useEffect } from 'react';
import { Habit, HabitCategory, TimeOfDay, PersonaId } from '../types/habits';
import { PERSONAS } from '../data/personaDataset';
import { X, Check } from 'lucide-react';

interface EditHabitModalProps {
  habit: Habit | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Habit) => void;
}

const CATEGORIES: HabitCategory[] = [
  'Deep Work & Focus',
  'Health & Fitness',
  'Mind & Stillness',
  'Learning & Growth',
  'Daily Craft & Rituals',
];

export const EditHabitModal: React.FC<EditHabitModalProps> = ({
  habit,
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<HabitCategory>('Deep Work & Focus');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning');
  const [targetDays, setTargetDays] = useState(7);
  const [personaId, setPersonaId] = useState<string>('custom');

  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setDescription(habit.description || '');
      setCategory(habit.category);
      setTimeOfDay(habit.timeOfDay);
      setTargetDays(habit.targetDaysPerWeek || 7);
      setPersonaId(habit.personaId || 'custom');
    }
  }, [habit]);

  if (!isOpen || !habit) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const personaObj = PERSONAS.find(p => p.id === personaId);

    onSave({
      ...habit,
      name: name.trim(),
      description: description.trim(),
      category,
      timeOfDay,
      targetDaysPerWeek: targetDays,
      personaId: personaId === 'custom' ? 'custom' : (personaId as PersonaId),
      personaLabel: personaObj ? personaObj.title : habit.personaLabel,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-lg w-full p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
            Edit Habit Details
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
          <div>
            <label className="block text-stone-600 dark:text-stone-300 font-medium mb-1">
              Habit Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-3 py-2 text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-stone-600 dark:text-stone-300 font-medium mb-1">
              Description / Intent
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-3 py-2 text-stone-900 dark:text-stone-100 outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-600 dark:text-stone-300 font-medium mb-1">
                Time of Day
              </label>
              <select
                value={timeOfDay}
                onChange={(e) => setTimeOfDay(e.target.value as TimeOfDay)}
                className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-2.5 py-2 text-stone-900 dark:text-stone-100 outline-none"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="anytime">Anytime</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-300 font-medium mb-1">
                Target Days / Week
              </label>
              <select
                value={targetDays}
                onChange={(e) => setTargetDays(Number(e.target.value))}
                className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-2.5 py-2 text-stone-900 dark:text-stone-100 outline-none"
              >
                {[7, 6, 5, 4, 3, 2, 1].map((d) => (
                  <option key={d} value={d}>
                    {d} days per week
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-stone-600 dark:text-stone-300 font-medium mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as HabitCategory)}
              className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-2.5 py-2 text-stone-900 dark:text-stone-100 outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-stone-100 dark:border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
