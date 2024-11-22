import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../lib/firebase';
import type { MoodEntry, Mood } from '../types';

export function useMoods() {
  const [user] = useAuthState(auth);
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'moods'),
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMoods = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MoodEntry[];
      
      setMoods(newMoods);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addMood = async (mood: Mood, intensity: number, note: string) => {
    if (!user) return;

    await addDoc(collection(db, 'moods'), {
      userId: user.uid,
      mood,
      intensity,
      note,
      timestamp: serverTimestamp(),
    });
  };

  return { moods, loading, addMood };
}