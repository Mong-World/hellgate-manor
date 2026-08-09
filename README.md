# Hellgate Manor v1.8.7

- Locked Systems upgrades now state the exact wave they unlock on, both in the row text and locked button.
- Developer panel now opens directly with **Ctrl + Shift + D**; password protection has been removed for testing.
- The game canvas is focused from any pointer interaction inside the game iframe to improve keyboard shortcut reliability in Portals.

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
assets/shed.glb
assets/demon-image.png
assets/moofstudiogame.png
assets/endgamebang.mp3
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
- Hellfire Battery: 1000 Souls
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


## v1.4.1 loader hotfix
- GLBs now load sequentially rather than all at once.
- Each GLB is retried up to three times.
- Responses are checked before parsing.
- Missing optional enemy GLBs fall back safely instead of preventing startup.
- Required Husk/Manor failures now display the exact asset error on the loading screen.


## v1.5.1.0 strict asset loading

- Removed all enemy-model fallbacks.
- Every configured GLB is treated as required.
- GLBs still load sequentially with retries for Portals reliability.
- If any GLB fails, startup stops and the loading screen explicitly displays the failed asset filename.


## v1.5.1.0 hotfix
- Fixed startup crash `CONFIG is not defined` by importing CONFIG in World.js.
- Exact required-asset failure reporting remains enabled; no enemy model fallbacks are used.


## v1.5.1.0 progression / late-game rebalance

- Hell Bombs are now wave ammunition: 15 Bound Souls = 1 bomb at wave start, max 3; unused bombs do not carry.
- Hell Bombs no longer instantly remove Brutes or Siege Demons.
- Soul Extraction starts with one binding slot and can be upgraded manually to two and then three.
- Added `assets/soulmusic.mp3` during active bindings.
- Added `assets/newdawnmusic.mp3` for the final sunrise.
- Replaced the Hell Bomb Forge placeholder cube with `assets/shed.glb`, rotated 90 degrees clockwise and kept in the same manor-side position.
- Hellfire now grows in three clear stages: one crossbow, then two at 10 Bound Souls, then three at 25; reload speed improves within each stage and caps at 45 Bound Souls.
- Crossbow positions are spread farther across the manor.
- Bound Soul assignments now have hard caps and show MAX in the assignment screen.
- Occult is locked until Wave 40 and now creates visible light-purple ground-fire strikes.
- Enemy reveals are stretched out: Running Husk Wave 10, Strong Husk Wave 15, Brute Wave 25, Siege Demon Wave 35.
- Basic Husks gain slow/quick pace variation from Wave 4 without using the Runner model.
- Siege Demons are darker/larger and stagger by stopping/shaking rather than falling over.
- Brute and Siege Demon deaths use larger ash and soul-flight effects.
- Wave counts grow much more aggressively after Wave 20 and Wave 50 is a long final siege.
- Manor fortification is capped at 5000 max health and repeated fortification costs rise sharply.
- Major systems are staged later and cost more so the player keeps meaningful goals deeper into the run.
- Final dawn hides manor upgrade visuals and plays the new dawn music.
- Save schema bumped to v3 because the economy/progression model changed substantially.


## v1.5.1 Soul Binding audio

- Added `assets/soulbling.mp3`.
- Plays once when a Husk is accepted into Soul Binding.
- Plays again when that binding cycle completes.
- `assets/soulmusic.mp3` loops only while at least one binding beam is active and fades out when the final active binding finishes.


## v1.5.3 gameplay / test pass

- Added pooled dust-cloud impacts when demons damage the manor.
- Moved Soul Extraction forward on the manor and stretched the idle portal into a longer, clearer drop target.
- Reduced idle portal brightness while substantially increasing active conversion-beam brightness.
- Added a desktop-only developer panel opened with Ctrl+Shift+D. Test mode leaves the normal save untouched and disables saves for the rest of that browser session.
- Developer controls include wave selection, direct wave start, upgrade-screen testing, resource grants, system unlocks and dawn testing.
- Added a campaign-wide maximum of three Retry Wave continues. After three retries have been used, the next Game Over only offers New Game.

