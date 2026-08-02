import * as THREE from "three";

export class ImpactRing {
  constructor(scene, position, strength = 8) {
    this.scene = scene;
    this.finished = false;
    this.age = 0;
    this.life = 0.34;
    this.strength = strength;

    this.geometry = new THREE.RingGeometry(0.28, 0.42, 32);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xff7a34,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.copy(position).setY(0.05);
    this.scene.add(this.mesh);
  }

  update(dt) {
    this.age += dt;
    const t = Math.min(this.age / this.life, 1);
    const scale = 1 + t * (this.strength * 0.24);
    this.mesh.scale.setScalar(scale);
    this.material.opacity = (1 - t) * 0.6;
    this.mesh.position.y += dt * 0.015;
    if (t >= 1) this.finished = true;
  }

  dispose() {
    this.scene.remove(this.mesh);
    this.geometry.dispose();
    this.material.dispose();
  }
}
