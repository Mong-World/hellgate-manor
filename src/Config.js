function makeWave(wave) {
  if (wave === 1) {
    return {
      counts: { husk: 10, strong: 0, runner: 0, brute: 0, siege: 0 },
      maxActive: 25,
      initialDelay: 7,
      spawnGap: 3.5,
      burstChance: 0,
      burstMax: 1
    };
  }

  if (wave === 2) {
    return {
      counts: { husk: 16, strong: 0, runner: 0, brute: 0, siege: 0 },
      maxActive: 25,
      initialDelay: 4.2,
      spawnGap: 2.65,
      burstChance: 0.18,
      burstMax: 2
    };
  }

  if (wave === 3) {
    return {
      counts: { husk: 20, strong: 0, runner: 0, brute: 0, siege: 0 },
      maxActive: 25,
      initialDelay: 3.5,
      spawnGap: 2.05,
      burstChance: 0.28,
      burstMax: 2
    };
  }

  if (wave === 4) {
    return {
      counts: { husk: 22, strong: 0, runner: 4, brute: 0, siege: 0 },
      maxActive: 25,
      initialDelay: 3.0,
      spawnGap: 1.65,
      burstChance: 0.38,
      burstMax: 2
    };
  }

  if (wave === 5) {
    return {
      counts: { husk: 28, strong: 0, runner: 6, brute: 0, siege: 0 },
      maxActive: 25,
      initialDelay: 2.7,
      spawnGap: 1.30,
      burstChance: 0.50,
      burstMax: 3
    };
  }

  const husk = Math.round(20 + wave * 1.18);
  const runner = wave >= 4
    ? Math.min(22, Math.max(3, Math.floor((wave - 1) * 0.48)))
    : 0;
  const strong = wave >= 8
    ? Math.min(19, Math.max(1, Math.floor((wave - 6) * 0.42)))
    : 0;
  const brute = wave >= 12
    ? Math.min(10, Math.max(1, Math.floor((wave - 10) * 0.21)))
    : 0;
  const siege = wave >= 25
    ? Math.min(4, 1 + Math.floor((wave - 25) / 9) + (wave >= 46 ? 1 : 0))
    : 0;

  return {
    counts: { husk, strong, runner, brute, siege },
    maxActive: 25,
    initialDelay: wave <= 8 ? 2.4 : 1.8,
    spawnGap: Math.max(0.58, 1.25 - (wave - 6) * 0.014),
    burstChance: Math.min(0.78, 0.50 + (wave - 6) * 0.007),
    burstMax:
      wave < 10 ? 3 :
      wave < 18 ? 4 :
      wave < 30 ? 5 : 6
  };
}

const waves = Array.from({ length: 50 }, (_, index) => makeWave(index + 1));

export const CONFIG = Object.freeze({
  assets: {
    husk: "./assets/husk.glb",
    runner: "./assets/running-crawl.glb",
    brute: "./assets/slow-walk.glb",
    siege: "./assets/skinny-monster.glb",
    manor: "./assets/manor.glb"
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
    purchase: "./sounds/purchasesound.mp3",
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
    repairs: {
      minor: { cost: 20, amount: 50 },
      major: { cost: 80, amount: 250 },
      full: { cost: 330, amount: 1000 }
    },
    fortify: { cost: 130, amount: 100 },
    majorFortify: { cost: 1250, amount: 1000 }
  },

  buildings: {
    extraction: { cost: 830, label: "SOUL EXTRACTION" },
    hellfire: { cost: 1330, label: "HELLFIRE BATTERY" },
    demolition: { cost: 2500, label: "HELL BOMB FORGE" },
    undercroft: { cost: 4200, label: "UNDERCROFT" },
    occult: { cost: 6700, label: "OCCULT TOWER" }
  },

  extraction: {
    duration: 14,
    maxConcurrent: 2,
    radius: 2.35
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
      asset: "husk",
      height: 3.72,
      rotationY: Math.PI / 2,
      speed: [2.9, 3.3],
      animationSpeed: [1.0, 1.25],
      reward: 20,
      attackDamage: 18,
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
      attackDamage: 38,
      attackInterval: 1.75,
      grabBox: [2.05, 5.4, 2.05],
      grabY: 2.45,
      throwScale: 0.52,
      durability: 2,
      convertible: true
    },
    siege: {
      asset: "siege",
      height: 11.6,
      rotationY: Math.PI / 2,
      speed: [1.95, 2.3],
      animationSpeed: [0.8, 1.0],
      reward: 50,
      attackDamage: 90,
      attackInterval: 6.8,
      grabBox: [4.8, 9.8, 6.2],
      grabY: 4.2,
      throwScale: 0,
      durability: 5,
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
    collisionRadius: 0.58
  },

  defence: {
    turretMaxLevel: 3,
    baseFireInterval: 5,
    fireStagger: 1,
    bombMaxCharges: 3
  },

  pool: {
    husk: 25,
    strong: 19,
    runner: 22,
    brute: 10,
    siege: 5,
    effects: 36
  },

  waves
});
