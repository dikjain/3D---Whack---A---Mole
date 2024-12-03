import React from 'react';
import { Mole3D } from './Mole3D';
import { GameState } from '../types/game';
import { DIFFICULTY_LEVELS } from '../utils/constants';

interface GameBoard3DProps {
  gameState: GameState;
  onWhack: (position: number) => void;
}

export const GameBoard3D: React.FC<GameBoard3DProps> = ({ gameState, onWhack }) => {
  const gridSize = DIFFICULTY_LEVELS[gameState.difficulty].gridSize;
  const offset = (gridSize - 1) / 2;

  // Define colors based on difficulty
  const difficultyColors = {
    EASY: '#8B4513', // SaddleBrown
    MEDIUM: '#A0522D', // Sienna
    HARD: '#D2691E', // Chocolate
  };

  // Get the color for the current difficulty
  const boardColor = difficultyColors[gameState.difficulty as keyof typeof difficultyColors] || '#8B4513';

  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, -0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[gridSize * 2 + 1, 0.5, gridSize * 2 + 1]} />
        <meshStandardMaterial color={boardColor} />
      </mesh>

      {gameState.activeMoles.map((isActive, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        const x = (col - offset) * 2;
        const z = (row - offset) * 2;

        return (
          <Mole3D
            key={index}
            position={[x, 0, z]}
            isActive={isActive}
            onWhack={() => onWhack(index)}
            combo={gameState.combo}
            difficulty={gameState.difficulty}
          />
        );
      })}
    </group>
  );
};
