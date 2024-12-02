import React from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import { Game3D } from './components/Game3D';
import { GameStats } from './components/GameStats';
import { Play } from 'lucide-react';

function App() {
  const { gameState, startGame, whackMole } = useGameLogic();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        3D Whack-a-Mole
      </h1>

      <GameStats
        score={gameState.score}
        highScore={gameState.highScore}
        timeLeft={gameState.timeLeft}
      />

      {!gameState.isPlaying && (
        <button
          onClick={startGame}
          className="mb-8 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-full flex items-center space-x-2 transform transition hover:scale-105"
        >
          <Play className="w-5 h-5" />
          <span>{gameState.score > 0 ? 'Play Again' : 'Start Game'}</span>
        </button>
      )}

      <Game3D
        gameState={gameState}
        onWhack={whackMole}
      />

      {!gameState.isPlaying && gameState.score > 0 && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
          <p className="text-gray-400">Final Score: {gameState.score}</p>
          {gameState.score === gameState.highScore && gameState.score > 0 && (
            <p className="text-yellow-400 mt-2">New High Score! 🎉</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;