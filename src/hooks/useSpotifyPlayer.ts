import { useEffect, useState } from 'react';
import { useSpotifyStore } from '../store/useSpotifyStore';
import type { Spotify } from '@spotify/web-playback-sdk-dom-types';

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: typeof Spotify;
  }
}

export const useSpotifyPlayer = () => {
  const { auth, setCurrentTrack } = useSpotifyStore();
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!auth.accessToken) return;

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Lyrics Visualizer',
        getOAuthToken: cb => cb(auth.accessToken!),
        volume: 0.5
      });

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setIsReady(true);
      });

      player.addListener('player_state_changed', state => {
        if (!state) return;

        setCurrentTrack({
          id: state.track_window.current_track.id,
          name: state.track_window.current_track.name,
          artist: state.track_window.current_track.artists[0].name,
          duration: state.duration,
          progress: state.position,
          isPlaying: !state.paused
        });
      });

      player.connect();
      setPlayer(player);
    };

    return () => {
      player?.disconnect();
      document.body.removeChild(script);
    };
  }, [auth.accessToken, setCurrentTrack]);

  return { player, isReady };
};