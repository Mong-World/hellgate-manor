import * as THREE from "three";
import { CONFIG } from "./Config.js";

const FORWARD = new THREE.Vector3(0, 0, 1);

export class DefenceSystem {
  constructor(scene, world, getEnemies, onDamageEnemy, isEnemyHeld, onFire, onOccultPulse) {
    this.scene = scene;
    this.world = world;
    this.getEnemies = getEnemies;
    this.onDamageEnemy = onDamageEnemy;
    this.isEnemyHeld = isEnemyHeld ?? (() => false);
    this.onFire = onFire;
    this.onOccultPulse = onOccultPulse;

    this.hellfireSouls = 0;
    this.occultSouls = 0;
    this.mountTimers = [1.2, 2.2, 3.2];
    this.occultTimer = 12;
    this.projectiles = [];
    this.impacts = [];
    this.arrowPool = [];
    this.impactPool = [];

    this.createPools();
  }

  createPools() {
    for (let i = 0; i < 18; i += 1) this.arrowPool.push(this.createArrow());
    for (let i = 0; i < 14; i += 1) this.impactPool.push(this.createImpactObject());
  }

  createArrow() {
    const group = new THREE.Group();
    group.visible = false;
    this.scene.add(group);

    const shaftGeometry = new THREE.CylinderGeometry(0.035, 0.045, 1.24, 7);
    shaftGeometry.rotateX(Math.PI / 2);
    const shaftMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b2418,
      roughness: 0.78,
      metalness: 0.08
    });
    const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
    group.add(shaft);

    const headGeometry = new THREE.ConeGeometry(0.10, 0.30, 7);
    headGeometry.rotateX(Math.PI / 2);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0x49464b,
      roughness: 0.42,
      metalness: 0.8
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.z = 0.74;
    group.add(head);

    const fireGeometry = new THREE.SphereGeometry(0.17, 9, 7);
    const fireMaterial = new THREE.MeshBasicMaterial({
      color: 0xff8b35,
      transparent: true,
      opacity: 0.94,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const fire = new THREE.Mesh(fireGeometry, fireMaterial);
    fire.position.z = -0.24;
    group.add(fire);

    const flameGeometry = new THREE.ConeGeometry(0.13, 0.55, 8);
    flameGeometry.rotateX(-Math.PI / 2);
    const flameMaterial = new THREE.MeshBasicMaterial({
      color: 0xff5315,
      transparent: true,
      opacity: 0.78,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const flame = new THREE.Mesh(flameGeometry, flameMaterial);
    flame.position.z = -0.56;
    group.add(flame);

    return {
      group,
      shaftGeometry,
      shaftMaterial,
      headGeometry,
      headMaterial,
      fireGeometry,
      fireMaterial,
      flameGeometry,
      flameMaterial,
      fire,
      flame,
      active: false,
      target: null,
      destination: new THREE.Vector3(),
      fallback: new THREE.Vector3(),
      age: 0,
      speed: 16
    };
  }

  createImpactObject() {
    const geometry = new THREE.RingGeometry(0.22, 0.44, 20);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff6a1d,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.visible = false;
    this.scene.add(mesh);
    return { mesh, geometry, material, active: false, age: 0 };
  }

  setHellfireSouls(count) {
    this.hellfireSouls = Math.max(0, count);
    this.world.setTurretLevel(this.getMountCount());
    this.resetCooldown();
  }

  setOccultSouls(count) {
    this.occultSouls = Math.max(0, count);
    this.occultTimer = Math.min(this.occultTimer, this.getOccultInterval());
  }

  getMountCount() {
    const souls = Math.min(this.hellfireSouls, CONFIG.defence.hellfireMaxSouls);
    if (souls <= 0) return 0;
    if (souls < 10) return 1;
    if (souls < 25) return 2;
    return 3;
  }

  getFireInterval() {
    const souls = Math.min(this.hellfireSouls, CONFIG.defence.hellfireMaxSouls);
    if (souls <= 0) return Infinity;

    // Each new crossbow resets the reload curve, then additional Bound Souls
    // train the active battery back down again. This makes unlocking a second
    // or third emplacement feel like a real milestone rather than a flat DPS
    // increase hidden inside one number.
    if (souls < 10) {
      const t = THREE.MathUtils.clamp((souls - 1) / 8, 0, 1);
      return THREE.MathUtils.lerp(7.0, 3.8, t);
    }
    if (souls < 25) {
      const t = THREE.MathUtils.clamp((souls - 10) / 14, 0, 1);
      return THREE.MathUtils.lerp(7.0, 3.6, t);
    }
    const t = THREE.MathUtils.clamp((souls - 25) / 20, 0, 1);
    return THREE.MathUtils.lerp(7.0, 2.4, t);
  }

  getOccultInterval() {
    const souls = Math.min(this.occultSouls, CONFIG.defence.occultMaxSouls);
    if (souls <= 0) return Infinity;
    return THREE.MathUtils.lerp(13.5, 6.0, THREE.MathUtils.clamp((souls - 1) / 29, 0, 1));
  }

  update(dt, active) {
    this.updateProjectiles(dt);
    this.updateImpacts(dt);
    if (!active) return;

    const mounts = this.getMountCount();
    if (mounts > 0) {
      for (let index = 0; index < mounts; index += 1) {
        this.mountTimers[index] -= dt;
        if (this.mountTimers[index] <= 0) {
          this.fireMount(index);
          this.mountTimers[index] += this.getFireInterval();
        }
      }
    }

    if (this.occultSouls > 0) {
      this.occultTimer -= dt;
      if (this.occultTimer <= 0) {
        this.fireOccultPulse();
        this.occultTimer = this.getOccultInterval();
      }
    }
  }

  chooseTarget() {
    return this.getEnemies()
      .filter((enemy) => !enemy.dead && !enemy.removed && enemy.state !== "extracting" && !this.isEnemyHeld(enemy))
      .sort((a, b) => b.position.x - a.position.x)[0] ?? null;
  }

  chooseGroundPoint(mountIndex, target = null) {
    if (target) return new THREE.Vector3(target.position.x, 0.08, target.position.z);
    return new THREE.Vector3(
      THREE.MathUtils.randFloat(-12, 7),
      0.08,
      THREE.MathUtils.clamp((mountIndex - 1) * 1.8 + THREE.MathUtils.randFloatSpread(5), -5.2, 5.2)
    );
  }

  fireMount(mountIndex) {
    const target = this.chooseTarget();
    const fallback = this.chooseGroundPoint(mountIndex, target);
    const destination = target
      ? target.position.clone().add(new THREE.Vector3(0, Math.min(target.definition.height * 0.4, 2.1), 0))
      : fallback.clone();
    this.world.aimTurret(mountIndex, destination);
    this.fireProjectile(mountIndex, target, destination, fallback);
    this.onFire?.({ mountIndex, target });
  }

  acquireArrow() {
    const arrow = this.arrowPool.find((item) => !item.active) ?? this.arrowPool[0];
    arrow.active = true;
    arrow.group.visible = true;
    arrow.group.scale.setScalar(1);
    return arrow;
  }

  fireProjectile(mountIndex, target, destination, fallback) {
    const arrow = this.acquireArrow();
    arrow.group.position.copy(this.world.getTurretOrigin(mountIndex));
    arrow.target = target;
    arrow.destination.copy(destination);
    arrow.fallback.copy(fallback);
    arrow.age = 0;
    this.projectiles.push(arrow);
  }

  releaseArrow(arrow) {
    arrow.active = false;
    arrow.target = null;
    arrow.group.visible = false;
    const index = this.projectiles.indexOf(arrow);
    if (index >= 0) this.projectiles.splice(index, 1);
  }

  updateProjectiles(dt) {
    for (let i = this.projectiles.length - 1; i >= 0; i -= 1) {
      const projectile = this.projectiles[i];
      projectile.age += dt;

      if (
        projectile.target &&
        !projectile.target.dead &&
        !projectile.target.removed &&
        projectile.target.state !== "extracting" &&
        !this.isEnemyHeld(projectile.target)
      ) {
        projectile.destination.copy(projectile.target.position).add(
          new THREE.Vector3(0, Math.min(projectile.target.definition.height * 0.4, 2.1), 0)
        );
      } else if (projectile.target) {
        projectile.destination.copy(projectile.fallback);
        projectile.target = null;
      }

      const direction = projectile.destination.clone().sub(projectile.group.position);
      const distance = direction.length();
      if (distance <= 0.32 || projectile.age > 4.6) {
        const target = projectile.target;
        const impact = projectile.destination.clone();
        this.releaseArrow(projectile);
        this.createImpact(impact);
        if (target && !target.dead && !target.removed && !this.isEnemyHeld(target)) {
          this.onDamageEnemy?.(target, "turret", 1);
        }
        continue;
      }

      direction.normalize();
      projectile.group.quaternion.setFromUnitVectors(FORWARD, direction);
      projectile.group.position.addScaledVector(direction, Math.min(distance, projectile.speed * dt));
      const pulse = 0.92 + Math.sin(projectile.age * 24) * 0.15;
      projectile.fire.scale.setScalar(0.95 + pulse * 0.12);
      projectile.flame.scale.set(0.96 + pulse * 0.12, 0.96 + pulse * 0.12, 1 + pulse * 0.14);
    }
  }

  createImpact(position) {
    const impact = this.impactPool.find((item) => !item.active) ?? this.impactPool[0];
    impact.active = true;
    impact.age = 0;
    impact.mesh.visible = true;
    impact.mesh.position.copy(position).setY(0.08);
    impact.mesh.scale.setScalar(1);
    impact.material.opacity = 0.76;
    if (!this.impacts.includes(impact)) this.impacts.push(impact);
  }

  updateImpacts(dt) {
    for (let i = this.impacts.length - 1; i >= 0; i -= 1) {
      const impact = this.impacts[i];
      impact.age += dt;
      const t = Math.min(impact.age / 0.5, 1);
      impact.mesh.scale.setScalar(1 + t * 6.2);
      impact.material.opacity = (1 - t) * 0.76;
      if (t >= 1) {
        impact.active = false;
        impact.mesh.visible = false;
        this.impacts.splice(i, 1);
      }
    }
  }

  fireOccultPulse() {
    const candidates = this.getEnemies().filter(
      (enemy) => !enemy.dead && !enemy.removed && enemy.state !== "extracting"
    );
    if (candidates.length === 0) return;

    // Shuffle so the purple ground-fire reads as strikes across the field, not
    // a hidden damage calculation always hitting the same front-most target.
    for (let i = candidates.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }

    const strikeCount = this.occultSouls >= 20 ? 3 : this.occultSouls >= 10 ? 2 : 1;
    const targets = candidates.slice(0, Math.min(strikeCount, candidates.length));
    this.world.pulseOccultEffect?.();
    targets.forEach((target) => {
      this.world.triggerOccultStrike?.(target.position.clone());
      this.onDamageEnemy?.(target, "occult", 1);
    });
    this.onOccultPulse?.(targets.length);
  }

  preWarm() {
    this.world.setTurretLevel(3);
    this.fireProjectile(0, null, new THREE.Vector3(-2, 0.1, 0), new THREE.Vector3(-2, 0.1, 0));
    this.createImpact(new THREE.Vector3(-3, 0.1, 0));
    this.updateProjectiles(1 / 30);
    this.updateImpacts(1 / 30);
  }

  resetCooldown() {
    this.mountTimers = [1.2, 1.2 + CONFIG.defence.fireStagger, 1.2 + CONFIG.defence.fireStagger * 2];
  }

  clearForDawn() {
    this.hellfireSouls = 0;
    this.occultSouls = 0;
    this.world.setTurretLevel(0);
    this.projectiles.slice().forEach((projectile) => this.releaseArrow(projectile));
    this.impacts.slice().forEach((impact) => {
      impact.active = false;
      impact.mesh.visible = false;
    });
    this.impacts = [];
  }

  dispose() {
    this.arrowPool.forEach((arrow) => {
      this.scene.remove(arrow.group);
      arrow.shaftGeometry.dispose();
      arrow.shaftMaterial.dispose();
      arrow.headGeometry.dispose();
      arrow.headMaterial.dispose();
      arrow.fireGeometry.dispose();
      arrow.fireMaterial.dispose();
      arrow.flameGeometry.dispose();
      arrow.flameMaterial.dispose();
    });
    this.impactPool.forEach((impact) => {
      this.scene.remove(impact.mesh);
      impact.geometry.dispose();
      impact.material.dispose();
    });
  }
}
