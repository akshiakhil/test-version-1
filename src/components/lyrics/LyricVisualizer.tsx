import React, { useEffect, useRef } from 'react';
import { LyricLine as LyricLineComponent } from './LyricLine';
import type { LyricLine } from '../../types/spotify';

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

        return (
          <div
            key={index}
            ref={isCurrent ? containerRef : null}
          >
            <LyricLineComponent
              words={line.words}
              currentTime={currentTime}
              isCurrent={isCurrent}
              isPast={isPast}
            />
          </div>
        );
      })}
    </div>
  );
};