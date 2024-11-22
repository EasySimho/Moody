import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useMoods } from '../hooks/useMoods';
import { Heart, Smile, Frown, Zap, Coffee, Angry, Cloud, User } from 'lucide-react';
import type { Mood } from '../types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';

const moodIcons: Record<Mood, React.ReactNode> = {
  felice: <Smile className="w-5 h-5 text-yellow-500" />,
  amato: <Heart className="w-5 h-5 text-pink-500" />,
  energico: <Zap className="w-5 h-5 text-purple-500" />,
  calmo: <Cloud className="w-5 h-5 text-blue-500" />,
  stressato: <Coffee className="w-5 h-5 text-orange-500" />,
  triste: <Frown className="w-5 h-5 text-indigo-500" />,
  arrabbiato: <Angry className="w-5 h-5 text-red-500" />
};

const moodColors: Record<Mood, string> = {
  felice: '#fbbf24',
  amato: '#ec4899',
  energico: '#a855f7',
  calmo: '#3b82f6',
  stressato: '#f97316',
  triste: '#6366f1',
  arrabbiato: '#ef4444'
};

export default function MoodStats() {
  const { moods } = useMoods();
  const [currentUser] = useAuthState(auth);

  const moodStats = Object.entries(
    moods.reduce((acc, mood) => {
      const key = `${mood.mood}-${mood.userId}`;
      if (!acc[key]) {
        acc[key] = {
          count: 0,
          totalIntensity: 0,
          mood: mood.mood,
          userId: mood.userId,
          isCurrentUser: mood.userId === currentUser?.uid
        };
      }
      acc[key].count++;
      acc[key].totalIntensity += mood.intensity / acc[key].count;
      return acc;
    }, {} as Record<string, { 
      count: number; 
      totalIntensity: number; 
      mood: Mood; 
      userId: string;
      isCurrentUser: boolean;
    }>)
  ).map(([_, stats]) => ({
    mood: stats.mood,
    count: stats.count,
    avgIntensity: Math.round(stats.totalIntensity / stats.count),
    score: Math.round((stats.totalIntensity / stats.count) * stats.count),
    isCurrentUser: stats.isCurrentUser
  })).sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Statistiche Emozioni</h2>
      
      <div className="h-64 sm:h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={moodStats}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barGap={8}
          >
            <XAxis 
              dataKey="mood"
              tick={({ x, y, payload }) => {
                const mood = payload.value as Mood;
                return (
                  <g transform={`translate(${x},${y + 10})`}>
                    <g transform="translate(-12,-12)">
                      {moodIcons[mood]}
                    </g>
                  </g>
                );
              }}
              interval={0}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              label={{ 
                value: 'Punteggio', 
                angle: -90, 
                position: 'insideLeft',
                style: { fontSize: '12px' }
              }}
            />
            <Tooltip
              content={({ payload, label }) => {
                if (payload && payload[0]) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-3 shadow-lg rounded-lg border">
                      <div className="flex items-center gap-2 mb-1">
                        {moodIcons[data.mood]}
                        <span className="capitalize font-medium">
                          {data.mood}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{data.isCurrentUser ? 'Tu' : 'Partner'}</span>
                        </div>
                        <p>Registrato: {data.count} volte</p>
                        <p>Intensità media: {data.avgIntensity}/10</p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
  dataKey="score"
  radius={[4, 4, 0, 0]}
  maxBarSize={50}
>
  {moodStats.map((entry, index) => (
    <Cell 
      key={`cell-${index}`} 
      fill={entry.isCurrentUser ? moodColors[entry.mood] : `${moodColors[entry.mood]}80`}
      stroke={entry.isCurrentUser ? moodColors[entry.mood] : 'none'}
      strokeWidth={2}
    />
  ))}
</Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-gray-50 p-3 rounded-xl">
          <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">
            Emozione più frequente
          </h3>
          {moodStats.length > 0 && (
            <div className="flex items-center gap-2">
              {moodIcons[moodStats[0].mood]}
              <div className="flex flex-col">
                <span className="capitalize text-sm sm:text-base">
                  {moodStats[0].mood} ({moodStats[0].count} volte)
                </span>
                <span className="text-xs text-gray-500">
                  {moodStats[0].isCurrentUser ? 'Tu' : 'Partner'}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="bg-gray-50 p-3 rounded-xl">
          <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">
            Intensità Media Totale
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-xl sm:text-2xl font-semibold text-indigo-600">
              {moodStats.length > 0
                ? Math.round(
                    moodStats.reduce((acc, stat) => acc + stat.avgIntensity, 0) / 
                    moodStats.length
                  )
                : 0}
              /10
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                <span>Tu</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-600/50 rounded-full"></div>
                <span>Partner</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}