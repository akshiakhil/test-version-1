import React from 'react';

interface Props {
  progress: number;
  duration: number;
}

export const ProgressBar: React.FC<Props> = ({ progress, duration }) => {
  const progressPercentage = (progress / duration) * 100;

  return (
    <div className="w-full bg-gray-700 rounded-full h-1">
      <div
        className="bg-blue-400 h-1 rounded-full transition-all duration-300"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};