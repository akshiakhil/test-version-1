import { SpotifyAuth } from '../types/spotify';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const AUTH_STATE_KEY = 'spotify_auth_state';
const AUTH_STORAGE_KEY = 'spotify_auth';

export const SPOTIFY_SCOPES = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'user-read-email',
  'user-read-private'
];

export const generateAuthState = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const saveAuthState = (state: string): void => {
  sessionStorage.setItem(AUTH_STATE_KEY, state);
};

export const getStoredAuthState = (): string | null => {
  return sessionStorage.getItem(AUTH_STATE_KEY);
};

export const clearAuthState = (): void => {
  sessionStorage.removeItem(AUTH_STATE_KEY);
};

export const getAuthUrl = (): string => {
  const state = generateAuthState();
  saveAuthState(state);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'token',
    redirect_uri: REDIRECT_URI,
    scope: SPOTIFY_SCOPES.join(' '),
    state: state,
    show_dialog: 'true',
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const saveAuth = (auth: SpotifyAuth): void => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
};

export const loadAuth = (): SpotifyAuth | null => {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) return null;

  try {
    const auth = JSON.parse(stored) as SpotifyAuth;
    if (auth.expiresAt && auth.expiresAt < Date.now()) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
    return auth;
  } catch (error) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

export const clearAuth = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};