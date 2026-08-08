import { CONFIG } from "./Config.js";

const C = {
  panel: "rgba(7,8,11,.95)",
  panel2: "rgba(14,14,18,.97)",
  border: "rgba(255,112,49,.72)",
  borderHot: "rgba(255,153,91,.94)",
  borderSoft: "rgba(255,102,38,.25)",
  iron: "rgba(125,117,113,.30)",
  orange: "#ff6a28",
  orangeLight: "#ffc39e",
  text: "#f4ebe3",
  muted: "#aaa19d",
  red: "#ef514e",
  purple: "#b58cff",
  amber: "#f0b56b"
};

export class UI {
  constructor(canvas, callbacks) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.callbacks = callbacks;
    this.mode = "loading";
    this.wave = 1;
    this.waveTotal = CONFIG.waves.length;
    this.souls = 0;
    this.health = CONFIG.manor.startHealth;
    this.maxHealth = CONFIG.manor.maxHealth;
    this.deaths = 0;
    this.boundSouls = 0;
    this.unassignedSouls = 0;
    this.bombs = 0;
    this.fortifyLevel = 0;
    this.extractionLevel = 0;
    this.buildings = {};
    this.assignments = {};
    this.purchaseCosts = {};
    this.unlockWaves = {};
    this.hasSave = false;
    this.bannerTitle = "";
    this.bannerSubtitle = "";
    this.bannerTimer = 0;
    this.healthFlash = 0;
    this.soulPulse = 0;
    this.boundPulse = 0;
    this.soulFlights = [];
    this.buttons = [];
    this.shopPage = 0;
    this.saveNoticeTimer = 0;
    this.saveNoticeSuccess = true;
    this.waveResults = { souls: 0, deaths: 0, damage: 0, health: this.health, maxHealth: this.maxHealth, saved: false };
    this.tutorial = null;
    this.developerMode = false;
    this.developerWave = 1;
    this.developerShop = false;
    this.developerPanelOpen = false;
    this.canRetry = true;
    this.continuesRemaining = 3;
    this.ngPlusUnlocked = false;
    this.bestRank = null;
    this.newGamePlus = false;
    this.endingData = null;
    this.endingElapsed = 0;

    this.touchDevice = window.matchMedia?.("(pointer: coarse)")?.matches || navigator.maxTouchPoints > 0;
    this.shopScroll = 0;
    this.shopScrollMax = 0;
    this.shopViewport = null;
    this.activeButtonClip = null;
    this.pointerGesture = null;
    this.tutorialDemonImage = new Image();
    this.tutorialDemonImage.decoding = "async";
    this.tutorialDemonImage.src = "./assets/demon-image.png";
    this.tutorialDemonReady = false;
    this.studioLogoImage = new Image();
    this.studioLogoImage.decoding = "async";
    this.studioLogoImage.src = "./assets/moofstudiogame.png";
    this.studioLogoReady = false;

    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.resize = this.resize.bind(this);
    window.addEventListener("pointerdown", this.onPointerDown, true);
    window.addEventListener("pointermove", this.onPointerMove, true);
    window.addEventListener("pointerup", this.onPointerUp, true);
    window.addEventListener("pointercancel", this.onPointerUp, true);
    window.addEventListener("wheel", this.onWheel, { passive: false, capture: true });
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  resize() {
    const maxDpr = this.isMobileLandscape() ? 1.35 : 2;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    this.canvas.width = Math.floor(window.innerWidth * dpr);
    this.canvas.height = Math.floor(window.innerHeight * dpr);
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.shopScroll = Math.min(this.shopScroll, this.shopScrollMax);
  }

  isMobileLandscape() {
    return !!this.touchDevice && window.innerWidth > window.innerHeight && window.innerHeight <= 700;
  }

  async preloadImageAsset(image, filename) {
    try {
      if (!(image.complete && image.naturalWidth > 0)) {
        await new Promise((resolve, reject) => {
          const onLoad = () => { cleanup(); resolve(); };
          const onError = () => { cleanup(); reject(new Error(`${filename} failed to load`)); };
          const cleanup = () => {
            image.removeEventListener("load", onLoad);
            image.removeEventListener("error", onError);
          };
          image.addEventListener("load", onLoad, { once: true });
          image.addEventListener("error", onError, { once: true });
        });
      }
      await image.decode?.().catch(() => {});
      if (!(image.naturalWidth > 0 && image.naturalHeight > 0)) {
        throw new Error(`${filename} has no usable image data`);
      }
      return true;
    } catch (error) {
      error.assetFilename = filename;
      throw error;
    }
  }

  async preloadVisualAssets() {
    await this.preloadImageAsset(this.tutorialDemonImage, "demon-image.png");
    this.tutorialDemonReady = true;
    await this.preloadImageAsset(this.studioLogoImage, "moofstudiogame.png");
    this.studioLogoReady = true;
    return true;
  }

  setMode(mode) {
    this.mode = mode;
    if (mode === "intermission") {
      this.shopPage = 0;
      this.shopScroll = 0;
    }
  }

  setHUD(data) {
    Object.assign(this, data);
  }

  setHasSave(hasSave) {
    this.hasSave = hasSave;
  }

  setMeta(meta = {}) {
    this.ngPlusUnlocked = !!meta.ngPlusUnlocked;
    this.bestRank = meta.bestRank ?? null;
  }

  startEndingSequence(data) {
    this.endingData = data;
    this.endingElapsed = 0;
    this.mode = "ending";
  }

  setDeveloperMode(enabled, wave = 1, shop = false) {
    this.developerMode = !!enabled;
    this.developerWave = Math.max(1, Math.floor(Number(wave) || 1));
    this.developerShop = !!shop;
  }

  setDeveloperPanel(open, wave = this.developerWave) {
    this.developerPanelOpen = !!open;
    this.developerWave = Math.max(1, Math.floor(Number(wave) || 1));
  }

  setContinueState({ canRetry = true, remaining = 3 } = {}) {
    this.canRetry = !!canRetry;
    this.continuesRemaining = Math.max(0, Math.floor(Number(remaining) || 0));
  }

  showExtractionTutorial() {
    this.tutorial = {
      title: "SOUL EXTRACTION",
      lines: [
        "GRAB A DEMON AND DROP IT INTO THE GLOWING PORTAL",
        "ABOVE THE MANOR TO CREATE A BOUND SOUL.",
        "WAIT FOR A BINDING SLOT TO BECOME FREE BEFORE DROPPING ANOTHER."
      ]
    };
  }

  setWaveResults(results) {
    this.waveResults = { ...this.waveResults, ...results };
  }

  showSaveNotice(success = true) {
    this.saveNoticeSuccess = success;
    this.saveNoticeTimer = 2.6;
  }

  showBanner(title, subtitle = "", duration = 2.2) {
    this.bannerTitle = title;
    this.bannerSubtitle = subtitle;
    this.bannerTimer = duration;
  }

  flashHealth() {
    this.healthFlash = 0.5;
  }

  pulseSouls() {
    this.soulPulse = 0.55;
  }

  pulseBound() {
    this.boundPulse = 0.55;
  }

  addSoulFlight(x, y, onArrive = null, scale = 1) {
    this.soulFlights.push({
      x,
      y,
      age: 0,
      duration: 0.72 + Math.random() * 0.16,
      onArrive,
      scale
    });
  }

  findButtonAt(x, y) {
    for (let i = this.buttons.length - 1; i >= 0; i -= 1) {
      const button = this.buttons[i];
      if (x >= button.x && x <= button.x + button.w && y >= button.y && y <= button.y + button.h) return button;
    }
    return null;
  }

  activateButton(button) {
    if (!button) return;
    this.callbacks.onUIClick?.();
    if (button.disabled) button.onDenied?.();
    else button.onClick?.();
  }

  pointInShopViewport(x, y) {
    const v = this.shopViewport;
    return !!v && x >= v.x && x <= v.x + v.w && y >= v.y && y <= v.y + v.h;
  }

