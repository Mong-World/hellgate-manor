function round10(value) {
  return Math.max(10, Math.round(value / 10) * 10);
}

function makeWave(wave) {
  const early = {
    1: { total: 12, initialDelay: 7.0, spawnGap: 3.25, burstChance: 0.00, burstMax: 1 },
    2: { total: 18, initialDelay: 4.5, spawnGap: 2.45, burstChance: 0.20, burstMax: 2 },
    3: { total: 24, initialDelay: 3.8, spawnGap: 1.95, burstChance: 0.32, burstMax: 2 },
    4: { total: 30, initialDelay: 3.2, spawnGap: 1.55, burstChance: 0.45, burstMax: 2 },
    5: { total: 36, initialDelay: 2.8, spawnGap: 1.30, burstChance: 0.56, burstMax: 3 }
  }[wave];

  let total;
  if (early) total = early.total;
  else if (wave <= 9) total = 40 + (wave - 6) * 5;
  else if (wave <= 14) total = 58 + (wave - 10) * 5;
  else if (wave <= 19) total = 82 + (wave - 15) * 6;
  else if (wave <= 24) total = 112 + (wave - 20) * 8;
  else if (wave <= 29) total = 150 + (wave - 25) * 9;
  else if (wave <= 34) total = 195 + (wave - 30) * 10;
  else if (wave <= 39) total = 245 + (wave - 35) * 11;
  else if (wave <= 44) total = 300 + (wave - 40) * 13;
  else if (wave === 45) total = 365;
  else if (wave === 46) total = 390;
  else if (wave === 47) total = 420;
  else if (wave === 48) total = 475;
  else if (wave === 49) total = 550;
  else total = 1000;

  let runner = 0;
  let strong = 0;
  let brute = 0;
  let siege = 0;

  // Enemy reveals are intentionally spread across the whole campaign.
  if (wave >= 10) {
    const ratio = Math.min(0.28, 0.08 + (wave - 10) * 0.008);
    runner = Math.max(3, Math.round(total * ratio));
  }
  if (wave >= 15) {
    const ratio = Math.min(0.24, 0.07 + (wave - 15) * 0.007);
    strong = Math.max(3, Math.round(total * ratio));
  }
  if (wave >= 25) {
    const ratio = Math.min(0.12, 0.035 + (wave - 25) * 0.0035);
    brute = Math.max(2, Math.round(total * ratio));
  }
  if (wave >= 35) {
    const ratio = Math.min(0.032, 0.008 + (wave - 35) * 0.0015);
    siege = Math.max(1, Math.round(total * ratio));
  }

  // Waves 45-50 are intentionally longer, but heavy enemies do not scale in
  // direct proportion to the larger total. These are the mobile/base targets;
  // desktop applies a further accessibility reduction in WaveManager.
  if (wave >= 45) {
    const lateHeavy = {
      45: { brute: 38, siege: 8 },
      46: { brute: 41, siege: 10 },
      47: { brute: 44, siege: 12 },
      48: { brute: 46, siege: 14 },
      49: { brute: 48, siege: 16 },
      50: { brute: 50, siege: 18 }
    }[wave];
    brute = lateHeavy.brute;
    siege = lateHeavy.siege;
  }

  const husk = Math.max(8, total - runner - strong - brute - siege);

  const pacing = early ?? {
    initialDelay: wave < 10 ? 2.4 : wave < 20 ? 2.0 : 1.55,
    spawnGap:
      wave < 10 ? Math.max(0.95, 1.25 - (wave - 6) * 0.05) :
      wave < 20 ? 0.90 :
      wave < 30 ? 0.84 :
      wave < 40 ? 0.78 : 0.72,
    burstChance:
      wave < 10 ? 0.58 :
      wave < 20 ? 0.66 :
      wave < 30 ? 0.72 : 0.78,
    burstMax:
      wave < 10 ? 3 :
      wave < 20 ? 4 :
      wave < 30 ? 5 :
      wave < 40 ? 6 : 7
  };

  const maxActive = wave < 35
    ? 25
    : Math.min(35, 25 + Math.ceil((wave - 34) * (10 / 16)));

  return {
    counts: { husk, strong, runner, brute, siege },
    total,
    maxActive,
    initialDelay: pacing.initialDelay,
    spawnGap: pacing.spawnGap,
    burstChance: pacing.burstChance,
    burstMax: pacing.burstMax,
    huskPaceVariation: wave >= 4
  };
}

