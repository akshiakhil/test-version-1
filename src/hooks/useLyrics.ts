import { useState, useEffect } from 'react';
import type { LyricLine } from '../types/spotify';

export const useLyrics = (trackId: string | null) => {
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!trackId) return;

    const fetchLyrics = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Mock lyrics data for demonstration
        // In a real implementation, you would fetch this from a lyrics API
        const mockLyrics: LyricLine[] = [
          {
            startTime: 0,
            endTime: 5000,
            text: "Welcome to the lyrics visualizer",
            words: [
              { startTime: 0, endTime: 1000, text: "Welcome" },
              { startTime: 1000, endTime: 2000, text: "to" },
              { startTime: 2000, endTime: 3000, text: "the" },
              { startTime: 3000, endTime: 4000, text: "lyrics" },
              { startTime: 4000, endTime: 5000, text: "visualizer" }
            ]
          }
        ];
        
        setLyrics(mockLyrics);
      } catch (err) {
        setError('Failed to load lyrics');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLyrics();
  }, [trackId]);

  return { lyrics, isLoading, error };
};