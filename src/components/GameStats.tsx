import React from 'react';
import { Timer, Trophy } from 'lucide-react';

interface GameStatsProps {
  score: number;
  highScore: number;
  timeLeft: number;
}

export const GameStats: React.FC<GameStatsProps> = ({ score, highScore, timeLeft }) => {
  return (
    <div className="flex justify-between items-center w-full max-w-md mb-8 px-4">
      <div className="flex items-center space-x-2">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <div>
          <p className="text-sm text-gray-400">High Score</p>
          <p className="text-2xl font-bold">{highScore}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Timer className="w-6 h-6 text-blue-400" />
        <div>
          <p className="text-sm text-gray-400">Time Left</p>
          <p className="text-2xl font-bold">{timeLeft}s</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-400">Score</p>
        <p className="text-2xl font-bold">{score}</p>
      </div>
    </div>
  );
};
