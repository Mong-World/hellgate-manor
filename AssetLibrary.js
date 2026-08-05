import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";
import { CONFIG } from "./Config.js";

export class AssetLibrary {
  constructor() {
    this.loader = new GLTFLoader();
    this.huskAsset = null;
    this.manorAsset = null;
    this.huskMaterialVariants = {
      normal: new Map(),
      fast: new Map()
    };
  }

  async loadAll() {
    const [husk, manor] = await Promise.all([
      this.loader.loadAsync(CONFIG.assets.husk),
      this.loader.loadAsync(CONFIG.assets.manor)
    ]);
    this.huskAsset = husk;
    this.manorAsset = manor;
  }

  createHuskClone(fast = false) {
    if (!this.huskAsset) throw new Error("Husk asset has not loaded.");
    const scene = SkeletonUtils.clone(this.huskAsset.scene);
    const variant = fast ? "fast" : "normal";

    scene.traverse((object) => {
      if (!object.isMesh || !object.material) return;
      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      const prepared = materials.map((material) => {
        const key = material.uuid;
        const cached = this.huskMaterialVariants[variant].get(key);
        if (cached) return cached;

        const clone = material.clone();
        if ("emissive" in clone) {
          clone.emissive = new THREE.Color(fast ? 0x35170e : 0x142237);
          clone.emissiveIntensity = fast ? 0.42 : 0.28;
        }
        this.huskMaterialVariants[variant].set(key, clone);
        return clone;
      });

      object.material = Array.isArray(object.material) ? prepared : prepared[0];
    });

    return {
      scene,
      animations: this.huskAsset.animations
    };
  }

  createManorClone() {
    if (!this.manorAsset) throw new Error("Manor asset has not loaded.");
    return this.manorAsset.scene.clone(true);
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
