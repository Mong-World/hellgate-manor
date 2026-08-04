# Hellgate Manor — Five-Wave Vertical Slice v0.9

This build expands the working GLB-based prototype into a five-wave gameplay loop.

## Included

- Live battlefield start screen with Start button
- Five waves: 5, 10, 15, 20 and 25 Husks
- Fast Husks from Wave 2 onward
- Increasing simultaneous enemies and shorter spawn gaps
- Several shallow depth lanes
- Manor health, attacks, failure and Retry Wave
- Souls: 10 slow, 15 fast, plus `20 × wave number` completion bonus
- One strategic intermission purchase:
  - Repair Manor: +25 health for 30 souls
  - Hellfire Defence: permanent automatic shots every 5 seconds
  - Hell Bomb: destroys all currently active Husks
- Canvas-rendered HUD and menus
- Wave 5 thank-you screen and Play Again
- Ground death only after a drop covering at least half the visible screen height
- Hard manor and tree impacts can kill
- Husk-to-Husk impacts knock both down, but do not kill
- Walk animation speed variation matched to movement speed
- Automatic support for future animation clips named Walk/Run, Flail, Fall, GetUp, Attack and Idle

## Required existing assets

Keep these in your repository:

```text
assets/husk.glb
assets/manor.glb
```

This ZIP does not include or replace those files.

## Upload

Keep your existing `assets` folder. Replace the project code with the contents of this ZIP and commit to `main`.

The included workflow copies the repository `assets` folder into the finished `portals-build` branch.

## Current one-animation fallback

Because the current Husk only has its walk animation:

- grabbed movement uses the walk clip plus procedural motion
- throws use physics
- surviving impacts rotate the Husk down, pause, then return it upright
- attacks use a subtle movement pulse

Later animation clips will be selected automatically when included in the same GLB with recognisable names.
