export interface SpotifyAuth {
  accessToken: string | null;
  expiresAt: number | null;
}

export interface CurrentTrack {
  id: string;
  name: string;
  artist: string;
  duration: number;
  progress: number;
  isPlaying: boolean;
}

export interface LyricWord {
  startTime: number;
  endTime: number;
  text: string;
}

export interface LyricLine {
  startTime: number;
  endTime: number;
  words: LyricWord[];
  text: string;
}