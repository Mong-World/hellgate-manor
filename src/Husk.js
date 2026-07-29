import * as THREE from "three";

export class Husk {
  constructor({ scene, position, targetX, onDeath }) {
    this.scene = scene;
    this.targetX = targetX;
    this.onDeath = onDeath;
    this.dead = false;
    this.walkSpeed = 1.15;
    this.velocity = new THREE.Vector3();
    this.onGround = true;
    this.airborne = false;
    this.settleTimer = 0;
    this.killThreshold = 10.2;
    this.gravity = 24;
    this.drag = 0.992;
    this.radius = 0.58;
    this.disposables = [];

    this.group = new THREE.Group();
    this.group.position.copy(position);
    this.scene.add(this.group);

    this.visual = new THREE.Group();
    this.group.add(this.visual);

    this.createModel();
    this.markPickable(this.group);
  }

  get position() {
    return this.group.position;
  }

  createModel() {
    const skin = new THREE.MeshStandardMaterial({
      color: 0x171416,
      roughness: 0.7,
      metalness: 0.08,
    });
    const mouth = new THREE.MeshStandardMaterial({
      color: 0x050405,
      roughness: 1,
    });
    const ember = new THREE.MeshStandardMaterial({
      color: 0xff4e14,
      emissive: 0xff2600,
      emissiveIntensity: 4.2,
      roughness: 0.38,
    });
    this.disposables.push(skin, mouth, ember);

    const mesh = (geometry, material, parent = this.visual) => {
      const object = new THREE.Mesh(geometry, material);
      object.castShadow = true;
      object.receiveShadow = true;
      parent.add(object);
      this.disposables.push(geometry);
      return object;
    };

    this.torso = mesh(new THREE.CapsuleGeometry(0.42, 1.75, 6, 10), skin);
    this.torso.position.y = 2.35;
    this.torso.scale.set(0.78, 1, 0.68);

    this.head = mesh(new THREE.SphereGeometry(0.46, 14, 12), skin);
    this.head.position.set(0, 3.85, 0);
    this.head.scale.set(0.78, 1.12, 0.82);

    this.jaw = mesh(new THREE.BoxGeometry(0.55, 0.72, 0.5), mouth);
    this.jaw.position.set(0, 3.55, -0.18);
    this.jaw.rotation.x = -0.14;

    this.mouthGlow = mesh(new THREE.PlaneGeometry(0.34, 0.45), ember);
    this.mouthGlow.position.set(0, 3.58, -0.445);
    this.mouthGlow.rotation.y = Math.PI;

    this.leftArmPivot = new THREE.Group();
    this.rightArmPivot = new THREE.Group();
    this.leftArmPivot.position.set(-0.5, 3.05, 0);
    this.rightArmPivot.position.set(0.5, 3.05, 0);
    this.visual.add(this.leftArmPivot, this.rightArmPivot);

    this.leftArm = mesh(new THREE.CapsuleGeometry(0.13, 1.7, 5, 8), skin, this.leftArmPivot);
    this.rightArm = mesh(new THREE.CapsuleGeometry(0.13, 1.7, 5, 8), skin, this.rightArmPivot);
    this.leftArm.position.y = -1.0;
    this.rightArm.position.y = -1.0;

    this.leftLegPivot = new THREE.Group();
    this.rightLegPivot = new THREE.Group();
    this.leftLegPivot.position.set(-0.22, 1.45, 0);
    this.rightLegPivot.position.set(0.22, 1.45, 0);
    this.visual.add(this.leftLegPivot, this.rightLegPivot);

    this.leftLeg = mesh(new THREE.CapsuleGeometry(0.16, 1.35, 5, 8), skin, this.leftLegPivot);
    this.rightLeg = mesh(new THREE.CapsuleGeometry(0.16, 1.35, 5, 8), skin, this.rightLegPivot);
    this.leftLeg.position.y = -0.83;
    this.rightLeg.position.y = -0.83;

    const crackPositions = [
      [0.0, 2.75, -0.39, 0.08, 0.72],
      [-0.23, 2.1, -0.36, 0.06, 0.48],
      [0.2, 3.05, -0.34, 0.06, 0.42],
      [-0.08, 4.0, -0.4, 0.05, 0.32],
    ];
    crackPositions.forEach(([x, y, z, w, h]) => {
      const crack = mesh(new THREE.PlaneGeometry(w, h), ember);
      crack.position.set(x, y, z);
      crack.rotation.y = Math.PI;
      crack.rotation.z = THREE.MathUtils.randFloatSpread(0.4);
    });

    this.visual.rotation.y = -Math.PI / 2;
  }

