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
    const params = new URLSearchParams(window.location.search);
    this.developerMode = params.get("dev") === "1";
    this.developerWave = THREE.MathUtils.clamp(Math.floor(Number(params.get("wave")) || 1), 1, CONFIG.waves.length);
    this.developerShop = params.get("shop") === "1";
    this.developerPanelOpen = false;
    this.developerPanelPreviousMode = "start";
    this.developerPanelPreviousPaused = false;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050609);
    this.scene.fog = new THREE.FogExp2(0x08090d, 0.018);

    this.camera = new THREE.PerspectiveCamera(
      CONFIG.camera.fov,
      window.innerWidth / window.innerHeight,
      0.1,
      180
    );
    this.camera.position.copy(this.cameraBase);
    this.camera.lookAt(...CONFIG.camera.target);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
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
      onContinueSave: () => this.continueSavedGame(),
      onBomb: () => this.useBomb(),
      onPause: () => this.togglePause(),
      onPurchase: (type) => this.purchase(type),
      onAssign: (system, delta) => this.assignBoundSoul(system, delta),
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
      onDevClose: () => this.closeDeveloperPanel()
    });

    this.ui.setDeveloperMode(this.developerMode, this.developerWave, this.developerShop);
    this.resetState();
    this.onResize = this.onResize.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.animate = this.animate.bind(this);
    window.addEventListener("resize", this.onResize);
    window.addEventListener("keydown", this.onKeyDown);
  }

  resetState() {
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
    this.waveStartSnapshot = null;
    this.continuesUsed = 0;
    this.paused = false;
  }

  async start() {
    this.setLoadingProgress(3);
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
    this.world = new World(this.scene, this.assets);
    await this.world.load();

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
    this.world.triggerOccultStrike?.(new THREE.Vector3(-3, 0, 0));

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

    this.setLoadingProgress(92);
    // Render the complete pooled effect set before hiding it. Unlike the older
    // warm-up this actually sends every soul/ash/ring material to the GPU.
    for (let frame = 0; frame < 5; frame += 1) {
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

  async beginNewGame() {
    if (this.startingGame) return;
    this.startingGame = true;
    await this.audio.unlock();
    this.world.resetNight?.();
    this.resetState();
    if (!this.developerMode) this.clearSave();

    if (this.developerMode) {
      this.waveIndex = this.developerWave - 1;
      this.souls = 50000;
      this.boundSouls = 120;
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
    this.world.resetNight?.();
    const save = this.readSave();
    if (!save) {
      this.startingGame = false;
      return this.beginNewGame();
    }
    this.restoreState(save);
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
      buildings: { ...this.buildings },
      assignments: { ...this.assignments }
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
    this.buildings = { ...this.buildings, ...(data.buildings ?? {}) };
    this.assignments = { ...this.assignments, ...(data.assignments ?? {}) };
    this.normaliseAssignments();
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

    this.waveStartSnapshot = this.snapshotState();
    this.waveManager.startWave(this.waveIndex);
    this.defence.resetCooldown();
    this.audio.setMusicLevel(0.34, 0.3);
    this.audio.playMusic(this.waveIndex % 2 === 0 ? "background1" : "background2", 0.7);
    this.audio.play("waveStart", { volume: 0.72, pitchMin: 0.97, pitchMax: 1.03 });
    this.ui.setMode("playing");
    this.ui.showBanner(
      `WAVE ${this.waveIndex + 1}`,
      this.waveIndex === 0 ? "THE FIRST DEMONS ARE COMING" : "DEFEND THE MANOR",
      2.6
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
    this.souls += enemy.soulValue;
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
    this.manorHealth = Math.max(0, this.manorHealth - enemy.attackDamage);
    this.world.triggerManorDamageDust?.(enemy.position, enemy.type);
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

    // Undercroft is deliberately capped so it remains useful without turning
    // the manor into an effectively infinite-health economy.
    if (this.buildings.undercroft && this.assignments.undercroft > 0) {
      const repair = this.assignments.undercroft * 6;
      this.manorHealth = Math.min(this.manorMaxHealth, this.manorHealth + repair);
    }

    this.syncUI();
    if (this.waveIndex >= CONFIG.waves.length - 1) {
      this.clearSave();
      this.audio.stopLoop("soul-binding", 0.4);
      this.audio.stopMusic(1.4);
      this.audio.playMusic("newDawn", 1.5, false);
      this.defence.clearForDawn?.();
      this.world.startDawn?.();
      this.ui.setMode("complete");
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

  openIntermission() {
    if (this.ui.mode !== "results") return;
    this.ui.setMode("intermission");
    this.syncUI();
  }

  manualSave() {
    if (this.ui.mode !== "intermission") return;
    const saved = this.saveGame(this.waveIndex + 1);
    this.ui.showSaveNotice(saved);
  }

  getFortifyCost() {
    return CONFIG.helpers.round10(
      CONFIG.manor.fortify.baseCost * Math.pow(1.18, this.fortifyLevel)
    );
  }

  getMajorFortifyCost() {
    const stages = Math.floor(this.fortifyLevel / CONFIG.manor.majorFortify.levels);
    return CONFIG.helpers.round10(
      CONFIG.manor.majorFortify.baseCost * Math.pow(2.15, stages)
    );
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

  purchase(type) {
    if (this.ui.mode !== "intermission") return;
    const cost = this.getPurchaseDefinition(type);
    if (cost == null || this.souls < cost) return this.playDeniedPurchase();

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
    }

    this.audio.play("purchase", { volume: 0.68, pitchMin: 0.96, pitchMax: 1.05 });
    this.normaliseAssignments();
    this.applyUpgradeState();
    this.saveGame(this.waveIndex + 1);
    this.syncUI();
  }

  playDeniedPurchase() {
    this.audio.play("deniedPurchase", { volume: 0.55, pitchMin: 0.97, pitchMax: 1.03 });
  }

  getUnassignedSouls() {
    return Math.max(0, this.boundSouls - Object.values(this.assignments).reduce((sum, value) => sum + value, 0));
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
    let assigned = Object.values(this.assignments).reduce((sum, value) => sum + value, 0);
    while (assigned > this.boundSouls) {
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
    this.saveGame(this.waveIndex + 1);
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
    if (!(this.developerMode && this.developerShop)) this.waveIndex += 1;
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
    this.waveManager.clear();
    this.restoreState(this.waveStartSnapshot);
    this.continuesUsed = used;
    this.applyUpgradeState();
    this.startCurrentWave();
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

  onKeyDown(event) {
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "d") {
      event.preventDefault();
      if (this.developerPanelOpen) this.closeDeveloperPanel();
      else this.openDeveloperPanel();
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
    this.audio.stopLoop("soul-binding", 0.2);
    this.audio.stopMusic(0.5);
    this.audio.playMusic("newDawn", 0.7, false);
    this.defence?.clearForDawn?.();
    this.world?.startDawn?.();
    this.ui.setMode("complete");
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
      unlockWaves: Object.fromEntries(
        Object.entries(CONFIG.buildings)
          .filter(([, value]) => value.unlockWave)
          .map(([key, value]) => [key, value.unlockWave])
      )
    });
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
    this.camera.lookAt(...CONFIG.camera.target);
  }

  animate() {
    if (!this.running) return;
    requestAnimationFrame(this.animate);
    const dt = Math.min(this.clock.getDelta(), 1 / 30);
    const elapsed = this.clock.elapsedTime;
    this.ui.update(dt);

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
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  dispose() {
    this.running = false;
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("keydown", this.onKeyDown);
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
