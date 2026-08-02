import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const HUSK_URL = "./assets/husk.glb";
const HUSK_HEIGHT = 4.2;
const HUSK_ROTATION_Y = Math.PI / 2;

export class Husk {
  constructor({ scene, position, onDeath, onImpact }) {
    this.scene = scene;
    this.onDeath = onDeath;
    this.onImpact = onImpact;
    this.dead = false;

    this.walkSpeed = 1.1;
    this.gravity = 28;
    this.drag = 0.992;
    this.killThreshold = 9.2;
    this.velocity = new THREE.Vector3();
    this.airborne = false;
    this.settleTimer = 0;

    this.group = new THREE.Group();
    this.group.position.copy(position);
    this.scene.add(this.group);

    this.modelRoot = new THREE.Group();
    this.group.add(this.modelRoot);

    this.mixer = null;
    this.walkAction = null;
  }

  get position() {
    return this.group.position;
  }

  async load() {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(HUSK_URL);
    const model = gltf.scene;

    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.frustumCulled = true;
        object.userData.enemy = this;
      }
    });

    model.updateMatrixWorld(true);
    const initialBox = new THREE.Box3().setFromObject(model);
    const initialSize = initialBox.getSize(new THREE.Vector3());
    const scale = HUSK_HEIGHT / Math.max(initialSize.y, 0.001);
    model.scale.setScalar(scale);
    model.rotation.y = HUSK_ROTATION_Y;

    model.updateMatrixWorld(true);
    const scaledBox = new THREE.Box3().setFromObject(model);
    const centre = scaledBox.getCenter(new THREE.Vector3());

    model.position.x -= centre.x;
    model.position.z -= centre.z;
    model.position.y -= scaledBox.min.y;

    this.modelRoot.add(model);
    this.model = model;

    if (gltf.animations.length > 0) {
      this.mixer = new THREE.AnimationMixer(model);

      const walkClip =
        gltf.animations.find((clip) => /walk|run|move/i.test(clip.name)) ??
        gltf.animations[0];

      this.walkAction = this.mixer.clipAction(walkClip);
      this.walkAction.reset().play();
    }

    this.markPickable();
  }

  markPickable() {
    this.group.traverse((object) => {
      if (object.isMesh) object.userData.enemy = this;
    });
  }

  resetMotion() {
    this.velocity.set(0, 0, 0);
    this.group.rotation.set(0, 0, 0);
    this.airborne = false;
    this.settleTimer = 0;
    this.group.visible = true;
    this.dead = false;

    if (this.walkAction) {
      this.walkAction.reset().play();
      this.walkAction.paused = false;
    }
  }

  launch(velocity) {
    this.velocity.copy(velocity).multiplyScalar(1.15).clampLength(0, 44);
    this.airborne = true;
    this.settleTimer = 0;

    if (this.walkAction) this.walkAction.paused = true;
  }

  update(dt, elapsed, held) {
    if (this.dead) return;

    if (this.mixer) {
      this.mixer.update(dt * (held ? 0.35 : 1));
    }

    if (held) {
      this.airborne = true;
      if (this.walkAction) this.walkAction.paused = false;
      this.modelRoot.rotation.z = Math.sin(elapsed * 11) * 0.08;
      return;
    }

    this.modelRoot.rotation.z = THREE.MathUtils.lerp(
      this.modelRoot.rotation.z,
      0,
      0.15
    );

    if (this.airborne) {
      this.velocity.y -= this.gravity * dt;
      this.velocity.multiplyScalar(Math.pow(this.drag, dt * 60));
      this.group.position.addScaledVector(this.velocity, dt);

      this.group.rotation.z -= this.velocity.x * dt * 0.12;
      this.group.rotation.x += this.velocity.z * dt * 0.12;
      this.group.rotation.y += this.velocity.z * dt * 0.035;

      if (this.group.position.y <= 0) {
        const impactSpeed = Math.max(0, -this.velocity.y);
        const totalImpact = Math.sqrt(
          impactSpeed ** 2 +
          (this.velocity.x * 0.22) ** 2 +
          (this.velocity.z * 0.22) ** 2
        );

        this.group.position.y = 0;
        this.onImpact?.({
          position: this.group.position.clone(),
          strength: totalImpact
        });

        if (totalImpact >= this.killThreshold) {
          this.onDeath?.({
            position: this.group.position.clone().add(new THREE.Vector3(0, 1.4, 0)),
            impactStrength: totalImpact
          });
          return;
        }

        this.velocity.y = Math.abs(this.velocity.y) * 0.12;
        this.velocity.x *= 0.34;
        this.velocity.z *= 0.34;

        if (Math.abs(this.velocity.y) < 0.8) {
          this.velocity.set(0, 0, 0);
          this.airborne = false;
          this.settleTimer = 0.2;
          this.group.rotation.set(0, 0, 0);
          if (this.walkAction) this.walkAction.paused = false;
        }
      }

      return;
    }

    if (this.settleTimer > 0) {
      this.settleTimer -= dt;
      return;
    }

    this.group.position.x += this.walkSpeed * dt;
    if (this.walkAction) this.walkAction.paused = false;
  }

  kill() {
    if (this.dead) return;
    this.dead = true;
    this.group.visible = false;
  }

  dispose() {
    this.mixer?.stopAllAction();
    this.scene.remove(this.group);

    this.group.traverse((object) => {
      if (!object.isMesh) return;
      object.geometry?.dispose();

      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      materials.forEach((material) => {
        if (!material) return;
        for (const key of Object.keys(material)) {
          const value = material[key];
          if (value?.isTexture) value.dispose();
        }
        material.dispose?.();
      });
    });
  }
}
