import React from 'react';
import MoodEntry from './components/MoodEntry';
import MoodStats from './components/MoodStats';
import ActivitySuggestions from './components/ActivitySuggestions';
import AuthForm from './components/AuthForm';
import { Heart } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './lib/firebase';
import { signOut } from 'firebase/auth';

function App() {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-md w-full">
          <div className="text-center mb-8">
            <Heart className="w-12 h-12 text-pink-500 mx-auto" />
            <h1 className="text-2xl font-bold text-gray-900 mt-4">Mood Together</h1>
            <p className="text-gray-600 mt-2">Connettiti con il tuo partner</p>
          </div>
          <AuthForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-7 h-7 text-pink-500" />
              <h1 className="text-xl font-bold text-gray-900">Mood Together</h1>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 hidden sm:inline">{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Esci
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <MoodEntry />
            <ActivitySuggestions />
          </div>
          <div>
            <MoodStats />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;