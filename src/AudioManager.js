const AudioContextClass = window.AudioContext || window.webkitAudioContext;

const DEFAULT_LIMITS = Object.freeze({
  ash: 4,
  attack: 5,
  bodyImpact: 5,
  bombExplosion: 1,
  crossbowFire: 3,
  click: 2,
  deniedPurchase: 1,
  gameOver: 1,
  purchase: 2,
  soulBling: 3,
  soulCollect: 5,
  waveStart: 1,
  whoosh: 3
});

const DEFAULT_COOLDOWNS = Object.freeze({
  ash: 0.045,
  attack: 0.055,
  bodyImpact: 0.035,
  bombExplosion: 0.2,
  crossbowFire: 0.04,
  click: 0.025,
  deniedPurchase: 0.12,
  gameOver: 0.2,
  purchase: 0.08,
  soulBling: 0.08,
  soulCollect: 0.035,
  waveStart: 0.2,
  whoosh: 0.025
});

export class AudioManager {
  constructor(files) {
    this.files = files;
    this.context = AudioContextClass ? new AudioContextClass() : null;
    this.buffers = new Map();
    this.failed = new Set();
    this.activeCounts = new Map();
    this.lastPlayedAt = new Map();
    this.music = null;
    this.musicKey = null;
    this.musicGeneration = 0;
    this.loops = new Map();

    if (!this.context) return;

    this.masterGain = this.context.createGain();
    this.sfxGain = this.context.createGain();
    this.musicGain = this.context.createGain();

    this.masterGain.gain.value = 0.92;
    this.sfxGain.gain.value = 0.95;
    this.musicGain.gain.value = 0.34;

    this.sfxGain.connect(this.masterGain);
    this.musicGain.connect(this.masterGain);
    this.masterGain.connect(this.context.destination);
  }

