import React from 'react';
import { useSpotifyStore } from '../store/useSpotifyStore';
import { useLyrics } from '../hooks/useLyrics';
import { LyricVisualizer } from './lyrics/LyricVisualizer';
import { Player } from './player/Player';

export const MainView: React.FC = () => {
  const currentTrack = useSpotifyStore((state) => state.currentTrack);
  const { lyrics, isLoading, error } = useLyrics(currentTrack?.id ?? null);

  if (!currentTrack) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <p className="text-gray-400">No track is currently playing</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <p className="text-gray-400">Loading lyrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <LyricVisualizer lyrics={lyrics} currentTime={currentTrack.progress} />
      <Player />
    </div>
  );
};