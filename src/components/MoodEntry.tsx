import React, { useState } from 'react';
import MoodSelector from './MoodSelector';
import MoodIntensity from './MoodIntensity';
import MoodNote from './MoodNote';
import { useMoods } from '../hooks/useMoods';
import type { Mood } from '../types';

export default function MoodEntry() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState('');
  const { addMood } = useMoods();

  const handleSubmit = async () => {
    if (!selectedMood) return;
    
    try {
      await addMood(selectedMood, intensity, note);
      setSelectedMood(null);
      setIntensity(5);
      setNote('');
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl max-w-2xl mx-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Come ti senti?</h2>
        <p className="text-gray-600 mt-1">Condividi il tuo stato d'animo con il tuo partner</p>
      </div>

      <MoodSelector selectedMood={selectedMood} onSelect={setSelectedMood} />
      
      {selectedMood && (
        <>
          <MoodIntensity value={intensity} onChange={setIntensity} />
          <MoodNote value={note} onChange={setNote} />
          
          <div className="p-4 bg-gray-50 rounded-b-2xl">
            <button
              onClick={handleSubmit}
              className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Condividi Stato d'Animo
            </button>
          </div>
        </>
      )}
    </div>
  );
}