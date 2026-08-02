import * as THREE from "three";
import { World } from "./World.js";
import { Husk } from "./Husk.js";
import { GrabSystem } from "./GrabSystem.js";
import { AshExplosion } from "./effects/AshExplosion.js";
import { SoulEmber } from "./effects/SoulEmber.js";
import { ImpactRing } from "./effects/ImpactRing.js";

export class Game {
  constructor(container) {
    this.container = container;
    this.clock = new THREE.Clock();
    this.enemy = null;
    this.effects = [];
    this.respawnTimer = 0;
    this.running = false;
    this.cameraShake = 0;
    this.cameraBase = new THREE.Vector3(0, 10.8, 31.8);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050507);
    this.scene.fog = new THREE.FogExp2(0x08080a, 0.0215);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      190
    );
    this.camera.position.copy(this.cameraBase);
    this.camera.lookAt(1.8, 3.25, 0);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    this.container.appendChild(this.renderer.domElement);

    this.world = new World(this.scene);
    this.grabSystem = new GrabSystem({
      camera: this.camera,
      domElement: this.renderer.domElement,
      getEnemy: () => this.enemy,
    });

    this.loadingElement = document.getElementById("loading");
    this.onResize = this.onResize.bind(this);
    this.animate = this.animate.bind(this);
    window.addEventListener("resize", this.onResize);
  }

  start() {
    this.spawnHusk();
    this.running = true;
    requestAnimationFrame(this.animate);
    requestAnimationFrame(() => {
      this.loadingElement.classList.add("hidden");
      window.setTimeout(() => this.loadingElement.remove(), 700);
    });
  }

  spawnHusk() {
    if (this.enemy) this.enemy.dispose();

    this.enemy = new Husk({
      scene: this.scene,
      position: new THREE.Vector3(-20.5, 0, THREE.MathUtils.randFloat(-4.4, 4.4)),
      targetX: 13.2,
      onDeath: (data) => this.handleEnemyDeath(data),
      onImpact: (data) => this.handleImpact(data),
    });
  }

  handleImpact({ position, strength }) {
    if (strength < 3.5) return;
    this.effects.push(new ImpactRing(this.scene, position, strength));
    this.cameraShake = Math.max(this.cameraShake, Math.min(strength / 45, 0.24));
  }

  handleEnemyDeath({ position, impactStrength }) {
    if (!this.enemy || this.enemy.dead) return;

    this.enemy.kill();
    this.grabSystem.forceRelease();
    this.cameraShake = Math.max(this.cameraShake, 0.28);

    this.effects.push(new AshExplosion(this.scene, position, impactStrength));
    this.effects.push(new ImpactRing(this.scene, position.clone().setY(0.04), impactStrength + 5));
    this.effects.push(new SoulEmber({
      scene: this.scene,
      start: position.clone().add(new THREE.Vector3(0, 0.7, 0)),
      target: new THREE.Vector3(16.8, 4.7, 0),
    }));

    this.respawnTimer = 1.05;
  }

  updateCamera(dt) {
    this.cameraShake = Math.max(0, this.cameraShake - dt * 1.7);
    if (this.cameraShake > 0) {
      const amount = this.cameraShake;
      this.camera.position.set(
        this.cameraBase.x + THREE.MathUtils.randFloatSpread(amount),
        this.cameraBase.y + THREE.MathUtils.randFloatSpread(amount * 0.55),
        this.cameraBase.z + THREE.MathUtils.randFloatSpread(amount * 0.35)
      );
    } else {
      this.camera.position.lerp(this.cameraBase, 0.18);
    }
    this.camera.lookAt(1.8, 3.25, 0);
  }

  animate() {
    if (!this.running) return;
    requestAnimationFrame(this.animate);

    const dt = Math.min(this.clock.getDelta(), 1 / 30);
    const elapsed = this.clock.elapsedTime;

    this.grabSystem.update(dt);
    this.enemy?.update(dt, elapsed, this.grabSystem.isHolding(this.enemy));

    if (this.enemy && !this.enemy.dead && this.enemy.position.x >= 13.3) {
      this.enemy.position.set(-20.5, 0, THREE.MathUtils.randFloat(-4.4, 4.4));
      this.enemy.resetMotion();
    }

    for (let i = this.effects.length - 1; i >= 0; i -= 1) {
      const effect = this.effects[i];
      effect.update(dt);
      if (effect.finished) {
        effect.dispose();
        this.effects.splice(i, 1);
      }
    }

    if (this.respawnTimer > 0) {
      this.respawnTimer -= dt;
      if (this.respawnTimer <= 0) this.spawnHusk();
    }

    this.world.update(elapsed, dt);
    this.updateCamera(dt);
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  dispose() {
    this.running = false;
    window.removeEventListener("resize", this.onResize);
    this.grabSystem.dispose();
    this.enemy?.dispose();
    this.effects.forEach((effect) => effect.dispose());
    this.world.dispose();
    this.renderer.dispose();
  }
}
