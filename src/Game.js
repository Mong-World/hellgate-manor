import * as THREE from "three";
import { CONFIG } from "./Config.js";
import { AssetLibrary } from "./AssetLibrary.js";
import { World } from "./World.js";
import { GrabSystem } from "./GrabSystem.js";
import { WaveManager } from "./WaveManager.js";
import { DefenceSystem } from "./DefenceSystem.js";
import { UI } from "./UI.js";
import { AshExplosion } from "./effects/AshExplosion.js";
import { SoulEmber } from "./effects/SoulEmber.js";
import { ImpactRing } from "./effects/ImpactRing.js";
import { AudioManager } from "./AudioManager.js";

export class Game {
  constructor(container) {
    this.container = container;
    this.clock = new THREE.Clock();
    this.effects = [];
    this.running = false;
    this.gameplayActive = false;
    this.waveIndex = 0;
    this.souls = 0;
    this.manorHealth = CONFIG.manor.startHealth;
    this.manorMaxHealth = CONFIG.manor.maxHealth;
    this.turretLevel = 0;
    this.bombs = 0;
    this.purchaseUsed = false;
    this.startingGame = false;
    this.waveStartSnapshot = null;
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
    this.loadingStatus = document.getElementById("loading-status");
    this.loadingProgress = document.getElementById("loading-progress");
    this.loadingPercent = document.getElementById("loading-percent");

    this.ui = new UI(document.getElementById("ui-canvas"), {
      onStart: () => this.beginGame(),
      onBomb: () => this.useBomb(),
      onPurchase: (type) => this.purchase(type),
      onDeniedPurchase: () => this.playDeniedPurchase(),
      onContinue: () => this.continueAfterIntermission(),
      onRetry: () => this.retryWave(),
      onRestart: () => this.restartGame()
    });

    this.onResize = this.onResize.bind(this);
    this.animate = this.animate.bind(this);
    window.addEventListener("resize", this.onResize);
  }

  async start() {
    this.setLoadingProgress(3, "LOADING FONT");
    try {
      await document.fonts?.load('32px "Lansbury"');
    } catch (error) {
      console.warn("Lansbury font could not be preloaded.", error);
    }

    this.setLoadingProgress(8, "DECODING SOUND AND MUSIC");
    await this.audio.loadAll((progress) => {
      this.setLoadingProgress(
        8 + progress * 20,
        "DECODING SOUND AND MUSIC"
      );
    });

    this.setLoadingProgress(30, "LOADING MANOR AND HUSK");
    await this.assets.loadAll();

    this.setLoadingProgress(45, "BUILDING THE BATTLEFIELD");
    this.world = new World(this.scene, this.assets);
    await this.world.load();

    this.setLoadingProgress(56, "PREPARING WAVES");
    this.waveManager = new WaveManager({
      scene: this.scene,
      assets: this.assets,
      camera: this.camera,
      onEnemyDeath: (data) => this.handleEnemyDeath(data),
      onEnemyAttack: (enemy) => this.handleManorAttack(enemy),
      onEnemyImpact: (data) => this.handleEnemyImpact(data),
      onWaveComplete: () => this.handleWaveComplete()
    });

    const maxFastHusks = Math.max(...CONFIG.waves.map((wave) => wave.fast));
    const maxNormalHusks = Math.max(
      ...CONFIG.waves.map((wave) => wave.total - wave.fast)
    );
    this.setLoadingProgress(58, "PREPARING HUSK POOL");
    await this.waveManager.preparePool({
      normalCount: maxNormalHusks,
      fastCount: maxFastHusks,
      onProgress: (progress) => {
        this.setLoadingProgress(58 + progress * 10, "PREPARING HUSK POOL");
      }
    });

    this.grabSystem = new GrabSystem({
      camera: this.camera,
      domElement: this.renderer.domElement,
      getEnemies: () => this.waveManager.getAliveEnemies(),
      onRelease: ({ velocity }) => this.audio.playThrow(velocity.length())
    });

    this.defence = new DefenceSystem(
      this.scene,
      this.world,
      () => this.waveManager.getAliveEnemies(),
      (enemy, reason) => this.killEnemyByDefence(enemy, reason),
      (enemy) => this.grabSystem?.isHolding(enemy) ?? false,
      () => this.audio.play("crossbowFire", {
        volume: 0.82,
        pitchMin: 0.94,
        pitchMax: 1.06
      })
    );

    this.setLoadingProgress(62, "WARMING CREATURE ANIMATIONS");
    await this.preWarmGame();

    this.setLoadingProgress(100, "THE GATE IS READY");
    this.syncUI();
    this.ui.setMode("start");
    this.running = true;
    requestAnimationFrame(this.animate);

    await this.waitForFrame();
    await new Promise((resolve) => window.setTimeout(resolve, 240));
    this.loadingElement.classList.add("hidden");
    window.setTimeout(() => this.loadingElement.remove(), 700);
  }

