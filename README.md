# Hellgate Manor — Prototype 0.1

A Three.js browser-game prototype inspired by the grab-and-throw loop of classic castle-defence games.

## Included

- Fixed 2.5D camera
- Gothic two-storey manor with side towers and iron gate
- Modern dark horror presentation
- One procedural Husk enemy
- Mouse grabbing with spring-like weight
- Momentum-based throwing
- Binary ground-impact death threshold
- Black ash death effect
- Soul ember collection
- Automatic Husk respawning

## Run locally

Because the project uses ES modules, run it through a local web server rather than double-clicking `index.html`.

### VS Code
Install the **Live Server** extension, then right-click `index.html` and choose **Open with Live Server**.

### Python
From the project folder:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy to Portals

Upload the ZIP directly. `index.html` is at the ZIP root.

## GitHub

Create a new repository and upload all files while preserving the folders:

```text
index.html
style.css
js/
README.md
```

Then connect that repository and branch in Portals.

## Tuning

The easiest gameplay values to adjust are:

- `killThreshold` in `js/Husk.js`
- `walkSpeed` in `js/Husk.js`
- spring `stiffness` and `damping` in `js/GrabSystem.js`
- throw scaling in `calculateReleaseVelocity()` in `js/GrabSystem.js`
