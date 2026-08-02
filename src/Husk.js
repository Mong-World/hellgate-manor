import * as THREE from "three";

export class Husk {
  constructor({ scene, position, targetX, onDeath, onImpact }) {
    this.scene = scene;
    this.targetX = targetX;
    this.onDeath = onDeath;
    this.onImpact = onImpact;
    this.dead = false;
    this.walkSpeed = 1.08;
    this.velocity = new THREE.Vector3();
    this.airborne = false;
    this.settleTimer = 0;
    this.killThreshold = 8.6;
    this.gravity = 28;
    this.drag = 0.993;
    this.disposables = [];

    this.group = new THREE.Group();
    this.group.position.copy(position);
    this.scene.add(this.group);

    this.visual = new THREE.Group();
    this.group.add(this.visual);
    this.createModel();
    this.markPickable(this.group);
  }

  get position() { return this.group.position; }

  createModel() {
    const skin = new THREE.MeshStandardMaterial({
      color: 0x151215,
      roughness: 0.76,
      metalness: 0.12,
    });
    const charred = new THREE.MeshStandardMaterial({
      color: 0x09080a,
      roughness: 0.9,
    });
    const ember = new THREE.MeshStandardMaterial({
      color: 0xff6b25,
      emissive: 0xff2600,
      emissiveIntensity: 5.2,
      roughness: 0.3,
    });
    this.disposables.push(skin, charred, ember);

    const mesh = (geometry, material, parent = this.visual) => {
      const object = new THREE.Mesh(geometry, material);
      object.castShadow = true;
      object.receiveShadow = true;
      parent.add(object);
      this.disposables.push(geometry);
      return object;
    };

    // Ribcage and narrow abdomen create a stronger non-human silhouette.
    this.chest = mesh(new THREE.SphereGeometry(0.68, 18, 14), skin);
    this.chest.position.y = 2.95;
    this.chest.scale.set(0.84, 1.18, 0.58);

    this.abdomen = mesh(new THREE.CapsuleGeometry(0.28, 1.05, 7, 12), charred);
    this.abdomen.position.y = 2.05;
    this.abdomen.scale.set(0.74, 1, 0.62);

    this.pelvis = mesh(new THREE.SphereGeometry(0.42, 14, 10), skin);
    this.pelvis.position.y = 1.4;
    this.pelvis.scale.set(1, 0.62, 0.72);

    this.neck = mesh(new THREE.CylinderGeometry(0.19, 0.28, 0.62, 10), charred);
    this.neck.position.set(0, 3.82, 0.02);
    this.neck.rotation.z = -0.12;

    this.headPivot = new THREE.Group();
    this.headPivot.position.set(0.05, 4.18, -0.02);
    this.visual.add(this.headPivot);

    this.skull = mesh(new THREE.SphereGeometry(0.48, 18, 14), skin, this.headPivot);
    this.skull.scale.set(0.72, 1.12, 0.8);

    this.upperJaw = mesh(new THREE.BoxGeometry(0.52, 0.28, 0.5), charred, this.headPivot);
    this.upperJaw.position.set(0, -0.15, -0.27);

    this.lowerJawPivot = new THREE.Group();
    this.lowerJawPivot.position.set(0, -0.24, -0.18);
    this.headPivot.add(this.lowerJawPivot);
    this.lowerJaw = mesh(new THREE.BoxGeometry(0.58, 0.48, 0.44), charred, this.lowerJawPivot);
    this.lowerJaw.position.set(0, -0.2, -0.05);

    this.mouthGlow = mesh(new THREE.PlaneGeometry(0.39, 0.5), ember, this.lowerJawPivot);
    this.mouthGlow.position.set(0, -0.12, -0.29);
    this.mouthGlow.rotation.y = Math.PI;

    // Raised vertebrae help the back read from the fixed camera.
    for (let i = 0; i < 6; i += 1) {
      const vertebra = mesh(new THREE.ConeGeometry(0.09 + i * 0.008, 0.28, 5), charred);
      vertebra.position.set(0, 1.95 + i * 0.35, 0.43);
      vertebra.rotation.x = Math.PI / 2;
    }

    this.leftArmPivot = new THREE.Group();
    this.rightArmPivot = new THREE.Group();
    this.leftArmPivot.position.set(-0.58, 3.35, 0);
    this.rightArmPivot.position.set(0.58, 3.35, 0);
    this.visual.add(this.leftArmPivot, this.rightArmPivot);

    const makeArm = (pivot, side) => {
      const upper = mesh(new THREE.CapsuleGeometry(0.14, 0.85, 6, 10), skin, pivot);
      upper.position.y = -0.53;
      upper.rotation.z = side * 0.12;

      const elbow = new THREE.Group();
      elbow.position.set(side * 0.08, -1.02, 0);
      pivot.add(elbow);
      const forearm = mesh(new THREE.CapsuleGeometry(0.12, 1.35, 6, 10), charred, elbow);
      forearm.position.y = -0.78;
      forearm.scale.y = 1.12;

      const hand = mesh(new THREE.SphereGeometry(0.22, 10, 8), skin, elbow);
      hand.position.set(0, -1.63, -0.02);
      hand.scale.set(0.72, 1.3, 0.55);

      for (let f = -1; f <= 1; f += 1) {
        const finger = mesh(new THREE.CapsuleGeometry(0.035, 0.36 + Math.abs(f) * 0.04, 4, 6), charred, elbow);
        finger.position.set(f * 0.09, -1.92, -0.06);
        finger.rotation.z = f * 0.12;
      }
      return { upper, elbow };
    };

    this.leftArm = makeArm(this.leftArmPivot, -1);
    this.rightArm = makeArm(this.rightArmPivot, 1);

    this.leftLegPivot = new THREE.Group();
    this.rightLegPivot = new THREE.Group();
    this.leftLegPivot.position.set(-0.23, 1.35, 0);
    this.rightLegPivot.position.set(0.23, 1.35, 0);
    this.visual.add(this.leftLegPivot, this.rightLegPivot);

    const makeLeg = (pivot, side) => {
      const thigh = mesh(new THREE.CapsuleGeometry(0.16, 0.86, 6, 10), skin, pivot);
      thigh.position.y = -0.55;
      const knee = new THREE.Group();
      knee.position.set(0, -1.02, 0);
      pivot.add(knee);
      const shin = mesh(new THREE.CapsuleGeometry(0.13, 0.95, 6, 10), charred, knee);
      shin.position.set(0, -0.55, 0.08);
      shin.rotation.x = -0.12;
      const foot = mesh(new THREE.BoxGeometry(0.3, 0.18, 0.58), charred, knee);
      foot.position.set(side * 0.02, -1.08, -0.16);
      foot.rotation.x = -0.12;
      return { thigh, knee };
    };

    this.leftLeg = makeLeg(this.leftLegPivot, -1);
    this.rightLeg = makeLeg(this.rightLegPivot, 1);

    // Thin emissive shards read as cracks without relying on external textures.
    const cracks = [
      [0.0, 3.24, -0.39, 0.055, 0.78, 0.08],
      [-0.28, 2.82, -0.34, 0.045, 0.5, -0.22],
      [0.23, 2.22, -0.28, 0.045, 0.58, 0.2],
      [-0.07, 4.3, -0.4, 0.04, 0.32, -0.1],
    ];
    cracks.forEach(([x, y, z, w, h, r]) => {
      const crack = mesh(new THREE.PlaneGeometry(w, h), ember);
      crack.position.set(x, y, z);
      crack.rotation.set(0, Math.PI, r);
    });

    this.visual.rotation.y = -Math.PI / 2;
    this.visual.rotation.z = -0.06;
  }

