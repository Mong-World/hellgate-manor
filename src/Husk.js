import * as THREE from "three";

export class Husk {
  constructor({ scene, position, targetX, onDeath, onImpact }) {
    this.scene = scene;
    this.targetX = targetX;
    this.onDeath = onDeath;
    this.onImpact = onImpact;
    this.dead = false;

    this.walkSpeed = 1.1;
    this.gravity = 28;
    this.drag = 0.992;
    this.killThreshold = 9.4;
    this.velocity = new THREE.Vector3();
    this.airborne = false;
    this.settleTimer = 0;
    this.disposables = [];

    this.group = new THREE.Group();
    this.group.position.copy(position);
    this.scene.add(this.group);

    this.visual = new THREE.Group();
    this.group.add(this.visual);

    this.createMaterials();
    this.createModel();
    this.markPickable(this.group);
  }

  get position() {
    return this.group.position;
  }

  createMaterials() {
    this.materials = {
      flesh: new THREE.MeshStandardMaterial({ color: 0x151317, roughness: 0.78, metalness: 0.03 }),
      bone: new THREE.MeshStandardMaterial({ color: 0x2c2728, roughness: 0.82, metalness: 0.02 }),
      mouth: new THREE.MeshStandardMaterial({ color: 0x090709, roughness: 1 }),
      ember: new THREE.MeshStandardMaterial({
        color: 0xff6c22,
        emissive: 0xff2b05,
        emissiveIntensity: 4.5,
        roughness: 0.32,
      }),
    };
    this.disposables.push(...Object.values(this.materials));
  }

  mesh(geometry, material, parent = this.visual) {
    const m = new THREE.Mesh(geometry, material);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    this.disposables.push(geometry);
    return m;
  }

  createLimb(parent, upperLen, lowerLen, upperRadius, lowerRadius) {
    const upperGeo = new THREE.CylinderGeometry(upperRadius * 0.65, upperRadius, upperLen, 7);
    const lowerGeo = new THREE.CylinderGeometry(lowerRadius * 0.68, lowerRadius, lowerLen, 7);

    const upper = this.mesh(upperGeo, this.materials.flesh, parent);
    upper.position.y = -upperLen * 0.5;

    const elbow = new THREE.Group();
    elbow.position.y = -upperLen;
    parent.add(elbow);

    const lower = this.mesh(lowerGeo, this.materials.flesh, elbow);
    lower.position.y = -lowerLen * 0.5;

    return { upper, elbow, lower };
  }

  createHand(parent, side = 1) {
    const hand = new THREE.Group();
    hand.position.y = -1.5;
    parent.add(hand);

    const palm = this.mesh(new THREE.BoxGeometry(0.18, 0.18, 0.38), this.materials.bone, hand);
    palm.rotation.z = side * 0.16;

    const fingerGeo = new THREE.CylinderGeometry(0.03, 0.015, 0.55, 5);
    this.disposables.push(fingerGeo);
    [-0.09, 0, 0.09].forEach((z, i) => {
      const finger = new THREE.Mesh(fingerGeo, this.materials.bone);
      finger.castShadow = true;
      finger.receiveShadow = true;
      finger.position.set(0.02 * side, -0.27, z);
      finger.rotation.z = side * (0.58 + i * 0.1);
      finger.rotation.x = -0.35 + i * 0.1;
      hand.add(finger);
    });

    return hand;
  }

  createFoot(parent, side = 1) {
    const foot = new THREE.Group();
    foot.position.y = -1.24;
    parent.add(foot);

    const pad = this.mesh(new THREE.BoxGeometry(0.18, 0.12, 0.72), this.materials.bone, foot);
    pad.position.set(0.02 * side, -0.02, 0);
    pad.rotation.x = 0.16;

    const clawGeo = new THREE.CylinderGeometry(0.02, 0.01, 0.34, 5);
    this.disposables.push(clawGeo);
    [-0.17, 0, 0.17].forEach((z) => {
      const claw = new THREE.Mesh(clawGeo, this.materials.bone);
      claw.castShadow = true;
      claw.receiveShadow = true;
      claw.position.set(0.12 * side, -0.02, z);
      claw.rotation.z = side * 1.1;
      foot.add(claw);
    });

    return foot;
  }