  async loadAll(onProgress = null) {
    if (!this.context) return;

    const entries = Object.entries(this.files);
    let completed = 0;

    await Promise.all(entries.map(async ([key, url]) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const buffer = await this.context.decodeAudioData(arrayBuffer.slice(0));
        this.buffers.set(key, buffer);
      } catch (error) {
        this.failed.add(key);
        console.warn(`Audio file could not be loaded: ${url}`, error);
      } finally {
        completed += 1;
        onProgress?.(completed / Math.max(entries.length, 1), key);
      }
    }));
  }

  async unlock() {
    if (!this.context) return false;
    if (this.context.state !== "running") {
      try {
        await this.context.resume();
      } catch (error) {
        console.warn("Audio could not be resumed.", error);
        return false;
      }
    }
    return this.context.state === "running";
  }

  randomBetween(minimum, maximum) {
    return minimum + Math.random() * (maximum - minimum);
  }

  prime(key, { music = false } = {}) {
    if (!this.context || this.context.state !== "running") return false;
    const buffer = this.buffers.get(key);
    if (!buffer) return false;

    // Create and briefly run the same WebAudio node path used during gameplay,
    // but do not touch cooldown/instance bookkeeping. This avoids the first
    // audible use of a sound being the browser's first source/gain allocation.
    const source = this.context.createBufferSource();
    const gain = this.context.createGain();
    source.buffer = buffer;
    gain.gain.value = 0.000001;
    source.connect(gain);
    gain.connect(music ? this.musicGain : this.sfxGain);
    const now = this.context.currentTime;
    const duration = Math.max(0.008, Math.min(0.025, buffer.duration || 0.02));
    source.start(now, 0, duration);
    source.addEventListener("ended", () => {
      try { source.disconnect(); } catch {}
      try { gain.disconnect(); } catch {}
    }, { once: true });
    return true;
  }

  primeAllPlaybackPaths() {
    const musicKeys = new Set(["background1", "background2", "newDawn"]);
    for (const key of this.buffers.keys()) {
      this.prime(key, { music: musicKeys.has(key) });
    }
  }

  play(key, {
    volume = 1,
    rate = null,
    pitchMin = 1,
    pitchMax = 1,
    cooldown = DEFAULT_COOLDOWNS[key] ?? 0,
    maxInstances = DEFAULT_LIMITS[key] ?? 4
  } = {}) {
    if (!this.context || this.context.state !== "running") return null;
    const buffer = this.buffers.get(key);
    if (!buffer) return null;

    const now = this.context.currentTime;
    const previous = this.lastPlayedAt.get(key) ?? -Infinity;
    if (now - previous < cooldown) return null;

    const active = this.activeCounts.get(key) ?? 0;
    if (active >= maxInstances) return null;

    const source = this.context.createBufferSource();
    const gain = this.context.createGain();
    source.buffer = buffer;
    source.playbackRate.value = rate ?? this.randomBetween(pitchMin, pitchMax);
    gain.gain.value = Math.max(0, volume);
    source.connect(gain);
    gain.connect(this.sfxGain);

    this.lastPlayedAt.set(key, now);
    this.activeCounts.set(key, active + 1);

    source.addEventListener("ended", () => {
      source.disconnect();
      gain.disconnect();
      this.activeCounts.set(
        key,
        Math.max(0, (this.activeCounts.get(key) ?? 1) - 1)
      );
    }, { once: true });

    source.start();
    return source;
  }

  playBodyImpact(strength = 8) {
    const intensity = Math.min(Math.max(strength / 15, 0), 1);
    return this.play("bodyImpact", {
      volume: (0.48 + intensity * 0.42) * 0.60,
      pitchMin: 0.82,
      pitchMax: 1.18
    });
  }

  playThrow(speed = 12) {
    const intensity = Math.min(Math.max(speed / 38, 0), 1);
    const baseRate = 0.84 + intensity * 0.27;
    return this.play("whoosh", {
      volume: 0.54 + intensity * 0.30,
      rate: baseRate * this.randomBetween(0.96, 1.04)
    });
  }

  playMusic(key, fadeSeconds = 0.8, loop = true) {
    if (!this.context || this.context.state !== "running") return;
    const buffer = this.buffers.get(key);
    if (!buffer || this.musicKey === key) return;

    const now = this.context.currentTime;
    const generation = ++this.musicGeneration;
    const oldMusic = this.music;

    const source = this.context.createBufferSource();
    const gain = this.context.createGain();
    source.buffer = buffer;
    source.loop = loop;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(1, now + Math.max(fadeSeconds, 0.05));
    source.connect(gain);
    gain.connect(this.musicGain);
    source.start(now);

    this.music = { source, gain, generation };
    this.musicKey = key;

    source.addEventListener("ended", () => {
      if (this.music?.generation === generation) {
        this.music = null;
        this.musicKey = null;
      }
      try { source.disconnect(); } catch {}
      try { gain.disconnect(); } catch {}
    }, { once: true });

    if (oldMusic) {
      const oldValue = Math.max(oldMusic.gain.gain.value, 0.0001);
      oldMusic.gain.gain.cancelScheduledValues(now);
      oldMusic.gain.gain.setValueAtTime(oldValue, now);
      oldMusic.gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + Math.max(fadeSeconds, 0.05)
      );
      window.setTimeout(() => {
        try {
          oldMusic.source.stop();
        } catch {
          // The source may already have ended or been stopped.
        }
        oldMusic.source.disconnect();
        oldMusic.gain.disconnect();
      }, Math.ceil((fadeSeconds + 0.1) * 1000));
    }
  }

  playLoop(key, tag = key, { volume = 0.5, fadeSeconds = 0.2 } = {}) {
    if (!this.context || this.context.state !== "running") return null;
    if (this.loops.has(tag)) return this.loops.get(tag);
    const buffer = this.buffers.get(key);
    if (!buffer) return null;

    const now = this.context.currentTime;
    const source = this.context.createBufferSource();
    const gain = this.context.createGain();
    source.buffer = buffer;
    source.loop = true;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume), now + Math.max(0.05, fadeSeconds));
    source.connect(gain);
    gain.connect(this.sfxGain);
    source.start(now);
    const loop = { source, gain, key, tag };
    this.loops.set(tag, loop);
    return loop;
  }

  stopLoop(tag, fadeSeconds = 0.25) {
    if (!this.context) return;
    const loop = this.loops.get(tag);
    if (!loop) return;
    this.loops.delete(tag);
    const now = this.context.currentTime;
    loop.gain.gain.cancelScheduledValues(now);
    loop.gain.gain.setValueAtTime(Math.max(loop.gain.gain.value, 0.0001), now);
    loop.gain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(0.05, fadeSeconds));
    window.setTimeout(() => {
      try { loop.source.stop(); } catch {}
      try { loop.source.disconnect(); } catch {}
      try { loop.gain.disconnect(); } catch {}
    }, Math.ceil((fadeSeconds + 0.08) * 1000));
  }

  setMusicLevel(level, seconds = 0.35) {
    if (!this.context || !this.musicGain) return;
    const now = this.context.currentTime;
    this.musicGain.gain.cancelScheduledValues(now);
    this.musicGain.gain.setValueAtTime(this.musicGain.gain.value, now);
    this.musicGain.gain.linearRampToValueAtTime(
      Math.max(0, level),
      now + Math.max(seconds, 0.01)
    );
  }

  stopMusic(fadeSeconds = 0.8) {
    if (!this.context || !this.music) return;
    const music = this.music;
    const now = this.context.currentTime;
    this.music = null;
    this.musicKey = null;
    this.musicGeneration += 1;

    music.gain.gain.cancelScheduledValues(now);
    music.gain.gain.setValueAtTime(Math.max(music.gain.gain.value, 0.0001), now);
    music.gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + Math.max(fadeSeconds, 0.05)
    );

    window.setTimeout(() => {
      try {
        music.source.stop();
      } catch {
        // The source may already have ended or been stopped.
      }
      music.source.disconnect();
      music.gain.disconnect();
    }, Math.ceil((fadeSeconds + 0.1) * 1000));
  }

  dispose() {
    for (const tag of [...this.loops.keys()]) this.stopLoop(tag, 0.05);
    this.stopMusic(0.05);
    if (this.context && this.context.state !== "closed") {
      this.context.close().catch(() => {});
    }
  }
}