  setLoadingProgress(percent, message) {
    const safePercent = THREE.MathUtils.clamp(percent, 0, 100);
    if (this.loadingStatus) this.loadingStatus.textContent = message;
    if (this.loadingProgress) this.loadingProgress.style.width = `${safePercent}%`;
    if (this.loadingPercent) this.loadingPercent.textContent = `${Math.round(safePercent)}%`;
  }

  waitForFrame() {
    return new Promise((resolve) => requestAnimationFrame(resolve));
  }

  async preWarmGame() {
    const warmEffects = [];
    const warmHusks = this.waveManager.getWarmupSamples();
    const warmPositions = [
      new THREE.Vector3(-2.6, 0, -0.7),
      new THREE.Vector3(2.3, 0, 0.8)
    ];
    warmHusks.forEach((husk, index) => {
      husk.resetForSpawn(-(index + 1), warmPositions[index]);
    });

    this.setLoadingProgress(68, "WARMING NORMAL AND FAST HUSKS");
    warmHusks.forEach((husk) => husk.preWarmAction("walk"));

    this.setLoadingProgress(72, "WARMING DEATH EFFECTS");
    warmEffects.push(
      new AshExplosion(this.scene, new THREE.Vector3(-2, 1, 0), false),
      new AshExplosion(this.scene, new THREE.Vector3(2, 1, 0), true),
      new SoulEmber({
        scene: this.scene,
        start: new THREE.Vector3(0, 1, 0),
        target: new THREE.Vector3(2, 4, 0)
      }),
      new ImpactRing(
        this.scene,
        new THREE.Vector3(0, 0.04, 1),
        12,
        0xff7a34
      ),
      new ImpactRing(
        this.scene,
        new THREE.Vector3(0, 0.04, -1),
        15,
        0xff3b12
      )
    );

    this.setLoadingProgress(78, "WARMING HELLFIRE DEFENCE");
    this.world.setTurretLevel(CONFIG.defence.turretMaxLevel);
    this.defence.fireProjectile({
      mountIndex: 0,
      target: null,
      destination: new THREE.Vector3(-2, 0.1, 0),
      fallback: new THREE.Vector3(-2, 0.1, 0)
    });
    this.defence.createImpact(new THREE.Vector3(-1, 0.1, 1));

    await this.waitForFrame();

    this.setLoadingProgress(83, "BINDING CREATURE ANIMATIONS");
    const actionNames = new Set();
    warmHusks.forEach((husk) => {
      Object.keys(husk.actions).forEach((name) => actionNames.add(name));
    });

    for (const actionName of actionNames) {
      warmHusks.forEach((husk) => husk.preWarmAction(actionName));
      this.renderer.render(this.scene, this.camera);
      await this.waitForFrame();
    }

    this.setLoadingProgress(90, "COMPILING SHADERS");
    if (typeof this.renderer.compileAsync === "function") {
      await this.renderer.compileAsync(this.scene, this.camera);
    } else {
      this.renderer.compile(this.scene, this.camera);
    }

    for (let frame = 0; frame < 8; frame += 1) {
      const dt = 1 / 30;
      warmHusks.forEach((husk) => {
        husk.preWarmAction("walk", dt);
      });
      warmEffects.forEach((effect) => effect.update(dt));
      this.defence.updateProjectiles(dt);
      this.defence.updateImpacts(dt);
      this.world.update(frame * dt, dt);
      this.renderer.render(this.scene, this.camera);
      await this.waitForFrame();
    }

    this.setLoadingProgress(96, "FINALISING");
    warmEffects.forEach((effect) => effect.dispose());
    warmHusks.forEach((husk) => husk.deactivateForPool());

    for (let i = this.defence.projectiles.length - 1; i >= 0; i -= 1) {
      this.defence.removeProjectile(i);
    }

    for (const impact of this.defence.impacts) {
      this.scene.remove(impact.mesh);
      this.scene.remove(impact.light);
      impact.geometry.dispose();
      impact.material.dispose();
    }
    this.defence.impacts = [];
    this.world.setTurretLevel(0);

    this.renderer.render(this.scene, this.camera);
    await this.waitForFrame();
  }