  createModel() {
    // torso silhouette
    this.pelvis = this.mesh(new THREE.BoxGeometry(0.52, 0.4, 0.38), this.materials.flesh);
    this.pelvis.position.set(0, 1.5, 0);
    this.pelvis.rotation.z = -0.08;

    this.abdomen = this.mesh(new THREE.CylinderGeometry(0.23, 0.28, 0.78, 8), this.materials.flesh);
    this.abdomen.position.set(0.02, 2.05, 0);
    this.abdomen.rotation.z = -0.1;
    this.abdomen.scale.set(0.9, 1, 0.7);

    this.ribcage = this.mesh(new THREE.CapsuleGeometry(0.34, 0.84, 5, 10), this.materials.flesh);
    this.ribcage.position.set(0.03, 2.95, 0);
    this.ribcage.scale.set(1.0, 1.08, 0.72);
    this.ribcage.rotation.z = -0.12;

    this.shoulders = this.mesh(new THREE.BoxGeometry(1.35, 0.16, 0.28), this.materials.bone);
    this.shoulders.position.set(0.05, 3.55, 0);
    this.shoulders.rotation.z = -0.08;

    // spine spikes
    const spikeGeo = new THREE.ConeGeometry(0.06, 0.22, 5);
    this.disposables.push(spikeGeo);
    for (let i = 0; i < 6; i += 1) {
      const spike = new THREE.Mesh(spikeGeo, this.materials.bone);
      spike.castShadow = true;
      spike.position.set(-0.12, 2.0 + i * 0.38, 0);
      spike.rotation.z = -1.45;
      this.visual.add(spike);
    }

    // neck & head
    this.neckPivot = new THREE.Group();
    this.neckPivot.position.set(-0.02, 3.78, 0);
    this.visual.add(this.neckPivot);

    const neck = this.mesh(new THREE.CylinderGeometry(0.11, 0.14, 0.36, 7), this.materials.flesh, this.neckPivot);
    neck.position.y = -0.17;
    neck.rotation.z = -0.2;

    this.headPivot = new THREE.Group();
    this.headPivot.position.set(0.02, -0.35, 0);
    this.neckPivot.add(this.headPivot);

    const skull = this.mesh(new THREE.SphereGeometry(0.42, 14, 12), this.materials.flesh, this.headPivot);
    skull.scale.set(0.74, 1.18, 0.82);
    skull.position.set(0.1, -0.15, 0);
    skull.rotation.z = 0.18;

    const brow = this.mesh(new THREE.BoxGeometry(0.44, 0.12, 0.54), this.materials.bone, this.headPivot);
    brow.position.set(0.15, -0.03, 0);
    brow.rotation.z = 0.16;

    const faceGlow = this.mesh(new THREE.PlaneGeometry(0.16, 0.5), this.materials.ember, this.headPivot);
    faceGlow.position.set(0.45, -0.05, 0);
    faceGlow.rotation.y = -Math.PI / 2;
    faceGlow.rotation.z = 0.1;

    this.lowerJawPivot = new THREE.Group();
    this.lowerJawPivot.position.set(0.28, -0.18, 0);
    this.headPivot.add(this.lowerJawPivot);

    const jawLeft = this.mesh(new THREE.BoxGeometry(0.12, 0.82, 0.12), this.materials.mouth, this.lowerJawPivot);
    jawLeft.position.set(0.02, -0.4, -0.12);
    jawLeft.rotation.z = -0.18;
    const jawRight = this.mesh(new THREE.BoxGeometry(0.12, 0.82, 0.12), this.materials.mouth, this.lowerJawPivot);
    jawRight.position.set(0.02, -0.4, 0.12);
    jawRight.rotation.z = -0.18;

    // arms
    this.leftArmPivot = new THREE.Group();
    this.rightArmPivot = new THREE.Group();
    this.leftArmPivot.position.set(-0.58, 3.5, 0);
    this.rightArmPivot.position.set(0.62, 3.48, 0);
    this.visual.add(this.leftArmPivot, this.rightArmPivot);

    this.leftArm = this.createLimb(this.leftArmPivot, 1.08, 1.55, 0.11, 0.1);
    this.rightArm = this.createLimb(this.rightArmPivot, 1.08, 1.55, 0.11, 0.1);
    this.leftArm.upper.rotation.z = -0.1;
    this.rightArm.upper.rotation.z = 0.1;
    this.createHand(this.leftArm.elbow, -1);
    this.createHand(this.rightArm.elbow, 1);

    // legs
    this.leftLegPivot = new THREE.Group();
    this.rightLegPivot = new THREE.Group();
    this.leftLegPivot.position.set(-0.2, 1.58, 0);
    this.rightLegPivot.position.set(0.22, 1.56, 0);
    this.visual.add(this.leftLegPivot, this.rightLegPivot);

    this.leftLeg = this.createLimb(this.leftLegPivot, 0.92, 1.22, 0.13, 0.11);
    this.rightLeg = this.createLimb(this.rightLegPivot, 0.92, 1.22, 0.13, 0.11);
    this.leftLeg.elbow.rotation.z = 0.32;
    this.rightLeg.elbow.rotation.z = 0.32;
    this.createFoot(this.leftLeg.elbow, -1);
    this.createFoot(this.rightLeg.elbow, 1);

    // ember cracks
    const cracks = [
      [0.18, 2.98, -0.28, 0.06, 0.75, 0.12],
      [-0.12, 2.42, -0.2, 0.05, 0.46, -0.25],
      [0.04, 1.95, -0.2, 0.04, 0.42, 0.18],
      [0.28, 4.05, -0.3, 0.04, 0.35, 0.1],
    ];
    cracks.forEach(([x, y, z, w, h, r]) => {
      const crack = this.mesh(new THREE.PlaneGeometry(w, h), this.materials.ember);
      crack.position.set(x, y, z);
      crack.rotation.set(0, -Math.PI / 2, r);
    });

    this.visual.rotation.y = -Math.PI / 2;
    this.visual.position.y = 0.03;
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
    this.settleTimer = 0;
  }

