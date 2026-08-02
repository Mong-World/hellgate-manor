import * as THREE from "three";

function createExtrudedGeometry(points, depth = 0.5, bevel = 0.02) {
  const shape = new THREE.Shape();
  points.forEach(([x, y], i) => {
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  });
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: bevel > 0,
    bevelSize: bevel,
    bevelThickness: bevel * 0.8,
    bevelSegments: 1,
    curveSegments: 12,
  });
  geometry.center();
  return geometry;
}

function createArchGeometry(width = 0.7, height = 1.4, depth = 0.14) {
  const radius = width * 0.5;
  const straightH = height - radius;
  const shape = new THREE.Shape();
  shape.moveTo(-width / 2, 0);
  shape.lineTo(-width / 2, straightH);
  shape.absarc(0, straightH, radius, Math.PI, 0, false);
  shape.lineTo(width / 2, 0);
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 12 });
  geometry.center();
  return geometry;
}

function createRoofGeometry(width, depth, height) {
  const w = width / 2;
  const d = depth / 2;
  const h = height;
  const vertices = [
    -w, 0, -d,
    w, 0, -d,
    w, 0, d,
    -w, 0, d,
    0, h, -d * 0.15,
    0, h, d * 0.15,
  ];
  const indices = [
    0, 1, 4,
    1, 2, 5,
    1, 5, 4,
    2, 3, 5,
    3, 0, 4,
    3, 4, 5,
    3, 5, 2,
    0, 3, 2,
    0, 2, 1,
  ];
  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(indices);
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.computeVertexNormals();
  return geometry;
}

