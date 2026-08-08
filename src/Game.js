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

const SAVE_KEY = "hellgate-manor-save-v2";

export class Game {
  constructor(container) {
    this.container = container;
    this.clock = new THREE.Clock();
    this.running = false;
    this.gameplayActive = false;
    this.startingGame = false;
    this.cameraShake = 0;
    this.cameraBase = new THREE.Vector3(...CONFIG.camera.position);

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
      onNewGame: () => this.beginNewGame(),
      onContinueSave: () => this.continueSavedGame(),
      onBomb: () => this.useBomb(),
      onPurchase: (type) => this.purchase(type),
      onAssign: (system, delta) => this.assignBoundSoul(system, delta),
      onDeniedPurchase: () => this.playDeniedPurchase(),
      onResultsContinue: () => this.openIntermission(),
      onSave: () => this.manualSave(),
      onContinue: () => this.continueAfterIntermission(),
      onRetry: () => this.retryWave(),
      onRestart: () => this.beginNewGame()
    });

    this.resetState();
    this.onResize = this.onResize.bind(this);
    this.animate = this.animate.bind(this);
    window.addEventListener("resize", this.onResize);
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
    this.demolitionProgress = 0;
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
    await this.assets.loadAll();

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
    this.ui.setHasSave(this.hasSave());
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
    this.world.setUpgradeState({ extraction: true, demolition: true, undercroft: true, occult: true, fortifyLevel: 10 });
    this.world.setTurretLevel(3);

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

  async beginNewGame() {
    if (this.startingGame) return;
    this.startingGame = true;
    await this.audio.unlock();
    this.resetState();
    this.clearSave();
    this.applyUpgradeState();
    this.startCurrentWave();
    this.startingGame = false;
  }

  async continueSavedGame() {
    if (this.startingGame) return;
    this.startingGame = true;
    await this.audio.unlock();
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
      demolitionProgress: this.demolitionProgress,
      buildings: { ...this.buildings },
      assignments: { ...this.assignments }
    };
  }

  restoreState(data) {
    this.waveIndex = THREE.MathUtils.clamp(Number(data.waveIndex) || 0, 0, CONFIG.waves.length - 1);
    this.souls = Math.max(0, Number(data.souls) || 0);
    this.manorHealth = Math.max(1, Number(data.manorHealth) || CONFIG.manor.startHealth);
    this.manorMaxHealth = Math.max(CONFIG.manor.maxHealth, Number(data.manorMaxHealth) || CONFIG.manor.maxHealth);
    this.demonDeaths = Math.max(0, Number(data.demonDeaths) || 0);
    this.boundSouls = Math.max(0, Number(data.boundSouls) || 0);
    this.bombs = THREE.MathUtils.clamp(Number(data.bombs) || 0, 0, CONFIG.defence.bombMaxCharges);
    this.fortifyLevel = Math.max(0, Number(data.fortifyLevel) || 0);
    this.demolitionProgress = Math.max(0, Number(data.demolitionProgress) || 0);
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
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {
      // localStorage can be unavailable in restricted embeds.
    }
    this.ui.setHasSave(false);
  }

  startCurrentWave() {
    this.gameplayActive = true;
    this.grabSystem.setEnabled(true);
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
      enemy.convertible &&
      this.world.isInsideExtractionZone(enemy.position) &&
      this.waveManager.getExtractionCount() < CONFIG.extraction.maxConcurrent
    ) {
      const slot = this.waveManager.getExtractionCount();
      enemy.position.copy(this.world.getExtractionPosition(slot));
      const started = this.waveManager.startExtraction(
        enemy,
        CONFIG.extraction.duration,
        0
      );
      if (started) {
        this.audio.play("ash", { volume: 0.28, pitchMin: 0.75, pitchMax: 0.9 });
        return true;
      }
    }

    this.audio.playThrow(velocity.length());
    return false;
  }

  handleEnemyExtracted(enemy) {
    const start = enemy?.position?.clone?.() ?? this.world.extractionCentre.clone().add(new THREE.Vector3(0, 2.8, 0));
    const target = new THREE.Vector3(this.world.manorBarrierX + 1.3, 4.3, 0);
    this.effectPool.ash(start, true);
    this.effectPool.soul(start, target, () => {
      this.boundSouls += 1;
      if (this.buildings.hellfire) this.assignments.hellfire += 1;
      this.audio.play("soulCollect", { volume: 0.62, pitchMin: 0.92, pitchMax: 1.1 });
      this.normaliseAssignments();
      this.applyUpgradeState();
      this.syncUI();
    });
  }

  handleEnemyDeath({ enemy, position, impactStrength = 9, reason }) {
    if (!enemy) return;
    this.souls += enemy.soulValue;
    this.demonDeaths += 1;
    this.ui.pulseSouls();

    const target = new THREE.Vector3(this.world.manorBarrierX + 1.2, 4.2, 0);
    this.effectPool.soul(position, target, () => {
      this.audio.play("soulCollect", { volume: 0.58, pitchMin: 0.9, pitchMax: 1.12 });
    });
    this.effectPool.ash(position, reason === "bomb" || reason === "occult");
    this.effectPool.ring(
      position.clone().setY(0.04),
      impactStrength,
      reason === "occult" ? 0xa16cff : reason === "bomb" ? 0xff3b12 : 0xff7a34
    );

    this.audio.play("ash", {
      volume: reason === "bomb" ? 0.42 : 0.58,
      pitchMin: 0.84,
      pitchMax: 1.16
    });
    this.cameraShake = Math.max(this.cameraShake, reason === "bomb" ? 0.3 : 0.18);
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

    // Bound-soul systems do their between-wave work before the save/shop opens.
    if (this.buildings.undercroft && this.assignments.undercroft > 0) {
      const repair = this.assignments.undercroft * 8;
      this.manorHealth = Math.min(this.manorMaxHealth, this.manorHealth + repair);
    }

    if (this.buildings.demolition && this.assignments.demolition > 0) {
      this.demolitionProgress += this.assignments.demolition / 8;
      while (this.demolitionProgress >= 1 && this.bombs < CONFIG.defence.bombMaxCharges) {
        this.demolitionProgress -= 1;
        this.bombs += 1;
      }
    }

    this.syncUI();
    if (this.waveIndex >= CONFIG.waves.length - 1) {
      this.clearSave();
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

  getPurchaseDefinition(type) {
    const repairs = CONFIG.manor.repairs;
    return {
      repairMinor: repairs.minor.cost,
      repairMajor: repairs.major.cost,
      repairFull: repairs.full.cost,
      fortify: CONFIG.manor.fortify.cost,
      majorFortify: CONFIG.manor.majorFortify.cost,
      extraction: CONFIG.buildings.extraction.cost,
      hellfire: CONFIG.buildings.hellfire.cost,
      demolition: CONFIG.buildings.demolition.cost,
      undercroft: CONFIG.buildings.undercroft.cost,
      occult: CONFIG.buildings.occult.cost
    }[type];
  }

  purchase(type) {
    if (this.ui.mode !== "intermission") return;
    const cost = this.getPurchaseDefinition(type);
    if (cost == null || this.souls < cost) return this.playDeniedPurchase();

    if (type.startsWith("repair") && this.manorHealth >= this.manorMaxHealth) return this.playDeniedPurchase();
    if (["hellfire", "demolition", "undercroft", "occult"].includes(type) && !this.buildings.extraction) {
      return this.playDeniedPurchase();
    }
    if (this.buildings[type]) return this.playDeniedPurchase();

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
      this.fortifyLevel += 10;
    } else if (type in this.buildings) {
      this.buildings[type] = true;
      if (type === "hellfire") {
        const unassigned = this.getUnassignedSouls();
        this.assignments.hellfire += unassigned;
      }
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
      this.assignments[key] = Math.max(0, Math.floor(Number(this.assignments[key]) || 0));
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
    this.waveIndex += 1;
    this.startCurrentWave();
  }

  useBomb() {
    if (!this.gameplayActive || this.bombs <= 0) return;
    const targets = [...this.waveManager.getActiveCombatEnemies()];
    if (targets.length === 0) return;
    this.bombs -= 1;
    this.audio.play("bombExplosion", { volume: 0.78, pitchMin: 0.96, pitchMax: 1.04 });
    targets.forEach((enemy) => {
      const amount = enemy.type === "siege" ? 2 : enemy.durability;
      enemy.applyDamage(amount, "bomb", 15);
    });
    this.cameraShake = Math.max(this.cameraShake, 0.42);
    this.syncUI();
  }

  failWave() {
    if (!this.gameplayActive) return;
    this.gameplayActive = false;
    this.grabSystem.setEnabled(false);
    this.waveManager.stop();
    this.audio.stopMusic(0.45);
    this.audio.play("gameOver", { volume: 0.78 });
    this.ui.setMode("gameOver");
  }

  retryWave() {
    if (!this.waveStartSnapshot) return;
    this.waveManager.clear();
    this.restoreState(this.waveStartSnapshot);
    this.applyUpgradeState();
    this.startCurrentWave();
  }

  checkWorldCollisions() {
    for (const enemy of this.waveManager.getAliveEnemies()) {
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
          enemy.velocity.x = -Math.abs(enemy.velocity.x) * 0.30;
          enemy.knockDown(enemy.velocity);
        }
        continue;
      }

      if (this.world.findTreeCollision(enemy.position)) {
        if (speed >= CONFIG.enemy.treeKillSpeed) enemy.hitHardSurface("tree", speed);
        else {
          this.handleEnemyImpact({ impactStrength: speed });
          enemy.velocity.x *= -0.24;
          enemy.velocity.z *= -0.24;
          enemy.knockDown(enemy.velocity);
        }
      }
    }
  }

  checkEnemyCollisions() {
    const enemies = this.waveManager.getActiveCombatEnemies();
    for (let i = 0; i < enemies.length; i += 1) {
      for (let j = i + 1; j < enemies.length; j += 1) {
        const a = enemies[i];
        const b = enemies[j];
        if (a.collisionCooldown > 0 || b.collisionCooldown > 0) continue;
        const radiusA = a.type === "brute" ? 0.9 : a.type === "siege" ? 1.5 : CONFIG.enemy.collisionRadius;
        const radiusB = b.type === "brute" ? 0.9 : b.type === "siege" ? 1.5 : CONFIG.enemy.collisionRadius;
        const minDistance = radiusA + radiusB;
        const dx = a.position.x - b.position.x;
        const dz = a.position.z - b.position.z;
        if (dx * dx + dz * dz > minDistance * minDistance) continue;
        const source = a.state === "airborne" ? a : b.state === "airborne" ? b : null;
        if (!source || source.velocity.length() < 3) continue;
        const other = source === a ? b : a;
        if (other.type === "siege") continue;
        const push = source.velocity.clone();
        push.y = 0;
        source.collisionCooldown = 0.42;
        other.collisionCooldown = 0.42;
        this.handleEnemyImpact({ impactStrength: source.velocity.length() });
        source.knockDown(push);
        other.knockDown(push);
      }
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
      buildings: { ...this.buildings },
      assignments: { ...this.assignments }
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

    if (this.waveManager) {
      this.waveManager.update(this.gameplayActive ? dt : 0);
      for (const enemy of this.waveManager.getAliveEnemies()) {
        enemy.update(
          this.gameplayActive ? dt : 0,
          elapsed,
          this.grabSystem?.isHolding(enemy) ?? false,
          this.world.manorBarrierX
        );
      }
      if (this.gameplayActive) {
        this.checkWorldCollisions();
        this.checkEnemyCollisions();
      }
    }

    this.grabSystem?.update(this.gameplayActive ? dt : 0);
    this.defence?.update(dt, this.gameplayActive);
    this.effectPool?.update(dt);
    this.world?.update(elapsed, dt);
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
