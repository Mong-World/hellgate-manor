import * as THREE from "three";

export class SoulEmber {
  constructor({ scene, start, target }) {
    this.scene = scene;
    this.start = start.clone();
    this.target = target.clone();
    this.finished = false;
    this.age = 0;
    this.duration = 1.25;

    this.group = new THREE.Group();
    this.group.position.copy(start);
    this.scene.add(this.group);

    this.geometry = new THREE.IcosahedronGeometry(0.19, 1);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xff8a36,
      emissive: 0xff3a06,
      emissiveIntensity: 5.5,
      roughness: 0.25
    });

    this.core = new THREE.Mesh(this.geometry, this.material);
    this.group.add(this.core);

    this.light = new THREE.PointLight(0xff5316, 8, 6, 2);
    this.group.add(this.light);
  }

  update(dt) {
    this.age += dt;
    const t = THREE.MathUtils.clamp(this.age / this.duration, 0, 1);
    const eased = t * t * (3 - 2 * t);

    this.group.position.lerpVectors(this.start, this.target, eased);
    this.group.position.y += Math.sin(t * Math.PI) * 3.2;
    this.group.position.z += Math.sin(t * Math.PI * 2) * 0.35;

    const pulse = 1 + Math.sin(this.age * 18) * 0.14;
    this.core.scale.setScalar(pulse);
    this.light.intensity = 7 + pulse * 2;

    if (t >= 1) this.finished = true;
  }

  dispose() {
    this.scene.remove(this.group);
    this.geometry.dispose();
    this.material.dispose();
  }
}
