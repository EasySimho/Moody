import React from 'react';
import { Heart, Smile, Frown, Zap, Coffee, Angry, Cloud } from 'lucide-react';
import type { Mood } from '../types';

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onSelect: (mood: Mood) => void;
}

const moods: { type: Mood; icon: React.ReactNode; label: string; color: string }[] = [
  { type: 'felice', icon: <Smile className="w-8 h-8" />, label: 'Felice', color: 'text-yellow-500' },
  { type: 'amato', icon: <Heart className="w-8 h-8" />, label: 'Amato', color: 'text-pink-500' },
  { type: 'energico', icon: <Zap className="w-8 h-8" />, label: 'Energico', color: 'text-purple-500' },
  { type: 'calmo', icon: <Cloud className="w-8 h-8" />, label: 'Calmo', color: 'text-blue-500' },
  { type: 'stressato', icon: <Coffee className="w-8 h-8" />, label: 'Stressato', color: 'text-orange-500' },
  { type: 'triste', icon: <Frown className="w-8 h-8" />, label: 'Triste', color: 'text-indigo-500' },
  { type: 'arrabbiato', icon: <Angry className="w-8 h-8" />, label: 'Arrabbiato', color: 'text-red-500' },
];

export default function MoodSelector({ selectedMood, onSelect }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {moods.map(({ type, icon, label, color }) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className={`flex flex-col items-center p-4 rounded-xl transition-all ${
            selectedMood === type
              ? 'bg-white shadow-lg scale-105'
              : 'bg-gray-50 hover:bg-white hover:shadow-md'
          }`}
        >
          <div className={`${color} transition-colors`}>{icon}</div>
          <span className="mt-2 text-sm font-medium text-gray-700">{label}</span>
        </button>
      ))}
    </div>
  );
}