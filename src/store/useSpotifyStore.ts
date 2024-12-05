import { create } from 'zustand';
import type { SpotifyAuth, CurrentTrack } from '../types/spotify';

interface SpotifyStore {
  auth: SpotifyAuth;
  currentTrack: CurrentTrack | null;
  setAuth: (auth: SpotifyAuth) => void;
  setCurrentTrack: (track: CurrentTrack) => void;
  clearAuth: () => void;
}

export const useSpotifyStore = create<SpotifyStore>((set) => ({
  auth: {
    accessToken: null,
    expiresAt: null,
  },
  currentTrack: null,
  setAuth: (auth) => set({ auth }),
  setCurrentTrack: (track) => set({ currentTrack: track }),
  clearAuth: () => set({
    auth: { accessToken: null, expiresAt: null },
    currentTrack: null,
  }),
}));