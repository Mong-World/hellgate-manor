# Hellgate Manor — Procedural Geometry Pass v0.7

This pass is a stricter rebuild intended to avoid the obvious primitive look from earlier versions.

## Main changes

- Husk rebuilt from custom lofted `BufferGeometry` sections rather than simple cylinders/capsules
- Head and split jaw rebuilt with custom geometry and a clearer hollow mouth silhouette
- Manor repositioned and rebuilt so the facade reads more clearly in frame
- Manor uses custom extruded / lofted architectural forms, arches, buttresses, layered roofs and towers
- Improved battlefield readability and lighting
- Open ground remains clear for gameplay and throwing

## Files included

- Vite project structure
- `src/Husk.js`
- `src/World.js`
- `src/Game.js`
- `src/GrabSystem.js`
- effect files in `src/effects/`

## Use

Replace the contents of your existing repo with this project, then build as normal.
