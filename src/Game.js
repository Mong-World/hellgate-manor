import * as THREE from "three";
import { CONFIG } from "./Config.js";
import { AssetLibrary } from "./AssetLibrary.js";
import { World } from "./World.js";
import { GrabSystem } from "./GrabSystem.js";
import { WaveManager } from "./WaveManager.js";
import { DefenceSystem } from "./DefenceSystem.js";
import { UI } from "./UI.js";
import { AudioManager } from "./AudioManager.js";
import { EffectPool } from "./EffectPool.js";

const SAVE_KEY = "hellgate-manor-save-v3";
const META_KEY = "hellgate-manor-meta-v1";
export class Game {
  constructor(container) {
    this.container = container;
    this.clock = new THREE.Clock();
    this.running = false;
    this.gameplayActive = false;
    this.paused = false;
    this.startingGame = false;
    this.cameraShake = 0;
    this.cameraBase = new THREE.Vector3(...CONFIG.camera.position);
    this.cameraTarget = new THREE.Vector3(...CONFIG.camera.target);
    const params = new URLSearchParams(window.location.search);
    // Developer mode is deliberately not exposed by a public URL flag.
    // Ctrl + Shift + D opens the temporary test panel during development.
    this.developerMode = false;
    this.developerWave = THREE.MathUtils.clamp(Math.floor(Number(params.get("wave")) || 1), 1, CONFIG.waves.length);
    this.developerShop = false;
    this.developerPanelOpen = false;
    this.developerPanelPreviousMode = "start";
    this.developerPanelPreviousPaused = false;
    this.developerShortcutLatch = false;
    this.meta = this.readMeta();
    this.endingActive = false;
    this.endingTimer = 0;
    this.endingDawnMusicStarted = false;
    this.endingDawnMusicDelay = 4.15;
    this.runtimePrimed = false;
    this.mobileOptimized = (window.matchMedia?.("(pointer: coarse)")?.matches || navigator.maxTouchPoints > 0) && Math.min(window.innerWidth, window.innerHeight) <= 900;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050609);
    this.scene.fog = new THREE.FogExp2(0x08090d, 0.018);

    this.camera = new THREE.PerspectiveCamera(
      CONFIG.camera.fov,
      window.innerWidth / window.innerHeight,
      0.1,
      180
    );
    this.applyResponsiveCamera(true);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.mobileOptimized ? 1.35 : 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.tabIndex = 0;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    this.assets = new AssetLibrary();
    this.audio = new AudioManager(CONFIG.sounds);
    this.loadingElement = document.getElementById("loading");
    this.loadingProgress = document.getElementById("loading-progress");
    this.loadingPercent = document.getElementById("loading-percent");

    this.ui = new UI(document.getElementById("ui-canvas"), {
      onUIClick: () => this.playUIClick(),
      onNewGame: () => this.beginNewGame(),
      onNewGamePlus: () => this.beginNewGamePlus(),
      onContinueSave: () => this.continueSavedGame(),
      onBomb: () => this.useBomb(),
      onPause: () => this.togglePause(),
      onPurchase: (type) => this.purchase(type),
      onAssign: (system, delta) => this.assignBoundSoul(system, delta),
      onOvercharge: () => this.chargeOvercharge(),
      onDeniedPurchase: () => this.playDeniedPurchase(),
      onResultsContinue: () => this.openIntermission(),
      onSave: () => this.manualSave(),
      onContinue: () => this.continueAfterIntermission(),
      onRetry: () => this.retryWave(),
      onRestart: () => this.beginNewGame(),
      onDevWaveChange: (delta) => this.changeDeveloperWave(delta),
      onDevStartWave: () => this.startDeveloperWave(),
      onDevOpenShop: () => this.openDeveloperShop(),
      onDevAddSouls: (amount) => this.addDeveloperSouls(amount),
      onDevAddBound: (amount) => this.addDeveloperBoundSouls(amount),
      onDevUnlock: (system) => this.unlockDeveloperSystem(system),
      onDevDawn: () => this.testDeveloperDawn(),
      onDevToggleNGPlus: () => this.toggleDeveloperNewGamePlus(),
      onDevClose: () => this.closeDeveloperPanel()
    });

