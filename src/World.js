import * as THREE from "three";

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
    this.createEstateFence();
    this.createForest();
    this.createAtmosphere();
  }

  createMaterials() {
    this.materials = {
      stone: new THREE.MeshStandardMaterial({ color: 0x3b3940, roughness: 0.92, metalness: 0.02 }),
      stoneDark: new THREE.MeshStandardMaterial({ color: 0x24232a, roughness: 0.96 }),
      trim: new THREE.MeshStandardMaterial({ color: 0x5d5862, roughness: 0.84, metalness: 0.06 }),
      roof: new THREE.MeshStandardMaterial({ color: 0x0f1116, roughness: 0.76, metalness: 0.08 }),
      iron: new THREE.MeshStandardMaterial({ color: 0x0e1014, roughness: 0.45, metalness: 0.82 }),
      window: new THREE.MeshStandardMaterial({ color: 0xff8e3b, emissive: 0xff3b08, emissiveIntensity: 3.8, roughness: 0.3 }),
      earth: new THREE.MeshStandardMaterial({ color: 0x16171b, roughness: 1.0 }),
      path: new THREE.MeshStandardMaterial({ color: 0x101014, roughness: 1.0 }),
      ember: new THREE.MeshBasicMaterial({ color: 0xff5b18 }),
      moon: new THREE.MeshBasicMaterial({ color: 0xcfd6e3 }),
      mist: new THREE.MeshBasicMaterial({ color: 0x7f8db2, transparent: true, opacity: 0.06, depthWrite: false }),
    };
    this.disposables.push(...Object.values(this.materials));
  }

  createLights() {
    this.scene.add(new THREE.HemisphereLight(0x7483a3, 0x100b0b, 1.55));

    const moon = new THREE.DirectionalLight(0xa5bff1, 3.2);
    moon.position.set(-18, 23, 10);
    moon.castShadow = true;
    moon.shadow.mapSize.set(2048, 2048);
    moon.shadow.camera.left = -35;
    moon.shadow.camera.right = 35;
    moon.shadow.camera.top = 24;
    moon.shadow.camera.bottom = -20;
    moon.shadow.camera.near = 1;
    moon.shadow.camera.far = 90;
    moon.shadow.bias = -0.0004;
    this.scene.add(moon);

    this.hellGlow = new THREE.PointLight(0xff4d10, 34, 22, 1.7);
    this.hellGlow.position.set(15.6, 4.4, 0);
    this.scene.add(this.hellGlow);
  }

  addBox(parent, size, pos, mat, rot = null) {
    const geo = new THREE.BoxGeometry(...size);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    if (rot) mesh.rotation.set(...rot);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    this.disposables.push(geo);
    return mesh;
  }

  addCylinder(parent, r1, r2, h, seg, pos, mat, rot = null) {
    const geo = new THREE.CylinderGeometry(r1, r2, h, seg);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    if (rot) mesh.rotation.set(...rot);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    this.disposables.push(geo);
    return mesh;
  }

  createSkyObjects() {
    const moonGeo = new THREE.CircleGeometry(1.45, 32);
    const moon = new THREE.Mesh(moonGeo, this.materials.moon);
    moon.position.set(-14, 16.5, -18);
    this.scene.add(moon);
    this.disposables.push(moonGeo);

    const starGeo = new THREE.BufferGeometry();
    const count = 160;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = THREE.MathUtils.randFloat(-20, 20);
      positions[i * 3 + 1] = THREE.MathUtils.randFloat(7, 18);
      positions[i * 3 + 2] = -19;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xaab7d6, size: 0.04, transparent: true, opacity: 0.8, depthWrite: false });
    this.stars = new THREE.Points(starGeo, starMat);
    this.scene.add(this.stars);
    this.disposables.push(starGeo, starMat);
  }

  createGround() {
    const groundGeo = new THREE.PlaneGeometry(80, 28, 68, 22);
    groundGeo.rotateX(-Math.PI / 2);
    const pos = groundGeo.attributes.position;
    for (let i = 0; i < pos.count; i += 1) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      let y = Math.sin(x * 0.18) * 0.06 + Math.cos(z * 0.5) * 0.05 + Math.sin((x + z) * 0.12) * 0.04;
      // keep central killing ground flatter
      const clearMask = 1 - THREE.MathUtils.smoothstep(Math.abs(x + 1), 6, 18);
      y *= 1 - clearMask * 0.55;
      pos.setY(i, y);
    }
    groundGeo.computeVertexNormals();
    const ground = new THREE.Mesh(groundGeo, this.materials.earth);
    ground.position.y = -0.05;
    ground.receiveShadow = true;
    this.scene.add(ground);
    this.disposables.push(groundGeo);

    const pathGeo = new THREE.PlaneGeometry(46, 13.5, 20, 6);
    pathGeo.rotateX(-Math.PI / 2);
    const path = new THREE.Mesh(pathGeo, this.materials.path);
    path.position.set(-1.2, 0.02, 0);
    path.receiveShadow = true;
    this.scene.add(path);
    this.disposables.push(pathGeo);

    const rockGeo = new THREE.DodecahedronGeometry(0.45, 0);
    this.disposables.push(rockGeo);
    for (let i = 0; i < 16; i += 1) {
      const rock = new THREE.Mesh(rockGeo, this.materials.stoneDark);
      const left = Math.random() < 0.8;
      rock.position.set(
        left ? THREE.MathUtils.randFloat(-30, -19) : THREE.MathUtils.randFloat(19, 27),
        THREE.MathUtils.randFloat(0.08, 0.22),
        THREE.MathUtils.randFloat(-11, 11)
      );
      rock.scale.set(THREE.MathUtils.randFloat(0.5, 1.5), THREE.MathUtils.randFloat(0.3, 0.9), THREE.MathUtils.randFloat(0.5, 1.6));
      rock.rotation.set(Math.random(), Math.random(), Math.random());
      rock.castShadow = true;
      this.scene.add(rock);
    }

    const tuftGeo = new THREE.ConeGeometry(0.09, 0.5, 4);
    this.disposables.push(tuftGeo);
    for (let i = 0; i < 110; i += 1) {
      const x = Math.random() < 0.75 ? THREE.MathUtils.randFloat(-32, -18) : THREE.MathUtils.randFloat(18, 29);
      const z = THREE.MathUtils.randFloat(-12, 12);
      const tuft = new THREE.Mesh(tuftGeo, this.materials.stoneDark);
      tuft.position.set(x, 0.2, z);
      tuft.scale.set(THREE.MathUtils.randFloat(0.5, 1.2), THREE.MathUtils.randFloat(0.4, 1.1), THREE.MathUtils.randFloat(0.4, 1));
      tuft.rotation.set(0, Math.random() * Math.PI, THREE.MathUtils.randFloatSpread(0.2));
      this.scene.add(tuft);
    }
  }

  createGothicWindow(parent, x, y, z, w = 0.72, h = 1.28) {
    const frame = new THREE.Group();
    frame.position.set(x, y, z);
    parent.add(frame);

    this.addBox(frame, [w + 0.16, h + 0.18, 0.12], [0, 0, 0], this.materials.trim);
    this.addBox(frame, [w, h, 0.14], [0, 0, -0.01], this.materials.window);
    this.addBox(frame, [0.06, h + 0.02, 0.16], [0, 0, 0.01], this.materials.iron);
    this.addBox(frame, [w + 0.02, 0.05, 0.16], [0, 0, 0.01], this.materials.iron);

    const archGeo = new THREE.CylinderGeometry(w * 0.52, w * 0.52, 0.12, 10, 1, false, 0, Math.PI);
    archGeo.rotateZ(Math.PI * 0.5);
    const arch = new THREE.Mesh(archGeo, this.materials.trim);
    arch.position.set(0, h * 0.54, 0);
    arch.castShadow = true;
    arch.receiveShadow = true;
    frame.add(arch);
    this.disposables.push(archGeo);
  }

  createRoof(parent, width, depth, height, x, y) {
    const geo = new THREE.ConeGeometry(Math.max(width, depth) * 0.75, height, 4);
    geo.rotateY(Math.PI / 4);
    const roof = new THREE.Mesh(geo, this.materials.roof);
    roof.position.set(x, y, 0);
    roof.scale.set(width / (Math.max(width, depth) * 1.5), 1, depth / (Math.max(width, depth) * 1.5));
    roof.castShadow = true;
    parent.add(roof);
    this.disposables.push(geo);
  }

  createManor() {
    const manor = new THREE.Group();
    manor.position.set(17.1, 0, 0);
    this.scene.add(manor);
    this.manor = manor;

    // base volumes
    this.addBox(manor, [8.2, 5.6, 4.9], [0, 2.8, 0], this.materials.stone);
    this.addBox(manor, [2.9, 7.6, 4.6], [-5.6, 3.8, 0], this.materials.stoneDark);
    this.addBox(manor, [2.9, 7.6, 4.6], [5.6, 3.8, 0], this.materials.stoneDark);
    this.addBox(manor, [2.1, 4.1, 3.8], [-8.25, 2.05, 0], this.materials.stoneDark);
    this.addBox(manor, [2.1, 4.1, 3.8], [8.25, 2.05, 0], this.materials.stoneDark);

    // buttresses / pillars
    [-3.8, -1.2, 1.2, 3.8].forEach((x) => {
      this.addBox(manor, [0.36, 5.3, 0.42], [x, 2.65, -2.28], this.materials.trim);
    });
    [-6.4, -4.8, 4.8, 6.4].forEach((x) => {
      this.addBox(manor, [0.34, 6.5, 0.42], [x, 3.25, -2.1], this.materials.trim);
    });

    // cornice bands
    this.addBox(manor, [8.6, 0.26, 5.1], [0, 5.46, 0], this.materials.trim);
    this.addBox(manor, [3.2, 0.24, 4.8], [-5.6, 7.3, 0], this.materials.trim);
    this.addBox(manor, [3.2, 0.24, 4.8], [5.6, 7.3, 0], this.materials.trim);
    this.addBox(manor, [2.3, 0.2, 3.9], [-8.25, 4.02, 0], this.materials.trim);
    this.addBox(manor, [2.3, 0.2, 3.9], [8.25, 4.02, 0], this.materials.trim);

    // entrance
    this.addBox(manor, [2.3, 3.4, 0.7], [0, 1.7, -2.55], this.materials.stoneDark);
    this.addBox(manor, [2.55, 3.7, 0.16], [0, 1.82, -2.94], this.materials.trim);
    this.addBox(manor, [1.7, 2.7, 0.2], [0, 1.35, -2.99], this.materials.iron);
    this.addBox(manor, [3.15, 0.32, 0.6], [0, 3.52, -2.75], this.materials.trim);
    this.addBox(manor, [3.7, 0.24, 1.0], [0, 0.22, -3.1], this.materials.stoneDark);
    this.addBox(manor, [2.8, 0.18, 0.85], [0, 0.38, -2.95], this.materials.trim);

    // roofs
    this.createRoof(manor, 8.6, 5.5, 2.2, 0, 6.7);
    this.createRoof(manor, 3.5, 5, 3.1, -5.6, 8.95);
    this.createRoof(manor, 3.5, 5, 3.1, 5.6, 8.95);
    this.createRoof(manor, 2.5, 4.0, 2.1, -8.25, 5.5);
    this.createRoof(manor, 2.5, 4.0, 2.1, 8.25, 5.5);

    // chimneys
    this.addBox(manor, [0.6, 2.2, 0.6], [-2.5, 8.25, -0.4], this.materials.trim);
    this.addBox(manor, [0.6, 2.2, 0.6], [2.7, 8.6, 0.6], this.materials.trim);
    this.addBox(manor, [0.72, 0.14, 0.72], [-2.5, 9.25, -0.4], this.materials.trim);
    this.addBox(manor, [0.72, 0.14, 0.72], [2.7, 9.6, 0.6], this.materials.trim);

    // windows
    const frontWindows = [
      [-2.4, 2.0], [2.4, 2.0],
      [-2.4, 4.25], [2.4, 4.25],
      [-5.6, 2.4], [-5.6, 5.1], [5.6, 2.4], [5.6, 5.1],
      [-8.25, 1.9], [8.25, 1.9],
    ];
    frontWindows.forEach(([x, y]) => this.createGothicWindow(manor, x, y, -2.52, x === -8.25 || x === 8.25 ? 0.58 : 0.68, x === -8.25 || x === 8.25 ? 1.1 : 1.22));

    // side slit windows on towers
    [-5.6, 5.6].forEach((x) => {
      this.createGothicWindow(manor, x - 1.05, 3.2, -0.4, 0.28, 0.9);
      this.createGothicWindow(manor, x + 1.05, 4.8, 0.4, 0.28, 0.9);
    });

    // braziers
    this.createBrazier(11.9, -3.8);
    this.createBrazier(11.9, 3.8);
  }

  createBrazier(x, z) {
    const stand = new THREE.Group();
    stand.position.set(x, 0, z);
    this.scene.add(stand);

    this.addCylinder(stand, 0.28, 0.4, 1.35, 10, [0, 0.68, 0], this.materials.iron);
    this.addCylinder(stand, 0.32, 0.22, 0.28, 10, [0, 1.45, 0], this.materials.iron);

    const flameGeo = new THREE.ConeGeometry(0.26, 0.65, 6);
    const flame = new THREE.Mesh(flameGeo, this.materials.ember);
    flame.position.set(0, 1.78, 0);
    flame.castShadow = false;
    stand.add(flame);
    this.disposables.push(flameGeo);

    const light = new THREE.PointLight(0xff5816, 11, 8, 2);
    light.position.set(0, 1.65, 0);
    stand.add(light);

    this.flames.push({ flame, light, phase: Math.random() * Math.PI * 2 });
  }

  createEstateFence() {
    const fence = new THREE.Group();
    this.scene.add(fence);

    const postGeo = new THREE.BoxGeometry(0.12, 1.35, 0.12);
    const railGeo = new THREE.BoxGeometry(0.08, 0.08, 2.1);
    const spikeGeo = new THREE.ConeGeometry(0.08, 0.26, 4);
    this.disposables.push(postGeo, railGeo, spikeGeo);

    const makeSection = (x, z, len, rot = 0) => {
      const group = new THREE.Group();
      group.position.set(x, 0, z);
      group.rotation.y = rot;
      fence.add(group);

      for (let i = 0; i < len; i += 1) {
        const post = new THREE.Mesh(postGeo, this.materials.iron);
        post.position.set(0, 0.72, -i * 0.42);
        post.castShadow = true;
        group.add(post);

        const spike = new THREE.Mesh(spikeGeo, this.materials.iron);
        spike.position.set(0, 1.53, -i * 0.42);
        spike.castShadow = true;
        group.add(spike);
      }

      [0.55, 1.02].forEach((y) => {
        const rail = new THREE.Mesh(railGeo, this.materials.iron);
        rail.position.set(0, y, -((len - 1) * 0.42) * 0.5);
        rail.scale.z = len * 0.42 / 2.1;
        group.add(rail);
      });
    };

    makeSection(13.7, -4.8, 7);
    makeSection(13.7, 4.8, 7);
    makeSection(20.8, -6.1, 6, Math.PI / 2);
    makeSection(20.8, 6.1, 6, Math.PI / 2);
  }

  createForest() {
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x101116, roughness: 1 });
    this.disposables.push(trunkMat);

    const trunkGeo = new THREE.CylinderGeometry(0.16, 0.34, 9, 6);
    const branchGeo = new THREE.CylinderGeometry(0.04, 0.09, 2.6, 5);
    this.disposables.push(trunkGeo, branchGeo);

    const placeTree = (x, z, h = 1) => {
      const tree = new THREE.Group();
      tree.position.set(x, 0, z);
      tree.scale.setScalar(h);
      this.scene.add(tree);

      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 4.5;
      trunk.rotation.z = THREE.MathUtils.randFloatSpread(0.1);
      trunk.castShadow = true;
      tree.add(trunk);

      const branches = 2 + Math.floor(Math.random() * 4);
      for (let i = 0; i < branches; i += 1) {
        const b = new THREE.Mesh(branchGeo, trunkMat);
        b.position.set(0, THREE.MathUtils.randFloat(4.3, 7.6), 0);
        b.rotation.z = THREE.MathUtils.randFloat(0.75, 1.2) * (Math.random() > 0.5 ? 1 : -1);
        b.rotation.y = Math.random() * Math.PI;
        b.castShadow = true;
        tree.add(b);
      }
    };

    for (let i = 0; i < 34; i += 1) {
      placeTree(THREE.MathUtils.randFloat(-31.5, -17.5), THREE.MathUtils.randFloat(-12.5, 12.5), THREE.MathUtils.randFloat(0.8, 1.45));
    }
  }

  createAtmosphere() {
    // glowing embers near the manor
    const emberGeo = new THREE.BufferGeometry();
    const emberCount = 140;
    const pos = new Float32Array(emberCount * 3);
    for (let i = 0; i < emberCount; i += 1) {
      pos[i * 3] = THREE.MathUtils.randFloat(7.5, 20.5);
      pos[i * 3 + 1] = THREE.MathUtils.randFloat(0.25, 10);
      pos[i * 3 + 2] = THREE.MathUtils.randFloat(-8, 8);
    }
    emberGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const emberMat = new THREE.PointsMaterial({ color: 0xff5b18, size: 0.06, transparent: true, opacity: 0.7, depthWrite: false });
    this.embers = new THREE.Points(emberGeo, emberMat);
    this.scene.add(this.embers);
    this.disposables.push(emberGeo, emberMat);

    // low ground mist across open field
    const fogGeo = new THREE.PlaneGeometry(8, 3.2, 1, 1);
    this.disposables.push(fogGeo);
    for (let i = 0; i < 5; i += 1) {
      const patch = new THREE.Mesh(fogGeo, this.materials.mist);
      patch.rotation.x = -Math.PI / 2;
      patch.position.set(-10 + i * 5.2, 0.08, (i % 2 === 0 ? -1 : 1) * 1.8);
      this.scene.add(patch);
      this.fogPatches.push({ patch, phase: i * 0.9 });
    }
  }

  update(elapsed) {
    this.flames.forEach(({ flame, light, phase }) => {
      const pulse = 0.88 + Math.sin(elapsed * 7.8 + phase) * 0.12 + Math.sin(elapsed * 15 + phase) * 0.05;
      flame.scale.set(0.9 / pulse, 1.25 * pulse, 0.9 / pulse);
      light.intensity = 9.5 + pulse * 2.5;
    });

    this.hellGlow.intensity = 33 + Math.sin(elapsed * 2.1) * 2.2;
    this.embers.rotation.y = elapsed * 0.015;
    this.embers.position.y = Math.sin(elapsed * 0.4) * 0.08;
    this.stars.position.x = Math.sin(elapsed * 0.03) * 0.6;

    this.fogPatches.forEach(({ patch, phase }, i) => {
      patch.position.x += Math.sin(elapsed * 0.18 + phase) * 0.003;
      patch.position.z = (i % 2 === 0 ? -1 : 1) * (1.2 + Math.sin(elapsed * 0.5 + phase) * 1.3);
      patch.material.opacity = 0.045 + Math.sin(elapsed * 0.7 + phase) * 0.012;
    });
  }

  dispose() {
    this.disposables.forEach((item) => item.dispose?.());
  }
}
