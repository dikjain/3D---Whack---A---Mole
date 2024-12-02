import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ParticleProps } from '../types/game';

export const Particles: React.FC<{ particles: ParticleProps[] }> = ({ particles }) => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    particles.forEach((particle, i) => {
      const element = document.createElement('div');
      element.className = 'absolute w-2 h-2 rounded-full';
      element.style.backgroundColor = particle.color;
      element.style.left = `${particle.x}px`;
      element.style.top = `${particle.y}px`;
      particlesRef.current?.appendChild(element);

      gsap.to(element, {
        x: (Math.random() - 0.5) * 100,
        y: -100 - Math.random() * 50,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => element.remove()
      });
    });
  }, [particles]);

  return <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />;
};

