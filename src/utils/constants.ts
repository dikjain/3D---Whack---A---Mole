export const GAME_DURATION = 30;
export const MOLE_COUNT = 9;
export const GRID_SIZE = 3;
export const DIFFICULTY_LEVELS = {
  EASY: { spawnRate: 1200, despawnRate: 1500 },
  MEDIUM: { spawnRate: 1000, despawnRate: 1300 },
  HARD: { spawnRate: 800, despawnRate: 1100 }
} as const;

export type DifficultyLevel = keyof typeof DIFFICULTY_LEVELS;