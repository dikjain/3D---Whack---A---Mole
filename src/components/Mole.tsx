import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { MoleProps } from '../types/game';

export const Mole: React.FC<MoleProps> = ({ isActive, position, onWhack, combo }) => {
  const moleRef = useRef<HTMLDivElement>(null);
  const [isWhacked, setIsWhacked] = useState(false);

  useEffect(() => {
    if (!moleRef.current) return;

    if (isActive && !isWhacked) {
      gsap.set(moleRef.current, {
        y: 100,
        rotationX: 45,
      });
      
      gsap.to(moleRef.current, {
        y: 0,
        rotationX: 0,
        duration: 0.4,
        ease: 'back.out(1.2)',
      });
    } else {
      gsap.to(moleRef.current, {
        y: 100,
        rotationX: 45,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setIsWhacked(false);
        }
      });
    }
  }, [isActive, isWhacked]);

  const handleWhack = () => {
    if (!isActive || isWhacked) return;
    setIsWhacked(true);
    onWhack(position);

    gsap.to(moleRef.current, {
      scaleX: 1.2,
      scaleY: 0.8,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
  };

  return (
    <div className="relative w-24 h-24 perspective-500">
      <div className="absolute bottom-0 w-full h-full overflow-hidden">
        <div className="absolute bottom-0 w-full">
          <div className="absolute -bottom-1 w-full h-4 bg-black/30 rounded-full blur-sm transform scale-x-75" />
          
          <div className="relative w-full h-8 overflow-hidden">
            <div className="absolute inset-0 bg-black/80 rounded-[50%]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent rounded-[50%]" />
          </div>
        </div>

        <div
          ref={moleRef}
          className="absolute bottom-4 w-full h-20 cursor-pointer transform-gpu"
          onClick={handleWhack}
          style={{ transform: 'translateY(100%)' }}
        >
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 w-full h-full bg-gradient-to-b from-[#8B4513] to-[#654321] rounded-[50%]">
              <div className="absolute top-[20%] left-0 w-full flex justify-center items-center">
                <div className="flex space-x-3">
                  <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                  <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                </div>
              </div>
              <div className="absolute top-[45%] left-[50%] transform -translate-x-1/2 w-3 h-2 bg-black rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {combo > 1 && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-yellow-400 font-bold text-xl">
          {combo}x
        </div>
      )}
    </div>
  );
};
