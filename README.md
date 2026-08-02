# Hellgate Manor Asset Test v0.8

This build replaces the procedural manor and Husk with:

- `assets/manor.glb`
- `assets/husk.glb`

The first animation clip containing `walk`, `run`, or `move` in its name is used. If none match, the first animation clip is played.

## Upload

Keep your existing `assets` folder in the repository.

Replace the project code with the files in this ZIP, then commit to `main`. GitHub Actions will rebuild `portals-build`.

## Quick orientation fixes

In `src/Husk.js`:

```js
const HUSK_ROTATION_Y = Math.PI / 2;
```

In `src/World.js`:

```js
const MANOR_ROTATION_Y = Math.PI;
```

These can be changed if either model faces the wrong way.
