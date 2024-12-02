import React from 'react';
import { Mole } from './Mole';
import { GameState } from '../types/game';
import { GRID_SIZE } from '../utils/constants';

interface GameBoardProps {
  gameState: GameState;
  onWhack: (position: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState, onWhack }) => {
  return (
    <div className="relative">
      <div 
        className="grid gap-4 p-8 bg-gradient-to-b from-green-800 to-green-900 rounded-xl shadow-2xl transform rotate-x-10"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          perspective: '1000px',
        }}
      >
        {gameState.activeMoles.map((isActive, index) => (
          <div key={index} className="flex items-center justify-center">
            <Mole
              isActive={isActive}
              position={index}
              onWhack={onWhack}
              combo={gameState.combo}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-black/10 -z-10 blur-lg rounded-xl transform translate-y-4 scale-90" />
    </div>
  );
}