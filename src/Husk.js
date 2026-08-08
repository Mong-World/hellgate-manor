import * as THREE from "three";
import { AssetLibrary } from "./AssetLibrary.js";
import { CONFIG } from "./Config.js";

function findClip(animations, pattern) {
  return animations.find((clip) => pattern.test(clip.name));
}

export class Husk {
  constructor({
    id,
    type = "husk",
    scene,
    assets,
    camera,
    position,
    onDeath,
    onAttack,
    onImpact,
    onSiegeClick,
    onExtractionComplete
  }) {
    this.scene = scene;
    this.assets = assets;
    this.camera = camera;
    this.onDeath = onDeath;
    this.onAttack = onAttack;
    this.onImpact = onImpact;
    this.onSiegeClick = onSiegeClick;
    this.onExtractionComplete = onExtractionComplete;

    this.group = new THREE.Group();
    this.scene.add(this.group);
    this.modelRoot = new THREE.Group();
    this.group.add(this.modelRoot);

    this.velocity = new THREE.Vector3();
    this.mixer = null;
    this.actions = {};
    this.currentAction = null;
    this.grabCollider = null;
    this.model = null;
    this.animations = [];
    this.type = type;
    this.definition = CONFIG.enemyTypes[type];

    this.loadModel();
    this.resetForSpawn(id, position, type);
  }

  get position() {
    return this.group.position;
  }

