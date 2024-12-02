import React from 'react';
import { Mole3D } from './Mole3D';
import { GameState } from '../types/game';
import { GRID_SIZE } from '../utils/constants';

interface GameBoard3DProps {
  gameState: GameState;
  onWhack: (position: number) => void;
}

export const GameBoard3D: React.FC<GameBoard3DProps> = ({ gameState, onWhack }) => {
  const offset = (GRID_SIZE - 1) / 2;

  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, -0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[GRID_SIZE * 2 + 1, 0.5, GRID_SIZE * 2 + 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {gameState.activeMoles.map((isActive, index) => {
        const row = Math.floor(index / GRID_SIZE);
        const col = index % GRID_SIZE;
        const x = (col - offset) * 2;
        const z = (row - offset) * 2;

        return (
          <Mole3D
            key={index}
            position={[x, 0, z]}
            isActive={isActive}
            onWhack={() => onWhack(index)}
            combo={gameState.combo}
          />
        );
      })}
    </group>
  );
};