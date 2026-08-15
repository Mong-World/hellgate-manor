import * as THREE from "three";
import { AssetLibrary } from "./AssetLibrary.js";

const DISPLAY = Object.freeze({
  husk: { label: "Husks", fit: "height", target: 3.35, cameraY: 1.8, distance: 7.0 },
  runner: { label: "Crawling Husks", fit: "height", target: 1.80, cameraY: 1.05, distance: 5.9 },
  strong: { label: "Flaming Husks", fit: "height", target: 3.35, cameraY: 1.95, distance: 7.0 },
  brute: { label: "Brute Demon", fit: "height", target: 4.15, cameraY: 2.4, distance: 8.6 },
  siege: { label: "Siege Demon", fit: "height", target: 6.30, cameraY: 2.95, distance: 10.2 },
  hellwing: { label: "Hell-Wings", fit: "max", target: 0.1225, cameraY: 0.95, distance: 3.8 }
});

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
    this.root.rotation.y = Math.PI * 0.62;
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
    this.embers = [];
    this.emberGroup = new THREE.Group();
    this.scene.add(this.emberGroup);
    const geometry = new THREE.IcosahedronGeometry(0.06, 0);
    for (let i = 0; i < 22; i += 1) {
      const material = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0xffc38a : (i % 2 ? 0xff7c30 : 0xff4d16),
        transparent: true,
        opacity: 0.86,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const ember = new THREE.Mesh(geometry, material);
      const angle = (i / 22) * Math.PI * 2;
      const radius = 1.55 + (i % 5) * 0.12;
      ember.userData = {
        angle,
        radius,
        height: 0.28 + (i % 7) * 0.24,
        speed: 0.35 + (i % 6) * 0.07,
        drift: 0.15 + (i % 4) * 0.03,
        phase: i * 0.47,
        size: 0.65 + (i % 6) * 0.16
      };
      this.emberGroup.add(ember);
      this.embers.push(ember);
    }
  }

  clearModel() {
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
    modelRoot.position.y = 0.42;
    this.modelPivot.add(modelRoot);
    this.modelRoot = modelRoot;
    this.root.rotation.y = Math.PI * 0.62;
    this.distance = display.distance;
    this.minDistance = Math.max(3.8, display.distance - 2.0);
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
    if (this.modelRoot) {
      this.modelFloat += dt;
      this.modelRoot.position.y = 0.42 + Math.sin(this.modelFloat * 1.4) * 0.05;
    }
    for (const ember of this.embers) {
      const data = ember.userData;
      const angle = data.angle + elapsed * data.speed;
      const radius = data.radius + Math.sin(elapsed * 1.2 + data.phase) * 0.08;
      ember.position.set(
        Math.cos(angle) * radius,
        0.35 + data.height + Math.sin(elapsed * 1.8 + data.phase) * data.drift,
        Math.sin(angle) * radius * 0.48
      );
      const pulse = 0.72 + Math.sin(elapsed * 3.2 + data.phase) * 0.28;
      ember.scale.setScalar(data.size * pulse);
      ember.material.opacity = 0.28 + pulse * 0.55;
    }
    this.updateCamera();
  }

  render(renderer, width, height) {
    this.camera.aspect = width / Math.max(height, 1);
    this.camera.updateProjectionMatrix();
    renderer.render(this.scene, this.camera);
  }
}
