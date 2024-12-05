import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface Props {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const PlayerControls: React.FC<Props> = ({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="flex items-center gap-4">
      <button 
        onClick={onPrevious}
        className="p-2 hover:text-blue-400 transition-colors"
      >
        <SkipBack size={24} />
      </button>
      <button 
        onClick={onPlayPause}
        className="p-2 hover:text-blue-400 transition-colors"
      >
        {isPlaying ? (
          <Pause size={32} />
        ) : (
          <Play size={32} />
        )}
      </button>
      <button 
        onClick={onNext}
        className="p-2 hover:text-blue-400 transition-colors"
      >
        <SkipForward size={24} />
      </button>
    </div>
  );
};