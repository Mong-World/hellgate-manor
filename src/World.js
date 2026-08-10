import * as THREE from "three";
import { AssetLibrary } from "./AssetLibrary.js";
import { CONFIG } from "./Config.js";

function makeMoonTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  const glow = ctx.createRadialGradient(128, 128, 26, 128, 128, 96);
  glow.addColorStop(0, "rgba(249,246,231,0.98)");
  glow.addColorStop(0.62, "rgba(216,221,214,0.96)");
  glow.addColorStop(0.84, "rgba(144,156,170,0.34)");
  glow.addColorStop(1, "rgba(144,156,170,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 256, 256);

  ctx.globalCompositeOperation = "multiply";
  const craters = [
    [81, 92, 18, 0.20],
    [151, 68, 12, 0.18],
    [164, 142, 25, 0.17],
    [101, 164, 11, 0.14],
    [130, 115, 8, 0.12],
    [96, 122, 6, 0.13]
  ];
  for (const [x, y, radius, alpha] of craters) {
    ctx.fillStyle = `rgba(60,70,78,${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeCloudTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 192;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const blobs = [
    [85, 105, 75, 36],
    [155, 82, 105, 48],
    [250, 92, 125, 56],
    [345, 78, 108, 48],
    [430, 104, 80, 34]
  ];

  for (const [x, y, rx, ry] of blobs) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, rx);
    gradient.addColorStop(0, "rgba(178,187,205,.42)");
    gradient.addColorStop(0.45, "rgba(105,113,132,.27)");
    gradient.addColorStop(1, "rgba(33,36,48,0)");
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, ry / rx);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, rx, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeFogTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fully feathered oval mist: transparent on every edge, so no square cards show.
  const main = ctx.createRadialGradient(256, 132, 18, 256, 132, 230);
  main.addColorStop(0, "rgba(232,237,242,.42)");
  main.addColorStop(0.35, "rgba(215,222,230,.28)");
  main.addColorStop(0.70, "rgba(196,205,216,.12)");
  main.addColorStop(1, "rgba(185,194,205,0)");
  ctx.save();
  ctx.translate(256, 132);
  ctx.scale(1, 0.43);
  ctx.fillStyle = main;
  ctx.beginPath();
  ctx.arc(0, 0, 230, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  for (let i = 0; i < 12; i += 1) {
    const x = 80 + Math.random() * 350;
    const y = 90 + Math.random() * 80;
    const radius = 45 + Math.random() * 65;
    const puff = ctx.createRadialGradient(x, y, 0, x, y, radius);
    puff.addColorStop(0, "rgba(240,243,247,.16)");
    puff.addColorStop(1, "rgba(230,235,240,0)");
    ctx.fillStyle = puff;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeGroundTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bg.addColorStop(0, "#15161a");
  bg.addColorStop(0.45, "#111217");
  bg.addColorStop(1, "#0c0d11");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 1500; i += 1) {
    const alpha = 0.018 + Math.random() * 0.05;
    const radius = 1 + Math.random() * 3.5;
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 280; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const w = 40 + Math.random() * 180;
    const h = 18 + Math.random() * 60;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, w * 0.7);
    grad.addColorStop(0, `rgba(70,62,54,${0.04 + Math.random() * 0.06})`);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(x - w / 2, y - h / 2, w, h);
  }

  ctx.lineCap = "round";
  for (let i = 0; i < 75; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const len = 24 + Math.random() * 90;
    const angle = Math.random() * Math.PI * 2;
    ctx.strokeStyle = `rgba(14,14,18,${0.25 + Math.random() * 0.26})`;
    ctx.lineWidth = 1 + Math.random() * 1.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len * 0.35);
    ctx.stroke();
  }

  const leftGlow = ctx.createRadialGradient(0, canvas.height * 0.65, 0, 90, canvas.height * 0.65, 240);
  leftGlow.addColorStop(0, "rgba(255,112,49,.24)");
  leftGlow.addColorStop(1, "rgba(255,112,49,0)");
  ctx.fillStyle = leftGlow;
  ctx.fillRect(0, canvas.height * 0.2, 320, canvas.height * 0.8);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4.8, 2.2);
  return texture;
}

function pulseFogOpacity(material, elapsed, phase, baseOpacity = 0.16) {
  material.opacity = Math.max(0.05, baseOpacity + Math.sin(elapsed * 0.24 + phase) * 0.028);
}

function makeExtractionPortalTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 256, 256);

  const glow = ctx.createRadialGradient(128, 128, 4, 128, 128, 124);
  glow.addColorStop(0, "rgba(255,255,245,1)");
  glow.addColorStop(0.18, "rgba(255,224,162,.98)");
  glow.addColorStop(0.48, "rgba(255,137,57,.78)");
  glow.addColorStop(0.74, "rgba(255,77,20,.34)");
  glow.addColorStop(1, "rgba(255,77,20,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 256, 256);

  ctx.globalCompositeOperation = "screen";
  for (let i = 0; i < 7; i += 1) {
    ctx.strokeStyle = `rgba(255,238,188,${0.16 + i * 0.035})`;
    ctx.lineWidth = 2 + (i % 3);
    ctx.beginPath();
    const radius = 32 + i * 10;
    const start = i * 0.62;
    ctx.arc(128, 128, radius, start, start + Math.PI * (0.7 + (i % 2) * 0.35));
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeDamageDustTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 192;
  canvas.height = 192;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 192, 192);
  const gradient = ctx.createRadialGradient(96, 96, 5, 96, 96, 92);
  gradient.addColorStop(0, "rgba(205,190,168,.72)");
  gradient.addColorStop(0.32, "rgba(150,137,122,.48)");
  gradient.addColorStop(0.68, "rgba(92,85,80,.20)");
  gradient.addColorStop(1, "rgba(70,67,66,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 192, 192);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export class World {
  constructor(scene, assets, { mobile = false } = {}) {
    this.scene = scene;
    this.assets = assets;
    this.mobile = !!mobile;
    this.disposables = [];
    this.flames = [];
    this.treeColliders = [];
    this.manorHolder = null;
    this.manorBounds = new THREE.Box3();
    this.manorBarrierX = 13;
    this.turretMounts = [];
    this.skyClouds = [];
    this.lightningBolt = null;
    this.lightningLight = null;
    this.lightningTimer = 0;
    this.groundFog = [];
    this.riftEmbers = null;
    this.riftEmberBase = null;
    this.extractionGroup = null;
    this.extractionCentre = new THREE.Vector3();
    this.extractionBeams = [];
    this.extractionCapacity = 0;
    this.extractionCompletions = 0;
    this.upgradeGroups = {};
    this.fortifyGroups = [];
    this.occultPulseTimer = 0;
    this.occultStrikes = [];
    this.manorDustBursts = [];
    this.overchargeShield = null;
    this.overchargeActive = false;
    this.overchargeHitPulse = 0;
    this.dawnActive = false;
    this.dawnProgress = 0;
    this.dawnSun = null;
    this.dawnLight = null;
    this.dawnBirds = [];
    this.newGamePlus = false;
    this.lateGameVisualMode = false;
    this.hellVisualStrength = 0;
    this.hellVisualTarget = 0;
    this.hellVisualTransitionRate = 0;
    this.normalNightColor = new THREE.Color(0x050609);
    this.hellNightColor = new THREE.Color(0x120407);
    this.normalFogColor = new THREE.Color(0x08090d);
    this.hellFogColor = new THREE.Color(0x170609);
    this.ngPlusEmbers = null;
    this.ngPlusEmberBase = null;
    this.ngPlusSkyGlow = null;
    this.victoryClosing = false;
    this.victoryTimer = 0;
    this.victoryDawnStarted = false;

    this.createMaterials();
    this.createSky();
    this.createLights();
    this.createGround();
    this.createHellRift();
    this.createForest();
    this.createGroundFog();
    this.prepareDawnAssets();
  }

  async load() {
    this.loadManor();
  }

  createMaterials() {
    const groundMap = makeGroundTexture();
    this.materials = {
      earth: new THREE.MeshStandardMaterial({
        color: 0x15161a,
        roughness: 0.96,
        metalness: 0.03,
        map: groundMap
      }),
      forest: new THREE.MeshStandardMaterial({
        color: 0x0d0f13,
        roughness: 1
      }),
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
      }),
      rift: new THREE.MeshBasicMaterial({
        color: 0xff3d0a,
        transparent: true,
        opacity: 0.86,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      }),
      riftHot: new THREE.MeshBasicMaterial({
        color: 0xffb25c,
        transparent: true,
        opacity: 0.96,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      }),
      crater: new THREE.MeshBasicMaterial({
        color: 0x080404,
        transparent: true,
        opacity: 0.52,
        depthWrite: false,
        side: THREE.DoubleSide
      })
    };
    this.disposables.push(groundMap, ...Object.values(this.materials));
  }

  createSky() {
    const starCount = this.mobile ? 150 : 220;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i += 1) {
      starPositions[i * 3] = THREE.MathUtils.randFloat(-38, 38);
      // Keep the original upper sky, but add a quieter band of stars close to
      // the horizon so the lower sky does not feel empty.
      starPositions[i * 3 + 1] = Math.random() < 0.30
        ? THREE.MathUtils.randFloat(7.4, 11.2)
        : THREE.MathUtils.randFloat(10.5, 27);
      starPositions[i * 3 + 2] = THREE.MathUtils.randFloat(-48, -32);
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xdde7f2,
      size: 0.11,
      transparent: true,
      opacity: 0.86,
      depthWrite: false,
      fog: false
    });
    this.stars = new THREE.Points(starGeometry, starMaterial);
    this.stars.renderOrder = -5;
    this.scene.add(this.stars);
    this.disposables.push(starGeometry, starMaterial);

    // Pre-created late-game lightning so strikes do not allocate geometry during play.
    const lightningPositions = new Float32Array(14 * 3);
    const lightningGeometry = new THREE.BufferGeometry();
    const lightningAttribute = new THREE.BufferAttribute(lightningPositions, 3);
    lightningAttribute.setUsage(THREE.DynamicDrawUsage);
    lightningGeometry.setAttribute("position", lightningAttribute);
    const lightningMaterial = new THREE.LineBasicMaterial({
      color: 0xff2d24,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false
    });
    const lightning = new THREE.Line(lightningGeometry, lightningMaterial);
    lightning.visible = false;
    lightning.renderOrder = -1;
    this.scene.add(lightning);
    this.lightningBolt = { line: lightning, geometry: lightningGeometry, material: lightningMaterial, attribute: lightningAttribute };
    this.lightningLight = new THREE.PointLight(0xff2a20, 0, 95, 1.6);
    this.lightningLight.position.set(-10, 18, -16);
    this.scene.add(this.lightningLight);
    this.disposables.push(lightningGeometry, lightningMaterial);

    const moonTexture = makeMoonTexture();
    const moonMaterial = new THREE.SpriteMaterial({
      map: moonTexture,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
      fog: false
    });
    this.moon = new THREE.Sprite(moonMaterial);
    this.moon.position.set(-8.2, 17.2, -36);
    this.moon.scale.set(5.0, 5.0, 1);
    this.scene.add(this.moon);
    this.disposables.push(moonTexture, moonMaterial);

    const cloudTexture = makeCloudTexture();
    const cloudData = [
      [-15, 15.5, -33, 21, 6.1, 0.20, 0.16],
      [2, 18.4, -37, 18, 5.2, 0.16, 0.10],
      [14, 14.5, -34, 23, 6.6, 0.22, 0.13],
      [-2, 12.3, -31, 17, 4.8, 0.12, 0.18],
      [24, 20.2, -41, 20, 5.7, 0.14, 0.08]
    ];

    cloudData.forEach(([x, y, z, sx, sy, opacity, speed], index) => {
      const material = new THREE.SpriteMaterial({
        map: cloudTexture,
        color: index % 2 === 0 ? 0x8290a5 : 0x6f788b,
        transparent: true,
        opacity,
        depthWrite: false,
        fog: false
      });
      const sprite = new THREE.Sprite(material);
      sprite.position.set(x, y, z);
      sprite.scale.set(sx, sy, 1);
      this.scene.add(sprite);
      this.skyClouds.push({ sprite, speed, baseY: y, phase: index * 1.31 });
      this.disposables.push(material);
    });
    this.disposables.push(cloudTexture);

    // New Game+ atmosphere is created up front so switching into hard mode
    // never causes a first-use shader hitch. It stays hidden in normal mode.
    const ngGlowTexture = makeFogTexture();
    const ngGlowMaterial = new THREE.SpriteMaterial({
      map: ngGlowTexture,
      color: 0xff2415,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false
    });
    this.ngPlusSkyGlow = new THREE.Sprite(ngGlowMaterial);
    this.ngPlusSkyGlow.position.set(-18, 11.5, -34);
    this.ngPlusSkyGlow.scale.set(38, 22, 1);
    this.ngPlusSkyGlow.visible = false;
    this.scene.add(this.ngPlusSkyGlow);

    const ngEmberCount = this.mobile ? 170 : 280;
    const ngPositions = new Float32Array(ngEmberCount * 3);
    const ngBase = new Float32Array(ngEmberCount * 3);
    for (let i = 0; i < ngEmberCount; i += 1) {
      const idx = i * 3;
      const x = THREE.MathUtils.randFloat(-34, 26);
      const y = THREE.MathUtils.randFloat(0.6, 21);
      const z = THREE.MathUtils.randFloat(-26, 8);
      ngPositions[idx] = ngBase[idx] = x;
      ngPositions[idx + 1] = ngBase[idx + 1] = y;
      ngPositions[idx + 2] = ngBase[idx + 2] = z;
    }
    const ngEmberGeometry = new THREE.BufferGeometry();
    ngEmberGeometry.setAttribute("position", new THREE.BufferAttribute(ngPositions, 3));
    const ngEmberMaterial = new THREE.PointsMaterial({
      color: 0xff5428,
      size: 0.13,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false
    });
    this.ngPlusEmbers = new THREE.Points(ngEmberGeometry, ngEmberMaterial);
    this.ngPlusEmbers.visible = false;
    this.scene.add(this.ngPlusEmbers);
    this.ngPlusEmberBase = ngBase;
    this.disposables.push(ngGlowTexture, ngGlowMaterial, ngEmberGeometry, ngEmberMaterial);
  }

  createLights() {
    this.scene.add(new THREE.HemisphereLight(0x7d8fb2, 0x120b0b, 1.7));

    const moonLight = new THREE.DirectionalLight(0xb2c8f3, 3.25);
    this.moonLight = moonLight;
    moonLight.position.set(-18, 24, 13);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.set(this.mobile ? 1024 : 2048, this.mobile ? 1024 : 2048);
    moonLight.shadow.camera.left = -36;
    moonLight.shadow.camera.right = 36;
    moonLight.shadow.camera.top = 24;
    moonLight.shadow.camera.bottom = -20;
    moonLight.shadow.camera.near = 1;
    moonLight.shadow.camera.far = 100;
    moonLight.shadow.bias = -0.00035;
    this.scene.add(moonLight);

    const rim = new THREE.DirectionalLight(0x6f91d6, 1.2);
    this.rimLight = rim;
    rim.position.set(-12, 7, 12);
    this.scene.add(rim);

    const huskFill = new THREE.DirectionalLight(0x89a7ea, 0.75);
    this.huskFillLight = huskFill;
    huskFill.position.set(14, 8, 18);
    this.scene.add(huskFill);

    this.hellGlow = new THREE.PointLight(0xff4810, 35, 24, 1.8);
    this.hellGlow.position.set(15.5, 4, 0);
    this.scene.add(this.hellGlow);

    this.riftLight = new THREE.PointLight(0xff3a08, 98, 32, 1.5);
    this.riftLight.position.set(-23.0, 2.8, 0.0);
    this.scene.add(this.riftLight);

    // Extends the Hell Gate glow several metres along the path, so demons are
    // rim-lit as they emerge and walk away from the crack.
    this.riftWalkLight = new THREE.PointLight(0xff5a18, 38, 19, 1.75);
    this.riftWalkLight.position.set(-18.4, 2.3, 0.0);
    this.scene.add(this.riftWalkLight);
  }

  createGround() {
    // Oversized towards the camera so the background sky can never show below
    // the terrain during the much brighter dawn scene.
    const geometry = new THREE.PlaneGeometry(104, 80, 72, 40);
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
    ground.position.set(0, -0.05, 8);
    ground.receiveShadow = true;
    this.scene.add(ground);
    this.disposables.push(geometry);

    const sootGeometry = new THREE.CircleGeometry(18, 48);
    sootGeometry.rotateX(-Math.PI / 2);
    const sootMaterial = new THREE.MeshBasicMaterial({
      color: 0x09090b,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const soot = new THREE.Mesh(sootGeometry, sootMaterial);
    soot.position.set(-2.5, 0.025, 0.8);
    soot.scale.set(1.6, 0.55, 1);
    this.scene.add(soot);
    this.disposables.push(sootGeometry, sootMaterial);
  }

  createHellRift() {
    this.riftGroup = new THREE.Group();
    this.riftGroup.position.set(-23.0, 0.025, 0.0);
    this.scene.add(this.riftGroup);

    // Keep the Hell Gate as a flat tear in the ground. Earlier TubeGeometry
    // read as bright logs from the game camera, so the central fissure is now
    // built from overlapping feathered ground ovals instead.
    const fissurePools = [
      [-0.18, -5.2, 0.48, 1.25],
      [0.22, -3.7, 0.54, 1.35],
      [-0.14, -2.1, 0.46, 1.30],
      [0.28, -0.55, 0.58, 1.45],
      [-0.22, 1.0, 0.48, 1.30],
      [0.20, 2.7, 0.52, 1.42],
      [-0.06, 4.45, 0.44, 1.25]
    ];
    fissurePools.forEach(([x, z, sx, sz], index) => {
      const outerGeometry = new THREE.CircleGeometry(1, 28);
      outerGeometry.rotateX(-Math.PI / 2);
      const outer = new THREE.Mesh(outerGeometry, this.materials.crater);
      outer.position.set(x, 0.008 + index * 0.0005, z);
      outer.scale.set(sx * 1.7, sz * 1.15, 1);
      this.riftGroup.add(outer);

      const hotGeometry = new THREE.CircleGeometry(1, 28);
      hotGeometry.rotateX(-Math.PI / 2);
      const hot = new THREE.Mesh(hotGeometry, this.materials.riftHot);
      hot.position.set(x, 0.025 + index * 0.0005, z);
      hot.scale.set(sx, sz, 1);
      this.riftGroup.add(hot);
      this.disposables.push(outerGeometry, hotGeometry);
    });

    this.riftFlames = [];
    [-5.0, -3.2, -1.4, 0.5, 2.5, 4.5].forEach((z, index) => {
      const flameGroup = new THREE.Group();
      flameGroup.position.set(index % 2 ? 0.20 : -0.16, 0.15, z);
      this.riftGroup.add(flameGroup);

      const outerGeometry = new THREE.ConeGeometry(0.34 + (index % 3) * 0.05, 1.55 + (index % 2) * 0.45, 9);
      const outerMaterial = new THREE.MeshBasicMaterial({
        color: 0xff4b0d,
        transparent: true,
        opacity: 0.72,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const outer = new THREE.Mesh(outerGeometry, outerMaterial);
      outer.position.y = 0.72;
      flameGroup.add(outer);

      const innerGeometry = new THREE.ConeGeometry(0.18, 1.05, 8);
      const innerMaterial = new THREE.MeshBasicMaterial({
        color: 0xffc05c,
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const inner = new THREE.Mesh(innerGeometry, innerMaterial);
      inner.position.y = 0.62;
      flameGroup.add(inner);

      const light = new THREE.PointLight(0xff4710, 10, 6, 2);
      light.position.y = 0.8;
      flameGroup.add(light);
      this.riftFlames.push({ group: flameGroup, outer, inner, light, phase: index * 0.83 });
      this.disposables.push(outerGeometry, outerMaterial, innerGeometry, innerMaterial);
    });

    const breaches = [
      [0, 0.8, 2.2, 0.84],
      [-0.45, -2.1, 1.45, 0.55],
      [0.28, 3.2, 1.35, 0.48]
    ];

    breaches.forEach(([x, z, scaleX, scaleZ], breachIndex) => {
      const craterGeometry = new THREE.CircleGeometry(1.85, 48);
      craterGeometry.rotateX(-Math.PI / 2);
      const crater = new THREE.Mesh(craterGeometry, this.materials.crater);
      crater.position.set(x, 0.004 + breachIndex * 0.001, z);
      crater.scale.set(scaleX * 1.55, scaleZ * 1.55, 1);
      this.riftGroup.add(crater);
      this.disposables.push(craterGeometry);

      const coreGeometry = new THREE.CircleGeometry(1.42, 48);
      coreGeometry.rotateX(-Math.PI / 2);
      const core = new THREE.Mesh(coreGeometry, breachIndex === 0 ? this.materials.riftHot : this.materials.rift);
      core.position.set(x, 0.02 + breachIndex * 0.001, z);
      core.scale.set(scaleX, scaleZ, 1);
      this.riftGroup.add(core);
      this.disposables.push(coreGeometry);
    });

    const crackOrigins = [
      new THREE.Vector3(0, 0.035, 0.8),
      new THREE.Vector3(-0.45, 0.035, -2.1),
      new THREE.Vector3(0.28, 0.035, 3.2)
    ];

    crackOrigins.forEach((origin, originIndex) => {
      const branchCount = originIndex === 0 ? 14 : 8;
      for (let i = 0; i < branchCount; i += 1) {
        const angle = (i / branchCount) * Math.PI * 2 + THREE.MathUtils.randFloatSpread(0.34);
        const length = THREE.MathUtils.randFloat(1.8, originIndex === 0 ? 5.8 : 3.7);
        const direction = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
        const mid = origin.clone().addScaledVector(direction, length * 0.48).add(new THREE.Vector3(THREE.MathUtils.randFloatSpread(0.35), 0, THREE.MathUtils.randFloatSpread(0.35)));
        const end = origin.clone().addScaledVector(direction, length).add(new THREE.Vector3(THREE.MathUtils.randFloatSpread(0.45), 0, THREE.MathUtils.randFloatSpread(0.45)));
        const curve = new THREE.CatmullRomCurve3([origin.clone(), mid, end]);
        const geometry = new THREE.TubeGeometry(curve, 8, originIndex === 0 ? 0.06 : 0.045, 4, false);
        const crack = new THREE.Mesh(geometry, i % 4 === 0 ? this.materials.riftHot : this.materials.rift);
        this.riftGroup.add(crack);
        this.disposables.push(geometry);
      }
    });

    const glowTexture = makeFogTexture();
    [
      [-0.3, 2.6, 0.7, 5.2, 7.0, 0.28],
      [0.8, 1.9, 2.3, 4.0, 5.4, 0.18],
      [4.3, 1.8, 0.0, 7.4, 5.6, 0.13]
    ].forEach(([x, y, z, sx, sy, opacity], index) => {
      const material = new THREE.SpriteMaterial({
        map: glowTexture,
        color: index === 0 ? 0xff6a1d : 0xff9a55,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        fog: false
      });
      const sprite = new THREE.Sprite(material);
      sprite.position.set(x, y, z);
      sprite.scale.set(sx, sy, 1);
      this.riftGroup.add(sprite);
      this.disposables.push(material);
    });
    this.disposables.push(glowTexture);

    const emberCount = this.mobile ? 110 : 170;
    const positions = new Float32Array(emberCount * 3);
    const base = new Float32Array(emberCount * 3);
    for (let i = 0; i < emberCount; i += 1) {
      const x = THREE.MathUtils.randFloat(-3.4, 8.0);
      const y = THREE.MathUtils.randFloat(0.05, 5.8);
      const z = THREE.MathUtils.randFloat(-5.8, 5.8);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;
    }

    const emberGeometry = new THREE.BufferGeometry();
    emberGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const emberMaterial = new THREE.PointsMaterial({
      color: 0xff6a1e,
      size: 0.145,
      transparent: true,
      opacity: 0.96,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    this.riftEmbers = new THREE.Points(emberGeometry, emberMaterial);
    this.riftEmbers.position.y = 0.03;
    this.riftGroup.add(this.riftEmbers);
    this.riftEmberBase = base;
    this.disposables.push(emberGeometry, emberMaterial);
  }

  createForest() {
    const trunkGeometry = new THREE.CylinderGeometry(0.12, 0.28, 8.5, 6);
    const branchGeometry = new THREE.CylinderGeometry(0.035, 0.075, 2.4, 5);
    this.disposables.push(trunkGeometry, branchGeometry);
    for (let i = 0; i < (this.mobile ? 27 : 34); i += 1) {
      const tree = new THREE.Group();
      let treeX;
      let treeZ;
      do {
        treeX = THREE.MathUtils.randFloat(-32, -19.2);
        treeZ = THREE.MathUtils.randFloat(-12, 12);
      } while (treeX > -26.0 && treeX < -20.2 && Math.abs(treeZ) < 6.4);
      tree.position.set(treeX, 0, treeZ);
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
        branch.rotation.z = THREE.MathUtils.randFloat(0.75, 1.2) * (Math.random() > 0.5 ? 1 : -1);
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

  createGroundFog() {
    const texture = makeFogTexture();
    const fogData = [
      [-23, 6.8, 12.5, 4.6, 0.14],
      [-17, 3.0, 11.8, 4.2, 0.12],
      [-11, -1.0, 12.8, 4.4, 0.13],
      [-5, 4.4, 13.2, 4.8, 0.11],
      [1, -2.1, 13.8, 4.8, 0.11],
      [8, 2.7, 12.4, 4.4, 0.10],
      [15, -0.8, 12.0, 4.2, 0.095],
      [21, 3.4, 11.2, 4.0, 0.09],
      [4, 6.6, 14.5, 4.6, 0.10]
    ];

    fogData.forEach(([x, z, sx, sy, speed], index) => {
      if (this.mobile && index % 2 === 1) return;
      const material = new THREE.SpriteMaterial({
        map: texture,
        color: index % 2 === 0 ? 0xc4ccd4 : 0xd6dde4,
        transparent: true,
        opacity: 0.12 + index * 0.008,
        depthWrite: false,
        depthTest: true,
        fog: true
      });
      const fog = new THREE.Sprite(material);
      fog.position.set(x, 0.7 + index * 0.025, z);
      fog.scale.set(sx, sy, 1);
      fog.renderOrder = 4;
      this.scene.add(fog);
      this.groundFog.push({
        mesh: fog,
        speed,
        phase: index * 1.7,
        baseZ: z,
        baseY: 0.7 + index * 0.025,
        baseOpacity: 0.12 + index * 0.008
      });
      this.disposables.push(material);
    });
    this.disposables.push(texture);
  }

  loadManor() {
    const model = this.assets.createManorClone();
    AssetLibrary.prepareModel(model);
    AssetLibrary.fitModelToHeight(model, 13.8, 0);

    const holder = new THREE.Group();
    holder.position.set(20.8, 0, -1.1);
    holder.add(model);
    this.scene.add(holder);

    holder.updateMatrixWorld(true);
    this.manorHolder = holder;
    this.manorBounds.setFromObject(holder);
    this.manorBarrierX = this.manorBounds.min.x - 0.12;

    this.createBraziers();
    this.createTurretMounts();
    this.createUpgradeVisuals();
    this.createManorDamageDust();
  }

  createBraziers() {
    for (const z of [-4.6, 4.6]) {
      const group = new THREE.Group();
      group.position.set(this.manorBarrierX - 1.0, 0, z);
      this.scene.add(group);

      const legGeometry = new THREE.CylinderGeometry(0.055, 0.075, 0.88, 7);
      for (let i = 0; i < 3; i += 1) {
        const leg = new THREE.Mesh(legGeometry, this.materials.iron);
        const angle = (i / 3) * Math.PI * 2;
        leg.position.set(Math.cos(angle) * 0.20, 0.48, Math.sin(angle) * 0.20);
        leg.rotation.z = Math.cos(angle) * 0.18;
        leg.rotation.x = Math.sin(angle) * 0.18;
        leg.castShadow = true;
        group.add(leg);
      }

      const bowlGeometry = new THREE.CylinderGeometry(0.38, 0.24, 0.20, 12, 1, true);
      const bowl = new THREE.Mesh(bowlGeometry, this.materials.iron);
      bowl.position.y = 0.96;
      bowl.castShadow = true;
      group.add(bowl);

      const rimGeometry = new THREE.TorusGeometry(0.37, 0.045, 6, 14);
      rimGeometry.rotateX(Math.PI / 2);
      const rim = new THREE.Mesh(rimGeometry, this.materials.iron);
      rim.position.y = 1.07;
      group.add(rim);

      const coalGeometry = new THREE.CylinderGeometry(0.25, 0.27, 0.08, 10);
      const coalMaterial = new THREE.MeshStandardMaterial({
        color: 0x2b1008,
        emissive: 0xff2e05,
        emissiveIntensity: 2.3,
        roughness: 0.8
      });
      const coal = new THREE.Mesh(coalGeometry, coalMaterial);
      coal.position.y = 1.08;
      group.add(coal);

      const flames = [];
      const flameData = [
        [-0.10, 1.43, 0.04, 0.22, 0.72, 0xff4b11],
        [0.10, 1.36, -0.04, 0.18, 0.58, 0xff8b2e],
        [0.00, 1.53, 0.01, 0.13, 0.46, 0xffd06a]
      ];
      flameData.forEach(([x, y, zz, radius, height, color], index) => {
        const geometry = new THREE.ConeGeometry(radius, height, 8);
        const material = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: index === 0 ? 0.78 : 0.92,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        const flame = new THREE.Mesh(geometry, material);
        flame.position.set(x, y, zz);
        group.add(flame);
        flames.push({ flame, phase: Math.random() * Math.PI * 2 });
        this.disposables.push(geometry, material);
      });

      const sparkCount = 12;
      const sparkPositions = new Float32Array(sparkCount * 3);
      const sparkBase = new Float32Array(sparkCount * 3);
      for (let i = 0; i < sparkCount; i += 1) {
        const idx = i * 3;
        const x = THREE.MathUtils.randFloatSpread(0.42);
        const y = THREE.MathUtils.randFloat(1.16, 2.55);
        const zz = THREE.MathUtils.randFloatSpread(0.42);
        sparkPositions[idx] = sparkBase[idx] = x;
        sparkPositions[idx + 1] = sparkBase[idx + 1] = y;
        sparkPositions[idx + 2] = sparkBase[idx + 2] = zz;
      }
      const sparkGeometry = new THREE.BufferGeometry();
      sparkGeometry.setAttribute("position", new THREE.BufferAttribute(sparkPositions, 3));
      const sparkMaterial = new THREE.PointsMaterial({
        color: 0xff8c37,
        size: 0.08,
        transparent: true,
        opacity: 0.88,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      const sparks = new THREE.Points(sparkGeometry, sparkMaterial);
      group.add(sparks);

      const light = new THREE.PointLight(0xff5516, 12, 8, 2);
      light.position.y = 1.34;
      group.add(light);
      this.flames.push({ flames, light, sparks, sparkBase, phase: Math.random() * Math.PI * 2 });
      this.disposables.push(legGeometry, bowlGeometry, rimGeometry, coalGeometry, coalMaterial, sparkGeometry, sparkMaterial);
    }
  }

  createManorDamageDust() {
    const texture = makeDamageDustTexture();
    this.disposables.push(texture);
    this.manorDustBursts = [];

    for (let burstIndex = 0; burstIndex < 12; burstIndex += 1) {
      const group = new THREE.Group();
      group.visible = false;
      this.scene.add(group);
      const puffs = [];
      for (let i = 0; i < 7; i += 1) {
        const material = new THREE.SpriteMaterial({
          map: texture,
          color: i % 2 ? 0xc8b7a4 : 0xa49589,
          transparent: true,
          opacity: 0,
          depthWrite: false,
          depthTest: false,
          fog: true
        });
        const sprite = new THREE.Sprite(material);
        sprite.position.set(0, 0, 0);
        sprite.scale.set(1.0, 0.72, 1);
        group.add(sprite);
        puffs.push({
          sprite,
          material,
          offsetX: THREE.MathUtils.randFloat(-0.38, 0.32),
          offsetY: THREE.MathUtils.randFloat(0.08, 0.85),
          offsetZ: THREE.MathUtils.randFloatSpread(0.9),
          grow: THREE.MathUtils.randFloat(1.15, 1.65)
        });
        this.disposables.push(material);
      }
      this.manorDustBursts.push({ group, puffs, timer: 0, duration: 0.9, active: false });
    }
  }

  triggerManorDamageDust(position, enemyType = "husk") {
    if (!position || this.manorDustBursts.length === 0) return;
    const burst = this.manorDustBursts.find((item) => !item.active) ?? this.manorDustBursts[0];
    const heavy = enemyType === "brute" || enemyType === "siege";
    burst.active = true;
    burst.timer = burst.duration;
    burst.scaleMultiplier = heavy ? 1.45 : 1.18;
    burst.opacityMultiplier = heavy ? 1.0 : 0.88;
    burst.group.visible = true;
    burst.group.position.set(
      position.x + 0.24,
      heavy ? 1.30 : 0.95,
      THREE.MathUtils.clamp(position.z, this.manorBounds.min.z + 0.5, this.manorBounds.max.z - 0.5)
    );
    burst.puffs.forEach(({ sprite, material, offsetX, offsetY, offsetZ }, index) => {
      sprite.position.set(offsetX, offsetY, offsetZ);
      const scale = (heavy ? 1.72 : 1.34) * (0.72 + index * 0.075);
      sprite.scale.set(scale, scale * 0.72, 1);
      material.opacity = heavy ? 0.86 : 0.76;
    });
  }

  createTurretMounts() {
    const extractionY = Math.min(this.manorBounds.max.y * 0.58, 7.45);
    const baseY = extractionY - 1.15;
    const fixedX = this.manorBarrierX + 0.58;
    const zPositions = [-1.75, -0.15, 1.45];

    for (let i = 0; i < 3; i += 1) {
      const mount = new THREE.Group();
      mount.position.set(
        fixedX,
        baseY,
        zPositions[i]
      );
      mount.rotation.y = -Math.PI / 2;
      mount.scale.setScalar(0.94);
      mount.visible = false;
      this.scene.add(mount);

      const pivot = new THREE.Group();
      mount.add(pivot);

      const bracketGeometry = new THREE.BoxGeometry(0.22, 0.28, 1.2);
      const bracketMaterial = new THREE.MeshStandardMaterial({
        color: 0x22140f,
        roughness: 0.82,
        metalness: 0.05
      });
      const bracket = new THREE.Mesh(bracketGeometry, bracketMaterial);
      bracket.position.set(0, -0.26, 0.14);
      bracket.castShadow = true;
      pivot.add(bracket);

      const wallPlateGeometry = new THREE.BoxGeometry(0.10, 0.62, 0.52);
      const wallPlate = new THREE.Mesh(wallPlateGeometry, this.materials.iron);
      wallPlate.position.set(0, -0.12, 0.82);
      wallPlate.castShadow = true;
      pivot.add(wallPlate);

      const stockGeometry = new THREE.BoxGeometry(0.20, 0.18, 1.72);
      const stockMaterial = new THREE.MeshStandardMaterial({
        color: 0x2c1710,
        roughness: 0.76,
        metalness: 0.06
      });
      const stock = new THREE.Mesh(stockGeometry, stockMaterial);
      stock.position.z = 0.10;
      stock.castShadow = true;
      pivot.add(stock);

      const railGeometry = new THREE.BoxGeometry(0.08, 0.08, 1.95);
      const rail = new THREE.Mesh(railGeometry, this.materials.iron);
      rail.position.set(0, 0.12, 0.02);
      rail.castShadow = true;
      pivot.add(rail);

      const bowCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.9, 0.03, -0.58),
        new THREE.Vector3(-0.42, 0.12, -0.76),
        new THREE.Vector3(0, 0.18, -0.82),
        new THREE.Vector3(0.42, 0.12, -0.76),
        new THREE.Vector3(0.9, 0.03, -0.58)
      ]);
      const bowGeometry = new THREE.TubeGeometry(bowCurve, 18, 0.055, 6, false);
      const bow = new THREE.Mesh(bowGeometry, this.materials.iron);
      bow.castShadow = true;
      pivot.add(bow);

      const stringGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-0.9, 0.03, -0.58),
        new THREE.Vector3(0, 0.17, -0.08),
        new THREE.Vector3(0.9, 0.03, -0.58)
      ]);
      const stringMaterial = new THREE.LineBasicMaterial({
        color: 0xd2c0b2,
        transparent: true,
        opacity: 0.8
      });
      const string = new THREE.Line(stringGeometry, stringMaterial);
      pivot.add(string);

      const spikeGeometry = new THREE.ConeGeometry(0.09, 0.34, 6);
      for (const side of [-1, 1]) {
        const spike = new THREE.Mesh(spikeGeometry, this.materials.iron);
        spike.position.set(side * 0.92, 0.03, -0.58);
        spike.rotation.z = side * Math.PI / 2;
        spike.castShadow = true;
        pivot.add(spike);
      }

      const emberGeometry = new THREE.IcosahedronGeometry(0.11, 1);
      const ember = new THREE.Mesh(emberGeometry, this.materials.ember);
      ember.position.set(0, 0.14, -0.52);
      pivot.add(ember);

      const emberLight = new THREE.PointLight(0xff4b13, 6.5, 4.5, 2);
      emberLight.position.copy(ember.position);
      pivot.add(emberLight);

      const muzzle = new THREE.Object3D();
      muzzle.position.set(0, 0.12, -1.02);
      pivot.add(muzzle);

      this.turretMounts.push({
        group: mount,
        pivot,
        muzzle,
        ember,
        light: emberLight,
        phase: i * 1.2
      });

      this.disposables.push(
        bracketGeometry,
        bracketMaterial,
        wallPlateGeometry,
        stockGeometry,
        stockMaterial,
        railGeometry,
        bowGeometry,
        stringGeometry,
        stringMaterial,
        spikeGeometry,
        emberGeometry
      );
    }
  }

  createUpgradeVisuals() {
    // Soul Extraction: the whole manor roof becomes the target. A captured
    // demon disappears immediately and a wide column of light remains active
    // for a short conversion cycle. This makes the mechanic readable even on
    // mobile without requiring a tiny drop target.
    const extraction = new THREE.Group();
    const extractionY = Math.min(this.manorBounds.max.y * 0.58, 7.45);
    // Bring the target forward to the manor facade and stretch it across the
    // roof/front edge so the intended drop zone reads immediately.
    extraction.position.set(this.manorBarrierX + 0.48, extractionY, -0.15);
    extraction.visible = false;
    this.scene.add(extraction);
    this.extractionGroup = extraction;
    this.extractionCentre.copy(extraction.position);

    const portalTexture = makeExtractionPortalTexture();
    const portalMaterial = new THREE.SpriteMaterial({
      map: portalTexture,
      color: 0xffc27e,
      transparent: true,
      opacity: 0.94,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: true,
      fog: false
    });
    const portal = new THREE.Sprite(portalMaterial);
    portal.position.set(0, 0.15, 0);
    portal.scale.set(8.8, 3.25, 1);
    extraction.add(portal);

    const portalHaloMaterial = new THREE.SpriteMaterial({
      map: portalTexture,
      color: 0xff6b24,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: true,
      fog: false
    });
    const portalHalo = new THREE.Sprite(portalHaloMaterial);
    portalHalo.position.copy(portal.position);
    portalHalo.scale.set(10.2, 4.2, 1);
    extraction.add(portalHalo);

    const extractionLight = new THREE.PointLight(0xffa14f, 26, 18, 1.8);
    extractionLight.position.set(0, 0.6, 0);
    extraction.add(extractionLight);

    this.extractionBeams = [];
    for (let slot = 0; slot < CONFIG.extraction.maxConcurrent; slot += 1) {
      const beamGroup = new THREE.Group();
      const slotOffsets = [-1.25, 0, 1.25];
      beamGroup.position.copy(
        this.extractionCentre.clone().add(new THREE.Vector3(slotOffsets[slot] ?? 0, 0, 0))
      );
      // Keep the group itself present from startup so its PointLight is always
      // part of the renderer's light set. Only the visible beam meshes toggle.
      // This prevents a first-binding shader recompile hitch.
      beamGroup.visible = true;
      this.scene.add(beamGroup);

      const beamGeometry = new THREE.CylinderGeometry(0.48, 2.25, 13.5, 18, 1, true);
      const beamMaterial = new THREE.MeshBasicMaterial({
        color: 0xfff1c9,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      const beam = new THREE.Mesh(beamGeometry, beamMaterial);
      beam.position.y = 6.55;
      beam.visible = false;
      beamGroup.add(beam);

      const innerGeometry = new THREE.CylinderGeometry(0.18, 0.92, 14.0, 12, 1, true);
      const innerMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      const inner = new THREE.Mesh(innerGeometry, innerMaterial);
      inner.position.y = 6.8;
      inner.visible = false;
      beamGroup.add(inner);

      const particleCount = 20;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i += 1) {
        const idx = i * 3;
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 1.3;
        positions[idx] = Math.cos(angle) * radius;
        positions[idx + 1] = Math.random() * 10;
        positions[idx + 2] = Math.sin(angle) * radius;
      }
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMaterial = new THREE.PointsMaterial({
        color: 0xffe0a8,
        size: 0.13,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      particles.visible = false;
      beamGroup.add(particles);

      const beamLight = new THREE.PointLight(0xffd69b, 0, 12, 1.8);
      beamLight.position.y = 2.8;
      beamGroup.add(beamLight);

      this.extractionBeams.push({
        group: beamGroup,
        beam,
        inner,
        particles,
        light: beamLight,
        timer: 0,
        duration: CONFIG.extraction.duration,
        active: false,
        phase: slot * 1.8
      });
      this.disposables.push(beamGeometry, beamMaterial, innerGeometry, innerMaterial, particleGeometry, particleMaterial);
    }

    this.upgradeGroups.extraction = {
      group: extraction,
      portal,
      portalHalo,
      portalMaterial,
      portalHaloMaterial,
      portalTexture,
      light: extractionLight
    };

    // Hell Bomb Forge: user-supplied shed model in the same position as the
    // old placeholder box, rotated 90 degrees clockwise from a camera-facing
    // source orientation.
    const demolition = new THREE.Group();
    demolition.position.set(this.manorBarrierX + 1.10, 0, 2.85);
    demolition.visible = false;
    this.scene.add(demolition);

    const shed = this.assets.createShedClone();
    AssetLibrary.prepareModel(shed);
    AssetLibrary.fitModelToHeight(shed, 2.45, -Math.PI / 2);
    shed.traverse((object) => {
      if (!object.isMesh || !object.material) return;
      const darken = (material) => {
        const clone = material.clone();
        clone.color?.multiplyScalar?.(0.28);
        if (clone.emissive) clone.emissiveIntensity = Math.min(clone.emissiveIntensity ?? 0, 0.06);
        return clone;
      };
      object.material = Array.isArray(object.material) ? object.material.map(darken) : darken(object.material);
    });
    demolition.add(shed);

    const shedGlow = new THREE.PointLight(0x7a2118, 1.15, 3.6, 2);
    shedGlow.position.set(0, 1.15, 0);
    demolition.add(shedGlow);
    this.upgradeGroups.demolition = { group: demolition, shed, light: shedGlow };

    // Undercroft: visible amber braces and repair framework around the manor base.
    const undercroft = new THREE.Group();
    undercroft.visible = false;
    this.scene.add(undercroft);
    const braceGeometry = new THREE.BoxGeometry(0.16, 2.4, 0.16);
    const braceMaterial = new THREE.MeshStandardMaterial({
      color: 0x3c2818,
      roughness: 0.9,
      emissive: 0x6b3510,
      emissiveIntensity: 0.25
    });
    [-4.1, -1.4, 1.4, 4.1].forEach((z, index) => {
      const brace = new THREE.Mesh(braceGeometry, braceMaterial);
      brace.position.set(this.manorBarrierX + 0.25, 1.2, z);
      brace.rotation.z = index % 2 ? -0.18 : 0.18;
      undercroft.add(brace);
    });
    this.upgradeGroups.undercroft = { group: undercroft };

    // Occult system: glowing rings/orb over the manor rather than a separate building.
    const occult = new THREE.Group();
    occult.position.set(this.manorBarrierX + 3.7, Math.min(this.manorBounds.max.y + 1.1, 13.5), -0.7);
    occult.visible = false;
    this.scene.add(occult);
    const occultOrbGeometry = new THREE.IcosahedronGeometry(0.36, 2);
    const occultOrbMaterial = new THREE.MeshBasicMaterial({
      color: 0x9b63ff,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const occultOrb = new THREE.Mesh(occultOrbGeometry, occultOrbMaterial);
    occult.add(occultOrb);
    const occultRingGeometry = new THREE.TorusGeometry(0.72, 0.035, 7, 40);
    const occultRingMaterial = occultOrbMaterial.clone();
    occultRingMaterial.opacity = 0.58;
    const occultRingA = new THREE.Mesh(occultRingGeometry, occultRingMaterial);
    occult.add(occultRingA);
    const occultRingB = new THREE.Mesh(occultRingGeometry, occultRingMaterial.clone());
    occultRingB.rotation.x = Math.PI / 2;
    occult.add(occultRingB);
    this.upgradeGroups.occult = { group: occult, orb: occultOrb, ringA: occultRingA, ringB: occultRingB };

    // Pooled purple ground-fire strikes. These are deliberately flames rather
    // than circles so the Occult system is obvious in motion.
    this.occultStrikes = [];
    for (let strikeIndex = 0; strikeIndex < 3; strikeIndex += 1) {
      const group = new THREE.Group();
      // Keep the parent/light in the scene at all times so the renderer sees a
      // stable light count. Only the flame meshes toggle for the one-second hit.
      group.visible = true;
      this.scene.add(group);
      const flames = [];
      for (let i = 0; i < 12; i += 1) {
        const geometry = new THREE.ConeGeometry(0.34 + (i % 3) * 0.07, 1.10 + (i % 2) * 0.58, 8);
        const material = new THREE.MeshBasicMaterial({
          color: i % 2 ? 0xd4a6ff : 0x9c5cff,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        const flame = new THREE.Mesh(geometry, material);
        flame.visible = false;
        const angle = (i / 12) * Math.PI * 2;
        const radius = i < 4 ? 0.82 : i < 8 ? 1.55 : 2.20;
        flame.position.set(Math.cos(angle) * radius, 0.52, Math.sin(angle) * radius);
        group.add(flame);
        flames.push(flame);
        this.disposables.push(geometry, material);
      }
      const light = new THREE.PointLight(0xb16cff, 0, 11.5, 1.8);
      light.position.y = 0.9;
      group.add(light);
      this.occultStrikes.push({ group, flames, light, timer: 0, active: false, phase: strikeIndex * 0.9 });
    }

    // Late-game Overcharge: a one-wave supernatural force field around the manor.
    // It is created during startup and only toggled at runtime, avoiding a
    // first-use allocation hitch in Waves 40-50.
    const shieldGeometry = new THREE.SphereGeometry(1, 32, 20);
    const shieldMaterial = new THREE.MeshBasicMaterial({
      color: 0xff5a2d,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    const manorHeight = Math.max(8, this.manorBounds.max.y - this.manorBounds.min.y);
    const manorDepth = Math.max(8, this.manorBounds.max.z - this.manorBounds.min.z);
    shield.position.set(this.manorBarrierX + 2.25, this.manorBounds.min.y + manorHeight * 0.50, (this.manorBounds.min.z + this.manorBounds.max.z) * 0.5);
    shield.scale.set(3.7, manorHeight * 0.60, manorDepth * 0.61);
    shield.visible = false;
    this.scene.add(shield);
    this.overchargeShield = { mesh: shield, material: shieldMaterial };
    this.disposables.push(shieldGeometry, shieldMaterial);

    // Fortification stages: simple readable additions that accumulate around the manor.
    const fortifyStage1 = new THREE.Group();
    const stakeGeometry = new THREE.ConeGeometry(0.12, 0.75, 6);
    [-4.7, -3.0, -1.3, 1.3, 3.0, 4.7].forEach((z) => {
      const stake = new THREE.Mesh(stakeGeometry, this.materials.iron);
      stake.position.set(this.manorBarrierX - 0.45, 0.38, z);
      fortifyStage1.add(stake);
    });
    fortifyStage1.visible = false;
    this.scene.add(fortifyStage1);

    const fortifyStage2 = new THREE.Group();
    const beamGeometry = new THREE.BoxGeometry(0.18, 0.22, 2.1);
    [-3.7, -1.2, 1.2, 3.7].forEach((z, index) => {
      const beam = new THREE.Mesh(beamGeometry, this.materials.iron);
      beam.position.set(this.manorBarrierX + 0.05, 1.6 + (index % 2) * 0.5, z);
      beam.rotation.x = index % 2 ? 0.12 : -0.12;
      fortifyStage2.add(beam);
    });
    fortifyStage2.visible = false;
    this.scene.add(fortifyStage2);

    const fortifyStage3 = new THREE.Group();
    const wardGeometry = new THREE.RingGeometry(0.45, 0.54, 24);
    const wardMaterial = new THREE.MeshBasicMaterial({
      color: 0xff7a32,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    [-2.6, 0, 2.6].forEach((z) => {
      const ward = new THREE.Mesh(wardGeometry, wardMaterial);
      ward.position.set(this.manorBarrierX - 0.02, 2.8, z);
      ward.rotation.y = Math.PI / 2;
      fortifyStage3.add(ward);
    });
    fortifyStage3.visible = false;
    this.scene.add(fortifyStage3);
    this.fortifyGroups = [fortifyStage1, fortifyStage2, fortifyStage3];

    this.disposables.push(
      portalTexture, portalMaterial, portalHaloMaterial,
      braceGeometry, braceMaterial, occultOrbGeometry, occultOrbMaterial,
      occultRingGeometry, occultRingMaterial, occultRingB.material,
      stakeGeometry, beamGeometry, wardGeometry, wardMaterial
    );
  }

  setUpgradeState({ extraction = false, extractionLevel = 0, demolition = false, undercroft = false, occult = false, fortifyLevel = 0 } = {}) {
    this.extractionCapacity = extraction ? THREE.MathUtils.clamp(extractionLevel || 1, 1, CONFIG.extraction.maxLevel) : 0;
    if (this.upgradeGroups.extraction) this.upgradeGroups.extraction.group.visible = extraction;
    if (!extraction) {
      this.extractionBeams.forEach((slot) => {
        slot.active = false;
        slot.timer = 0;
        // Keep the group/light present with zero intensity. Removing a PointLight
        // from the visible scene can force a new shader/light-count variant on
        // the first real binding, which is exactly the hitch we want to avoid.
        slot.group.visible = true;
        slot.beam.visible = false;
        slot.inner.visible = false;
        slot.particles.visible = false;
        slot.beam.material.opacity = 0;
        slot.inner.material.opacity = 0;
        slot.particles.material.opacity = 0;
        slot.light.intensity = 0;
      });
    }
    if (this.upgradeGroups.demolition) this.upgradeGroups.demolition.group.visible = demolition;
    if (this.upgradeGroups.undercroft) this.upgradeGroups.undercroft.group.visible = undercroft;
    if (this.upgradeGroups.occult) this.upgradeGroups.occult.group.visible = occult;
    this.fortifyGroups.forEach((group, index) => {
      group.visible = fortifyLevel >= [1, 4, 8][index];
    });
  }

  isInsideExtractionZone(position) {
    if (!this.extractionGroup?.visible) return false;
    // Depth-independent roof target: only screen-like horizontal/vertical
    // placement matters, so foreground/background Z never prevents capture.
    return (
      position.x >= this.manorBarrierX - 3.1 &&
      position.x <= this.manorBounds.max.x + 2.5 &&
      position.y >= this.manorBounds.max.y * 0.16 &&
      position.y <= this.manorBounds.max.y + 7.0
    );
  }

  getAvailableExtractionSlot(capacity = this.extractionCapacity) {
    const limit = THREE.MathUtils.clamp(capacity || 1, 1, CONFIG.extraction.maxLevel);
    return this.extractionBeams.slice(0, limit).findIndex((slot) => !slot.active);
  }

  startExtractionBeam(capacity = this.extractionCapacity) {
    if (!this.extractionGroup?.visible) return -1;
    const slotIndex = this.getAvailableExtractionSlot(capacity);
    if (slotIndex < 0) return -1;
    const slot = this.extractionBeams[slotIndex];
    slot.active = true;
    slot.timer = slot.duration;
    slot.group.visible = true;
    slot.beam.visible = true;
    slot.inner.visible = true;
    slot.particles.visible = true;
    slot.beam.material.opacity = 0.02;
    slot.inner.material.opacity = 0.02;
    slot.particles.material.opacity = 0.02;
    slot.light.intensity = 5;
    return slotIndex;
  }

  getActiveExtractionCount() {
    return this.extractionBeams.reduce((count, slot) => count + (slot.active ? 1 : 0), 0);
  }

  consumeExtractionCompletions() {
    const count = this.extractionCompletions;
    this.extractionCompletions = 0;
    return count;
  }

  triggerOccultStrike(position) {
    const strike = this.occultStrikes.find((item) => !item.active) ?? this.occultStrikes[0];
    if (!strike) return;
    strike.active = true;
    strike.timer = 1.05;
    strike.group.visible = true;
    strike.group.position.copy(position).setY(0.04);
    strike.flames.forEach((flame, index) => {
      flame.visible = true;
      flame.material.opacity = 0.72;
      flame.scale.setScalar(0.75 + index * 0.05);
    });
    strike.light.intensity = 15;
  }

  pulseOccultEffect() {
    this.occultPulseTimer = 0.65;
  }

  setOverchargeActive(active) {
    this.overchargeActive = !!active;
    this.overchargeHitPulse = 0;
    if (!this.overchargeShield) return;
    this.overchargeShield.mesh.visible = this.overchargeActive;
    this.overchargeShield.material.opacity = this.overchargeActive ? 0.10 : 0;
  }

  pulseOverchargeShield() {
    if (!this.overchargeActive) return;
    this.overchargeHitPulse = 0.34;
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
    mount.muzzle.getWorldPosition(origin);
    return origin;
  }

  aimTurret(index, target) {
    const mount = this.turretMounts[index];
    if (!mount || !target) return;

    const localTarget = target.clone();
    mount.group.worldToLocal(localTarget);
    const yaw = Math.atan2(localTarget.x, -localTarget.z);
    const horizontal = Math.hypot(localTarget.x, localTarget.z);
    const pitch = -Math.atan2(localTarget.y, Math.max(horizontal, 0.001));

    mount.pivot.rotation.y = THREE.MathUtils.clamp(yaw, -0.42, 0.42);
    mount.pivot.rotation.x = THREE.MathUtils.clamp(pitch, -0.25, 0.28);
  }

  triggerRedLightning() {
    if (!this.lightningBolt || this.dawnActive || this.victoryClosing) return;
    const points = this.lightningBolt.attribute.array;
    const startX = THREE.MathUtils.randFloat(-20, 7);
    const endY = THREE.MathUtils.randFloat(7.8, 10.5);
    const topY = THREE.MathUtils.randFloat(25, 29);
    const baseZ = THREE.MathUtils.randFloat(-38, -33);
    for (let i = 0; i < 14; i += 1) {
      const t = i / 13;
      const taper = Math.sin(t * Math.PI);
      points[i * 3] = startX + THREE.MathUtils.randFloatSpread(2.8) * taper + t * THREE.MathUtils.randFloat(-2.4, 2.4);
      points[i * 3 + 1] = THREE.MathUtils.lerp(topY, endY, t);
      points[i * 3 + 2] = baseZ + THREE.MathUtils.randFloatSpread(0.7);
    }
    this.lightningBolt.attribute.needsUpdate = true;
    this.lightningBolt.line.visible = true;
    this.lightningBolt.material.opacity = 1;
    this.lightningTimer = 0.46;
    if (this.lightningLight) {
      this.lightningLight.position.set(startX, 17, -15);
      this.lightningLight.intensity = 22;
    }
  }

  setHellVisualTarget(target, duration = 0) {
    this.hellVisualTarget = THREE.MathUtils.clamp(target, 0, 1);
    if (duration <= 0) {
      this.hellVisualStrength = this.hellVisualTarget;
      this.hellVisualTransitionRate = 0;
      this.applyHellVisualStrength(this.hellVisualStrength);
      return;
    }
    this.hellVisualTransitionRate = Math.abs(this.hellVisualTarget - this.hellVisualStrength) / Math.max(0.01, duration);
    if (this.ngPlusEmbers && this.hellVisualTarget > 0) this.ngPlusEmbers.visible = true;
    if (this.ngPlusSkyGlow && this.hellVisualTarget > 0) this.ngPlusSkyGlow.visible = true;
  }

  setLateGameVisualMode(enabled, duration = 0) {
    this.lateGameVisualMode = !!enabled;
    this.setHellVisualTarget(this.newGamePlus || this.lateGameVisualMode ? 1 : 0, duration);
  }

  applyHellVisualStrength(strength = this.hellVisualStrength) {
    const value = THREE.MathUtils.clamp(strength, 0, 1);
    if (this.dawnActive) return;
    if (this.scene.background?.isColor) this.scene.background.copy(this.normalNightColor).lerp(this.hellNightColor, value);
    if (this.scene.fog?.color) {
      this.scene.fog.color.copy(this.normalFogColor).lerp(this.hellFogColor, value);
      this.scene.fog.density = THREE.MathUtils.lerp(0.018, 0.020, value);
    }
    if (this.ngPlusEmbers) {
      this.ngPlusEmbers.visible = value > 0.01;
      this.ngPlusEmbers.material.opacity = 0.88 * value;
    }
    if (this.ngPlusSkyGlow) {
      this.ngPlusSkyGlow.visible = value > 0.01;
      this.ngPlusSkyGlow.material.opacity = 0.42 * value;
    }
    if (this.riftGroup && !this.victoryClosing) {
      const scale = THREE.MathUtils.lerp(1, 1.34, value);
      this.riftGroup.scale.set(scale, 1, scale);
    }
    if (!this.victoryClosing) {
      if (this.riftLight) this.riftLight.intensity = THREE.MathUtils.lerp(92, 155, value);
      if (this.riftWalkLight) this.riftWalkLight.intensity = THREE.MathUtils.lerp(38, 74, value);
      if (this.hellGlow) this.hellGlow.intensity = THREE.MathUtils.lerp(33, 48, value);
    }
  }

  setNewGamePlusMode(enabled) {
    this.newGamePlus = !!enabled;
    this.setHellVisualTarget(this.newGamePlus || this.lateGameVisualMode ? 1 : 0, 0);
    this.resetNight();
  }

  startVictorySequence() {
    if (this.victoryClosing || this.dawnActive) return;
    this.victoryClosing = true;
    this.victoryTimer = 0;
    this.victoryDawnStarted = false;
    this.setOverchargeActive(false);
    this.setHellVisualTarget(0, 3.6);
  }

  prepareDawnAssets() {
    if (!this.dawnSun) {
      const sunCanvas = document.createElement("canvas");
      sunCanvas.width = 192;
      sunCanvas.height = 192;
      const ctx = sunCanvas.getContext("2d");
      const gradient = ctx.createRadialGradient(96, 96, 18, 96, 96, 92);
      gradient.addColorStop(0, "rgba(255,246,196,1)");
      gradient.addColorStop(0.48, "rgba(255,196,119,.96)");
      gradient.addColorStop(0.72, "rgba(255,145,87,.42)");
      gradient.addColorStop(1, "rgba(255,124,72,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 192, 192);
      const sunTexture = new THREE.CanvasTexture(sunCanvas);
      sunTexture.colorSpace = THREE.SRGBColorSpace;
      const sunMaterial = new THREE.SpriteMaterial({
        map: sunTexture,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        fog: false
      });
      this.dawnSun = new THREE.Sprite(sunMaterial);
      this.dawnSun.position.set(-8.5, 1.0, -35);
      this.dawnSun.scale.set(7.4, 7.4, 1);
      this.dawnSun.visible = false;
      this.scene.add(this.dawnSun);
      this.disposables.push(sunTexture, sunMaterial);
    }

    if (!this.dawnLight) {
      this.dawnLight = new THREE.DirectionalLight(0xffd09a, 0);
      this.dawnLight.position.set(-14, 16, 12);
      this.dawnLight.visible = false;
      this.scene.add(this.dawnLight);
    }

    this.createDawnBirds();
    this.dawnBirds.forEach((bird) => {
      bird.sprite.visible = false;
      bird.sprite.material.opacity = 0;
    });
  }

  setDawnPrewarmVisible(visible) {
    this.prepareDawnAssets();
    if (this.dawnSun) {
      this.dawnSun.visible = visible;
      this.dawnSun.material.opacity = visible ? 0.85 : 0;
      this.dawnSun.position.set(-8.5, 8.0, -35);
    }
    if (this.dawnLight) {
      this.dawnLight.visible = visible;
      this.dawnLight.intensity = visible ? 2.2 : 0;
    }
    this.dawnBirds.forEach((bird, index) => {
      bird.sprite.visible = visible;
      bird.sprite.material.opacity = visible ? 0.62 : 0;
      bird.sprite.position.set(-19 + index * 4.5, 12.5 + (index % 2), -29 + index * 0.5);
    });
  }

  resetTransientEffects() {
    this.extractionBeams.forEach((slot) => {
      slot.active = false;
      slot.timer = 0;
      slot.group.visible = true;
      slot.beam.visible = false;
      slot.inner.visible = false;
      slot.particles.visible = false;
      slot.beam.material.opacity = 0;
      slot.inner.material.opacity = 0;
      slot.particles.material.opacity = 0;
      slot.light.intensity = 0;
    });
    this.occultStrikes.forEach((strike) => {
      strike.active = false;
      strike.timer = 0;
      strike.group.visible = true;
      strike.light.intensity = 0;
      strike.flames.forEach((flame) => {
        flame.visible = false;
        flame.material.opacity = 0;
      });
    });
    this.manorDustBursts?.forEach((burst) => {
      burst.active = false;
      burst.timer = 0;
      burst.group.visible = false;
      burst.puffs.forEach(({ material }) => { material.opacity = 0; });
    });
    this.setDawnPrewarmVisible(false);
    this.setOverchargeActive(false);
    this.extractionCompletions = 0;
  }

  createDawnBirds() {
    if (this.dawnBirds.length > 0) {
      this.dawnBirds.forEach((bird) => { bird.sprite.visible = true; bird.progress = -bird.delay; });
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = 96;
    canvas.height = 48;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 96, 48);
    ctx.strokeStyle = "rgba(25,23,22,.88)";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(8, 28); ctx.quadraticCurveTo(24, 12, 45, 26);
    ctx.moveTo(45, 26); ctx.quadraticCurveTo(66, 10, 88, 27);
    ctx.stroke();
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    for (let i = 0; i < 5; i += 1) {
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0, depthWrite: false, fog: false });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(1.15 + i * 0.12, 0.56 + i * 0.05, 1);
      sprite.position.set(-28 - i * 2, 13 + (i % 3) * 1.1, -29 + i * 0.5);
      this.scene.add(sprite);
      this.dawnBirds.push({ sprite, delay: 1.6 + i * 0.85, progress: -(1.6 + i * 0.85), baseY: sprite.position.y });
      this.disposables.push(material);
    }
    this.disposables.push(texture);
  }

  resetNight() {
    this.victoryClosing = false;
    this.victoryTimer = 0;
    this.victoryDawnStarted = false;
    this.dawnActive = false;
    this.dawnProgress = 0;
    this.scene.background.copy(this.normalNightColor).lerp(this.hellNightColor, this.hellVisualStrength);
    if (this.scene.fog?.color) {
      this.scene.fog.color.copy(this.normalFogColor).lerp(this.hellFogColor, this.hellVisualStrength);
      this.scene.fog.density = THREE.MathUtils.lerp(0.018, 0.020, this.hellVisualStrength);
    }
    if (this.riftGroup) {
      this.riftGroup.visible = true;
      const scale = THREE.MathUtils.lerp(1, 1.34, this.hellVisualStrength);
      this.riftGroup.scale.set(scale, 1, scale);
    }
    this.materials.rift.opacity = 0.86;
    this.materials.riftHot.opacity = 0.96;
    if (this.riftEmbers?.material) this.riftEmbers.material.opacity = 0.96;
    this.riftFlames?.forEach(({ outer, inner, light }) => {
      outer.material.opacity = 0.72;
      inner.material.opacity = 0.88;
      outer.visible = true;
      inner.visible = true;
      light.intensity = 10;
    });
    if (this.ngPlusEmbers) {
      this.ngPlusEmbers.visible = this.hellVisualStrength > 0.01;
      this.ngPlusEmbers.material.opacity = 0.88 * this.hellVisualStrength;
    }
    if (this.ngPlusSkyGlow) {
      this.ngPlusSkyGlow.visible = this.hellVisualStrength > 0.01;
      this.ngPlusSkyGlow.material.opacity = 0.42 * this.hellVisualStrength;
    }
    if (this.moon?.material) this.moon.material.opacity = 0.78;
    if (this.stars?.material) this.stars.material.opacity = 0.86;
    if (this.moonLight) this.moonLight.intensity = 3.25;
    if (this.rimLight) this.rimLight.intensity = 1.2;
    if (this.huskFillLight) this.huskFillLight.intensity = 0.75;
    if (this.riftLight) this.riftLight.intensity = THREE.MathUtils.lerp(92, 155, this.hellVisualStrength);
    if (this.riftWalkLight) this.riftWalkLight.intensity = THREE.MathUtils.lerp(38, 74, this.hellVisualStrength);
    if (this.hellGlow) this.hellGlow.intensity = THREE.MathUtils.lerp(33, 48, this.hellVisualStrength);

    this.flames.forEach(({ flames, light, sparks }) => {
      flames?.forEach(({ flame }) => { flame.visible = true; });
      if (sparks) sparks.visible = true;
      if (light) light.intensity = 12;
    });

    this.dawnBirds.forEach((bird) => { bird.sprite.visible = false; bird.sprite.material.opacity = 0; });

    this.prepareDawnAssets();
    if (this.dawnSun) {
      this.dawnSun.visible = false;
      this.dawnSun.material.opacity = 0;
      this.dawnSun.position.set(-8.5, 1.0, -35);
    }
    if (this.dawnLight) {
      this.dawnLight.visible = false;
      this.dawnLight.intensity = 0;
    }
    this.occultStrikes.forEach((strike) => {
      strike.active = false;
      strike.timer = 0;
      strike.group.visible = true;
      strike.light.intensity = 0;
      strike.flames.forEach((flame) => {
        flame.visible = false;
        flame.material.opacity = 0;
      });
    });
  }

  startDawn() {
    if (this.dawnActive) return;
    this.dawnActive = true;
    this.dawnProgress = 0;

    // All night-time fortifications and supernatural systems fade with the
    // victory state so the manor is visually clean at sunrise.
    this.turretMounts.forEach((mount) => { mount.group.visible = false; });
    Object.values(this.upgradeGroups).forEach((upgrade) => {
      if (upgrade?.group) upgrade.group.visible = false;
    });
    this.fortifyGroups.forEach((group) => { group.visible = false; });
    this.extractionBeams.forEach((slot) => {
      slot.active = false;
      slot.group.visible = false;
    });
    this.occultStrikes.forEach((strike) => {
      strike.active = false;
      strike.group.visible = false;
    });

    // By the time dawn starts, the Hell Gate collapse sequence has completed.
    if (this.riftGroup) this.riftGroup.visible = false;
    if (this.riftLight) this.riftLight.intensity = 0;
    if (this.riftWalkLight) this.riftWalkLight.intensity = 0;
    if (this.ngPlusEmbers) this.ngPlusEmbers.visible = false;
    if (this.ngPlusSkyGlow) this.ngPlusSkyGlow.visible = false;

    // Extinguish the two manor braziers while leaving their metal stands.
    this.flames.forEach(({ flames, light, sparks }) => {
      flames?.forEach(({ flame }) => { flame.visible = false; });
      if (sparks) sparks.visible = false;
      if (light) light.intensity = 0;
    });

    // Dawn visuals are created during the initial loading screen so the ending
    // transition only changes visibility/intensity instead of allocating new GPU assets.
    this.prepareDawnAssets();
    this.dawnSun.visible = true;
    this.dawnSun.material.opacity = 0;
    this.dawnSun.position.set(-8.5, 1.0, -35);
    this.dawnLight.visible = true;
    this.dawnLight.intensity = 0;
    this.createDawnBirds();
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

  update(elapsed, dt = 0) {
    if (!this.dawnActive && Math.abs(this.hellVisualStrength - this.hellVisualTarget) > 0.0001) {
      const direction = Math.sign(this.hellVisualTarget - this.hellVisualStrength);
      const step = Math.max(0.0001, this.hellVisualTransitionRate || 1) * dt;
      this.hellVisualStrength = THREE.MathUtils.clamp(
        this.hellVisualStrength + direction * step,
        Math.min(this.hellVisualStrength, this.hellVisualTarget),
        Math.max(this.hellVisualStrength, this.hellVisualTarget)
      );
      if (Math.abs(this.hellVisualStrength - this.hellVisualTarget) <= step + 0.0001) {
        this.hellVisualStrength = this.hellVisualTarget;
      }
      this.applyHellVisualStrength(this.hellVisualStrength);
    }

    if (this.victoryClosing && !this.dawnActive) {
      this.victoryTimer += dt;
      const closeT = THREE.MathUtils.clamp(this.victoryTimer / 4.2, 0, 1);
      const remaining = 1 - closeT;
      if (this.riftGroup) {
        const baseScale = THREE.MathUtils.lerp(1, 1.34, this.hellVisualStrength);
        this.riftGroup.scale.set(
          baseScale * THREE.MathUtils.lerp(1, 0.55, closeT),
          THREE.MathUtils.lerp(1, 0.72, closeT),
          baseScale * THREE.MathUtils.lerp(1, 0.12, closeT)
        );
      }
      this.materials.rift.opacity = 0.86 * remaining;
      this.materials.riftHot.opacity = 0.96 * remaining;
      if (this.riftEmbers?.material) this.riftEmbers.material.opacity = 0.96 * remaining;
      if (this.riftLight) this.riftLight.intensity = THREE.MathUtils.lerp(92, 155, this.hellVisualStrength) * remaining;
      if (this.riftWalkLight) this.riftWalkLight.intensity = THREE.MathUtils.lerp(38, 74, this.hellVisualStrength) * remaining;
      this.riftFlames?.forEach(({ outer, inner, light }) => {
        outer.material.opacity = 0.72 * remaining;
        inner.material.opacity = 0.88 * remaining;
        light.intensity = 10 * remaining;
      });
      if (this.victoryTimer >= 2.4) {
        this.turretMounts.forEach((mount) => { mount.group.visible = false; });
        Object.values(this.upgradeGroups).forEach((upgrade) => { if (upgrade?.group) upgrade.group.visible = false; });
        this.fortifyGroups.forEach((group) => { group.visible = false; });
      }
      if (closeT >= 1 && !this.victoryDawnStarted) {
        this.victoryDawnStarted = true;
        this.victoryClosing = false;
        this.startDawn();
      }
    }

    if (this.dawnActive) {
      this.dawnProgress = Math.min(1, this.dawnProgress + dt / 15);
      const t = this.dawnProgress;
      const eased = t * t * (3 - 2 * t);
      const night = this.normalNightColor.clone().lerp(this.hellNightColor, this.hellVisualStrength);
      const morning = new THREE.Color(0x8ea7b4);
      this.scene.background.copy(night).lerp(morning, eased);
      if (this.scene.fog?.color) {
        const nightFog = this.normalFogColor.clone().lerp(this.hellFogColor, this.hellVisualStrength);
        this.scene.fog.color.copy(nightFog.lerp(new THREE.Color(0xa5a7a0), eased));
        this.scene.fog.density = THREE.MathUtils.lerp(
          THREE.MathUtils.lerp(0.018, 0.020, this.hellVisualStrength),
          0.0075,
          eased
        );
      }
      if (this.dawnSun) {
        this.dawnSun.position.y = THREE.MathUtils.lerp(1.0, 14.5, eased);
        this.dawnSun.material.opacity = Math.min(1, eased * 1.35);
      }
      if (this.dawnLight) this.dawnLight.intensity = eased * 3.2;
      if (this.moon?.material) this.moon.material.opacity = 0.78 * (1 - eased);
      if (this.stars?.material) this.stars.material.opacity = 0.86 * (1 - eased);
      if (this.moonLight) this.moonLight.intensity = 3.25 * (1 - eased * 0.78);
      if (this.rimLight) this.rimLight.intensity = 1.2 * (1 - eased * 0.55);
      if (this.huskFillLight) this.huskFillLight.intensity = 0.75 * (1 - eased);
    }

    if (!this.dawnActive) this.flames.forEach(({ flames, light, sparks, sparkBase, phase }) => {
      const basePulse = 0.9 + Math.sin(elapsed * 8 + phase) * 0.12 + Math.sin(elapsed * 15 + phase) * 0.04;
      flames.forEach(({ flame, phase: flamePhase }, index) => {
        const pulse = basePulse + Math.sin(elapsed * (10 + index * 2) + flamePhase) * 0.08;
        flame.scale.set(0.88 + pulse * 0.12, 0.92 + pulse * 0.28, 0.88 + pulse * 0.12);
        flame.rotation.y = Math.sin(elapsed * 3 + flamePhase) * 0.22;
      });
      light.intensity = 9.5 + basePulse * 3.4;
      if (sparks && sparkBase) {
        const attr = sparks.geometry.attributes.position;
        const arr = attr.array;
        for (let i = 0; i < attr.count; i += 1) {
          const idx = i * 3;
          arr[idx] = sparkBase[idx] + Math.sin(elapsed * 2.2 + i) * 0.05;
          arr[idx + 1] = 1.12 + ((sparkBase[idx + 1] - 1.12 + elapsed * (0.22 + (i % 4) * 0.035)) % 1.55);
          arr[idx + 2] = sparkBase[idx + 2] + Math.cos(elapsed * 1.8 + i) * 0.05;
        }
        attr.needsUpdate = true;
      }
    });

    this.turretMounts.forEach(({ ember, light, phase }) => {
      const pulse = 1 + Math.sin(elapsed * 5 + phase) * 0.12;
      ember.scale.setScalar(pulse);
      light.intensity = 4.2 + pulse * 1.5;
    });

    this.skyClouds.forEach(({ sprite, speed, baseY, phase }) => {
      sprite.position.x += speed * dt;
      sprite.position.y = baseY + Math.sin(elapsed * 0.12 + phase) * 0.16;
      if (sprite.position.x > 34) sprite.position.x = -34;
    });

    this.groundFog.forEach(({ mesh, speed, phase, baseZ, baseY, baseOpacity }) => {
      mesh.position.x += speed * dt;
      mesh.position.z = baseZ + Math.sin(elapsed * 0.17 + phase) * 0.38;
      mesh.position.y = baseY + Math.sin(elapsed * 0.33 + phase) * 0.08;
      const dawnFade = this.dawnActive ? (1 - this.dawnProgress * 0.74) : 1;
      pulseFogOpacity(mesh.material, elapsed, phase, baseOpacity * dawnFade);
      if (mesh.position.x > 30) mesh.position.x = -30;
    });

    if (this.riftEmbers && this.riftEmberBase) {
      const attribute = this.riftEmbers.geometry.attributes.position;
      const array = attribute.array;
      const count = attribute.count;
      for (let i = 0; i < count; i += 1) {
        const baseIndex = i * 3;
        const baseY = this.riftEmberBase[baseIndex + 1];
        const rise = (elapsed * (0.45 + (i % 7) * 0.04) + baseY) % 6.0;
        array[baseIndex] = this.riftEmberBase[baseIndex] + Math.sin(elapsed * 1.8 + i) * 0.08;
        array[baseIndex + 1] = rise;
        array[baseIndex + 2] = this.riftEmberBase[baseIndex + 2] + Math.cos(elapsed * 1.3 + i * 0.7) * 0.08;
      }
      attribute.needsUpdate = true;
    }

    if (this.ngPlusEmbers?.visible && this.ngPlusEmberBase) {
      const attr = this.ngPlusEmbers.geometry.attributes.position;
      const arr = attr.array;
      for (let i = 0; i < attr.count; i += 1) {
        const idx = i * 3;
        const baseY = this.ngPlusEmberBase[idx + 1];
        arr[idx] = this.ngPlusEmberBase[idx] + Math.sin(elapsed * 0.55 + i * 0.37) * 0.34;
        arr[idx + 1] = 0.6 + ((baseY - 0.6 + elapsed * (0.34 + (i % 9) * 0.025)) % 21.0);
        arr[idx + 2] = this.ngPlusEmberBase[idx + 2] + Math.cos(elapsed * 0.42 + i) * 0.24;
      }
      attr.needsUpdate = true;
      if (this.ngPlusSkyGlow) this.ngPlusSkyGlow.material.opacity = (0.38 + Math.sin(elapsed * 0.55) * 0.06) * this.hellVisualStrength;
    }

    if (this.dawnActive && this.dawnBirds.length > 0) {
      this.dawnBirds.forEach((bird, index) => {
        bird.progress += dt * (0.085 + index * 0.006);
        const t = bird.progress;
        if (t < 0) return;
        bird.sprite.visible = t <= 1.15;
        bird.sprite.material.opacity = Math.min(0.78, Math.max(0, t * 2.6)) * Math.max(0, 1 - Math.max(0, t - 0.92) * 5);
        bird.sprite.position.x = THREE.MathUtils.lerp(-28, 31, Math.min(1, t));
        bird.sprite.position.y = bird.baseY + Math.sin(elapsed * 2.1 + index) * 0.24;
      });
    }

    if (this.upgradeGroups.extraction?.group.visible) {
      const extraction = this.upgradeGroups.extraction;
      const pulse = 1 + Math.sin(elapsed * 2.8) * 0.08;
      extraction.portal.material.opacity = 0.44 + Math.sin(elapsed * 2.4) * 0.07;
      extraction.portalHalo.material.opacity = 0.14 + Math.sin(elapsed * 1.9 + 1.1) * 0.04;
      const portalScale = 1 + Math.sin(elapsed * 2.0) * 0.025;
      extraction.portal.scale.set(8.8 * portalScale, 3.25 * portalScale, 1);
      extraction.portalHalo.scale.set(10.2 / portalScale, 4.2 / portalScale, 1);
      extraction.light.intensity = 20 + pulse * 7;
    }

    this.extractionBeams.forEach((slot, slotIndex) => {
      if (!slot.active) return;
      slot.timer -= dt;
      const progress = THREE.MathUtils.clamp(1 - slot.timer / slot.duration, 0, 1);
      const envelope = Math.sin(Math.min(1, progress * 3.2) * Math.PI * 0.5) *
        Math.sin(Math.min(1, (1 - progress) * 5.0) * Math.PI * 0.5);
      const flicker = 0.92 + Math.sin(elapsed * 8 + slot.phase) * 0.08;
      // Active conversion beams are intentionally far brighter than the idle
      // portal so the player can instantly see whether a binding is running.
      slot.beam.material.opacity = 0.52 * envelope * flicker;
      slot.inner.material.opacity = 0.76 * envelope;
      slot.particles.material.opacity = 0.96 * envelope;
      slot.light.intensity = 72 * envelope;
      slot.beam.scale.set(1 + Math.sin(elapsed * 3 + slotIndex) * 0.04, 1, 1 + Math.cos(elapsed * 2.4 + slotIndex) * 0.04);

      const attr = slot.particles.geometry.attributes.position;
      const arr = attr.array;
      for (let i = 0; i < attr.count; i += 1) {
        const idx = i * 3 + 1;
        arr[idx] = (arr[idx] + dt * (1.1 + (i % 5) * 0.16)) % 10.5;
      }
      attr.needsUpdate = true;

      if (slot.timer <= 0) {
        slot.active = false;
        slot.beam.visible = false;
        slot.inner.visible = false;
        slot.particles.visible = false;
        slot.beam.material.opacity = 0;
        slot.inner.material.opacity = 0;
        slot.particles.material.opacity = 0;
        slot.light.intensity = 0;
        this.extractionCompletions += 1;
      }
    });

    this.manorDustBursts.forEach((burst) => {
      if (!burst.active) return;
      burst.timer -= dt;
      const t = THREE.MathUtils.clamp(1 - burst.timer / burst.duration, 0, 1);
      const fade = Math.max(0, 1 - t);
      burst.puffs.forEach(({ sprite, material, grow }, index) => {
        sprite.position.x -= dt * (0.28 + index * 0.025);
        sprite.position.y += dt * (0.32 + index * 0.035);
        const base = 0.72 + index * 0.08;
        const size = (base + t * grow) * (burst.scaleMultiplier ?? 1);
        sprite.scale.set(size, size * 0.70, 1);
        material.opacity = fade * (index % 2 ? 0.62 : 0.78) * (burst.opacityMultiplier ?? 1);
      });
      if (burst.timer <= 0) {
        burst.active = false;
        burst.group.visible = false;
      }
    });

    if (this.upgradeGroups.demolition?.group.visible) {
      this.upgradeGroups.demolition.light.intensity = 0.82 + Math.sin(elapsed * 4.2) * 0.18;
    }

    this.occultStrikes.forEach((strike) => {
      if (!strike.active) return;
      strike.timer -= dt;
      const t = THREE.MathUtils.clamp(1 - strike.timer / 1.05, 0, 1);
      const fade = Math.sin(Math.min(1, t * 2.2) * Math.PI * 0.5) * (1 - t);
      strike.flames.forEach((flame, index) => {
        const pulse = 0.9 + Math.sin(elapsed * (10 + index) + strike.phase) * 0.15;
        flame.scale.set(0.8 * pulse, 1.1 + pulse * 0.45, 0.8 * pulse);
        flame.material.opacity = 0.9 * fade;
      });
      strike.light.intensity = 20 * fade;
      if (strike.timer <= 0) {
        strike.active = false;
        strike.light.intensity = 0;
        strike.flames.forEach((flame) => {
          flame.visible = false;
          flame.material.opacity = 0;
        });
      }
    });

    if (this.overchargeShield?.mesh.visible) {
      this.overchargeHitPulse = Math.max(0, this.overchargeHitPulse - dt);
      const hit = this.overchargeHitPulse > 0 ? this.overchargeHitPulse / 0.34 : 0;
      const pulse = 0.095 + Math.sin(elapsed * 3.4) * 0.022 + hit * 0.20;
      this.overchargeShield.material.opacity = pulse;
      const scalePulse = 1 + Math.sin(elapsed * 2.1) * 0.008 + hit * 0.014;
      // Rebuild scale each frame so the shield breathes without cumulative growth.
      const manorHeight = Math.max(8, this.manorBounds.max.y - this.manorBounds.min.y);
      const manorDepth = Math.max(8, this.manorBounds.max.z - this.manorBounds.min.z);
      this.overchargeShield.mesh.scale.set(3.7 * scalePulse, manorHeight * 0.60 * scalePulse, manorDepth * 0.61 * scalePulse);
    }

    if (this.lightningTimer > 0) {
      this.lightningTimer = Math.max(0, this.lightningTimer - dt);
      const t = this.lightningTimer / 0.46;
      // A quick double-pulse reads as lightning without becoming distracting.
      const flash = t > 0.72 ? 1 : t > 0.52 ? 0.18 : t > 0.27 ? 0.72 : t * 1.3;
      if (this.lightningBolt) {
        this.lightningBolt.line.visible = this.lightningTimer > 0;
        this.lightningBolt.material.opacity = Math.max(0, flash);
      }
      if (this.lightningLight) this.lightningLight.intensity = 22 * Math.max(0, flash);
    } else {
      if (this.lightningBolt) this.lightningBolt.line.visible = false;
      if (this.lightningLight) this.lightningLight.intensity = 0;
    }

    if (this.upgradeGroups.occult?.group.visible) {
      const occult = this.upgradeGroups.occult;
      occult.ringA.rotation.x += dt * 0.5;
      occult.ringA.rotation.y += dt * 0.3;
      occult.ringB.rotation.y -= dt * 0.6;
      const pulseBoost = this.occultPulseTimer > 0 ? 1.7 : 1;
      occult.orb.scale.setScalar((0.92 + Math.sin(elapsed * 4.2) * 0.12) * pulseBoost);
    }
    this.occultPulseTimer = Math.max(0, this.occultPulseTimer - dt);

    if (!this.dawnActive && !this.victoryClosing) this.riftFlames?.forEach(({ group, outer, inner, light, phase }) => {
      const pulse = 0.92 + Math.sin(elapsed * 7.5 + phase) * 0.16 + Math.sin(elapsed * 13 + phase) * 0.05;
      group.position.x += Math.sin(elapsed * 1.6 + phase) * dt * 0.015;
      outer.scale.set(0.9 / pulse, 1.15 * pulse, 0.9 / pulse);
      inner.scale.set(0.94 / pulse, 1.08 * pulse, 0.94 / pulse);
      light.intensity = 8.5 + pulse * 4.5;
    });

    if (!this.dawnActive && !this.victoryClosing) {
      const visualStrength = this.hellVisualStrength;
      const riftBase = THREE.MathUtils.lerp(92, 155, visualStrength);
      const walkBase = THREE.MathUtils.lerp(38, 74, visualStrength);
      this.riftLight.intensity = riftBase + Math.sin(elapsed * 4.2) * THREE.MathUtils.lerp(14, 24, visualStrength);
      if (this.riftWalkLight) this.riftWalkLight.intensity = walkBase + Math.sin(elapsed * 2.7 + 0.6) * THREE.MathUtils.lerp(5, 10, visualStrength);
      this.hellGlow.intensity = THREE.MathUtils.lerp(33, 48, visualStrength) + Math.sin(elapsed * 2.1) * 2;
    } else if (this.dawnActive) {
      this.riftLight.intensity = 0;
      if (this.riftWalkLight) this.riftWalkLight.intensity = 0;
      this.hellGlow.intensity = Math.max(0, THREE.MathUtils.lerp(33, 48, this.hellVisualStrength) * (1 - this.dawnProgress));
    }
  }

  dispose() {
    this.disposables.forEach((item) => item.dispose?.());
  }
}
