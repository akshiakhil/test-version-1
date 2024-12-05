import React from 'react';
import { Music2 } from 'lucide-react';
import { getAuthUrl } from '../../utils/auth';

export const LoginButton: React.FC = () => {
  return (
    <a
      href={getAuthUrl()}
      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
    >
      <Music2 size={24} />
      Connect with Spotify
    </a>
  );
};