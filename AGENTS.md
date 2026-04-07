# AGENTS.md - Math Invaders

## Project Overview

Math Invaders is a 2D browser-based game inspired by Space Invaders with a math theme. Built with Phaser 3 and Vite.

## Build/Dev Commands

```bash
npm run dev       # Start Vite dev server (http://localhost:5173)
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
```

**No test or lint framework is configured yet.** The project is in early development.

## Project Structure

```
src/
├── main.js              # Phaser game config and entry point
├── style.css            # Global CSS reset
└── scenes/
    └── mainMenu.js      # Main menu scene
public/
├── favicon.svg
└── icons.svg
index.html               # App shell
```

## Code Style Guidelines

### Imports
- Use ES module syntax (`import`/`export`)
- Order: CSS imports first, then library imports, then local imports
- No `.js` extension in local imports (Vite resolves automatically)
- Example: `import MainMenu from './scenes/mainMenu';`

### Formatting
- 2-space indentation
- Semicolons required
- Trailing commas in multi-line objects/arrays
- Single quotes for strings
- No trailing whitespace

### Naming Conventions
- **Files**: camelCase (e.g., `mainMenu.js`)
- **Classes**: PascalCase, extending `Phaser.Scene` (e.g., `MainMenu`)
- **Scene keys**: PascalCase string matching class (e.g., `{ key: 'MainMenu' }`)
- **Methods**: camelCase, descriptive verbs (e.g., `createStars()`, `createPlayButton()`)
- **Variables**: camelCase

### Phaser Scene Structure
Each scene should follow the standard Phaser lifecycle:
- `constructor()` — call `super({ key: 'SceneName' })`
- `create()` — initialize game objects, call helper methods
- `update()` — per-frame logic (if needed)

Extract visual elements into private helper methods like `createStars()`, `createTitle()`, etc.

### Types
- This project uses plain JavaScript (no TypeScript)
- Use Phaser's built-in types via JSDoc comments if helpful

### Error Handling
- Use `console.log` for temporary debug placeholders
- Remove debug logs before committing production features
- Phaser handles most rendering errors gracefully

### Git / Commits
- Follow Conventional Commits format:
  ```
  <type>([scope]): <short description>
  [BLANK LINE]
  [Body (optional)]
  [BLANK LINE]
  [Footer (optional)]
  ```
- **Body** and **Footer** are both optional. Include them only when additional context or references are needed.
- Allowed types: `feat`, `fix`, `perf`, `build`, `ci`, `docs`, `refactor`, `style`, `test`
- Write messages in basic, brief English
- Example:
  ```
  feat: add main menu scene with retro arcade style

  - Create MainMenu scene with starfield background
  - Add floating math symbols with tween animations
  ```

### Assets
- All assets are currently generated programmatically (no external images/sprites)
- When adding external assets, place them in `public/` or `src/assets/`
- Load assets in the scene's `preload()` method (not yet used)

### Visual Style
- Retro/arcade aesthetic with neon green (#39ff14) on black background
- Monospace font family for all text
- Subtle animations via Phaser tweens (pulse, float, hover effects)
