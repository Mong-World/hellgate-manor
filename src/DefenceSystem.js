import * as THREE from "three";
import { CONFIG } from "./Config.js";

export class DefenceSystem {
  constructor(scene, world, getEnemies, onKillEnemy) {
    this.scene = scene;
    this.world = world;
    this.getEnemies = getEnemies;
    this.onKillEnemy = onKillEnemy;
    this.level = 0;
    this.bombs = 0;
    this.cooldown = CONFIG.defence.fireInterval;
    this.projectiles = [];

    this.projectileGeometry = new THREE.IcosahedronGeometry(0.13, 1);
    this.projectileMaterial = new THREE.MeshStandardMaterial({
      color: 0xff8a3b,
      emissive: 0xff3508,
      emissiveIntensity: 5.5,
      roughness: 0.25
    });
  }

  setLevel(level) {
    this.level = THREE.MathUtils.clamp(level, 0, CONFIG.defence.turretMaxLevel);
    this.world.setTurretLevel(this.level);
  }

  setBombs(count) {
    this.bombs = THREE.MathUtils.clamp(count, 0, CONFIG.defence.bombMaxCharges);
  }

  update(dt, active) {
    this.updateProjectiles(dt);
    if (!active || this.level <= 0) return;
    this.cooldown -= dt;
    if (this.cooldown <= 0) {
      this.cooldown = CONFIG.defence.fireInterval;
      this.fireVolley();
    }
  }

  fireVolley() {
    const targets = this.getEnemies()
      .filter((enemy) => !enemy.dead && !enemy.removed)
      .sort((a, b) => b.position.x - a.position.x)
      .slice(0, this.level);
    targets.forEach((target, index) => this.fireProjectile(target, index));
  }

  fireProjectile(target, mountIndex) {
    const mesh = new THREE.Mesh(this.projectileGeometry, this.projectileMaterial);
    mesh.position.copy(this.world.getTurretOrigin(mountIndex));
    this.scene.add(mesh);
    const light = new THREE.PointLight(0xff4a12, 6, 4, 2);
    mesh.add(light);
    this.projectiles.push({ mesh, target, speed: 18 });
  }

  updateProjectiles(dt) {
    for (let i = this.projectiles.length - 1; i >= 0; i -= 1) {
      const projectile = this.projectiles[i];
      const { mesh, target } = projectile;
      if (!target || target.dead || target.removed) {
        this.scene.remove(mesh);
        this.projectiles.splice(i, 1);
        continue;
      }

      const targetPosition = target.position.clone().add(new THREE.Vector3(0, 1.6, 0));
      const direction = targetPosition.sub(mesh.position);
      const distance = direction.length();

      if (distance <= 0.38) {
        this.scene.remove(mesh);
        this.projectiles.splice(i, 1);
        this.onKillEnemy?.(target, "turret");
        continue;
      }

      direction.normalize();
      mesh.position.addScaledVector(direction, Math.min(distance, projectile.speed * dt));
      mesh.rotation.x += dt * 8;
      mesh.rotation.y += dt * 10;
    }
  }

  useBomb() {
    if (this.bombs <= 0) return false;
    const targets = this.getEnemies().filter((enemy) => !enemy.dead && !enemy.removed);
    if (targets.length === 0) return false;
    this.bombs -= 1;
    targets.forEach((enemy) => this.onKillEnemy?.(enemy, "bomb"));
    return true;
  }

  resetCooldown() {
    this.cooldown = CONFIG.defence.fireInterval;
  }

  dispose() {
    this.projectiles.forEach(({ mesh }) => this.scene.remove(mesh));
    this.projectiles = [];
    this.projectileGeometry.dispose();
    this.projectileMaterial.dispose();
  }
}
