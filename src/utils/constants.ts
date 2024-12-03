export const GAME_DURATION = 30;

export const DIFFICULTY_LEVELS = {
  EASY: { spawnRate: 1200, despawnRate: 1500, gridSize: 3, moleCount: 9 },
  MEDIUM: { spawnRate: 1000, despawnRate: 1300, gridSize: 4, moleCount: 16 },
  HARD: { spawnRate: 800, despawnRate: 1100, gridSize: 5, moleCount: 25 }
} as const;

export type DifficultyLevel = keyof typeof DIFFICULTY_LEVELS;