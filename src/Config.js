export const CONFIG = Object.freeze({
  assets: {
    husk: "./assets/husk.glb",
    manor: "./assets/manor.glb"
  },
  camera: {
    position: [0, 9.2, 27.5],
    target: [1.8, 3.1, 0],
    fov: 44
  },
  manor: {
    startHealth: 100,
    maxHealth: 100,
    repairAmount: 25,
    repairCost: 30
  },
  enemy: {
    normalSoulValue: 10,
    fastSoulValue: 15,
    normalAttackDamage: 4,
    fastAttackDamage: 6,
    attackInterval: 1.4,
    normalSpeedMin: 0.94,
    normalSpeedMax: 1.08,
    fastSpeedMin: 1.48,
    fastSpeedMax: 1.68,
    groundDeathScreenFraction: 0.5,
    hardSurfaceKillSpeed: 10.5,
    treeKillSpeed: 10.5,
    collisionRadius: 0.62
  },
  defence: {
    turretCosts: [60, 90, 130],
    turretMaxLevel: 3,
    fireInterval: 5,
    bombCost: 50,
    bombMaxCharges: 3
  },
  waves: [
    { total: 5, fast: 0, maxActive: 2, spawnGap: 3.0 },
    { total: 10, fast: 2, maxActive: 3, spawnGap: 2.5 },
    { total: 15, fast: 4, maxActive: 4, spawnGap: 2.0 },
    { total: 20, fast: 7, maxActive: 5, spawnGap: 1.6 },
    { total: 25, fast: 10, maxActive: 7, spawnGap: 1.2 }
  ]
});
