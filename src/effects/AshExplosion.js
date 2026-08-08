import * as THREE from "three";

export class AshExplosion {
  constructor(scene, position, warm = false) {
    this.scene = scene;
    this.finished = false;
    this.age = 0;
    this.life = 1.18;
    this.count = warm ? 76 : 58;
    this.geometry = new THREE.BufferGeometry();
    this.positions = new Float32Array(this.count * 3);
    this.velocities = [];

    for (let i = 0; i < this.count; i += 1) {
      this.positions[i * 3] = position.x;
      this.positions[i * 3 + 1] = position.y;
      this.positions[i * 3 + 2] = position.z;
      this.velocities.push(new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(warm ? 8 : 5.5),
        THREE.MathUtils.randFloat(1.8, warm ? 9.2 : 7.6),
        THREE.MathUtils.randFloatSpread(warm ? 6 : 4.5)
      ));
    }

    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    this.material = new THREE.PointsMaterial({
      color: warm ? 0xffcc74 : 0xff8d3a,
      size: warm ? 0.5 : 0.42,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);
  }

  update(dt) {
    this.age += dt;
    const attribute = this.geometry.attributes.position;
    for (let i = 0; i < this.count; i += 1) {
      const velocity = this.velocities[i];
      velocity.y -= 7.0 * dt;
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