  launch(velocity) {
    this.velocity.copy(velocity).multiplyScalar(1.15).clampLength(0, 44);
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
      this.group.rotation.z -= this.velocity.x * dt * 0.12;
      this.group.rotation.x += this.velocity.z * dt * 0.12;
      this.group.rotation.y += this.velocity.z * dt * 0.035;

      if (this.group.position.y <= 0) {
        const impactSpeed = Math.max(0, -this.velocity.y);
        const totalImpact = Math.sqrt(impactSpeed ** 2 + (this.velocity.x * 0.22) ** 2 + (this.velocity.z * 0.22) ** 2);
        this.group.position.y = 0;
        this.onImpact?.({ position: this.group.position.clone(), strength: totalImpact });

        if (totalImpact >= this.killThreshold) {
          this.onDeath({ position: this.group.position.clone().add(new THREE.Vector3(0, 1.3, 0)), impactStrength: totalImpact });
          return;
        }

        this.velocity.y = Math.abs(this.velocity.y) * 0.12;
        this.velocity.x *= 0.34;
        this.velocity.z *= 0.34;
        if (Math.abs(this.velocity.y) < 0.8) {
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
    const cycle = elapsed * 4.6;
    const swing = Math.sin(cycle);
    const lurch = Math.sin(cycle * 0.5) * 0.05;

    this.visual.position.y = Math.abs(Math.sin(cycle)) * 0.07;
    this.visual.rotation.z = -0.08 + lurch;
    this.neckPivot.rotation.z = 0.06 + Math.sin(cycle * 0.5) * 0.05;
    this.headPivot.rotation.z = 0.1 + Math.sin(cycle * 0.8) * 0.1;
    this.lowerJawPivot.rotation.x = -0.2 - Math.abs(Math.sin(cycle * 0.6)) * 0.45;

    this.leftArmPivot.rotation.z = swing * 0.42 + 0.26;
    this.rightArmPivot.rotation.z = -swing * 0.42 - 0.08;
    this.leftArm.elbow.rotation.z = -0.32 + Math.max(0, -swing) * 0.28;
    this.rightArm.elbow.rotation.z = 0.1 + Math.max(0, swing) * 0.28;

    this.leftLegPivot.rotation.z = -swing * 0.36;
    this.rightLegPivot.rotation.z = swing * 0.36;
    this.leftLeg.elbow.rotation.z = 0.28 + Math.max(0, swing) * 0.16;
    this.rightLeg.elbow.rotation.z = 0.28 + Math.max(0, -swing) * 0.16;
  }

  animateStruggle(elapsed) {
    const frantic = elapsed * 13;
    this.visual.rotation.z = Math.sin(frantic * 0.7) * 0.12;
    this.headPivot.rotation.z = Math.sin(frantic * 0.8) * 0.24;
    this.lowerJawPivot.rotation.x = -0.95;

    this.leftArmPivot.rotation.z = Math.sin(frantic) * 1.1;
    this.rightArmPivot.rotation.z = Math.sin(frantic + 1.7) * 1.1;
    this.leftArm.elbow.rotation.z = Math.sin(frantic * 1.3) * 0.62;
    this.rightArm.elbow.rotation.z = Math.sin(frantic * 1.3 + 2.1) * 0.62;
    this.leftLegPivot.rotation.z = Math.sin(frantic + 2.2) * 0.65;
    this.rightLegPivot.rotation.z = Math.sin(frantic + 4.1) * 0.65;
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
