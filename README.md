# Hellgate Manor — Portals Source Project

This repository keeps the editable Vite source on the `main` branch.

A GitHub Actions workflow automatically builds the game and publishes the finished static files to a branch named:

```text
portals-build
```

## First setup

1. Upload all project files to the repository's `main` branch.
2. Open the repository's **Actions** tab.
3. Wait for **Build for Portals** to finish successfully.
4. Confirm that the repository now has a `portals-build` branch.
5. In Portals, import using:

```text
Branch: portals-build
Project directory: repository root
Entry file: index.html
```

Do not point Portals at `main`. `main` contains source files that require Vite. `portals-build` contains the browser-ready game.

## Development

Make edits on `main`. Every push automatically replaces `portals-build` with a fresh production build.
