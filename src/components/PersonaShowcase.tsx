import React, { useState } from 'react';
import { PERSONAS } from '../data/personaDataset';
import { Persona, Habit } from '../types/habits';
import { 
  Users, 
  Terminal, 
  GraduationCap, 
  Activity, 
  Compass, 
  Target, 
  Feather, 
  Check, 
  Plus, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface PersonaShowcaseProps {
  onAdoptPersona: (persona: Persona) => void;
  onAddIndividualHabit: (habitData: {
    name: string;
    category: any;
    description: string;
    timeOfDay: any;
    personaId: any;
    personaLabel: string;
    targetDaysPerWeek: number;
  }) => void;
  existingHabitNames: Set<string>;
}

export const PersonaShowcase: React.FC<PersonaShowcaseProps> = ({
  onAdoptPersona,
  onAddIndividualHabit,
  existingHabitNames,
}) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<Persona['id']>('engineer');

  const selectedPersona = PERSONAS.find((p) => p.id === selectedPersonaId) || PERSONAS[0];

  const getPersonaIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className={className} />;
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'Activity':
        return <Activity className={className} />;
      case 'Compass':
        return <Compass className={className} />;
      case 'Target':
        return <Target className={className} />;
      case 'Feather':
        return <Feather className={className} />;
      default:
        return <Users className={className} />;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header banner */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Curated Baseline Systems</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            Categorized People & Archetype Habit Datasets
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed">
            Habit systems tailored for distinct lifestyles and disciplines. Explore each baseline routine,
            adopt an entire persona system into your tracker with one click, or cherry-pick individual rituals.
          </p>
        </div>

        {/* Persona Selector Tabs (functional buttons conforming to frontend constitution) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-6">
          {PERSONAS.map((p) => {
            const isActive = p.id === selectedPersonaId;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPersonaId(p.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-stone-100 dark:bg-stone-800 border-indigo-500/50 shadow-xs ring-1 ring-indigo-500/30'
                    : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800/50'
                }`}
              >
                <div className={`p-2 rounded-lg mb-2 ${p.color.bg} ${p.color.accent}`}>
                  {getPersonaIcon(p.iconName, 'w-4 h-4')}
                </div>
                <div className="text-xs font-semibold text-stone-900 dark:text-stone-100 line-clamp-1">
                  {p.title.split('&')[0].trim()}
                </div>
                <div className="text-[10px] text-stone-400 dark:text-stone-500 mt-0.5">
                  {p.habits.length} habits
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Persona Deep Dive Card */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-start gap-3">
            <div className={`p-3 rounded-xl ${selectedPersona.color.bg} ${selectedPersona.color.accent} shrink-0 mt-0.5`}>
              {getPersonaIcon(selectedPersona.iconName, 'w-6 h-6')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  {selectedPersona.title}
                </h3>
                <span className="text-xs text-stone-400 dark:text-stone-500">
                  / {selectedPersona.archetype}
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
                {selectedPersona.description}
              </p>
              <div className="mt-2 text-xs italic text-stone-500 dark:text-stone-400">
                “{selectedPersona.quote}” <span className="not-italic font-medium">— {selectedPersona.quoteAuthor}</span>
              </div>
            </div>
          </div>

          {/* Adopt Button */}
          <div className="shrink-0">
            <button
              onClick={() => onAdoptPersona(selectedPersona)}
              className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Adopt Full System ({selectedPersona.habits.length} Habits)</span>
            </button>
          </div>
        </div>

        {/* List of Habits in this Persona */}
        <div className="mt-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-4">
            Core Habit Specifications ({selectedPersona.habits.length})
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {selectedPersona.habits.map((h, idx) => {
              const isAlreadyAdded = existingHabitNames.has(h.name);

              return (
                <div
                  key={idx}
                  className="bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 rounded-xl p-4 flex flex-col justify-between transition-colors hover:border-stone-300 dark:hover:border-stone-700"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                        {h.name}
                      </span>
                      {isAlreadyAdded ? (
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium shrink-0">
                          <Check className="w-3.5 h-3.5" /> Added
                        </span>
                      ) : (
                        <button
                          onClick={() =>
                            onAddIndividualHabit({
                              name: h.name,
                              category: h.category,
                              description: h.description,
                              timeOfDay: h.timeOfDay,
                              personaId: selectedPersona.id,
                              personaLabel: selectedPersona.title,
                              targetDaysPerWeek: h.targetDaysPerWeek,
                            })
                          }
                          className="px-2.5 py-1 text-[11px] font-medium text-stone-700 dark:text-stone-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-md transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                          title="Add this habit to your tracker"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                      {h.description}
                    </p>
                  </div>

                  {/* Clean unboxed metadata footer */}
                  <div className="flex items-center gap-2 text-[11px] text-stone-400 dark:text-stone-500 mt-3 pt-2 border-t border-stone-200/60 dark:border-stone-700/60">
                    <span className="capitalize">{h.timeOfDay}</span>
                    <span aria-hidden="true">·</span>
                    <span>{h.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{h.targetDaysPerWeek}d / week target</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
