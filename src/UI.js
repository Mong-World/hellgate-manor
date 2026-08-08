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
    this.buildings = {};
    this.assignments = {};
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

    this.onPointerDown = this.onPointerDown.bind(this);
    this.resize = this.resize.bind(this);
    window.addEventListener("pointerdown", this.onPointerDown, true);
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(window.innerWidth * dpr);
    this.canvas.height = Math.floor(window.innerHeight * dpr);
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  setMode(mode) {
    this.mode = mode;
    if (mode === "intermission") this.shopPage = 0;
  }

  setHUD(data) {
    Object.assign(this, data);
  }

  setHasSave(hasSave) {
    this.hasSave = hasSave;
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

  addSoulFlight(x, y, onArrive = null) {
    this.soulFlights.push({
      x,
      y,
      age: 0,
      duration: 0.72 + Math.random() * 0.16,
      onArrive
    });
  }

  onPointerDown(event) {
    const x = event.clientX;
    const y = event.clientY;
    for (let i = this.buttons.length - 1; i >= 0; i -= 1) {
      const button = this.buttons[i];
      if (x >= button.x && x <= button.x + button.w && y >= button.y && y <= button.y + button.h) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.callbacks.onUIClick?.();
        if (button.disabled) button.onDenied?.();
        else button.onClick?.();
        return;
      }
    }
  }

  update(dt) {
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

    if (this.mode === "start") return this.drawStart(width, height);
    if (this.mode === "playing") {
      this.drawHUD(width, height);
      this.drawPauseButton(width, height);
      if (this.bannerTimer > 0) this.drawBanner(width, height);
      return;
    }
    if (this.mode === "paused") {
      this.drawHUD(width, height);
      this.drawPaused(width, height);
      return;
    }
    if (this.mode === "results") {
      this.drawHUD(width, height);
      this.drawResults(width, height);
      return;
    }
    if (this.mode === "intermission") {
      this.drawHUD(width, height);
      this.drawIntermission(width, height);
      return;
    }
    if (this.mode === "gameOver") {
      this.drawHUD(width, height);
      this.drawGameOver(width, height);
      return;
    }
    if (this.mode === "complete") return this.drawComplete(width, height);
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
    this.buttons.push({ x, y, w: width, h: height, onClick, disabled, onDenied });
  }

  drawStart(width, height) {
    const mobile = width < 700 || height < 620;
    const panelWidth = Math.min(560, width - 32);
    const panelHeight = this.hasSave ? (mobile ? 280 : 300) : (mobile ? 235 : 255);
    const x = (width - panelWidth) / 2;
    const y = (height - panelHeight) / 2;
    this.panel(x, y, panelWidth, panelHeight, C.panel, 14);

    const ctx = this.ctx;
    ctx.textAlign = "center";
    ctx.fillStyle = C.text;
    ctx.font = this.font(mobile ? 39 : 54);
    ctx.shadowColor = "rgba(255,80,24,.7)";
    ctx.shadowBlur = 12;
    ctx.fillText("HELLGATE MANOR", width / 2, y + (mobile ? 56 : 68));
    ctx.shadowBlur = 0;
    ctx.fillStyle = C.muted;
    ctx.font = this.dataFont(mobile ? 11 : 14, 800);
    ctx.fillText("DEFEND THE MANOR.", width / 2, y + (mobile ? 85 : 103));

    const buttonHeight = mobile ? 52 : 50;
    const firstY = y + (mobile ? 110 : 132);
    this.button("NEW GAME", width / 2 - 105, firstY, 210, buttonHeight, () => this.callbacks.onNewGame?.());
    if (this.hasSave) {
      this.button("CONTINUE", width / 2 - 105, firstY + buttonHeight + 12, 210, buttonHeight, () => this.callbacks.onContinueSave?.());
    }
  }

  drawHUD(width, height) {
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

  getSoulCounterPosition(width, height) {
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
      const size = 5 + (1 - t) * 4;
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
    const compact = width < 820;
    const size = compact ? 42 : 46;
    const margin = compact ? 12 : 18;
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
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,.68)";
    ctx.fillRect(0, 0, width, height);
    const panelWidth = Math.min(430, width - 30);
    const panelHeight = 210;
    const x = (width - panelWidth) / 2;
    const y = (height - panelHeight) / 2;
    this.panel(x, y, panelWidth, panelHeight, C.panel, 13);
    ctx.textAlign = "center";
    ctx.fillStyle = C.text;
    ctx.font = this.font(Math.min(46, width * 0.08));
    ctx.fillText("PAUSED", width / 2, y + 72);
    ctx.fillStyle = C.muted;
    ctx.font = this.dataFont(11, 800);
    ctx.fillText("ESC OR RESUME TO RETURN", width / 2, y + 102);
    this.button("RESUME", width / 2 - 105, y + 126, 210, 50, () => this.callbacks.onPause?.());
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

  drawIntermission(width, height) {
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

    ctx.fillStyle = C.muted;
    ctx.font = this.dataFont(mobile ? 10 : 12, 820);
    ctx.fillStyle = C.orangeLight;
    ctx.font = this.dataFont(mobile ? 11 : 12, 900);
    ctx.fillText("SOULS", width / 2, y + (mobile ? 64 : 77));
    ctx.fillStyle = C.orange;
    ctx.font = this.dataFont(mobile ? 24 : 29, 900);
    ctx.fillText(String(this.souls), width / 2, y + (mobile ? 88 : 104));

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

  drawManorShop(x, y, width, height, mobile) {
    const items = [
      ["PATCH DAMAGE", "+50 HEALTH", CONFIG.manor.repairs.minor.cost, "repairMinor", this.health >= this.maxHealth],
      ["MAJOR REPAIR", "+250 HEALTH", CONFIG.manor.repairs.major.cost, "repairMajor", this.health >= this.maxHealth],
      ["RESTORE MANOR", "+1000 HEALTH", CONFIG.manor.repairs.full.cost, "repairFull", this.health >= this.maxHealth],
      ["FORTIFY", "+100 MAX HEALTH", CONFIG.manor.fortify.cost, "fortify", false],
      ["MAJOR FORTIFY", "+1000 MAX HEALTH", CONFIG.manor.majorFortify.cost, "majorFortify", false]
    ];
    this.drawShopRows(items, x, y, width, height, mobile);
  }

  drawSystemsShop(x, y, width, height, mobile) {
    const b = CONFIG.buildings;
    const items = [
      ["SOUL EXTRACTION", "DROP DEMONS OVER THE GLOWING ROOF EXTRACTOR", b.extraction.cost, "extraction", this.buildings.extraction, false],
      ["HELLFIRE BATTERY", "BOUND SOULS POWER AUTOMATIC DEFENCES", b.hellfire.cost, "hellfire", this.buildings.hellfire, !this.buildings.extraction],
      ["HELL BOMB FORGE", "5 BOUND SOULS = +1 BOMB EACH WAVE", b.demolition.cost, "demolition", this.buildings.demolition, !this.buildings.extraction],
      ["UNDERCROFT", "BOUND SOULS REPAIR BETWEEN WAVES", b.undercroft.cost, "undercroft", this.buildings.undercroft, !this.buildings.extraction],
      ["OCCULT TOWER", "BOUND SOULS TRIGGER OCCULT STRIKES", b.occult.cost, "occult", this.buildings.occult, !this.buildings.extraction]
    ];
    this.drawShopRows(items, x, y, width, height, mobile, true);
  }

  drawShopRows(items, x, y, width, height, mobile, buildings = false) {
    const rowGap = mobile ? 5 : 8;
    const rowH = Math.max(mobile ? 48 : 54, Math.min(mobile ? 62 : 76, (height - rowGap * (items.length - 1)) / items.length));
    items.forEach((item, index) => {
      const [title, description, cost, type, ownedOrFull = false, locked = false] = item;
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
      const purchased = buildings && ownedOrFull;
      const disabled = locked || purchased || (!buildings && ownedOrFull) || this.souls < cost;
      const label = locked ? "LOCKED" : purchased ? "OWNED" : `${cost}`;
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
      ctx.fillStyle = C.text;
      ctx.font = this.dataFont(12, 850);
      ctx.fillText(`${assigned} ASSIGNED`, x + 16, rowY + 51);
      ctx.fillStyle = C.muted;
      ctx.font = this.dataFont(mobile ? 9 : 10, 800);
      let effectText = "";
      if (key === "hellfire") {
        const mounts = assigned <= 0 ? 0 : assigned < 5 ? 1 : assigned < 10 ? 2 : 3;
        const interval = assigned <= 0 ? 0 : assigned < 5 ? 7 : assigned < 10 ? 6 : assigned < 15 ? 5 : assigned < 20 ? 4 : assigned < 25 ? 3.3 : assigned < 30 ? 2.7 : 2.2;
        effectText = assigned > 0 ? `${mounts} CROSSBOW${mounts === 1 ? "" : "S"} • ${interval.toFixed(1)}s RELOAD` : "NO DEFENCE ACTIVE";
      } else if (key === "demolition") {
        const produced = Math.min(CONFIG.defence.bombMaxCharges, Math.floor(assigned / 5));
        effectText = produced > 0 ? `+${produced} HELL BOMB${produced === 1 ? "" : "S"} AFTER EACH WAVE` : "5 BOUND SOULS NEEDED PER BOMB";
      } else if (key === "undercroft") {
        effectText = `+${assigned * 8} MANOR HEALTH AFTER EACH WAVE`;
      } else if (key === "occult") {
        const interval = assigned <= 0 ? 0 : Math.max(6.5, 17 - assigned * 0.55);
        effectText = assigned > 0 ? `AUTO STRIKE ABOUT EVERY ${interval.toFixed(1)}s` : "NO OCCULT STRIKES";
      }
      ctx.fillText(effectText, x + 16, rowY + 68);

      const buttonSize = mobile ? 46 : 50;
      const plusX = x + width - buttonSize - 12;
      const minusX = plusX - buttonSize - 10;
      const by = rowY + (rowH - buttonSize) / 2;
      this.button("−", minusX, by, buttonSize, buttonSize, () => this.callbacks.onAssign?.(key, -1), (this.assignments[key] ?? 0) <= 0, () => this.callbacks.onDeniedPurchase?.(), accent);
      this.button("+", plusX, by, buttonSize, buttonSize, () => this.callbacks.onAssign?.(key, 1), this.unassignedSouls <= 0, () => this.callbacks.onDeniedPurchase?.(), accent);
    });
  }

  drawGameOver(width, height) {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,.75)";
    ctx.fillRect(0, 0, width, height);
    const panelWidth = Math.min(550, width - 28);
    const panelHeight = 280;
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
    this.button("RETRY WAVE", width / 2 - 110, y + 132, 220, 50, () => this.callbacks.onRetry?.());
    this.button("NEW GAME", width / 2 - 110, y + 194, 220, 46, () => this.callbacks.onRestart?.());
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
    window.removeEventListener("resize", this.resize);
  }
}
