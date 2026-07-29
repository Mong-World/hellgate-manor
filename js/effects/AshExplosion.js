import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js";

export class AshExplosion {
  constructor(scene, position) {
    this.scene = scene;
    this.finished = false;
    this.age = 0;
    this.life = 1.15;
    this.count = 58;

    this.geometry = new THREE.BufferGeometry();
    this.positions = new Float32Array(this.count * 3);
    this.velocities = [];

    for (let i = 0; i < this.count; i += 1) {
      this.positions[i * 3] = position.x;
      this.positions[i * 3 + 1] = position.y;
      this.positions[i * 3 + 2] = position.z;

      const velocity = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(5.5),
        THREE.MathUtils.randFloat(1.2, 7),
        THREE.MathUtils.randFloatSpread(4.5)
      );
      this.velocities.push(velocity);
    }

    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.positions, 3)
    );

    this.material = new THREE.PointsMaterial({
      color: 0x1a1718,
      size: 0.34,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      sizeAttenuation: true,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);
  }

  update(dt) {
    this.age += dt;
    const attribute = this.geometry.attributes.position;

    for (let i = 0; i < this.count; i += 1) {
      const velocity = this.velocities[i];
      velocity.y -= 8.5 * dt;
      velocity.multiplyScalar(Math.pow(0.985, dt * 60));

      attribute.array[i * 3] += velocity.x * dt;
      attribute.array[i * 3 + 1] += velocity.y * dt;
      attribute.array[i * 3 + 2] += velocity.z * dt;
    }

    attribute.needsUpdate = true;
    this.material.opacity = Math.max(0, 1 - this.age / this.life);

    if (this.age >= this.life) this.finished = true;
  }

  dispose() {
    this.scene.remove(this.points);
    this.geometry.dispose();
    this.material.dispose();
  }
}
