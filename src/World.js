import * as THREE from "three";

export class World {
  constructor(scene) {
    this.scene = scene;
    this.flames = [];
    this.disposables = [];
    this.createMaterials();
    this.createLights();
    this.createGround();
    this.createManor();
    this.createGateAndFence();
    this.createLeftForest();
    this.createAtmosphere();
  }

  createMaterials() {
    this.materials = {
      stone: new THREE.MeshStandardMaterial({ color: 0x3b3a40, roughness: 0.9, metalness: 0.02 }),
      stoneDark: new THREE.MeshStandardMaterial({ color: 0x242329, roughness: 0.95 }),
      trim: new THREE.MeshStandardMaterial({ color: 0x555158, roughness: 0.82 }),
      roof: new THREE.MeshStandardMaterial({ color: 0x101116, roughness: 0.72, metalness: 0.1 }),
      iron: new THREE.MeshStandardMaterial({ color: 0x101115, roughness: 0.46, metalness: 0.76 }),
      window: new THREE.MeshStandardMaterial({ color: 0xff7a2f, emissive: 0xff2f05, emissiveIntensity: 4.2, roughness: 0.26 }),
      wood: new THREE.MeshStandardMaterial({ color: 0x171315, roughness: 0.95 }),
      earth: new THREE.MeshStandardMaterial({ color: 0x181719, roughness: 1 }),
      ember: new THREE.MeshBasicMaterial({ color: 0xff5318 }),
    };
    this.disposables.push(...Object.values(this.materials));
  }

  createLights() {
    this.scene.add(new THREE.HemisphereLight(0x7182a5, 0x130d0d, 1.45));

    const moon = new THREE.DirectionalLight(0xa8c2f0, 3.2);
    moon.position.set(-18, 25, 13);
    moon.castShadow = true;
    moon.shadow.mapSize.set(2048, 2048);
    moon.shadow.camera.left = -37;
    moon.shadow.camera.right = 37;
    moon.shadow.camera.top = 24;
    moon.shadow.camera.bottom = -21;
    moon.shadow.camera.near = 1;
    moon.shadow.camera.far = 90;
    moon.shadow.bias = -0.00035;
    this.scene.add(moon);

    this.hellGlow = new THREE.PointLight(0xff4410, 39, 30, 1.8);
    this.hellGlow.position.set(17, 4.2, 0);
    this.scene.add(this.hellGlow);
  }

  createGround() {
    const geometry = new THREE.PlaneGeometry(80, 26, 64, 18);
    geometry.rotateX(-Math.PI / 2);
    const p = geometry.attributes.position;
    for (let i = 0; i < p.count; i += 1) {
      const x = p.getX(i);
      const z = p.getZ(i);
      const openFieldMask = THREE.MathUtils.smoothstep(x, -22, -10);
      const lift = (
        Math.sin(x * 0.21) * 0.07 +
        Math.cos(z * 0.66) * 0.045 +
        Math.sin((x + z) * 0.15) * 0.035
      ) * (0.45 + openFieldMask * 0.55);
      p.setY(i, lift);
    }
    geometry.computeVertexNormals();
    const ground = new THREE.Mesh(geometry, this.materials.earth);
    ground.position.y = -0.05;
    ground.receiveShadow = true;
    this.scene.add(ground);
    this.disposables.push(geometry);

    // Sparse stones only at the extreme edges so the central grab space remains clear.
    const rockGeo = new THREE.DodecahedronGeometry(0.45, 0);
    this.disposables.push(rockGeo);
    for (let i = 0; i < 18; i += 1) {
      const rock = new THREE.Mesh(rockGeo, this.materials.stoneDark);
      const onLeft = Math.random() < 0.72;
      rock.position.set(
        onLeft ? THREE.MathUtils.randFloat(-31, -22.5) : THREE.MathUtils.randFloat(19.5, 28),
        THREE.MathUtils.randFloat(0.1, 0.25),
        THREE.MathUtils.randFloat(-10.5, 10.5)
      );
      rock.scale.set(
        THREE.MathUtils.randFloat(0.4, 1.4),
        THREE.MathUtils.randFloat(0.3, 0.8),
        THREE.MathUtils.randFloat(0.5, 1.5)
      );
      rock.rotation.set(Math.random(), Math.random(), Math.random());
      rock.castShadow = true;
      this.scene.add(rock);
    }
  }

  addBox(parent, size, position, material, rotation = null) {
    const geometry = new THREE.BoxGeometry(...size);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    if (rotation) mesh.rotation.set(...rotation);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    this.disposables.push(geometry);
    return mesh;
  }

  addCylinder(parent, radiusTop, radiusBottom, height, segments, position, material) {
    const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    this.disposables.push(geometry);
    return mesh;
  }

