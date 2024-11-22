import React from 'react';
import { useMoods } from '../hooks/useMoods';
import { Heart, Music, Footprints , Coffee, Book } from 'lucide-react';

const suggestions = {
  stressato: [
    { icon: <Music className="w-5 h-5" />, text: 'Ascolta una playlist rilassante' },
    { icon: <Book className="w-5 h-5" />, text: 'Fai 10 minuti di meditazione' }
  ],
  triste: [
    { icon: <Footprints className="w-5 h-5" />, text: 'Fai una passeggiata insieme' },
    { icon: <Heart className="w-5 h-5" />, text: 'Guardate il vostro film preferito' }
  ],
  energico: [
    { icon: <Footprints className="w-5 h-5" />, text: 'Organizza un\'attività all\'aperto' },
    { icon: <Coffee className="w-5 h-5" />, text: 'Provate un nuovo ristorante' }
  ]
};

export default function ActivitySuggestions() {
  const { moods } = useMoods();
  const latestMood = moods[0]?.mood;

  if (!latestMood || !suggestions[latestMood as keyof typeof suggestions]) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Suggerimenti per Oggi
      </h2>
      <div className="space-y-4">
        {suggestions[latestMood as keyof typeof suggestions].map((suggestion, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="text-indigo-600">{suggestion.icon}</div>
            <p className="text-gray-700">{suggestion.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}