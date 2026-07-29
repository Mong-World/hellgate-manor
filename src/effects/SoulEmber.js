import * as THREE from "three";

export class SoulEmber {
  constructor({ scene, start, target, onCollected }) {
    this.scene = scene;
    this.start = start;
    this.target = target;
    this.onCollected = onCollected;
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
      roughness: 0.25,
    });
    this.core = new THREE.Mesh(this.geometry, this.material);
    this.group.add(this.core);

    this.light = new THREE.PointLight(0xff5316, 8, 6, 2);
    this.group.add(this.light);

    this.trail = [];
    const trailMaterial = new THREE.MeshBasicMaterial({
      color: 0xff5c1e,
      transparent: true,
      opacity: 0.38,
    });
    this.trailMaterial = trailMaterial;

    for (let i = 0; i < 6; i += 1) {
      const trailGeo = new THREE.SphereGeometry(0.1 - i * 0.011, 7, 6);
      const dot = new THREE.Mesh(trailGeo, trailMaterial);
      dot.visible = false;
      this.scene.add(dot);
      this.trail.push({ dot, geometry: trailGeo });
    }
  }

  update(dt) {
    this.age += dt;
    const t = THREE.MathUtils.clamp(this.age / this.duration, 0, 1);
    const eased = t * t * (3 - 2 * t);

    const previous = this.group.position.clone();
    this.group.position.lerpVectors(this.start, this.target, eased);
    this.group.position.y += Math.sin(t * Math.PI) * 3.2;
    this.group.position.z += Math.sin(t * Math.PI * 2) * 0.35;

    for (let i = this.trail.length - 1; i > 0; i -= 1) {
      const source = this.trail[i - 1].dot;
      this.trail[i].dot.position.lerp(source.position, 0.6);
      this.trail[i].dot.visible = source.visible;
    }
    this.trail[0].dot.position.lerp(previous, 0.55);
    this.trail[0].dot.visible = true;

    const pulse = 1 + Math.sin(this.age * 18) * 0.14;
    this.core.scale.setScalar(pulse);
    this.light.intensity = 7 + pulse * 2;

    if (t >= 1) {
      this.onCollected?.();
      this.finished = true;
    }
  }

  dispose() {
    this.scene.remove(this.group);
    this.geometry.dispose();
    this.material.dispose();

    this.trail.forEach(({ dot, geometry }) => {
      this.scene.remove(dot);
      geometry.dispose();
    });
    this.trailMaterial.dispose();
  }
}
