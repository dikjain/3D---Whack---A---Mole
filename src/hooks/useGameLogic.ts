import { useState, useEffect, useCallback } from 'react';
import { GameState } from '../types/game';
import { GAME_DURATION, MOLE_COUNT, DIFFICULTY_LEVELS } from '../utils/constants';

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    timeLeft: GAME_DURATION,
    highScore: 0,
    isPlaying: false,
    activeMoles: new Array(MOLE_COUNT).fill(false),
    combo: 0,
    difficulty: 'MEDIUM',
    lastWhackTime: 0,
  });

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      score: 0,
      timeLeft: GAME_DURATION,
      isPlaying: true,
      activeMoles: new Array(MOLE_COUNT).fill(false),
      combo: 0,
      lastWhackTime: Date.now(),
    }));
  }, []);

  const endGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      highScore: Math.max(prev.highScore, prev.score),
    }));
  }, []);

  const whackMole = useCallback((position: number) => {
    setGameState(prev => {
      if (!prev.activeMoles[position] || !prev.isPlaying) return prev;
      
      const currentTime = Date.now();
      const timeDiff = currentTime - prev.lastWhackTime;
      const newCombo = timeDiff < 1000 ? prev.combo + 1 : 1;
      const comboMultiplier = Math.min(newCombo, 5);
      
      const newActiveMoles = [...prev.activeMoles];
      newActiveMoles[position] = false;
      
      return {
        ...prev,
        score: prev.score + (10 * comboMultiplier),
        activeMoles: newActiveMoles,
        combo: newCombo,
        lastWhackTime: currentTime,
      };
    });
  }, []);

  useEffect(() => {
    if (!gameState.isPlaying) return;

    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        timeLeft: prev.timeLeft - 1,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.isPlaying]);

  useEffect(() => {
    if (gameState.timeLeft <= 0 && gameState.isPlaying) {
      endGame();
    }
  }, [gameState.timeLeft, gameState.isPlaying, endGame]);

  useEffect(() => {
    if (!gameState.isPlaying) return;

    const { spawnRate, despawnRate } = DIFFICULTY_LEVELS[gameState.difficulty];

    const spawnMole = () => {
      setGameState(prev => {
        const newActiveMoles = [...prev.activeMoles];
        const availableHoles = newActiveMoles
          .map((active, index) => ({ active, index }))
          .filter(hole => !hole.active)
          .map(hole => hole.index);

        if (availableHoles.length === 0) return prev;

        const randomHole = availableHoles[Math.floor(Math.random() * availableHoles.length)];
        newActiveMoles[randomHole] = true;

        return {
          ...prev,
          activeMoles: newActiveMoles,
        };
      });
    };

    const spawnInterval = setInterval(spawnMole, spawnRate);
    const despawnInterval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        activeMoles: prev.activeMoles.map((active) => 
          active ? Math.random() > 0.5 : false
        ),
        combo: 0,
      }));
    }, despawnRate);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(despawnInterval);
    };
  }, [gameState.isPlaying, gameState.difficulty]);

  return {
    gameState,
    startGame,
    whackMole,
  };
};


