import * as THREE from "three";
import { CONFIG } from "./Config.js";

const ARROW_FORWARD = new THREE.Vector3(0, 0, 1);

export class DefenceSystem {
  constructor(scene, world, getEnemies, onKillEnemy, isEnemyHeld) {
    this.scene = scene;
    this.world = world;
    this.getEnemies = getEnemies;
    this.onKillEnemy = onKillEnemy;
    this.isEnemyHeld = isEnemyHeld ?? (() => false);
    this.level = 0;
    this.bombs = 0;
    this.mountTimers = [];
    this.projectiles = [];
    this.impacts = [];

    this.arrowShaftGeometry = new THREE.CylinderGeometry(0.028, 0.036, 1.05, 7);
    this.arrowShaftGeometry.rotateX(Math.PI / 2);
    this.arrowHeadGeometry = new THREE.ConeGeometry(0.095, 0.28, 7);
    this.arrowHeadGeometry.rotateX(Math.PI / 2);
    this.arrowMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a2518,
      roughness: 0.76,
      metalness: 0.12
    });
    this.arrowHeadMaterial = new THREE.MeshStandardMaterial({
      color: 0x38363a,
      roughness: 0.42,
      metalness: 0.82
    });
    this.fireMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6b1c,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }

  setLevel(level) {
    this.level = THREE.MathUtils.clamp(
      level,
      0,
      CONFIG.defence.turretMaxLevel
    );
    this.world.setTurretLevel(this.level);
    this.resetCooldown();
  }

  setBombs(count) {
    this.bombs = THREE.MathUtils.clamp(
      count,
      0,
      CONFIG.defence.bombMaxCharges
    );
  }

  update(dt, active) {
    this.updateProjectiles(dt);
    this.updateImpacts(dt);

    if (!active || this.level <= 0) return;

    for (let index = 0; index < this.level; index += 1) {
      this.mountTimers[index] -= dt;
      if (this.mountTimers[index] <= 0) {
        this.fireMount(index);
        this.mountTimers[index] += CONFIG.defence.fireInterval;
      }
    }
  }

  fireMount(mountIndex) {
    const target = this.chooseTarget();
    const fallback = this.chooseGroundPoint(mountIndex, target);
    const targetPoint = target
      ? target.position.clone().add(new THREE.Vector3(0, 1.55, 0))
      : fallback.clone();

    this.world.aimTurret(mountIndex, targetPoint);
    this.fireProjectile({
      mountIndex,
      target,
      destination: targetPoint,
      fallback
    });
  }

  chooseTarget() {
    return this.getEnemies()
      .filter(
        (enemy) =>
          !enemy.dead &&
          !enemy.removed &&
          !this.isEnemyHeld(enemy)
      )
      .sort((a, b) => b.position.x - a.position.x)[0] ?? null;
  }

  chooseGroundPoint(mountIndex, target = null) {
    if (target) {
      return new THREE.Vector3(
        target.position.x,
        0.08,
        target.position.z
      );
    }

    const laneOffset = (mountIndex - 1) * 1.8;
    return new THREE.Vector3(
      THREE.MathUtils.randFloat(-11, 7),
      0.08,
      THREE.MathUtils.clamp(
        laneOffset + THREE.MathUtils.randFloatSpread(5.5),
        -5.3,
        5.3
      )
    );
  }

  createArrowMesh() {
    const group = new THREE.Group();

    const shaft = new THREE.Mesh(
      this.arrowShaftGeometry,
      this.arrowMaterial
    );
    shaft.position.z = 0.08;
    shaft.castShadow = true;
    group.add(shaft);

    const head = new THREE.Mesh(
      this.arrowHeadGeometry,
      this.arrowHeadMaterial
    );
    head.position.z = 0.73;
    head.castShadow = true;
    group.add(head);

    const flameGeometry = new THREE.ConeGeometry(0.14, 0.62, 8);
    flameGeometry.rotateX(-Math.PI / 2);
    const flame = new THREE.Mesh(flameGeometry, this.fireMaterial);
    flame.position.z = -0.55;
    group.add(flame);

    const light = new THREE.PointLight(0xff4b12, 8, 5.5, 2);
    light.position.z = -0.32;
    group.add(light);

    return { group, flameGeometry, flame, light };
  }

  fireProjectile({ mountIndex, target, destination, fallback }) {
    const arrow = this.createArrowMesh();
    arrow.group.position.copy(this.world.getTurretOrigin(mountIndex));
    this.scene.add(arrow.group);

    this.projectiles.push({
      ...arrow,
      target,
      destination: destination.clone(),
      fallback: fallback.clone(),
      speed: 22,
      age: 0
    });
  }

  updateProjectiles(dt) {
    for (let i = this.projectiles.length - 1; i >= 0; i -= 1) {
      const projectile = this.projectiles[i];
      projectile.age += dt;

      if (
        projectile.target &&
        !projectile.target.dead &&
        !projectile.target.removed &&
        !this.isEnemyHeld(projectile.target)
      ) {
        projectile.destination.copy(projectile.target.position).add(
          new THREE.Vector3(0, 1.55, 0)
        );
      } else if (projectile.target) {
        projectile.destination.copy(projectile.fallback);
        projectile.target = null;
      }

      const direction = projectile.destination
        .clone()
        .sub(projectile.group.position);
      const distance = direction.length();

      if (distance <= 0.34 || projectile.age > 4.5) {
        const impactPoint = projectile.destination.clone();
        const target = projectile.target;

        this.removeProjectile(i);
        this.createImpact(impactPoint);

        if (
          target &&
          !target.dead &&
          !target.removed &&
          !this.isEnemyHeld(target)
        ) {
          this.onKillEnemy?.(target, "turret");
        }
        continue;
      }

      direction.normalize();
      projectile.group.quaternion.setFromUnitVectors(
        ARROW_FORWARD,
        direction
      );
      projectile.group.position.addScaledVector(
        direction,
        Math.min(distance, projectile.speed * dt)
      );

      const pulse = 0.82 + Math.sin(projectile.age * 23) * 0.12;
      projectile.flame.scale.set(pulse, pulse, 1 + pulse * 0.28);
      projectile.light.intensity = 7 + pulse * 2.2;
    }
  }

  removeProjectile(index) {
    const projectile = this.projectiles[index];
    this.scene.remove(projectile.group);
    projectile.flameGeometry.dispose();
    this.projectiles.splice(index, 1);
  }

  createImpact(position) {
    const geometry = new THREE.RingGeometry(0.12, 0.24, 20);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff6a1d,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.copy(position).setY(0.09);
    this.scene.add(mesh);

    const light = new THREE.PointLight(0xff4b13, 9, 5, 2);
    light.position.copy(position).add(new THREE.Vector3(0, 0.35, 0));
    this.scene.add(light);

    this.impacts.push({ mesh, geometry, material, light, age: 0 });
  }

  updateImpacts(dt) {
    for (let i = this.impacts.length - 1; i >= 0; i -= 1) {
      const impact = this.impacts[i];
      impact.age += dt;
      const t = Math.min(impact.age / 0.42, 1);
      impact.mesh.scale.setScalar(1 + t * 5.5);
      impact.material.opacity = (1 - t) * 0.85;
      impact.light.intensity = (1 - t) * 9;

      if (t >= 1) {
        this.scene.remove(impact.mesh);
        this.scene.remove(impact.light);
        impact.geometry.dispose();
        impact.material.dispose();
        this.impacts.splice(i, 1);
      }
    }
  }

  useBomb() {
    if (this.bombs <= 0) return false;
    const targets = this.getEnemies().filter(
      (enemy) => !enemy.dead && !enemy.removed
    );
    if (targets.length === 0) return false;
    this.bombs -= 1;
    targets.forEach((enemy) => this.onKillEnemy?.(enemy, "bomb"));
    return true;
  }

  resetCooldown() {
    this.mountTimers = Array.from(
      { length: CONFIG.defence.turretMaxLevel },
      (_, index) =>
        CONFIG.defence.fireInterval +
        index * CONFIG.defence.fireStagger
    );
  }

  dispose() {
    for (let i = this.projectiles.length - 1; i >= 0; i -= 1) {
      this.removeProjectile(i);
    }
    for (const impact of this.impacts) {
      this.scene.remove(impact.mesh);
      this.scene.remove(impact.light);
      impact.geometry.dispose();
      impact.material.dispose();
    }
    this.impacts = [];
    this.arrowShaftGeometry.dispose();
    this.arrowHeadGeometry.dispose();
    this.arrowMaterial.dispose();
    this.arrowHeadMaterial.dispose();
    this.fireMaterial.dispose();
  }
}
