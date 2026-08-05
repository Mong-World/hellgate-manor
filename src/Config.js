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

    // v0.11: the previous fast speed is now the standard speed.
    normalSpeedMin: 4.44,
    normalSpeedMax: 5.04,

    // Fast Husks move at approximately double the new standard speed.
    fastSpeedMin: 8.88,
    fastSpeedMax: 10.08,

    spawnXMin: -29.2,
    spawnXMax: -27.8,
    groundDeathScreenFraction: 0.5,
    hardSurfaceKillSpeed: 10.5,
    treeKillSpeed: 10.5,
    collisionRadius: 0.62
  },

  defence: {
    turretCosts: [60, 900, 1500],
    turretMaxLevel: 3,
    turretUnlockWave: 3,
    fireInterval: 10,
    fireStagger: 1,
    bombCost: 50,
    bombMaxCharges: 3,
    bombUnlockWave: 4
  },

  waves: [
    { total: 5, fast: 0, maxActive: 25, spawnGap: 2.6 },
    { total: 10, fast: 2, maxActive: 25, spawnGap: 2.1 },
    { total: 15, fast: 4, maxActive: 25, spawnGap: 1.6 },
    { total: 20, fast: 7, maxActive: 25, spawnGap: 1.2 },
    { total: 25, fast: 10, maxActive: 25, spawnGap: 0.85 }
  ]
});
