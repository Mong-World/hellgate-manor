import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";
import { CONFIG } from "./Config.js";

export class AssetLibrary {
  constructor() {
    this.loader = new GLTFLoader();
    this.assets = new Map();
    this.materialVariants = new Map();
  }

  async loadAll(onProgress = null) {
    // Load the two core assets first, then the additional enemy models.
    // Loading several multi-megabyte GLBs simultaneously inside Portals can
    // occasionally fail even when every file exists, so this deliberately
    // uses a controlled sequential loader with retries.
    const orderedKeys = ["husk", "manor", "runner", "brute", "siege", "shed"];
    let completed = 0;

    for (const key of orderedKeys) {
      const url = CONFIG.assets[key];
      if (!url) continue;

      try {
        const gltf = await this.loadAssetWithRetry(key, url, 3);
        this.assets.set(key, gltf);
      } catch (error) {
        const filename = url.split("/").pop() ?? url;
        const assetError = new Error(
          `CORE ASSET FAILED: ${filename} — ${error?.message ?? "Unknown loading error"}`
        );
        assetError.assetKey = key;
        assetError.assetUrl = url;
        assetError.assetFilename = filename;
        throw assetError;
      }

      completed += 1;
      onProgress?.(completed / orderedKeys.length, key);
    }
  }

  async loadAssetWithRetry(key, url, attempts = 3) {
    let lastError = null;

    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        const response = await fetch(url, { cache: attempt === 1 ? "default" : "reload" });
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        const buffer = await response.arrayBuffer();
        if (buffer.byteLength < 100) {
          throw new Error(`File response was only ${buffer.byteLength} bytes`);
        }

        const absoluteUrl = new URL(url, window.location.href);
        const slash = absoluteUrl.href.lastIndexOf("/");
        const resourcePath = slash >= 0 ? absoluteUrl.href.slice(0, slash + 1) : "./";
        return await this.loader.parseAsync(buffer, resourcePath);
      } catch (error) {
        lastError = error;
        console.warn(`GLB load attempt ${attempt}/${attempts} failed for ${key}: ${url}`, error);
        if (attempt < attempts) {
          await new Promise((resolve) => window.setTimeout(resolve, 300 * attempt));
        }
      }
    }

    throw lastError ?? new Error(`Unknown GLB loading error for ${key}`);
  }

  getAsset(key) {
    const asset = this.assets.get(key);
    if (!asset) throw new Error(`Asset has not loaded: ${key}`);
    return asset;
  }

  createEnemyClone(type) {
    const definition = CONFIG.enemyTypes[type];
    if (!definition) throw new Error(`Unknown enemy type: ${type}`);
    const asset = this.getAsset(definition.asset);
    const scene = SkeletonUtils.clone(asset.scene);

    scene.traverse((object) => {
      if (!object.isMesh || !object.material) return;
      const input = Array.isArray(object.material) ? object.material : [object.material];
      const output = input.map((material) => this.getEnemyMaterial(material, type));
      object.material = Array.isArray(object.material) ? output : output[0];
    });

    return { scene, animations: asset.animations ?? [] };
  }

  getEnemyMaterial(material, type) {
    const key = `${type}:${material.uuid}`;
    if (this.materialVariants.has(key)) return this.materialVariants.get(key);

    const clone = material.clone();
    if (type === "strong") {
      // Combined value of the two historical Strong-Husk tint passes. Keeping
      // it here means every pooled Strong Husk can share the same material.
      if (clone.color) clone.color.multiply(new THREE.Color(0.5184, 0.1932, 0.1292));
      if ("emissive" in clone) {
        clone.emissive = new THREE.Color(0x351208);
        clone.emissiveIntensity = 0.45;
      }
    } else if (type === "runner") {
      if ("emissive" in clone) {
        clone.emissive = new THREE.Color(0x2a1710);
        clone.emissiveIntensity = 0.22;
      }
    } else if (type === "brute") {
      if (clone.color) clone.color.multiplyScalar(0.82);
      if ("emissive" in clone) {
        clone.emissive = new THREE.Color(0x1c2027);
        clone.emissiveIntensity = 0.18;
      }
    } else if (type === "siege") {
      // Combined value of the two historical Siege tint passes. This preserves
      // the dark in-game look without cloning materials for every enemy rig.
      if (clone.color) clone.color.multiply(new THREE.Color(0.042, 0.0552, 0.0864));
      if ("emissive" in clone) {
        clone.emissive = new THREE.Color(0x050812);
        clone.emissiveIntensity = 0.06;
      }
    } else if ("emissive" in clone) {
      clone.emissive = new THREE.Color(0x142237);
      clone.emissiveIntensity = 0.24;
    }

    this.materialVariants.set(key, clone);
    return clone;
  }

  createManorClone() {
    return this.getAsset("manor").scene.clone(true);
  }

  createShedClone() {
    return this.getAsset("shed").scene.clone(true);
  }

  static prepareModel(model) {
    model.traverse((object) => {
      if (!object.isMesh) return;
      object.castShadow = true;
      object.receiveShadow = true;
    });
  }

  static fitModelToHeight(model, targetHeight, rotationY = 0) {
    model.rotation.y = rotationY;
    model.updateMatrixWorld(true);
    const firstBox = new THREE.Box3().setFromObject(model);
    const size = firstBox.getSize(new THREE.Vector3());
    model.scale.setScalar(targetHeight / Math.max(size.y, 0.001));
    model.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(model);
    const centre = box.getCenter(new THREE.Vector3());
    model.position.x -= centre.x;
    model.position.z -= centre.z;
    model.position.y -= box.min.y;
    model.updateMatrixWorld(true);
    return model;
  }
}
