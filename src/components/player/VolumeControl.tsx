import React from 'react';
import { Volume2 } from 'lucide-react';

interface Props {
  onVolumeChange: (volume: number) => void;
}

export const VolumeControl: React.FC<Props> = ({ onVolumeChange }) => {
  return (
    <div className="flex items-center gap-2">
      <Volume2 size={20} />
      <input
        type="range"
        min="0"
        max="100"
        className="w-24 h-1 bg-gray-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-400"
        onChange={(e) => onVolumeChange(parseInt(e.target.value) / 100)}
      />
    </div>
  );
};