  createGothicWindow(parent, x, y, z, width = 0.72, height = 1.25) {
    const frame = new THREE.Group();
    frame.position.set(x, y, z);
    parent.add(frame);

    this.addBox(frame, [width + 0.18, height + 0.18, 0.13], [0, 0, 0], this.materials.trim);
    this.addBox(frame, [width, height, 0.16], [0, 0, -0.08], this.materials.window);
    this.addBox(frame, [0.07, height + 0.02, 0.19], [0, 0, -0.18], this.materials.iron);
    this.addBox(frame, [width + 0.02, 0.07, 0.19], [0, 0, -0.18], this.materials.iron);

    const archGeo = new THREE.ConeGeometry(width * 0.62, height * 0.48, 3);
    const arch = new THREE.Mesh(archGeo, this.materials.trim);
    arch.position.set(0, height * 0.62, 0);
    arch.rotation.z = Math.PI;
    arch.rotation.y = Math.PI / 2;
    arch.scale.z = 0.2;
    arch.castShadow = true;
    frame.add(arch);
    this.disposables.push(archGeo);
  }

  createManor() {
    const manor = new THREE.Group();
    manor.position.set(17.6, 0, 0);
    this.scene.add(manor);
    this.manor = manor;

    // Main two-storey block and symmetrical towers.
    this.addBox(manor, [9.2, 5.7, 5.9], [0, 2.85, 0], this.materials.stone);
    this.addBox(manor, [3.2, 7.6, 5.0], [-5.55, 3.8, 0], this.materials.stoneDark);
    this.addBox(manor, [3.2, 7.6, 5.0], [5.55, 3.8, 0], this.materials.stoneDark);

    // Layered facade makes it read as architecture rather than boxes.
    this.addBox(manor, [9.8, 0.35, 6.25], [0, 0.25, 0], this.materials.trim);
    this.addBox(manor, [9.7, 0.24, 6.15], [0, 5.25, 0], this.materials.trim);
    this.addBox(manor, [3.55, 0.28, 5.35], [-5.55, 6.8, 0], this.materials.trim);
    this.addBox(manor, [3.55, 0.28, 5.35], [5.55, 6.8, 0], this.materials.trim);

    // Central entrance projection and pointed pediment.
    this.addBox(manor, [2.9, 4.4, 1.1], [0, 2.2, -3.25], this.materials.stoneDark);
    this.addBox(manor, [1.65, 2.85, 0.24], [0, 1.42, -3.9], this.materials.iron);
    this.addBox(manor, [2.3, 0.32, 0.5], [0, 3.05, -3.82], this.materials.trim);
    const pedimentGeo = new THREE.ConeGeometry(2.15, 1.75, 3);
    const pediment = new THREE.Mesh(pedimentGeo, this.materials.stoneDark);
    pediment.position.set(0, 5.05, -3.34);
    pediment.rotation.set(0, Math.PI / 2, Math.PI);
    pediment.scale.z = 0.38;
    pediment.castShadow = true;
    manor.add(pediment);
    this.disposables.push(pedimentGeo);

    // Roofs.
    const makeRoof = (radius, height, y, x, zScale) => {
      const geometry = new THREE.ConeGeometry(radius, height, 4);
      geometry.rotateY(Math.PI / 4);
      const roof = new THREE.Mesh(geometry, this.materials.roof);
      roof.position.set(x, y, 0);
      roof.scale.z = zScale;
      roof.castShadow = true;
      manor.add(roof);
      this.disposables.push(geometry);
    };
    makeRoof(6.65, 2.8, 7.0, 0, 0.64);
    makeRoof(2.85, 3.35, 9.45, -5.55, 0.9);
    makeRoof(2.85, 3.35, 9.45, 5.55, 0.9);

    // Chimneys and tower finials.
    [-2.5, 2.5].forEach((x) => {
      this.addBox(manor, [0.65, 2.2, 0.75], [x, 8.0, 0.75], this.materials.stoneDark);
      this.addBox(manor, [0.82, 0.22, 0.9], [x, 9.08, 0.75], this.materials.trim);
    });
    [-5.55, 5.55].forEach((x) => {
      const spikeGeo = new THREE.ConeGeometry(0.19, 1.3, 6);
      const spike = new THREE.Mesh(spikeGeo, this.materials.iron);
      spike.position.set(x, 11.52, 0);
      spike.castShadow = true;
      manor.add(spike);
      this.disposables.push(spikeGeo);
    });

    // Repeating windows keep the manor symmetrical and readable.
    [-3.15, -1.05, 1.05, 3.15].forEach((x) => {
      this.createGothicWindow(manor, x, 2.0, -3.02, 0.64, 1.12);
      this.createGothicWindow(manor, x, 4.15, -3.02, 0.64, 1.12);
    });
    [-5.55, 5.55].forEach((x) => {
      this.createGothicWindow(manor, x, 2.25, -2.58, 0.68, 1.22);
      this.createGothicWindow(manor, x, 4.65, -2.58, 0.68, 1.22);
      this.createGothicWindow(manor, x, 6.55, -2.58, 0.56, 0.94);
    });

    // Buttresses on the front corners.
    [-4.45, 4.45, -7.0, 7.0].forEach((x) => {
      const buttress = this.addBox(manor, [0.52, 4.5, 0.75], [x, 2.25, -3.0], this.materials.trim);
      buttress.rotation.z = x < 0 ? -0.035 : 0.035;
    });

    // Warm pools of light sell the focal point without cluttering the battlefield.
    const facadeLight = new THREE.PointLight(0xff5b19, 24, 18, 1.9);
    facadeLight.position.set(17.5, 3.7, -4.2);
    this.scene.add(facadeLight);

    this.createBraziers();
  }

