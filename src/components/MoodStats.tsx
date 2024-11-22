import React from 'react';
import { format, subDays } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useMoods } from '../hooks/useMoods';
import { Heart, Smile, Frown, Zap, Coffee, Angry, Cloud } from 'lucide-react';
import type { Mood } from '../types';

const moodIcons: Record<Mood, React.ReactNode> = {
  felice: <Smile className="w-6 h-6 text-yellow-500" />,
  amato: <Heart className="w-6 h-6 text-pink-500" />,
  energico: <Zap className="w-6 h-6 text-purple-500" />,
  calmo: <Cloud className="w-6 h-6 text-blue-500" />,
  stressato: <Coffee className="w-6 h-6 text-orange-500" />,
  triste: <Frown className="w-6 h-6 text-indigo-500" />,
  arrabbiato: <Angry className="w-6 h-6 text-red-500" />
};

export default function MoodStats() {
  const { moods } = useMoods();

  const last7Days = [...Array(7)].map((_, i) => {
  const date = subDays(new Date(), i);
  const dayMoods = moods.filter(mood => {
    const moodDate = new Date(mood.timestamp);
    return !isNaN(moodDate.getTime()) &&
      format(moodDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
  });
  
  return {
    date: format(date, 'dd/MM'),
    intensity: dayMoods[0]?.intensity || 0,
    mood: dayMoods[0]?.mood
  };
}).reverse();


  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Il tuo Umore</h2>
      
      <div className="h-64 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={last7Days}>
            <XAxis dataKey="date" />
            <YAxis domain={[0, 10]} />
            <Tooltip 
              content={({ payload, label }) => {
                if (payload && payload[0]) {
                  const mood = payload[0].payload.mood;
                  return (
                    <div className="bg-white p-2 shadow-lg rounded-lg border">
                      <p className="text-sm">{label}</p>
                      <div className="flex items-center gap-2">
                        {mood && moodIcons[mood]}
                        <span className="font-medium">
                          Intensità: {payload[0].value}
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line 
              type="monotone" 
              dataKey="intensity" 
              stroke="#6366f1" 
              strokeWidth={2}
              dot={{ stroke: '#6366f1', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Umore più frequente</h3>
          {moods.length > 0 && (
            <div className="flex items-center gap-2">
              {moodIcons[moods[0].mood]}
              <span className="capitalize">{moods[0].mood}</span>
            </div>
          )}
        </div>
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Media Intensità</h3>
          <p className="text-2xl font-semibold text-indigo-600">
            {moods.length > 0
              ? Math.round(
                  moods.reduce((acc, mood) => acc + mood.intensity, 0) / moods.length
                )
              : 0}
          </p>
        </div>
      </div>
    </div>
  );
}