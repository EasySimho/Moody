import React from 'react';

interface MoodNoteProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MoodNote({ value, onChange }: MoodNoteProps) {
  return (
    <div className="p-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Aggiungi una nota (opzionale)
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Come ti senti oggi?"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        rows={3}
      />
    </div>
  );
}