  async beginGame() {
    if (this.startingGame) return;
    this.startingGame = true;
    await this.audio.unlock();
    this.waveIndex = 0;
    this.souls = 0;
    this.manorHealth = CONFIG.manor.startHealth;
    this.manorMaxHealth = CONFIG.manor.maxHealth;
    this.turretLevel = 0;
    this.bombs = 0;
    this.defence.setLevel(0);
    this.defence.setBombs(0);
    this.startCurrentWave();
    this.startingGame = false;
  }

  startCurrentWave() {
    this.purchaseUsed = false;
    this.gameplayActive = false;
    this.grabSystem.setEnabled(false);

    this.waveStartSnapshot = {
      souls: this.souls,
      manorHealth: this.manorHealth,
      manorMaxHealth: this.manorMaxHealth,
      turretLevel: this.turretLevel,
      bombs: this.bombs
    };

    this.waveManager.startWave(this.waveIndex);
    this.defence.resetCooldown();
    this.audio.setMusicLevel(0.34, 0.35);
    this.audio.playMusic(
      this.waveIndex % 2 === 0 ? "background1" : "background2",
      0.75
    );
    this.audio.play("waveStart", { volume: 0.82, pitchMin: 0.98, pitchMax: 1.02 });
    this.ui.setMode("playing");
    this.ui.showBanner(`WAVE ${this.waveIndex + 1}`, "KEEP YOUR MANOR SAFE", 2.4);
    this.syncUI();

    window.setTimeout(() => {
      if (this.ui.mode !== "playing") return;
      this.gameplayActive = true;
      this.grabSystem.setEnabled(true);
    }, 1550);
  }

  handleEnemyDeath(data) {
    const { enemy, position, impactStrength, reason } = data;
    if (!enemy) return;

    if (reason !== "bomb") {
      this.souls += enemy.soulValue;
      this.ui.pulseSouls();
      this.effects.push(new SoulEmber({
        scene: this.scene,
        start: position.clone(),
        target: new THREE.Vector3(this.world.manorBarrierX + 1.2, 4.2, 0),
        onComplete: () => this.audio.play("soulCollect", {
          volume: 0.68,
          pitchMin: 0.92,
          pitchMax: 1.10
        })
      }));
    }

    this.audio.play("ash", {
      volume: reason === "bomb" ? 0.48 : 0.72,
      pitchMin: 0.86,
      pitchMax: 1.12
    });

    if (reason === "turret") {
      this.audio.playBodyImpact(10);
    }

    this.effects.push(new AshExplosion(
      this.scene,
      position,
      reason === "bomb" || reason === "turret"
    ));
    this.effects.push(new ImpactRing(
      this.scene,
      position.clone().setY(0.04),
      impactStrength || 9,
      reason === "bomb" ? 0xff3b12 : 0xff7a34
    ));

    this.cameraShake = Math.max(this.cameraShake, reason === "bomb" ? 0.34 : 0.22);
    this.syncUI();
  }

  handleEnemyImpact({ impactStrength = 8 } = {}) {
    this.audio.playBodyImpact(impactStrength);
  }

  killEnemyByDefence(enemy, reason) {
    if (!enemy || enemy.dead) return;
    this.waveManager.handleEnemyDeath({
      enemy,
      reason,
      position: enemy.position.clone().add(new THREE.Vector3(0, 1.25, 0)),
      impactStrength: reason === "bomb" ? 15 : 11
    });
  }

