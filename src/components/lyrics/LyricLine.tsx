import React from 'react';
import { LyricWord } from '../../types/spotify';

interface Props {
  words: LyricWord[];
  currentTime: number;
  isCurrent: boolean;
  isPast: boolean;
}

export const LyricLine: React.FC<Props> = ({
  words,
  currentTime,
  isCurrent,
  isPast,
}) => {
  return (
    <p className={`text-2xl font-medium text-center transition-all duration-300 ${
      isCurrent ? 'text-white scale-110' : isPast ? 'text-gray-500' : 'text-gray-400 opacity-50'
    }`}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block transition-colors duration-200 ${
            isCurrent &&
            currentTime >= word.startTime &&
            currentTime <= word.endTime
              ? 'text-blue-400'
              : ''
          }`}
        >
          {word.text}{' '}
        </span>
      ))}
    </p>
  );
};