const waves = Array.from({ length: 50 }, (_, index) => makeWave(index + 1));

export const CONFIG = Object.freeze({
  assets: {
    husk: "./assets/husk.glb",
    strong: "./assets/strong-husk.glb",
    hellwing: "./assets/hellwing.glb",
    runner: "./assets/running-crawl.glb",
    brute: "./assets/slow-walk.glb",
    siege: "./assets/skinny-monster.glb",
    manor: "./assets/manor.glb",
    shed: "./assets/shed.glb"
  },

  sounds: {
    ash: "./sounds/ashsound.mp3",
    attack: "./sounds/attacksound.mp3",
    background1: "./sounds/background1.mp3",
    background2: "./sounds/background2.mp3",
    bodyImpact: "./sounds/body-impact-sound.mp3",
    bombExplosion: "./sounds/bomb-explosion.mp3",
    crossbowFire: "./sounds/crossbow-fire-sound.mp3",
    click: "./assets/click-sound.mp3",
    deniedPurchase: "./sounds/denied-purchase-sound.mp3",
    gameOver: "./sounds/game-over-sound.mp3",
    endgameBang: "./assets/endgamebang.mp3",
    level50: "./assets/level50music.mp3",
    lightning: "./sounds/lightning.mp3",
    newDawn: "./assets/newdawnmusic.mp3",
    purchase: "./sounds/purchasesound.mp3",
    soulBinding: "./assets/soulmusic.mp3",
    soulBling: "./assets/soulbling.mp3",
    soulCollect: "./sounds/soulcollectsound.mp3",
    waveStart: "./sounds/wave-start-sound.MP3",
    whoosh: "./sounds/whoosh.mp3"
  },

  camera: {
    position: [0, 9.2, 27.5],
    target: [1.8, 3.1, 0],
    fov: 44
  },

  manor: {
    startHealth: 1000,
    maxHealth: 1000,
    maxFortifyLevel: 40,
    repairs: {
      minor: { cost: 20, amount: 50 },
      major: { cost: 80, amount: 250 },
      full: { cost: 330, amount: 1000 }
    },
    fortify: { baseCost: 130, amount: 100 },
    majorFortify: { baseCost: 2500, amount: 1000, levels: 10 }
  },

  buildings: {
    extraction: { cost: 900, label: "SOUL EXTRACTION", unlockWave: 4 },
    extractionUpgrade2: { cost: 10000, label: "SOUL EXTRACTION II", unlockWave: 35 },
    hellfire: { cost: 1000, label: "HELLFIRE BATTERY", unlockWave: 4 },
    demolition: { cost: 4800, label: "HELL BOMB FORGE", unlockWave: 15 },
    undercroft: { cost: 8000, label: "UNDERCROFT", unlockWave: 25 },
    occult: { cost: 16000, label: "OCCULT TOWER", unlockWave: 35 }
  },

  extraction: {
    duration: 14,
    maxConcurrent: 2,
    maxLevel: 2,
    radius: 2.35
  },

  overcharge: {
    unlockWave: 40,
    cost: 50,
    manorDamageReduction: 0.20
  },

  boundCaps: {
    hellfire: 50,
    demolition: 50,
    undercroft: 30,
    occult: 40
  },

  enemyTypes: {
    husk: {
      asset: "husk",
      height: 3.65,
      rotationY: Math.PI / 2,
      speed: [3.75, 4.25],
      animationSpeed: [1.25, 1.6],
      reward: 10,
      attackDamage: 10,
      attackInterval: 1.45,
      grabBox: [1.55, 4.25, 1.55],
      grabY: 1.92,
      throwScale: 1,
      durability: 1,
      convertible: true
    },
    strong: {
      asset: "strong",
      height: 3.72,
      rotationY: Math.PI / 2,
      speed: [2.9, 3.3],
      animationSpeed: [1.0, 1.25],
      reward: 20,
      attackDamage: 30,
      attackInterval: 1.55,
      grabBox: [1.6, 4.35, 1.6],
      grabY: 1.98,
      throwScale: 0.88,
      durability: 2,
      convertible: true
    },
    runner: {
      asset: "runner",
      height: 1.62,
      rotationY: Math.PI / 2,
      speed: [7.8, 8.9],
      animationSpeed: [1.1, 1.55],
      reward: 10,
      attackDamage: 13,
      attackInterval: 1.15,
      grabBox: [1.05, 2.15, 1.12],
      grabY: 0.92,
      throwScale: 1.05,
      durability: 1,
      convertible: true
    },
    brute: {
      asset: "brute",
      height: 5.15,
      rotationY: Math.PI / 2,
      speed: [2.25, 2.7],
      animationSpeed: [0.82, 1.0],
      reward: 30,
      attackDamage: 72,
      attackInterval: 1.75,
      grabBox: [2.05, 5.4, 2.05],
      grabY: 2.45,
      throwScale: 0.12,
      durability: 4,
      convertible: false
    },
    siege: {
      asset: "siege",
      height: 14.8,
      rotationY: Math.PI / 2,
      speed: [1.82, 2.08],
      animationSpeed: [0.72, 0.9],
      reward: 50,
      attackDamage: 120,
      attackInterval: 6.8,
      grabBox: [5.4, 12.4, 7.0],
      grabY: 5.3,
      throwScale: 0,
      durability: 8,
      convertible: false,
      siegeStopOffset: 8.4
    }
  },

  enemy: {
    spawnXMin: -24.8,
    spawnXMax: -23.8,
    groundDeathScreenFraction: 0.5,
    hardSurfaceKillSpeed: 10.5,
    treeKillSpeed: 10.5,
    collisionRadius: 0.58,
    playableZMin: -5.35,
    playableZMax: 5.35
  },

  defence: {
    turretMaxLevel: 3,
    fireStagger: 1,
    bombMaxCharges: 2,
    bombFirstSoulCost: 25,
    bombSecondSoulCost: 50,
    bombOverchargeMaxCharges: 3,
    hellfireMaxSouls: 50,
    hellfireSecondCrossbowSouls: 25,
    occultMaxSouls: 40,
    occultSecondStrikeSouls: 20,
    occultRadius: 3.6,
    undercroftRepairPerSoul: 25
  },

  pool: {
    // Pools cover the absolute live-enemy cap (plus the 3 simultaneous
    // extraction slots for convertible Husk-family types) so gameplay never
    // has to clone a skinned GLB or create an AnimationMixer mid-wave.
    husk: 33,
    strong: 33,
    runner: 33,
    brute: 30,
    siege: 26,
    effects: 44
  },


  hellwing: {
    unlockWave: 45,
    impactHealthFraction: 0.10,
    adaptiveStopHealth: 0.50,
    finalAdaptiveStopHealth: 0.30,
    guaranteedByWave: { 45: 1, 46: 1, 47: 1, 48: 1, 49: 1, 50: 6 },
    adaptiveMaxByWave: { 45: 1, 46: 1, 47: 2, 48: 2, 49: 3, 50: 4 },
    poolSize: 4
  },

  mobileDifficulty: {
    lateWaveStart: 35,
    maxActiveBonus: 2,
    spawnGapMultiplier: 0.92,
    finalWaveStart: 45,
    finalMaxActiveBonus: 5,
    finalSpawnGapMultiplier: 0.83,
    lateHeavy: {
      45: { brute: 55, siege: 18 },
      46: { brute: 62, siege: 21 },
      47: { brute: 70, siege: 24 },
      48: { brute: 78, siege: 28 },
      49: { brute: 84, siege: 31 },
      50: { brute: 90, siege: 35 }
    }
  },

  newGamePlus: {
    enemySpeedMultiplier: 1.14,
    enemyAttackMultiplier: 1.20,
    enemyAttackIntervalMultiplier: 0.94,
    soulRewardMultiplier: 1.20,
    waveCountMultiplier: 1.25,
    maxActive: 30,
    runnerWave: 5,
    strongWave: 10,
    bruteWave: 18,
    siegeWave: 28
  },

  ranking: {
    bindingMaxTarget: 150,
    defenceDamageThresholds: [18000, 45000, 70000, 95000],
    newGamePlusDefenceScale: 1.25
  },

  helpers: { round10 },
  waves
});
