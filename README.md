# Hellgate Manor — Five-Wave Vertical Slice v0.14

This update builds directly on the working v0.10 five-wave version.

## Required repository files

Keep these existing files and folders:

```text
assets/husk.glb
assets/manor.glb
fonts/lansbury.ttf
```

The ZIP contains the revised game code and workflow, but it does not duplicate your GLB assets or font.

## v0.14 changes

- The previous fast-Husk movement range is now used for standard Husks.
- Fast Husks move at approximately twice the new standard speed.
- Animation playback is increased but capped separately from world movement.
- Husks now spawn fully off-screen to the left.
- The left battlefield contains a glowing, animated breach with lava fissures, embers and infernal lighting.
- The background now has a moon, stars and slowly drifting clouds.
- Low ground fog drifts gently across the battlefield.
- Hellfire Defence is locked until it can be purchased for Wave 3.
- Hell Bombs are locked until they can be purchased for Wave 4.
- Unlock rules are enforced both in the UI and in game logic.
- The Lansbury font is used for titles, buttons and key UI labels.
- The HUD is smaller and positioned along the bottom edge.
- The intermission screen uses spacious horizontal upgrade rows with larger gaps and clearer mouse targets.

## Interpretation

The request for “stairs” in the sky was treated as “stars,” alongside the moon and clouds.


## v0.14 visual and usability pass

- Added a much larger invisible grab collider around each Husk so selection is far less frustrating.
- Enlarged and re-angled the manor so it now sits partly off the right edge of the screen.
- Moved and intensified the infernal breach so the left-side glow reads properly on desktop.
- Increased ground fog visibility and movement.
- Reworked the ground with a darker textured surface instead of a flat plain look.
- Kept Lansbury for headers and key labels, but increased smaller menu text and made the supporting font bolder for readability.


## v0.14 wave and defence pass

- Every wave can continue spawning until as many as 25 living Husks are present at once.
- The enlarged manor has been fully reversed by 180 degrees rather than merely angled.
- Hellfire Defence now fires continuously every 10 seconds, even with no enemy target.
- Empty shots strike a random point on the battlefield.
- Held Husks are excluded from target selection. If a Husk is grabbed after an arrow has launched, the arrow continues to the ground position where the Husk was instead of following it.
- The old soul-like projectile has been replaced with a procedural gothic crossbow and visible flaming arrows.
- Additional crossbows fire one second apart rather than simultaneously.
- The first crossbow remains 60 souls; the second now costs 900 souls and cannot realistically be acquired during the five-wave demo.


## v0.14 defence visibility and pacing

- Enlarged the gothic crossbow emplacements substantially and moved them in front of the manor so they are readable on mobile.
- Rebuilt the projectile as a large flaming arrow with a bright fireball core, orange halo, layered flame and stronger light.
- Slowed the projectile slightly so its flight can be seen.
- Hellfire Defence now fires every 5 seconds during active waves.
- A newly purchased defence takes its first shot shortly after the wave starts.
- Removed rapid multi-Husk burst spawning.
- All waves retain a maximum of 25 active Husks, but their arrival is more consistently spaced.
- The second and third crossbows remain priced beyond the current five-wave demo.
