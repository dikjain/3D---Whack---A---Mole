import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { GameBoard3D } from './GameBoard3D';
import { GameState } from '../types/game';

interface Game3DProps {
  gameState: GameState;
  onWhack: (position: number) => void;
}

export const Game3D: React.FC<Game3DProps> = ({ gameState, onWhack }) => {
  const controlsRef = useRef(null);

  return (
    <div className="w-full h-[800px] rounded-xl overflow-hidden">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 12, 15]} />
        <OrbitControls
          ref={controlsRef}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.5}
          minDistance={10}
          maxDistance={20}
          enablePan={false}
        />
        
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        <GameBoard3D gameState={gameState} onWhack={onWhack} />
        
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -0.5, 0]}
          receiveShadow
        >
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color="#2d5a27" />
        </mesh>
        
        <fog attach="fog" args={['#90c8f0', 20, 35]} />

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}



