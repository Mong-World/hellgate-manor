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
    const enemy = pool.pop() ?? this.createEnemy({ id, type, position });
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

  startWave(index) {
    this.clearActiveOnly();
    this.waveIndex = index;
    this.config = CONFIG.waves[index];
    this.queue = this.makeQueue(this.config.counts);
    this.spawned = 0;
    this.resolved = 0;
    this.spawnTimer = this.config.initialDelay;
    this.running = true;
  }

  update(dt) {
    if (!this.running || !this.config) return;
    this.enemies = this.enemies.filter((enemy) => !enemy.removed);

    if (this.spawned < this.queue.length) {
      this.spawnTimer -= dt;
      if (this.spawnTimer <= 0) {
        const available = Math.max(0, this.config.maxActive - this.getActiveCombatEnemies().length);
        if (available > 0) {
          let burst = 1;
          if (Math.random() < this.config.burstChance) {
            burst = THREE.MathUtils.randInt(2, this.config.burstMax);
          }
          burst = Math.min(burst, available, this.queue.length - this.spawned);
          for (let i = 0; i < burst; i += 1) this.spawnEnemy(i, burst);
          const jitter = THREE.MathUtils.randFloat(0.78, 1.22);
          this.spawnTimer = this.config.spawnGap * jitter;
        } else {
          // The 25-enemy cap is the only thing that pauses spawning.
          this.spawnTimer = 0.2;
        }
      }
    }

    if (
      this.spawned >= this.queue.length &&
      this.resolved >= this.queue.length &&
      this.getActiveCombatEnemies().length === 0 &&
      this.activeExtractions.size === 0
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
      this.nextEnemyId++,
      new THREE.Vector3(
        THREE.MathUtils.randFloat(CONFIG.enemy.spawnXMin, CONFIG.enemy.spawnXMax) - burstIndex * 0.35,
        0,
        z
      )
    );
    this.enemies.push(enemy);
    this.spawned += 1;
  }

  handleEnemyDeath(data) {
    const enemy = data.enemy;
    if (!enemy || enemy.dead || enemy.removed) return;
    enemy.kill();
    this.resolved += 1;
    this.onEnemyDeath?.(data);
    window.setTimeout(() => this.releaseEnemy(enemy), 80);
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
    return this.enemies.filter((enemy) => !enemy.dead && !enemy.removed);
  }

  getActiveCombatEnemies() {
    return this.enemies.filter(
      (enemy) => !enemy.dead && !enemy.removed && enemy.state !== "extracting"
    );
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
