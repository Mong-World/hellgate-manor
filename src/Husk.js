import * as THREE from "three";
import { AssetLibrary } from "./AssetLibrary.js";
import { CONFIG } from "./Config.js";

function findClip(animations, pattern) {
  return animations.find((clip) => pattern.test(clip.name));
}

export class Husk {
  constructor({ id, scene, assets, camera, position, fast = false, onDeath, onAttack }) {
    this.id = id;
    this.scene = scene;
    this.assets = assets;
    this.camera = camera;
    this.fast = fast;
    this.onDeath = onDeath;
    this.onAttack = onAttack;
    this.dead = false;
    this.removed = false;

    this.attackDamage = fast
      ? CONFIG.enemy.fastAttackDamage
      : CONFIG.enemy.normalAttackDamage;

    const speedRange = fast
      ? [CONFIG.enemy.fastSpeedMin, CONFIG.enemy.fastSpeedMax]
      : [CONFIG.enemy.normalSpeedMin, CONFIG.enemy.normalSpeedMax];

    this.walkSpeed = THREE.MathUtils.randFloat(speedRange[0], speedRange[1]);
    this.walkAnimationSpeed = THREE.MathUtils.clamp(
      0.92 + this.walkSpeed * 0.17,
      this.fast ? 2.25 : 1.55,
      this.fast ? 2.75 : 1.95
    );
    this.soulValue = fast
      ? CONFIG.enemy.fastSoulValue
      : CONFIG.enemy.normalSoulValue;

    this.gravity = 28;
    this.velocity = new THREE.Vector3();
    this.state = "walking";
    this.attackTimer = 0;
    this.fallTimer = 0;
    this.getUpTimer = 0;
    this.collisionCooldown = 0;
    this.peakScreenY = 1;
    this.peakWorldY = 0;

    this.group = new THREE.Group();
    this.group.position.copy(position);
    this.scene.add(this.group);

    this.modelRoot = new THREE.Group();
    this.group.add(this.modelRoot);

    this.mixer = null;
    this.actions = {};
    this.currentAction = null;

    this.loadModel();
  }

  get position() {
    return this.group.position;
  }

