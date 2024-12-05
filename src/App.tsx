import React, { useEffect } from 'react';
import { Music2, AlertCircle } from 'lucide-react';
import { useSpotifyStore } from './store/useSpotifyStore';
import { MainView } from './components/MainView';
import { LoginButton } from './components/auth/LoginButton';
import { AuthHandler } from './components/auth/AuthHandler';
import { loadAuth } from './utils/auth';

function App() {
  const { auth, setAuth, clearAuth } = useSpotifyStore();

  useEffect(() => {
    const savedAuth = loadAuth();
    if (savedAuth) {
      setAuth(savedAuth);
    }
  }, [setAuth]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AuthHandler />
      
      <header className="fixed top-0 left-0 right-0 bg-black/90 p-4 z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music2 size={24} className="text-green-500" />
            <h1 className="text-xl font-bold">Lyrics Visualizer</h1>
          </div>
          {auth.accessToken && (
            <button
              onClick={clearAuth}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Disconnect
            </button>
          )}
        </div>
      </header>

      <main className="pt-20 pb-32">
        {!auth.accessToken ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-8">Spotify Lyrics Visualizer</h1>
              <LoginButton />
            </div>
          </div>
        ) : (
          <MainView />
        )}
      </main>
    </div>
  );
}

export default App;