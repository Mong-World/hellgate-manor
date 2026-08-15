import * as THREE from "three";
import { AssetLibrary } from "./AssetLibrary.js";
import { CONFIG } from "./Config.js";

function findClip(animations, pattern) {
  return animations.find((clip) => pattern.test(clip.name));
}

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
    model.scale.setScalar((CONFIG?.hellwing?.maxVisualDimension ?? 3.0) / largestDimension);
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

    const grabGeometry = new THREE.BoxGeometry(2.2, 1.9, 2.2);
    const grabMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
      depthTest: false
    });
    this.grabCollider = new THREE.Mesh(grabGeometry, grabMaterial);
    this.grabCollider.position.y = 0.82;
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

  update(dt, elapsed, held, manorBarrierX = 13) {
    if (this.dead || this.removed || dt <= 0) return;
    this.mixer?.update(dt);

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
    this.onManorImpact?.(this);
  }

  destroy(reason = "player") {
    if (this.dead || this.removed) return;
    this.dead = true;
    this.state = "dead";
    this.group.visible = false;
    this.mixer?.stopAllAction();
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
    this.scene.remove(this.group);
  }
}
