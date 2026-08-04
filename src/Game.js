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
    this.loadingElement = document.getElementById("loading");

    this.ui = new UI(document.getElementById("ui-canvas"), {
      onStart: () => this.beginGame(),
      onBomb: () => this.useBomb(),
      onPurchase: (type) => this.purchase(type),
      onContinue: () => this.continueAfterIntermission(),
      onRetry: () => this.retryWave(),
      onRestart: () => this.restartGame()
    });

    this.onResize = this.onResize.bind(this);
    this.animate = this.animate.bind(this);
    window.addEventListener("resize", this.onResize);
  }

  async start() {
    await this.assets.loadAll();
    this.world = new World(this.scene, this.assets);
    await this.world.load();

    this.waveManager = new WaveManager({
      scene: this.scene,
      assets: this.assets,
      camera: this.camera,
      onEnemyDeath: (data) => this.handleEnemyDeath(data),
      onEnemyAttack: (enemy) => this.handleManorAttack(enemy),
      onWaveComplete: () => this.handleWaveComplete()
    });

    this.grabSystem = new GrabSystem({
      camera: this.camera,
      domElement: this.renderer.domElement,
      getEnemies: () => this.waveManager.getAliveEnemies()
    });

    this.defence = new DefenceSystem(
      this.scene,
      this.world,
      () => this.waveManager.getAliveEnemies(),
      (enemy, reason) => this.killEnemyByDefence(enemy, reason)
    );

    this.syncUI();
    this.ui.setMode("start");
    this.running = true;
    requestAnimationFrame(this.animate);

    requestAnimationFrame(() => {
      this.loadingElement.classList.add("hidden");
      window.setTimeout(() => this.loadingElement.remove(), 700);
    });
  }

  beginGame() {
    this.waveIndex = 0;
    this.souls = 0;
    this.manorHealth = CONFIG.manor.startHealth;
    this.manorMaxHealth = CONFIG.manor.maxHealth;
    this.turretLevel = 0;
    this.bombs = 0;
    this.defence.setLevel(0);
    this.defence.setBombs(0);
    this.startCurrentWave();
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
        target: new THREE.Vector3(this.world.manorBarrierX + 1.2, 4.2, 0)
      }));
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
    this.ui.flashHealth();
    this.cameraShake = Math.max(this.cameraShake, 0.08);
    this.syncUI();
    if (this.manorHealth <= 0) this.failWave();
  }

  handleWaveComplete() {
    if (!this.gameplayActive) return;
    this.gameplayActive = false;
    this.grabSystem.setEnabled(false);
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
    if (this.purchaseUsed || this.ui.mode !== "intermission") return;

    if (type === "repair") {
      if (this.souls < CONFIG.manor.repairCost || this.manorHealth >= this.manorMaxHealth) return;
      this.souls -= CONFIG.manor.repairCost;
      this.manorHealth = Math.min(this.manorMaxHealth, this.manorHealth + CONFIG.manor.repairAmount);
    } else if (type === "turret") {
      if (this.turretLevel >= CONFIG.defence.turretMaxLevel) return;
      const cost = CONFIG.defence.turretCosts[this.turretLevel];
      if (this.souls < cost) return;
      this.souls -= cost;
      this.turretLevel += 1;
      this.defence.setLevel(this.turretLevel);
    } else if (type === "bomb") {
      if (this.bombs >= CONFIG.defence.bombMaxCharges || this.souls < CONFIG.defence.bombCost) return;
      this.souls -= CONFIG.defence.bombCost;
      this.bombs += 1;
      this.defence.setBombs(this.bombs);
    } else {
      return;
    }

    this.purchaseUsed = true;
    this.syncUI();
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
    this.bombs = this.defence.bombs;
    this.syncUI();
  }

  failWave() {
    this.gameplayActive = false;
    this.grabSystem.setEnabled(false);
    this.waveManager.stop();
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
    this.waveManager?.clear();
    this.defence?.dispose();
    this.effects.forEach((effect) => effect.dispose());
    this.world?.dispose();
    this.renderer.dispose();
  }
}
