import * as THREE from "three";
import { AssetLibrary } from "./AssetLibrary.js";
import { CONFIG } from "./Config.js";

function findClip(animations, pattern) {
  return animations.find((clip) => pattern.test(clip.name));
}

const HELLWING_EMBER_GEOMETRY = new THREE.IcosahedronGeometry(0.032, 0);
const HELLWING_EMBER_MATERIAL = new THREE.MeshBasicMaterial({
  color: 0xff7a2c,
  transparent: true,
  opacity: 0.96,
  blending: THREE.AdditiveBlending,
  depthWrite: false
});
const HELLWING_EMBER_ANCHORS = Object.freeze([
  [-0.52, 0.34, 0.00],
  [-0.42, 0.24, 0.18],
  [-0.42, 0.24, -0.18],
  [-0.26, 0.18, 0.00],
  [-0.18, 0.12, 0.10],
  [-0.18, 0.12, -0.10]
]);
const HELLWING_EMBER_POOL_SIZE = 16;
const HELLWING_SPAWN = new THREE.Vector3();
const HELLWING_DRIFT = new THREE.Vector3();
const HELLWING_ROTATION = new THREE.Quaternion();

export class Hellwing {
  constructor({ id, scene, assets, position, onDestroyed, onManorImpact }) {
    this.scene = scene;
    this.assets = assets;
    this.onDestroyed = onDestroyed;
    this.onManorImpact = onManorImpact;
    this.type = "hellwing";
    this.convertible = false;
    this.dead = false;
    this.removed = false;
    this.state = "pooled";
    this.preview = false;
    this.velocity = new THREE.Vector3();
    this.peakWorldY = 0;
    this.group = new THREE.Group();
    this.scene.add(this.group);
    this.modelRoot = new THREE.Group();
    this.group.add(this.modelRoot);
    this.mixer = null;
    this.action = null;

    this.loadModel();
    this.resetForSpawn(id, position ?? new THREE.Vector3(-30, 9, 0));
  }

  get position() {
    return this.group.position;
  }

