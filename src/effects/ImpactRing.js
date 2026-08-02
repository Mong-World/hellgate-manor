import * as THREE from "three";

export class ImpactRing {
  constructor(scene, position, strength = 8) {
    this.scene = scene;
    this.finished = false;
    this.age = 0;
    this.life = 0.42;

    this.geometry = new THREE.RingGeometry(0.2, 0.27, 32);
    this.material = new THREE.MeshBasicMaterial({
      color: strength >= 8 ? 0xff4d14 : 0x8c776f,
      transparent: true,
      opacity: strength >= 8 ? 0.72 : 0.32,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.copy(position);
    this.mesh.position.y = 0.035;
    this.scene.add(this.mesh);
    this.maxScale = THREE.MathUtils.clamp(strength * 0.34, 2.2, 6.2);
  }

  update(dt) {
    this.age += dt;
    const t = Math.min(this.age / this.life, 1);
    const scale = 1 + t * this.maxScale;
    this.mesh.scale.setScalar(scale);
    this.material.opacity *= 0.88;
    if (t >= 1) this.finished = true;
  }

  dispose() {
    this.scene.remove(this.mesh);
    this.geometry.dispose();
    this.material.dispose();
  }
}
