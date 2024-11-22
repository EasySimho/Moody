import React from "react";
import { useMoods } from "../hooks/useMoods";
import { Smile, Heart, Zap, Cloud, Coffee, Frown, Angry } from "lucide-react";
import type { Mood } from "../types";

const moodIcons: Record<Mood, React.ReactNode> = {
  felice: <Smile className="w-5 h-5 text-yellow-500" />,
  amato: <Heart className="w-5 h-5 text-pink-500" />,
  energico: <Zap className="w-5 h-5 text-purple-500" />,
  calmo: <Cloud className="w-5 h-5 text-blue-500" />,
  stressato: <Coffee className="w-5 h-5 text-orange-500" />,
  triste: <Frown className="w-5 h-5 text-indigo-500" />,
  arrabbiato: <Angry className="w-5 h-5 text-red-500" />,
};

export default function MoodNotesList() {
  const { moods, loading } = useMoods();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md">
      <div className="space-y-4">
        {moods.map((mood) => {
          if (!mood.note) {
            return null;
          }

          return (
            <div
              key={mood.id}
              className="flex items-center gap-4  bg-gray-50 p-3 rounded-xl"
            >
              <div>{moodIcons[mood.mood]}</div>
              <div>
                <p className="text-gray-800 font-medium">{mood.note}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
