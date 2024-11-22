import React from 'react';

interface MoodIntensityProps {
  value: number;
  onChange: (value: number) => void;
}

export default function MoodIntensity({ value, onChange }: MoodIntensityProps) {
  return (
    <div className="w-full px-4 py-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Quanto è intensa questa emozione? ({value})
      </label>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Leggera</span>
        <span>Molto Forte</span>
      </div>
    </div>
  );
}