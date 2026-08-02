import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const MANOR_URL = "./assets/manor.glb";
const MANOR_HEIGHT = 10.5;
const MANOR_ROTATION_Y = Math.PI;

export class World {
  constructor(scene) {
    this.scene = scene;
    this.disposables = [];
    this.flames = [];
    this.manor = null;

    this.createMaterials();
    this.createLights();
    this.createGround();
    this.createForest();
    this.createAtmosphere();
  }

  async load() {
    await this.loadManor();
  }

  createMaterials() {
    this.materials = {
      earth: new THREE.MeshStandardMaterial({
        color: 0x15161a,
        roughness: 1
      }),
      forest: new THREE.MeshStandardMaterial({
        color: 0x0d0f13,
        roughness: 1
      }),
      iron: new THREE.MeshStandardMaterial({
        color: 0x101217,
        roughness: 0.5,
        metalness: 0.75
      }),
      ember: new THREE.MeshBasicMaterial({
        color: 0xff5a18
      })
    };

    this.disposables.push(...Object.values(this.materials));
  }

  createLights() {
    this.scene.add(new THREE.HemisphereLight(0x7889aa, 0x110b0b, 1.6));

    const moon = new THREE.DirectionalLight(0xaec5f0, 3.3);
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

    this.hellGlow = new THREE.PointLight(0xff4810, 34, 24, 1.8);
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

      if (x > -14 && x < 12) y *= 0.3;
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

    for (let i = 0; i < 32; i += 1) {
      const tree = new THREE.Group();
      tree.position.set(
        THREE.MathUtils.randFloat(-31, -19),
        0,
        THREE.MathUtils.randFloat(-12, 12)
      );
      tree.scale.setScalar(THREE.MathUtils.randFloat(0.75, 1.45));
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
    }
  }

  async loadManor() {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(MANOR_URL);
    const model = gltf.scene;

    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });

    model.updateMatrixWorld(true);
    const initialBox = new THREE.Box3().setFromObject(model);
    const size = initialBox.getSize(new THREE.Vector3());
    const scale = MANOR_HEIGHT / Math.max(size.y, 0.001);

    model.scale.setScalar(scale);
    model.rotation.y = MANOR_ROTATION_Y;
    model.updateMatrixWorld(true);

    const scaledBox = new THREE.Box3().setFromObject(model);
    const centre = scaledBox.getCenter(new THREE.Vector3());

    model.position.x -= centre.x;
    model.position.z -= centre.z;
    model.position.y -= scaledBox.min.y;

    const holder = new THREE.Group();
    holder.position.set(16.2, 0, 0);
    holder.add(model);
    this.scene.add(holder);

    this.manor = holder;
    this.createBraziers();
  }

  createBraziers() {
    for (const z of [-4.2, 4.2]) {
      const group = new THREE.Group();
      group.position.set(11.9, 0, z);
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

      this.flames.push({
        flame,
        light,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  createAtmosphere() {
    const geometry = new THREE.BufferGeometry();
    const count = 130;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = THREE.MathUtils.randFloat(6, 21);
      positions[i * 3 + 1] = THREE.MathUtils.randFloat(0.3, 10);
      positions[i * 3 + 2] = THREE.MathUtils.randFloat(-8, 8);
    }

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      color: 0xff5b18,
      size: 0.055,
      transparent: true,
      opacity: 0.7,
      depthWrite: false
    });

    this.embers = new THREE.Points(geometry, material);
    this.scene.add(this.embers);
    this.disposables.push(geometry, material);
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

    this.hellGlow.intensity = 33 + Math.sin(elapsed * 2.1) * 2;
    this.embers.rotation.y = elapsed * 0.014;
    this.embers.position.y = Math.sin(elapsed * 0.4) * 0.08;
  }

  dispose() {
    this.disposables.forEach((item) => item.dispose?.());
  }
}