  markPickable(root) {
    root.traverse((object) => {
      if (object.isMesh) object.userData.enemy = this;
    });
  }

  resetMotion() {
    this.velocity.set(0, 0, 0);
    this.group.rotation.set(0, 0, 0);
    this.visual.rotation.set(0, -Math.PI / 2, 0);
    this.airborne = false;
    this.onGround = true;
    this.settleTimer = 0;
  }

  launch(velocity) {
    this.velocity.copy(velocity);
    this.velocity.multiplyScalar(1.18);
    this.velocity.clampLength(0, 34);
    this.airborne = true;
    this.onGround = false;
    this.settleTimer = 0;
  }

  update(dt, elapsed, held) {
    if (this.dead) return;

    if (held) {
      this.airborne = true;
      this.onGround = false;
      this.animateStruggle(elapsed);
      return;
    }

    if (this.airborne) {
      this.velocity.y -= this.gravity * dt;
      this.velocity.multiplyScalar(Math.pow(this.drag, dt * 60));
      this.group.position.addScaledVector(this.velocity, dt);

      this.group.rotation.z -= this.velocity.x * dt * 0.12;
      this.group.rotation.x += this.velocity.z * dt * 0.11;

      if (this.group.position.y <= 0) {
        const impactSpeed = Math.max(0, -this.velocity.y);
        this.group.position.y = 0;

        if (impactSpeed >= this.killThreshold) {
          this.onDeath({ position: this.group.position.clone().add(new THREE.Vector3(0, 1.3, 0)) });
          return;
        }

        this.velocity.y = Math.abs(this.velocity.y) * 0.16;
        this.velocity.x *= 0.42;
        this.velocity.z *= 0.42;

        if (Math.abs(this.velocity.y) < 1.1) {
          this.velocity.set(0, 0, 0);
          this.airborne = false;
          this.onGround = true;
          this.settleTimer = 0.28;
          this.group.rotation.set(0, 0, 0);
        }
      }
      return;
    }

    if (this.settleTimer > 0) {
      this.settleTimer -= dt;
      this.animateStruggle(elapsed);
      return;
    }

    this.group.position.x += this.walkSpeed * dt;
    this.animateWalk(elapsed);
  }

  animateWalk(elapsed) {
    const cycle = elapsed * 5.2;
    const swing = Math.sin(cycle) * 0.62;
    this.leftArmPivot.rotation.z = swing * 0.52;
    this.rightArmPivot.rotation.z = -swing * 0.52;
    this.leftLegPivot.rotation.z = -swing * 0.44;
    this.rightLegPivot.rotation.z = swing * 0.44;
    this.visual.position.y = Math.abs(Math.sin(cycle)) * 0.055;
    this.head.rotation.z = Math.sin(cycle * 0.5) * 0.055;
    this.jaw.rotation.x = -0.18 - Math.abs(Math.sin(cycle * 0.75)) * 0.22;
  }

  animateStruggle(elapsed) {
    const frantic = elapsed * 13;
    this.leftArmPivot.rotation.z = Math.sin(frantic) * 1.12;
    this.rightArmPivot.rotation.z = Math.sin(frantic + 1.7) * 1.12;
    this.leftLegPivot.rotation.z = Math.sin(frantic + 2.1) * 0.85;
    this.rightLegPivot.rotation.z = Math.sin(frantic + 3.8) * 0.85;
    this.head.rotation.z = Math.sin(frantic * 0.8) * 0.16;
    this.jaw.rotation.x = -0.75;
  }

  kill() {
    if (this.dead) return;
    this.dead = true;
    this.group.visible = false;
  }

  dispose() {
    this.scene.remove(this.group);
    this.disposables.forEach((item) => item.dispose?.());
  }
}
