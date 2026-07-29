import * as THREE from "three";

export class World {
  constructor(scene) {
    this.scene = scene;
    this.flames = [];
    this.disposables = [];

    this.createLights();
    this.createGround();
    this.createManor();
    this.createForest();
    this.createAtmosphere();
  }

  createLights() {
    const ambient = new THREE.HemisphereLight(0x657089, 0x140e0c, 1.35);
    this.scene.add(ambient);

    const moon = new THREE.DirectionalLight(0x9eb8e8, 3.1);
    moon.position.set(-16, 24, 14);
    moon.castShadow = true;
    moon.shadow.mapSize.set(2048, 2048);
    moon.shadow.camera.left = -35;
    moon.shadow.camera.right = 35;
    moon.shadow.camera.top = 24;
    moon.shadow.camera.bottom = -20;
    moon.shadow.camera.near = 1;
    moon.shadow.camera.far = 80;
    moon.shadow.bias = -0.0004;
    this.scene.add(moon);

    const hellGlow = new THREE.PointLight(0xff4b12, 34, 27, 1.8);
    hellGlow.position.set(17, 3.6, 1);
    this.scene.add(hellGlow);
    this.hellGlow = hellGlow;
  }

  createGround() {
    const geometry = new THREE.PlaneGeometry(76, 25, 48, 16);
    geometry.rotateX(-Math.PI / 2);

    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i += 1) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      const lift =
        Math.sin(x * 0.23) * 0.08 +
        Math.cos(z * 0.7) * 0.06 +
        Math.sin((x + z) * 0.17) * 0.04;
      positions.setY(i, lift);
    }
    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
      color: 0x171719,
      roughness: 0.96,
      metalness: 0.02,
    });

    const ground = new THREE.Mesh(geometry, material);
    ground.position.set(0, -0.05, 0);
    ground.receiveShadow = true;
    this.scene.add(ground);
    this.disposables.push(geometry, material);
  }

  createManor() {
    const manor = new THREE.Group();
    manor.position.set(17.2, 0, 0);
    this.scene.add(manor);
    this.manor = manor;

    const stone = new THREE.MeshStandardMaterial({
      color: 0x36353a,
      roughness: 0.88,
      metalness: 0.04,
    });
    const darkStone = new THREE.MeshStandardMaterial({
      color: 0x202024,
      roughness: 0.92,
    });
    const roofMaterial = new THREE.MeshStandardMaterial({
      color: 0x111116,
      roughness: 0.74,
      metalness: 0.12,
    });
    const iron = new THREE.MeshStandardMaterial({
      color: 0x121215,
      roughness: 0.5,
      metalness: 0.72,
    });
    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6a20,
      emissive: 0xff3b08,
      emissiveIntensity: 3.6,
      roughness: 0.32,
    });
    this.disposables.push(stone, darkStone, roofMaterial, iron, windowMaterial);

    const addBox = (size, position, material, parent = manor) => {
      const geometry = new THREE.BoxGeometry(...size);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      this.disposables.push(geometry);
      return mesh;
    };

    addBox([8.8, 5.5, 5.8], [0, 2.75, 0], stone);
    addBox([3.0, 7.4, 4.8], [-5.35, 3.7, 0], darkStone);
    addBox([3.0, 7.4, 4.8], [5.35, 3.7, 0], darkStone);

    const makeRoof = (radius, height, y, x, zScale = 1) => {
      const geometry = new THREE.ConeGeometry(radius, height, 4);
      geometry.rotateY(Math.PI / 4);
      const mesh = new THREE.Mesh(geometry, roofMaterial);
      mesh.position.set(x, y, 0);
      mesh.scale.z = zScale;
      mesh.castShadow = true;
      manor.add(mesh);
      this.disposables.push(geometry);
    };

    makeRoof(6.5, 2.6, 6.8, 0, 0.62);
    makeRoof(2.7, 3.2, 8.9, -5.35, 0.9);
    makeRoof(2.7, 3.2, 8.9, 5.35, 0.9);

    addBox([2.15, 3.2, 0.35], [0, 1.6, 3.02], iron);
    addBox([3.1, 0.45, 0.5], [0, 3.25, 3.08], darkStone);

    const windowPositions = [
      [-2.65, 2.1], [0, 2.1], [2.65, 2.1],
      [-2.65, 4.25], [0, 4.25], [2.65, 4.25],
      [-5.36, 2.5], [-5.36, 5.1], [5.36, 2.5], [5.36, 5.1],
    ];
    windowPositions.forEach(([x, y]) => {
      addBox([0.72, 1.14, 0.12], [x, y, 2.96], windowMaterial);
      addBox([0.08, 1.16, 0.15], [x, y, 3.04], iron);
      addBox([0.74, 0.08, 0.15], [x, y, 3.04], iron);
    });

    this.createGate(iron);
    this.createBraziers();
  }

  createGate(iron) {
    const gate = new THREE.Group();
    gate.position.set(11.8, 0, 0);
    this.scene.add(gate);

    const postGeo = new THREE.BoxGeometry(0.8, 4.2, 0.8);
    const postMat = new THREE.MeshStandardMaterial({
      color: 0x29282c,
      roughness: 0.86,
    });
    this.disposables.push(postGeo, postMat);

    [-3.7, 3.7].forEach((z) => {
      const post = new THREE.Mesh(postGeo, postMat);
      post.position.set(0, 2.1, z);
      post.castShadow = true;
      gate.add(post);
    });

    const barGeo = new THREE.BoxGeometry(0.16, 3.2, 0.16);
    this.disposables.push(barGeo);
    for (let z = -3.05; z <= 3.05; z += 0.48) {
      const bar = new THREE.Mesh(barGeo, iron);
      bar.position.set(0, 1.6, z);
      bar.castShadow = true;
      gate.add(bar);
    }

    const railGeo = new THREE.BoxGeometry(0.2, 0.2, 6.5);
    this.disposables.push(railGeo);
    [0.55, 1.65, 2.75].forEach((y) => {
      const rail = new THREE.Mesh(railGeo, iron);
      rail.position.set(0, y, 0);
      gate.add(rail);
    });
  }

  createBraziers() {
    [-4.8, 4.8].forEach((z) => {
      const standGeo = new THREE.CylinderGeometry(0.32, 0.46, 1.5, 10);
      const standMat = new THREE.MeshStandardMaterial({
        color: 0x171719,
        roughness: 0.58,
        metalness: 0.58,
      });
      const stand = new THREE.Mesh(standGeo, standMat);
      stand.position.set(12.2, 0.75, z);
      stand.castShadow = true;
      this.scene.add(stand);

      const flameGeo = new THREE.SphereGeometry(0.34, 10, 8);
      const flameMat = new THREE.MeshBasicMaterial({ color: 0xff5a15 });
      const flame = new THREE.Mesh(flameGeo, flameMat);
      flame.position.set(12.2, 1.75, z);
      flame.scale.set(0.8, 1.5, 0.8);
      this.scene.add(flame);

      const light = new THREE.PointLight(0xff4d12, 12, 10, 2);
      light.position.copy(flame.position);
      this.scene.add(light);

      this.flames.push({ flame, light, phase: Math.random() * Math.PI * 2 });
      this.disposables.push(standGeo, standMat, flameGeo, flameMat);
    });
  }

  createForest() {
    const trunkMaterial = new THREE.MeshStandardMaterial({
      color: 0x111113,
      roughness: 1,
    });
    this.disposables.push(trunkMaterial);

    for (let i = 0; i < 34; i += 1) {
      const height = THREE.MathUtils.randFloat(6.5, 13);
      const trunkGeo = new THREE.CylinderGeometry(0.16, 0.42, height, 6);
      const trunk = new THREE.Mesh(trunkGeo, trunkMaterial);
      trunk.position.set(
        THREE.MathUtils.randFloat(-31, 10),
        height / 2,
        THREE.MathUtils.randFloat(7.2, 11.2) * (Math.random() > 0.5 ? 1 : -1)
      );
      trunk.rotation.z = THREE.MathUtils.randFloatSpread(0.13);
      trunk.castShadow = true;
      this.scene.add(trunk);
      this.disposables.push(trunkGeo);

      const branchCount = 2 + Math.floor(Math.random() * 3);
      for (let b = 0; b < branchCount; b += 1) {
        const branchGeo = new THREE.CylinderGeometry(0.06, 0.14, height * 0.35, 5);
        const branch = new THREE.Mesh(branchGeo, trunkMaterial);
        branch.position.copy(trunk.position);
        branch.position.y = height * THREE.MathUtils.randFloat(0.55, 0.86);
        branch.rotation.z = THREE.MathUtils.randFloat(0.8, 1.25) * (Math.random() > 0.5 ? 1 : -1);
        branch.rotation.y = Math.random() * Math.PI;
        branch.castShadow = true;
        this.scene.add(branch);
        this.disposables.push(branchGeo);
      }
    }
  }

  createAtmosphere() {
    const emberGeo = new THREE.BufferGeometry();
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = THREE.MathUtils.randFloat(8, 23);
      positions[i * 3 + 1] = THREE.MathUtils.randFloat(0.3, 11);
      positions[i * 3 + 2] = THREE.MathUtils.randFloat(-8, 8);
    }
    emberGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const emberMat = new THREE.PointsMaterial({
      color: 0xff5a18,
      size: 0.055,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    this.embers = new THREE.Points(emberGeo, emberMat);
    this.scene.add(this.embers);
    this.disposables.push(emberGeo, emberMat);
  }

  update(elapsed) {
    this.flames.forEach(({ flame, light, phase }) => {
      const pulse = 0.86 + Math.sin(elapsed * 8 + phase) * 0.12 + Math.sin(elapsed * 15 + phase) * 0.05;
      flame.scale.y = 1.35 * pulse;
      flame.scale.x = 0.78 / pulse;
      light.intensity = 10 + pulse * 3;
    });

    this.hellGlow.intensity = 31 + Math.sin(elapsed * 2.7) * 2.8;
    this.embers.rotation.y = elapsed * 0.012;
    this.embers.position.y = Math.sin(elapsed * 0.45) * 0.1;
  }

  dispose() {
    this.disposables.forEach((item) => item.dispose?.());
  }
}