## v1.6.0 ending / ranking / New Game+ pass

- Enlarged the battlefield ground far beyond the camera so the sky can no longer appear beneath the terrain during dawn.
- Increased normal Hell Gate ember density and extended its orange lighting farther along the demon path.
- Added a staged final victory sequence: Hell Gate collapse, manor defence shutdown, a short quiet beat, dawn music, 15-second sunrise, thinning fog and distant bird silhouettes.
- Final text now appears in sequence: THE NIGHT IS OVER → YOU DEFEATED ALL THE DEMONS → HELLGATE MANOR STILL STANDS.
- Added three five-star completion categories: Survival (continues used), Defence (campaign-wide manor damage taken), and Binding (progress toward 150 Bound Souls, enough to fully staff all Bound Soul systems).
- Added final S/A/B/C/D rank and persistent Best Rank on the title screen.
- Completing the campaign permanently unlocks NEW GAME+.
- NEW GAME+ resets the run but acts as hard mode: about 25% more enemies, earlier enemy-type introductions, up to 30 active demons, faster movement, stronger/faster manor attacks and a small Soul reward increase.
- NEW GAME+ has a much stronger Hell Gate, dark red sky glow, and a large field of animated floating embers across the scene.
- Developer panel can toggle NEW GAME+ visuals/difficulty and TEST ENDING now runs the complete ending/ranking sequence without touching the normal save.


## v1.6.1 ranking / Hell Mode label polish

- S rank now requires 14 total category stars rather than a rounded 4.67 average. This means 5 + 5 + 4 stars correctly earns S.
- New Game+ is now labelled `NEW GAME+ (HELL MODE)` in the main/end menus, with the in-game NG+ HUD tag simplified to `HELL MODE`.

## v1.7.0 mobile/responsive pass
- Requires `assets/demon-image.png` for the Soul Extraction tutorial.
- Portrait phones show a rotate-to-landscape gate before play.
- Landscape phones use a compact HUD and mobile-only scrollable upgrade shop.
- Touch controls use larger invisible hit areas and swipe scrolling inside shop content.
- Mobile rendering caps DPR and reduces cosmetic particle/shadow load; desktop rendering/layout remains unchanged.
- Developer tools remain in the build but are no longer exposed by the old public shortcut.


## v1.7.2 mobile framing
- Landscape phones now preserve the same horizontal camera framing as the 844x390 Portals mobile reference viewport.
- Extra-wide phones automatically tighten vertical FOV so they do not reveal additional world at the left/right edges.
- Desktop camera and UI remain unchanged.


## v1.7.3 mobile framing refinement

- Keeps the Portals 844×390 mobile reference framing unchanged.
- On landscape phones wider than the reference aspect ratio, relaxes the v1.7.2 adaptive crop by 25%.
- Retains 75% of the side-crop protection that keeps demon spawn edges and the far manor edge hidden, while restoring a little more of the manor roof and left Hell Gate/fire area on extra-wide phones.
- Desktop camera and desktop UI remain unchanged.


## v1.8.1 final branding / ending-audio pass

- Added `assets/moofstudiogame.png` branding to the loading screen, title screen and pause menu.
- Loading now leads with the Moof Studios branding and shows HELLGATE MANOR as the smaller game title beneath it.
- Added `assets/endgamebang.mp3` at the instant Wave 50 is completed. The dawn music waits for the ending sting to finish (with the existing transition time as a minimum).
- The developer panel remains fully available but the old `Ctrl + Shift + D` shortcut and public `?dev=1` activation have been removed.
- Developer access now requires a private multi-key shortcut plus password verification. Only a SHA-256 hash is stored in the client source, not the password text itself.
- Mobile responsive framing/UI and all v1.7.3 gameplay behaviour are otherwise unchanged.

## v1.8.1 branding hierarchy

- HELLGATE MANOR is now the dominant title on loading, start, and pause screens.
- `assets/moofstudiogame.png` is presented as a compact production credit directly underneath the title.
- Separate mobile/short-landscape sizes keep the credit subordinate without changing the gameplay HUD/camera work from v1.7.3.

## v1.8.2 manor repair visibility / developer shortcut

