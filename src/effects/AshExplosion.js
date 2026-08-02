import * as THREE from "three";

export class AshExplosion {
  constructor(scene, position, impactStrength = 10) {
    this.scene = scene;
    this.finished = false;
    this.age = 0;
    this.life = 1.25;
    this.count = 84;

    this.geometry = new THREE.BufferGeometry();
    this.positions = new Float32Array(this.count * 3);
    this.velocities = [];
    const force = THREE.MathUtils.clamp(impactStrength * 0.22, 2.2, 4.2);

    for (let i = 0; i < this.count; i += 1) {
      this.positions[i * 3] = position.x;
      this.positions[i * 3 + 1] = position.y;
      this.positions[i * 3 + 2] = position.z;
      this.velocities.push(new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(force * 2),
        THREE.MathUtils.randFloat(0.9, force * 2.1),
        THREE.MathUtils.randFloatSpread(force * 1.8)
      ));
    }

    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    this.material = new THREE.PointsMaterial({
      color: 0x171416,
      size: 0.4,
      transparent: true,
      opacity: 0.98,
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
      const v = this.velocities[i];
      v.y -= 9 * dt;
      v.multiplyScalar(Math.pow(0.984, dt * 60));
      attribute.array[i * 3] += v.x * dt;
      attribute.array[i * 3 + 1] += v.y * dt;
      attribute.array[i * 3 + 2] += v.z * dt;
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