  createGateAndFence() {
    const gate = new THREE.Group();
    gate.position.set(11.35, 0, 0);
    this.scene.add(gate);

    [-4.25, 4.25].forEach((z) => {
      this.addBox(gate, [0.92, 4.7, 0.92], [0, 2.35, z], this.materials.stoneDark);
      this.addBox(gate, [1.15, 0.28, 1.15], [0, 4.72, z], this.materials.trim);
      const capGeo = new THREE.ConeGeometry(0.36, 0.95, 4);
      const cap = new THREE.Mesh(capGeo, this.materials.iron);
      cap.position.set(0, 5.32, z);
      cap.castShadow = true;
      gate.add(cap);
      this.disposables.push(capGeo);
    });

    const barGeo = new THREE.BoxGeometry(0.13, 3.55, 0.13);
    const railGeo = new THREE.BoxGeometry(0.18, 0.18, 7.4);
    this.disposables.push(barGeo, railGeo);
    for (let z = -3.55; z <= 3.55; z += 0.46) {
      const bar = new THREE.Mesh(barGeo, this.materials.iron);
      bar.position.set(0, 1.78, z);
      bar.castShadow = true;
      gate.add(bar);
      const pointGeo = new THREE.ConeGeometry(0.09, 0.52, 4);
      const point = new THREE.Mesh(pointGeo, this.materials.iron);
      point.position.set(0, 3.78, z);
      point.castShadow = true;
      gate.add(point);
      this.disposables.push(pointGeo);
    }
    [0.55, 1.75, 2.9].forEach((y) => {
      const rail = new THREE.Mesh(railGeo, this.materials.iron);
      rail.position.set(0, y, 0);
      gate.add(rail);
    });

    // Fence sections stay close to the manor, leaving the main approach completely open.
    [-1, 1].forEach((side) => {
      const fence = new THREE.Group();
      fence.position.set(12.0, 0, side * 7.9);
      this.scene.add(fence);
      for (let i = 0; i < 10; i += 1) {
        const bar = new THREE.Mesh(barGeo, this.materials.iron);
        bar.position.set(i * 0.72, 1.45, 0);
        bar.castShadow = true;
        fence.add(bar);
      }
      const sideRailGeo = new THREE.BoxGeometry(6.7, 0.16, 0.16);
      this.disposables.push(sideRailGeo);
      [0.55, 1.65, 2.75].forEach((y) => {
        const rail = new THREE.Mesh(sideRailGeo, this.materials.iron);
        rail.position.set(3.25, y, 0);
        fence.add(rail);
      });
    });
  }

  createBraziers() {
    [-5.0, 5.0].forEach((z) => {
      const stand = this.addCylinder(this.scene, 0.28, 0.48, 1.45, 10, [12.0, 0.72, z], this.materials.iron);
      stand.castShadow = true;
      const bowlGeo = new THREE.CylinderGeometry(0.58, 0.3, 0.32, 12);
      const bowl = new THREE.Mesh(bowlGeo, this.materials.iron);
      bowl.position.set(12.0, 1.52, z);
      bowl.castShadow = true;
      this.scene.add(bowl);
      this.disposables.push(bowlGeo);

      const flameGeo = new THREE.ConeGeometry(0.34, 1.0, 9);
      const flame = new THREE.Mesh(flameGeo, this.materials.ember);
      flame.position.set(12.0, 2.12, z);
      this.scene.add(flame);
      const light = new THREE.PointLight(0xff4b11, 15, 11, 2);
      light.position.copy(flame.position);
      this.scene.add(light);
      this.flames.push({ flame, light, phase: Math.random() * Math.PI * 2 });
      this.disposables.push(flameGeo);
    });
  }