  markPickable(root) {
    root.traverse((object) => {
      if (object.isMesh) object.userData.enemy = this;
    });
  }

  resetMotion() {
    this.velocity.set(0, 0, 0);
    this.group.rotation.set(0, 0, 0);
    this.visual.rotation.set(0, -Math.PI / 2, -0.06);
    this.airborne = false;
    this.settleTimer = 0;
  }

  launch(velocity) {
    this.velocity.copy(velocity).multiplyScalar(1.16).clampLength(0, 42);
    this.airborne = true;
    this.settleTimer = 0;
  }

  update(dt, elapsed, held) {
    if (this.dead) return;

    if (held) {
      this.airborne = true;
      this.animateStruggle(elapsed);
      return;
    }

    if (this.airborne) {
      this.velocity.y -= this.gravity * dt;
      this.velocity.multiplyScalar(Math.pow(this.drag, dt * 60));
      this.group.position.addScaledVector(this.velocity, dt);
      this.group.rotation.z -= this.velocity.x * dt * 0.13;
      this.group.rotation.x += this.velocity.z * dt * 0.13;
      this.group.rotation.y += this.velocity.z * dt * 0.035;

      if (this.group.position.y <= 0) {
        const impactSpeed = Math.max(0, -this.velocity.y);
        const totalImpact = Math.sqrt(impactSpeed ** 2 + (this.velocity.x * 0.22) ** 2 + (this.velocity.z * 0.22) ** 2);
        this.group.position.y = 0;
        this.onImpact?.({ position: this.group.position.clone(), strength: totalImpact });

        if (totalImpact >= this.killThreshold) {
          this.onDeath({
            position: this.group.position.clone().add(new THREE.Vector3(0, 1.45, 0)),
            impactStrength: totalImpact,
          });
          return;
        }

        this.velocity.y = Math.abs(this.velocity.y) * 0.12;
        this.velocity.x *= 0.34;
        this.velocity.z *= 0.34;
        if (Math.abs(this.velocity.y) < 0.9) {
          this.velocity.set(0, 0, 0);
          this.airborne = false;
          this.settleTimer = 0.24;
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
    const cycle = elapsed * 4.9;
    const swing = Math.sin(cycle);
    this.leftArmPivot.rotation.z = swing * 0.48 + 0.12;
    this.rightArmPivot.rotation.z = -swing * 0.48 - 0.12;
    this.leftArm.elbow.rotation.z = -0.18 + Math.max(0, -swing) * 0.22;
    this.rightArm.elbow.rotation.z = 0.18 - Math.max(0, swing) * 0.22;
    this.leftLegPivot.rotation.z = -swing * 0.42;
    this.rightLegPivot.rotation.z = swing * 0.42;
    this.visual.position.y = Math.abs(Math.sin(cycle)) * 0.055;
    this.headPivot.rotation.z = Math.sin(cycle * 0.5) * 0.07;
    this.lowerJawPivot.rotation.x = -0.1 - Math.abs(Math.sin(cycle * 0.65)) * 0.35;
  }

  animateStruggle(elapsed) {
    const frantic = elapsed * 13.5;
    this.leftArmPivot.rotation.z = Math.sin(frantic) * 1.08;
    this.rightArmPivot.rotation.z = Math.sin(frantic + 1.8) * 1.08;
    this.leftArm.elbow.rotation.z = Math.sin(frantic * 1.3) * 0.55;
    this.rightArm.elbow.rotation.z = Math.sin(frantic * 1.3 + 2) * 0.55;
    this.leftLegPivot.rotation.z = Math.sin(frantic + 2.1) * 0.78;
    this.rightLegPivot.rotation.z = Math.sin(frantic + 3.8) * 0.78;
    this.headPivot.rotation.z = Math.sin(frantic * 0.8) * 0.18;
    this.lowerJawPivot.rotation.x = -0.82;
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