function createLoftGeometry(rings, radialSegments = 10) {
  const vertices = [];
  const indices = [];
  for (let i = 0; i < rings.length; i += 1) {
    const ring = rings[i];
    for (let s = 0; s < radialSegments; s += 1) {
      const t = (s / radialSegments) * Math.PI * 2;
      vertices.push(
        (ring.offsetX ?? 0) + Math.cos(t) * ring.rx,
        ring.y,
        (ring.offsetZ ?? 0) + Math.sin(t) * ring.rz
      );
    }
  }
  for (let i = 0; i < rings.length - 1; i += 1) {
    const a0 = i * radialSegments;
    const b0 = (i + 1) * radialSegments;
    for (let s = 0; s < radialSegments; s += 1) {
      const n = (s + 1) % radialSegments;
      indices.push(a0 + s, b0 + s, a0 + n, a0 + n, b0 + s, b0 + n);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(indices);
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.computeVertexNormals();
  return geometry;
}

export class World {
  constructor(scene) {
    this.scene = scene;
    this.disposables = [];
    this.flames = [];
    this.fogPatches = [];

    this.createMaterials();
    this.createLights();
    this.createSkyObjects();
    this.createGround();
    this.createManor();
    this.createFrontFence();
    this.createForest();
    this.createAtmosphere();
  }

  createMaterials() {
    this.materials = {
      stone: new THREE.MeshStandardMaterial({ color: 0x353742, roughness: 0.92, metalness: 0.03 }),
      stoneDark: new THREE.MeshStandardMaterial({ color: 0x20222a, roughness: 0.95 }),
      trim: new THREE.MeshStandardMaterial({ color: 0x696574, roughness: 0.84, metalness: 0.08 }),
      roof: new THREE.MeshStandardMaterial({ color: 0x0e1118, roughness: 0.75, metalness: 0.08 }),
      iron: new THREE.MeshStandardMaterial({ color: 0x0f1115, roughness: 0.44, metalness: 0.8 }),
      window: new THREE.MeshStandardMaterial({ color: 0xffb26c, emissive: 0xff4b10, emissiveIntensity: 4.3, roughness: 0.25 }),
      earth: new THREE.MeshStandardMaterial({ color: 0x12141a, roughness: 1.0 }),
      road: new THREE.MeshStandardMaterial({ color: 0x0d0f13, roughness: 1.0 }),
      ember: new THREE.MeshBasicMaterial({ color: 0xff5b18 }),
      moon: new THREE.MeshBasicMaterial({ color: 0xdce4f3 }),
      mist: new THREE.MeshBasicMaterial({ color: 0x8192b8, transparent: true, opacity: 0.055, depthWrite: false }),
    };
    this.disposables.push(...Object.values(this.materials));
  }

  addMesh(geometry, material, parent = this.scene, pos = [0, 0, 0], rot = [0, 0, 0], scale = [1, 1, 1]) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...pos);
    mesh.rotation.set(...rot);
    mesh.scale.set(...scale);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    this.disposables.push(geometry);
    return mesh;
  }

  createLights() {
    this.scene.add(new THREE.HemisphereLight(0x7888aa, 0x100c0c, 1.55));

    const moon = new THREE.DirectionalLight(0xaec4f1, 3.45);
    moon.position.set(-18, 23, 12);
    moon.castShadow = true;
    moon.shadow.mapSize.set(2048, 2048);
    moon.shadow.camera.left = -35;
    moon.shadow.camera.right = 35;
    moon.shadow.camera.top = 24;
    moon.shadow.camera.bottom = -20;
    moon.shadow.camera.near = 1;
    moon.shadow.camera.far = 100;
    moon.shadow.bias = -0.00035;
    this.scene.add(moon);

    this.hellGlow = new THREE.PointLight(0xff4b10, 35, 20, 1.7);
    this.hellGlow.position.set(13.9, 4.2, 0);
    this.scene.add(this.hellGlow);
  }

  createSkyObjects() {
    const moonGeo = new THREE.CircleGeometry(1.3, 32);
    const moon = new THREE.Mesh(moonGeo, this.materials.moon);
    moon.position.set(-13.8, 16.2, -18);
    this.scene.add(moon);
    this.disposables.push(moonGeo);

    const starGeo = new THREE.BufferGeometry();
    const count = 180;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = THREE.MathUtils.randFloat(-24, 20);
      positions[i * 3 + 1] = THREE.MathUtils.randFloat(7.2, 18);
      positions[i * 3 + 2] = -19;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xb4c0dd, size: 0.04, transparent: true, opacity: 0.82, depthWrite: false });
    this.stars = new THREE.Points(starGeo, starMat);
    this.scene.add(this.stars);
    this.disposables.push(starGeo, starMat);
  }

  createGround() {
    const groundGeo = new THREE.PlaneGeometry(82, 28, 70, 24);
    groundGeo.rotateX(-Math.PI / 2);
    const pos = groundGeo.attributes.position;
    for (let i = 0; i < pos.count; i += 1) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      let y = Math.sin(x * 0.14) * 0.06 + Math.cos(z * 0.4) * 0.04 + Math.sin((x + z) * 0.1) * 0.03;
      if (x > -13 && x < 10) y *= 0.3;
      pos.setY(i, y);
    }
    groundGeo.computeVertexNormals();
    this.addMesh(groundGeo, this.materials.earth, this.scene, [0, -0.05, 0], [0, 0, 0]);

    const roadGeo = createExtrudedGeometry([
      [-18, -4.9],
      [13, -4.4],
      [14.3, -1.9],
      [15.1, 0],
      [14.3, 1.9],
      [13, 4.4],
      [-18, 4.9],
      [-17.4, 0],
    ], 0.04, 0.0);
    this.addMesh(roadGeo, this.materials.road, this.scene, [-1.8, 0.015, 0], [-Math.PI / 2, 0, 0]);

    const shardGeo = createExtrudedGeometry([[-0.22, -0.08], [0.24, -0.04], [0.16, 0.1], [-0.18, 0.06]], 0.06, 0);
    for (let i = 0; i < 18; i += 1) {
      const left = Math.random() < 0.8;
      this.addMesh(
        shardGeo.clone(),
        this.materials.stoneDark,
        this.scene,
        [left ? THREE.MathUtils.randFloat(-31, -18) : THREE.MathUtils.randFloat(15, 27), 0.03, THREE.MathUtils.randFloat(-12, 12)],
        [0, Math.random() * Math.PI, 0],
        [THREE.MathUtils.randFloat(0.7, 2), 1, THREE.MathUtils.randFloat(0.8, 1.6)]
      );
    }
  }

  createWindow(parent, x, y, z, width = 0.7, height = 1.36) {
    const frameGeo = createArchGeometry(width + 0.18, height + 0.18, 0.1);
    const glowGeo = createArchGeometry(width, height, 0.12);
    const mullionGeo = createExtrudedGeometry([[-0.03, -height * 0.48], [0.03, -height * 0.48], [0.03, height * 0.45], [-0.03, height * 0.45]], 0.08, 0);
    const crossGeo = createExtrudedGeometry([[-width * 0.48, -0.03], [width * 0.48, -0.03], [width * 0.48, 0.03], [-width * 0.48, 0.03]], 0.08, 0);

    this.addMesh(frameGeo, this.materials.trim, parent, [x, y, z]);
    this.addMesh(glowGeo, this.materials.window, parent, [x, y, z - 0.02]);
    this.addMesh(mullionGeo, this.materials.iron, parent, [x, y, z + 0.04]);
    this.addMesh(crossGeo, this.materials.iron, parent, [x, y - 0.06, z + 0.04]);
  }

  createManor() {
    const manor = new THREE.Group();
    manor.position.set(15.3, 0, 0);
    this.scene.add(manor);
    this.manor = manor;

    const bodyGeo = createExtrudedGeometry([
      [-4.7, -0.1],
      [4.7, -0.1],
      [4.7, 5.6],
      [2.8, 5.6],
      [2.3, 6.0],
      [-2.3, 6.0],
      [-2.8, 5.6],
      [-4.7, 5.6],
    ], 4.8, 0.03);
    this.addMesh(bodyGeo, this.materials.stone, manor, [0, 2.8, 0], [0, Math.PI, 0]);

    const wingGeo = createExtrudedGeometry([[-1.65, 0], [1.65, 0], [1.65, 4.1], [0.9, 4.1], [0.5, 4.5], [-0.5, 4.5], [-0.9, 4.1], [-1.65, 4.1]], 3.7, 0.03);
    this.addMesh(wingGeo.clone(), this.materials.stoneDark, manor, [-6.2, 2.05, 0], [0, Math.PI, 0]);
    this.addMesh(wingGeo.clone(), this.materials.stoneDark, manor, [6.2, 2.05, 0], [0, Math.PI, 0]);

    const towerGeo = createLoftGeometry([
      { y: 0, rx: 1.3, rz: 1.2 },
      { y: 2.0, rx: 1.25, rz: 1.15 },
      { y: 4.1, rx: 1.2, rz: 1.1 },
      { y: 6.1, rx: 1.14, rz: 1.06 },
      { y: 7.2, rx: 1.08, rz: 1.0 },
    ], 8);
    this.addMesh(towerGeo.clone(), this.materials.stoneDark, manor, [-8.5, 0, 0]);
    this.addMesh(towerGeo.clone(), this.materials.stoneDark, manor, [8.5, 0, 0]);

    const porchGeo = createExtrudedGeometry([[-1.5, 0], [1.5, 0], [1.5, 3.1], [0.9, 3.4], [-0.9, 3.4], [-1.5, 3.1]], 1.4, 0.02);
    this.addMesh(porchGeo, this.materials.stoneDark, manor, [0, 1.55, -3.12], [0, Math.PI, 0]);

    const buttressGeo = createExtrudedGeometry([[-0.22, 0], [0.22, 0], [0.14, 4.8], [-0.14, 4.8]], 0.5, 0);
    [-3.8, -2.05, 2.05, 3.8].forEach((x) => {
      this.addMesh(buttressGeo.clone(), this.materials.trim, manor, [x, 2.3, -2.18], [0, Math.PI, 0]);
    });
    [-6.9, -5.45, 5.45, 6.9].forEach((x) => {
      this.addMesh(buttressGeo.clone(), this.materials.trim, manor, [x, 2.6, -1.95], [0, Math.PI, 0], [1, 1.15, 1]);
    });

    const bandGeoMain = createExtrudedGeometry([[-4.95, -0.1], [4.95, -0.1], [4.95, 0.14], [-4.95, 0.14]], 4.95, 0);
    this.addMesh(bandGeoMain.clone(), this.materials.trim, manor, [0, 5.55, 0], [0, Math.PI, 0]);
    const bandGeoWing = createExtrudedGeometry([[-1.8, -0.08], [1.8, -0.08], [1.8, 0.12], [-1.8, 0.12]], 3.8, 0);
    this.addMesh(bandGeoWing.clone(), this.materials.trim, manor, [-6.2, 4.05, 0], [0, Math.PI, 0]);
    this.addMesh(bandGeoWing.clone(), this.materials.trim, manor, [6.2, 4.05, 0], [0, Math.PI, 0]);

    [[-3.0, 2.0], [0, 2.0], [3.0, 2.0], [-3.0, 4.1], [0, 4.1], [3.0, 4.1]].forEach(([x, y]) => {
      this.createWindow(manor, x, y, -2.42, 0.7, 1.38);
    });
    [[-6.2, 1.8], [-6.2, 3.5], [6.2, 1.8], [6.2, 3.5]].forEach(([x, y]) => {
      this.createWindow(manor, x, y, -1.9, 0.62, 1.18);
    });
    [[-8.5, 2.0], [-8.5, 4.2], [8.5, 2.0], [8.5, 4.2]].forEach(([x, y]) => {
      this.createWindow(manor, x, y, -0.9, 0.46, 1.02);
    });

    const archGeo = createArchGeometry(1.6, 2.8, 0.18);
    this.addMesh(archGeo, this.materials.trim, manor, [0, 1.42, -3.88]);
    const doorGeo = createArchGeometry(1.18, 2.35, 0.12);
    this.addMesh(doorGeo, this.materials.iron, manor, [0, 1.32, -3.96]);

    const stepGeo = createExtrudedGeometry([[-1.65, 0], [1.65, 0], [1.4, 0.18], [-1.4, 0.18]], 0.9, 0);
    this.addMesh(stepGeo.clone(), this.materials.stoneDark, manor, [0, 0.09, -4.3]);
    this.addMesh(stepGeo.clone(), this.materials.trim, manor, [0, 0.28, -3.96], [0, 0, 0], [0.88, 1, 0.88]);

    this.addMesh(createRoofGeometry(10.4, 5.8, 2.8), this.materials.roof, manor, [0, 6.25, 0]);
    this.addMesh(createRoofGeometry(3.9, 4.5, 2.0), this.materials.roof, manor, [-6.2, 4.6, 0]);
    this.addMesh(createRoofGeometry(3.9, 4.5, 2.0), this.materials.roof, manor, [6.2, 4.6, 0]);

    const spireGeo = createLoftGeometry([
      { y: 0, rx: 1.04, rz: 0.98 },
      { y: 1.1, rx: 0.76, rz: 0.74 },
      { y: 2.4, rx: 0.46, rz: 0.44 },
      { y: 3.8, rx: 0.14, rz: 0.14 },
      { y: 4.35, rx: 0.02, rz: 0.02 },
    ], 8);
    this.addMesh(spireGeo.clone(), this.materials.roof, manor, [-8.5, 7.2, 0]);
    this.addMesh(spireGeo.clone(), this.materials.roof, manor, [8.5, 7.2, 0]);

    const chimneyGeo = createExtrudedGeometry([[-0.28, -0.28], [0.28, -0.28], [0.28, 0.28], [-0.28, 0.28]], 1.5, 0.01);
    this.addMesh(chimneyGeo.clone(), this.materials.trim, manor, [-2.6, 8.25, 0.1]);
    this.addMesh(chimneyGeo.clone(), this.materials.trim, manor, [2.9, 8.6, -0.4]);
    const capGeo = createExtrudedGeometry([[-0.36, -0.36], [0.36, -0.36], [0.36, 0.36], [-0.36, 0.36]], 0.12, 0);
    this.addMesh(capGeo.clone(), this.materials.trim, manor, [-2.6, 9.0, 0.1]);
    this.addMesh(capGeo.clone(), this.materials.trim, manor, [2.9, 9.35, -0.4]);

    this.createBrazier(11.8, -4.0);
    this.createBrazier(11.8, 4.0);
  }

  createBrazier(x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    this.scene.add(group);

    const stemGeo = createLoftGeometry([
      { y: 0, rx: 0.12, rz: 0.12 },
      { y: 0.58, rx: 0.16, rz: 0.16 },
      { y: 1.12, rx: 0.2, rz: 0.2 },
    ], 8);
    const bowlGeo = createLoftGeometry([
      { y: 0, rx: 0.18, rz: 0.18 },
      { y: 0.12, rx: 0.28, rz: 0.28 },
      { y: 0.26, rx: 0.34, rz: 0.34 },
      { y: 0.34, rx: 0.24, rz: 0.24 },
    ], 10);
    this.addMesh(stemGeo, this.materials.iron, group, [0, 0.15, 0]);
    this.addMesh(bowlGeo, this.materials.iron, group, [0, 1.1, 0]);

    const flameGeo = createExtrudedGeometry([[0, 0], [0.16, 0.42], [0.04, 0.78], [-0.16, 0.4]], 0.08, 0);
    const flame = this.addMesh(flameGeo, this.materials.ember, group, [0, 1.35, 0], [0, Math.PI / 2, 0]);
    const light = new THREE.PointLight(0xff5816, 11, 8, 2);
    light.position.set(0, 1.34, 0);
    group.add(light);
    this.flames.push({ flame, light, phase: Math.random() * Math.PI * 2 });
  }

  createFrontFence() {
    const fence = new THREE.Group();
    this.scene.add(fence);
    const barGeo = createExtrudedGeometry([[-0.04, -0.68], [0.04, -0.68], [0.04, 0.54], [-0.04, 0.54]], 0.06, 0);
    const spikeGeo = createExtrudedGeometry([[0, 0.18], [0.08, 0], [-0.08, 0]], 0.08, 0);
    const railGeo = createExtrudedGeometry([[-1.25, -0.03], [1.25, -0.03], [1.25, 0.03], [-1.25, 0.03]], 0.06, 0);

    const buildSection = (x, z, count) => {
      const sec = new THREE.Group();
      sec.position.set(x, 0.7, z);
      fence.add(sec);
      for (let i = 0; i < count; i += 1) {
        const off = -((count - 1) * 0.42) * 0.5 + i * 0.42;
        this.addMesh(barGeo.clone(), this.materials.iron, sec, [0, 0, off], [0, Math.PI / 2, 0]);
        this.addMesh(spikeGeo.clone(), this.materials.iron, sec, [0, 0.72, off], [0, Math.PI / 2, 0]);
      }
      this.addMesh(railGeo.clone(), this.materials.iron, sec, [0, -0.05, 0], [0, Math.PI / 2, 0], [count * 0.42 / 2.5, 1, 1]);
      this.addMesh(railGeo.clone(), this.materials.iron, sec, [0, 0.32, 0], [0, Math.PI / 2, 0], [count * 0.42 / 2.5, 1, 1]);
    };

    buildSection(13.2, -4.5, 7);
    buildSection(13.2, 4.5, 7);
  }

  createForest() {
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x101116, roughness: 1 });
    this.disposables.push(trunkMat);

    const trunkGeo = createLoftGeometry([
      { y: 0, rx: 0.18, rz: 0.16 },
      { y: 2.8, rx: 0.14, rz: 0.12, offsetX: -0.02 },
      { y: 5.8, rx: 0.1, rz: 0.09, offsetX: 0.02 },
      { y: 8.9, rx: 0.08, rz: 0.07, offsetX: -0.05 },
    ], 6);
    const branchGeo = createLoftGeometry([
      { y: 0, rx: 0.06, rz: 0.05 },
      { y: 0.8, rx: 0.05, rz: 0.04, offsetX: 0.12 },
      { y: 1.6, rx: 0.035, rz: 0.03, offsetX: 0.28 },
      { y: 2.2, rx: 0.02, rz: 0.02, offsetX: 0.45 },
    ], 5);

    for (let i = 0; i < 36; i += 1) {
      const tree = new THREE.Group();
      tree.position.set(THREE.MathUtils.randFloat(-31.5, -18), 0, THREE.MathUtils.randFloat(-12.5, 12.5));
      tree.scale.setScalar(THREE.MathUtils.randFloat(0.85, 1.55));
      this.scene.add(tree);
      this.addMesh(trunkGeo.clone(), trunkMat, tree, [0, 0, 0]);
      const branches = 2 + Math.floor(Math.random() * 4);
      for (let b = 0; b < branches; b += 1) {
        this.addMesh(
          branchGeo.clone(),
          trunkMat,
          tree,
          [0, THREE.MathUtils.randFloat(4.0, 8.0), 0],
          [0, Math.random() * Math.PI, THREE.MathUtils.randFloat(0.8, 1.2) * (Math.random() > 0.5 ? 1 : -1)]
        );
      }
    }
  }

  createAtmosphere() {
    const emberGeo = new THREE.BufferGeometry();
    const emberCount = 150;
    const p = new Float32Array(emberCount * 3);
    for (let i = 0; i < emberCount; i += 1) {
      p[i * 3] = THREE.MathUtils.randFloat(6, 18.5);
      p[i * 3 + 1] = THREE.MathUtils.randFloat(0.3, 10.5);
      p[i * 3 + 2] = THREE.MathUtils.randFloat(-8.5, 8.5);
    }
    emberGeo.setAttribute("position", new THREE.BufferAttribute(p, 3));
    const emberMat = new THREE.PointsMaterial({ color: 0xff5b18, size: 0.06, transparent: true, opacity: 0.72, depthWrite: false });
    this.embers = new THREE.Points(emberGeo, emberMat);
    this.scene.add(this.embers);
    this.disposables.push(emberGeo, emberMat);

    const fogGeo = createExtrudedGeometry([[-4, -0.9], [4, -1.2], [4.3, 1.2], [-4.2, 0.95]], 0.02, 0);
    for (let i = 0; i < 5; i += 1) {
      const patch = this.addMesh(fogGeo.clone(), this.materials.mist, this.scene, [-10 + i * 5.5, 0.06, (i % 2 === 0 ? -1 : 1) * 1.6], [-Math.PI / 2, 0, 0]);
      this.fogPatches.push({ patch, phase: i * 0.9 });
    }
  }

  update(elapsed) {
    this.flames.forEach(({ flame, light, phase }) => {
      const pulse = 0.88 + Math.sin(elapsed * 7.8 + phase) * 0.12 + Math.sin(elapsed * 15 + phase) * 0.05;
      flame.scale.set(0.9 / pulse, 1.25 * pulse, 0.9 / pulse);
      light.intensity = 9.8 + pulse * 2.8;
    });
    this.hellGlow.intensity = 33 + Math.sin(elapsed * 2.0) * 2.3;
    this.embers.rotation.y = elapsed * 0.014;
    this.embers.position.y = Math.sin(elapsed * 0.4) * 0.07;
    this.stars.position.x = Math.sin(elapsed * 0.03) * 0.6;

    this.fogPatches.forEach(({ patch, phase }, i) => {
      patch.position.x += Math.sin(elapsed * 0.18 + phase) * 0.003;
      patch.position.z = (i % 2 === 0 ? -1 : 1) * (1.1 + Math.sin(elapsed * 0.5 + phase) * 1.35);
      patch.material.opacity = 0.04 + Math.sin(elapsed * 0.7 + phase) * 0.012;
    });
  }

  dispose() {
    this.disposables.forEach((item) => item.dispose?.());
  }
}