  loadModel() {
    const clone = this.assets.createHellwingClone();
    const model = clone.scene;
    AssetLibrary.prepareModel(model);
    // Hellwing proportions are extremely wide, so fitting by height alone can
    // make the wingspan enormous. Scale by the model's largest dimension
    // instead, keeping it visibly smaller than a standing Husk.
    model.rotation.y = Math.PI / 2;
    model.updateMatrixWorld(true);
    const sourceBox = new THREE.Box3().setFromObject(model);
    const sourceSize = sourceBox.getSize(new THREE.Vector3());
    const largestDimension = Math.max(sourceSize.x, sourceSize.y, sourceSize.z, 0.001);
    // This particular GLB reports bounds that still produce an oversized
    // on-screen result after normalisation. Keep the bound-based fit, then
    // apply a deliberate visual reduction so the bat reads as a small aerial
    // threat rather than filling the camera.
    const fittedScale = (CONFIG?.hellwing?.maxVisualDimension ?? 3.0) / largestDimension;
    model.scale.setScalar(fittedScale * (CONFIG?.hellwing?.visualScaleMultiplier ?? 0.18));
    model.updateMatrixWorld(true);
    const fittedBox = new THREE.Box3().setFromObject(model);
    const fittedCentre = fittedBox.getCenter(new THREE.Vector3());
    model.position.x -= fittedCentre.x;
    model.position.z -= fittedCentre.z;
    model.position.y -= fittedBox.min.y;
    model.updateMatrixWorld(true);

    model.traverse((object) => {
      if (!object.isMesh) return;
      object.userData.enemy = this;
      // Avoid the oversized moving ground shadow that made the first version
      // read as a giant silhouette rather than a small flying threat.
      object.castShadow = false;
      object.receiveShadow = false;
    });
    this.modelRoot.add(model);
    this.model = model;

    this.emberPool = [];
    this.emberSpawnTimer = 0;
    for (let i = 0; i < HELLWING_EMBER_POOL_SIZE; i += 1) {
      const ember = new THREE.Mesh(HELLWING_EMBER_GEOMETRY, HELLWING_EMBER_MATERIAL);
      ember.visible = false;
      ember.userData.velocity = new THREE.Vector3();
      ember.userData.age = 0;
      ember.userData.life = 0;
      ember.userData.baseScale = 1;
      ember.userData.phase = 0;
      ember.userData.spin = 0;
      ember.userData.sway = 0;
      this.scene.add(ember);
      this.emberPool.push(ember);
    }

    const grabGeometry = new THREE.BoxGeometry(1.0, 0.82, 1.1);
    const grabMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
      depthTest: false
    });
    this.grabCollider = new THREE.Mesh(grabGeometry, grabMaterial);
    this.grabCollider.position.y = 0.36;
    this.grabCollider.userData.enemy = this;
    this.modelRoot.add(this.grabCollider);

    const animations = clone.animations ?? [];
    if (animations.length > 0) {
      this.mixer = new THREE.AnimationMixer(model);
      const clip = findClip(animations, /fly|flap|wing|air/i) ?? animations[0];
      this.action = this.mixer.clipAction(clip);
      this.action.setLoop(THREE.LoopRepeat, Infinity).play();
    }
  }

  isPickable() {
    return !this.dead && !this.removed && (this.state === "flying" || this.state === "grabbed");
  }

  canDirectClick() {
    return false;
  }

  beginGrab() {
    if (!this.isPickable()) return false;
    this.state = "grabbed";
    this.velocity.set(0, 0, 0);
    return true;
  }

  updatePeakHeight() {
    this.peakWorldY = Math.max(this.peakWorldY, this.position.y);
  }

  launch(velocity) {
    if (this.dead || this.removed) return;
    this.state = "knocked";
    this.velocity.copy(velocity).multiplyScalar(0.78).clampLength(0, 28);
    // Ensure even a soft release clearly knocks the lightweight creature out of flight.
    if (Math.abs(this.velocity.y) < 2.4) this.velocity.y = Math.max(this.velocity.y, 2.4);
  }

  updateEmbers(dt, elapsed) {
    if (!this.emberPool) return;

    const active = !this.dead && !this.removed && this.state !== "pooled";
    if (!active) {
      this.emberSpawnTimer = 0;
      this.emberPool.forEach((ember) => { ember.visible = false; });
      return;
    }

    const previewRate = this.preview ? 0.040 : 0.028;
    this.emberSpawnTimer -= dt;
    while (this.emberSpawnTimer <= 0) {
      this.emberSpawnTimer += previewRate + Math.random() * 0.018;
      const ember = this.emberPool.find((item) => !item.visible);
      if (!ember) break;
      const data = ember.userData;
      const anchor = HELLWING_EMBER_ANCHORS[(Math.random() * HELLWING_EMBER_ANCHORS.length) | 0];
      HELLWING_SPAWN.set(
        anchor[0] + THREE.MathUtils.randFloatSpread(0.08),
        anchor[1] + THREE.MathUtils.randFloatSpread(0.06),
        anchor[2] + THREE.MathUtils.randFloatSpread(0.10)
      );
      this.group.localToWorld(HELLWING_SPAWN);
      ember.position.copy(HELLWING_SPAWN);

      this.group.getWorldQuaternion(HELLWING_ROTATION);
      const baseTrail = this.preview ? -0.46 : (-this.flySpeed * 0.06 - 0.10);
      HELLWING_DRIFT.set(
        baseTrail - THREE.MathUtils.randFloat(0.05, 0.16),
        THREE.MathUtils.randFloat(0.12, 0.26),
        THREE.MathUtils.randFloatSpread(0.12)
      ).applyQuaternion(HELLWING_ROTATION);

      data.velocity.copy(HELLWING_DRIFT);
      data.age = 0;
      data.life = THREE.MathUtils.randFloat(this.preview ? 0.52 : 0.40, this.preview ? 0.88 : 0.72);
      data.baseScale = THREE.MathUtils.randFloat(0.62, 1.32);
      data.phase = Math.random() * Math.PI * 2;
      data.spin = THREE.MathUtils.randFloat(4.2, 7.8);
      data.sway = THREE.MathUtils.randFloat(0.04, 0.10);
      ember.scale.setScalar(data.baseScale);
      ember.visible = true;
    }

    for (const ember of this.emberPool) {
      if (!ember.visible) continue;
      const data = ember.userData;
      data.age += dt;
      if (data.age >= data.life) {
        ember.visible = false;
        continue;
      }
      const t = data.age / data.life;
      const alpha = 1 - t;
      const swirlY = Math.sin(elapsed * data.spin + data.phase) * data.sway;
      const swirlZ = Math.cos(elapsed * (data.spin * 0.8) + data.phase) * data.sway;
      ember.position.x += data.velocity.x * dt;
      ember.position.y += (data.velocity.y + swirlY + 0.05) * dt;
      ember.position.z += (data.velocity.z + swirlZ) * dt;
      ember.scale.setScalar(Math.max(0.10, data.baseScale * (1 - t * 0.72)));
      ember.material.opacity = 0.18 + alpha * 0.78;
    }
  }

  update(dt, elapsed, held, manorBarrierX = 13) {
    if (this.dead || this.removed || dt <= 0) return;
    this.mixer?.update(dt);
    this.updateEmbers(dt, elapsed);

    // Developer preview keeps the bat fixed in world space while allowing its
    // authored wing/flap animation to play for easy visual inspection.
    if (this.preview) return;

    if (held || this.state === "grabbed") {
      this.state = "grabbed";
      return;
    }

    if (this.state === "knocked") {
      this.velocity.y -= 18 * dt;
      this.velocity.multiplyScalar(Math.pow(0.993, dt * 60));
      this.position.addScaledVector(this.velocity, dt);
      this.group.rotation.z += dt * (2.8 + Math.abs(this.velocity.x) * 0.08);
      this.group.rotation.x += dt * 1.8;
      if (this.position.y <= 0.15) {
        this.position.y = 0.15;
        this.destroy("player");
      }
      return;
    }

    this.state = "flying";
    this.position.x += this.flySpeed * dt;
    this.position.y = this.baseY + Math.sin(elapsed * 5.2 + this.phase) * 0.28;
    this.position.z = this.baseZ + Math.sin(elapsed * 2.3 + this.phase) * 0.32;
    this.group.rotation.z = Math.sin(elapsed * 4.1 + this.phase) * 0.10;
    this.modelRoot.rotation.y = Math.sin(elapsed * 2.1 + this.phase) * 0.08;

    if (this.position.x >= manorBarrierX - 0.35) {
      this.impactManor();
    }
  }

  impactManor() {
    if (this.dead || this.removed) return;
    this.dead = true;
    this.state = "impact";
    this.group.visible = false;
    this.mixer?.stopAllAction();
    if (this.emberPool) this.emberPool.forEach((ember) => { ember.visible = false; });
    this.onManorImpact?.(this);
  }

  destroy(reason = "player") {
    if (this.dead || this.removed) return;
    this.dead = true;
    this.state = "dead";
    this.group.visible = false;
    this.mixer?.stopAllAction();
    if (this.emberPool) this.emberPool.forEach((ember) => { ember.visible = false; });
    this.onDestroyed?.({ enemy: this, reason, position: this.position.clone() });
  }

  resetForSpawn(id, position, { tutorial = false, preview = false } = {}) {
    this.id = id;
    this.dead = false;
    this.removed = false;
    this.group.visible = true;
    this.group.position.copy(position);
    this.group.rotation.set(0, 0, 0);
    this.modelRoot.rotation.set(0, 0, 0);
    this.modelRoot.scale.set(1, 1, 1);
    this.velocity.set(0, 0, 0);
    this.state = "flying";
    this.preview = !!preview;
    this.flySpeed = tutorial ? 5.6 : THREE.MathUtils.randFloat(7.2, 8.7);
    this.baseY = position.y;
    this.baseZ = position.z;
    this.phase = Math.random() * Math.PI * 2;
    this.peakWorldY = position.y;
    this.emberSpawnTimer = 0;
    if (this.emberPool) this.emberPool.forEach((ember) => { ember.visible = false; });
    this.mixer?.stopAllAction();
    if (this.action) this.action.reset().setLoop(THREE.LoopRepeat, Infinity).play();
  }

  deactivateForPool() {
    this.dead = false;
    this.removed = true;
    this.state = "pooled";
    this.preview = false;
    this.group.visible = false;
    this.velocity.set(0, 0, 0);
    this.group.rotation.set(0, 0, 0);
    this.modelRoot.rotation.set(0, 0, 0);
    if (this.emberPool) this.emberPool.forEach((ember) => { ember.visible = false; });
    this.mixer?.stopAllAction();
  }

  preWarmAllActions(dt = 1 / 30) {
    if (!this.mixer || !this.action) return;
    this.action.reset().play();
    this.mixer.update(dt);
  }

  dispose() {
    this.removed = true;
    this.mixer?.stopAllAction();
    this.grabCollider?.geometry?.dispose();
    this.grabCollider?.material?.dispose();
    if (this.emberPool) {
      this.emberPool.forEach((ember) => {
        ember.visible = false;
        this.scene.remove(ember);
      });
    }
    this.scene.remove(this.group);
  }
}
