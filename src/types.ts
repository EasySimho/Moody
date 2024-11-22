export type Mood = 'felice' | 'triste' | 'stressato' | 'energico' | 'calmo' | 'arrabbiato' | 'amato';

export interface MoodEntry {
  id: string;
  userId: string;
  mood: Mood;
  intensity: number;
  note?: string;
  timestamp: string | number | Date;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  partnerId: string;
}