- The upgrade screen now shows current **MANOR HP / MAX HP** alongside Souls, so repair purchases can be judged before spending Souls.
- Manor HP is visible on desktop and in the compact landscape-mobile upgrade header.
- The HP value changes colour as the manor becomes damaged, while the existing repair buttons still disable at full health.
- Protected developer access is now opened with `Ctrl + Shift + D`; password verification remains required and the password itself is still not stored as plaintext in the source.


## v1.8.3
- Tightened and vertically balanced the Start and Pause panels to remove excess empty space.
- Developer access shortcut: Ctrl + Shift + D (password still required).


## v1.8.5 early-upgrade balance / Bound Soul reminder / dev shortcut reliability

- Hellfire Battery purchase cost reduced from 1800 Souls to **1000 Souls**, keeping the first active defence realistically accessible before Wave 10 after buying Soul Extraction.
- The first purchased Bound-Soul-powered system now opens a short reminder that Bound Souls must be explicitly allocated to power upgrades.
- Removed the Moof Studios production logo from the pause screen; start/loading branding is unchanged.
- Protected developer access remains **Ctrl + Shift + D** with the existing password check. The shortcut now listens in capture phase, has a keyup fallback, and focuses the game canvas after interaction to improve reliability inside Portals/browser iframes.


## v1.8.7 shop clarity / system tutorials

- Shop purchase buttons now use three clear states: dark grey for wave/requirement locked, muted bronze-red for unlocked but unaffordable, and the existing bright orange/gold state when affordable.
- Soul Extraction and Hellfire Battery tutorial behaviour is unchanged from v1.8.5.
- Hell Bomb Forge, Undercroft and Occult Tower now show a short one-time tutorial the first time their unlocked shop button is clicked.
- Later-system tutorial headings use the Lansbury game font; tutorial instructions use the same readable condensed UI font as Soul Extraction.
- Tutorial acknowledgement is stored in the normal save so each help panel only appears once per save.

## v1.8.7 balance update
- Undercroft cost reduced to **8,000 Souls**.
- Occult Tower cost reduced to **16,000 Souls**.
- Undercroft now repairs **10 HP per assigned Bound Soul** after each completed wave.


## v1.9.0 final-test balance/polish pass
- Overcharge (Wave 40+, 50 Bound Souls, one-wave shield + extra Hellfire mid-cycle bolt).
- Brutes/Siege cannot be bound; only Husk, Strong Husk and Runner can be converted.
- Extraction slots cost 5,000 / 10,000; Undercroft repairs 50 HP per assigned soul.
- Retry returns to upgrades with failed-wave earnings rolled back.
- Fortify economy, ending defence score, click counter, occult area, dust/embers, crossbow/shed placement and preload paths polished.

## v1.9.4 final polish
- Manor HUD now pulses when health reaches 10% or less on desktop and mobile.
- Normal campaign transitions into the existing Hell/NG+ atmosphere visually at Wave 40 only, with a 4-second opening window and no gameplay modifier changes.
- The late-game Hell atmosphere fades away during the Wave 50 victory sequence before dawn.
- Wave 50 uses `assets/level50music.mp3` instead of the normal rotating background tracks and holds enemy spawning for at least 5 seconds.

## v1.9.5 performance pass
- Gameplay, wave balance, controls and intended visuals unchanged.
- Enemy pools now cover the full live-enemy cap (plus extraction slots) so no skinned GLB/AnimationMixer is constructed during a wave.
- Strong Husk and Siege materials are shared across pooled rigs while preserving the previous final tint/emissive appearance.
- GLB/scene textures are explicitly uploaded to the renderer during loading.
- Occult strike pool reduced to the maximum three simultaneous strikes; its PointLights stay in a stable renderer light set while inactive flames are hidden.
- Extraction beam cylinder segment counts reduced with the same glow/scale presentation.
- HUD state sync, WaveManager filtering, Hellfire projectile math and Occult targeting now reuse state/scratch objects to reduce garbage-collection spikes.
- Developer panel includes FPS/draw/GPU/program and enemy-pool-miss diagnostics for testing.
