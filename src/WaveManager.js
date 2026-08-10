import * as THREE from "three";
import { CONFIG } from "./Config.js";
import { Husk } from "./Husk.js";

const TYPES = ["husk", "strong", "runner", "brute", "siege"];

export class WaveManager {
  constructor({
    scene,
    assets,
    camera,
    onEnemyDeath,
    onEnemyAttack,
    onEnemyImpact,
    onEnemyExtracted,
    onWaveComplete,
    onSiegeClick
  }) {
    this.scene = scene;
    this.assets = assets;
    this.camera = camera;
    this.onEnemyDeath = onEnemyDeath;
    this.onEnemyAttack = onEnemyAttack;
    this.onEnemyImpact = onEnemyImpact;
    this.onEnemyExtracted = onEnemyExtracted;
    this.onWaveComplete = onWaveComplete;
    this.onSiegeClick = onSiegeClick;

    this.waveIndex = -1;
    this.config = null;
    this.enemies = [];
    this.queue = [];
    this.spawned = 0;
    this.resolved = 0;
    this.spawnTimer = 0;
    this.running = false;
    this.nextEnemyId = 1;
    this.pools = Object.fromEntries(TYPES.map((type) => [type, []]));
    this.pooledEnemies = new Set();
    this.activeExtractions = new Set();
    this.newGamePlus = false;
    this.mobileDifficulty = false;
    this.poolMisses = Object.fromEntries(TYPES.map((type) => [type, 0]));
    this.aliveScratch = [];
    this.combatScratch = [];
  }

  setNewGamePlus(enabled) {
    this.newGamePlus = !!enabled;
  }

  setMobileDifficulty(enabled) {
    this.mobileDifficulty = !!enabled;
  }

  applyDeviceDifficulty(config, wave) {
    if (!this.mobileDifficulty || wave < (CONFIG.mobileDifficulty?.lateWaveStart ?? 35)) return config;
    return {
      ...config,
      maxActive: config.maxActive + (CONFIG.mobileDifficulty?.maxActiveBonus ?? 2),
      spawnGap: Math.max(0.42, config.spawnGap * (CONFIG.mobileDifficulty?.spawnGapMultiplier ?? 0.92))
    };
  }

  getWaveConfig(index) {
    const base = CONFIG.waves[index];
    const wave = index + 1;
    if (!this.newGamePlus) return this.applyDeviceDifficulty(base, wave);

    const settings = CONFIG.newGamePlus;
    const total = Math.max(12, Math.ceil(base.total * settings.waveCountMultiplier));
    let runner = 0;
    let strong = 0;
    let brute = 0;
    let siege = 0;

    if (wave >= settings.runnerWave) {
      runner = Math.max(3, Math.round(total * Math.min(0.30, 0.08 + (wave - settings.runnerWave) * 0.0065)));
    }
    if (wave >= settings.strongWave) {
      strong = Math.max(3, Math.round(total * Math.min(0.26, 0.07 + (wave - settings.strongWave) * 0.0060)));
    }
    if (wave >= settings.bruteWave) {
      brute = Math.max(2, Math.round(total * Math.min(0.14, 0.04 + (wave - settings.bruteWave) * 0.0032)));
    }
    if (wave >= settings.siegeWave) {
      siege = Math.max(1, Math.round(total * Math.min(0.045, 0.010 + (wave - settings.siegeWave) * 0.0015)));
    }

    const husk = Math.max(8, total - runner - strong - brute - siege);
    return this.applyDeviceDifficulty({
      ...base,
      counts: { husk, strong, runner, brute, siege },
      total,
      maxActive: settings.maxActive,
      initialDelay: Math.max(1.0, base.initialDelay * 0.72),
      spawnGap: Math.max(0.46, base.spawnGap * 0.84),
      burstChance: Math.min(0.94, base.burstChance + 0.10),
      burstMax: Math.min(9, base.burstMax + 1),
      huskPaceVariation: true
    }, wave);
  }

  async preparePools(onProgress = null) {
    const counts = CONFIG.pool;
    const jobs = [];
    for (const type of TYPES) {
      for (let i = 0; i < counts[type]; i += 1) jobs.push(type);
    }

    for (let index = 0; index < jobs.length; index += 1) {
      const type = jobs[index];
      const enemy = this.createEnemy({
        id: -(index + 1),
        type,
        position: new THREE.Vector3(-45, 0, 0)
      });
      enemy.preWarmAllActions();
      enemy.deactivateForPool();
      this.pools[type].push(enemy);
      this.pooledEnemies.add(enemy);
      onProgress?.((index + 1) / jobs.length);
      if (index % 2 === 1) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
    }
  }

