import * as THREE from "three";
import { AssetLibrary } from "./AssetLibrary.js";

function makeMoonTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  const glow = ctx.createRadialGradient(128, 128, 30, 128, 128, 126);
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
    [101, 164, 12, 0.1],
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
  canvas.height = 160;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "rgba(214,221,228,0)");
  gradient.addColorStop(0.45, "rgba(196,204,215,.32)");
  gradient.addColorStop(1, "rgba(185,194,205,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 16; i += 1) {
    const x = Math.random() * canvas.width;
    const y = 55 + Math.random() * 45;
    const radius = 35 + Math.random() * 75;
    const cloud = ctx.createRadialGradient(x, y, 0, x, y, radius);
    cloud.addColorStop(0, "rgba(235,239,244,.20)");
    cloud.addColorStop(1, "rgba(235,239,244,0)");
    ctx.fillStyle = cloud;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
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
        opacity: 0.82,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      }),
      riftHot: new THREE.MeshBasicMaterial({
        color: 0xffa142,
        transparent: true,
        opacity: 0.92,
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

    this.disposables.push(...Object.values(this.materials));
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
    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3)
    );

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
      this.skyClouds.push({
        sprite,
        speed,
        baseY: y,
        phase: index * 1.31
      });
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

    this.riftLight = new THREE.PointLight(0xff3a08, 52, 18, 1.55);
    this.riftLight.position.set(-22.7, 2.1, 3.0);
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
  }

  createHellRift() {
    this.riftGroup = new THREE.Group();
    this.riftGroup.position.set(-23.0, 0.025, 2.9);
    this.scene.add(this.riftGroup);

    const breaches = [
      [0, 0.9, 1.55, 0.58],
      [-0.35, -2.2, 1.15, 0.45],
      [0.25, 3.4, 1.05, 0.4]
    ];

    breaches.forEach(([x, z, scaleX, scaleZ], breachIndex) => {
      const craterGeometry = new THREE.CircleGeometry(1.45, 48);
      craterGeometry.rotateX(-Math.PI / 2);
      const crater = new THREE.Mesh(craterGeometry, this.materials.crater);
      crater.position.set(x, 0.004 + breachIndex * 0.001, z);
      crater.scale.set(scaleX * 1.35, scaleZ * 1.35, 1);
      this.riftGroup.add(crater);
      this.disposables.push(craterGeometry);

      const coreGeometry = new THREE.CircleGeometry(1.15, 48);
      coreGeometry.rotateX(-Math.PI / 2);
      const core = new THREE.Mesh(
        coreGeometry,
        breachIndex === 0 ? this.materials.riftHot : this.materials.rift
      );
      core.position.set(x, 0.018 + breachIndex * 0.001, z);
      core.scale.set(scaleX, scaleZ, 1);
      this.riftGroup.add(core);
      this.disposables.push(coreGeometry);
    });

    const crackOrigins = [
      new THREE.Vector3(0, 0.035, 0.9),
      new THREE.Vector3(-0.35, 0.035, -2.2),
      new THREE.Vector3(0.25, 0.035, 3.4)
    ];

    crackOrigins.forEach((origin, originIndex) => {
      const branchCount = originIndex === 0 ? 10 : 6;

      for (let i = 0; i < branchCount; i += 1) {
        const angle =
          (i / branchCount) * Math.PI * 2 +
          THREE.MathUtils.randFloatSpread(0.34);

        const length =
          THREE.MathUtils.randFloat(1.1, originIndex === 0 ? 4.2 : 2.7);

        const direction = new THREE.Vector3(
          Math.cos(angle),
          0,
          Math.sin(angle)
        );

        const mid = origin
          .clone()
          .addScaledVector(direction, length * 0.48)
          .add(
            new THREE.Vector3(
              THREE.MathUtils.randFloatSpread(0.35),
              0,
              THREE.MathUtils.randFloatSpread(0.35)
            )
          );

        const end = origin
          .clone()
          .addScaledVector(direction, length)
          .add(
            new THREE.Vector3(
              THREE.MathUtils.randFloatSpread(0.45),
              0,
              THREE.MathUtils.randFloatSpread(0.45)
            )
          );

        const curve = new THREE.CatmullRomCurve3([origin.clone(), mid, end]);
        const geometry = new THREE.TubeGeometry(
          curve,
          8,
          originIndex === 0 ? 0.045 : 0.033,
          4,
          false
        );

        const crack = new THREE.Mesh(
          geometry,
          i % 4 === 0 ? this.materials.riftHot : this.materials.rift
        );

        this.riftGroup.add(crack);
        this.disposables.push(geometry);
      }
    });

    const emberCount = 62;
    const positions = new Float32Array(emberCount * 3);
    const base = new Float32Array(emberCount * 3);

    for (let i = 0; i < emberCount; i += 1) {
      const x = THREE.MathUtils.randFloat(-2.4, 2.1);
      const y = THREE.MathUtils.randFloat(0.05, 3.3);
      const z = THREE.MathUtils.randFloat(-3.6, 4.6);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;
    }

    const emberGeometry = new THREE.BufferGeometry();
    emberGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const emberMaterial = new THREE.PointsMaterial({
      color: 0xff6a1e,
      size: 0.12,
      transparent: true,
      opacity: 0.92,
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
      tree.position.set(
        THREE.MathUtils.randFloat(-32, -19.2),
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

  createGroundFog() {
    const texture = makeFogTexture();
    const fogData = [
      [-18, 5.2, 16, 4.0, 0.105],
      [-8, 2.1, 15, 3.7, 0.080],
      [3, 4.6, 18, 4.4, 0.092],
      [13, 1.4, 14, 3.5, 0.070],
      [22, 5.4, 16, 4.0, 0.065]
    ];

    fogData.forEach(([x, z, sx, sz, speed], index) => {
      const geometry = new THREE.PlaneGeometry(sx, sz);
      geometry.rotateX(-Math.PI / 2);

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        color: index % 2 === 0 ? 0x9ba7b3 : 0xb0b7bd,
        transparent: true,
        opacity: 0.09 + index * 0.007,
        depthWrite: false,
        side: THREE.DoubleSide,
        fog: true
      });

      const fog = new THREE.Mesh(geometry, material);
      fog.position.set(x, 0.13 + index * 0.008, z);
      fog.renderOrder = 4;
      this.scene.add(fog);
      this.groundFog.push({
        mesh: fog,
        speed,
        phase: index * 1.7,
        baseZ: z
      });

      this.disposables.push(geometry, material);
    });

    this.disposables.push(texture);
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

      this.flames.push({
        flame,
        light,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  createTurretMounts() {
    const y = Math.min(this.manorBounds.max.y * 0.62, 6.4);
    const zPositions = [-2.8, 0, 2.8];

    for (let i = 0; i < 3; i += 1) {
      const group = new THREE.Group();
      group.position.set(
        this.manorBarrierX + 0.25,
        y + i * 0.35,
        zPositions[i]
      );
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

      this.turretMounts.push({
        group,
        orb,
        light,
        phase: i * 1.2
      });
    }
  }

  setTurretLevel(level) {
    this.turretMounts.forEach((mount, index) => {
      mount.group.visible = index < level;
    });
  }

  getTurretOrigin(index) {
    const mount = this.turretMounts[index];

    if (!mount) {
      return new THREE.Vector3(this.manorBarrierX, 4.5, 0);
    }

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

      if (dx * dx + dz * dz <= tree.radius * tree.radius) {
        return tree;
      }
    }

    return null;
  }

  update(elapsed, dt = 0) {
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

    this.skyClouds.forEach(({ sprite, speed, baseY, phase }) => {
      sprite.position.x += speed * dt;
      sprite.position.y = baseY + Math.sin(elapsed * 0.12 + phase) * 0.16;

      if (sprite.position.x > 34) {
        sprite.position.x = -34;
      }
    });

    this.groundFog.forEach(({ mesh, speed, phase, baseZ }) => {
      mesh.position.x += speed * dt;
      mesh.position.z = baseZ + Math.sin(elapsed * 0.17 + phase) * 0.35;
      materialOpacityPulse(mesh.material, elapsed, phase);

      if (mesh.position.x > 28) {
        mesh.position.x = -28;
      }
    });

    if (this.riftEmbers && this.riftEmberBase) {
      const attribute = this.riftEmbers.geometry.attributes.position;
      const array = attribute.array;
      const count = attribute.count;

      for (let i = 0; i < count; i += 1) {
        const baseIndex = i * 3;
        const baseY = this.riftEmberBase[baseIndex + 1];
        const rise = (elapsed * (0.35 + (i % 7) * 0.035) + baseY) % 3.6;
        array[baseIndex] =
          this.riftEmberBase[baseIndex] +
          Math.sin(elapsed * 1.8 + i) * 0.08;
        array[baseIndex + 1] = rise;
        array[baseIndex + 2] =
          this.riftEmberBase[baseIndex + 2] +
          Math.cos(elapsed * 1.3 + i * 0.7) * 0.08;
      }

      attribute.needsUpdate = true;
    }

    this.riftLight.intensity = 48 + Math.sin(elapsed * 4.2) * 6;
    this.hellGlow.intensity = 33 + Math.sin(elapsed * 2.1) * 2;
  }

  dispose() {
    this.disposables.forEach((item) => item.dispose?.());
  }
}

function materialOpacityPulse(material, elapsed, phase) {
  material.opacity = 0.075 + Math.sin(elapsed * 0.21 + phase) * 0.018;
}
