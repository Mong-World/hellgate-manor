import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js";
import { World } from "./World.js";
import { Husk } from "./Husk.js";
import { GrabSystem } from "./GrabSystem.js";
import { AshExplosion } from "./effects/AshExplosion.js";
import { SoulEmber } from "./effects/SoulEmber.js";

export class Game {
  constructor(container) {
    this.container = container;
    this.clock = new THREE.Clock();
    this.enemy = null;
    this.effects = [];
    this.souls = 0;
    this.respawnTimer = 0;
    this.running = false;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050506);
    this.scene.fog = new THREE.FogExp2(0x070708, 0.026);

    this.camera = new THREE.PerspectiveCamera(
      47,
      window.innerWidth / window.innerHeight,
      0.1,
      180
    );
    this.camera.position.set(0, 13.5, 31);
    this.camera.lookAt(2.5, 3.4, 0);

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
    this.renderer.toneMappingExposure = 1.08;
    this.container.appendChild(this.renderer.domElement);

    this.world = new World(this.scene);

    this.grabSystem = new GrabSystem({
      camera: this.camera,
      domElement: this.renderer.domElement,
      getEnemy: () => this.enemy,
    });

    this.soulValueElement = document.getElementById("soul-value");
    this.loadingElement = document.getElementById("loading");
    this.hintElement = document.getElementById("hint");

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
    if (this.enemy) {
      this.scene.remove(this.enemy.group);
      this.enemy.dispose();
    }

    const laneZ = THREE.MathUtils.randFloat(-4.6, 4.6);
    this.enemy = new Husk({
      scene: this.scene,
      position: new THREE.Vector3(-19.5, 0, laneZ),
      targetX: 14.2,
      onDeath: (data) => this.handleEnemyDeath(data),
    });
  }

  handleEnemyDeath({ position }) {
    if (!this.enemy || this.enemy.dead) return;

    this.enemy.kill();
    this.grabSystem.forceRelease();

    const ash = new AshExplosion(this.scene, position);
    this.effects.push(ash);

    const soul = new SoulEmber({
      scene: this.scene,
      start: position.clone().add(new THREE.Vector3(0, 1.2, 0)),
      target: new THREE.Vector3(16.4, 4.3, 0),
      onCollected: () => {
        this.souls += 1;
        this.soulValueElement.textContent = String(this.souls);
      },
    });
    this.effects.push(soul);

    this.respawnTimer = 1.15;
  }

  animate() {
    if (!this.running) return;
    requestAnimationFrame(this.animate);

    const dt = Math.min(this.clock.getDelta(), 1 / 30);
    const elapsed = this.clock.elapsedTime;

    this.grabSystem.update(dt);

    if (this.enemy) {
      this.enemy.update(dt, elapsed, this.grabSystem.isHolding(this.enemy));

      if (!this.enemy.dead && this.enemy.position.x >= 13.8) {
        this.enemy.position.x = -19.5;
        this.enemy.position.z = THREE.MathUtils.randFloat(-4.6, 4.6);
        this.enemy.resetMotion();
      }
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

    this.world.update(elapsed);
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
