# Hellgate Manor — Five-Wave Vertical Slice v0.17

This update builds directly on the working v0.10 five-wave version.

## Required repository files

Keep these existing files and folders:

```text
assets/husk.glb
assets/manor.glb
fonts/lansbury.ttf
```

The ZIP contains the revised game code and workflow, but it does not duplicate your GLB assets or font.

## v0.17 changes

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


## v0.17 visual and usability pass

- Added a much larger invisible grab collider around each Husk so selection is far less frustrating.
- Enlarged and re-angled the manor so it now sits partly off the right edge of the screen.
- Moved and intensified the infernal breach so the left-side glow reads properly on desktop.
- Increased ground fog visibility and movement.
- Reworked the ground with a darker textured surface instead of a flat plain look.
- Kept Lansbury for headers and key labels, but increased smaller menu text and made the supporting font bolder for readability.


## v0.17 wave and defence pass

- Every wave can continue spawning until as many as 25 living Husks are present at once.
- The enlarged manor has been fully reversed by 180 degrees rather than merely angled.
- Hellfire Defence now fires continuously every 10 seconds, even with no enemy target.
- Empty shots strike a random point on the battlefield.
- Held Husks are excluded from target selection. If a Husk is grabbed after an arrow has launched, the arrow continues to the ground position where the Husk was instead of following it.
- The old soul-like projectile has been replaced with a procedural gothic crossbow and visible flaming arrows.
- Additional crossbows fire one second apart rather than simultaneously.
- The first crossbow remains 60 souls; the second now costs 900 souls and cannot realistically be acquired during the five-wave demo.


## v0.17 defence visibility and pacing

- Enlarged the gothic crossbow emplacements substantially and moved them in front of the manor so they are readable on mobile.
- Rebuilt the projectile as a large flaming arrow with a bright fireball core, orange halo, layered flame and stronger light.
- Slowed the projectile slightly so its flight can be seen.
- Hellfire Defence now fires every 5 seconds during active waves.
- A newly purchased defence takes its first shot shortly after the wave starts.
- Removed rapid multi-Husk burst spawning.
- All waves retain a maximum of 25 active Husks, but their arrival is more consistently spaced.
- The second and third crossbows remain priced beyond the current five-wave demo.


## v0.17 startup pre-warming

- Added a staged loading screen with progress messages and a progress bar.
- Loads the font, GLB assets, battlefield, waves and defence before showing Start.
- Creates and renders a temporary animated Husk during loading.
- Pre-warms normal ash, warm ash, soul, impact-ring and Hellfire projectile materials.
- Temporarily reveals all defence mounts so their shaders are compiled.
- Uses `renderer.compileAsync()` when available, with `renderer.compile()` as a fallback.
- Renders several warm-up frames before gameplay.
- Removes all temporary warm-up objects and effects before the Start screen appears.

This targets the one-time hitch previously seen on the first Husk death.


## v0.17 visual readability pass

- Reduced and re-mounted the gothic crossbows so they sit against the manor more cleanly.
- Reworked defence projectiles into clearer flaming arrows with a more compact silhouette.
- Added better Husk readability through cooler fill / emissive visibility tuning.
- Replaced the blocky fog sheets with layered drifting sprite fog.
- Brought the hell breach farther into view and added taller glow plumes so it reads on desktop.
- Removed the obvious rectangular ground overlay and kept the battlefield cleaner.
- Added larger HUD safe margins so panels are less likely to clip at the edges.
- Toned down and sharpened the moon so it feels less blown out.


## v0.17 audio and animation warm-up

This build adds the complete supplied audio set and a stronger startup warm-up.

### Audio

The loading screen now fetches and decodes every MP3 before the Start screen appears. Playback is unlocked by the player's Start-button press, which follows browser autoplay rules.

Sound assignments:

- `sounds/ashsound.mp3` — Husk disintegration
- `sounds/attacksound.mp3` — Husk striking the manor
- `sounds/background1.mp3` and `sounds/background2.mp3` — alternating wave music
- `sounds/body impact sound.mp3` — ground, tree, manor and Husk collisions
- `sounds/bomb-explosion.mp3` — Hell Bomb
- `sounds/crossbow-fire-sound.mp3` — Hellfire crossbow
- `sounds/denied-purchase-sound.mp3` — unavailable or unaffordable purchases
- `sounds/game-over-sound.mp3` — manor destroyed
- `sounds/purchasesound.mp3` — successful purchases and repairs
- `sounds/soulcollectsound.mp3` — soul reaching the manor
- `sounds/wave-start-sound.MP3` — wave beginning; uppercase extension is intentional
- `sounds/whoosh.mp3` — Husk released by the player

Repeated effects use subtle random pitch and volume changes. Background music is never pitch-shifted. Simultaneous-effect limits prevent large groups of Husks from creating excessive audio overlap.

### Reduced first-use animation lag

- Pre-creates a complete 25-Husk pool during loading: 15 normal and 10 fast, matching the maximum Wave 5 mixture.
- Binds and advances every animation action on every pooled Husk before gameplay.
- Reuses the pooled Husk instances across waves instead of cloning models and animation mixers during combat.
- Renders multiple warm-up frames before gameplay.
- Prepares shared normal and fast Husk material variants during loading instead of cloning new materials for every spawn.
- Removes the per-fast-Husk point light, which previously changed the active light count and could trigger a new shader compilation when the first fast Husk appeared. Fast Husks retain their warm emissive appearance.
- Continues to pre-warm death, soul, impact and Hellfire effects.

The GitHub Action now also copies the existing `sounds/` folder into the `portals-build` output. Keep the existing `assets/`, `fonts/` and `sounds/` folders when replacing the project code.
