import * as THREE from "three";
import { AssetLibrary } from "./AssetLibrary.js";

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
    this.skyClouds = [];
    this.groundFog = [];
    this.riftEmbers = null;
    this.riftEmberBase = null;
    this.extractionGroup = null;
    this.extractionCentre = new THREE.Vector3();
    this.upgradeGroups = {};
    this.fortifyGroups = [];
    this.occultPulseTimer = 0;

    this.createMaterials();
    this.createSky();
    this.createLights();
    this.createGround();
    this.createHellRift();
    this.createForest();
    this.createGroundFog();
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
        opacity: 0.94,
        depthWrite: false,
        side: THREE.DoubleSide
      })
    };
    this.disposables.push(groundMap, ...Object.values(this.materials));
  }

  createSky() {
    const starCount = 190;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i += 1) {
      starPositions[i * 3] = THREE.MathUtils.randFloat(-38, 38);
      starPositions[i * 3 + 1] = THREE.MathUtils.randFloat(10, 27);
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
  }

  createLights() {
    this.scene.add(new THREE.HemisphereLight(0x7d8fb2, 0x120b0b, 1.7));

    const moonLight = new THREE.DirectionalLight(0xb2c8f3, 3.25);
    moonLight.position.set(-18, 24, 13);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.set(2048, 2048);
    moonLight.shadow.camera.left = -36;
    moonLight.shadow.camera.right = 36;
    moonLight.shadow.camera.top = 24;
    moonLight.shadow.camera.bottom = -20;
    moonLight.shadow.camera.near = 1;
    moonLight.shadow.camera.far = 100;
    moonLight.shadow.bias = -0.00035;
    this.scene.add(moonLight);

    const rim = new THREE.DirectionalLight(0x6f91d6, 1.2);
    rim.position.set(-12, 7, 12);
    this.scene.add(rim);

    const huskFill = new THREE.DirectionalLight(0x89a7ea, 0.75);
    huskFill.position.set(14, 8, 18);
    this.scene.add(huskFill);

    this.hellGlow = new THREE.PointLight(0xff4810, 35, 24, 1.8);
    this.hellGlow.position.set(15.5, 4, 0);
    this.scene.add(this.hellGlow);

    this.riftLight = new THREE.PointLight(0xff3a08, 98, 32, 1.5);
    this.riftLight.position.set(-24.4, 2.6, 8.8);
    this.scene.add(this.riftLight);
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
    this.riftGroup.position.set(-24.6, 0.025, 8.8);
    this.scene.add(this.riftGroup);

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
      [0.8, 1.9, 2.3, 4.0, 5.4, 0.18]
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

    const emberCount = 74;
    const positions = new Float32Array(emberCount * 3);
    const base = new Float32Array(emberCount * 3);
    for (let i = 0; i < emberCount; i += 1) {
      const x = THREE.MathUtils.randFloat(-3.5, 3.0);
      const y = THREE.MathUtils.randFloat(0.05, 4.0);
      const z = THREE.MathUtils.randFloat(-4.8, 5.4);
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
      size: 0.16,
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
    for (let i = 0; i < 34; i += 1) {
      const tree = new THREE.Group();
      tree.position.set(THREE.MathUtils.randFloat(-32, -19.2), 0, THREE.MathUtils.randFloat(-12, 12));
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

  createTurretMounts() {
    const baseY = Math.min(this.manorBounds.max.y * 0.34, 4.6);
    const zPositions = [-3.1, -0.25, 2.6];

    for (let i = 0; i < 3; i += 1) {
      const mount = new THREE.Group();
      mount.position.set(
        this.manorBarrierX + 0.28,
        baseY + (i === 1 ? 0.05 : 0),
        zPositions[i]
      );
      mount.rotation.y = -Math.PI / 2;
      mount.scale.setScalar(1.12);
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
    // Soul extraction: one glowing fire/rune area, with room for two simultaneous conversions.
    const extraction = new THREE.Group();
    extraction.position.set(this.manorBarrierX - 3.4, 0.06, -3.55);
    extraction.visible = false;
    this.scene.add(extraction);
    this.extractionGroup = extraction;
    this.extractionCentre.copy(extraction.position);

    const discGeometry = new THREE.CircleGeometry(2.2, 48);
    discGeometry.rotateX(-Math.PI / 2);
    const discMaterial = new THREE.MeshBasicMaterial({
      color: 0xff4a10,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const disc = new THREE.Mesh(discGeometry, discMaterial);
    extraction.add(disc);

    const ringGeometry = new THREE.TorusGeometry(1.75, 0.07, 8, 48);
    ringGeometry.rotateX(Math.PI / 2);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffb35d,
      transparent: true,
      opacity: 0.86,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.y = 0.04;
    extraction.add(ring);

    const innerRingGeometry = new THREE.TorusGeometry(1.15, 0.035, 7, 40);
    innerRingGeometry.rotateX(Math.PI / 2);
    const innerRingMaterial = ringMaterial.clone();
    innerRingMaterial.color.setHex(0xff6324);
    const innerRing = new THREE.Mesh(innerRingGeometry, innerRingMaterial);
    innerRing.position.y = 0.045;
    extraction.add(innerRing);

    const extractionFlames = [];
    for (let i = 0; i < 8; i += 1) {
      const angle = (i / 8) * Math.PI * 2;
      const geometry = new THREE.ConeGeometry(0.11, 0.42, 7);
      const material = new THREE.MeshBasicMaterial({
        color: i % 2 ? 0xffa449 : 0xff4b12,
        transparent: true,
        opacity: 0.82,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const flame = new THREE.Mesh(geometry, material);
      flame.position.set(Math.cos(angle) * 1.72, 0.26, Math.sin(angle) * 1.72);
      extraction.add(flame);
      extractionFlames.push({ flame, phase: i * 0.8 });
      this.disposables.push(geometry, material);
    }

    const extractionLight = new THREE.PointLight(0xff5b19, 22, 10, 2);
    extractionLight.position.y = 1.0;
    extraction.add(extractionLight);
    this.upgradeGroups.extraction = {
      group: extraction,
      disc,
      ring,
      innerRing,
      flames: extractionFlames,
      light: extractionLight
    };

    // Demolition: a compact infernal storage/furnace accent beside the manor.
    const demolition = new THREE.Group();
    demolition.position.set(this.manorBarrierX + 0.4, 0, 4.8);
    demolition.visible = false;
    this.scene.add(demolition);
    const demoBaseGeometry = new THREE.BoxGeometry(1.5, 0.8, 1.0);
    const demoBaseMaterial = new THREE.MeshStandardMaterial({
      color: 0x231417,
      roughness: 0.72,
      metalness: 0.35,
      emissive: 0x4a0505,
      emissiveIntensity: 0.7
    });
    const demoBase = new THREE.Mesh(demoBaseGeometry, demoBaseMaterial);
    demoBase.position.y = 0.4;
    demolition.add(demoBase);
    const demoCoreGeometry = new THREE.IcosahedronGeometry(0.25, 1);
    const demoCoreMaterial = new THREE.MeshBasicMaterial({
      color: 0xff3131,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
      depthWrite: false
    });
    const demoCore = new THREE.Mesh(demoCoreGeometry, demoCoreMaterial);
    demoCore.position.set(-0.25, 1.02, 0);
    demolition.add(demoCore);
    this.upgradeGroups.demolition = { group: demolition, core: demoCore };

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
      discGeometry, discMaterial, ringGeometry, ringMaterial, innerRingGeometry, innerRingMaterial,
      demoBaseGeometry, demoBaseMaterial, demoCoreGeometry, demoCoreMaterial,
      braceGeometry, braceMaterial, occultOrbGeometry, occultOrbMaterial,
      occultRingGeometry, occultRingMaterial, occultRingB.material,
      stakeGeometry, beamGeometry, wardGeometry, wardMaterial
    );
  }

  setUpgradeState({ extraction = false, demolition = false, undercroft = false, occult = false, fortifyLevel = 0 } = {}) {
    if (this.upgradeGroups.extraction) this.upgradeGroups.extraction.group.visible = extraction;
    if (this.upgradeGroups.demolition) this.upgradeGroups.demolition.group.visible = demolition;
    if (this.upgradeGroups.undercroft) this.upgradeGroups.undercroft.group.visible = undercroft;
    if (this.upgradeGroups.occult) this.upgradeGroups.occult.group.visible = occult;
    this.fortifyGroups.forEach((group, index) => {
      group.visible = fortifyLevel >= [1, 4, 8][index];
    });
  }

  isInsideExtractionZone(position) {
    if (!this.extractionGroup?.visible) return false;
    const dx = position.x - this.extractionCentre.x;
    const dz = position.z - this.extractionCentre.z;
    return dx * dx + dz * dz <= 2.35 * 2.35;
  }

  getExtractionPosition(slotIndex = 0) {
    return this.extractionCentre.clone().add(new THREE.Vector3(0, 0, slotIndex === 0 ? -0.45 : 0.45));
  }

  pulseOccultEffect() {
    this.occultPulseTimer = 0.65;
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
    this.flames.forEach(({ flames, light, sparks, sparkBase, phase }) => {
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
      pulseFogOpacity(mesh.material, elapsed, phase, baseOpacity);
      if (mesh.position.x > 30) mesh.position.x = -30;
    });

    if (this.riftEmbers && this.riftEmberBase) {
      const attribute = this.riftEmbers.geometry.attributes.position;
      const array = attribute.array;
      const count = attribute.count;
      for (let i = 0; i < count; i += 1) {
        const baseIndex = i * 3;
        const baseY = this.riftEmberBase[baseIndex + 1];
        const rise = (elapsed * (0.45 + (i % 7) * 0.04) + baseY) % 4.2;
        array[baseIndex] = this.riftEmberBase[baseIndex] + Math.sin(elapsed * 1.8 + i) * 0.08;
        array[baseIndex + 1] = rise;
        array[baseIndex + 2] = this.riftEmberBase[baseIndex + 2] + Math.cos(elapsed * 1.3 + i * 0.7) * 0.08;
      }
      attribute.needsUpdate = true;
    }

    if (this.upgradeGroups.extraction?.group.visible) {
      const extraction = this.upgradeGroups.extraction;
      const pulse = 1 + Math.sin(elapsed * 3.4) * 0.06;
      extraction.ring.rotation.z += dt * 0.22;
      extraction.innerRing.rotation.z -= dt * 0.35;
      extraction.disc.material.opacity = 0.18 + Math.sin(elapsed * 2.1) * 0.045;
      extraction.light.intensity = 18 + pulse * 6;
      extraction.flames.forEach(({ flame, phase }) => {
        const fp = 0.9 + Math.sin(elapsed * 9 + phase) * 0.18;
        flame.scale.set(0.9, fp, 0.9);
      });
    }

    if (this.upgradeGroups.demolition?.group.visible) {
      this.upgradeGroups.demolition.core.scale.setScalar(0.92 + Math.sin(elapsed * 5.5) * 0.12);
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

    this.riftLight.intensity = 78 + Math.sin(elapsed * 4.2) * 10;
    this.hellGlow.intensity = 33 + Math.sin(elapsed * 2.1) * 2;
  }

  dispose() {
    this.disposables.forEach((item) => item.dispose?.());
  }
}
