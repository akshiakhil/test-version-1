import React, { useEffect, useRef } from 'react';
import { useSpotifyStore } from '../store/useSpotifyStore';
import type { LyricLine } from '../types/spotify';

interface Props {
  lyrics: LyricLine[];
  currentTime: number;
}

export const LyricVisualizer: React.FC<Props> = ({ lyrics, currentTime }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentLine = lyrics.find(
    line => currentTime >= line.startTime && currentTime <= line.endTime
  );

  useEffect(() => {
    if (containerRef.current && currentLine) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentLine]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {lyrics.map((line, index) => {
        const isCurrent = line === currentLine;
        const isPast = currentTime > line.endTime;
        const isFuture = currentTime < line.startTime;

        return (
          <div
            key={index}
            ref={isCurrent ? containerRef : null}
            className={`transition-all duration-300 ${
              isCurrent
                ? 'text-white scale-110'
                : isPast
                ? 'text-gray-500'
                : 'text-gray-400 opacity-50'
            }`}
          >
            <p className="text-2xl font-medium text-center">
              {line.words.map((word, wordIndex) => (
                <span
                  key={wordIndex}
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
          </div>
        );
      })}
    </div>
  );
};