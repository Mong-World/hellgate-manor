# Hellgate Manor — Full Game First Draft v1.0

This is the first full-game draft built from the previous five-wave vertical slice.

## Keep these repository folders

The ZIP contains code/workflow files only. Keep the existing folders already in the GitHub repository:

```text
assets/
fonts/
sounds/
```

Expected asset filenames:

```text
assets/husk.glb
assets/manor.glb
assets/running-crawl.glb
assets/slow-walk.glb
assets/skinny-monster.glb
```

Expected sound filenames:

```text
sounds/ashsound.mp3
sounds/attacksound.mp3
sounds/background1.mp3
sounds/background2.mp3
sounds/body-impact-sound.mp3
sounds/bomb-explosion.mp3
sounds/crossbow-fire-sound.mp3
sounds/denied-purchase-sound.mp3
sounds/game-over-sound.mp3
sounds/purchasesound.mp3
sounds/soulcollectsound.mp3
sounds/wave-start-sound.MP3
sounds/whoosh.mp3
```

## Full game structure

- 50 waves, with Wave 50 as the final siege.
- Maximum 25 active combat demons on-screen at once.
- Spawning is independent of enemy deaths. Later waves can arrive in bursts until the 25-enemy cap is reached.
- Wave 1 waits roughly 7 seconds before the first Husk and is deliberately much longer than the original demo opening.
- No boss encounters.
- Automatic local browser save after waves/purchases and a Continue option on the title screen.

## Enemy roster

- **Husk** — standard grab/throw enemy, 10 Souls.
- **Strong Husk** — recoloured Husk, slower, survives two lethal hits, 20 Souls.
- **Running Husk** — uses `running-crawl.glb`, much faster, 10 Souls.
- **Brute** — uses `slow-walk.glb`, larger/heavier to drag and throw, survives two lethal hits, 30 Souls.
- **Siege Demon** — uses `skinny-monster.glb`, large and cannot be picked up. Clicking it staggers it; it requires repeated successful staggers and becomes temporarily unavailable while recovering. 50 Souls.

Fallen/recovering demons cannot be grabbed until they return to their walking state.

## Economy

Standard Husks award 10 Souls. Costs use multiples of 10 and are based approximately on the original Defend Your Castle kill-to-upgrade ratios.

### Manor

- Patch Damage: 20 Souls / +50 health
- Major Repair: 80 Souls / +250 health
- Restore Manor: 330 Souls / +1000 health
- Fortify: 130 Souls / +100 maximum health
- Major Fortify: 1250 Souls / +1000 maximum health

The manor begins at 1000/1000 health.

### Systems

- Soul Extraction: 830 Souls
- Hellfire Battery: 1330 Souls
- Demolition Crypt: 2500 Souls
- Undercroft: 4200 Souls
- Occult Tower: 6700 Souls

Players may make as many purchases as they can afford between waves. There is no one-purchase limit.

## Soul Extraction / Bound Souls

Purchasing Soul Extraction reveals a glowing ritual/fire area near the manor.

- Drop a grab-able living demon into the area to start conversion.
- Conversion takes about 14 seconds.
- Up to two conversions can run simultaneously.
- Converted enemies award no normal Souls and do not count as Demon Deaths.
- Completed conversions create permanent Bound Souls.
- If the Hellfire Battery is already owned, newly created Bound Souls automatically join it.
- Between waves, Bound Souls can be reassigned between owned systems.

## Bound Soul systems

- **Hellfire Battery** — more assigned Bound Souls activate more manor defence positions and increase firing frequency.
- **Demolition Crypt** — assigned Bound Souls build progress toward Hell Bomb charges between waves.
- **Undercroft** — assigned Bound Souls automatically repair the manor between waves.
- **Occult Tower** — assigned Bound Souls trigger increasingly frequent automatic occult strikes.

## HUD / UI

- Wave number
- Permanent Demon Deaths tally
- Manor health
- Souls
- Bound Souls
- Hell Bomb count when available

The old “Husks Remaining” display has been removed.

The between-wave menu is now paged into **Manor**, **Systems**, and **Bound Souls** sections with larger touch targets for mobile.

## Visual changes

