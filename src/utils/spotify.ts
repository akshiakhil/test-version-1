import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const SCOPES = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
];

// Create state parameter for CSRF protection
const generateRandomString = (length: number) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

export const spotifyApi = SpotifyApi.withUserAuthorization(
  CLIENT_ID,
  REDIRECT_URI,
  SCOPES
);

export const getAuthUrl = () => {
  const state = generateRandomString(16);
  sessionStorage.setItem('spotify_auth_state', state);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'token',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES.join(' '),
    state: state,
    show_dialog: 'true'
  });
  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const handleAuthCallback = () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  
  const state = params.get('state');
  const storedState = sessionStorage.getItem('spotify_auth_state');
  
  if (!state || state !== storedState) {
    throw new Error('State mismatch! Possible CSRF attack.');
  }
  
  sessionStorage.removeItem('spotify_auth_state');
  
  const accessToken = params.get('access_token');
  const expiresIn = params.get('expires_in');

  if (accessToken && expiresIn) {
    const expiresAt = Date.now() + parseInt(expiresIn) * 1000;
    return { accessToken, expiresAt };
  }
  return null;
};