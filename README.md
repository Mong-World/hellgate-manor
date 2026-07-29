# Hellgate Manor — bundled Portals project

This version uses Vite and installs Three.js as a local npm dependency. There are no remote JavaScript imports in the source.

## Portals GitHub import

Upload the complete contents of this folder to the repository root, then import with:

- Branch: `main`
- Project directory: repository root
- Entry file: `index.html`

The build command is `npm run build` and Vite outputs the deployable game to `dist`.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm install
npm run build
```

## Important

Keep `package.json`, `vite.config.js`, `index.html`, `style.css`, and `src/` in the repository. Do not upload only the old prototype files, because those contained CDN imports.
