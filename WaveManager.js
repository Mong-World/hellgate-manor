import * as THREE from "three";
import { CONFIG } from "./Config.js";
import { Husk } from "./Husk.js";

export class WaveManager {
  constructor({
    scene,
    assets,
    camera,
    onEnemyDeath,
    onEnemyAttack,
    onEnemyImpact,
    onWaveComplete
  }) {
    this.scene = scene;
    this.assets = assets;
    this.camera = camera;
    this.onEnemyDeath = onEnemyDeath;
    this.onEnemyAttack = onEnemyAttack;
    this.onEnemyImpact = onEnemyImpact;
    this.onWaveComplete = onWaveComplete;
    this.waveIndex = -1;
    this.config = null;
    this.enemies = [];
    this.spawned = 0;
    this.defeated = 0;
    this.spawnTimer = 0;
    this.running = false;
    this.nextEnemyId = 1;
    this.fastQueue = [];
    this.normalPool = [];
    this.fastPool = [];
    this.pooledEnemies = new Set();
  }

  async preparePool({ normalCount, fastCount, onProgress = null }) {
    const total = normalCount + fastCount;
    let created = 0;

    const makePooledEnemy = (fast) => {
      const enemy = this.createEnemy({
        id: -(created + 1),
        fast,
        position: new THREE.Vector3(-40, 0, 0)
      });

      Object.keys(enemy.actions).forEach((name) => {
        enemy.preWarmAction(name);
      });
      enemy.resetAfterWarmup();
      enemy.deactivateForPool();

      const pool = fast ? this.fastPool : this.normalPool;
      pool.push(enemy);
      this.pooledEnemies.add(enemy);
      created += 1;
      onProgress?.(created / Math.max(total, 1));
    };

    for (let i = 0; i < normalCount; i += 1) {
      makePooledEnemy(false);
      if (i % 2 === 1) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
    }

    for (let i = 0; i < fastCount; i += 1) {
      makePooledEnemy(true);
      if (i % 2 === 1) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
    }
  }

  createEnemy({ id, fast, position }) {
    return new Husk({
      id,
      scene: this.scene,
      assets: this.assets,
      camera: this.camera,
      position,
      fast,
      onDeath: (data) => this.handleEnemyDeath(data),
      onAttack: (target) => this.onEnemyAttack?.(target),
      onImpact: (data) => this.onEnemyImpact?.(data)
    });
  }

  getWarmupSamples() {
    return [
      this.normalPool[0] ?? null,
      this.fastPool[0] ?? null
    ].filter(Boolean);
  }

  acquireEnemy(fast, id, position) {
    const pool = fast ? this.fastPool : this.normalPool;
    const enemy = pool.pop() ?? this.createEnemy({ id, fast, position });
    this.pooledEnemies.delete(enemy);
    enemy.resetForSpawn(id, position);
    return enemy;
  }

  releaseEnemy(enemy) {
    if (!enemy || this.pooledEnemies.has(enemy)) return;
    enemy.deactivateForPool();
    const pool = enemy.fast ? this.fastPool : this.normalPool;
    pool.push(enemy);
    this.pooledEnemies.add(enemy);
  }

  startWave(index) {
    this.clear();
    this.waveIndex = index;
    this.config = CONFIG.waves[index];
    this.spawned = 0;
    this.defeated = 0;
    this.spawnTimer = 0.2;
    this.running = true;

    this.fastQueue = Array(this.config.total).fill(false);
    const indices = [...Array(this.config.total).keys()];
    for (let i = indices.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    indices.slice(0, this.config.fast).forEach((index) => {
      this.fastQueue[index] = true;
    });
  }

  update(dt) {
    if (!this.running || !this.config) return;
    this.enemies = this.enemies.filter((enemy) => !enemy.removed);
    const aliveCount = this.getAliveEnemies().length;

    if (this.spawned < this.config.total && aliveCount < this.config.maxActive) {
      this.spawnTimer -= dt;
      if (this.spawnTimer <= 0) {
        this.spawnEnemy();
        this.spawnTimer = this.config.spawnGap;
      }
    }

    if (
      this.spawned >= this.config.total &&
      this.defeated >= this.config.total &&
      this.getAliveEnemies().length === 0
    ) {
      this.running = false;
      this.onWaveComplete?.(this.waveIndex);
    }
  }

  spawnEnemy() {
    const lanes = [-3.8, -2.5, -1.2, 0, 1.2, 2.5, 3.8];
    const z = lanes[Math.floor(Math.random() * lanes.length)] + THREE.MathUtils.randFloatSpread(0.28);
    const fast = this.fastQueue[this.spawned] ?? false;

    const enemy = this.acquireEnemy(
      fast,
      this.nextEnemyId++,
      new THREE.Vector3(
        THREE.MathUtils.randFloat(
          CONFIG.enemy.spawnXMin,
          CONFIG.enemy.spawnXMax
        ),
        0,
        z
      )
    );

    this.enemies.push(enemy);
    this.spawned += 1;
  }

  handleEnemyDeath(data) {
    const enemy = data.enemy;
    if (!enemy || enemy.dead) return;
    enemy.kill();
    this.defeated += 1;
    this.onEnemyDeath?.(data);
    window.setTimeout(() => this.releaseEnemy(enemy), 90);
  }

  getAliveEnemies() {
    return this.enemies.filter((enemy) => !enemy.dead && !enemy.removed);
  }

  getRemainingCount() {
    if (!this.config) return 0;
    return Math.max(0, this.config.total - this.defeated);
  }

  stop() {
    this.running = false;
  }

  clear() {
    this.enemies.forEach((enemy) => this.releaseEnemy(enemy));
    this.enemies = [];
    this.running = false;
  }

  dispose() {
    const allEnemies = new Set([
      ...this.enemies,
      ...this.normalPool,
      ...this.fastPool
    ]);
    allEnemies.forEach((enemy) => enemy.dispose());
    this.enemies = [];
    this.normalPool = [];
    this.fastPool = [];
    this.pooledEnemies.clear();
    this.running = false;
  }
}
