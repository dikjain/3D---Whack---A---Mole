import React, { useRef, useEffect, useState } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { Stars } from '@react-three/drei';

interface Mole3DProps {
  position: [number, number, number];
  isActive: boolean;
  onWhack: () => void;
  combo: number;
}

export const Mole3D: React.FC<Mole3DProps> = ({ position, isActive, onWhack, combo }) => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const [isStunned, setIsStunned] = useState(false);
  const [particles, setParticles] = useState<THREE.Points>();
  const [x, y, z] = position;

  const { moleY, scale, rotation } = useSpring({
    moleY: isActive ? 1.2 : -1.2,
    scale: isStunned ? [1.2, 0.8, 1.2] : [1, 1, 1],
    rotation: isStunned ? [0, 0, THREE.MathUtils.degToRad(15)] : [0, 0, 0],
    config: {
      mass: 1,
      tension: isStunned ? 200 : 180,
      friction: isStunned ? 5 : 12
    }
  });

  const [idleAnim, setIdleAnim] = useState(0);
  useFrame((state) => {
    if (isActive && !isStunned && groupRef.current) {
      setIdleAnim(state.clock.elapsedTime);
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 4) * 0.05;
    }
  });

  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.position.set(x, 0, z);
  }, [x, z]);

  const createParticles = () => {
    const geometry = new THREE.BufferGeometry();
    const particleCount = 80;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.8;
      positions[i * 3 + 1] = Math.random() * 0.8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.8;

      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random() * 0.5;
      colors[i * 3 + 2] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
    });

    return new THREE.Points(geometry, material);
  };

  const handleWhack = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (!isActive || isStunned) return;
    
    setIsStunned(true);
    onWhack();

    const newParticles = createParticles();
    setParticles(newParticles);

    setTimeout(() => {
      setIsStunned(false);
      setParticles(undefined);
    }, 500);
  };

  useFrame((state, delta) => {
    if (particles) {
      particles.rotation.y += delta * 3;
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += delta * 1.5;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      const material = particles.material as THREE.PointsMaterial;
      material.opacity = Math.max(0, material.opacity - delta * 2);
    }

    if (isStunned && groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 20) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <group position={[0, -0.25, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[0.6, 0.7, 0.6, 32]} />
          <meshStandardMaterial color="#1a1209" />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.65, 0.65, 0.2, 32]} />
          <meshStandardMaterial color="#0a0705" />
        </mesh>
      </group>

      <animated.group 
        position-y={moleY} 
        scale={scale}
        rotation={rotation}
        onClick={handleWhack}
      >
        <group>
          <mesh castShadow>
            <capsuleGeometry args={[0.5, 1, 32]} />
            <meshStandardMaterial 
              color="#6B4423"
              roughness={0.8}
              metalness={0.2}
              emissive={isStunned ? "#ff0000" : "#000000"}
              emissiveIntensity={isStunned ? 0.5 : 0}
            />
          </mesh>

          <mesh position={[0, -0.2, 0.25]} castShadow>
            <sphereGeometry args={[0.35, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial color="#8B6B42" />
          </mesh>

          <group position={[0, 0.4, 0.35]}>
            <group position={[-0.2, 0, 0]}>
              <mesh>
                <sphereGeometry args={[0.12]} />
                <meshStandardMaterial color="white" />
              </mesh>
              <mesh position={[0, 0, 0.08]}>
                <sphereGeometry args={[0.08]} />
                <meshStandardMaterial color={isStunned ? "#ff0000" : "black"} />
              </mesh>
            </group>
            <group position={[0.2, 0, 0]}>
              <mesh>
                <sphereGeometry args={[0.12]} />
                <meshStandardMaterial color="white" />
              </mesh>
              <mesh position={[0, 0, 0.08]}>
                <sphereGeometry args={[0.08]} />
                <meshStandardMaterial color={isStunned ? "#ff0000" : "black"} />
              </mesh>
            </group>
          </group>

          <mesh position={[0, 0.25, 0.45]}>
            <sphereGeometry args={[0.15]} />
            <meshStandardMaterial color="#1a1209" roughness={0.5} />
          </mesh>

          {[[-1, 1], [-0.5, 0], [-1, -1], [1, 1], [0.5, 0], [1, -1]].map(([x, y], i) => (
            <mesh key={i} position={[x * 0.2, 0.25 + y * 0.1, 0.4]} rotation={[0, 0, x * 0.2]}>
              <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
              <meshStandardMaterial color="#2a2a2a" />
            </mesh>
          ))}

          {[-0.3, 0.3].map((x, i) => (
            <group key={i} position={[x, 0.7, 0]} rotation={[0.2, x > 0 ? 0.5 : -0.5, 0]}>
              <mesh castShadow>
                <capsuleGeometry args={[0.15, 0.3, 16]} />
                <meshStandardMaterial color="#5B3213" />
              </mesh>
              <mesh position={[0, 0.2, 0]} scale={0.8}>
                <capsuleGeometry args={[0.12, 0.2, 16]} />
                <meshStandardMaterial color="#8B5B23" />
              </mesh>
            </group>
          ))}
        </group>

        {isStunned && (
          <Stars
            radius={0.8}
            depth={0.3}
            count={30}
            factor={2}
            saturation={1}
            fade
            speed={2}
          />
        )}

        {combo > 1 && (
          <sprite position={[0, 1.5, 0]} scale={[1.5, 0.75, 1]}>
            <spriteMaterial attach="material" color="#ffd700">
              <canvasTexture attach="map" image={createComboTexture(combo)} />
            </spriteMaterial>
          </sprite>
        )}

        {particles && <primitive object={particles} />}
      </animated.group>
    </group>
  );
};

function createComboTexture(combo: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, '#ffd700');
  gradient.addColorStop(1, '#ff8c00');

  ctx.fillStyle = gradient;
  ctx.font = 'bold 64px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  ctx.shadowColor = '#ffd700';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  
  ctx.fillText(`${combo}x`, canvas.width / 2, canvas.height / 2);

  return canvas;
}


