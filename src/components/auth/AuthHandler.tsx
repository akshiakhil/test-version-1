import React, { useEffect } from 'react';
import { useSpotifyStore } from '../../store/useSpotifyStore';
import {
  getStoredAuthState,
  clearAuthState,
  saveAuth,
  clearAuth,
} from '../../utils/auth';

export const AuthHandler: React.FC = () => {
  const { setAuth } = useSpotifyStore();

  useEffect(() => {
    const handleCallback = () => {
      try {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const state = params.get('state');
        const storedState = getStoredAuthState();
        const accessToken = params.get('access_token');
        const expiresIn = params.get('expires_in');

        if (!state || !storedState || state !== storedState) {
          throw new Error('Invalid state parameter. Please try again.');
        }

        if (!accessToken || !expiresIn) {
          throw new Error('Authentication failed. Required parameters missing.');
        }

        const auth = {
          accessToken,
          expiresAt: Date.now() + (parseInt(expiresIn, 10) * 1000),
        };

        saveAuth(auth);
        setAuth(auth);
        clearAuthState();
        
        // Clean up the URL without triggering a page reload
        const cleanUrl = window.location.href.split('#')[0];
        window.history.replaceState({}, document.title, cleanUrl);
      } catch (error) {
        console.error('Authentication error:', error);
        clearAuth();
        clearAuthState();
        throw error;
      }
    };

    if (window.location.hash) {
      handleCallback();
    }
  }, [setAuth]);

  return null;
};