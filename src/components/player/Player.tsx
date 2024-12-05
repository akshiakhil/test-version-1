import React, { useCallback } from 'react';
import { useSpotifyStore } from '../../store/useSpotifyStore';
import { useSpotifyPlayer } from '../../hooks/useSpotifyPlayer';
import { PlayerControls } from './PlayerControls';
import { VolumeControl } from './VolumeControl';
import { ProgressBar } from './ProgressBar';

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

  const handleVolumeChange = useCallback((volume: number) => {
    if (!player) return;
    player.setVolume(volume);
  }, [player]);

  if (!currentTrack || !isReady) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 text-white p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{currentTrack.name}</h3>
            <p className="text-gray-400">{currentTrack.artist}</p>
          </div>
          <div className="flex items-center gap-4">
            <PlayerControls
              isPlaying={currentTrack.isPlaying}
              onPlayPause={handlePlayPause}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
            <VolumeControl onVolumeChange={handleVolumeChange} />
          </div>
        </div>
        <ProgressBar
          progress={currentTrack.progress}
          duration={currentTrack.duration}
        />
      </div>
    </div>
  );
};