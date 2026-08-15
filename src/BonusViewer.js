import * as THREE from "three";
import { AssetLibrary } from "./AssetLibrary.js";

const DISPLAY = Object.freeze({
  husk: { label: "Husks", fit: "height", target: 3.35, cameraY: 1.8, distance: 7.0, floatBase: 0.42 },
  runner: { label: "Crawling Husks", fit: "height", target: 1.80, cameraY: 1.05, distance: 5.9, floatBase: 0.42 },
  strong: { label: "Flaming Husks", fit: "height", target: 3.35, cameraY: 1.95, distance: 7.0, floatBase: 0.42 },
  brute: { label: "Brute Demon", fit: "height", target: 4.15, cameraY: 2.4, distance: 8.6, floatBase: 0.42 },
  siege: { label: "Siege Demon", fit: "height", target: 6.30, cameraY: 2.95, distance: 10.2, floatBase: 0.42 },
  hellwing: { label: "Hell-Wings", fit: "max", target: 0.00735, cameraY: 0.78, distance: 3.35, floatBase: 1.14 }
});

// Viewer-only copies of the exact gameplay ember recipes used by
// Flaming Husks and Hell-Wings. Keeping the same geometry, spawn cadence,
// velocities, lifetimes and fading makes the gallery match the battlefield.
const STRONG_EMBER_GEOMETRY = new THREE.IcosahedronGeometry(0.042, 0);
const STRONG_EMBER_MATERIAL = new THREE.MeshBasicMaterial({
  color: 0xff7b28,
  transparent: true,
  opacity: 1.0,
  blending: THREE.AdditiveBlending,
  depthWrite: false
});
const STRONG_EMBER_ANCHORS = Object.freeze([
  [-0.26, 2.78, 0.48], [0.24, 2.70, 0.52], [-0.18, 2.52, 0.56],
  [0.18, 2.44, 0.58], [-0.10, 2.28, 0.54], [0.10, 2.22, 0.58],
  [-0.30, 2.58, 0.30], [0.28, 2.54, 0.32], [0.00, 2.92, 0.36],
  [0.00, 2.36, 0.24]
]);
const STRONG_EMBER_POOL_SIZE = 18;

const HELLWING_EMBER_GEOMETRY = new THREE.IcosahedronGeometry(0.030, 0);
const HELLWING_EMBER_MATERIAL = new THREE.MeshBasicMaterial({
  color: 0xff7a2c,
  transparent: true,
  opacity: 0.96,
  blending: THREE.AdditiveBlending,
  depthWrite: false
});
const HELLWING_EMBER_ANCHORS = Object.freeze([
  [-0.52, 0.34, 0.00], [-0.42, 0.24, 0.18], [-0.42, 0.24, -0.18],
  [-0.26, 0.18, 0.00], [-0.18, 0.12, 0.10], [-0.18, 0.12, -0.10]
]);
const HELLWING_EMBER_POOL_SIZE = 26;

const EMBER_SPAWN = new THREE.Vector3();
const EMBER_DRIFT = new THREE.Vector3();
const EMBER_ROTATION = new THREE.Quaternion();

const PLATFORM_EMBER_GEOMETRY = new THREE.IcosahedronGeometry(0.022, 0);

const TEMP_BOX = new THREE.Box3();
const TEMP_SIZE = new THREE.Vector3();
const TEMP_CENTER = new THREE.Vector3();

function fitModelToMaximumDimension(model, targetSize, rotationY = 0) {
  model.rotation.y = rotationY;
  model.updateMatrixWorld(true);
  TEMP_BOX.setFromObject(model);
  TEMP_BOX.getSize(TEMP_SIZE);
  const maximum = Math.max(TEMP_SIZE.x, TEMP_SIZE.y, TEMP_SIZE.z, 0.001);
  model.scale.setScalar(targetSize / maximum);
  model.updateMatrixWorld(true);
  TEMP_BOX.setFromObject(model);
  TEMP_BOX.getCenter(TEMP_CENTER);
  model.position.x -= TEMP_CENTER.x;
  model.position.z -= TEMP_CENTER.z;
  model.position.y -= TEMP_BOX.min.y;
  model.updateMatrixWorld(true);
  return model;
}

export class BonusViewer {
  constructor(assets) {
    this.assets = assets;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050609);
    this.scene.fog = new THREE.FogExp2(0x07080b, 0.045);