- Ground fog now uses soft feathered oval/circular mist sprites rather than visible rectangular fog sheets.
- Existing manor fire positions are retained, but each brazier now has a bowl/rim, multiple flame layers, sparks and flickering light.
- Fortification purchases progressively add visible manor reinforcement/ward elements.
- Soul Extraction adds an orange glowing ritual zone.
- Demolition uses red accents.
- Undercroft uses amber structural accents.
- Occult uses purple rotating rings/orb effects.
- Standard Husks and their grab hitboxes are smaller than in the previous build.

## Loading / performance

The loading screen now shows only the title, loading bar and percentage.

Before the Start screen appears, the game:

- downloads and decodes all supplied audio;
- loads all five required GLB assets plus the manor;
- creates reusable pools for every demon type;
- binds/advances every available animation during loading;
- pre-creates pooled soul, ash and impact effects;
- pre-creates defence projectiles/impact effects;
- renders representative demons/effects while the loading overlay is covering the game;
- compiles shaders before gameplay.

The death/soul path no longer creates new soul/ash/impact geometry on the first kill, targeting the first-death hitch seen in previous builds.

## Audio

- `body-impact-sound.mp3` uses the corrected hyphenated filename.
- Body-impact playback volume is reduced to 60% of the previous level (40% quieter).
- Body impacts use random pitch variation on every eligible playback.
- Other repeated SFX retain subtle variation.
- `background1.mp3` and `background2.mp3` alternate between waves.

## Portals build

The GitHub Action builds `main`, copies `assets/`, `fonts/`, and `sounds/` into `dist/`, then force-publishes the result to `portals-build`.


## v1.2 playtest corrections

- Added a post-wave results screen before upgrades with Souls collected, demons destroyed, manor damage, manor condition and a visible GAME DATA SAVED confirmation.
- Removed the total-wave count from the start screen and HUD.
- Made Souls substantially more prominent in both the HUD and upgrade screen.
- Increased early-wave density: Wave 5 now deliberately sustains several enemies at once and later waves use stronger burst spawning up to the 25-active cap.
- Running Husk visual size reduced to roughly half its previous target height and its grab collider reduced to match.
- Enemies attacking the manor remain grabbable; fallen/recovering enemies remain protected from grabs until walking again.
- Soul Extraction moved onto the manor roof. Dropping a convertible demon over the roof now ignores battlefield depth (Z), making conversion reliable from any lane.
- Hell Gate fissure moved into the visible left battlefield, enlarged, brightened and given animated flame tongues; spawn positions now emerge immediately behind it.
- Startup warm-up now renders every pooled enemy clone and every pooled soul/ash/ring effect during the loading screen. Pool sizes cover the configured per-type maxima to avoid runtime GLB construction during normal play.
- Body impact remains at 60% of its old volume with randomized pitch on each valid playback.


## v1.3 gameplay correction pass

- Added optional `assets/click-sound.mp3` for all menu button presses.
- Removed demon-to-demon collision response so thrown Husks no longer stop crowds or create pile-ups.
- Fixed low-speed manor/tree impacts leaving demons suspended in mid-air; fallen demons are now snapped to the battlefield floor.
- Surviving demons thrown fully behind the manor are recovered to the front attack line so they remain interactable.
- Replaced the large tubular Hell Gate fissure that could read like glowing logs with flat ground-level glowing tear shapes.
- Winning the final wave now closes the Hell Gate, extinguishes the braziers, fades the moon/stars, raises a dawn sun, brightens the scene, and displays a congratulations message.


## v1.4 gameplay / bound-soul clarity pass

- Added pause button plus Escape-key pause/resume.
- Normal demon Souls now fly in screen space to the bottom-right Souls counter and trigger its glow/pulse on arrival.
- Bound Souls only appear in the HUD after the first conversion, in their own counter above Souls.
- New Bound Souls remain unassigned until the player explicitly assigns them between waves.
- Hellfire scaling is now stepped and visible in the Bound Souls menu (14 = 3 crossbows / 5.0s, 16 = 3 / 4.0s, 30+ = 3 / 2.2s).
- Reworked Soul Extraction into a broad glowing roof target with two reusable vertical light-beam conversion slots. Captured demons disappear immediately and no longer hold a wave open.
- Renamed Demolition Crypt to Hell Bomb Forge. Every 5 assigned Bound Souls produces one Hell Bomb after each wave, up to the 3-bomb cap.
- Siege Demon now first appears at Wave 25, is roughly twice as large, and is materially darkened.
