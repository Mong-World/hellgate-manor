import * as THREE from "three";
import { AssetLibrary } from "./AssetLibrary.js";

function makeMoonTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  const glow = ctx.createRadialGradient(128, 128, 28, 128, 128, 126);
  glow.addColorStop(0, "rgba(255,248,222,1)");
  glow.addColorStop(0.58, "rgba(225,229,219,1)");
  glow.addColorStop(0.78, "rgba(169,186,194,.9)");
  glow.addColorStop(1, "rgba(160,190,210,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 256, 256);

  ctx.globalCompositeOperation = "multiply";
  const craters = [
    [81, 92, 19, 0.14],
    [151, 68, 13, 0.11],
    [164, 142, 27, 0.12],
    [101, 164, 12, 0.10],
    [130, 115, 8, 0.08]
  ];
  for (const [x, y, radius, alpha] of craters) {
    ctx.fillStyle = `rgba(70,82,88,${alpha})`;
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
  canvas.height = 192;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "rgba(214,221,228,0)");
  gradient.addColorStop(0.38, "rgba(212,219,228,.46)");
  gradient.addColorStop(0.65, "rgba(198,206,216,.32)");
  gradient.addColorStop(1, "rgba(185,194,205,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 22; i += 1) {
    const x = Math.random() * canvas.width;
    const y = 60 + Math.random() * 60;
    const radius = 38 + Math.random() * 82;
    const cloud = ctx.createRadialGradient(x, y, 0, x, y, radius);
    cloud.addColorStop(0, "rgba(235,239,244,.24)");
    cloud.addColorStop(1, "rgba(235,239,244,0)");
    ctx.fillStyle = cloud;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
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

function pulseFogOpacity(material, elapsed, phase) {
  material.opacity = 0.135 + Math.sin(elapsed * 0.24 + phase) * 0.028;
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
      opacity: 0.92,
      depthWrite: false,
      fog: false
    });
    this.moon = new THREE.Sprite(moonMaterial);
    this.moon.position.set(-7.5, 17.6, -36);
    this.moon.scale.set(5.9, 5.9, 1);
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
    this.scene.add(new THREE.HemisphereLight(0x8294ba, 0x120b0b, 1.75));

    const moonLight = new THREE.DirectionalLight(0xb2c8f3, 3.65);
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

    const rim = new THREE.DirectionalLight(0x6f91d6, 1.5);
    rim.position.set(-12, 7, 12);
    this.scene.add(rim);

    this.hellGlow = new THREE.PointLight(0xff4810, 35, 24, 1.8);
    this.hellGlow.position.set(15.5, 4, 0);
    this.scene.add(this.hellGlow);

    this.riftLight = new THREE.PointLight(0xff3a08, 82, 28, 1.55);
    this.riftLight.position.set(-19.5, 2.2, 7.2);
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

    const ashPatchGeometry = new THREE.PlaneGeometry(72, 11);
    ashPatchGeometry.rotateX(-Math.PI / 2);
    const ashPatchMaterial = new THREE.MeshBasicMaterial({
      color: 0x0b0b0d,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const ashPatch = new THREE.Mesh(ashPatchGeometry, ashPatchMaterial);
    ashPatch.position.set(-1.8, 0.03, 0);
    this.scene.add(ashPatch);
    this.disposables.push(ashPatchGeometry, ashPatchMaterial);
  }

  createHellRift() {
    this.riftGroup = new THREE.Group();
    this.riftGroup.position.set(-19.6, 0.025, 7.2);
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
      [-20, 5.8, 20, 5.4, 0.16],
      [-11, 2.2, 18, 4.8, 0.11],
      [-1, -1.5, 20, 5.4, 0.13],
      [10, 2.8, 18, 4.9, 0.10],
      [21, -0.8, 17, 4.6, 0.09],
      [2, 5.8, 24, 5.6, 0.12],
      [14, 5.8, 19, 5.0, 0.08]
    ];

    fogData.forEach(([x, z, sx, sz, speed], index) => {
      const geometry = new THREE.PlaneGeometry(sx, sz);
      geometry.rotateX(-Math.PI / 2);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        color: index % 2 === 0 ? 0xb9c2ca : 0xd2d8df,
        transparent: true,
        opacity: 0.15 + index * 0.008,
        depthWrite: false,
        side: THREE.DoubleSide,
        fog: true
      });
      const fog = new THREE.Mesh(geometry, material);
      fog.position.set(x, 0.2 + index * 0.008, z);
      fog.renderOrder = 4;
      this.scene.add(fog);
      this.groundFog.push({ mesh: fog, speed, phase: index * 1.7, baseZ: z });
      this.disposables.push(geometry, material);
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
  }

  createBraziers() {
    for (const z of [-4.6, 4.6]) {
      const group = new THREE.Group();
      group.position.set(this.manorBarrierX - 1.0, 0, z);
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
    const y = Math.min(this.manorBounds.max.y * 0.55, 7.2);
    const zPositions = [-2.7, -0.1, 2.5];

    for (let i = 0; i < 3; i += 1) {
      const mount = new THREE.Group();
      mount.position.set(
        this.manorBarrierX + 0.18,
        y + i * 0.32,
        zPositions[i]
      );
      mount.rotation.y = -Math.PI / 2;
      mount.visible = false;
      this.scene.add(mount);

      const pivot = new THREE.Group();
      mount.add(pivot);

      const stoneGeometry = new THREE.CylinderGeometry(0.42, 0.55, 0.42, 8);
      const stoneMaterial = new THREE.MeshStandardMaterial({
        color: 0x242329,
        roughness: 0.92,
        metalness: 0.08
      });
      const stone = new THREE.Mesh(stoneGeometry, stoneMaterial);
      stone.position.y = -0.38;
      stone.castShadow = true;
      stone.receiveShadow = true;
      pivot.add(stone);

      const stockGeometry = new THREE.BoxGeometry(0.24, 0.22, 1.75);
      const stockMaterial = new THREE.MeshStandardMaterial({
        color: 0x241813,
        roughness: 0.78,
        metalness: 0.08
      });
      const stock = new THREE.Mesh(stockGeometry, stockMaterial);
      stock.position.z = 0.15;
      stock.castShadow = true;
      pivot.add(stock);

      const railGeometry = new THREE.BoxGeometry(0.08, 0.08, 1.95);
      const rail = new THREE.Mesh(railGeometry, this.materials.iron);
      rail.position.set(0, 0.16, 0.08);
      rail.castShadow = true;
      pivot.add(rail);

      const bowCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.92, 0.04, -0.64),
        new THREE.Vector3(-0.56, 0.08, -0.84),
        new THREE.Vector3(0, 0.12, -0.92),
        new THREE.Vector3(0.56, 0.08, -0.84),
        new THREE.Vector3(0.92, 0.04, -0.64)
      ]);
      const bowGeometry = new THREE.TubeGeometry(bowCurve, 18, 0.055, 6, false);
      const bow = new THREE.Mesh(bowGeometry, this.materials.iron);
      bow.castShadow = true;
      pivot.add(bow);

      const stringGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-0.92, 0.04, -0.64),
        new THREE.Vector3(0, 0.12, -0.18),
        new THREE.Vector3(0.92, 0.04, -0.64)
      ]);
      const stringMaterial = new THREE.LineBasicMaterial({
        color: 0xb8a99d,
        transparent: true,
        opacity: 0.72
      });
      const string = new THREE.Line(stringGeometry, stringMaterial);
      pivot.add(string);

      const spikeGeometry = new THREE.ConeGeometry(0.09, 0.38, 6);
      for (const side of [-1, 1]) {
        const spike = new THREE.Mesh(spikeGeometry, this.materials.iron);
        spike.position.set(side * 0.92, 0.04, -0.64);
        spike.rotation.z = side * Math.PI / 2;
        spike.castShadow = true;
        pivot.add(spike);
      }

      const emberGeometry = new THREE.IcosahedronGeometry(0.12, 1);
      const ember = new THREE.Mesh(emberGeometry, this.materials.ember);
      ember.position.set(0, 0.18, -0.6);
      pivot.add(ember);

      const emberLight = new THREE.PointLight(0xff4b13, 4.5, 4.5, 2);
      emberLight.position.copy(ember.position);
      pivot.add(emberLight);

      const muzzle = new THREE.Object3D();
      muzzle.position.set(0, 0.14, -1.02);
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
        stoneGeometry,
        stoneMaterial,
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
    this.flames.forEach(({ flame, light, phase }) => {
      const pulse = 0.9 + Math.sin(elapsed * 8 + phase) * 0.12 + Math.sin(elapsed * 15 + phase) * 0.04;
      flame.scale.set(0.9 / pulse, 1.2 * pulse, 0.9 / pulse);
      light.intensity = 9 + pulse * 2.5;
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

    this.groundFog.forEach(({ mesh, speed, phase, baseZ }) => {
      mesh.position.x += speed * dt;
      mesh.position.z = baseZ + Math.sin(elapsed * 0.17 + phase) * 0.35;
      pulseFogOpacity(mesh.material, elapsed, phase);
      if (mesh.position.x > 29) mesh.position.x = -29;
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

    this.riftLight.intensity = 78 + Math.sin(elapsed * 4.2) * 10;
    this.hellGlow.intensity = 33 + Math.sin(elapsed * 2.1) * 2;
  }

  dispose() {
    this.disposables.forEach((item) => item.dispose?.());
  }
}
