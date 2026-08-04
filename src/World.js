import * as THREE from "three";
import { AssetLibrary } from "./AssetLibrary.js";

export class World {
  constructor(scene, assets) {
    this.scene = scene;
    this.assets = assets;
    this.disposables = [];
    this.flames = [];
    this.treeColliders = [];
    this.manorHolder = null;
    this.manorBounds = new THREE.Box3();
    this.manorBarrierX = 13;
    this.turretMounts = [];

    this.createMaterials();
    this.createLights();
    this.createGround();
    this.createForest();
  }

  async load() {
    this.loadManor();
  }

  createMaterials() {
    this.materials = {
      earth: new THREE.MeshStandardMaterial({ color: 0x15161a, roughness: 1 }),
      forest: new THREE.MeshStandardMaterial({ color: 0x0d0f13, roughness: 1 }),
      iron: new THREE.MeshStandardMaterial({
        color: 0x101217,
        roughness: 0.48,
        metalness: 0.78
      }),
      ember: new THREE.MeshStandardMaterial({
        color: 0xff6725,
        emissive: 0xff2f08,
        emissiveIntensity: 4.2,
        roughness: 0.3
      })
    };
    this.disposables.push(...Object.values(this.materials));
  }

  createLights() {
    this.scene.add(new THREE.HemisphereLight(0x8294ba, 0x120b0b, 1.75));

    const moon = new THREE.DirectionalLight(0xb2c8f3, 3.65);
    moon.position.set(-18, 24, 13);
    moon.castShadow = true;
    moon.shadow.mapSize.set(2048, 2048);
    moon.shadow.camera.left = -36;
    moon.shadow.camera.right = 36;
    moon.shadow.camera.top = 24;
    moon.shadow.camera.bottom = -20;
    moon.shadow.camera.near = 1;
    moon.shadow.camera.far = 100;
    moon.shadow.bias = -0.00035;
    this.scene.add(moon);

    const rim = new THREE.DirectionalLight(0x6f91d6, 1.5);
    rim.position.set(-12, 7, 12);
    this.scene.add(rim);

    this.hellGlow = new THREE.PointLight(0xff4810, 35, 24, 1.8);
    this.hellGlow.position.set(15.5, 4, 0);
    this.scene.add(this.hellGlow);
  }

  createGround() {
    const geometry = new THREE.PlaneGeometry(80, 27, 64, 18);
    geometry.rotateX(-Math.PI / 2);
    const positions = geometry.attributes.position;

    for (let i = 0; i < positions.count; i += 1) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      let y =
        Math.sin(x * 0.16) * 0.05 +
        Math.cos(z * 0.5) * 0.035 +
        Math.sin((x + z) * 0.12) * 0.025;
      if (x > -14 && x < 12) y *= 0.25;
      positions.setY(i, y);
    }