  createEnemy({ id, type, position }) {
    return new Husk({
      id,
      type,
      scene: this.scene,
      assets: this.assets,
      camera: this.camera,
      position,
      onDeath: (data) => this.handleEnemyDeath(data),
      onAttack: (enemy) => this.onEnemyAttack?.(enemy),
      onImpact: (data) => this.onEnemyImpact?.(data),
      onSiegeClick: (enemy) => this.onSiegeClick?.(enemy),
      onExtractionComplete: (enemy) => this.finishExtraction(enemy)
    });
  }

  getWarmupSamples() {
    return TYPES.map((type) => this.pools[type][0]).filter(Boolean);
  }

  getAllPooledEnemies() {
    return Object.values(this.pools).flat();
  }

  acquireEnemy(type, id, position) {
    const pool = this.pools[type];
    const enemy = pool.pop();
    if (!enemy) {
      // Never construct a skinned/animated GLB during live gameplay. The pools
      // are sized to cover the campaign caps, so this is a diagnostic fallback
      // only; spawning simply waits for a pooled enemy to become free.
      this.poolMisses[type] = (this.poolMisses[type] ?? 0) + 1;
      return null;
    }
    this.pooledEnemies.delete(enemy);
    enemy.resetForSpawn(id, position, type);
    return enemy;
  }

  releaseEnemy(enemy) {
    if (!enemy || this.pooledEnemies.has(enemy)) return;
    this.activeExtractions.delete(enemy);
    enemy.deactivateForPool();
    this.pools[enemy.type].push(enemy);
    this.pooledEnemies.add(enemy);
  }

  makeQueue(counts) {
    const queue = [];
    for (const type of TYPES) {
      for (let i = 0; i < (counts[type] ?? 0); i += 1) queue.push(type);
    }

    // Shuffle, but keep the first few spawns readable by biasing basic enemies forward.
    for (let i = queue.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }

    if ((counts.husk ?? 0) > 0) {
      const firstHusk = queue.indexOf("husk");
      if (firstHusk > 0) [queue[0], queue[firstHusk]] = [queue[firstHusk], queue[0]];
    }
    return queue;
  }

  startWave(index, minimumInitialDelay = 0) {
    this.clearActiveOnly();
    this.waveIndex = index;
    this.config = this.getWaveConfig(index);
    this.queue = this.makeQueue(this.config.counts);
    this.spawned = 0;
    this.resolved = 0;
    this.spawnTimer = Math.max(this.config.initialDelay, minimumInitialDelay);
    this.running = true;
  }

  update(dt) {
    if (!this.running || !this.config) return;

    // Compact the active list in place instead of allocating a new filtered
    // array every frame. This reduces garbage-collector pressure in long waves.
    let write = 0;
    for (let read = 0; read < this.enemies.length; read += 1) {
      const enemy = this.enemies[read];
      if (!enemy.removed) this.enemies[write++] = enemy;
    }
    this.enemies.length = write;

    if (this.spawned < this.queue.length) {
      this.spawnTimer -= dt;
      if (this.spawnTimer <= 0) {
        const available = Math.max(0, this.config.maxActive - this.countActiveCombatEnemies());
        if (available > 0) {
          let burst = 1;
          if (Math.random() < this.config.burstChance) {
            burst = THREE.MathUtils.randInt(2, this.config.burstMax);
          }
          burst = Math.min(burst, available, this.queue.length - this.spawned);
          let spawnedNow = 0;
          for (let i = 0; i < burst; i += 1) {
            if (!this.spawnEnemy(i, burst)) break;
            spawnedNow += 1;
          }
          if (spawnedNow > 0) {
            const jitter = THREE.MathUtils.randFloat(0.78, 1.22);
            this.spawnTimer = this.config.spawnGap * jitter;
          } else {
            this.spawnTimer = 0.08;
          }
        } else {
          // The 25-enemy cap is the only thing that pauses spawning.
          this.spawnTimer = 0.2;
        }
      }
    }

    if (
      this.spawned >= this.queue.length &&
      this.resolved >= this.queue.length &&
      this.countActiveCombatEnemies() === 0
    ) {
      this.running = false;
      this.onWaveComplete?.(this.waveIndex);
    }
  }