  createLeftForest() {
    const forest = new THREE.Group();
    this.scene.add(forest);
    this.forest = forest;

    const createTree = (x, z, scale, rotationY) => {
      const tree = new THREE.Group();
      tree.position.set(x, 0, z);
      tree.rotation.y = rotationY;
      tree.scale.setScalar(scale);
      forest.add(tree);

      const trunkGeo = new THREE.CylinderGeometry(0.14, 0.52, 8.2, 7);
      const trunk = new THREE.Mesh(trunkGeo, this.materials.wood);
      trunk.position.y = 4.1;
      trunk.rotation.z = THREE.MathUtils.randFloatSpread(0.12);
      trunk.castShadow = true;
      tree.add(trunk);
      this.disposables.push(trunkGeo);

      const branchData = [
        [5.0, 2.9, 0.88], [5.8, 2.5, -0.92], [6.55, 2.1, 0.72], [7.1, 1.75, -0.66]
      ];
      branchData.forEach(([y, length, angle], index) => {
        const branchGeo = new THREE.CylinderGeometry(0.055, 0.18 - index * 0.018, length, 6);
        const branch = new THREE.Mesh(branchGeo, this.materials.wood);
        branch.position.set(0, y, 0);
        branch.rotation.z = angle;
        branch.rotation.y = index * 1.31 + rotationY;
        branch.castShadow = true;
        tree.add(branch);
        this.disposables.push(branchGeo);

        // Small fork gives a more convincing silhouette.
        const forkGeo = new THREE.CylinderGeometry(0.035, 0.09, length * 0.55, 5);
        const fork = new THREE.Mesh(forkGeo, this.materials.wood);
        fork.position.set(Math.sin(angle) * length * 0.32, y + Math.cos(angle) * length * 0.34, 0);
        fork.rotation.z = angle + (index % 2 ? -0.62 : 0.62);
        fork.rotation.y = branch.rotation.y + 0.7;
        fork.castShadow = true;
        tree.add(fork);
        this.disposables.push(forkGeo);
      });
    };

    // All trees are confined to x <= -18.5. The central 30+ units remain clear.
    for (let i = 0; i < 38; i += 1) {
      createTree(
        THREE.MathUtils.randFloat(-34, -19.2),
        THREE.MathUtils.randFloat(-11.5, 11.5),
        THREE.MathUtils.randFloat(0.72, 1.5),
        Math.random() * Math.PI
      );
    }

    // Dark wall of trunks at the very back creates depth without occupying the playfield.
    for (let i = 0; i < 15; i += 1) {
      createTree(
        THREE.MathUtils.randFloat(-38, -31),
        THREE.MathUtils.randFloat(-12, 12),
        THREE.MathUtils.randFloat(1.1, 1.75),
        Math.random() * Math.PI
      );
    }
  }

  createAtmosphere() {
    const emberGeo = new THREE.BufferGeometry();
    const count = 150;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = THREE.MathUtils.randFloat(7, 24);
      positions[i * 3 + 1] = THREE.MathUtils.randFloat(0.35, 11);
      positions[i * 3 + 2] = THREE.MathUtils.randFloat(-8, 8);
    }
    emberGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const emberMat = new THREE.PointsMaterial({
      color: 0xff5a18,
      size: 0.06,
      transparent: true,
      opacity: 0.68,
      depthWrite: false,
    });
    this.embers = new THREE.Points(emberGeo, emberMat);
    this.scene.add(this.embers);
    this.disposables.push(emberGeo, emberMat);

    const moonGeo = new THREE.SphereGeometry(3.2, 24, 18);
    const moonMat = new THREE.MeshBasicMaterial({ color: 0x9baac4, fog: false });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.set(-25, 20, -38);
    this.scene.add(moon);
    this.disposables.push(moonGeo, moonMat);
  }

  update(elapsed) {
    this.flames.forEach(({ flame, light, phase }) => {
      const pulse = 0.9 + Math.sin(elapsed * 8 + phase) * 0.12 + Math.sin(elapsed * 15 + phase) * 0.05;
      flame.scale.set(0.8 / pulse, 1.15 * pulse, 0.8 / pulse);
      flame.rotation.y = elapsed * 2.4 + phase;
      light.intensity = 13 + pulse * 3.2;
    });
    this.hellGlow.intensity = 37 + Math.sin(elapsed * 2.6) * 3;
    this.embers.rotation.y = elapsed * 0.012;
    this.embers.position.y = Math.sin(elapsed * 0.5) * 0.1;
  }

  dispose() {
    this.disposables.forEach((item) => item.dispose?.());
  }
}
