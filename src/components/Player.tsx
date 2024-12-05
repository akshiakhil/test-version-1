import React, { useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useSpotifyStore } from '../store/useSpotifyStore';
import { useSpotifyPlayer } from '../hooks/useSpotifyPlayer';

export const Player: React.FC = () => {
  const currentTrack = useSpotifyStore((state) => state.currentTrack);
  const { player, isReady } = useSpotifyPlayer();

  const handlePlayPause = useCallback(() => {
    if (!player) return;
    player.togglePlay();
  }, [player]);

  const handlePrevious = useCallback(() => {
    if (!player) return;
    player.previousTrack();
  }, [player]);

  const handleNext = useCallback(() => {
    if (!player) return;
    player.nextTrack();
  }, [player]);

  if (!currentTrack || !isReady) return null;

  const progress = (currentTrack.progress / currentTrack.duration) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 text-white p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{currentTrack.name}</h3>
            <p className="text-gray-400">{currentTrack.artist}</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrevious}
              className="p-2 hover:text-blue-400 transition-colors"
            >
              <SkipBack size={24} />
            </button>
            <button 
              onClick={handlePlayPause}
              className="p-2 hover:text-blue-400 transition-colors"
            >
              {currentTrack.isPlaying ? (
                <Pause size={32} />
              ) : (
                <Play size={32} />
              )}
            </button>
            <button 
              onClick={handleNext}
              className="p-2 hover:text-blue-400 transition-colors"
            >
              <SkipForward size={24} />
            </button>
            <div className="flex items-center gap-2">
              <Volume2 size={20} />
              <input
                type="range"
                min="0"
                max="100"
                className="w-24 h-1 bg-gray-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-400"
                onChange={(e) => player?.setVolume(parseInt(e.target.value) / 100)}
              />
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1">
          <div
            className="bg-blue-400 h-1 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};