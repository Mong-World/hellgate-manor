import * as THREE from "three";

class PooledSoul {
  constructor(scene) {
    this.scene = scene;
    this.active = false;
    this.finished = false;
    this.age = 0;
    this.duration = 1.05;
    this.start = new THREE.Vector3();
    this.target = new THREE.Vector3();
    this.onComplete = null;

    this.group = new THREE.Group();
    this.group.visible = false;
    this.scene.add(this.group);

    this.coreGeometry = new THREE.IcosahedronGeometry(0.17, 1);
    this.coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xff9a4d,
      transparent: true,
      opacity: 0.96,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.core = new THREE.Mesh(this.coreGeometry, this.coreMaterial);
    this.group.add(this.core);

    this.haloGeometry = new THREE.SphereGeometry(0.31, 10, 8);
    this.haloMaterial = new THREE.MeshBasicMaterial({
      color: 0xff4e12,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.halo = new THREE.Mesh(this.haloGeometry, this.haloMaterial);
    this.group.add(this.halo);
  }

  startEffect(start, target, onComplete = null, scale = 1) {
    this.active = true;
    this.finished = false;
    this.age = 0;
    this.start.copy(start);
    this.target.copy(target);
    this.onComplete = onComplete;
    this.group.position.copy(start);
    this.group.visible = true;
    this.group.scale.setScalar(scale);
    return this;
  }

  update(dt) {
    if (!this.active) return;
    this.age += dt;
    const t = THREE.MathUtils.clamp(this.age / this.duration, 0, 1);
    const eased = t * t * (3 - 2 * t);
    this.group.position.lerpVectors(this.start, this.target, eased);
    this.group.position.y += Math.sin(t * Math.PI) * 3.1;
    this.group.position.z += Math.sin(t * Math.PI * 2) * 0.28;
    const pulse = 1 + Math.sin(this.age * 19) * 0.13;
    this.core.scale.setScalar(pulse);
    this.halo.scale.setScalar(1.1 + pulse * 0.22);
    this.haloMaterial.opacity = 0.18 + pulse * 0.07;
    if (t >= 1) {
      this.active = false;
      this.finished = true;
      this.group.visible = false;
      const callback = this.onComplete;
      this.onComplete = null;
      callback?.();
    }
  }

  dispose() {
    this.scene.remove(this.group);
    this.coreGeometry.dispose();
    this.coreMaterial.dispose();
    this.haloGeometry.dispose();
    this.haloMaterial.dispose();
  }
}

class PooledAsh {
  constructor(scene, count = 64) {
    this.scene = scene;
    this.count = count;
    this.active = false;
    this.finished = false;
    this.age = 0;
    this.life = 1.05;
    this.positions = new Float32Array(count * 3);
    this.velocities = new Float32Array(count * 3);
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    this.material = new THREE.PointsMaterial({
      color: 0x8f2514,
      size: 0.18,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    this.points = new THREE.Points(this.geometry, this.material);
    this.points.visible = false;
    this.scene.add(this.points);
  }

  startEffect(position, warm = false, scale = 1) {
    this.active = true;
    this.finished = false;
    this.age = 0;
    const emberScale = Math.min(scale, 1.45);
    this.material.color.setHex(warm ? 0xb43a18 : 0x842213);
    this.material.size = (warm ? 0.21 : 0.17) * emberScale;
    this.material.opacity = warm ? 0.82 : 0.76;
    for (let i = 0; i < this.count; i += 1) {
      const idx = i * 3;
      this.positions[idx] = position.x;
      this.positions[idx + 1] = position.y;
      this.positions[idx + 2] = position.z;
      const velocityScale = Math.min(scale, 1.45);
      this.velocities[idx] = THREE.MathUtils.randFloatSpread((warm ? 4.2 : 3.3) * velocityScale);
      this.velocities[idx + 1] = THREE.MathUtils.randFloat(0.8 * velocityScale, (warm ? 4.6 : 3.9) * velocityScale);
      this.velocities[idx + 2] = THREE.MathUtils.randFloatSpread((warm ? 3.6 : 2.9) * velocityScale);
    }
    this.geometry.attributes.position.needsUpdate = true;
    this.points.visible = true;
    return this;
  }

  update(dt) {
    if (!this.active) return;
    this.age += dt;
    const positionArray = this.geometry.attributes.position.array;
    for (let i = 0; i < this.count; i += 1) {
      const idx = i * 3;
      this.velocities[idx + 1] -= 7.8 * dt;
      const damping = Math.pow(0.986, dt * 60);
      this.velocities[idx] *= damping;
      this.velocities[idx + 1] *= damping;
      this.velocities[idx + 2] *= damping;
      positionArray[idx] += this.velocities[idx] * dt;
      positionArray[idx + 1] += this.velocities[idx + 1] * dt;
      positionArray[idx + 2] += this.velocities[idx + 2] * dt;
    }
    this.geometry.attributes.position.needsUpdate = true;
    this.material.opacity = Math.max(0, 0.78 * (1 - this.age / this.life));
    if (this.age >= this.life) {
      this.active = false;
      this.finished = true;
      this.points.visible = false;
    }
  }

  dispose() {
    this.scene.remove(this.points);
    this.geometry.dispose();
    this.material.dispose();
  }
}

class PooledRing {
  constructor(scene) {
    this.scene = scene;
    this.active = false;
    this.finished = false;
    this.age = 0;
    this.life = 0.34;
    this.strength = 8;
    this.geometry = new THREE.RingGeometry(0.28, 0.42, 24);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xff7a34,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.visible = false;
    this.scene.add(this.mesh);
  }

  startEffect(position, strength = 8, color = 0xff7a34) {
    this.active = true;
    this.finished = false;
    this.age = 0;
    this.strength = strength;
    this.material.color.setHex(color);
    this.material.opacity = 0.58;
    this.mesh.position.copy(position).setY(0.05);
    this.mesh.scale.setScalar(1);
    this.mesh.visible = true;
    return this;
  }

  update(dt) {
    if (!this.active) return;
    this.age += dt;
    const t = Math.min(this.age / this.life, 1);
    this.mesh.scale.setScalar(1 + t * this.strength * 0.22);
    this.material.opacity = (1 - t) * 0.58;
    if (t >= 1) {
      this.active = false;
      this.finished = true;
      this.mesh.visible = false;
    }
  }

  dispose() {
    this.scene.remove(this.mesh);
    this.geometry.dispose();
    this.material.dispose();
  }
}

export class EffectPool {
  constructor(scene, size = 32) {
    this.scene = scene;
    this.souls = Array.from({ length: size }, () => new PooledSoul(scene));
    this.ashes = Array.from({ length: size }, () => new PooledAsh(scene));
    this.rings = Array.from({ length: Math.max(16, Math.ceil(size * 0.75)) }, () => new PooledRing(scene));
  }

  getFree(list) {
    return list.find((effect) => !effect.active) ?? list[0];
  }

  soul(start, target, onComplete = null, scale = 1) {
    return this.getFree(this.souls).startEffect(start, target, onComplete, scale);
  }

  ash(position, warm = false, scale = 1) {
    return this.getFree(this.ashes).startEffect(position, warm, scale);
  }

  ring(position, strength = 8, color = 0xff7a34) {
    return this.getFree(this.rings).startEffect(position, strength, color);
  }

  update(dt) {
    this.souls.forEach((effect) => effect.update(dt));
    this.ashes.forEach((effect) => effect.update(dt));
    this.rings.forEach((effect) => effect.update(dt));
  }

  preWarm() {
    // Keep every pooled effect visible for the loading-screen render pass.
    // This forces each geometry/material buffer onto the GPU before gameplay.
    this.souls.forEach((effect, index) => {
      const x = -16 + (index % 9) * 4;
      const z = -4 + (index % 5) * 2;
      effect.startEffect(new THREE.Vector3(x, 1.2, z), new THREE.Vector3(x + 1.5, 3.0, z));
    });
    this.ashes.forEach((effect, index) => {
      const x = -15 + (index % 8) * 4;
      const z = -3.5 + (index % 4) * 2.2;
      effect.startEffect(new THREE.Vector3(x, 0.8, z), index % 2 === 0);
    });
    this.rings.forEach((effect, index) => {
      const x = -14 + (index % 8) * 4;
      const z = -3 + (index % 4) * 2;
      effect.startEffect(new THREE.Vector3(x, 0.05, z), 8 + (index % 4), index % 2 ? 0xff7a34 : 0xff3b12);
    });
  }

  finishPreWarm() {
    this.souls.forEach((effect) => {
      effect.active = false;
      effect.finished = false;
      effect.group.visible = false;
      effect.onComplete = null;
    });
    this.ashes.forEach((effect) => {
      effect.active = false;
      effect.finished = false;
      effect.points.visible = false;
      effect.material.opacity = 0;
    });
    this.rings.forEach((effect) => {
      effect.active = false;
      effect.finished = false;
      effect.mesh.visible = false;
      effect.material.opacity = 0;
    });
  }

  dispose() {
    this.souls.forEach((effect) => effect.dispose());
    this.ashes.forEach((effect) => effect.dispose());
    this.rings.forEach((effect) => effect.dispose());
  }
}