  handleManorAttack(enemy) {
    if (!this.gameplayActive || this.manorHealth <= 0 || !enemy || enemy.dead) return;
    this.manorHealth = Math.max(0, this.manorHealth - enemy.attackDamage);
    this.audio.play("attack", {
      volume: enemy.fast ? 0.78 : 0.68,
      pitchMin: enemy.fast ? 1.00 : 0.88,
      pitchMax: enemy.fast ? 1.14 : 1.05
    });
    this.ui.flashHealth();
    this.cameraShake = Math.max(this.cameraShake, 0.08);
    this.syncUI();
    if (this.manorHealth <= 0) this.failWave();
  }

  handleWaveComplete() {
    if (!this.gameplayActive) return;
    this.gameplayActive = false;
    this.grabSystem.setEnabled(false);
    this.audio.setMusicLevel(0.22, 0.55);
    this.souls += 20 * (this.waveIndex + 1);
    this.ui.pulseSouls();

    if (this.waveIndex >= CONFIG.waves.length - 1) {
      this.syncUI();
      this.ui.setMode("complete");
      return;
    }

    this.purchaseUsed = false;
    this.syncUI();
    this.ui.setMode("intermission");
  }

  purchase(type) {
    if (this.purchaseUsed || this.ui.mode !== "intermission") {
      this.playDeniedPurchase();
      return;
    }

    let purchased = false;

    if (type === "repair") {
      if (this.souls >= CONFIG.manor.repairCost && this.manorHealth < this.manorMaxHealth) {
        this.souls -= CONFIG.manor.repairCost;
        this.manorHealth = Math.min(
          this.manorMaxHealth,
          this.manorHealth + CONFIG.manor.repairAmount
        );
        purchased = true;
      }
    } else if (type === "turret") {
      const nextWave = this.waveIndex + 2;
      const cost = CONFIG.defence.turretCosts[this.turretLevel];
      if (
        nextWave >= CONFIG.defence.turretUnlockWave &&
        this.turretLevel < CONFIG.defence.turretMaxLevel &&
        this.souls >= cost
      ) {
        this.souls -= cost;
        this.turretLevel += 1;
        this.defence.setLevel(this.turretLevel);
        purchased = true;
      }
    } else if (type === "bomb") {
      const nextWave = this.waveIndex + 2;
      if (
        nextWave >= CONFIG.defence.bombUnlockWave &&
        this.bombs < CONFIG.defence.bombMaxCharges &&
        this.souls >= CONFIG.defence.bombCost
      ) {
        this.souls -= CONFIG.defence.bombCost;
        this.bombs += 1;
        this.defence.setBombs(this.bombs);
        purchased = true;
      }
    }

    if (!purchased) {
      this.playDeniedPurchase();
      return;
    }

    this.audio.play("purchase", {
      volume: 0.78,
      pitchMin: 0.97,
      pitchMax: 1.04
    });
    this.purchaseUsed = true;
    this.syncUI();
  }

  playDeniedPurchase() {
    this.audio.play("deniedPurchase", {
      volume: 0.65,
      pitchMin: 0.98,
      pitchMax: 1.02
    });
  }

  continueAfterIntermission() {
    if (this.ui.mode !== "intermission") return;
    this.waveIndex += 1;
    this.startCurrentWave();
  }

  useBomb() {
    if (!this.gameplayActive || this.ui.mode !== "playing") return;
    this.defence.setBombs(this.bombs);
    if (!this.defence.useBomb()) return;
    this.audio.play("bombExplosion", { volume: 0.92, pitchMin: 0.97, pitchMax: 1.03 });
    this.bombs = this.defence.bombs;
    this.syncUI();
  }

  failWave() {
    this.gameplayActive = false;
    this.grabSystem.setEnabled(false);
    this.waveManager.stop();
    this.audio.stopMusic(0.8);
    this.audio.play("gameOver", { volume: 0.92, pitchMin: 0.99, pitchMax: 1.01 });
    this.ui.setMode("gameOver");
  }

