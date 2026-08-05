import { CONFIG } from "./Config.js";

const C = {
  panel: "rgba(7,8,11,.93)",
  panel2: "rgba(14,14,18,.96)",
  border: "rgba(255,112,49,.72)",
  borderHot: "rgba(255,153,91,.94)",
  borderSoft: "rgba(255,102,38,.25)",
  iron: "rgba(125,117,113,.30)",
  orange: "#ff6a28",
  orangeLight: "#ffc39e",
  text: "#f4ebe3",
  muted: "#aaa19d",
  red: "#ef514e"
};

export class UI {
  constructor(canvas, callbacks) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.callbacks = callbacks;
    this.mode = "loading";
    this.wave = 1;
    this.waveTotal = CONFIG.waves.length;
    this.remaining = 0;
    this.souls = 0;
    this.health = 100;
    this.maxHealth = 100;
    this.turretLevel = 0;
    this.bombs = 0;
    this.purchaseUsed = false;
    this.bannerTitle = "";
    this.bannerSubtitle = "";
    this.bannerTimer = 0;
    this.healthFlash = 0;
    this.soulPulse = 0;
    this.buttons = [];

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
  }

  setHUD(data) {
    Object.assign(this, data);
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
    this.soulPulse = 0.45;
  }

  onPointerDown(event) {
    const x = event.clientX;
    const y = event.clientY;

    for (let i = this.buttons.length - 1; i >= 0; i -= 1) {
      const button = this.buttons[i];

      if (
        x >= button.x &&
        x <= button.x + button.w &&
        y >= button.y &&
        y <= button.y + button.h &&
        !button.disabled
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        button.onClick?.();
        return;
      }
    }
  }

  update(dt) {
    this.bannerTimer = Math.max(0, this.bannerTimer - dt);
    this.healthFlash = Math.max(0, this.healthFlash - dt);
    this.soulPulse = Math.max(0, this.soulPulse - dt);
  }

  draw() {
    const ctx = this.ctx;
    const width = window.innerWidth;
    const height = window.innerHeight;

    ctx.clearRect(0, 0, width, height);
    this.buttons = [];

    if (this.mode === "start") {
      this.drawStart(width, height);
      return;
    }

    if (this.mode === "playing") {
      this.drawHUD(width, height);

      if (this.bannerTimer > 0) {
        this.drawBanner(width, height);
      }

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

    if (this.mode === "complete") {
      this.drawComplete(width, height);
    }
  }

  font(size) {
    return `${size}px "Lansbury", Georgia, serif`;
  }

  dataFont(size, weight = 700) {
    return `${Math.max(weight, 780)} ${size}px "Arial Narrow","Roboto Condensed","Segoe UI",Arial,sans-serif`;
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
    ctx.shadowColor = "rgba(255,70,18,.20)";
    ctx.shadowBlur = 12;
    this.angularPath(x, y, width, height, cut);
    ctx.fillStyle = fill;
    ctx.fill();

    ctx.shadowBlur = 0;
    const gradient = ctx.createLinearGradient(x, y, x, y + height);
    gradient.addColorStop(0, "rgba(255,255,255,.035)");
    gradient.addColorStop(1, "rgba(0,0,0,.24)");
    this.angularPath(x, y, width, height, cut);
    ctx.fillStyle = gradient;
    ctx.fill();

    this.angularPath(x, y, width, height, cut);
    ctx.strokeStyle = C.border;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    this.angularPath(
      x + 4,
      y + 4,
      width - 8,
      height - 8,
      Math.max(3, cut - 4)
    );
    ctx.strokeStyle = C.iron;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }

  button(label, x, y, width, height, onClick, disabled = false) {
    const ctx = this.ctx;

    ctx.save();
    this.angularPath(x, y, width, height, 8);
    const gradient = ctx.createLinearGradient(x, y, x, y + height);

    if (disabled) {
      gradient.addColorStop(0, "rgba(49,49,53,.96)");
      gradient.addColorStop(1, "rgba(24,24,28,.96)");
    } else {
      gradient.addColorStop(0, "rgba(66,32,20,.98)");
      gradient.addColorStop(1, "rgba(18,12,13,.99)");
    }

    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = disabled
      ? "rgba(120,120,120,.22)"
      : C.borderHot;
    ctx.lineWidth = disabled ? 1 : 1.6;
    ctx.stroke();

    ctx.fillStyle = disabled ? "#777" : C.text;
    ctx.font = this.font(Math.min(25, height * 0.55));
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = disabled ? "transparent" : "rgba(255,85,28,.6)";
    ctx.shadowBlur = disabled ? 0 : 6;
    ctx.fillText(label, x + width / 2, y + height / 2 + 1);
    ctx.restore();

    this.buttons.push({
      x,
      y,
      w: width,
      h: height,
      onClick,
      disabled
    });
  }

  drawStart(width, height) {
    const panelWidth = Math.min(560, width - 44);
    const panelHeight = 240;
    const x = (width - panelWidth) / 2;
    const y = (height - panelHeight) / 2;

    this.panel(x, y, panelWidth, panelHeight, C.panel, 14);

    const ctx = this.ctx;
    ctx.textAlign = "center";
    ctx.fillStyle = C.text;
    ctx.font = this.font(Math.min(58, width * 0.06));
    ctx.shadowColor = "rgba(255,80,24,.7)";
    ctx.shadowBlur = 13;
    ctx.fillText("HELLGATE MANOR", width / 2, y + 72);
    ctx.shadowBlur = 0;

    ctx.strokeStyle = C.borderSoft;
    ctx.beginPath();
    ctx.moveTo(x + 70, y + 96);
    ctx.lineTo(x + panelWidth - 70, y + 96);
    ctx.stroke();

    ctx.fillStyle = C.muted;
    ctx.font = this.dataFont(15, 800);
    ctx.fillText(
      "THE GATES ARE OPEN. KEEP THE MANOR SAFE.",
      width / 2,
      y + 126
    );

    this.button(
      "START",
      width / 2 - 95,
      y + 157,
      190,
      50,
      () => this.callbacks.onStart?.()
    );
  }

  drawHUD(width, height) {
    const margin = width < 900 ? 18 : 24;
    const hudHeight = width < 900 ? 50 : 54;
    const y = height - margin - hudHeight;
    const compact = width < 850;

    const waveWidth = compact ? 140 : 172;
    const soulWidth = compact ? 100 : 128;
    const healthWidth = Math.min(compact ? 270 : 344, width * 0.37);
    const waveX = margin;
    const healthX = (width - healthWidth) / 2;
    const soulX = width - margin - soulWidth;
    const ctx = this.ctx;

    this.panel(waveX, y, waveWidth, hudHeight, C.panel, 8);
    ctx.textAlign = "left";
    ctx.fillStyle = C.orangeLight;
    ctx.font = this.font(compact ? 19 : 21);
    ctx.fillText(
      `WAVE ${this.wave}/${this.waveTotal}`,
      waveX + 12,
      y + 23
    );

    ctx.fillStyle = C.text;
    ctx.font = this.dataFont(compact ? 10 : 11, 750);
    ctx.fillText(
      `${this.remaining} HUSKS REMAIN`,
      waveX + 12,
      y + 41
    );

    this.panel(healthX, y, healthWidth, hudHeight, C.panel, 8);
    ctx.textAlign = "center";
    ctx.fillStyle = C.text;
    ctx.font = this.font(compact ? 17 : 19);
    ctx.fillText("MANOR", width / 2, y + 20);

    const barX = healthX + 14;
    const barY = y + 29;
    const barWidth = healthWidth - 28;
    const barHeight = 12;
    const ratio = Math.max(0, Math.min(1, this.health / this.maxHealth));

    ctx.fillStyle = "rgba(255,255,255,.07)";
    ctx.fillRect(barX, barY, barWidth, barHeight);
    ctx.fillStyle =
      this.healthFlash > 0 || ratio <= 0.35
        ? C.red
        : C.orange;
    ctx.fillRect(barX, barY, barWidth * ratio, barHeight);
    ctx.strokeStyle = "rgba(255,255,255,.16)";
    ctx.strokeRect(barX, barY, barWidth, barHeight);

    ctx.fillStyle = C.text;
    ctx.font = this.dataFont(10, 800);
    ctx.fillText(
      `${Math.ceil(this.health)} / ${this.maxHealth}`,
      width / 2,
      barY + 10
    );

    const pulse =
      this.soulPulse > 0
        ? 1 + this.soulPulse * 0.14
        : 1;

    ctx.save();
    ctx.translate(soulX + soulWidth / 2, y + hudHeight / 2);
    ctx.scale(pulse, pulse);
    ctx.translate(-(soulX + soulWidth / 2), -(y + hudHeight / 2));

    this.panel(soulX, y, soulWidth, hudHeight, C.panel, 8);
    ctx.fillStyle = C.orange;
    ctx.beginPath();
    ctx.arc(soulX + 20, y + 26, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = C.text;
    ctx.textAlign = "left";
    ctx.font = this.dataFont(compact ? 18 : 20, 800);
    ctx.fillText(String(this.souls), soulX + 35, y + 33);
    ctx.restore();

    if (this.bombs > 0) {
      this.button(
        `HELL BOMB × ${this.bombs}`,
        width - margin - 156,
        y - 46,
        156,
        34,
        () => this.callbacks.onBomb?.(),
        this.remaining <= 0
      );
    }
  }

  drawBanner(width, height) {
    const ctx = this.ctx;

    ctx.save();
    ctx.globalAlpha = Math.min(1, this.bannerTimer / 0.35);
    ctx.textAlign = "center";
    ctx.fillStyle = C.text;
    ctx.font = this.font(Math.min(58, width * 0.058));
    ctx.shadowColor = "rgba(255,80,24,.7)";
    ctx.shadowBlur = 10;
    ctx.fillText(this.bannerTitle, width / 2, height * 0.38);
    ctx.shadowBlur = 0;

    if (this.bannerSubtitle) {
      ctx.fillStyle = C.orangeLight;
      ctx.font = this.dataFont(15, 750);
      ctx.fillText(
        this.bannerSubtitle,
        width / 2,
        height * 0.38 + 34
      );
    }

    ctx.restore();
  }

  drawIntermission(width, height) {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,.66)";
    ctx.fillRect(0, 0, width, height);

    const panelWidth = Math.min(790, width - 56);
    const panelHeight = Math.min(600, height - 54);
    const x = (width - panelWidth) / 2;
    const y = (height - panelHeight) / 2;

    this.panel(x, y, panelWidth, panelHeight, C.panel, 15);

    ctx.textAlign = "center";
    ctx.fillStyle = C.text;
    ctx.font = this.font(45);
    ctx.shadowColor = "rgba(255,80,24,.55)";
    ctx.shadowBlur = 9;
    ctx.fillText(`WAVE ${this.wave} SURVIVED`, width / 2, y + 58);
    ctx.shadowBlur = 0;

    ctx.fillStyle = C.muted;
    ctx.font = this.dataFont(14, 800);
    ctx.fillText(
      this.purchaseUsed
        ? "PURCHASE COMPLETE — CONTINUE WHEN READY"
        : "CHOOSE ONE REPAIR OR UPGRADE",
      width / 2,
      y + 84
    );

    const nextWave = Math.min(this.wave + 1, this.waveTotal);
    const turretUnlocked =
      nextWave >= CONFIG.defence.turretUnlockWave;
    const bombUnlocked =
      nextWave >= CONFIG.defence.bombUnlockWave;

    const rowX = x + 34;
    const rowWidth = panelWidth - 68;
    const rowHeight = 112;
    const gap = 18;
    const firstY = y + 116;

    this.upgradeRow({
      x: rowX,
      y: firstY,
      width: rowWidth,
      height: rowHeight,
      title: "REPAIR MANOR",
      description: `Restore ${CONFIG.manor.repairAmount} manor health.`,
      status: `${Math.ceil(this.health)} / ${this.maxHealth} HEALTH`,
      price: `${CONFIG.manor.repairCost} SOULS`,
      disabled:
        this.purchaseUsed ||
        this.souls < CONFIG.manor.repairCost ||
        this.health >= this.maxHealth,
      onClick: () => this.callbacks.onPurchase?.("repair")
    });

    const turretCost =
      CONFIG.defence.turretCosts[
        Math.min(
          this.turretLevel,
          CONFIG.defence.turretCosts.length - 1
        )
      ];

    this.upgradeRow({
      x: rowX,
      y: firstY + rowHeight + gap,
      width: rowWidth,
      height: rowHeight,
      title: "HELLFIRE DEFENCE",
      description:
        this.turretLevel === 0
          ? "Mount an automatic defence on the manor."
          : "Add another shot to each Hellfire volley.",
      status: turretUnlocked
        ? `LEVEL ${this.turretLevel} / ${CONFIG.defence.turretMaxLevel}`
        : `UNLOCKS FOR WAVE ${CONFIG.defence.turretUnlockWave}`,
      price: turretUnlocked ? `${turretCost} SOULS` : "LOCKED",
      disabled:
        !turretUnlocked ||
        this.purchaseUsed ||
        this.turretLevel >= CONFIG.defence.turretMaxLevel ||
        this.souls < turretCost,
      onClick: () => this.callbacks.onPurchase?.("turret")
    });

    this.upgradeRow({
      x: rowX,
      y: firstY + (rowHeight + gap) * 2,
      width: rowWidth,
      height: rowHeight,
      title: "HELL BOMB",
      description:
        "Adds one charge that destroys every active Husk.",
      status: bombUnlocked
        ? `${this.bombs} / ${CONFIG.defence.bombMaxCharges} CHARGES`
        : `UNLOCKS FOR WAVE ${CONFIG.defence.bombUnlockWave}`,
      price: bombUnlocked
        ? `${CONFIG.defence.bombCost} SOULS`
        : "LOCKED",
      disabled:
        !bombUnlocked ||
        this.purchaseUsed ||
        this.bombs >= CONFIG.defence.bombMaxCharges ||
        this.souls < CONFIG.defence.bombCost,
      onClick: () => this.callbacks.onPurchase?.("bomb")
    });

    this.button(
      "CONTINUE",
      width / 2 - 100,
      y + panelHeight - 65,
      200,
      44,
      () => this.callbacks.onContinue?.()
    );
  }

  upgradeRow({
    x,
    y,
    width,
    height,
    title,
    description,
    status,
    price,
    disabled,
    onClick
  }) {
    const ctx = this.ctx;
    this.panel(x, y, width, height, C.panel2, 9);

    ctx.textAlign = "left";
    ctx.fillStyle = disabled ? "#797979" : C.orangeLight;
    ctx.font = this.font(27);
    ctx.fillText(title, x + 22, y + 34);

    ctx.fillStyle = disabled ? "#69696d" : C.text;
    ctx.font = this.dataFont(14, 800);
    ctx.fillText(description, x + 22, y + 58);

    ctx.fillStyle = disabled ? "#656569" : C.muted;
    ctx.font = this.dataFont(12, 850);
    ctx.fillText(status, x + 22, y + 81);

    const buttonWidth = 146;
    const buttonX = x + width - buttonWidth - 18;

    ctx.textAlign = "center";
    ctx.fillStyle = disabled ? "#69696d" : C.orange;
    ctx.font = this.dataFont(16, 900);
    ctx.fillText(price, buttonX + buttonWidth / 2, y + 28);

    this.button(
      disabled && price === "LOCKED" ? "LOCKED" : "PURCHASE",
      buttonX,
      y + 41,
      buttonWidth,
      43,
      onClick,
      disabled
    );
  }

  drawGameOver(width, height) {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,.70)";
    ctx.fillRect(0, 0, width, height);

    const panelWidth = Math.min(550, width - 44);
    const panelHeight = 290;
    const x = (width - panelWidth) / 2;
    const y = (height - panelHeight) / 2;

    this.panel(x, y, panelWidth, panelHeight, C.panel, 14);

    ctx.textAlign = "center";
    ctx.fillStyle = C.red;
    ctx.font = this.font(48);
    ctx.fillText("THE MANOR HAS FALLEN", width / 2, y + 72);

    ctx.fillStyle = C.muted;
    ctx.font = this.dataFont(12, 700);
    ctx.fillText(
      "Retry with the state you had when this wave began.",
      width / 2,
      y + 112
    );

    this.button(
      "RETRY WAVE",
      width / 2 - 180,
      y + 165,
      165,
      48,
      () => this.callbacks.onRetry?.()
    );

    this.button(
      "RESTART GAME",
      width / 2 + 15,
      y + 165,
      165,
      48,
      () => this.callbacks.onRestart?.()
    );
  }

  drawComplete(width, height) {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,.68)";
    ctx.fillRect(0, 0, width, height);

    const panelWidth = Math.min(620, width - 44);
    const panelHeight = 350;
    const x = (width - panelWidth) / 2;
    const y = (height - panelHeight) / 2;

    this.panel(x, y, panelWidth, panelHeight, C.panel, 14);

    ctx.textAlign = "center";
    ctx.fillStyle = C.orangeLight;
    ctx.font = this.font(46);
    ctx.fillText("WAVE 5 SURVIVED", width / 2, y + 72);

    ctx.fillStyle = C.text;
    ctx.font = this.font(35);
    ctx.fillText(
      "THANK YOU FOR TRYING OUR GAME",
      width / 2,
      y + 132
    );

    ctx.fillStyle = C.muted;
    ctx.font = this.dataFont(15, 700);
    ctx.fillText(
      "THE FULL GAME IS COMING SOON",
      width / 2,
      y + 173
    );

    this.button(
      "PLAY AGAIN",
      width / 2 - 100,
      y + 230,
      200,
      50,
      () => this.callbacks.onRestart?.()
    );
  }

  dispose() {
    window.removeEventListener("pointerdown", this.onPointerDown, true);
    window.removeEventListener("resize", this.resize);
  }
}
