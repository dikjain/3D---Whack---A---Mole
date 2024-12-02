export interface GameState {
  score: number;
  timeLeft: number;
  highScore: number;
  isPlaying: boolean;
  activeMoles: boolean[];
  combo: number;
  difficulty: DifficultyLevel;
  lastWhackTime: number;
}

export interface MoleProps {
  isActive: boolean;
  position: number;
  onWhack: (position: number) => void;
  combo: number;
}

export interface ParticleProps {
  x: number;
  y: number;
  color: string;
}

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';