  retryWave() {
    if (!this.waveStartSnapshot) return;
    Object.assign(this, {
      souls: this.waveStartSnapshot.souls,
      manorHealth: this.waveStartSnapshot.manorHealth,
      manorMaxHealth: this.waveStartSnapshot.manorMaxHealth,
      turretLevel: this.waveStartSnapshot.turretLevel,
      bombs: this.waveStartSnapshot.bombs
    });
    this.defence.setLevel(this.turretLevel);
    this.defence.setBombs(this.bombs);
    this.startCurrentWave();
  }

  restartGame() {
    this.gameplayActive = false;
    this.grabSystem.setEnabled(false);
    this.waveManager.clear();
    this.beginGame();
  }

  checkWorldCollisions() {
    for (const enemy of this.waveManager.getAliveEnemies()) {
      if (enemy.state === "walking") {
        if (enemy.position.x >= this.world.manorBarrierX) {
          enemy.position.x = this.world.manorBarrierX;
          enemy.reachManor();
        }
        continue;
      }

      if (enemy.state !== "airborne") continue;
      const speed = enemy.velocity.length();

      if (this.world.isInsideManorCollision(enemy.position)) {
        if (speed >= CONFIG.enemy.hardSurfaceKillSpeed) {
          enemy.hitHardSurface("manor", speed);
        } else {
          this.handleEnemyImpact({ impactStrength: speed, reason: "manor" });
          enemy.position.x = this.world.manorBarrierX - 0.2;
          enemy.velocity.x = -Math.abs(enemy.velocity.x) * 0.32;
          enemy.knockDown(enemy.velocity);
        }
        continue;
      }

      if (this.world.findTreeCollision(enemy.position)) {
        if (speed >= CONFIG.enemy.treeKillSpeed) {
          enemy.hitHardSurface("tree", speed);
        } else {
          this.handleEnemyImpact({ impactStrength: speed, reason: "tree" });
          enemy.velocity.x *= -0.25;
          enemy.velocity.z *= -0.25;
          enemy.knockDown(enemy.velocity);
        }
      }
    }
  }

  checkEnemyCollisions() {
    const enemies = this.waveManager.getAliveEnemies();
    const minDistance = CONFIG.enemy.collisionRadius * 2;

    for (let i = 0; i < enemies.length; i += 1) {
      for (let j = i + 1; j < enemies.length; j += 1) {
        const a = enemies[i];
        const b = enemies[j];
        if (a.collisionCooldown > 0 || b.collisionCooldown > 0) continue;

        const dx = a.position.x - b.position.x;
        const dz = a.position.z - b.position.z;
        if (dx * dx + dz * dz > minDistance * minDistance) continue;

        const aAirborne = a.state === "airborne";
        const bAirborne = b.state === "airborne";
        if (!aAirborne && !bAirborne) continue;

        const source = aAirborne ? a : b;
        const other = source === a ? b : a;
        if (source.velocity.length() < 2.8) continue;

        const push = source.velocity.clone();
        push.y = 0;
        source.collisionCooldown = 0.45;
        other.collisionCooldown = 0.45;
        this.handleEnemyImpact({
          impactStrength: source.velocity.length(),
          reason: "enemy"
        });
        source.knockDown(push);
        other.knockDown(push);
      }
    }
  }

  syncUI() {
    this.ui.setHUD({
      wave: Math.min(this.waveIndex + 1, CONFIG.waves.length),
      remaining: this.waveManager ? this.waveManager.getRemainingCount() : CONFIG.waves[0].total,
      souls: this.souls,
      health: this.manorHealth,
      maxHealth: this.manorMaxHealth,
      turretLevel: this.turretLevel,
      bombs: this.bombs,
      purchaseUsed: this.purchaseUsed
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
          this.grabSystem?.isHolding(enemy) ?? false
        );
      }
      if (this.gameplayActive) {
        this.checkWorldCollisions();
        this.checkEnemyCollisions();
      }
    }

    this.grabSystem?.update(this.gameplayActive ? dt : 0);
    this.defence?.update(dt, this.gameplayActive);

    for (let i = this.effects.length - 1; i >= 0; i -= 1) {
      const effect = this.effects[i];
      effect.update(dt);
      if (effect.finished) {
        effect.dispose();
        this.effects.splice(i, 1);
      }
    }

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
    this.effects.forEach((effect) => effect.dispose());
    this.world?.dispose();
    this.audio.dispose();
    this.renderer.dispose();
  }
}