    this.camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 60);
    this.camera.position.set(0, 2.3, 7.8);

    this.target = new THREE.Vector3(0, 1.75, 0);
    this.root = new THREE.Group();
    this.root.position.set(0, -0.05, 0);
    this.root.rotation.y = Math.PI * 1.62;
    this.scene.add(this.root);

    this.pitchPivot = new THREE.Group();
    this.root.add(this.pitchPivot);
    this.modelPivot = new THREE.Group();
    this.pitchPivot.add(this.modelPivot);
    this.pitchPivot.rotation.x = 0;

    this.distance = 7.8;
    this.minDistance = 4.8;
    this.maxDistance = 10.5;
    this.baseCameraY = 1.75;
    this.cameraLift = 0;
    this.selectedKey = null;
    this.mixer = null;
    this.modelRoot = null;
    this.modelFloat = 0;
    this.modelBaseY = 0.42;

    this.setupStage();
    this.setupEmbers();
  }

  setupStage() {
    const ambient = new THREE.HemisphereLight(0xffe5cf, 0x14161a, 1.28);
    this.scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffb067, 2.4);
    key.position.set(5.8, 7.5, 6.8);
    key.castShadow = false;
    this.scene.add(key);

    const rim = new THREE.DirectionalLight(0x7fa5ff, 0.85);
    rim.position.set(-5.5, 4.5, -5.5);
    this.scene.add(rim);

    const emberLight = new THREE.PointLight(0xff6a28, 1.35, 16, 2.2);
    emberLight.position.set(0, 1.4, 2.2);
    this.scene.add(emberLight);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(4.9, 48),
      new THREE.MeshStandardMaterial({
        color: 0x111317,
        roughness: 0.88,
        metalness: 0.18
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.02;
    floor.receiveShadow = true;
    this.scene.add(floor);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.15, 0.11, 16, 64),
      new THREE.MeshBasicMaterial({
        color: 0xff6a28,
        transparent: true,
        opacity: 0.72,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.035;
    this.scene.add(ring);

    const dais = new THREE.Mesh(
      new THREE.CylinderGeometry(1.92, 2.1, 0.42, 40),
      new THREE.MeshStandardMaterial({
        color: 0x1b1e23,
        roughness: 0.76,
        metalness: 0.38,
        emissive: new THREE.Color(0x160d08),
        emissiveIntensity: 0.24
      })
    );
    dais.position.y = 0.19;
    dais.receiveShadow = true;
    this.scene.add(dais);
  }

  setupEmbers() {
    this.platformEmbers = [];
    this.strongEmberPool = [];
    this.hellwingEmberPool = [];
    this.strongEmberSpawnTimer = 0;
    this.hellwingEmberSpawnTimer = 0;

    for (let i = 0; i < 14; i += 1) {
      const material = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0xffc38a : (i % 2 ? 0xff7c30 : 0xff4d16),
        transparent: true,
        opacity: 0.52,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const ember = new THREE.Mesh(PLATFORM_EMBER_GEOMETRY, material);
      const angle = (i / 14) * Math.PI * 2;
      ember.userData = {
        angle,
        radius: 1.58 + (i % 4) * 0.12,
        baseY: 0.05 + (i % 3) * 0.04,
        rise: 0.045 + (i % 3) * 0.01,
        speed: 0.18 + (i % 5) * 0.025,
        phase: i * 0.43,
        size: 0.65 + (i % 4) * 0.12
      };
      this.scene.add(ember);
      this.platformEmbers.push(ember);
    }

    for (let i = 0; i < STRONG_EMBER_POOL_SIZE; i += 1) {
      const ember = new THREE.Mesh(STRONG_EMBER_GEOMETRY, STRONG_EMBER_MATERIAL);
      ember.visible = false;
      ember.userData.velocity = new THREE.Vector3();
      ember.userData.age = 0;
      ember.userData.life = 0;
      ember.userData.baseScale = 1;
      ember.userData.phase = 0;
      ember.userData.spin = 0;
      ember.userData.sway = 0;
      this.scene.add(ember);
      this.strongEmberPool.push(ember);
    }

    for (let i = 0; i < HELLWING_EMBER_POOL_SIZE; i += 1) {
      const ember = new THREE.Mesh(HELLWING_EMBER_GEOMETRY, HELLWING_EMBER_MATERIAL);
      ember.visible = false;
      ember.userData.velocity = new THREE.Vector3();
      ember.userData.age = 0;
      ember.userData.life = 0;
      ember.userData.baseScale = 1;
      ember.userData.phase = 0;
      ember.userData.spin = 0;
      ember.userData.sway = 0;
      this.scene.add(ember);
      this.hellwingEmberPool.push(ember);
    }
  }

  hideViewerEmbers() {
    this.strongEmberSpawnTimer = 0;
    this.hellwingEmberSpawnTimer = 0;
    this.strongEmberPool.forEach((ember) => { ember.visible = false; });
    this.hellwingEmberPool.forEach((ember) => { ember.visible = false; });
  }

  updateStrongGameplayEmbers(dt, elapsed) {
    if (this.selectedKey !== "strong" || !this.modelRoot) return;
    const spawnInterval = 0.030;
    this.strongEmberSpawnTimer -= dt;
    while (this.strongEmberSpawnTimer <= 0) {
      this.strongEmberSpawnTimer += spawnInterval + Math.random() * 0.02;
      const ember = this.strongEmberPool.find((item) => !item.visible);
      if (!ember) break;
      const data = ember.userData;
      const anchor = STRONG_EMBER_ANCHORS[(Math.random() * STRONG_EMBER_ANCHORS.length) | 0];
      EMBER_SPAWN.set(
        anchor[0] + THREE.MathUtils.randFloatSpread(0.10),
        anchor[1] + THREE.MathUtils.randFloatSpread(0.10),
        anchor[2] + THREE.MathUtils.randFloatSpread(0.10)
      );
      this.modelRoot.localToWorld(EMBER_SPAWN);
      ember.position.copy(EMBER_SPAWN);

      this.modelRoot.getWorldQuaternion(EMBER_ROTATION);
      EMBER_DRIFT.set(
        -THREE.MathUtils.randFloat(0.30, 0.52),
        THREE.MathUtils.randFloat(0.62, 1.02),
        THREE.MathUtils.randFloat(0.05, 0.16)
      ).applyQuaternion(EMBER_ROTATION);

      data.velocity.copy(EMBER_DRIFT);
      data.age = 0;
      data.life = THREE.MathUtils.randFloat(0.52, 0.96);
      data.baseScale = Math.random() < 0.18
        ? THREE.MathUtils.randFloat(1.05, 1.42)
        : THREE.MathUtils.randFloat(0.62, 1.08);
      data.phase = Math.random() * Math.PI * 2;
      data.spin = THREE.MathUtils.randFloat(4.0, 7.0);
      data.sway = THREE.MathUtils.randFloat(0.055, 0.13);
      ember.scale.setScalar(data.baseScale);
      ember.visible = true;
    }

    for (const ember of this.strongEmberPool) {
      if (!ember.visible) continue;
      const data = ember.userData;
      data.age += dt;
      if (data.age >= data.life) {
        ember.visible = false;
        continue;
      }
      const t = data.age / data.life;
      const rise = 1 - Math.pow(1 - t, 2);
      const swirlX = Math.sin(elapsed * data.spin + data.phase) * data.sway;
      const swirlZ = Math.cos(elapsed * (data.spin * 0.82) + data.phase) * data.sway * 0.9;
      ember.position.x += (data.velocity.x + swirlX) * dt;
      ember.position.y += (data.velocity.y + rise * 0.30) * dt;
      ember.position.z += (data.velocity.z + swirlZ + 0.035) * dt;
      ember.scale.setScalar(Math.max(0.12, data.baseScale * (1 - t * 0.76)));
    }
  }

  updateHellwingGameplayEmbers(dt, elapsed) {
    if (this.selectedKey !== "hellwing" || !this.modelRoot) return;
    this.hellwingEmberSpawnTimer -= dt;
    while (this.hellwingEmberSpawnTimer <= 0) {
      this.hellwingEmberSpawnTimer += 0.016 + Math.random() * 0.012;
      const ember = this.hellwingEmberPool.find((item) => !item.visible);
      if (!ember) break;
      const data = ember.userData;
      const anchor = HELLWING_EMBER_ANCHORS[(Math.random() * HELLWING_EMBER_ANCHORS.length) | 0];
      EMBER_SPAWN.set(
        anchor[0] + THREE.MathUtils.randFloatSpread(0.08),
        anchor[1] + THREE.MathUtils.randFloatSpread(0.06),
        anchor[2] + THREE.MathUtils.randFloatSpread(0.10)
      );
      this.modelRoot.localToWorld(EMBER_SPAWN);
      ember.position.copy(EMBER_SPAWN);

      this.modelRoot.getWorldQuaternion(EMBER_ROTATION);
      EMBER_DRIFT.set(
        -0.74 - THREE.MathUtils.randFloat(0.05, 0.16),
        THREE.MathUtils.randFloat(0.16, 0.32),
        THREE.MathUtils.randFloatSpread(0.12)
      ).applyQuaternion(EMBER_ROTATION);

      data.velocity.copy(EMBER_DRIFT);
      data.age = 0;
      data.life = THREE.MathUtils.randFloat(0.58, 0.96);
      data.baseScale = THREE.MathUtils.randFloat(0.55, 1.05);
      data.phase = Math.random() * Math.PI * 2;
      data.spin = THREE.MathUtils.randFloat(4.2, 7.8);
      data.sway = THREE.MathUtils.randFloat(0.05, 0.12);
      ember.scale.setScalar(data.baseScale);
      ember.visible = true;
    }

    for (const ember of this.hellwingEmberPool) {
      if (!ember.visible) continue;
      const data = ember.userData;
      data.age += dt;
      if (data.age >= data.life) {
        ember.visible = false;
        continue;
      }
      const t = data.age / data.life;
      const alpha = 1 - t;
      const swirlY = Math.sin(elapsed * data.spin + data.phase) * data.sway;
      const swirlZ = Math.cos(elapsed * (data.spin * 0.8) + data.phase) * data.sway;
      ember.position.x += data.velocity.x * dt;
      ember.position.y += (data.velocity.y + swirlY + 0.08) * dt;
      ember.position.z += (data.velocity.z + swirlZ) * dt;
      ember.scale.setScalar(Math.max(0.08, data.baseScale * (1 - t * 0.62)));
      ember.material.opacity = 0.30 + alpha * 0.66;
    }
  }

  clearModel() {
    this.hideViewerEmbers();
    if (this.mixer) this.mixer.stopAllAction();
    this.mixer = null;
    if (this.modelRoot) this.modelPivot.remove(this.modelRoot);
    this.modelRoot = null;
  }

  createDisplayClone(key) {
    if (key === "hellwing") return this.assets.createHellwingClone();
    return this.assets.createEnemyClone(key);
  }

  setEnemy(key) {
    if (!DISPLAY[key]) return false;
    this.clearModel();
    this.selectedKey = key;
    const display = DISPLAY[key];
    const { scene, animations } = this.createDisplayClone(key);
    const modelRoot = new THREE.Group();
    modelRoot.add(scene);
    AssetLibrary.prepareModel(scene);
    if (display.fit === "max") fitModelToMaximumDimension(scene, display.target, Math.PI / 2);
    else AssetLibrary.fitModelToHeight(scene, display.target, Math.PI / 2);
    this.modelBaseY = display.floatBase ?? 0.42;
    modelRoot.position.y = this.modelBaseY;
    this.modelPivot.add(modelRoot);
    this.modelRoot = modelRoot;
    this.root.rotation.y = Math.PI * 1.62;
    this.distance = display.distance;
    this.minDistance = Math.max(1.8, display.distance - 1.6);
    this.maxDistance = display.distance + 3.0;
    this.baseCameraY = display.cameraY;
    this.cameraLift = 0;
    this.target.set(0, display.cameraY, 0);
    this.camera.position.set(0, display.cameraY + 0.45, this.distance);
    this.updateCamera();

    if (animations?.length) {
      this.mixer = new THREE.AnimationMixer(scene);
      const preferred = animations.find((clip) => /fly|walk|crawl|idle/i.test(clip.name)) ?? animations[0];
      if (preferred) {
        const action = this.mixer.clipAction(preferred);
        action.reset();
        action.play();
      }
    }
    return true;
  }

  updateCamera() {
    this.camera.position.x = Math.sin(0) * this.distance;
    this.camera.position.z = Math.cos(0) * this.distance;
    this.target.y = this.baseCameraY + this.cameraLift;
    this.camera.position.y = this.target.y + 0.45;
    this.camera.lookAt(this.target);
  }

  rotate(deltaX = 0, deltaY = 0) {
    this.root.rotation.y += deltaX * 0.0105;
    this.cameraLift = THREE.MathUtils.clamp(this.cameraLift + deltaY * 0.0085, -1.8, 1.8);
    this.updateCamera();
  }

  zoom(delta = 0) {
    this.distance = THREE.MathUtils.clamp(this.distance + delta * 0.0034, this.minDistance, this.maxDistance);
    this.updateCamera();
  }

  update(dt, elapsed) {
    this.mixer?.update(dt);
    for (const ember of this.platformEmbers) {
      const data = ember.userData;
      const angle = data.angle + elapsed * data.speed;
      const radius = data.radius + Math.sin(elapsed * 0.8 + data.phase) * 0.04;
      ember.position.set(
        Math.cos(angle) * radius,
        data.baseY + Math.sin(elapsed * 1.35 + data.phase) * data.rise,
        Math.sin(angle) * radius * 0.52
      );
      const pulse = 0.82 + Math.sin(elapsed * 2.6 + data.phase) * 0.18;
      ember.scale.setScalar(data.size * pulse);
      ember.material.opacity = 0.16 + pulse * 0.22;
    }
    if (this.modelRoot) {
      this.modelFloat += dt;
      this.modelRoot.position.y = this.modelBaseY + Math.sin(this.modelFloat * 1.4) * 0.05;
    }
    this.updateStrongGameplayEmbers(dt, elapsed);
    this.updateHellwingGameplayEmbers(dt, elapsed);
    this.updateCamera();
  }

  render(renderer, width, height) {
    this.camera.aspect = width / Math.max(height, 1);
    this.camera.updateProjectionMatrix();
    renderer.render(this.scene, this.camera);
  }
}