    this.ui.setDeveloperMode(this.developerMode, this.developerWave, this.developerShop);
    this.ui.setMeta(this.meta);
    this.resetState({ newGamePlus: false });
    this.onResize = this.onResize.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.focusGameCanvas = this.focusGameCanvas.bind(this);
    this.trackCampaignClick = this.trackCampaignClick.bind(this);
    this.animate = this.animate.bind(this);
    window.addEventListener("resize", this.onResize);
    // Capture phase plus a keyup fallback makes Ctrl + Shift + D more
    // reliable inside Portals/browser iframes.
    window.addEventListener("keydown", this.onKeyDown, true);
    window.addEventListener("keyup", this.onKeyUp, true);
    document.addEventListener("pointerdown", this.focusGameCanvas, true);
    document.addEventListener("pointerdown", this.trackCampaignClick, true);
  }

  resetState({ newGamePlus = false } = {}) {
    this.newGamePlus = !!newGamePlus;
    this.waveIndex = 0;
    this.souls = 0;
    this.manorHealth = CONFIG.manor.startHealth;
    this.manorMaxHealth = CONFIG.manor.maxHealth;
    this.demonDeaths = 0;
    this.boundSouls = 0;
    this.bombs = 0;
    this.fortifyLevel = 0;
    this.extractionLevel = 0;
    this.buildings = {
      extraction: false,
      hellfire: false,
      demolition: false,
      undercroft: false,
      occult: false
    };
    this.assignments = {
      hellfire: 0,
      demolition: 0,
      undercroft: 0,
      occult: 0
    };
    this.tutorialsSeen = {
      demolition: false,
      undercroft: false,
      occult: false,
      overcharge: false
    };
    this.waveStartSnapshot = null;
    this.continuesUsed = 0;
    this.totalManorDamageTaken = 0;
    this.totalClicks = 0;
    this.totalBoundEver = 0;
    this.overchargeReserve = 0;
    this.overchargeReady = false;
    this.overchargeActive = false;
    this.retryingWave = false;
    this.campaignTrackingActive = false;
    this.endingActive = false;
    this.endingTimer = 0;
    this.endingDawnMusicStarted = false;
    this.endingDawnMusicDelay = 4.15;
    this.paused = false;
  }

  async start() {
    this.setLoadingProgress(3);
    await this.ui.preloadVisualAssets();
    this.setLoadingProgress(5);
    try {
      await document.fonts?.load('32px "Lansbury"');
    } catch (error) {
      console.warn("Lansbury font could not be preloaded.", error);
    }

    this.setLoadingProgress(8);
    await this.audio.loadAll((progress) => this.setLoadingProgress(8 + progress * 18));

    this.setLoadingProgress(28);
    await this.assets.loadAll((progress) => {
      this.setLoadingProgress(28 + progress * 15);
    });

    this.setLoadingProgress(43);
    this.world = new World(this.scene, this.assets, { mobile: this.mobileOptimized });
    await this.world.load();
    this.world.setNewGamePlusMode?.(false);

    this.setLoadingProgress(50);
    this.effectPool = new EffectPool(this.scene, CONFIG.pool.effects);

    this.waveManager = new WaveManager({
      scene: this.scene,
      assets: this.assets,
      camera: this.camera,
      onEnemyDeath: (data) => this.handleEnemyDeath(data),
      onEnemyAttack: (enemy) => this.handleManorAttack(enemy),
      onEnemyImpact: (data) => this.handleEnemyImpact(data),
      onEnemyExtracted: (enemy) => this.handleEnemyExtracted(enemy),
      onWaveComplete: () => this.handleWaveComplete(),
      onSiegeClick: (enemy) => this.handleSiegeClick(enemy)
    });

    await this.waveManager.preparePools((progress) => this.setLoadingProgress(52 + progress * 23));

    this.grabSystem = new GrabSystem({
      camera: this.camera,
      domElement: this.renderer.domElement,
      getEnemies: () => this.waveManager.getAliveEnemies(),
      onRelease: (data) => this.handleRelease(data),
      onDirectClick: (enemy) => this.handleSiegeClick(enemy)
    });

    this.defence = new DefenceSystem(
      this.scene,
      this.world,
      () => this.waveManager.getActiveCombatEnemies(),
      (enemy, reason, amount) => this.damageEnemy(enemy, reason, amount),
      (enemy) => this.grabSystem?.isHolding(enemy) ?? false,
      () => this.audio.play("crossbowFire", {
        volume: 0.68,
        pitchMin: 0.93,
        pitchMax: 1.08
      }),
      () => this.cameraShake = Math.max(this.cameraShake, 0.06)
    );

    this.setLoadingProgress(78);
    await this.preWarmEverything();

    this.applyUpgradeState();
    this.syncUI();
    this.ui.setMeta(this.meta);
    this.ui.setHasSave(this.developerMode ? false : this.hasSave());
    this.ui.setMode("start");
    this.running = true;
    requestAnimationFrame(this.animate);

    this.setLoadingProgress(100);
    await this.waitForFrame();
    await new Promise((resolve) => window.setTimeout(resolve, 180));
    this.loadingElement.classList.add("hidden");
    window.setTimeout(() => this.loadingElement.remove(), 650);
  }

  setLoadingProgress(percent) {
    const value = THREE.MathUtils.clamp(percent, 0, 100);
    if (this.loadingProgress) this.loadingProgress.style.width = `${value}%`;
    if (this.loadingPercent) this.loadingPercent.textContent = `${Math.round(value)}%`;
  }

  waitForFrame() {
    return new Promise((resolve) => requestAnimationFrame(resolve));
  }

  async preWarmEverything() {
    const allEnemies = this.waveManager.getAllPooledEnemies();
    this.effectPool.preWarm();
    this.defence.preWarm();
    this.world.setUpgradeState({ extraction: true, extractionLevel: 3, demolition: true, undercroft: true, occult: true, fortifyLevel: 10 });
    this.world.setTurretLevel(3);
    this.world.setNewGamePlusMode?.(true);
    this.world.prepareDawnAssets?.();
    this.world.setDawnPrewarmVisible?.(true);

    // Force every transient system visible before play: all extraction slots,
    // several occult strikes and both light/heavy manor-damage dust variants.
    for (let i = 0; i < CONFIG.extraction.maxConcurrent; i += 1) {
      this.world.startExtractionBeam?.(CONFIG.extraction.maxConcurrent);
    }
    this.world.triggerOccultStrike?.(new THREE.Vector3(-8, 0, -2));
    this.world.triggerOccultStrike?.(new THREE.Vector3(-2, 0, 1));
    this.world.triggerOccultStrike?.(new THREE.Vector3(5, 0, 3));
    this.world.triggerManorDamageDust?.(new THREE.Vector3(this.world.manorBarrierX, 0, -3), "husk");
    this.world.triggerManorDamageDust?.(new THREE.Vector3(this.world.manorBarrierX, 0, 0), "brute");
    this.world.triggerManorDamageDust?.(new THREE.Vector3(this.world.manorBarrierX, 0, 3), "siege");

    // Warm every pooled enemy clone in small visible batches. This is slower at
    // startup by design, but avoids first-spawn GLB/skinning/animation hitches.
    const batchSize = 8;
    let warmed = 0;
    for (let start = 0; start < allEnemies.length; start += batchSize) {
      const batch = allEnemies.slice(start, start + batchSize);
      batch.forEach((enemy, index) => {
        const col = index % 4;
        const row = Math.floor(index / 4);
        enemy.resetForSpawn(-(start + index + 1), new THREE.Vector3(-12 + col * 7, 0, -3 + row * 5.5));
        enemy.preWarmAllActions();
      });

      for (let frame = 0; frame < 2; frame += 1) {
        const dt = 1 / 30;
        batch.forEach((enemy) => enemy.update(dt, frame * dt, false, this.world.manorBarrierX));
        this.effectPool.update(dt);
        this.defence.updateProjectiles(dt);
        this.defence.updateImpacts(dt);
        this.world.update((start + frame) * dt, dt);
        this.renderer.render(this.scene, this.camera);
        await this.waitForFrame();
      }

      batch.forEach((enemy) => enemy.deactivateForPool());
      warmed += batch.length;
      this.setLoadingProgress(78 + (warmed / Math.max(allEnemies.length, 1)) * 13);
    }

    // Dedicated first-spawn passes for the two largest animated rigs. They are
    // rendered on their own under the real scene lighting so skinning/material
    // programs are cached before Waves 25/35.
    for (const type of ["brute", "siege"]) {
      const enemy = this.waveManager.pools[type]?.[0];
      if (!enemy) continue;
      enemy.resetForSpawn(-9000, new THREE.Vector3(-4, 0, 0));
      enemy.preWarmAllActions(1 / 20);
      for (let frame = 0; frame < 6; frame += 1) {
        enemy.update(1 / 30, frame / 30, false, this.world.manorBarrierX);
        this.renderer.render(this.scene, this.camera);
        await this.waitForFrame();
      }
      if (typeof this.renderer.compileAsync === "function") await this.renderer.compileAsync(this.scene, this.camera);
      enemy.deactivateForPool();
    }

    // Warm an Overcharge shield frame too; it is late-game but should never
    // compile for the first time during Wave 40+.
    this.world.setOverchargeActive?.(true);
    this.defence.setOvercharge?.(true);
    this.renderer.render(this.scene, this.camera);
    await this.waitForFrame();
    this.world.setOverchargeActive?.(false);
    this.defence.setOvercharge?.(false);

    this.setLoadingProgress(92);
    // Render the complete pooled effect set before hiding it. Unlike the older
    // warm-up this actually sends every soul/ash/ring material to the GPU.
    for (let frame = 0; frame < 12; frame += 1) {
      const dt = 1 / 30;
      this.effectPool.update(dt);
      this.defence.updateProjectiles(dt);
      this.defence.updateImpacts(dt);
      this.world.update(frame * dt, dt);
      this.renderer.render(this.scene, this.camera);
      await this.waitForFrame();
    }

    this.setLoadingProgress(96);
    if (typeof this.renderer.compileAsync === "function") {
      await this.renderer.compileAsync(this.scene, this.camera);
    } else {
      this.renderer.compile(this.scene, this.camera);
    }

    this.effectPool.finishPreWarm();
    this.waveManager.pooledEnemies = new Set(Object.values(this.waveManager.pools).flat());
    this.defence.projectiles.slice().forEach((projectile) => this.defence.releaseArrow(projectile));
    this.defence.impacts.slice().forEach((impact) => {
      impact.active = false;
      impact.mesh.visible = false;
    });
    this.defence.impacts = [];
    this.world.setTurretLevel(0);
    this.world.resetTransientEffects?.();
    this.world.setNewGamePlusMode?.(false);
    this.applyUpgradeState();
    this.renderer.render(this.scene, this.camera);
    this.setLoadingProgress(98);
    await this.waitForFrame();
  }

  async playUIClick() {
    await this.audio.unlock();
    this.audio.play("click", {
      volume: 0.34,
      pitchMin: 0.97,
      pitchMax: 1.04,
      cooldown: 0.02,
      maxInstances: 2
    });
  }

  async primeRuntimeAfterUnlock() {
    if (this.runtimePrimed) return;
    this.runtimePrimed = true;
    await this.audio.unlock();
    this.audio.primeAllPlaybackPaths?.();
    // Prime the exact looping node path used by Soul Extraction as well. It is
    // effectively silent and is stopped immediately, but prevents the first
    // real binding from being the browser's first loop/source ramp setup.
    this.audio.playLoop?.("soulBinding", "__binding-prewarm", { volume: 0.0001, fadeSeconds: 0.05 });
    // Give WebAudio one frame to finish creating the silent source/gain paths
    // before the first wave transition begins.
    await this.waitForFrame();
    this.audio.stopLoop?.("__binding-prewarm", 0.05);
  }

  async beginNewGame() {
    return this.beginFreshGame(false);
  }

  async beginNewGamePlus() {
    if (!this.meta.ngPlusUnlocked && !this.developerMode) return;
    return this.beginFreshGame(true);
  }

  async beginFreshGame(newGamePlus = false) {
    if (this.startingGame) return;
    this.startingGame = true;
    await this.audio.unlock();
    await this.primeRuntimeAfterUnlock();
    this.resetState({ newGamePlus });
    this.campaignTrackingActive = true;
    this.world.setLateGameVisualMode?.(false, 0);
    this.world.setNewGamePlusMode?.(this.newGamePlus);
    this.world.resetNight?.();
    if (!this.developerMode) this.clearSave();

    if (this.developerMode) {
      this.waveIndex = this.developerWave - 1;
      this.souls = 50000;
      this.boundSouls = 160;
      this.manorMaxHealth = 5000;
      this.manorHealth = 5000;
      if (this.developerShop) {
        this.gameplayActive = false;
        this.grabSystem.setEnabled(false);
        this.applyUpgradeState();
        this.syncUI();
        this.ui.setMode("intermission");
        this.startingGame = false;
        return;
      }
    }

    this.applyUpgradeState();
    this.startCurrentWave();
    this.startingGame = false;
  }

  async continueSavedGame() {
    if (this.startingGame) return;
    this.startingGame = true;
    await this.audio.unlock();
    await this.primeRuntimeAfterUnlock();
    const save = this.readSave();
    if (!save) {
      this.startingGame = false;
      return this.beginNewGame();
    }
    this.restoreState(save);
    this.campaignTrackingActive = true;
    this.world.setLateGameVisualMode?.(false, 0);
    this.world.setNewGamePlusMode?.(this.newGamePlus);
    this.world.resetNight?.();
    this.applyUpgradeState();
    this.startCurrentWave();
    this.startingGame = false;
  }

  snapshotState() {
    return {
      waveIndex: this.waveIndex,
      souls: this.souls,
      manorHealth: this.manorHealth,
      manorMaxHealth: this.manorMaxHealth,
      demonDeaths: this.demonDeaths,
      boundSouls: this.boundSouls,
      bombs: this.bombs,
      fortifyLevel: this.fortifyLevel,
      extractionLevel: this.extractionLevel,
      continuesUsed: this.continuesUsed,
      totalManorDamageTaken: this.totalManorDamageTaken,
      totalClicks: this.totalClicks,
      totalBoundEver: this.totalBoundEver,
      overchargeReserve: this.overchargeReserve,
      overchargeReady: this.overchargeReady,
      overchargeActive: this.overchargeActive,
      newGamePlus: this.newGamePlus,
      buildings: { ...this.buildings },
      assignments: { ...this.assignments },
      tutorialsSeen: { ...this.tutorialsSeen }
    };
  }

  restoreState(data) {
    this.waveIndex = THREE.MathUtils.clamp(Number(data.waveIndex) || 0, 0, CONFIG.waves.length - 1);
    this.souls = Math.max(0, Number(data.souls) || 0);
    this.manorHealth = Math.max(1, Number(data.manorHealth) || CONFIG.manor.startHealth);
    const absoluteMaxHealth = CONFIG.manor.maxHealth + CONFIG.manor.maxFortifyLevel * CONFIG.manor.fortify.amount;
    this.manorMaxHealth = THREE.MathUtils.clamp(
      Number(data.manorMaxHealth) || CONFIG.manor.maxHealth,
      CONFIG.manor.maxHealth,
      absoluteMaxHealth
    );
    this.manorHealth = Math.min(this.manorHealth, this.manorMaxHealth);
    this.demonDeaths = Math.max(0, Number(data.demonDeaths) || 0);
    this.boundSouls = Math.max(0, Number(data.boundSouls) || 0);
    this.bombs = THREE.MathUtils.clamp(Number(data.bombs) || 0, 0, CONFIG.defence.bombMaxCharges);
    this.fortifyLevel = THREE.MathUtils.clamp(Number(data.fortifyLevel) || 0, 0, CONFIG.manor.maxFortifyLevel);
    this.extractionLevel = THREE.MathUtils.clamp(
      Number(data.extractionLevel) || (data.buildings?.extraction ? 1 : 0),
      0,
      CONFIG.extraction.maxLevel
    );
    this.continuesUsed = THREE.MathUtils.clamp(Number(data.continuesUsed) || 0, 0, 3);
    this.totalManorDamageTaken = Math.max(0, Number(data.totalManorDamageTaken) || 0);
    this.totalClicks = Math.max(0, Math.floor(Number(data.totalClicks) || 0));
    this.totalBoundEver = Math.max(0, Math.floor(Number(data.totalBoundEver) || Number(data.boundSouls) || 0));
    this.overchargeReserve = Number(data.overchargeReserve) >= (CONFIG.overcharge?.cost ?? 50) ? (CONFIG.overcharge?.cost ?? 50) : 0;
    this.overchargeReady = !!data.overchargeReady || this.overchargeReserve > 0;
    this.overchargeActive = !!data.overchargeActive;
    this.retryingWave = false;
    this.newGamePlus = !!data.newGamePlus;
    this.buildings = { ...this.buildings, ...(data.buildings ?? {}) };
    this.assignments = { ...this.assignments, ...(data.assignments ?? {}) };
    this.tutorialsSeen = { ...this.tutorialsSeen, ...(data.tutorialsSeen ?? {}) };
    this.normaliseAssignments();
  }

  readMeta() {
    try {
      const raw = localStorage.getItem(META_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return {
        ngPlusUnlocked: !!parsed.ngPlusUnlocked,
        bestRank: parsed.bestRank ?? null,
        bestStars: parsed.bestStars ?? null
      };
    } catch {
      return { ngPlusUnlocked: false, bestRank: null, bestStars: null };
    }
  }

  saveMeta() {
    try {
      localStorage.setItem(META_KEY, JSON.stringify(this.meta));
    } catch {
      // Persistent meta is optional in restricted embeds.
    }
    this.ui?.setMeta(this.meta);
  }

  rankValue(rank) {
    return ({ D: 1, C: 2, B: 3, A: 4, S: 5 })[rank] ?? 0;
  }

  recordCompletion(result) {
    if (this.developerMode) return;
    this.meta.ngPlusUnlocked = true;
    if (!this.meta.bestRank || this.rankValue(result.finalRank) > this.rankValue(this.meta.bestRank)) {
      this.meta.bestRank = result.finalRank;
      this.meta.bestStars = {
        survival: result.survival.stars,
        defence: result.defence.stars,
        binding: result.binding.stars
      };
    }
    this.saveMeta();
  }

  hasSave() {
    return !!this.readSave();
  }

  readSave() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  saveGame(resumeWaveIndex = this.waveIndex) {
    if (this.developerMode) return true;
    try {
      const state = this.snapshotState();
      state.waveIndex = THREE.MathUtils.clamp(resumeWaveIndex, 0, CONFIG.waves.length - 1);
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
      this.ui.setHasSave(true);
      return true;
    } catch (error) {
      console.warn("Save could not be written.", error);
      return false;
    }
  }

  clearSave() {
    if (this.developerMode) return;
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {
      // localStorage can be unavailable in restricted embeds.
    }
    this.ui.setHasSave(false);
  }

  startCurrentWave() {
    // A charged Overcharge consumes its reserved Bound Souls as the wave begins.
    // If this wave is being restored from its start-of-wave save, a previously
    // paid Overcharge remains active without charging the player a second time.
    const overchargeCost = CONFIG.overcharge?.cost ?? 50;
    const restoredPaidOvercharge = this.overchargeActive && !this.overchargeReady && this.overchargeReserve === 0;
    const activatingOvercharge = this.overchargeReady && this.overchargeReserve >= overchargeCost;
    this.overchargeActive = restoredPaidOvercharge || activatingOvercharge;
    if (activatingOvercharge) {
      this.boundSouls = Math.max(0, this.boundSouls - this.overchargeReserve);
      this.overchargeReserve = 0;
      this.overchargeReady = false;
      this.normaliseAssignments();
    }
    this.world.setOverchargeActive?.(this.overchargeActive);
    this.defence.setOvercharge?.(this.overchargeActive);

    this.gameplayActive = true;
    this.paused = false;
    this.grabSystem.setEnabled(true);

    // Hell Bombs are wave ammunition, not a stockpile. Every wave starts with
    // exactly the capacity purchased through Bound Soul assignment. Unused
    // charges from the previous wave are deliberately discarded.
    this.bombs = this.buildings.demolition
      ? Math.min(
          CONFIG.defence.bombMaxCharges,
          Math.floor((this.assignments.demolition ?? 0) / CONFIG.defence.bombSoulsPerCharge)
        )
      : 0;

    const waveNumber = this.waveIndex + 1;
    const enteringLateGameVisuals = !this.newGamePlus && waveNumber === 40;
    if (!this.newGamePlus) {
      if (waveNumber >= 40) {
        this.world.setLateGameVisualMode?.(true, enteringLateGameVisuals ? 4.0 : 0);
      } else {
        this.world.setLateGameVisualMode?.(false, 0);
      }
    }

    // Waves 40 and 50 get deliberate presentation windows before enemies arrive.
    // Wave 40 uses the pause for the visual Hell transition; Wave 50 lets the
    // dedicated final-wave music establish itself before the last assault.
    const openingDelay = waveNumber === 50 ? 5.0 : (enteringLateGameVisuals ? 4.0 : 0);

    this.waveStartSnapshot = this.snapshotState();
    this.waveManager.setNewGamePlus?.(this.newGamePlus);
    this.waveManager.startWave(this.waveIndex, openingDelay);
    this.defence.resetCooldown();
    this.audio.setMusicLevel(waveNumber === 50 ? 0.425 : 0.34, 0.3);
    this.audio.playMusic(
      waveNumber === 50 ? "level50" : (this.waveIndex % 2 === 0 ? "background1" : "background2"),
      waveNumber === 50 ? 1.15 : 0.7
    );
    this.audio.play("waveStart", { volume: 0.72, pitchMin: 0.97, pitchMax: 1.03 });
    this.ui.setMode("playing");
    this.ui.showBanner(
      `WAVE ${waveNumber}`,
      this.newGamePlus
        ? "NEW GAME+ — HELL HAS RETURNED"
        : (waveNumber === 40 ? "HELL DEEPENS" : (this.waveIndex === 0 ? "THE FIRST DEMONS ARE COMING" : "DEFEND THE MANOR")),
      waveNumber === 40 ? 3.6 : 2.6
    );
    this.saveGame(this.waveIndex);
    this.syncUI();
  }

  handleRelease({ enemy, velocity }) {
    if (
      this.buildings.extraction &&
      this.extractionLevel > 0 &&
      enemy.convertible &&
      this.world.isInsideExtractionZone(enemy.position)
    ) {
      const slot = this.world.startExtractionBeam(this.extractionLevel);
      if (slot >= 0 && this.waveManager.captureEnemy(enemy)) {
        this.boundSouls += 1;
        this.totalBoundEver += 1;
        this.ui.pulseBound();
        this.audio.play("soulBling", { volume: 0.62, pitchMin: 0.98, pitchMax: 1.03 });
        this.audio.playLoop("soulBinding", "soul-binding", { volume: 0.34, fadeSeconds: 0.25 });
        this.normaliseAssignments();
        this.applyUpgradeState();
        this.syncUI();
        return true;
      }
    }

    this.audio.playThrow(velocity.length());
    return false;
  }

  handleEnemyExtracted() {
    // Legacy callback retained for old saves/build compatibility. New captures
    // resolve instantly and use the roof beam managed by World.
  }

  handleEnemyDeath({ enemy, position, impactStrength = 9, reason }) {
    if (!enemy) return;
    const rewardMultiplier = this.newGamePlus ? CONFIG.newGamePlus.soulRewardMultiplier : 1;
    this.souls += Math.max(1, Math.round(enemy.soulValue * rewardMultiplier));
    this.demonDeaths += 1;

    const effectScale = enemy.type === "siege" ? 2.15 : enemy.type === "brute" ? 1.45 : 1;
    const screen = this.projectWorldToScreen(position);
    this.ui.addSoulFlight(screen.x, screen.y, () => {
      this.audio.play("soulCollect", { volume: 0.58, pitchMin: 0.9, pitchMax: 1.12 });
    }, effectScale);

    this.effectPool.ash(
      position,
      reason === "bomb" || reason === "occult" || enemy.type === "siege",
      effectScale
    );
    this.effectPool.ring(
      position.clone().setY(0.04),
      impactStrength * Math.min(effectScale, 1.7),
      reason === "occult" ? 0xb57cff : reason === "bomb" ? 0xff3b12 : 0xff7a34
    );

    this.audio.play("ash", {
      volume: reason === "bomb" ? 0.42 : enemy.type === "siege" ? 0.70 : 0.58,
      pitchMin: enemy.type === "siege" ? 0.72 : 0.84,
      pitchMax: enemy.type === "siege" ? 0.90 : 1.16
    });
    this.cameraShake = Math.max(
      this.cameraShake,
      enemy.type === "siege" ? 0.34 : reason === "bomb" ? 0.3 : 0.18
    );
    this.syncUI();
  }

  handleEnemyImpact({ impactStrength = 8 } = {}) {
    this.audio.playBodyImpact(impactStrength);
  }

  damageEnemy(enemy, reason, amount = 1) {
    if (!enemy || enemy.dead || enemy.removed) return;
    enemy.applyDamage(amount, reason, reason === "bomb" ? 15 : 11);
  }

  handleSiegeClick(enemy) {
    if (!this.gameplayActive || !enemy?.canDirectClick?.()) return;
    const worked = enemy.staggerSiege(1);
    if (worked) {
      this.audio.playBodyImpact(9);
      this.cameraShake = Math.max(this.cameraShake, 0.08);
    }
  }

  handleManorAttack(enemy) {
    if (!this.gameplayActive || this.manorHealth <= 0 || !enemy || enemy.dead) return;
    const damageMultiplier = this.overchargeActive ? (1 - (CONFIG.overcharge?.manorDamageReduction ?? 0.20)) : 1;
    const appliedDamage = Math.max(1, Math.round(enemy.attackDamage * damageMultiplier));
    const damageTaken = Math.min(this.manorHealth, appliedDamage);
    this.manorHealth = Math.max(0, this.manorHealth - appliedDamage);
    this.totalManorDamageTaken += damageTaken;
    this.world.triggerManorDamageDust?.(enemy.position, enemy.type);
    if (this.overchargeActive) this.world.pulseOverchargeShield?.();
    this.audio.play("attack", {
      volume: enemy.type === "siege" ? 0.78 : enemy.type === "brute" ? 0.7 : 0.58,
      pitchMin: enemy.type === "runner" ? 1.02 : 0.86,
      pitchMax: enemy.type === "runner" ? 1.16 : 1.05
    });
    this.ui.flashHealth();
    this.cameraShake = Math.max(this.cameraShake, enemy.type === "siege" ? 0.22 : 0.07);
    this.syncUI();
    if (this.manorHealth <= 0) this.failWave();
  }

  handleWaveComplete() {
    if (!this.gameplayActive) return;
    this.gameplayActive = false;
    this.grabSystem.setEnabled(false);
    this.audio.setMusicLevel(0.22, 0.45);

    const snapshot = this.waveStartSnapshot ?? this.snapshotState();
    const waveSouls = Math.max(0, this.souls - (snapshot.souls ?? 0));
    const waveDeaths = Math.max(0, this.demonDeaths - (snapshot.demonDeaths ?? 0));
    const waveDamage = Math.max(0, (snapshot.manorHealth ?? this.manorHealth) - this.manorHealth);

    // Undercroft repairs 50 HP per assigned Bound Soul, up to 1500 HP
    // after a wave at the 30-soul cap, never exceeding current max health.
    if (this.buildings.undercroft && this.assignments.undercroft > 0) {
      const repair = this.assignments.undercroft * (CONFIG.defence.undercroftRepairPerSoul ?? 50);
      this.manorHealth = Math.min(this.manorMaxHealth, this.manorHealth + repair);
    }

    this.overchargeActive = false;
    this.world.setOverchargeActive?.(false);
    this.defence.setOvercharge?.(false);

    this.syncUI();
    if (this.waveIndex >= CONFIG.waves.length - 1) {
      this.beginVictorySequence();
      return;
    }

    const saved = this.saveGame(this.waveIndex + 1);
    this.ui.setWaveResults({
      souls: waveSouls,
      deaths: waveDeaths,
      damage: waveDamage,
      health: this.manorHealth,
      maxHealth: this.manorMaxHealth,
      saved
    });
    this.ui.setMode("results");
  }

  calculateEndingResult() {
    const survivalStars = this.continuesUsed === 0 ? 5 : this.continuesUsed === 1 ? 4 : this.continuesUsed === 2 ? 3 : 2;

    const defenceScale = this.newGamePlus ? CONFIG.ranking.newGamePlusDefenceScale : 1;
    const [five, four, three, two] = CONFIG.ranking.defenceDamageThresholds.map((value) => value * defenceScale);
    const defenceStars = this.totalManorDamageTaken <= five ? 5
      : this.totalManorDamageTaken <= four ? 4
        : this.totalManorDamageTaken <= three ? 3
          : this.totalManorDamageTaken <= two ? 2 : 1;

    const bindingTarget = CONFIG.ranking.bindingMaxTarget;
    const bindingRatio = this.totalBoundEver / Math.max(1, bindingTarget);
    const bindingStars = bindingRatio >= 1 ? 5
      : bindingRatio >= 0.80 ? 4
        : bindingRatio >= 0.60 ? 3
          : bindingRatio >= 0.40 ? 2 : 1;

    const totalStars = survivalStars + defenceStars + bindingStars;
    const average = totalStars / 3;
    // 14/15 stars earns S, so two perfect categories plus one 4-star
    // category still receives the top rank.
    const finalRank = totalStars >= 14 ? "S"
      : totalStars >= 12 ? "A"
        : totalStars >= 9 ? "B"
          : totalStars >= 6 ? "C" : "D";

    return {
      newGamePlus: this.newGamePlus,
      finalRank,
      average,
      demonDeaths: this.demonDeaths,
      boundSouls: this.totalBoundEver,
      totalClicks: this.totalClicks,
      survival: {
        stars: survivalStars,
        detail: `${this.continuesUsed} CONTINUE${this.continuesUsed === 1 ? "" : "S"} USED`
      },
      defence: {
        stars: defenceStars,
        detail: `${Math.round(this.totalManorDamageTaken)} TOTAL MANOR DAMAGE`
      },
      binding: {
        stars: bindingStars,
        detail: `${this.totalBoundEver} BOUND SOULS`
      }
    };
  }

  beginVictorySequence() {
    const result = this.calculateEndingResult();
    this.campaignTrackingActive = false;
    this.recordCompletion(result);
    this.clearSave();
    this.gameplayActive = false;
    this.paused = false;
    this.endingActive = true;
    this.endingTimer = 0;
    this.endingDawnMusicStarted = false;
    this.grabSystem?.setEnabled(false);
    this.audio.stopLoop("soul-binding", 0.35);
    this.audio.stopMusic(0.45);
    this.audio.play("endgameBang", {
      volume: 0.96,
      rate: 1,
      cooldown: 0,
      maxInstances: 1
    });
    // THE NIGHT IS OVER begins fading in at 5 seconds on the ending UI.
    // Start the dawn score at that exact moment so the music arrives with the title.
    this.endingDawnMusicDelay = 5.0;
    this.defence.clearForDawn?.();
    this.world.startVictorySequence?.();
    this.ui.startEndingSequence(result);
  }

  openIntermission() {
    if (this.ui.mode !== "results") return;
    this.ui.setMode("intermission");
    this.syncUI();
    const overchargeUnlockWave = CONFIG.overcharge?.unlockWave ?? 40;
    if (this.waveIndex + 1 >= overchargeUnlockWave && !this.tutorialsSeen.overcharge) {
      this.tutorialsSeen.overcharge = true;
      this.ui.showOverchargeTutorial?.();
    }
  }

  getIntermissionResumeWaveIndex() {
    return this.retryingWave ? this.waveIndex : Math.min(this.waveIndex + 1, CONFIG.waves.length - 1);
  }

  manualSave() {
    if (this.ui.mode !== "intermission") return;
    const saved = this.saveGame(this.getIntermissionResumeWaveIndex());
    this.ui.showSaveNotice(saved);
  }

  getFortifyCost() {
    // Predictable late-game curve: still expensive, but never jumps into the
    // absurd 80k+ range near the cap.
    return CONFIG.helpers.round10(
      CONFIG.manor.fortify.baseCost * Math.pow(1.10, this.fortifyLevel)
    );
  }

  getMajorFortifyCost() {
    // Ten levels at a bulk discount. It is always more expensive than one
    // normal Fortify, while remaining better value than buying ten singles.
    const single = this.getFortifyCost();
    return CONFIG.helpers.round10(Math.max(
      CONFIG.manor.majorFortify.baseCost,
      single * 6.5
    ));
  }

  getPurchaseDefinition(type) {
    const repairs = CONFIG.manor.repairs;
    const definitions = {
      repairMinor: repairs.minor.cost,
      repairMajor: repairs.major.cost,
      repairFull: repairs.full.cost,
      fortify: this.getFortifyCost(),
      majorFortify: this.getMajorFortifyCost(),
      extraction: CONFIG.buildings.extraction.cost,
      extractionUpgrade: this.extractionLevel === 1
        ? CONFIG.buildings.extractionUpgrade2.cost
        : this.extractionLevel === 2
          ? CONFIG.buildings.extractionUpgrade3.cost
          : null,
      hellfire: CONFIG.buildings.hellfire.cost,
      demolition: CONFIG.buildings.demolition.cost,
      undercroft: CONFIG.buildings.undercroft.cost,
      occult: CONFIG.buildings.occult.cost
    };
    return definitions[type];
  }

  getUnlockWave(type) {
    return CONFIG.buildings[type]?.unlockWave ?? 1;
  }

  showLaterSystemTutorial(type) {
    const tutorials = {
      demolition: () => this.ui.showBombForgeTutorial(),
      undercroft: () => this.ui.showUndercroftTutorial(),
      occult: () => this.ui.showOccultTutorial()
    };
    if (!tutorials[type] || this.tutorialsSeen[type]) return false;
    this.tutorialsSeen[type] = true;
    tutorials[type]();
    return true;
  }

  purchase(type) {
    if (this.ui.mode !== "intermission") return;
    const poweredSystems = ["hellfire", "demolition", "undercroft", "occult"];
    const firstPoweredSystemPurchase = poweredSystems.includes(type) &&
      !poweredSystems.some((key) => this.buildings[key]);
    const cost = this.getPurchaseDefinition(type);

    if (type.startsWith("repair") && this.manorHealth >= this.manorMaxHealth) return this.playDeniedPurchase();
    if ((type === "fortify" || type === "majorFortify") && this.fortifyLevel >= CONFIG.manor.maxFortifyLevel) {
      return this.playDeniedPurchase();
    }
    if (type === "majorFortify" && this.fortifyLevel + CONFIG.manor.majorFortify.levels > CONFIG.manor.maxFortifyLevel) {
      return this.playDeniedPurchase();
    }

    const buildingType = type === "extractionUpgrade" ? "extraction" : type;
    if (CONFIG.buildings[buildingType]?.unlockWave && this.waveIndex + 1 < this.getUnlockWave(buildingType)) {
      return this.playDeniedPurchase();
    }
    if (["hellfire", "demolition", "undercroft", "occult"].includes(type) && !this.buildings.extraction) {
      return this.playDeniedPurchase();
    }
    if (type !== "extractionUpgrade" && this.buildings[type]) return this.playDeniedPurchase();
    if (type === "extractionUpgrade" && (!this.buildings.extraction || this.extractionLevel >= CONFIG.extraction.maxLevel)) {
      return this.playDeniedPurchase();
    }

    if (cost == null || this.souls < cost) return this.playDeniedPurchase();

    this.souls -= cost;
    if (type === "repairMinor") this.manorHealth = Math.min(this.manorMaxHealth, this.manorHealth + CONFIG.manor.repairs.minor.amount);
    else if (type === "repairMajor") this.manorHealth = Math.min(this.manorMaxHealth, this.manorHealth + CONFIG.manor.repairs.major.amount);
    else if (type === "repairFull") this.manorHealth = Math.min(this.manorMaxHealth, this.manorHealth + CONFIG.manor.repairs.full.amount);
    else if (type === "fortify") {
      this.manorMaxHealth += CONFIG.manor.fortify.amount;
      this.manorHealth += CONFIG.manor.fortify.amount;
      this.fortifyLevel += 1;
    } else if (type === "majorFortify") {
      this.manorMaxHealth += CONFIG.manor.majorFortify.amount;
      this.manorHealth += CONFIG.manor.majorFortify.amount;
      this.fortifyLevel += CONFIG.manor.majorFortify.levels;
    } else if (type === "extraction") {
      this.buildings.extraction = true;
      this.extractionLevel = 1;
      this.ui.showExtractionTutorial();
    } else if (type === "extractionUpgrade") {
      this.extractionLevel = Math.min(CONFIG.extraction.maxLevel, this.extractionLevel + 1);
    } else if (type in this.buildings) {
      this.buildings[type] = true;
      const showedSystemTutorial = this.showLaterSystemTutorial(type);
      if (!showedSystemTutorial && firstPoweredSystemPurchase) this.ui.showAllocationTutorial();
    }

    this.audio.play("purchase", { volume: 0.68, pitchMin: 0.96, pitchMax: 1.05 });
    this.normaliseAssignments();
    this.applyUpgradeState();
    this.saveGame(this.getIntermissionResumeWaveIndex());
    this.syncUI();
  }

  playDeniedPurchase() {
    this.audio.play("deniedPurchase", { volume: 0.55, pitchMin: 0.97, pitchMax: 1.03 });
  }

  getUnassignedSouls() {
    return Math.max(0, this.boundSouls - this.overchargeReserve - Object.values(this.assignments).reduce((sum, value) => sum + value, 0));
  }

  normaliseAssignments() {
    const keys = Object.keys(this.assignments);
    keys.forEach((key) => {
      const cap = CONFIG.boundCaps[key] ?? Infinity;
      this.assignments[key] = Math.min(
        cap,
        Math.max(0, Math.floor(Number(this.assignments[key]) || 0))
      );
      if (!this.buildings[key]) this.assignments[key] = 0;
    });
    const overchargeCost = CONFIG.overcharge?.cost ?? 50;
    if (this.overchargeReserve > 0 && this.overchargeReserve !== overchargeCost) this.overchargeReserve = 0;
    if (this.overchargeReserve > this.boundSouls) {
      this.overchargeReserve = 0;
      this.overchargeReady = false;
    }
    let assigned = Object.values(this.assignments).reduce((sum, value) => sum + value, 0);
    while (assigned + this.overchargeReserve > this.boundSouls) {
      const key = keys.find((name) => this.assignments[name] > 0);
      if (!key) break;
      this.assignments[key] -= 1;
      assigned -= 1;
    }
  }

  assignBoundSoul(system, delta) {
    if (this.ui.mode !== "intermission" || !this.buildings[system]) return;
    if (delta > 0) {
      const cap = CONFIG.boundCaps[system] ?? Infinity;
      if ((this.assignments[system] ?? 0) >= cap) return this.playDeniedPurchase();
      if (this.getUnassignedSouls() <= 0) return this.playDeniedPurchase();
      this.assignments[system] += 1;
    } else if (delta < 0) {
      if ((this.assignments[system] ?? 0) <= 0) return this.playDeniedPurchase();
      this.assignments[system] -= 1;
    }
    this.audio.play("purchase", { volume: 0.34, pitchMin: 0.98, pitchMax: 1.05 });
    this.applyUpgradeState();
    this.saveGame(this.getIntermissionResumeWaveIndex());
    this.syncUI();
  }

  chargeOvercharge() {
    if (this.ui.mode !== "intermission") return;
    if (this.waveIndex + 1 < (CONFIG.overcharge?.unlockWave ?? 40)) return this.playDeniedPurchase();
    if (this.overchargeReady || this.overchargeReserve > 0) return this.playDeniedPurchase();
    const cost = CONFIG.overcharge?.cost ?? 50;
    if (this.getUnassignedSouls() < cost) return this.playDeniedPurchase();
    this.overchargeReserve = cost;
    this.overchargeReady = true;
    this.audio.play("purchase", { volume: 0.62, pitchMin: 0.94, pitchMax: 1.02 });
    this.saveGame(this.getIntermissionResumeWaveIndex());
    this.syncUI();
  }

  applyUpgradeState() {
    if (!this.world || !this.defence) return;
    this.world.setUpgradeState({
      extraction: this.buildings.extraction,
      extractionLevel: this.extractionLevel,
      demolition: this.buildings.demolition,
      undercroft: this.buildings.undercroft,
      occult: this.buildings.occult,
      fortifyLevel: this.fortifyLevel
    });
    this.defence.setHellfireSouls(this.buildings.hellfire ? this.assignments.hellfire : 0);
    this.defence.setOccultSouls(this.buildings.occult ? this.assignments.occult : 0);
  }

  continueAfterIntermission() {
    if (this.ui.mode !== "intermission") return;
    if (this.retryingWave) {
      this.retryingWave = false;
    } else if (!(this.developerMode && this.developerShop)) {
      this.waveIndex += 1;
    }
    this.developerShop = false;
    this.startCurrentWave();
  }

  useBomb() {
    if (!this.gameplayActive || this.paused || this.bombs <= 0) return;
    const targets = [...this.waveManager.getActiveCombatEnemies()];
    if (targets.length === 0) return;
    this.bombs -= 1;
    this.audio.play("bombExplosion", { volume: 0.78, pitchMin: 0.96, pitchMax: 1.04 });
    targets.forEach((enemy) => {
      // Bombs erase ordinary crowds, but heavy demons still need the player or
      // long-term defences. Brutes lose one durability stage; Siege Demons are
      // merely interrupted/damaged once.
      const amount = (enemy.type === "brute" || enemy.type === "siege")
        ? 1
        : enemy.durability;
      enemy.applyDamage(amount, "bomb", 15);
    });
    this.cameraShake = Math.max(this.cameraShake, 0.42);
    this.syncUI();
  }

  failWave() {
    if (!this.gameplayActive) return;
    this.paused = false;
    this.gameplayActive = false;
    this.grabSystem.setEnabled(false);
    this.waveManager.stop();
    this.audio.stopMusic(0.45);
    this.audio.play("gameOver", { volume: 0.78 });
    this.ui.setContinueState({
      canRetry: this.continuesUsed < 3,
      remaining: Math.max(0, 3 - this.continuesUsed)
    });
    this.ui.setMode("gameOver");
  }

  retryWave() {
    if (!this.waveStartSnapshot || this.continuesUsed >= 3) return;
    const used = this.continuesUsed + 1;
    const clicksMade = this.totalClicks;
    this.waveManager.clear();
    this.restoreState(this.waveStartSnapshot);
    // Clicks made during the failed attempt still happened, but Souls, Bound
    // Souls and combat gains from that attempt are rolled back.
    this.totalClicks = clicksMade;
    this.continuesUsed = used;
    this.overchargeActive = false;
    this.world.setOverchargeActive?.(false);
    this.defence.setOvercharge?.(false);
    this.gameplayActive = false;
    this.paused = false;
    this.grabSystem.setEnabled(false);
    this.retryingWave = true;
    this.applyUpgradeState();
    this.saveGame(this.waveIndex);
    this.syncUI();
    this.ui.setMode("intermission");
  }

  checkWorldCollisions() {
    for (const enemy of this.waveManager.getAliveEnemies()) {
      // If a throwable demon gets launched completely behind the manor and
      // survives, recover it to the attack line rather than letting it become
      // inaccessible behind the model.
      const escapedBehindManor =
        enemy.type !== "siege" &&
        enemy.state !== "grabbed" &&
        enemy.state !== "extracting" &&
        enemy.position.x > this.world.manorBounds.max.x + 0.6 &&
        enemy.position.y <= 1.8;

      if (escapedBehindManor) {
        enemy.position.set(
          this.world.manorBarrierX - 0.05,
          0,
          THREE.MathUtils.clamp(enemy.position.z, -4.8, 4.8)
        );
        enemy.group.rotation.set(0, 0, 0);
        enemy.modelRoot.rotation.set(0, 0, 0);
        enemy.velocity.set(0, 0, 0);
        enemy.state = "walking";
        enemy.reachManor(this.world.manorBarrierX);
        continue;
      }

      if (enemy.state === "walking") {
        if (enemy.type !== "siege" && enemy.position.x >= this.world.manorBarrierX) {
          enemy.reachManor(this.world.manorBarrierX);
        }
        continue;
      }
      if (enemy.state !== "airborne") continue;
      const speed = enemy.velocity.length();

      if (this.world.isInsideManorCollision(enemy.position)) {
        if (speed >= CONFIG.enemy.hardSurfaceKillSpeed) enemy.hitHardSurface("manor", speed);
        else {
          this.handleEnemyImpact({ impactStrength: speed });
          enemy.position.x = this.world.manorBarrierX - 0.2;
          enemy.position.y = 0;
          enemy.velocity.x = -Math.abs(enemy.velocity.x) * 0.30;
          enemy.knockDown(enemy.velocity);
        }
        continue;
      }

      if (this.world.findTreeCollision(enemy.position)) {
        if (speed >= CONFIG.enemy.treeKillSpeed) enemy.hitHardSurface("tree", speed);
        else {
          this.handleEnemyImpact({ impactStrength: speed });
          enemy.position.y = 0;
          enemy.velocity.x *= -0.24;
          enemy.velocity.z *= -0.24;
          enemy.knockDown(enemy.velocity);
        }
      }
    }
  }

  checkEnemyCollisions() {
    // Intentionally disabled. Demons pass through one another so a thrown
    // Husk cannot stop a crowd and create an artificial pile-up.
  }

  projectWorldToScreen(position) {
    const projected = position.clone().project(this.camera);
    return {
      x: (projected.x * 0.5 + 0.5) * window.innerWidth,
      y: (-projected.y * 0.5 + 0.5) * window.innerHeight
    };
  }

  trackCampaignClick(event) {
    if (!this.campaignTrackingActive || this.endingActive || this.developerMode) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    this.totalClicks += 1;
  }

  focusGameCanvas() {
    try {
      this.renderer?.domElement?.focus?.({ preventScroll: true });
    } catch (_) {
      this.renderer?.domElement?.focus?.();
    }
  }

  isDeveloperShortcut(event) {
    const dKey = event.code === "KeyD" || String(event.key || "").toLowerCase() === "d";
    return !!(event.ctrlKey && event.shiftKey && !event.altKey && dKey);
  }

  triggerDeveloperShortcut(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.repeat) return;
    if (this.developerPanelOpen) this.closeDeveloperPanel();
    else this.openDeveloperPanel();
  }

  onKeyDown(event) {
    if (this.isDeveloperShortcut(event)) {
      // Latch the keydown so the matching keyup cannot immediately toggle the
      // developer panel closed. If a browser swallows keydown, keyup remains a
      // fallback route below.
      this.developerShortcutLatch = true;
      this.triggerDeveloperShortcut(event);
      return;
    }

    if (event.key !== "Escape") return;
    if (this.developerPanelOpen) {
      event.preventDefault();
      this.closeDeveloperPanel();
      return;
    }
    if (this.ui.mode !== "playing" && this.ui.mode !== "paused") return;
    event.preventDefault();
    this.togglePause();
  }

  onKeyUp(event) {
    if (!this.isDeveloperShortcut(event)) return;
    event.preventDefault();
    event.stopPropagation();
    if (this.developerShortcutLatch) {
      this.developerShortcutLatch = false;
      return;
    }
    this.triggerDeveloperShortcut(event);
  }

  openDeveloperPanel() {
    if (this.developerPanelOpen) return;
    // Opening the desktop developer panel switches this browser session into
    // test mode. Normal local save data is left untouched and no further
    // autosaves are written until the page is refreshed.
    this.developerMode = true;
    this.developerPanelOpen = true;
    this.developerPanelPreviousMode = this.ui.mode;
    this.developerPanelPreviousPaused = this.paused;
    this.developerWave = this.waveIndex + 1;
    if (this.gameplayActive) {
      this.paused = true;
      this.grabSystem?.setEnabled(false);
      this.audio.setMusicLevel(0.10, 0.15);
    }
    this.ui.setDeveloperMode(true, this.developerWave, false);
    this.ui.setDeveloperPanel(true, this.developerWave);
  }

  closeDeveloperPanel() {
    if (!this.developerPanelOpen) return;
    this.developerPanelOpen = false;
    this.ui.setDeveloperPanel(false, this.developerWave);
    const previous = this.developerPanelPreviousMode;
    if (this.gameplayActive && previous === "playing") {
      this.paused = false;
      this.grabSystem?.setEnabled(true);
      this.audio.setMusicLevel(0.34, 0.2);
      this.ui.setMode("playing");
    } else if (this.gameplayActive && previous === "paused") {
      this.paused = true;
      this.ui.setMode("paused");
    } else {
      this.ui.setMode(previous);
    }
  }

  changeDeveloperWave(delta) {
    this.developerWave = THREE.MathUtils.clamp(
      this.developerWave + delta,
      1,
      CONFIG.waves.length
    );
    this.ui.setDeveloperPanel(true, this.developerWave);
  }

  prepareDeveloperTransition() {
    this.developerMode = true;
    this.developerPanelOpen = false;
    this.ui.setDeveloperPanel(false, this.developerWave);
    this.paused = false;
    this.gameplayActive = false;
    this.grabSystem?.setEnabled(false);
    this.waveManager?.clear();
    this.waveIndex = this.developerWave - 1;
  }

  startDeveloperWave() {
    this.prepareDeveloperTransition();
    this.applyUpgradeState();
    this.startCurrentWave();
  }

  openDeveloperShop() {
    this.prepareDeveloperTransition();
    this.developerShop = true;
    this.applyUpgradeState();
    this.syncUI();
    this.ui.setMode("intermission");
  }

  addDeveloperSouls(amount) {
    this.souls = Math.max(0, this.souls + amount);
    this.syncUI();
  }

  addDeveloperBoundSouls(amount) {
    this.boundSouls = Math.max(0, this.boundSouls + amount);
    this.normaliseAssignments();
    this.applyUpgradeState();
    this.syncUI();
  }

  unlockDeveloperSystem(system) {
    if (!(system in this.buildings)) return;
    this.buildings[system] = true;
    if (system === "extraction") this.extractionLevel = Math.max(1, this.extractionLevel);
    this.applyUpgradeState();
    this.syncUI();
  }

  testDeveloperDawn() {
    this.prepareDeveloperTransition();
    this.demonDeaths = Math.max(this.demonDeaths, 700);
    this.boundSouls = Math.max(this.boundSouls, CONFIG.ranking.bindingMaxTarget);
    this.totalBoundEver = Math.max(this.totalBoundEver, CONFIG.ranking.bindingMaxTarget);
    this.totalManorDamageTaken = Math.max(this.totalManorDamageTaken, 4200);
    this.beginVictorySequence();
  }

  toggleDeveloperNewGamePlus() {
    this.developerMode = true;
    this.newGamePlus = !this.newGamePlus;
    this.waveManager?.setNewGamePlus?.(this.newGamePlus);
    this.world?.setNewGamePlusMode?.(this.newGamePlus);
    this.ui.setDeveloperPanel(true, this.developerWave);
    this.syncUI();
  }

  togglePause() {
    if (!this.gameplayActive) return;
    this.paused = !this.paused;
    if (this.paused) {
      this.grabSystem?.setEnabled(false);
      this.audio.setMusicLevel(0.12, 0.18);
      this.ui.setMode("paused");
    } else {
      this.grabSystem?.setEnabled(true);
      this.audio.setMusicLevel(0.34, 0.22);
      this.ui.setMode("playing");
    }
  }

  syncUI() {
    this.ui.setHUD({
      wave: Math.min(this.waveIndex + 1, CONFIG.waves.length),
      souls: this.souls,
      health: this.manorHealth,
      maxHealth: this.manorMaxHealth,
      deaths: this.demonDeaths,
      boundSouls: this.boundSouls,
      unassignedSouls: this.getUnassignedSouls(),
      bombs: this.bombs,
      fortifyLevel: this.fortifyLevel,
      extractionLevel: this.extractionLevel,
      buildings: { ...this.buildings },
      assignments: { ...this.assignments },
      purchaseCosts: {
        fortify: this.getFortifyCost(),
        majorFortify: this.getMajorFortifyCost(),
        extractionUpgrade: this.getPurchaseDefinition("extractionUpgrade")
      },
      newGamePlus: this.newGamePlus,
      totalManorDamageTaken: this.totalManorDamageTaken,
      overchargeReserve: this.overchargeReserve,
      overchargeReady: this.overchargeReady,
      totalClicks: this.totalClicks,
      unlockWaves: Object.fromEntries(
        Object.entries(CONFIG.buildings)
          .filter(([, value]) => value.unlockWave)
          .map(([key, value]) => [key, value.unlockWave])
      )
    });
  }

  isMobileLandscapeView() {
    return !!this.mobileOptimized && window.innerWidth > window.innerHeight && window.innerHeight <= 700;
  }

  applyResponsiveCamera(immediate = false) {
    if (!this.camera) return;

    if (this.isMobileLandscapeView()) {
      // Use the Portals 844x390 viewport as the framing reference. Phones with
      // wider aspect ratios would otherwise reveal extra world at both sides,
      // including the demon spawn edge and the far side of the manor. Holding
      // horizontal FOV constant keeps that composition consistent across
      // landscape phones while still allowing the viewport height to vary.
      const referenceAspect = 844 / 390;
      const referenceVerticalFov = THREE.MathUtils.degToRad(38.5);
      const referenceHorizontalFov = 2 * Math.atan(
        Math.tan(referenceVerticalFov / 2) * referenceAspect
      );
      const aspect = Math.max(1.35, window.innerWidth / Math.max(window.innerHeight, 1));
      const adaptiveVerticalFov = 2 * Math.atan(
        Math.tan(referenceHorizontalFov / 2) / aspect
      );

      // v1.7.2 held the horizontal framing completely fixed on increasingly
      // wide phones. That successfully hid the spawn/manor edges, but on
      // extra-wide devices it cropped a little too much from the top and
      // sides. Keep 75% of that corrective crop and relax the remaining 25%
      // back toward the 844x390 reference framing. The Portals reference
      // itself is therefore unchanged, while longer phones gain a small
      // amount of extra breathing room without returning to the old wide view.
      const adaptiveVerticalFovDegrees = THREE.MathUtils.radToDeg(adaptiveVerticalFov);
      const referenceVerticalFovDegrees = THREE.MathUtils.radToDeg(referenceVerticalFov);
      const relaxedVerticalFov = aspect > referenceAspect
        ? THREE.MathUtils.lerp(adaptiveVerticalFovDegrees, referenceVerticalFovDegrees, 0.25)
        : adaptiveVerticalFovDegrees;

      this.camera.fov = THREE.MathUtils.clamp(
        relaxedVerticalFov,
        31.5,
        41.5
      );
      this.cameraBase.set(0.2, 8.75, 24.4);
      this.cameraTarget.set(2.25, 3.0, 0);
    } else {
      this.camera.fov = CONFIG.camera.fov;
      this.cameraBase.set(...CONFIG.camera.position);
      this.cameraTarget.set(...CONFIG.camera.target);
    }

    this.camera.updateProjectionMatrix();
    if (immediate) this.camera.position.copy(this.cameraBase);
    this.camera.lookAt(this.cameraTarget);
  }

  updateCamera(dt) {
    this.cameraShake = Math.max(0, this.cameraShake - dt * 1.9);
    if (this.cameraShake > 0) {
      const a = this.cameraShake;
      this.camera.position.set(
        this.cameraBase.x + THREE.MathUtils.randFloatSpread(a),
        this.cameraBase.y + THREE.MathUtils.randFloatSpread(a * 0.55),
        this.cameraBase.z + THREE.MathUtils.randFloatSpread(a * 0.35)
      );
    } else {
      this.camera.position.lerp(this.cameraBase, 0.18);
    }
    this.camera.lookAt(this.cameraTarget);
  }

  animate() {
    if (!this.running) return;
    requestAnimationFrame(this.animate);
    const dt = Math.min(this.clock.getDelta(), 1 / 30);
    const elapsed = this.clock.elapsedTime;
    this.ui.update(dt);

    if (this.endingActive) {
      this.endingTimer += dt;
      if (!this.endingDawnMusicStarted && this.endingTimer >= this.endingDawnMusicDelay) {
        this.endingDawnMusicStarted = true;
        this.audio.playMusic("newDawn", 1.4, false);
      }
    }

    const simulationActive = this.gameplayActive && !this.paused;
    if (this.waveManager) {
      this.waveManager.update(simulationActive ? dt : 0);
      for (const enemy of this.waveManager.getAliveEnemies()) {
        enemy.update(
          simulationActive ? dt : 0,
          elapsed,
          this.grabSystem?.isHolding(enemy) ?? false,
          this.world.manorBarrierX
        );
      }
      if (simulationActive) {
        this.checkWorldCollisions();
      }
    }

    this.grabSystem?.update(simulationActive ? dt : 0);
    this.defence?.update(simulationActive ? dt : 0, simulationActive);
    this.effectPool?.update(this.paused ? 0 : dt);
    this.world?.update(elapsed, this.paused ? 0 : dt);

    const completedBindings = this.world?.consumeExtractionCompletions?.() ?? 0;
    for (let i = 0; i < completedBindings; i += 1) {
      this.audio.play("soulBling", { volume: 0.68, pitchMin: 1.00, pitchMax: 1.05 });
    }

    if ((this.world?.getActiveExtractionCount?.() ?? 0) <= 0) {
      this.audio.stopLoop("soul-binding", 0.35);
    }
    this.updateCamera(dt);
    this.syncUI();
    this.ui.draw();
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.mobileOptimized = (window.matchMedia?.("(pointer: coarse)")?.matches || navigator.maxTouchPoints > 0) && Math.min(window.innerWidth, window.innerHeight) <= 900;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.applyResponsiveCamera(true);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.mobileOptimized ? 1.35 : 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  dispose() {
    this.running = false;
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("keydown", this.onKeyDown, true);
    window.removeEventListener("keyup", this.onKeyUp, true);
    document.removeEventListener("pointerdown", this.focusGameCanvas, true);
    document.removeEventListener("pointerdown", this.trackCampaignClick, true);
    this.ui.dispose();
    this.grabSystem?.dispose();
    this.waveManager?.dispose();
    this.defence?.dispose();
    this.effectPool?.dispose();
    this.world?.dispose();
    this.audio.dispose();
    this.renderer.dispose();
  }
}