  onPointerDown(event) {
    const x = event.clientX;
    const y = event.clientY;
    const button = this.findButtonAt(x, y);

    if (this.isMobileLandscape() && this.mode === "intermission" && this.pointInShopViewport(x, y)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.pointerGesture = {
        pointerId: event.pointerId,
        startY: y,
        lastY: y,
        moved: false,
        pendingButton: button
      };
      return;
    }

    if (button) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.activateButton(button);
    }
  }

  onPointerMove(event) {
    const gesture = this.pointerGesture;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    const dy = event.clientY - gesture.lastY;
    if (Math.abs(event.clientY - gesture.startY) > 7) gesture.moved = true;
    if (gesture.moved && this.shopScrollMax > 0) {
      this.shopScroll = Math.max(0, Math.min(this.shopScrollMax, this.shopScroll - dy));
      gesture.lastY = event.clientY;
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  onPointerUp(event) {
    const gesture = this.pointerGesture;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!gesture.moved && gesture.pendingButton) this.activateButton(gesture.pendingButton);
    this.pointerGesture = null;
  }

  onWheel(event) {
    if (this.mode !== "intermission" || !this.pointInShopViewport(event.clientX, event.clientY) || this.shopScrollMax <= 0) return;
    this.shopScroll = Math.max(0, Math.min(this.shopScrollMax, this.shopScroll + event.deltaY));
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  update(dt) {
    if (this.mode === "ending") this.endingElapsed += dt;
    this.bannerTimer = Math.max(0, this.bannerTimer - dt);
    this.healthFlash = Math.max(0, this.healthFlash - dt);
    this.soulPulse = Math.max(0, this.soulPulse - dt);
    this.boundPulse = Math.max(0, this.boundPulse - dt);
    this.saveNoticeTimer = Math.max(0, this.saveNoticeTimer - dt);
    for (let i = this.soulFlights.length - 1; i >= 0; i -= 1) {
      const flight = this.soulFlights[i];
      flight.age += dt;
      if (flight.age >= flight.duration) {
        this.soulFlights.splice(i, 1);
        this.pulseSouls();
        flight.onArrive?.();
      }
    }
  }

  draw() {
    const ctx = this.ctx;
    const width = window.innerWidth;
    const height = window.innerHeight;
    ctx.clearRect(0, 0, width, height);
    this.buttons = [];

    if (this.mode === "start") this.drawStart(width, height);
    else if (this.mode === "playing") {
      this.drawHUD(width, height);
      this.drawPauseButton(width, height);
      if (this.bannerTimer > 0) this.drawBanner(width, height);
    } else if (this.mode === "paused") {
      this.drawHUD(width, height);
      this.drawPaused(width, height);
    } else if (this.mode === "results") {
      this.drawHUD(width, height);
      this.drawResults(width, height);
    } else if (this.mode === "intermission") {
      this.drawHUD(width, height);
      this.drawIntermission(width, height);
      if (this.tutorial) this.drawTutorial(width, height);
    } else if (this.mode === "gameOver") {
      this.drawHUD(width, height);
      this.drawGameOver(width, height);
    } else if (this.mode === "ending") {
      this.drawEnding(width, height);
    } else if (this.mode === "complete") {
      this.drawComplete(width, height);
    }

    if (this.developerPanelOpen) this.drawDeveloperPanel(width, height);
  }

  font(size) {
    return `${size}px "Lansbury", Georgia, serif`;
  }

  dataFont(size, weight = 700) {
    return `${Math.max(weight, 760)} ${size}px "Arial Narrow","Roboto Condensed","Segoe UI",Arial,sans-serif`;
  }

  angularPath(x, y, width, height, cut = 10) {
    const ctx = this.ctx;
    const corner = Math.min(cut, width * 0.14, height * 0.26);
    ctx.beginPath();
    ctx.moveTo(x + corner, y);
    ctx.lineTo(x + width - corner, y);
    ctx.lineTo(x + width, y + corner);
    ctx.lineTo(x + width, y + height - corner);
    ctx.lineTo(x + width - corner, y + height);
    ctx.lineTo(x + corner, y + height);
    ctx.lineTo(x, y + height - corner);
    ctx.lineTo(x, y + corner);
    ctx.closePath();
  }

  panel(x, y, width, height, fill = C.panel, cut = 10) {
    const ctx = this.ctx;
    ctx.save();
    ctx.shadowColor = "rgba(255,70,18,.18)";
    ctx.shadowBlur = 10;
    this.angularPath(x, y, width, height, cut);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.shadowBlur = 0;
    this.angularPath(x, y, width, height, cut);
    ctx.strokeStyle = C.border;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }

  button(label, x, y, width, height, onClick, disabled = false, onDenied = null, accent = C.borderHot) {
    const ctx = this.ctx;
    ctx.save();
    this.angularPath(x, y, width, height, Math.min(8, height * 0.2));
    ctx.fillStyle = disabled ? "rgba(35,35,39,.96)" : "rgba(48,23,17,.98)";
    ctx.fill();
    ctx.strokeStyle = disabled ? "rgba(120,120,120,.25)" : accent;
    ctx.lineWidth = disabled ? 1 : 1.5;
    ctx.stroke();
    ctx.fillStyle = disabled ? "#777" : C.text;
    ctx.font = this.font(Math.min(23, height * 0.47));
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x + width / 2, y + height / 2 + 1);
    ctx.restore();

    const pad = this.touchDevice ? 5 : 0;
    let hit = { x: x - pad, y: y - pad, w: width + pad * 2, h: height + pad * 2 };
    if (this.activeButtonClip) {
      const c = this.activeButtonClip;
      const x1 = Math.max(hit.x, c.x);
      const y1 = Math.max(hit.y, c.y);
      const x2 = Math.min(hit.x + hit.w, c.x + c.w);
      const y2 = Math.min(hit.y + hit.h, c.y + c.h);
      if (x2 <= x1 || y2 <= y1) return;
      hit = { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
    }
    this.buttons.push({ ...hit, onClick, disabled, onDenied });
  }

  drawStudioLogo(centerX, centerY, maxWidth, maxHeight, alpha = 1) {
    if (!this.studioLogoReady || !this.studioLogoImage.naturalWidth) return;
    const image = this.studioLogoImage;
    // The source PNG intentionally has generous transparent space. Crop to the
    // actual logo artwork so it remains readable at menu/UI sizes.
    const sx = image.naturalWidth * (23 / 1200);
    const sy = image.naturalHeight * (415 / 1200);
    const sw = image.naturalWidth * ((1186 - 23) / 1200);
    const sh = image.naturalHeight * ((784 - 415) / 1200);
    const scale = Math.min(maxWidth / sw, maxHeight / sh);
    const dw = sw * scale;
    const dh = sh * scale;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha *= alpha;
    ctx.drawImage(image, sx, sy, sw, sh, centerX - dw / 2, centerY - dh / 2, dw, dh);
    ctx.restore();
  }

  drawStart(width, height) {
    const mobileLandscape = this.isMobileLandscape();
    const mobile = mobileLandscape || width < 700 || height < 620;
    const buttonCount = 1 + (this.hasSave && !this.developerMode ? 1 : 0) + (this.ngPlusUnlocked && !this.developerMode ? 1 : 0);

    // Keep the start menu tightly wrapped around its content. Earlier builds
    // reserved far more vertical space than the branding/buttons actually
    // needed, which made the whole lock-up look pinned to the top of a large
    // empty panel on desktop.
    const panelWidth = Math.min(
      mobileLandscape ? 470 : (mobile ? 500 : 520),
      width - (mobileLandscape ? 18 : 32)
    );
    const buttonHeight = mobileLandscape ? 38 : (mobile ? 46 : 50);
    const buttonGap = mobileLandscape ? 7 : 10;
    const topBlockHeight = mobileLandscape ? 103 : (mobile ? 128 : 137);
    const bestRankExtra = this.bestRank && !this.developerMode ? (mobileLandscape ? 18 : 23) : 0;
    const developerExtra = this.developerMode ? (mobileLandscape ? 27 : 36) : 0;
    const bottomPadding = mobileLandscape ? 15 : 24;
    const panelHeight = topBlockHeight + bestRankExtra +
      buttonCount * buttonHeight + Math.max(0, buttonCount - 1) * buttonGap +
      bottomPadding + developerExtra;

    const x = (width - panelWidth) / 2;
    const y = (height - panelHeight) / 2;
    this.panel(x, y, panelWidth, panelHeight, C.panel, 14);

    const ctx = this.ctx;
    ctx.textAlign = "center";
    ctx.fillStyle = C.text;
    ctx.font = this.font(mobileLandscape ? 32 : (mobile ? 38 : 50));
    ctx.shadowColor = "rgba(255,80,24,.7)";
    ctx.shadowBlur = 12;
    const titleY = y + (mobileLandscape ? 32 : (mobile ? 43 : 48));
    ctx.fillText("HELLGATE MANOR", width / 2, titleY);
    ctx.shadowBlur = 0;

    // Small production credit immediately beneath the title.
    const logoCenterY = titleY + (mobileLandscape ? 18 : (mobile ? 23 : 27));
    this.drawStudioLogo(
      width / 2,
      logoCenterY,
      mobileLandscape ? 88 : (mobile ? 106 : 122),
      mobileLandscape ? 24 : (mobile ? 29 : 33)
    );

    ctx.fillStyle = C.muted;
    ctx.font = this.dataFont(mobileLandscape ? 9 : (mobile ? 11 : 13), 800);
    const taglineY = logoCenterY + (mobileLandscape ? 20 : (mobile ? 25 : 28));
    ctx.fillText("DEFEND THE MANOR.", width / 2, taglineY);

    let contentY = taglineY;
    if (this.bestRank && !this.developerMode) {
      ctx.fillStyle = C.orangeLight;
      ctx.font = this.dataFont(mobileLandscape ? 8 : (mobile ? 10 : 12), 900);
      contentY += mobileLandscape ? 16 : 21;
      ctx.fillText(`BEST RANK  ${this.bestRank}`, width / 2, contentY);
    }

    // Start the buttons directly below the branding block instead of leaving
    // a large dead area in the panel.
    let buttonY = contentY + (mobileLandscape ? 12 : (mobile ? 18 : 21));
    this.button("NEW GAME", width / 2 - 105, buttonY, 210, buttonHeight, () => this.callbacks.onNewGame?.());
    buttonY += buttonHeight + buttonGap;

    if (this.hasSave && !this.developerMode) {
      this.button("CONTINUE", width / 2 - 105, buttonY, 210, buttonHeight, () => this.callbacks.onContinueSave?.());
      buttonY += buttonHeight + buttonGap;
    }

    if (this.ngPlusUnlocked && !this.developerMode) {
      this.button("NEW GAME+ (HELL MODE)", width / 2 - 130, buttonY, 260, buttonHeight, () => this.callbacks.onNewGamePlus?.(), false, null, C.red);
      buttonY += buttonHeight + buttonGap;
    }

    if (this.developerMode) {
      ctx.fillStyle = C.purple;
      ctx.font = this.dataFont(mobile ? 10 : 12, 900);
      const modeText = this.developerShop ? "SHOP TEST" : "WAVE TEST";
      ctx.fillText(`DEVELOPER TEST — ${modeText} ${this.developerWave}`, width / 2, y + panelHeight - (mobileLandscape ? 12 : 16));
    }
  }

  drawHUD(width, height) {
    if (this.isMobileLandscape()) return this.drawMobileHUD(width, height);
    const compact = width < 820;
    const margin = compact ? 12 : 20;
    const hudHeight = compact ? 62 : 68;
    const y = height - margin - hudHeight;
    const leftWidth = compact ? 145 : 180;
    const rightWidth = compact ? 168 : 215;
    const healthWidth = Math.min(compact ? 245 : 350, width * 0.35);
    const leftX = margin;
    const healthX = (width - healthWidth) / 2;
    const rightX = width - margin - rightWidth;
    const ctx = this.ctx;

    this.panel(leftX, y, leftWidth, hudHeight, C.panel, 8);
    ctx.textAlign = "left";
    ctx.fillStyle = C.orangeLight;
    ctx.font = this.font(compact ? 19 : 23);
    ctx.fillText(`WAVE ${this.wave}`, leftX + 11, y + 25);
    if (this.newGamePlus) {
      ctx.fillStyle = C.red;
      ctx.font = this.dataFont(compact ? 8 : 9, 900);
      ctx.fillText("HELL MODE", leftX + leftWidth - (compact ? 58 : 68), y + 18);
    }
    ctx.fillStyle = C.text;
    ctx.font = this.dataFont(compact ? 10 : 11, 840);
    ctx.fillText(`DEMON DEATHS ${this.deaths}`, leftX + 11, y + 48);

    this.panel(healthX, y, healthWidth, hudHeight, C.panel, 8);
    ctx.textAlign = "center";
    ctx.fillStyle = C.text;
    ctx.font = this.font(compact ? 17 : 20);
    ctx.fillText("MANOR", width / 2, y + 23);
    const barX = healthX + 13;
    const barY = y + 35;
    const barWidth = healthWidth - 26;
    const ratio = Math.max(0, Math.min(1, this.health / this.maxHealth));
    ctx.fillStyle = "rgba(255,255,255,.07)";
    ctx.fillRect(barX, barY, barWidth, 14);
    ctx.fillStyle = this.healthFlash > 0 || ratio <= 0.35 ? C.red : C.orange;
    ctx.fillRect(barX, barY, barWidth * ratio, 14);
    ctx.strokeStyle = "rgba(255,255,255,.18)";
    ctx.strokeRect(barX, barY, barWidth, 14);
    ctx.fillStyle = C.text;
    ctx.font = this.dataFont(compact ? 9 : 10, 850);
    ctx.fillText(`${Math.ceil(this.health)} / ${this.maxHealth}`, width / 2, barY + 12);

    const pulse = this.soulPulse > 0 ? 1 + this.soulPulse * 0.11 : 1;
    ctx.save();
    ctx.translate(rightX + rightWidth / 2, y + hudHeight / 2);
    ctx.scale(pulse, pulse);
    ctx.translate(-(rightX + rightWidth / 2), -(y + hudHeight / 2));
    this.panel(rightX, y, rightWidth, hudHeight, C.panel, 8);
    ctx.textAlign = "left";
    ctx.fillStyle = C.orangeLight;
    ctx.font = this.dataFont(compact ? 10 : 11, 900);
    ctx.fillText("SOULS", rightX + 14, y + 18);
    ctx.fillStyle = C.orange;
    ctx.beginPath();
    ctx.arc(rightX + 18, y + 38, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = C.text;
    ctx.font = this.dataFont(compact ? 24 : 29, 900);
    ctx.fillText(String(this.souls), rightX + 34, y + 47);
    ctx.restore();

    if (this.soulPulse > 0) {
      ctx.save();
      ctx.shadowColor = "rgba(255,108,40,.95)";
      ctx.shadowBlur = 12 + this.soulPulse * 24;
      this.angularPath(rightX - 1, y - 1, rightWidth + 2, hudHeight + 2, 8);
      ctx.strokeStyle = `rgba(255,150,86,${0.28 + this.soulPulse})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }

    let upperY = y - 44;
    if (this.boundSouls > 0) {
      const boundH = 36;
      const bpulse = this.boundPulse > 0 ? 1 + this.boundPulse * 0.08 : 1;
      ctx.save();
      ctx.translate(rightX + rightWidth / 2, upperY + boundH / 2);
      ctx.scale(bpulse, bpulse);
      ctx.translate(-(rightX + rightWidth / 2), -(upperY + boundH / 2));
      this.panel(rightX, upperY, rightWidth, boundH, C.panel, 7);
      ctx.fillStyle = C.orangeLight;
      ctx.font = this.dataFont(compact ? 9 : 10, 900);
      ctx.textAlign = "left";
      ctx.fillText("BOUND SOULS", rightX + 12, upperY + 14);
      ctx.fillStyle = "#ffe2bb";
      ctx.font = this.dataFont(compact ? 16 : 18, 900);
      ctx.textAlign = "right";
      ctx.fillText(String(this.boundSouls), rightX + rightWidth - 12, upperY + 24);
      ctx.restore();
      upperY -= 42;
    }

    if (this.bombs > 0) {
      const bombW = compact ? 132 : 150;
      this.button(
        `HELL BOMB ×${this.bombs}`,
        width - margin - bombW,
        upperY,
        bombW,
        36,
        () => this.callbacks.onBomb?.(),
        false
      );
    }

    this.drawSoulFlights(width, height);
  }

  drawMobileHUD(width, height) {
    const ctx = this.ctx;
    const margin = 5;
    const hudH = 36;
    const y = height - margin - hudH;
    const leftW = Math.min(98, width * 0.155);
    const rightW = Math.min(106, width * 0.165);
    const healthW = Math.min(205, Math.max(150, width * 0.265));
    const leftX = margin;
    const rightX = width - margin - rightW;
    const healthX = (width - healthW) / 2;

    this.panel(leftX, y, leftW, hudH, "rgba(7,8,11,.90)", 6);
    ctx.textAlign = "left";
    ctx.fillStyle = C.orangeLight;
    ctx.font = this.font(13);
    ctx.fillText(`WAVE ${this.wave}`, leftX + 7, y + 15);
    ctx.fillStyle = C.text;
    ctx.font = this.dataFont(7, 850);
    ctx.fillText(`DEATHS ${this.deaths}`, leftX + 7, y + 29);
    if (this.newGamePlus) {
      ctx.textAlign = "right";
      ctx.fillStyle = C.red;
      ctx.font = this.dataFont(6, 900);
      ctx.fillText("HELL", leftX + leftW - 6, y + 13);
    }

    this.panel(healthX, y, healthW, hudH, "rgba(7,8,11,.90)", 6);
    ctx.textAlign = "center";
    ctx.fillStyle = C.text;
    ctx.font = this.font(12);
    ctx.fillText("MANOR", width / 2, y + 14);
    const barX = healthX + 8;
    const barY = y + 22;
    const barW = healthW - 16;
    const ratio = Math.max(0, Math.min(1, this.health / this.maxHealth));
    ctx.fillStyle = "rgba(255,255,255,.07)";
    ctx.fillRect(barX, barY, barW, 8);
    ctx.fillStyle = this.healthFlash > 0 || ratio <= 0.35 ? C.red : C.orange;
    ctx.fillRect(barX, barY, barW * ratio, 8);
    ctx.strokeStyle = "rgba(255,255,255,.18)";
    ctx.strokeRect(barX, barY, barW, 8);
    ctx.fillStyle = C.text;
    ctx.font = this.dataFont(6, 900);
    ctx.fillText(`${Math.ceil(this.health)} / ${this.maxHealth}`, width / 2, barY + 7);

    const pulse = this.soulPulse > 0 ? 1 + this.soulPulse * 0.065 : 1;
    ctx.save();
    ctx.translate(rightX + rightW / 2, y + hudH / 2);
    ctx.scale(pulse, pulse);
    ctx.translate(-(rightX + rightW / 2), -(y + hudH / 2));
    this.panel(rightX, y, rightW, hudH, "rgba(7,8,11,.90)", 6);
    ctx.textAlign = "left";
    ctx.fillStyle = C.orangeLight;
    ctx.font = this.dataFont(7, 900);
    ctx.fillText("SOULS", rightX + 8, y + 12);
    ctx.fillStyle = C.orange;
    ctx.beginPath();
    ctx.arc(rightX + 11, y + 25, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = C.text;
    ctx.font = this.dataFont(16, 900);
    ctx.fillText(String(this.souls), rightX + 20, y + 30);
    ctx.restore();

    let upperY = y - 26;
    if (this.boundSouls > 0) {
      const boundH = 22;
      this.panel(rightX, upperY, rightW, boundH, "rgba(7,8,11,.88)", 5);
      ctx.textAlign = "left";
      ctx.fillStyle = C.orangeLight;
      ctx.font = this.dataFont(6, 900);
      ctx.fillText("BOUND", rightX + 7, upperY + 9);
      ctx.textAlign = "right";
      ctx.fillStyle = "#ffe2bb";
      ctx.font = this.dataFont(11, 900);
      ctx.fillText(String(this.boundSouls), rightX + rightW - 7, upperY + 16);
      upperY -= 26;
    }

    if (this.bombs > 0) {
      this.button(`BOMB ×${this.bombs}`, rightX + rightW - 78, upperY, 78, 25, () => this.callbacks.onBomb?.());
    }

    this.drawSoulFlights(width, height);
  }

  getSoulCounterPosition(width, height) {
    if (this.isMobileLandscape()) {
      const margin = 5;
      const hudH = 36;
      const rightW = Math.min(106, width * 0.165);
      const rightX = width - margin - rightW;
      return { x: rightX + 13, y: height - margin - hudH + 25 };
    }
    const compact = width < 820;
    const margin = compact ? 12 : 20;
    const hudHeight = compact ? 62 : 68;
    const y = height - margin - hudHeight;
    const rightWidth = compact ? 168 : 215;
    const rightX = width - margin - rightWidth;
    return { x: rightX + 25, y: y + 38 };
  }

  drawSoulFlights(width, height) {
    if (this.soulFlights.length === 0) return;
    const target = this.getSoulCounterPosition(width, height);
    const ctx = this.ctx;
    for (const flight of this.soulFlights) {
      const t = Math.min(1, flight.age / flight.duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const controlX = (flight.x + target.x) * 0.5;
      const controlY = Math.min(flight.y, target.y) - 90;
      const inv = 1 - eased;
      const x = inv * inv * flight.x + 2 * inv * eased * controlX + eased * eased * target.x;
      const y = inv * inv * flight.y + 2 * inv * eased * controlY + eased * eased * target.y;
      const size = (5 + (1 - t) * 4) * (flight.scale ?? 1);
      ctx.save();
      ctx.globalAlpha = 0.45 + (1 - t) * 0.55;
      ctx.shadowColor = "rgba(255,111,38,.95)";
      ctx.shadowBlur = 16;
      ctx.fillStyle = "#ffd29a";
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  drawPauseButton(width) {
    const mobileTouch = this.isMobileLandscape();
    const compact = width < 820;
    const size = mobileTouch ? 44 : (compact ? 42 : 46);
    const margin = mobileTouch ? 7 : (compact ? 12 : 18);
    const x = width - margin - size;
    const y = margin;
    const ctx = this.ctx;
    this.panel(x, y, size, size, "rgba(7,8,11,.88)", 7);
    ctx.fillStyle = C.orangeLight;
    ctx.fillRect(x + size * 0.32, y + size * 0.27, size * 0.11, size * 0.46);
    ctx.fillRect(x + size * 0.57, y + size * 0.27, size * 0.11, size * 0.46);
    this.buttons.push({ x, y, w: size, h: size, onClick: () => this.callbacks.onPause?.(), disabled: false });
  }

  drawPaused(width, height) {
    const mobileLandscape = this.isMobileLandscape();
    const mobile = mobileLandscape || width < 700 || height < 620;
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,.68)";
    ctx.fillRect(0, 0, width, height);

    // Compact pause card: the branding, pause label and button are treated as
    // one centred block so there is no oversized empty lower half.
    const panelWidth = Math.min(mobileLandscape ? 360 : (mobile ? 390 : 405), width - (mobileLandscape ? 18 : 30));
    const panelHeight = mobileLandscape ? Math.min(180, height - 18) : (mobile ? 205 : 215);
    const x = (width - panelWidth) / 2;
    const y = (height - panelHeight) / 2;
    this.panel(x, y, panelWidth, panelHeight, C.panel, 13);

    ctx.textAlign = "center";
    ctx.fillStyle = C.text;
    ctx.font = this.font(mobileLandscape ? 25 : (mobile ? 31 : 36));
    ctx.shadowColor = "rgba(255,80,24,.55)";
    ctx.shadowBlur = 9;
    const titleY = y + (mobileLandscape ? 31 : (mobile ? 38 : 41));
    ctx.fillText("HELLGATE MANOR", width / 2, titleY);
    ctx.shadowBlur = 0;

    const logoCenterY = titleY + (mobileLandscape ? 17 : 22);
    this.drawStudioLogo(
      width / 2,
      logoCenterY,
      mobileLandscape ? 82 : (mobile ? 98 : 106),
      mobileLandscape ? 23 : (mobile ? 27 : 29)
    );

    ctx.fillStyle = C.orangeLight;
    ctx.font = this.font(mobileLandscape ? 23 : (mobile ? 27 : 30));
    const pausedY = logoCenterY + (mobileLandscape ? 35 : 43);
    ctx.fillText("PAUSED", width / 2, pausedY);

    ctx.fillStyle = C.muted;
    ctx.font = this.dataFont(mobileLandscape ? 8 : 10, 800);
    const helpY = pausedY + (mobileLandscape ? 18 : 22);
    ctx.fillText(mobileLandscape ? "TAP RESUME TO RETURN" : "ESC OR RESUME TO RETURN", width / 2, helpY);

    const buttonHeight = mobileLandscape ? 38 : (mobile ? 44 : 48);
    const buttonY = y + panelHeight - buttonHeight - (mobileLandscape ? 14 : 18);
    this.button(
      "RESUME",
      width / 2 - 105,
      buttonY,
      210,
      buttonHeight,
      () => this.callbacks.onPause?.()
    );
  }

  drawBanner(width, height) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = Math.min(1, this.bannerTimer / 0.35);
    ctx.textAlign = "center";
    ctx.fillStyle = C.text;
    ctx.font = this.font(Math.min(55, width * 0.06));
    ctx.shadowColor = "rgba(255,80,24,.7)";
    ctx.shadowBlur = 10;
    ctx.fillText(this.bannerTitle, width / 2, height * 0.34);
    ctx.shadowBlur = 0;
    if (this.bannerSubtitle) {
      ctx.fillStyle = C.orangeLight;
      ctx.font = this.dataFont(14, 800);
      ctx.fillText(this.bannerSubtitle, width / 2, height * 0.34 + 32);
    }
    ctx.restore();
  }

  drawResults(width, height) {
    if (this.isMobileLandscape()) return this.drawMobileResults(width, height);
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,.76)";
    ctx.fillRect(0, 0, width, height);

    const mobile = width < 720 || height < 620;
    const panelWidth = Math.min(mobile ? width - 24 : 610, width - 24);
    const panelHeight = Math.min(mobile ? 430 : 475, height - 24);
    const x = (width - panelWidth) / 2;
    const y = (height - panelHeight) / 2;
    this.panel(x, y, panelWidth, panelHeight, C.panel, 14);

    ctx.textAlign = "center";
    ctx.fillStyle = C.text;
    ctx.font = this.font(mobile ? 34 : 46);
    ctx.fillText(`WAVE ${this.wave} SURVIVED`, width / 2, y + (mobile ? 52 : 64));

    const r = this.waveResults;
    const rowX = x + (mobile ? 20 : 34);
    const rowW = panelWidth - (mobile ? 40 : 68);
    const rowH = mobile ? 50 : 54;
    const firstY = y + (mobile ? 82 : 96);
    const rows = [
      ["SOULS COLLECTED", `+${r.souls}`, C.orange],
      ["DEMONS DESTROYED", String(r.deaths), C.orangeLight],
      ["MANOR DAMAGE", r.damage > 0 ? `-${r.damage}` : "0", r.damage > 0 ? C.red : C.text],
      ["MANOR CONDITION", `${Math.ceil(r.health)} / ${r.maxHealth}`, C.text]
    ];

    rows.forEach(([label, value, color], index) => {
      const ry = firstY + index * (rowH + 6);
      this.panel(rowX, ry, rowW, rowH, C.panel2, 7);
      ctx.textAlign = "left";
      ctx.fillStyle = C.muted;
      ctx.font = this.dataFont(mobile ? 10 : 12, 850);
      ctx.fillText(label, rowX + 16, ry + 21);
      ctx.fillStyle = color;
      ctx.font = this.dataFont(mobile ? 22 : 26, 900);
      ctx.textAlign = "right";
      ctx.fillText(value, rowX + rowW - 16, ry + 35);
    });

    const saveY = firstY + 4 * (rowH + 6) + 4;
    ctx.save();
    ctx.translate(width / 2 - 84, saveY + 11);
    ctx.strokeStyle = r.saved ? C.orangeLight : C.muted;
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 16, 16);
    ctx.strokeRect(4, 2, 8, 5);
    ctx.fillStyle = r.saved ? C.orange : C.muted;
    ctx.fillRect(4, 11, 8, 3);
    ctx.restore();
    ctx.textAlign = "left";
    ctx.fillStyle = r.saved ? C.orangeLight : C.muted;
    ctx.font = this.dataFont(mobile ? 10 : 12, 900);
    ctx.fillText(r.saved ? "GAME DATA SAVED" : "SAVE UNAVAILABLE", width / 2 - 60, saveY + 25);

    this.button(
      "UPGRADES",
      width / 2 - 110,
      y + panelHeight - (mobile ? 58 : 64),
      220,
      mobile ? 46 : 48,
      () => this.callbacks.onResultsContinue?.()
    );
  }

  drawMobileResults(width, height) {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,.76)";
    ctx.fillRect(0, 0, width, height);

    const panelW = Math.min(620, width - 16);
    const panelH = height - 14;
    const x = (width - panelW) / 2;
    const y = 7;
    this.panel(x, y, panelW, panelH, C.panel, 11);

    ctx.textAlign = "center";
    ctx.fillStyle = C.text;
    ctx.font = this.font(27);
    ctx.fillText(`WAVE ${this.wave} SURVIVED`, width / 2, y + 34);

    const r = this.waveResults;
    const gap = 7;
    const cardW = (panelW - 34 - gap) / 2;
    const cardH = 57;
    const startX = x + 17;
    const firstY = y + 49;
    const cards = [
      ["SOULS COLLECTED", `+${r.souls}`, C.orange],
      ["DEMONS DESTROYED", String(r.deaths), C.orangeLight],
      ["MANOR DAMAGE", r.damage > 0 ? `-${r.damage}` : "0", r.damage > 0 ? C.red : C.text],
      ["MANOR CONDITION", `${Math.ceil(r.health)} / ${r.maxHealth}`, C.text]
    ];
    cards.forEach(([label, value, color], index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const cx = startX + col * (cardW + gap);
      const cy = firstY + row * (cardH + gap);
      this.panel(cx, cy, cardW, cardH, C.panel2, 6);
      ctx.textAlign = "left";
      ctx.fillStyle = C.muted;
      ctx.font = this.dataFont(8, 850);
      ctx.fillText(label, cx + 11, cy + 18);
      ctx.fillStyle = color;
      ctx.font = this.dataFont(19, 900);
      ctx.fillText(value, cx + 11, cy + 43);
    });

    const saveY = firstY + 2 * (cardH + gap) + 2;
    ctx.textAlign = "center";
    ctx.fillStyle = r.saved ? C.orangeLight : C.muted;
    ctx.font = this.dataFont(9, 900);
    ctx.fillText(r.saved ? "▣  GAME DATA SAVED" : "SAVE UNAVAILABLE", width / 2, saveY + 14);

    this.button("UPGRADES", width / 2 - 94, y + panelH - 43, 188, 36, () => this.callbacks.onResultsContinue?.());
  }

  drawIntermission(width, height) {
    if (this.isMobileLandscape()) return this.drawMobileIntermission(width, height);
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,.72)";
    ctx.fillRect(0, 0, width, height);

    const mobile = width < 760 || height < 700;
    const panelWidth = Math.min(840, width - (mobile ? 18 : 50));
    const panelHeight = Math.min(mobile ? height - 16 : 650, height - 18);
    const x = (width - panelWidth) / 2;
    const y = (height - panelHeight) / 2;
    this.panel(x, y, panelWidth, panelHeight, C.panel, 14);

    ctx.textAlign = "center";
    ctx.fillStyle = C.text;
    ctx.font = this.font(mobile ? 31 : 43);
    ctx.fillText("MANOR UPGRADES", width / 2, y + (mobile ? 42 : 52));

    const saveSize = mobile ? 38 : 42;
    const saveX = x + panelWidth - saveSize - 16;
    const saveY = y + 13;
    ctx.save();
    this.angularPath(saveX, saveY, saveSize, saveSize, 6);
    ctx.fillStyle = "rgba(48,23,17,.98)";
    ctx.fill();
    ctx.strokeStyle = C.borderHot;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.strokeStyle = C.orangeLight;
    ctx.lineWidth = 2;
    ctx.strokeRect(saveX + 11, saveY + 9, 16, 18);
    ctx.strokeRect(saveX + 15, saveY + 11, 8, 6);
    ctx.fillStyle = C.orange;
    ctx.fillRect(saveX + 15, saveY + 22, 8, 3);
    ctx.restore();
    this.buttons.push({
      x: saveX,
      y: saveY,
      w: saveSize,
      h: saveSize,
      onClick: () => this.callbacks.onSave?.(),
      disabled: false
    });

    if (this.saveNoticeTimer > 0) {
      ctx.textAlign = "right";
      ctx.fillStyle = this.saveNoticeSuccess ? C.orangeLight : C.muted;
      ctx.font = this.dataFont(mobile ? 9 : 11, 900);
      ctx.fillText(
        this.saveNoticeSuccess ? "GAME DATA SAVED" : "SAVE UNAVAILABLE",
        saveX - 10,
        saveY + saveSize / 2 + 4
      );
      ctx.textAlign = "center";
    }

    const statOffset = mobile ? 76 : 104;
    const statLabelY = y + (mobile ? 64 : 77);
    const statValueY = y + (mobile ? 88 : 104);
    const healthRatio = Math.max(0, Math.min(1, this.maxHealth > 0 ? this.health / this.maxHealth : 0));
    const healthColor = healthRatio <= 0.25 ? C.red : (healthRatio <= 0.55 ? C.amber : C.text);

    ctx.textAlign = "center";
    ctx.fillStyle = C.orangeLight;
    ctx.font = this.dataFont(mobile ? 11 : 12, 900);
    ctx.fillText("SOULS", width / 2 - statOffset, statLabelY);
    ctx.fillStyle = C.orange;
    ctx.font = this.dataFont(mobile ? 24 : 29, 900);
    ctx.fillText(String(this.souls), width / 2 - statOffset, statValueY);

    ctx.fillStyle = C.orangeLight;
    ctx.font = this.dataFont(mobile ? 11 : 12, 900);
    ctx.fillText("MANOR HP", width / 2 + statOffset, statLabelY);
    ctx.fillStyle = healthColor;
    ctx.font = this.dataFont(mobile ? 20 : 24, 900);
    ctx.fillText(`${Math.ceil(this.health)} / ${Math.ceil(this.maxHealth)}`, width / 2 + statOffset, statValueY);

    const tabs = ["MANOR", "SYSTEMS", "BOUND SOULS"];
    const tabY = y + (mobile ? 101 : 118);
    const tabGap = 6;
    const tabW = (panelWidth - 32 - tabGap * 2) / 3;
    tabs.forEach((label, index) => {
      this.button(
        label,
        x + 16 + index * (tabW + tabGap),
        tabY,
        tabW,
        mobile ? 42 : 44,
        () => { this.shopPage = index; },
        false,
        null,
        index === this.shopPage ? C.borderHot : C.borderSoft
      );
    });

    const contentY = tabY + (mobile ? 50 : 54);
    const footerH = mobile ? 58 : 68;
    const availableH = y + panelHeight - footerH - contentY;
    if (this.shopPage === 0) this.drawManorShop(x + 16, contentY, panelWidth - 32, availableH, mobile);
    else if (this.shopPage === 1) this.drawSystemsShop(x + 16, contentY, panelWidth - 32, availableH, mobile);
    else this.drawAssignments(x + 16, contentY, panelWidth - 32, availableH, mobile);

    this.button(
      "CONTINUE",
      width / 2 - 108,
      y + panelHeight - (mobile ? 52 : 58),
      216,
      mobile ? 44 : 46,
      () => this.callbacks.onContinue?.()
    );
  }

  drawMobileIntermission(width, height) {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,.76)";
    ctx.fillRect(0, 0, width, height);

    const margin = 7;
    const x = margin;
    const y = margin;
    const panelWidth = width - margin * 2;
    const panelHeight = height - margin * 2;
    this.panel(x, y, panelWidth, panelHeight, C.panel, 11);

    ctx.textAlign = "left";
    ctx.fillStyle = C.text;
    ctx.font = this.font(25);
    ctx.fillText("MANOR UPGRADES", x + 16, y + 31);

    ctx.fillStyle = C.orangeLight;
    ctx.font = this.dataFont(8, 900);
    ctx.fillText("SOULS", x + 18, y + 50);
    ctx.fillStyle = C.orange;
    ctx.font = this.dataFont(20, 900);
    ctx.fillText(String(this.souls), x + 64, y + 51);

    const mobileHealthRatio = Math.max(0, Math.min(1, this.maxHealth > 0 ? this.health / this.maxHealth : 0));
    const mobileHealthColor = mobileHealthRatio <= 0.25 ? C.red : (mobileHealthRatio <= 0.55 ? C.amber : C.text);
    ctx.fillStyle = C.orangeLight;
    ctx.font = this.dataFont(8, 900);
    ctx.fillText("MANOR HP", x + 132, y + 50);
    ctx.fillStyle = mobileHealthColor;
    ctx.font = this.dataFont(15, 900);
    ctx.fillText(`${Math.ceil(this.health)} / ${Math.ceil(this.maxHealth)}`, x + 198, y + 51);

    const saveSize = 36;
    const saveX = x + panelWidth - saveSize - 12;
    const saveY = y + 10;
    ctx.save();
    this.angularPath(saveX, saveY, saveSize, saveSize, 5);
    ctx.fillStyle = "rgba(48,23,17,.98)";
    ctx.fill();
    ctx.strokeStyle = C.borderHot;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.strokeStyle = C.orangeLight;
    ctx.lineWidth = 1.8;
    ctx.strokeRect(saveX + 10, saveY + 8, 15, 17);
    ctx.strokeRect(saveX + 14, saveY + 10, 7, 5);
    ctx.fillStyle = C.orange;
    ctx.fillRect(saveX + 14, saveY + 21, 7, 3);
    ctx.restore();
    this.buttons.push({ x: saveX - 4, y: saveY - 4, w: saveSize + 8, h: saveSize + 8, onClick: () => this.callbacks.onSave?.(), disabled: false });

    if (this.saveNoticeTimer > 0) {
      ctx.textAlign = "right";
      ctx.fillStyle = this.saveNoticeSuccess ? C.orangeLight : C.muted;
      ctx.font = this.dataFont(8, 900);
      ctx.fillText(this.saveNoticeSuccess ? "GAME DATA SAVED" : "SAVE UNAVAILABLE", saveX - 8, saveY + 21);
    }

    const tabs = ["MANOR", "SYSTEMS", "BOUND SOULS"];
    const tabY = y + 61;
    const tabGap = 5;
    const tabW = (panelWidth - 24 - tabGap * 2) / 3;
    tabs.forEach((label, index) => {
      this.button(
        label,
        x + 12 + index * (tabW + tabGap),
        tabY,
        tabW,
        38,
        () => { this.shopPage = index; this.shopScroll = 0; },
        false,
        null,
        index === this.shopPage ? C.borderHot : C.borderSoft
      );
    });

    const footerH = 50;
    const viewportY = tabY + 44;
    const viewportBottom = y + panelHeight - footerH;
    const viewportH = Math.max(90, viewportBottom - viewportY);
    const viewportX = x + 12;
    const viewportW = panelWidth - 24;
    this.shopViewport = { x: viewportX, y: viewportY, w: viewportW, h: viewportH };

    let contentHeight = 330;
    if (this.shopPage === 2) {
      const systemCount = [this.buildings.hellfire, this.buildings.demolition, this.buildings.undercroft, this.buildings.occult].filter(Boolean).length;
      contentHeight = systemCount > 0 ? 42 + systemCount * 86 + Math.max(0, systemCount - 1) * 8 : 130;
    }
    this.shopScrollMax = Math.max(0, contentHeight - viewportH);
    this.shopScroll = Math.max(0, Math.min(this.shopScrollMax, this.shopScroll));

    ctx.save();
    ctx.beginPath();
    ctx.rect(viewportX, viewportY, viewportW, viewportH);
    ctx.clip();
    this.activeButtonClip = this.shopViewport;
    const contentY = viewportY - this.shopScroll;
    if (this.shopPage === 0) this.drawManorShop(viewportX, contentY, viewportW, contentHeight, true);
    else if (this.shopPage === 1) this.drawSystemsShop(viewportX, contentY, viewportW, contentHeight, true);
    else this.drawAssignments(viewportX, contentY, viewportW, contentHeight, true);
    this.activeButtonClip = null;
    ctx.restore();

    if (this.shopScrollMax > 0) {
      const trackX = x + panelWidth - 6;
      const trackY = viewportY + 4;
      const trackH = viewportH - 8;
      const thumbH = Math.max(28, trackH * (viewportH / contentHeight));
      const thumbY = trackY + (trackH - thumbH) * (this.shopScroll / this.shopScrollMax);
      ctx.fillStyle = "rgba(255,255,255,.08)";
      ctx.fillRect(trackX, trackY, 2, trackH);
      ctx.fillStyle = C.orange;
      ctx.fillRect(trackX - 1, thumbY, 4, thumbH);
      ctx.textAlign = "right";
      ctx.fillStyle = C.muted;
      ctx.font = this.dataFont(7, 800);
      ctx.fillText("SWIPE TO SCROLL", x + panelWidth - 14, viewportBottom - 6);
    }

    this.button(
      "CONTINUE",
      width / 2 - 94,
      y + panelHeight - 43,
      188,
      36,
      () => this.callbacks.onContinue?.()
    );
  }

  drawManorShop(x, y, width, height, mobile) {
    const fortifyMax = this.fortifyLevel >= CONFIG.manor.maxFortifyLevel;
    const majorMax = fortifyMax ||
      this.fortifyLevel + CONFIG.manor.majorFortify.levels > CONFIG.manor.maxFortifyLevel;
    const items = [
      ["PATCH DAMAGE", "+50 HEALTH", CONFIG.manor.repairs.minor.cost, "repairMinor", this.health >= this.maxHealth],
      ["MAJOR REPAIR", "+250 HEALTH", CONFIG.manor.repairs.major.cost, "repairMajor", this.health >= this.maxHealth],
      ["RESTORE MANOR", "+1000 HEALTH", CONFIG.manor.repairs.full.cost, "repairFull", this.health >= this.maxHealth],
      ["FORTIFY", "+100 MAX HEALTH", this.purchaseCosts.fortify ?? CONFIG.manor.fortify.baseCost, "fortify", fortifyMax, false, fortifyMax ? "MAX" : null],
      ["MAJOR FORTIFY", "+1000 MAX HEALTH", this.purchaseCosts.majorFortify ?? CONFIG.manor.majorFortify.baseCost, "majorFortify", majorMax, false, majorMax ? "MAX" : null]
    ];
    this.drawShopRows(items, x, y, width, height, mobile);
  }

  drawSystemsShop(x, y, width, height, mobile) {
    const b = CONFIG.buildings;
    const extractionUnlock = this.wave < (b.extraction.unlockWave ?? 1);
    let extractionItem;
    if (!this.buildings.extraction || this.extractionLevel <= 0) {
      extractionItem = [
        "SOUL EXTRACTION",
        "1 BINDING SLOT — DROP A DEMON INTO THE GLOWING PORTAL",
        b.extraction.cost,
        "extraction",
        false,
        extractionUnlock
      ];
    } else if (this.extractionLevel < CONFIG.extraction.maxLevel) {
      const next = this.extractionLevel + 1;
      extractionItem = [
        `SOUL EXTRACTION — ${this.extractionLevel} SLOT${this.extractionLevel === 1 ? "" : "S"}`,
        `UPGRADE TO ${next} SIMULTANEOUS BINDING SLOTS`,
        this.purchaseCosts.extractionUpgrade ?? (next === 2 ? b.extractionUpgrade2.cost : b.extractionUpgrade3.cost),
        "extractionUpgrade",
        false,
        false
      ];
    } else {
      extractionItem = [
        "SOUL EXTRACTION — 3 SLOTS",
        "MAXIMUM BINDING CAPACITY",
        0,
        "extractionUpgrade",
        true,
        false,
        "MAX"
      ];
    }

    const makeSystem = (key, title, description) => {
      const def = b[key];
      const waveLocked = this.wave < (def.unlockWave ?? 1);
      const extractionLocked = !this.buildings.extraction;
      const locked = waveLocked || extractionLocked;
      let text = description;
      if (!waveLocked && extractionLocked) text = "REQUIRES SOUL EXTRACTION";
      return [title, text, def.cost, key, this.buildings[key], locked];
    };

    const items = [
      extractionItem,
      makeSystem("hellfire", "HELLFIRE BATTERY", "BOUND SOULS BUILD AND SPEED UP CROSSBOW DEFENCES"),
      makeSystem("demolition", "HELL BOMB FORGE", "15 BOUND SOULS = 1 BOMB AT WAVE START — MAX 3"),
      makeSystem("undercroft", "UNDERCROFT", "BOUND SOULS REPAIR THE MANOR BETWEEN WAVES"),
      makeSystem("occult", "OCCULT TOWER", "LIGHT-PURPLE GROUND FIRE STRIKES ACTIVE DEMONS")
    ];
    this.drawShopRows(items, x, y, width, height, mobile, true);
  }

  drawShopRows(items, x, y, width, height, mobile, buildings = false) {
    const rowGap = mobile ? 5 : 8;
    const rowH = Math.max(mobile ? 48 : 54, Math.min(mobile ? 62 : 76, (height - rowGap * (items.length - 1)) / items.length));
    items.forEach((item, index) => {
      const [title, description, cost, type, ownedOrFull = false, locked = false, labelOverride = null] = item;
      const rowY = y + index * (rowH + rowGap);
      this.panel(x, rowY, width, rowH, C.panel2, 7);
      const ctx = this.ctx;
      ctx.textAlign = "left";
      ctx.fillStyle = locked ? "#777" : C.orangeLight;
      ctx.font = this.font(mobile ? 18 : 23);
      ctx.fillText(title, x + 13, rowY + (mobile ? 23 : 28));
      ctx.fillStyle = locked ? "#666" : C.muted;
      ctx.font = this.dataFont(mobile ? 9 : 11, 780);
      ctx.fillText(description, x + 13, rowY + (mobile ? 42 : 51));

      const buttonW = mobile ? 112 : 138;
      const buttonH = mobile ? 42 : 46;
      const bx = x + width - buttonW - 10;
      const by = rowY + (rowH - buttonH) / 2;
      const purchased = buildings && ownedOrFull && labelOverride !== "MAX";
      const maxed = labelOverride === "MAX";
      const disabled = locked || purchased || maxed || (!buildings && ownedOrFull) || this.souls < cost;
      const label = labelOverride ?? (locked ? "LOCKED" : purchased ? "OWNED" : `${cost}`);
      this.button(
        label,
        bx,
        by,
        buttonW,
        buttonH,
        () => this.callbacks.onPurchase?.(type),
        disabled,
        () => this.callbacks.onDeniedPurchase?.()
      );
    });
  }

  drawAssignments(x, y, width, height, mobile) {
    const ctx = this.ctx;
    ctx.textAlign = "center";
    ctx.fillStyle = C.orangeLight;
    ctx.font = this.dataFont(mobile ? 13 : 15, 900);
    ctx.fillText(`BOUND SOULS: ${this.boundSouls}    UNASSIGNED: ${this.unassignedSouls}`, x + width / 2, y + 22);

    const systems = [
      ["hellfire", "HELLFIRE", this.buildings.hellfire, C.orange],
      ["demolition", "HELL BOMB FORGE", this.buildings.demolition, C.red],
      ["undercroft", "UNDERCROFT", this.buildings.undercroft, C.amber],
      ["occult", "OCCULT", this.buildings.occult, C.purple]
    ].filter((entry) => entry[2]);

    if (systems.length === 0) {
      ctx.fillStyle = C.muted;
      ctx.font = this.dataFont(13, 800);
      ctx.fillText("PURCHASE A BOUND-SOUL SYSTEM TO ASSIGN YOUR CONVERTED DEMONS.", x + width / 2, y + 72);
      return;
    }

    const startY = y + 36;
    const rowGap = 8;
    const rowH = Math.max(mobile ? 76 : 78, Math.min(mobile ? 86 : 92, (height - 42 - rowGap * (systems.length - 1)) / systems.length));
    systems.forEach(([key, label, , accent], index) => {
      const rowY = startY + index * (rowH + rowGap);
      this.panel(x, rowY, width, rowH, C.panel2, 7);
      ctx.textAlign = "left";
      ctx.fillStyle = accent;
      ctx.font = this.font(mobile ? 21 : 25);
      ctx.fillText(label, x + 16, rowY + 31);

      const assigned = this.assignments[key] ?? 0;
      const cap = CONFIG.boundCaps[key] ?? Infinity;
      const maxed = assigned >= cap;
      ctx.fillStyle = C.text;
      ctx.font = this.dataFont(12, 850);
      ctx.fillText(maxed ? `${assigned} ASSIGNED — MAX` : `${assigned} ASSIGNED`, x + 16, rowY + 51);

      ctx.fillStyle = C.muted;
      ctx.font = this.dataFont(mobile ? 9 : 10, 800);
      let effectText = "";
      if (key === "hellfire") {
        let mounts = 0;
        let interval = 0;
        let next = "";
        if (assigned > 0 && assigned < 10) {
          mounts = 1;
          interval = 7 - Math.min(1, (assigned - 1) / 8) * 3.2;
          next = ` • 2ND CROSSBOW AT 10`;
        } else if (assigned >= 10 && assigned < 25) {
          mounts = 2;
          interval = 7 - Math.min(1, (assigned - 10) / 14) * 3.4;
          next = ` • 3RD CROSSBOW AT 25`;
        } else if (assigned >= 25) {
          mounts = 3;
          interval = 7 - Math.min(1, (assigned - 25) / 20) * 4.6;
        }
        effectText = assigned > 0
          ? `${mounts} CROSSBOW${mounts === 1 ? "" : "S"} • ${interval.toFixed(1)}s RELOAD${next}`
          : "NO DEFENCE ACTIVE";
      } else if (key === "demolition") {
        const bombs = Math.min(CONFIG.defence.bombMaxCharges, Math.floor(assigned / CONFIG.defence.bombSoulsPerCharge));
        effectText = bombs > 0
          ? `${bombs} HELL BOMB${bombs === 1 ? "" : "S"} AT THE START OF EACH WAVE`
          : `${CONFIG.defence.bombSoulsPerCharge} BOUND SOULS NEEDED FOR 1 WAVE BOMB`;
      } else if (key === "undercroft") {
        effectText = `+${assigned * 6} MANOR HEALTH AFTER EACH WAVE`;
      } else if (key === "occult") {
        const interval = assigned <= 0 ? 0 : 13.5 - Math.min(1, (assigned - 1) / 29) * 7.5;
        const strikes = assigned >= 20 ? 3 : assigned >= 10 ? 2 : assigned > 0 ? 1 : 0;
        effectText = assigned > 0
          ? `${strikes} PURPLE FIRE STRIKE${strikes === 1 ? "" : "S"} ABOUT EVERY ${interval.toFixed(1)}s`
          : "NO OCCULT STRIKES";
      }
      ctx.fillText(effectText, x + 16, rowY + 68);

      const buttonSize = mobile ? 46 : 50;
      const plusX = x + width - buttonSize - 12;
      const minusX = plusX - buttonSize - 10;
      const by = rowY + (rowH - buttonSize) / 2;
      this.button("−", minusX, by, buttonSize, buttonSize, () => this.callbacks.onAssign?.(key, -1), assigned <= 0, () => this.callbacks.onDeniedPurchase?.(), accent);
      this.button(maxed ? "MAX" : "+", plusX, by, buttonSize, buttonSize, () => this.callbacks.onAssign?.(key, 1), maxed || this.unassignedSouls <= 0, () => this.callbacks.onDeniedPurchase?.(), accent);
    });
  }

  drawTutorial(width, height) {
    if (!this.tutorial) return;
    // Block the shop underneath while this first-use help card is open.
    this.buttons = [];
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,.72)";
    ctx.fillRect(0, 0, width, height);

    const mobile = width < 700 || height < 620;
    const panelWidth = Math.min(mobile ? width - 28 : 590, width - 28);
    const panelHeight = mobile ? 304 : 326;
    const x = (width - panelWidth) / 2;
    const y = (height - panelHeight) / 2;
    this.panel(x, y, panelWidth, panelHeight, C.panel, 14);

    ctx.textAlign = "center";
    ctx.fillStyle = C.orangeLight;
    ctx.font = this.font(mobile ? 31 : 40);
    ctx.fillText(this.tutorial.title, width / 2, y + 55);

    // Use the actual transparent Husk image supplied in assets.
    const iconY = y + (mobile ? 96 : 104);
    const demonX = width / 2 - (mobile ? 96 : 112);
    const demonH = mobile ? 104 : 122;
    const demonW = this.tutorialDemonReady && this.tutorialDemonImage.naturalHeight > 0
      ? demonH * (this.tutorialDemonImage.naturalWidth / this.tutorialDemonImage.naturalHeight)
      : demonH * 0.58;

    ctx.save();
    const demonGlow = ctx.createRadialGradient(demonX, iconY + demonH * 0.5, 4, demonX, iconY + demonH * 0.5, demonH * 0.62);
    demonGlow.addColorStop(0, "rgba(255,105,35,.20)");
    demonGlow.addColorStop(1, "rgba(255,75,20,0)");
    ctx.fillStyle = demonGlow;
    ctx.beginPath();
    ctx.arc(demonX, iconY + demonH * 0.5, demonH * 0.62, 0, Math.PI * 2);
    ctx.fill();
    if (this.tutorialDemonReady) {
      ctx.shadowColor = "rgba(255,93,27,.38)";
      ctx.shadowBlur = 12;
      ctx.drawImage(
        this.tutorialDemonImage,
        demonX - demonW / 2,
        iconY,
        demonW,
        demonH
      );
    }
    ctx.restore();

    ctx.fillStyle = C.orange;
    ctx.font = this.dataFont(28, 900);
    ctx.fillText("→", width / 2, iconY + (mobile ? 48 : 56));
    const portalY = iconY + (mobile ? 50 : 58);
    const portalX = width / 2 + (mobile ? 92 : 108);
    const portal = ctx.createRadialGradient(portalX, portalY, 2, portalX, portalY, mobile ? 31 : 36);
    portal.addColorStop(0, "rgba(255,255,235,1)");
    portal.addColorStop(0.35, "rgba(255,184,96,.95)");
    portal.addColorStop(1, "rgba(255,93,24,0)");
    ctx.fillStyle = portal;
    ctx.beginPath();
    ctx.arc(portalX, portalY, mobile ? 32 : 38, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = C.text;
    ctx.font = this.dataFont(mobile ? 10 : 12, 850);
    this.tutorial.lines.forEach((line, index) => {
      ctx.fillText(line, width / 2, y + (mobile ? 190 : 196) + index * (mobile ? 18 : 20));
    });

    this.button("GOT IT", width / 2 - 95, y + panelHeight - 58, 190, 42, () => {
      this.tutorial = null;
    });
  }

  drawGameOver(width, height) {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,.75)";
    ctx.fillRect(0, 0, width, height);
    const panelWidth = Math.min(550, width - 28);
    const panelHeight = this.canRetry ? 300 : 250;
    const x = (width - panelWidth) / 2;
    const y = (height - panelHeight) / 2;
    this.panel(x, y, panelWidth, panelHeight, C.panel, 14);
    ctx.textAlign = "center";
    ctx.fillStyle = C.red;
    ctx.font = this.font(Math.min(46, width * 0.07));
    ctx.fillText("THE MANOR HAS FALLEN", width / 2, y + 68);
    ctx.fillStyle = C.muted;
    ctx.font = this.dataFont(12, 800);
    ctx.fillText(`WAVE ${this.wave} — ${this.deaths} DEMON DEATHS`, width / 2, y + 104);

    if (this.canRetry) {
      ctx.fillStyle = C.orangeLight;
      ctx.font = this.dataFont(11, 900);
      ctx.fillText(`CONTINUES LEFT: ${this.continuesRemaining}`, width / 2, y + 128);
      this.button("RETRY WAVE", width / 2 - 110, y + 148, 220, 50, () => this.callbacks.onRetry?.());
      this.button("NEW GAME", width / 2 - 110, y + 212, 220, 46, () => this.callbacks.onRestart?.());
    } else {
      ctx.fillStyle = C.red;
      ctx.font = this.dataFont(11, 900);
      ctx.fillText("NO CONTINUES REMAIN", width / 2, y + 132);
      this.button("NEW GAME", width / 2 - 110, y + 158, 220, 50, () => this.callbacks.onRestart?.());
    }
  }

  drawDeveloperPanel(width, height) {
    // Modal developer controls for desktop testing. Opening this panel in Game
    // disables persistence for the remainder of the browser session.
    this.buttons = [];
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,.84)";
    ctx.fillRect(0, 0, width, height);

    const panelWidth = Math.min(720, width - 48);
    const panelHeight = Math.min(650, height - 36);
    const x = (width - panelWidth) / 2;
    const y = (height - panelHeight) / 2;
    this.panel(x, y, panelWidth, panelHeight, "rgba(8,7,13,.98)", 14);

    ctx.textAlign = "center";
    ctx.fillStyle = C.purple;
    ctx.font = this.font(38);
    ctx.fillText("DEVELOPER TEST", width / 2, y + 52);
    ctx.fillStyle = C.muted;
    ctx.font = this.dataFont(10, 850);
    ctx.fillText("ESC TO CLOSE — TEST MODE DOES NOT SAVE", width / 2, y + 77);

    const waveY = y + 100;
    ctx.fillStyle = C.text;
    ctx.font = this.dataFont(14, 900);
    ctx.fillText(`TEST WAVE  ${this.developerWave}`, width / 2, waveY + 25);
    this.button("−5", x + 80, waveY, 72, 42, () => this.callbacks.onDevWaveChange?.(-5));
    this.button("−", x + 162, waveY, 72, 42, () => this.callbacks.onDevWaveChange?.(-1));
    this.button("+", x + panelWidth - 234, waveY, 72, 42, () => this.callbacks.onDevWaveChange?.(1));
    this.button("+5", x + panelWidth - 152, waveY, 72, 42, () => this.callbacks.onDevWaveChange?.(5));

    const row1 = waveY + 62;
    this.button("START WAVE", x + 38, row1, 190, 46, () => this.callbacks.onDevStartWave?.(), false, null, C.purple);
    this.button("OPEN UPGRADES", width / 2 - 95, row1, 190, 46, () => this.callbacks.onDevOpenShop?.(), false, null, C.purple);
    this.button("TEST ENDING", x + panelWidth - 228, row1, 190, 46, () => this.callbacks.onDevDawn?.(), false, null, C.purple);

    const row2 = row1 + 64;
    this.button("+1000 SOULS", x + 38, row2, 190, 44, () => this.callbacks.onDevAddSouls?.(1000));
    this.button(this.newGamePlus ? "NG+ ON" : "NG+ OFF", width / 2 - 88, row2, 176, 44, () => this.callbacks.onDevToggleNGPlus?.(), false, null, this.newGamePlus ? C.red : C.purple);
    this.button("+10 BOUND SOULS", x + panelWidth - 228, row2, 190, 44, () => this.callbacks.onDevAddBound?.(10));

    ctx.fillStyle = C.orangeLight;
    ctx.font = this.dataFont(12, 900);
    ctx.fillText("UNLOCK SYSTEMS", width / 2, row2 + 78);

    const unlocks = [
      ["EXTRACTION", "extraction"],
      ["HELLFIRE", "hellfire"],
      ["BOMB FORGE", "demolition"],
      ["UNDERCROFT", "undercroft"],
      ["OCCULT", "occult"]
    ];
    const buttonW = 118;
    const gap = 8;
    const totalW = unlocks.length * buttonW + (unlocks.length - 1) * gap;
    const startX = width / 2 - totalW / 2;
    unlocks.forEach(([label, key], index) => {
      this.button(label, startX + index * (buttonW + gap), row2 + 92, buttonW, 42, () => this.callbacks.onDevUnlock?.(key), false, null, C.purple);
    });

    ctx.fillStyle = C.muted;
    ctx.font = this.dataFont(10, 800);
    ctx.fillText(`CURRENT: ${this.souls} SOULS • ${this.boundSouls} BOUND SOULS`, width / 2, row2 + 162);

    this.button("CLOSE", width / 2 - 95, y + panelHeight - 62, 190, 44, () => this.callbacks.onDevClose?.());
  }

  drawStars(stars, x, y, size = 24) {
    const ctx = this.ctx;
    ctx.save();
    ctx.textAlign = "left";
    ctx.font = `900 ${size}px "Segoe UI Symbol","Arial Unicode MS",Arial,sans-serif`;
    for (let i = 0; i < 5; i += 1) {
      ctx.fillStyle = i < stars ? "#ffd08a" : "rgba(255,255,255,.18)";
      ctx.fillText(i < stars ? "★" : "☆", x + i * size * 1.05, y);
    }
    ctx.restore();
  }

  fadeInAt(time, start, duration = 0.8) {
    return Math.max(0, Math.min(1, (time - start) / duration));
  }

  drawEnding(width, height) {
    const data = this.endingData;
    if (!data) return;
    const ctx = this.ctx;
    const t = this.endingElapsed;

    // Keep the manor and sunrise visible. The text arrives in stages instead
    // of immediately covering the final environmental payoff.
    const firstA = this.fadeInAt(t, 5.0, 1.1);
    const secondA = this.fadeInAt(t, 7.8, 1.0);
    const thirdA = this.fadeInAt(t, 10.5, 1.0);

    ctx.textAlign = "center";
    if (firstA > 0) {
      ctx.save();
      ctx.globalAlpha = firstA;
      ctx.fillStyle = "#fff0d3";
      ctx.font = this.font(Math.min(58, width * 0.06));
      ctx.shadowColor = "rgba(255,170,90,.45)";
      ctx.shadowBlur = 12;
      ctx.fillText("THE NIGHT IS OVER", width / 2, height * 0.23);
      ctx.restore();
    }
    if (secondA > 0) {
      ctx.save();
      ctx.globalAlpha = secondA;
      ctx.fillStyle = C.text;
      ctx.font = this.dataFont(Math.min(18, width * 0.018), 900);
      ctx.fillText("YOU DEFEATED ALL THE DEMONS", width / 2, height * 0.23 + 42);
      ctx.restore();
    }
    if (thirdA > 0) {
      ctx.save();
      ctx.globalAlpha = thirdA;
      ctx.fillStyle = C.orangeLight;
      ctx.font = this.dataFont(Math.min(16, width * 0.016), 900);
      ctx.fillText("HELLGATE MANOR STILL STANDS", width / 2, height * 0.23 + 72);
      ctx.restore();
    }

    const panelA = this.fadeInAt(t, 13.2, 0.9);
    if (panelA <= 0) return;
    const mobileLandscape = this.isMobileLandscape();
    const mobile = mobileLandscape || width < 760 || height < 650;
    const panelWidth = Math.min(mobile ? width - 18 : 650, width - 18);
    const panelHeight = mobileLandscape ? Math.min(350, height - 12) : (mobile ? 452 : 492);
    const x = (width - panelWidth) / 2;
    const y = mobileLandscape ? 6 : Math.min(height - panelHeight - 18, height * 0.39);
    ctx.save();
    ctx.globalAlpha = panelA;
    this.panel(x, y, panelWidth, panelHeight, "rgba(7,8,11,.83)", 14);
    ctx.restore();

    ctx.textAlign = "center";
    ctx.fillStyle = data.newGamePlus ? C.red : C.orangeLight;
    ctx.font = this.font(mobileLandscape ? 24 : (mobile ? 28 : 34));
    ctx.fillText(data.newGamePlus ? "HELL MODE COMPLETE" : "FINAL REPORT", width / 2, y + (mobileLandscape ? 34 : 44));

    const rows = [
      ["SURVIVAL", data.survival, 14.1],
      ["DEFENCE", data.defence, 16.5],
      ["BINDING", data.binding, 18.9]
    ];
    const rowX = x + (mobileLandscape ? 18 : 28);
    const rowW = panelWidth - (mobileLandscape ? 36 : 56);
    const rowH = mobileLandscape ? 50 : (mobile ? 67 : 70);
    rows.forEach(([label, rating, reveal], index) => {
      const alpha = this.fadeInAt(t, reveal, 0.65);
      if (alpha <= 0) return;
      const ry = y + (mobileLandscape ? 48 : 64) + index * (rowH + (mobileLandscape ? 5 : 7));
      ctx.save();
      ctx.globalAlpha = alpha;
      this.panel(rowX, ry, rowW, rowH, "rgba(13,13,17,.90)", 7);
      ctx.textAlign = "left";
      ctx.fillStyle = C.text;
      ctx.font = this.font(mobileLandscape ? 17 : (mobile ? 20 : 23));
      ctx.fillText(label, rowX + 14, ry + (mobileLandscape ? 21 : 28));
      ctx.fillStyle = C.muted;
      ctx.font = this.dataFont(mobileLandscape ? 7 : (mobile ? 8 : 10), 820);
      ctx.fillText(rating.detail, rowX + 14, ry + (mobileLandscape ? 37 : 49));
      this.drawStars(rating.stars, rowX + rowW - (mobileLandscape ? 108 : (mobile ? 128 : 150)), ry + (mobileLandscape ? 34 : 43), mobileLandscape ? 17 : (mobile ? 20 : 23));
      ctx.restore();
    });

    const rankA = this.fadeInAt(t, 21.6, 0.9);
    if (rankA > 0) {
      ctx.save();
      ctx.globalAlpha = rankA;
      ctx.textAlign = "center";
      ctx.fillStyle = C.muted;
      ctx.font = this.dataFont(11, 900);
      ctx.fillText("FINAL RANK", width / 2, y + panelHeight - (mobileLandscape ? 112 : 132));
      ctx.fillStyle = data.finalRank === "S" ? "#ffe5a8" : data.finalRank === "A" ? C.orangeLight : C.text;
      ctx.font = this.font(mobileLandscape ? 45 : (mobile ? 54 : 66));
      ctx.shadowColor = data.newGamePlus ? "rgba(239,81,78,.8)" : "rgba(255,112,49,.75)";
      ctx.shadowBlur = 18;
      ctx.fillText(data.finalRank, width / 2, y + panelHeight - (mobileLandscape ? 68 : 78));
      ctx.restore();
    }

    if (t >= 24.5) {
      const buttonY = y + panelHeight - (mobileLandscape ? 43 : (mobile ? 54 : 60));
      if (mobileLandscape) {
        this.button("NEW GAME", width / 2 - 204, buttonY, 174, 36, () => this.callbacks.onRestart?.());
        this.button("NEW GAME+ (HELL MODE)", width / 2 - 20, buttonY, 224, 36, () => this.callbacks.onNewGamePlus?.(), false, null, C.red);
      } else if (mobile) {
        this.button("NEW GAME", width / 2 - 208, buttonY, 185, 42, () => this.callbacks.onRestart?.());
        this.button("NEW GAME+ (HELL MODE)", width / 2 - 13, buttonY, 220, 42, () => this.callbacks.onNewGamePlus?.(), false, null, C.red);
      } else {
        this.button("NEW GAME", width / 2 - 252, buttonY, 205, 46, () => this.callbacks.onRestart?.());
        this.button("NEW GAME+ (HELL MODE)", width / 2 - 27, buttonY, 280, 46, () => this.callbacks.onNewGamePlus?.(), false, null, C.red);
      }
    }
  }

  drawComplete(width, height) {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,.16)";
    ctx.fillRect(0, 0, width, height);
    const panelWidth = Math.min(650, width - 30);
    const panelHeight = 330;
    const x = (width - panelWidth) / 2;
    const y = (height - panelHeight) / 2;
    this.panel(x, y, panelWidth, panelHeight, "rgba(7,8,11,.80)", 15);
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffe2b8";
    ctx.font = this.font(Math.min(54, width * 0.07));
    ctx.fillText("CONGRATULATIONS", width / 2, y + 76);
    ctx.fillStyle = C.text;
    ctx.font = this.dataFont(16, 900);
    ctx.fillText("THE NIGHT IS OVER — HELLGATE MANOR STILL STANDS", width / 2, y + 120);
    ctx.fillStyle = C.muted;
    ctx.font = this.dataFont(13, 800);
    ctx.fillText(`${this.deaths} DEMON DEATHS  •  ${this.boundSouls} BOUND SOULS`, width / 2, y + 158);
    this.button("NEW GAME", width / 2 - 110, y + 205, 220, 50, () => this.callbacks.onRestart?.());
  }

  dispose() {
    window.removeEventListener("pointerdown", this.onPointerDown, true);
    window.removeEventListener("pointermove", this.onPointerMove, true);
    window.removeEventListener("pointerup", this.onPointerUp, true);
    window.removeEventListener("pointercancel", this.onPointerUp, true);
    window.removeEventListener("wheel", this.onWheel, true);
    window.removeEventListener("resize", this.resize);
  }
}
