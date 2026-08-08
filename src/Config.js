function makeWave(wave) {
  if (wave === 1) {
    return {
      counts: { husk: 10, strong: 0, runner: 0, brute: 0, siege: 0 },
      maxActive: 25,
      initialDelay: 7,
      spawnGap: 4.6,
      burstChance: 0,
      burstMax: 1
    };
  }

  if (wave === 2) {
    return {
      counts: { husk: 14, strong: 0, runner: 0, brute: 0, siege: 0 },
      maxActive: 25,
      initialDelay: 4.5,
      spawnGap: 4.0,
      burstChance: 0,
      burstMax: 1
    };
  }

  if (wave === 3) {
    return {
      counts: { husk: 18, strong: 0, runner: 0, brute: 0, siege: 0 },
      maxActive: 25,
      initialDelay: 4,
      spawnGap: 3.55,
      burstChance: 0,
      burstMax: 1
    };
  }

  const husk = Math.round(15 + wave * 1.12);
  const runner = wave >= 4
    ? Math.min(22, Math.max(2, Math.floor((wave - 2) * 0.46)))
    : 0;
  const strong = wave >= 8
    ? Math.min(19, Math.max(1, Math.floor((wave - 6) * 0.42)))
    : 0;
  const brute = wave >= 12
    ? Math.min(10, Math.max(1, Math.floor((wave - 10) * 0.21)))
    : 0;
  const siege = wave >= 18
    ? Math.min(5, 1 + Math.floor((wave - 18) / 9) + (wave >= 44 ? 1 : 0))
    : 0;

  return {
    counts: { husk, strong, runner, brute, siege },
    maxActive: 25,
    initialDelay: wave <= 5 ? 3.8 : 2.8,
    spawnGap: Math.max(0.82, 3.45 - (wave - 4) * 0.058),
    burstChance: Math.min(0.66, Math.max(0, (wave - 5) * 0.018)),
    burstMax:
      wave < 8 ? 1 :
      wave < 15 ? 2 :
      wave < 25 ? 3 :
      wave < 38 ? 4 : 5
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
    demolition: { cost: 2500, label: "DEMOLITION CRYPT" },
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
      height: 3.25,
      rotationY: Math.PI / 2,
      speed: [7.8, 8.9],
      animationSpeed: [1.1, 1.55],
      reward: 10,
      attackDamage: 13,
      attackInterval: 1.15,
      grabBox: [1.48, 3.7, 1.55],
      grabY: 1.65,
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
      height: 6.2,
      rotationY: Math.PI / 2,
      speed: [1.95, 2.3],
      animationSpeed: [0.8, 1.0],
      reward: 50,
      attackDamage: 90,
      attackInterval: 6.8,
      grabBox: [3.2, 5.4, 4.5],
      grabY: 2.2,
      throwScale: 0,
      durability: 5,
      convertible: false,
      siegeStopOffset: 8.4
    }
  },

  enemy: {
    spawnXMin: -29.2,
    spawnXMax: -27.8,
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
    husk: 12,
    strong: 8,
    runner: 10,
    brute: 7,
    siege: 5,
    effects: 32
  },

  waves
});