  loadModel() {
    const clone = this.assets.createEnemyClone(this.type);
    const model = clone.scene;
    AssetLibrary.prepareModel(model);
    AssetLibrary.fitModelToHeight(
      model,
      this.definition.height,
      this.definition.rotationY
    );

    model.traverse((object) => {
      if (!object.isMesh) return;
      object.userData.enemy = this;
      if (this.type === "strong" && object.material) {
        const tintMaterial = (material) => {
          const clone = material.clone();
          if (clone.color) clone.color.multiply(new THREE.Color(0.72, 0.42, 0.34));
          if ("emissive" in clone) {
            clone.emissive = new THREE.Color(0x351208);
            clone.emissiveIntensity = 0.45;
          }
          return clone;
        };
        object.material = Array.isArray(object.material)
          ? object.material.map(tintMaterial)
          : tintMaterial(object.material);
      }
    });
    this.modelRoot.add(model);
    this.model = model;
    this.animations = clone.animations;

    const [gx, gy, gz] = this.definition.grabBox;
    const grabGeometry = new THREE.BoxGeometry(gx, gy, gz);
    const grabMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
      depthTest: false,
      color: 0xffffff
    });
    this.grabCollider = new THREE.Mesh(grabGeometry, grabMaterial);
    this.grabCollider.position.set(0, this.definition.grabY, 0);
    this.grabCollider.userData.enemy = this;
    this.modelRoot.add(this.grabCollider);

    if (this.animations.length > 0) {
      this.mixer = new THREE.AnimationMixer(model);
      const clips = {
        walk: findClip(this.animations, /walk|run|crawl|move|locomotion/i) ?? this.animations[0],
        flail: findClip(this.animations, /flail|grab|struggle|air/i),
        fall: findClip(this.animations, /fall|knock|hit|stumble|trip/i),
        getUp: findClip(this.animations, /get.?up|stand|recover/i),
        attack: findClip(this.animations, /attack|strike|bite|swipe/i),
        idle: findClip(this.animations, /idle/i)
      };
      for (const [name, clip] of Object.entries(clips)) {
        if (clip) this.actions[name] = this.mixer.clipAction(clip);
      }
    }

    this.markPickable();
  }

  markPickable() {
    this.group.traverse((object) => {
      if (object.isMesh) object.userData.enemy = this;
    });
  }

  setTypeRuntime(type) {
    this.type = type;
    this.definition = CONFIG.enemyTypes[type];
    const [minSpeed, maxSpeed] = this.definition.speed;
    this.walkSpeed = THREE.MathUtils.randFloat(minSpeed, maxSpeed);
    this.walkAnimationSpeed = THREE.MathUtils.randFloat(
      this.definition.animationSpeed[0],
      this.definition.animationSpeed[1]
    );
    this.soulValue = this.definition.reward;
    this.attackDamage = this.definition.attackDamage;
    this.attackInterval = this.definition.attackInterval;
    this.durability = this.definition.durability;
    this.maxDurability = this.definition.durability;
    this.convertible = this.definition.convertible;
    this.gravity = this.type === "brute" ? 31 : 28;
  }

  playAction(name, fade = 0.12, loop = true) {
    const next = this.actions[name];
    if (!next) return;
    if (next === this.currentAction) {
      next.paused = false;
      return;
    }
    if (this.currentAction) this.currentAction.fadeOut(fade);
    next.reset();
    next.enabled = true;
    next.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Infinity : 1);
    next.clampWhenFinished = !loop;
    next.fadeIn(fade).play();
    this.currentAction = next;
  }

  isPickable() {
    return (
      !this.dead &&
      !this.removed &&
      this.type !== "siege" &&
      (this.state === "walking" || this.state === "attacking")
    );
  }

  canDirectClick() {
    return (
      this.type === "siege" &&
      !this.dead &&
      !this.removed &&
      (this.state === "walking" || this.state === "siegeCharging" || this.state === "attacking")
    );
  }

  directClick() {
    if (!this.canDirectClick()) return false;
    this.onSiegeClick?.(this);
    return true;
  }

  beginGrab() {
    if (!this.isPickable()) return false;
    this.state = "grabbed";
    this.velocity.set(0, 0, 0);
    this.peakScreenY = this.getScreenY();
    this.peakWorldY = this.position.y;
    this.playAction(this.actions.flail ? "flail" : "walk", 0.1);
    if (this.currentAction) this.currentAction.timeScale = 1.25;
    return true;
  }

  launch(velocity) {
    if (this.dead || this.removed || this.state === "extracting") return;
    const maxVelocity = this.type === "brute" ? 29 : 42;
    this.velocity
      .copy(velocity)
      .multiplyScalar(1.12 * this.definition.throwScale)
      .clampLength(0, maxVelocity);
    this.state = "airborne";
    this.peakScreenY = Math.min(this.peakScreenY, this.getScreenY());
    this.peakWorldY = Math.max(this.peakWorldY, this.position.y);
    if (this.currentAction) this.currentAction.paused = true;
  }

  getScreenY() {
    const projected = this.position.clone().project(this.camera);
    return 1 - (projected.y + 1) * 0.5;
  }

  updatePeakHeight() {
    this.peakScreenY = Math.min(this.peakScreenY, this.getScreenY());
    this.peakWorldY = Math.max(this.peakWorldY, this.position.y);
  }

  getGroundDropFraction() {
    return Math.max(0, this.getScreenY() - this.peakScreenY);
  }

  stumble(duration = 0.85, pushVelocity = null) {
    if (this.dead || this.removed) return;
    // A stumble/fall always resolves on the battlefield floor. Previously a
    // low-speed manor/tree collision could switch to fallen while the group
    // was still several metres above y=0, leaving the demon suspended there.
    this.position.y = 0;
    this.state = "fallen";
    this.fallTimer = duration;
    this.attackTimer = 0;
    this.velocity.copy(pushVelocity ?? new THREE.Vector3()).multiplyScalar(0.15);
    this.playAction(this.actions.fall ? "fall" : "idle", 0.08, false);
    if (!this.actions.fall) {
      this.group.rotation.z = THREE.MathUtils.randFloat(0.8, 1.18) * (Math.random() > 0.5 ? 1 : -1);
    }
  }

  knockDown(pushVelocity = null) {
    this.stumble(this.type === "brute" ? 1.0 : 0.72, pushVelocity);
  }

  applyDamage(amount = 1, reason = "impact", impactStrength = 10) {
    if (this.dead || this.removed || this.state === "extracting") return false;
    this.durability -= amount;
    if (this.durability <= 0) {
      this.onDeath?.({
        enemy: this,
        reason,
        position: this.position.clone().add(new THREE.Vector3(0, this.definition.height * 0.3, 0)),
        impactStrength
      });
      return true;
    }

    this.stumble(this.type === "siege" ? 1.15 : this.type === "brute" ? 1.05 : 0.86);
    return false;
  }

  hitHardSurface(surface, strength) {
    if (this.dead || this.removed) return;
    this.onImpact?.({ enemy: this, reason: surface, impactStrength: strength });
    this.applyDamage(1, surface, strength);
  }

  beginExtraction(duration, slotOffset = 0) {
    if (!this.convertible || this.dead || this.removed) return false;
    this.state = "extracting";
    this.extractionTimer = duration;
    this.extractionDuration = duration;
    this.velocity.set(0, 0, 0);
    this.extractionBase.copy(this.position);
    this.extractionBase.z += slotOffset;
    this.position.copy(this.extractionBase);
    this.playAction(this.actions.idle ? "idle" : "walk", 0.1);
    if (this.currentAction) this.currentAction.timeScale = 0.4;
    return true;
  }

  staggerSiege(amount = 1) {
    if (this.type !== "siege" || this.dead || this.removed || this.state === "fallen" || this.state === "gettingUp") {
      return false;
    }
    this.applyDamage(amount, "siege-stagger", 12);
    return true;
  }

  reachManor(manorBarrierX) {
    if (this.dead || this.removed || this.state === "attacking") return;
    if (this.type === "siege") {
      this.state = "siegeCharging";
      this.velocity.set(0, 0, 0);
      this.attackTimer = 2.6;
      this.playAction(this.actions.attack ? "attack" : "walk", 0.15);
      return;
    }
    this.position.x = manorBarrierX;
    this.state = "attacking";
    this.velocity.set(0, 0, 0);
    this.attackTimer = 0.35;
    this.playAction(this.actions.attack ? "attack" : "walk", 0.15);
  }

  update(dt, elapsed, held, manorBarrierX = 13) {
    if (this.dead || this.removed) return;
    this.collisionCooldown = Math.max(0, this.collisionCooldown - dt);
    this.mixer?.update(dt);

    if (this.state === "extracting") {
      this.extractionTimer -= dt;
      const t = THREE.MathUtils.clamp(1 - this.extractionTimer / this.extractionDuration, 0, 1);
      this.position.x = this.extractionBase.x;
      this.position.z = this.extractionBase.z + Math.sin(elapsed * 1.8 + this.id) * 0.08;
      this.position.y = this.extractionBase.y + t * 3.2 + Math.sin(elapsed * 6) * 0.08;
      this.modelRoot.rotation.y += dt * (0.5 + t * 1.2);
      this.modelRoot.scale.setScalar(Math.max(0.08, 1 - Math.max(0, t - 0.74) / 0.26));
      if (this.extractionTimer <= 0) {
        this.onExtractionComplete?.(this);
      }
      return;
    }

    if (held) {
      if (this.state !== "grabbed") this.beginGrab();
      this.updatePeakHeight();
      if (!this.actions.flail) this.modelRoot.rotation.z = Math.sin(elapsed * 12) * 0.08;
      return;
    }

    this.modelRoot.rotation.z = THREE.MathUtils.lerp(this.modelRoot.rotation.z, 0, 0.16);
    if (this.state === "grabbed") this.state = "airborne";

    if (this.state === "airborne") {
      this.updatePeakHeight();
      this.velocity.y -= this.gravity * dt;
      this.velocity.multiplyScalar(Math.pow(0.992, dt * 60));
      this.group.position.addScaledVector(this.velocity, dt);
      this.group.rotation.z -= this.velocity.x * dt * 0.12;
      this.group.rotation.x += this.velocity.z * dt * 0.12;

      if (this.position.y <= 0) {
        this.position.y = 0;
        const impactStrength = Math.sqrt(
          Math.max(0, -this.velocity.y) ** 2 +
          (this.velocity.x * 0.22) ** 2 +
          (this.velocity.z * 0.22) ** 2
        );
        this.onImpact?.({ enemy: this, reason: "ground", impactStrength });

        if (this.getGroundDropFraction() >= CONFIG.enemy.groundDeathScreenFraction) {
          this.applyDamage(1, "ground", impactStrength);
          return;
        }
        this.stumble(this.type === "brute" ? 1.05 : 0.72);
        this.velocity.set(0, 0, 0);
      }
      return;
    }

    if (this.state === "fallen") {
      this.fallTimer -= dt;
      if (this.fallTimer <= 0) {
        this.state = "gettingUp";
        this.getUpTimer = this.actions.getUp ? 0.95 : 0.68;
        this.playAction(this.actions.getUp ? "getUp" : "idle", 0.1, false);
      }
      return;
    }

    if (this.state === "gettingUp") {
      this.getUpTimer -= dt;
      this.group.rotation.x = THREE.MathUtils.lerp(this.group.rotation.x, 0, 0.14);
      this.group.rotation.y = THREE.MathUtils.lerp(this.group.rotation.y, 0, 0.14);
      this.group.rotation.z = THREE.MathUtils.lerp(this.group.rotation.z, 0, 0.14);
      if (this.getUpTimer <= 0) {
        this.group.rotation.set(0, 0, 0);
        this.modelRoot.scale.set(1, 1, 1);
        this.state = "walking";
        this.playAction("walk", 0.12);
        if (this.actions.walk) this.actions.walk.timeScale = this.walkAnimationSpeed;
      }
      return;
    }

    if (this.state === "attacking") {
      this.attackTimer -= dt;
      if (this.attackTimer <= 0) {
        this.attackTimer = this.attackInterval;
        this.onAttack?.(this);
      }
      return;
    }

    if (this.state === "siegeCharging") {
      this.attackTimer -= dt;
      const pulse = 1 + Math.sin(elapsed * 7.5) * 0.025;
      this.modelRoot.scale.set(pulse, 1, pulse);
      if (this.attackTimer <= 0) {
        this.onAttack?.(this);
        this.attackTimer = this.attackInterval;
      }
      return;
    }

    this.state = "walking";
    this.position.x += this.walkSpeed * dt;
    const siegeStopX = manorBarrierX - (this.definition.siegeStopOffset ?? 0);
    if (this.type === "siege" && this.position.x >= siegeStopX) {
      this.position.x = siegeStopX;
      this.reachManor(manorBarrierX);
      return;
    }
    this.playAction("walk", 0.12);
    if (this.actions.walk) this.actions.walk.timeScale = this.walkAnimationSpeed;
  }

  resetForSpawn(id, position, type = this.type) {
    if (type !== this.type) throw new Error("Pooled enemy type mismatch");
    this.setTypeRuntime(type);
    this.id = id;
    this.dead = false;
    this.removed = false;
    this.group.visible = true;
    this.group.position.copy(position);
    this.group.rotation.set(0, 0, 0);
    this.modelRoot.rotation.set(0, 0, 0);
    this.modelRoot.scale.set(1, 1, 1);
    this.velocity.set(0, 0, 0);
    this.state = "walking";
    this.attackTimer = 0;
    this.fallTimer = 0;
    this.getUpTimer = 0;
    this.extractionTimer = 0;
    this.extractionDuration = 0;
    this.extractionBase = this.extractionBase ?? new THREE.Vector3();
    this.collisionCooldown = 0;
    this.peakScreenY = 1;
    this.peakWorldY = 0;
    this.mixer?.stopAllAction();
    this.currentAction = null;
    this.playAction("walk", 0);
    if (this.actions.walk) this.actions.walk.timeScale = this.walkAnimationSpeed;
  }

  deactivateForPool() {
    this.dead = false;
    this.removed = true;
    this.state = "pooled";
    this.velocity.set(0, 0, 0);
    this.group.visible = false;
    this.group.rotation.set(0, 0, 0);
    this.modelRoot.rotation.set(0, 0, 0);
    this.modelRoot.scale.set(1, 1, 1);
    this.mixer?.stopAllAction();
    this.currentAction = null;
  }

  preWarmAllActions(dt = 1 / 30) {
    if (!this.mixer) return;
    const names = Object.keys(this.actions);
    for (const name of names) {
      const loop = /walk|idle|flail/.test(name);
      this.playAction(name, 0, loop);
      if (this.currentAction) this.currentAction.timeScale = name === "walk" ? this.walkAnimationSpeed : 1;
      this.mixer.update(dt);
    }
    this.playAction("walk", 0);
    if (this.actions.walk) this.actions.walk.timeScale = this.walkAnimationSpeed;
  }

  kill() {
    if (this.dead) return;
    this.dead = true;
    this.state = "dead";
    this.group.visible = false;
    this.mixer?.stopAllAction();
  }

  dispose() {
    this.removed = true;
    this.mixer?.stopAllAction();
    if (this.grabCollider) {
      this.grabCollider.geometry.dispose();
      this.grabCollider.material.dispose();
    }
    this.scene.remove(this.group);
  }
}