  loadModel() {
    const clone = this.assets.createHuskClone();
    const model = clone.scene;
    AssetLibrary.prepareModel(model);
    AssetLibrary.fitModelToHeight(model, this.fast ? 3.85 : 4.2, Math.PI / 2);

    model.traverse((object) => {
      if (object.isMesh) object.userData.enemy = this;
    });

    this.modelRoot.add(model);

    const grabGeometry = new THREE.BoxGeometry(
      this.fast ? 2.15 : 1.95,
      this.fast ? 5.3 : 5.0,
      this.fast ? 2.15 : 1.95
    );
    const grabMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
      depthTest: false,
      color: 0xffffff
    });
    this.grabCollider = new THREE.Mesh(grabGeometry, grabMaterial);
    this.grabCollider.position.set(0, this.fast ? 2.35 : 2.2, 0);
    this.grabCollider.userData.enemy = this;
    this.grabCollider.renderOrder = -1000;
    this.modelRoot.add(this.grabCollider);

    if (this.fast) {
      const glow = new THREE.PointLight(0xff5a1d, 1.8, 3.6, 2);
      glow.position.set(0, 1.8, 0);
      this.modelRoot.add(glow);
    }
    this.model = model;
    this.animations = clone.animations;

    if (this.animations.length > 0) {
      this.mixer = new THREE.AnimationMixer(model);
      const clips = {
        walk: findClip(this.animations, /walk|run|move/i) ?? this.animations[0],
        flail: findClip(this.animations, /flail|grab|struggle/i),
        fall: findClip(this.animations, /fall|knock|hit/i),
        getUp: findClip(this.animations, /get.?up|stand/i),
        attack: findClip(this.animations, /attack|strike/i),
        idle: findClip(this.animations, /idle/i)
      };

      for (const [name, clip] of Object.entries(clips)) {
        if (clip) this.actions[name] = this.mixer.clipAction(clip);
      }

      this.playAction("walk", 0);
      if (this.actions.walk) this.actions.walk.timeScale = this.walkAnimationSpeed;
    }

    this.markPickable();
  }

  markPickable() {
    this.group.traverse((object) => {
      if (object.isMesh) object.userData.enemy = this;
    });
  }

  playAction(name, fade = 0.15, loop = true) {
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

  beginGrab() {
    if (this.dead) return;
    this.state = "grabbed";
    this.velocity.set(0, 0, 0);
    this.peakScreenY = this.getScreenY();
    this.peakWorldY = this.position.y;
    this.playAction(this.actions.flail ? "flail" : "walk", 0.12);
    if (this.currentAction) this.currentAction.timeScale = 1.35;
  }

  launch(velocity) {
    if (this.dead) return;
    this.velocity.copy(velocity).multiplyScalar(1.14).clampLength(0, 44);
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

  knockDown(pushVelocity = null) {
    if (this.dead) return;
    if (this.state === "airborne") this.position.y = 0;
    this.state = "fallen";
    this.fallTimer = 0.72;
    this.attackTimer = 0;
    this.velocity.copy(pushVelocity ?? new THREE.Vector3()).multiplyScalar(0.22);
    this.playAction(this.actions.fall ? "fall" : "idle", 0.1, false);
    if (!this.actions.fall) {
      this.group.rotation.z =
        Math.sign(pushVelocity?.x || 1) * THREE.MathUtils.randFloat(0.8, 1.25);
    }
  }

  hitHardSurface(surface, strength) {
    if (this.dead) return;
    this.onDeath?.({
      enemy: this,
      reason: surface,
      position: this.position.clone().add(new THREE.Vector3(0, 1.25, 0)),
      impactStrength: strength
    });
  }

  reachManor() {
    if (this.dead || this.state === "attacking") return;
    this.state = "attacking";
    this.velocity.set(0, 0, 0);
    this.attackTimer = 0.35;
    this.playAction(this.actions.attack ? "attack" : "walk", 0.15);
    if (this.currentAction) this.currentAction.timeScale = 1.15;
  }

  update(dt, elapsed, held) {
    if (this.dead || this.removed) return;
    this.collisionCooldown = Math.max(0, this.collisionCooldown - dt);
    this.mixer?.update(dt);

    if (held) {
      if (this.state !== "grabbed") this.beginGrab();
      this.updatePeakHeight();
      if (!this.actions.flail) {
        this.modelRoot.rotation.z = Math.sin(elapsed * 12) * 0.08;
      }
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
      this.group.rotation.y += this.velocity.z * dt * 0.035;

      if (this.position.y <= 0) {
        this.position.y = 0;
        const impactStrength = Math.sqrt(
          Math.max(0, -this.velocity.y) ** 2 +
          (this.velocity.x * 0.22) ** 2 +
          (this.velocity.z * 0.22) ** 2
        );

        if (this.getGroundDropFraction() >= CONFIG.enemy.groundDeathScreenFraction) {
          this.onDeath?.({
            enemy: this,
            reason: "ground",
            position: this.position.clone().add(new THREE.Vector3(0, 1.25, 0)),
            impactStrength
          });
          return;
        }

        this.state = "fallen";
        this.fallTimer = 0.72;
        this.velocity.set(0, 0, 0);
        this.playAction(this.actions.fall ? "fall" : "idle", 0.1, false);
        if (!this.actions.fall) {
          this.group.rotation.z =
            THREE.MathUtils.randFloat(0.85, 1.25) * (Math.random() > 0.5 ? 1 : -1);
        }
      }
      return;
    }

    if (this.state === "fallen") {
      this.fallTimer -= dt;
      if (this.fallTimer <= 0) {
        this.state = "gettingUp";
        this.getUpTimer = this.actions.getUp ? 0.9 : 0.65;
        this.playAction(this.actions.getUp ? "getUp" : "idle", 0.12, false);
      }
      return;
    }

    if (this.state === "gettingUp") {
      this.getUpTimer -= dt;
      this.group.rotation.x = THREE.MathUtils.lerp(this.group.rotation.x, 0, 0.12);
      this.group.rotation.y = THREE.MathUtils.lerp(this.group.rotation.y, 0, 0.12);
      this.group.rotation.z = THREE.MathUtils.lerp(this.group.rotation.z, 0, 0.12);
      if (this.getUpTimer <= 0) {
        this.group.rotation.set(0, 0, 0);
        this.state = "walking";
        this.playAction("walk", 0.15);
        if (this.actions.walk) this.actions.walk.timeScale = this.walkAnimationSpeed;
      }
      return;
    }

    if (this.state === "attacking") {
      this.attackTimer -= dt;
      if (!this.actions.attack) {
        const pulse = 1 + Math.sin(elapsed * 10) * 0.025;
        this.modelRoot.scale.set(pulse, 1, pulse);
      }
      if (this.attackTimer <= 0) {
        this.attackTimer = CONFIG.enemy.attackInterval;
        this.onAttack?.(this);
      }
      return;
    }

    this.state = "walking";
    this.position.x += this.walkSpeed * dt;
    this.playAction("walk", 0.15);
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
