import * as THREE from "three";

function buildLoftGeometry(rings, radialSegments = 14, capStart = true, capEnd = true) {
  const vertices = [];
  const uvs = [];
  const indices = [];
  const ringCount = rings.length;

  for (let i = 0; i < ringCount; i += 1) {
    const ring = rings[i];
    for (let s = 0; s < radialSegments; s += 1) {
      const t = (s / radialSegments) * Math.PI * 2;
      const ct = Math.cos(t);
      const st = Math.sin(t);
      vertices.push(
        (ring.offsetX ?? 0) + ct * ring.rx,
        ring.y,
        (ring.offsetZ ?? 0) + st * ring.rz
      );
      uvs.push(s / radialSegments, i / (ringCount - 1));
    }
  }

  for (let i = 0; i < ringCount - 1; i += 1) {
    const rowA = i * radialSegments;
    const rowB = (i + 1) * radialSegments;
    for (let s = 0; s < radialSegments; s += 1) {
      const next = (s + 1) % radialSegments;
      const a = rowA + s;
      const b = rowA + next;
      const c = rowB + s;
      const d = rowB + next;
      indices.push(a, c, b, b, c, d);
    }
  }

  if (capStart) {
    const baseIndex = vertices.length / 3;
    const first = rings[0];
    vertices.push(first.offsetX ?? 0, first.y, first.offsetZ ?? 0);
    uvs.push(0.5, 0.5);
    for (let s = 0; s < radialSegments; s += 1) {
      const next = (s + 1) % radialSegments;
      indices.push(baseIndex, next, s);
    }
  }

  if (capEnd) {
    const baseIndex = vertices.length / 3;
    const last = rings[rings.length - 1];
    const row = (rings.length - 1) * radialSegments;
    vertices.push(last.offsetX ?? 0, last.y, last.offsetZ ?? 0);
    uvs.push(0.5, 0.5);
    for (let s = 0; s < radialSegments; s += 1) {
      const next = (s + 1) % radialSegments;
      indices.push(baseIndex, row + s, row + next);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(indices);
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();
  return geometry;
}

function buildClawGeometry(length = 0.55, radius = 0.032, bend = 0.18) {
  const points = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(length * 0.35, -0.12, 0),
    new THREE.Vector3(length * 0.7, -0.24, bend),
    new THREE.Vector3(length, -0.34, bend * 1.2),
  ];
  const curve = new THREE.CatmullRomCurve3(points);
  return new THREE.TubeGeometry(curve, 8, radius, 5, false);
}

export class Husk {
  constructor({ scene, position, targetX, onDeath, onImpact }) {
    this.scene = scene;
    this.targetX = targetX;
    this.onDeath = onDeath;
    this.onImpact = onImpact;
    this.dead = false;

    this.walkSpeed = 1.06;
    this.gravity = 28;
    this.drag = 0.992;
    this.killThreshold = 9.3;
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
      flesh: new THREE.MeshStandardMaterial({ color: 0x171319, roughness: 0.78, metalness: 0.04 }),
      fleshDark: new THREE.MeshStandardMaterial({ color: 0x0f0d12, roughness: 0.88, metalness: 0.02 }),
      bone: new THREE.MeshStandardMaterial({ color: 0x292327, roughness: 0.86, metalness: 0.02 }),
      mouth: new THREE.MeshStandardMaterial({ color: 0x080709, roughness: 1.0 }),
      ember: new THREE.MeshStandardMaterial({
        color: 0xff6a22,
        emissive: 0xff2b05,
        emissiveIntensity: 4.9,
        roughness: 0.3,
      }),
    };
    this.disposables.push(...Object.values(this.materials));
  }

  mesh(geometry, material, parent = this.visual) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    this.disposables.push(geometry);
    return mesh;
  }

  createModel() {
    const torsoGeo = buildLoftGeometry([
      { y: 0.0, rx: 0.18, rz: 0.12, offsetX: -0.02 },
      { y: 0.28, rx: 0.26, rz: 0.16, offsetX: -0.05 },
      { y: 0.84, rx: 0.23, rz: 0.14, offsetX: -0.03 },
      { y: 1.45, rx: 0.36, rz: 0.2, offsetX: 0.03 },
      { y: 2.0, rx: 0.42, rz: 0.22, offsetX: 0.1 },
      { y: 2.48, rx: 0.34, rz: 0.18, offsetX: 0.05 },
      { y: 2.9, rx: 0.24, rz: 0.14, offsetX: -0.02 },
    ], 16, true, true);
    this.torso = this.mesh(torsoGeo, this.materials.flesh);
    this.torso.position.set(0, 1.38, 0);
    this.torso.rotation.z = -0.16;
    this.torso.rotation.x = 0.03;

    const ridgeGeo = buildLoftGeometry([
      { y: 0.0, rx: 0.05, rz: 0.03, offsetX: 0.0 },
      { y: 0.42, rx: 0.05, rz: 0.03, offsetX: -0.02 },
      { y: 0.9, rx: 0.055, rz: 0.035, offsetX: -0.02 },
      { y: 1.35, rx: 0.06, rz: 0.04, offsetX: -0.01 },
      { y: 1.85, rx: 0.05, rz: 0.035, offsetX: -0.05 },
    ], 8);
    this.ridge = this.mesh(ridgeGeo, this.materials.bone);
    this.ridge.position.set(-0.24, 2.08, 0);
    this.ridge.rotation.z = -0.35;
    this.ridge.rotation.y = Math.PI * 0.5;

    const clavicleGeo = buildLoftGeometry([
      { y: 0, rx: 0.08, rz: 0.04 },
      { y: 0.4, rx: 0.07, rz: 0.04 },
      { y: 0.8, rx: 0.06, rz: 0.03 },
    ], 8);
    this.clavicle = this.mesh(clavicleGeo, this.materials.bone);
    this.clavicle.position.set(0.12, 4.1, 0);
    this.clavicle.rotation.z = Math.PI * 0.5;
    this.clavicle.scale.set(1.0, 1.9, 1.0);

    this.neckPivot = new THREE.Group();
    this.neckPivot.position.set(0.02, 4.0, 0);
    this.visual.add(this.neckPivot);

    const neckGeo = buildLoftGeometry([
      { y: 0, rx: 0.08, rz: 0.07, offsetX: -0.03 },
      { y: 0.28, rx: 0.07, rz: 0.06, offsetX: 0.0 },
      { y: 0.55, rx: 0.06, rz: 0.05, offsetX: 0.02 },
    ], 10);
    this.neck = this.mesh(neckGeo, this.materials.fleshDark, this.neckPivot);
    this.neck.position.y = -0.05;
    this.neck.rotation.z = -0.45;

    this.headPivot = new THREE.Group();
    this.headPivot.position.set(0.18, 0.3, 0);
    this.neckPivot.add(this.headPivot);

    const headGeo = buildLoftGeometry([
      { y: 0.0, rx: 0.14, rz: 0.11, offsetX: 0.0 },
      { y: 0.22, rx: 0.22, rz: 0.16, offsetX: 0.05 },
      { y: 0.55, rx: 0.32, rz: 0.22, offsetX: 0.14 },
      { y: 0.85, rx: 0.34, rz: 0.23, offsetX: 0.18 },
      { y: 1.18, rx: 0.26, rz: 0.2, offsetX: 0.12 },
      { y: 1.42, rx: 0.15, rz: 0.13, offsetX: 0.02 },
    ], 16);
    this.head = this.mesh(headGeo, this.materials.flesh, this.headPivot);
    this.head.rotation.z = 0.24;
    this.head.rotation.y = -Math.PI / 2;
    this.head.position.set(0.02, -0.28, 0);

    const crestGeo = buildLoftGeometry([
      { y: 0, rx: 0.06, rz: 0.04 },
      { y: 0.3, rx: 0.05, rz: 0.03 },
      { y: 0.7, rx: 0.04, rz: 0.025 },
    ], 8);
    this.crest = this.mesh(crestGeo, this.materials.bone, this.headPivot);
    this.crest.position.set(0.56, 0.2, 0);
    this.crest.rotation.z = -0.14;
    this.crest.rotation.y = -Math.PI / 2;
    this.crest.scale.set(1.2, 1.8, 1.0);

    const mouthShape = new THREE.Shape();
    mouthShape.moveTo(0, 0);
    mouthShape.lineTo(0.34, 0.12);
    mouthShape.lineTo(0.45, 0.02);
    mouthShape.lineTo(0.36, -0.18);
    mouthShape.lineTo(0.04, -0.11);
    const mouthGeo = new THREE.ShapeGeometry(mouthShape);
    this.mouthCavity = this.mesh(mouthGeo, this.materials.mouth, this.headPivot);
    this.mouthCavity.position.set(0.38, -0.12, 0);
    this.mouthCavity.rotation.y = -Math.PI / 2;
    this.mouthCavity.rotation.z = 0.08;

    const emberSlitShape = new THREE.Shape();
    emberSlitShape.moveTo(0, 0);
    emberSlitShape.lineTo(0.08, 0.23);
    emberSlitShape.lineTo(0.02, 0.38);
    emberSlitShape.lineTo(-0.08, 0.18);
    const emberGeo = new THREE.ShapeGeometry(emberSlitShape);
    this.faceGlow = this.mesh(emberGeo, this.materials.ember, this.headPivot);
    this.faceGlow.position.set(0.58, -0.05, 0);
    this.faceGlow.rotation.y = -Math.PI / 2;
    this.faceGlow.scale.set(1.0, 1.8, 1.0);

    this.lowerJawPivot = new THREE.Group();
    this.lowerJawPivot.position.set(0.33, -0.2, 0);
    this.headPivot.add(this.lowerJawPivot);

    const jawGeo = buildLoftGeometry([
      { y: 0, rx: 0.05, rz: 0.035, offsetX: 0 },
      { y: 0.35, rx: 0.05, rz: 0.03, offsetX: 0.05 },
      { y: 0.72, rx: 0.04, rz: 0.025, offsetX: 0.09 },
      { y: 1.0, rx: 0.03, rz: 0.02, offsetX: 0.12 },
    ], 8);

    this.jawLeft = this.mesh(jawGeo, this.materials.bone, this.lowerJawPivot);
    this.jawLeft.rotation.z = -0.14;
    this.jawLeft.rotation.x = -0.04;
    this.jawLeft.rotation.y = -Math.PI / 2;
    this.jawLeft.position.set(0.0, -0.02, -0.12);

    this.jawRight = this.mesh(jawGeo.clone(), this.materials.bone, this.lowerJawPivot);
    this.jawRight.rotation.z = -0.14;
    this.jawRight.rotation.x = 0.04;
    this.jawRight.rotation.y = -Math.PI / 2;
    this.jawRight.position.set(0.0, -0.02, 0.12);

    this.leftArmPivot = new THREE.Group();
    this.rightArmPivot = new THREE.Group();
    this.leftArmPivot.position.set(-0.58, 4.05, 0);
    this.rightArmPivot.position.set(0.75, 4.0, 0);
    this.visual.add(this.leftArmPivot, this.rightArmPivot);

    this.leftArmLowerPivot = new THREE.Group();
    this.rightArmLowerPivot = new THREE.Group();
    this.leftArmPivot.add(this.leftArmLowerPivot);
    this.rightArmPivot.add(this.rightArmLowerPivot);

    const upperArmGeo = buildLoftGeometry([
      { y: 0, rx: 0.12, rz: 0.08, offsetX: 0 },
      { y: 0.4, rx: 0.1, rz: 0.07, offsetX: 0.02 },
      { y: 0.82, rx: 0.08, rz: 0.06, offsetX: 0.06 },
      { y: 1.18, rx: 0.07, rz: 0.05, offsetX: 0.1 },
    ], 10);
    const foreArmGeo = buildLoftGeometry([
      { y: 0, rx: 0.08, rz: 0.055, offsetX: 0 },
      { y: 0.56, rx: 0.07, rz: 0.05, offsetX: 0.08 },
      { y: 1.18, rx: 0.055, rz: 0.04, offsetX: 0.17 },
      { y: 1.72, rx: 0.04, rz: 0.03, offsetX: 0.26 },
    ], 10);

    this.leftUpperArm = this.mesh(upperArmGeo, this.materials.fleshDark, this.leftArmPivot);
    this.leftUpperArm.rotation.z = 0.04;
    this.leftUpperArm.rotation.y = -Math.PI / 2;
    this.leftUpperArm.position.set(0, -0.05, 0);
    this.leftArmLowerPivot.position.set(0.95, -1.05, 0);

    this.rightUpperArm = this.mesh(upperArmGeo.clone(), this.materials.fleshDark, this.rightArmPivot);
    this.rightUpperArm.rotation.z = -0.04;
    this.rightUpperArm.rotation.y = -Math.PI / 2;
    this.rightUpperArm.position.set(0, -0.05, 0);
    this.rightArmLowerPivot.position.set(0.95, -1.05, 0);

    this.leftForeArm = this.mesh(foreArmGeo, this.materials.fleshDark, this.leftArmLowerPivot);
    this.leftForeArm.rotation.y = -Math.PI / 2;
    this.rightForeArm = this.mesh(foreArmGeo.clone(), this.materials.fleshDark, this.rightArmLowerPivot);
    this.rightForeArm.rotation.y = -Math.PI / 2;

    this.leftHandPivot = new THREE.Group();
    this.rightHandPivot = new THREE.Group();
    this.leftHandPivot.position.set(1.8, -1.56, 0);
    this.rightHandPivot.position.set(1.8, -1.56, 0);
    this.leftArmLowerPivot.add(this.leftHandPivot);
    this.rightArmLowerPivot.add(this.rightHandPivot);

    const palmGeo = buildLoftGeometry([
      { y: 0, rx: 0.07, rz: 0.1, offsetX: 0 },
      { y: 0.22, rx: 0.06, rz: 0.09, offsetX: 0.04 },
      { y: 0.42, rx: 0.04, rz: 0.08, offsetX: 0.08 },
    ], 8);
    this.leftPalm = this.mesh(palmGeo, this.materials.bone, this.leftHandPivot);
    this.leftPalm.rotation.z = Math.PI / 2;
    this.leftPalm.rotation.x = 0.16;
    this.rightPalm = this.mesh(palmGeo.clone(), this.materials.bone, this.rightHandPivot);
    this.rightPalm.rotation.z = Math.PI / 2;
    this.rightPalm.rotation.x = -0.16;

    const clawGeo = buildClawGeometry();
    for (const [pivot, sign] of [[this.leftHandPivot, -1], [this.rightHandPivot, 1]]) {
      [-0.13, 0, 0.13].forEach((z, i) => {
        const claw = this.mesh(clawGeo.clone(), this.materials.bone, pivot);
        claw.position.set(0.08, -0.04, z);
        claw.rotation.y = sign > 0 ? 0 : Math.PI;
        claw.rotation.z = sign * (0.08 + i * 0.04);
      });
    }

    this.leftLegPivot = new THREE.Group();
    this.rightLegPivot = new THREE.Group();
    this.leftLegPivot.position.set(-0.16, 1.52, 0);
    this.rightLegPivot.position.set(0.18, 1.48, 0);
    this.visual.add(this.leftLegPivot, this.rightLegPivot);

    this.leftShinPivot = new THREE.Group();
    this.rightShinPivot = new THREE.Group();
    this.leftLegPivot.add(this.leftShinPivot);
    this.rightLegPivot.add(this.rightShinPivot);

    const thighGeo = buildLoftGeometry([
      { y: 0, rx: 0.1, rz: 0.07, offsetX: 0 },
      { y: 0.4, rx: 0.09, rz: 0.065, offsetX: 0.02 },
      { y: 0.82, rx: 0.07, rz: 0.05, offsetX: 0.08 },
      { y: 1.1, rx: 0.06, rz: 0.045, offsetX: 0.12 },
    ], 10);
    const shinGeo = buildLoftGeometry([
      { y: 0, rx: 0.07, rz: 0.05, offsetX: 0 },
      { y: 0.45, rx: 0.055, rz: 0.04, offsetX: 0.02 },
      { y: 0.98, rx: 0.045, rz: 0.035, offsetX: 0.06 },
      { y: 1.3, rx: 0.04, rz: 0.03, offsetX: 0.11 },
    ], 10);

    this.leftThigh = this.mesh(thighGeo, this.materials.fleshDark, this.leftLegPivot);
    this.leftThigh.rotation.y = -Math.PI / 2;
    this.rightThigh = this.mesh(thighGeo.clone(), this.materials.fleshDark, this.rightLegPivot);
    this.rightThigh.rotation.y = -Math.PI / 2;

    this.leftShinPivot.position.set(0.93, -0.92, 0);
    this.rightShinPivot.position.set(0.93, -0.92, 0);
    this.leftShin = this.mesh(shinGeo, this.materials.fleshDark, this.leftShinPivot);
    this.leftShin.rotation.y = -Math.PI / 2;
    this.rightShin = this.mesh(shinGeo.clone(), this.materials.fleshDark, this.rightShinPivot);
    this.rightShin.rotation.y = -Math.PI / 2;

    const footGeo = buildLoftGeometry([
      { y: 0, rx: 0.06, rz: 0.1, offsetX: 0 },
      { y: 0.18, rx: 0.06, rz: 0.12, offsetX: 0.18 },
      { y: 0.3, rx: 0.05, rz: 0.11, offsetX: 0.38 },
      { y: 0.4, rx: 0.04, rz: 0.08, offsetX: 0.58 },
    ], 8);
    this.leftFootPivot = new THREE.Group();
    this.rightFootPivot = new THREE.Group();
    this.leftFootPivot.position.set(1.3, -1.2, 0);
    this.rightFootPivot.position.set(1.3, -1.2, 0);
    this.leftShinPivot.add(this.leftFootPivot);
    this.rightShinPivot.add(this.rightFootPivot);
    this.leftFoot = this.mesh(footGeo, this.materials.bone, this.leftFootPivot);
    this.leftFoot.rotation.y = -Math.PI / 2;
    this.rightFoot = this.mesh(footGeo.clone(), this.materials.bone, this.rightFootPivot);
    this.rightFoot.rotation.y = -Math.PI / 2;

    const toeGeo = buildClawGeometry(0.32, 0.018, 0.08);
    for (const pivot of [this.leftFootPivot, this.rightFootPivot]) {
      [-0.12, 0, 0.12].forEach((z) => {
        const toe = this.mesh(toeGeo.clone(), this.materials.bone, pivot);
        toe.position.set(0.55, -0.04, z);
        toe.rotation.z = 0.15;
      });
    }

    const addCrack = (pos, rot, scale) => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.lineTo(0.03, 0.16);
      shape.lineTo(-0.01, 0.44);
      shape.lineTo(0.04, 0.7);
      shape.lineTo(0.0, 0.9);
      const geo = new THREE.ShapeGeometry(shape);
      const crack = this.mesh(geo, this.materials.ember);
      crack.position.copy(pos);
      crack.rotation.set(rot.x, rot.y, rot.z);
      crack.scale.copy(scale);
    };
    addCrack(new THREE.Vector3(0.22, 3.55, -0.18), new THREE.Euler(0, -Math.PI / 2, 0.15), new THREE.Vector3(1.0, 1.2, 1));
    addCrack(new THREE.Vector3(-0.04, 2.8, -0.1), new THREE.Euler(0, -Math.PI / 2, -0.2), new THREE.Vector3(0.8, 0.9, 1));
    addCrack(new THREE.Vector3(0.08, 2.1, -0.1), new THREE.Euler(0, -Math.PI / 2, 0.1), new THREE.Vector3(0.65, 0.8, 1));
    addCrack(new THREE.Vector3(0.52, 4.26, -0.1), new THREE.Euler(0, -Math.PI / 2, 0.1), new THREE.Vector3(0.48, 0.58, 1));

    this.visual.rotation.y = -Math.PI / 2;
    this.visual.position.y = 0.02;
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
          this.onDeath({ position: this.group.position.clone().add(new THREE.Vector3(0, 1.35, 0)), impactStrength: totalImpact });
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
    const cycle = elapsed * 4.4;
    const swing = Math.sin(cycle);
    const lurch = Math.sin(cycle * 0.5) * 0.06;

    this.visual.position.y = Math.abs(Math.sin(cycle)) * 0.07;
    this.visual.rotation.z = -0.12 + lurch;
    this.neckPivot.rotation.z = -0.12 + Math.sin(cycle * 0.5) * 0.05;
    this.headPivot.rotation.z = 0.15 + Math.sin(cycle * 0.8) * 0.12;
    this.lowerJawPivot.rotation.x = -0.25 - Math.abs(Math.sin(cycle * 0.62)) * 0.55;

    this.leftArmPivot.rotation.z = swing * 0.28 + 0.7;
    this.rightArmPivot.rotation.z = -swing * 0.28 - 0.18;
    this.leftArmLowerPivot.rotation.z = -0.32 + Math.max(0, -swing) * 0.36;
    this.rightArmLowerPivot.rotation.z = 0.05 + Math.max(0, swing) * 0.36;

    this.leftLegPivot.rotation.z = -swing * 0.28;
    this.rightLegPivot.rotation.z = swing * 0.28;
    this.leftShinPivot.rotation.z = 0.42 + Math.max(0, swing) * 0.18;
    this.rightShinPivot.rotation.z = 0.42 + Math.max(0, -swing) * 0.18;
  }

  animateStruggle(elapsed) {
    const frantic = elapsed * 13;
    this.visual.rotation.z = Math.sin(frantic * 0.7) * 0.14;
    this.headPivot.rotation.z = Math.sin(frantic * 0.8) * 0.28;
    this.lowerJawPivot.rotation.x = -1.05;

    this.leftArmPivot.rotation.z = Math.sin(frantic) * 1.25;
    this.rightArmPivot.rotation.z = Math.sin(frantic + 1.7) * 1.25;
    this.leftArmLowerPivot.rotation.z = Math.sin(frantic * 1.3) * 0.82;
    this.rightArmLowerPivot.rotation.z = Math.sin(frantic * 1.3 + 2.1) * 0.82;
    this.leftLegPivot.rotation.z = Math.sin(frantic + 2.2) * 0.7;
    this.rightLegPivot.rotation.z = Math.sin(frantic + 4.1) * 0.7;
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
