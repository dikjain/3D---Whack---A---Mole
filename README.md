# 3D Whack-a-Mole Game

A modern, interactive 3D Whack-a-Mole game built with React, Three.js, and TypeScript. This project showcases advanced 3D graphics, animations, and game mechanics while maintaining a fun and engaging user experience.

i've used ai in writing readme as i don't know how to write it and also i've taken help of ai in fixx error in 3d stuff as i am not much familiar to them

## Features

- **3D Graphics**: Fully rendered 3D environment using Three.js and React Three Fiber
- **Interactive Gameplay**: Click on moles as they pop up to score points
- **Combo System**: Chain hits together to multiply your score
- **Particle Effects**: Dynamic particle systems for visual feedback
- **Responsive Design**: Playable on desktop and mobile devices
- **High Score Tracking**: Session-based high score system

## Technical Stack

- **Frontend Framework**: React with TypeScript
- **3D Graphics**: Three.js with React Three Fiber
- **Animation**: GSAP and React Spring
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/         # React components
│   ├── Game3D.tsx     # Main 3D game canvas
│   ├── GameBoard3D.tsx # 3D game board layout
│   ├── GameStats.tsx  # Score and timer display
│   └── Mole3D.tsx    # 3D mole model and animations
├── hooks/             # Custom React hooks
│   └── useGameLogic.ts # Game state and logic
├── types/             # TypeScript type definitions
│   └── game.ts       # Game-related types
├── utils/             # Utility functions
│   └── constants.ts  # Game constants
├── App.tsx           # Root component
└── main.tsx         # Entry point
```

## Game Components

### Game3D
- Manages the 3D scene setup
- Handles camera and lighting
- Implements post-processing effects

### Mole3D
- Implements the 3D mole model
- Manages mole animations and interactions
- Handles particle effects and combo displays

### GameStats
- Displays game statistics (score, time, high score)
- Updates in real-time during gameplay

## Game Mechanics

### Scoring System
- Base score: 10 points per hit
- Combo multiplier: Up to 5x for consecutive hits
- Time-based combo system: Hits within 1 second maintain combo

### Difficulty Levels
- Easy: Slower spawn rate, longer visibility
- Medium: Balanced spawn rate and timing
- Hard: Fast spawn rate, shorter visibility

## Performance Optimizations

- Efficient 3D model rendering
- Optimized particle systems
- Proper cleanup of event listeners and animations
- Memoized components to prevent unnecessary re-renders

## Development Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this code for your own projects!

## Credits

- 3D graphics powered by Three.js and React Three Fiber
- Icons from Lucide React
- Styling with Tailwind CSS
- Built with Vite and TypeScript