    geometry.computeVertexNormals();
    const ground = new THREE.Mesh(geometry, this.materials.earth);
    ground.position.y = -0.05;
    ground.receiveShadow = true;
    this.scene.add(ground);
    this.disposables.push(geometry);
  }

  createForest() {
    const trunkGeometry = new THREE.CylinderGeometry(0.12, 0.28, 8.5, 6);
    const branchGeometry = new THREE.CylinderGeometry(0.035, 0.075, 2.4, 5);
    this.disposables.push(trunkGeometry, branchGeometry);

    for (let i = 0; i < 34; i += 1) {
      const tree = new THREE.Group();
      tree.position.set(
        THREE.MathUtils.randFloat(-31, -19),
        0,
        THREE.MathUtils.randFloat(-12, 12)
      );
      tree.scale.setScalar(THREE.MathUtils.randFloat(0.78, 1.48));
      this.scene.add(tree);

      const trunk = new THREE.Mesh(trunkGeometry, this.materials.forest);
      trunk.position.y = 4.25;
      trunk.rotation.z = THREE.MathUtils.randFloatSpread(0.12);
      trunk.castShadow = true;
      tree.add(trunk);

      const count = 2 + Math.floor(Math.random() * 4);
      for (let b = 0; b < count; b += 1) {
        const branch = new THREE.Mesh(branchGeometry, this.materials.forest);
        branch.position.y = THREE.MathUtils.randFloat(4, 7.4);
        branch.rotation.z =
          THREE.MathUtils.randFloat(0.75, 1.2) *
          (Math.random() > 0.5 ? 1 : -1);
        branch.rotation.y = Math.random() * Math.PI;
        branch.castShadow = true;
        tree.add(branch);
      }

      this.treeColliders.push({
        position: tree.position.clone(),
        radius: 0.5 * tree.scale.x,
        height: 8.5 * tree.scale.y
      });
    }
  }

  loadManor() {
    const model = this.assets.createManorClone();
    AssetLibrary.prepareModel(model);
    AssetLibrary.fitModelToHeight(model, 10.5, Math.PI);

    const holder = new THREE.Group();
    holder.position.set(16.2, 0, 0);
    holder.add(model);
    this.scene.add(holder);

    holder.updateMatrixWorld(true);
    this.manorHolder = holder;
    this.manorBounds.setFromObject(holder);
    this.manorBarrierX = this.manorBounds.min.x - 0.12;

    this.createBraziers();
    this.createTurretMounts();
  }

  createBraziers() {
    for (const z of [-4.2, 4.2]) {
      const group = new THREE.Group();
      group.position.set(this.manorBarrierX - 1.1, 0, z);
      this.scene.add(group);

      const standGeometry = new THREE.CylinderGeometry(0.18, 0.3, 1.2, 10);
      const stand = new THREE.Mesh(standGeometry, this.materials.iron);
      stand.position.y = 0.6;
      stand.castShadow = true;
      group.add(stand);
      this.disposables.push(standGeometry);

      const flameGeometry = new THREE.ConeGeometry(0.23, 0.65, 7);
      const flame = new THREE.Mesh(flameGeometry, this.materials.ember);
      flame.position.y = 1.52;
      group.add(flame);
      this.disposables.push(flameGeometry);

      const light = new THREE.PointLight(0xff5516, 10, 8, 2);
      light.position.y = 1.42;
      group.add(light);
      this.flames.push({ flame, light, phase: Math.random() * Math.PI * 2 });
    }
  }

  createTurretMounts() {
    const y = Math.min(this.manorBounds.max.y * 0.62, 6.4);
    const zPositions = [-2.8, 0, 2.8];

    for (let i = 0; i < 3; i += 1) {
      const group = new THREE.Group();
      group.position.set(this.manorBarrierX + 0.25, y + i * 0.35, zPositions[i]);
      group.visible = false;
      this.scene.add(group);

      const baseGeometry = new THREE.CylinderGeometry(0.22, 0.32, 0.55, 10);
      const base = new THREE.Mesh(baseGeometry, this.materials.iron);
      base.rotation.z = Math.PI / 2;
      base.castShadow = true;
      group.add(base);
      this.disposables.push(baseGeometry);

      const orbGeometry = new THREE.IcosahedronGeometry(0.24, 1);
      const orb = new THREE.Mesh(orbGeometry, this.materials.ember);
      orb.position.x = -0.36;
      group.add(orb);
      this.disposables.push(orbGeometry);

      const light = new THREE.PointLight(0xff4f16, 6, 5, 2);
      light.position.copy(orb.position);
      group.add(light);
      this.turretMounts.push({ group, orb, light, phase: i * 1.2 });
    }
  }

  setTurretLevel(level) {
    this.turretMounts.forEach((mount, index) => {
      mount.group.visible = index < level;
    });
  }

  getTurretOrigin(index) {
    const mount = this.turretMounts[index];
    if (!mount) return new THREE.Vector3(this.manorBarrierX, 4.5, 0);
    const origin = new THREE.Vector3();
    mount.orb.getWorldPosition(origin);
    return origin;
  }

  isInsideManorCollision(position) {
    return (
      position.x >= this.manorBarrierX &&
      position.y <= this.manorBounds.max.y + 1 &&
      position.z >= this.manorBounds.min.z - 0.8 &&
      position.z <= this.manorBounds.max.z + 0.8
    );
  }

  findTreeCollision(position) {
    for (const tree of this.treeColliders) {
      if (position.y > tree.height) continue;
      const dx = position.x - tree.position.x;
      const dz = position.z - tree.position.z;
      if (dx * dx + dz * dz <= tree.radius * tree.radius) return tree;
    }
    return null;
  }

  update(elapsed) {
    this.flames.forEach(({ flame, light, phase }) => {
      const pulse =
        0.9 +
        Math.sin(elapsed * 8 + phase) * 0.12 +
        Math.sin(elapsed * 15 + phase) * 0.04;
      flame.scale.set(0.9 / pulse, 1.2 * pulse, 0.9 / pulse);
      light.intensity = 9 + pulse * 2.5;
    });

    this.turretMounts.forEach(({ orb, light, phase }) => {
      const pulse = 1 + Math.sin(elapsed * 5 + phase) * 0.12;
      orb.scale.setScalar(pulse);
      light.intensity = 5.5 + pulse * 1.8;
    });

    this.hellGlow.intensity = 33 + Math.sin(elapsed * 2.1) * 2;
  }

  dispose() {
    this.disposables.forEach((item) => item.dispose?.());
  }
}