  spawnEnemy(burstIndex = 0, burstSize = 1) {
    const lanes = [-4.3, -3.1, -1.9, -0.7, 0.7, 1.9, 3.1, 4.3];
    const lane = lanes[Math.floor(Math.random() * lanes.length)];
    const type = this.queue[this.spawned] ?? "husk";
    const z = THREE.MathUtils.clamp(
      lane + THREE.MathUtils.randFloatSpread(0.3) + (burstIndex - (burstSize - 1) / 2) * 0.18,
      -5.3,
      5.3
    );
    const enemy = this.acquireEnemy(
      type,
      this.nextEnemyId,
      new THREE.Vector3(
        THREE.MathUtils.randFloat(CONFIG.enemy.spawnXMin, CONFIG.enemy.spawnXMax) - burstIndex * 0.35,
        0,
        z
      )
    );
    if (!enemy) return false;
    this.nextEnemyId += 1;

    // From Wave 4 onward the basic Husk population includes slower walkers and
    // slightly quicker walkers without introducing the true Running Husk early.
    if (type === "husk" && this.config.huskPaceVariation) {
      const roll = Math.random();
      const multiplier = roll < 0.24 ? 0.78 : roll > 0.72 ? 1.18 : 1.0;
      enemy.walkSpeed *= multiplier;
      enemy.walkAnimationSpeed *= THREE.MathUtils.lerp(0.88, 1.12, (multiplier - 0.78) / 0.40);
      if (enemy.actions.walk) enemy.actions.walk.timeScale = enemy.walkAnimationSpeed;
    }

    if (this.newGamePlus) {
      enemy.walkSpeed *= CONFIG.newGamePlus.enemySpeedMultiplier;
      enemy.attackDamage = Math.ceil(enemy.attackDamage * CONFIG.newGamePlus.enemyAttackMultiplier);
      enemy.attackInterval *= CONFIG.newGamePlus.enemyAttackIntervalMultiplier;
      enemy.walkAnimationSpeed *= 1.08;
      if (enemy.actions.walk) enemy.actions.walk.timeScale = enemy.walkAnimationSpeed;
    }

    this.enemies.push(enemy);
    this.spawned += 1;
    return true;
  }

  handleEnemyDeath(data) {
    const enemy = data.enemy;
    if (!enemy || enemy.dead || enemy.removed) return;
    enemy.kill();
    this.resolved += 1;
    this.onEnemyDeath?.(data);
    window.setTimeout(() => this.releaseEnemy(enemy), 80);
  }


  captureEnemy(enemy) {
    if (!enemy || enemy.dead || enemy.removed || !enemy.convertible) return false;
    enemy.kill();
    this.activeExtractions.delete(enemy);
    this.resolved += 1;
    window.setTimeout(() => this.releaseEnemy(enemy), 70);
    return true;
  }

  startExtraction(enemy, duration, slotOffset = 0) {
    if (!enemy || enemy.dead || enemy.removed || !enemy.convertible) return false;
    if (this.activeExtractions.has(enemy)) return false;
    const started = enemy.beginExtraction(duration, slotOffset);
    if (!started) return false;
    this.activeExtractions.add(enemy);
    this.resolved += 1;
    return true;
  }

  finishExtraction(enemy) {
    if (!this.activeExtractions.has(enemy)) return;
    this.activeExtractions.delete(enemy);
    this.onEnemyExtracted?.(enemy);
    this.releaseEnemy(enemy);
  }

  getAliveEnemies() {
    this.aliveScratch.length = 0;
    for (const enemy of this.enemies) {
      if (!enemy.dead && !enemy.removed) this.aliveScratch.push(enemy);
    }
    return this.aliveScratch;
  }

  getActiveCombatEnemies() {
    this.combatScratch.length = 0;
    for (const enemy of this.enemies) {
      if (!enemy.dead && !enemy.removed && enemy.state !== "extracting") this.combatScratch.push(enemy);
    }
    return this.combatScratch;
  }

  countActiveCombatEnemies() {
    let count = 0;
    for (const enemy of this.enemies) {
      if (!enemy.dead && !enemy.removed && enemy.state !== "extracting") count += 1;
    }
    return count;
  }

  getPoolDiagnostics() {
    return {
      misses: this.poolMisses,
      free: Object.fromEntries(TYPES.map((type) => [type, this.pools[type].length]))
    };
  }

  getExtractionCount() {
    return this.activeExtractions.size;
  }

  stop() {
    this.running = false;
  }

  clearActiveOnly() {
    this.enemies.forEach((enemy) => this.releaseEnemy(enemy));
    this.enemies = [];
    this.activeExtractions.clear();
    this.running = false;
  }

  clear() {
    this.clearActiveOnly();
  }

  dispose() {
    this.clearActiveOnly();
    for (const type of TYPES) {
      this.pools[type].forEach((enemy) => enemy.dispose());
      this.pools[type] = [];
    }
    this.pooledEnemies.clear();
  }
}
