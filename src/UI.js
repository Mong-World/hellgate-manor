import { CONFIG } from "./Config.js";

const C = {
  panel: "rgba(8,9,12,.91)",
  panel2: "rgba(19,19,24,.95)",
  border: "rgba(255,102,38,.55)",
  borderSoft: "rgba(255,102,38,.25)",
  orange: "#ff6a28",
  orangeLight: "#ffb17b",
  text: "#f2e8df",
  muted: "#a8a2a0",
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

  setMode(mode) { this.mode = mode; }
  setHUD(data) { Object.assign(this, data); }
  showBanner(title, subtitle = "", duration = 2.2) {
    this.bannerTitle = title;
    this.bannerSubtitle = subtitle;
    this.bannerTimer = duration;
  }
  flashHealth() { this.healthFlash = 0.5; }
  pulseSouls() { this.soulPulse = 0.45; }

  onPointerDown(event) {
    const x = event.clientX;
    const y = event.clientY;
    for (let i = this.buttons.length - 1; i >= 0; i -= 1) {
      const b = this.buttons[i];
      if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h && !b.disabled) {
        event.preventDefault();
        event.stopImmediatePropagation();
        b.onClick?.();
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
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);
    this.buttons = [];

    if (this.mode === "start") return this.drawStart(w, h);
    if (this.mode === "playing") {
      this.drawHUD(w, h);
      if (this.bannerTimer > 0) this.drawBanner(w, h);
      return;
    }
    if (this.mode === "intermission") {
      this.drawHUD(w, h);
      return this.drawIntermission(w, h);
    }
    if (this.mode === "gameOver") {
      this.drawHUD(w, h);
      return this.drawGameOver(w, h);
    }
    if (this.mode === "complete") return this.drawComplete(w, h);
  }

  font(size, weight = 700) {
    return `${weight} ${size}px system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif`;
  }

  panel(x, y, w, h, radius = 10, fill = C.panel) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = C.borderSoft;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  button(label, x, y, w, h, onClick, disabled = false) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 7);
    ctx.fillStyle = disabled ? "rgba(45,45,49,.92)" : "rgba(34,20,16,.97)";
    ctx.fill();
    ctx.strokeStyle = disabled ? "rgba(120,120,120,.25)" : C.border;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = disabled ? "#777" : C.text;
    ctx.font = this.font(Math.min(18, h * 0.34), 760);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x + w / 2, y + h / 2);
    this.buttons.push({ x, y, w, h, onClick, disabled });
  }

  drawStart(w, h) {
    const pw = Math.min(620, w - 40);
    const ph = 270;
    const x = (w - pw) / 2;
    const y = (h - ph) / 2;
    this.panel(x, y, pw, ph, 12);
    const ctx = this.ctx;
    ctx.textAlign = "center";
    ctx.fillStyle = C.text;
    ctx.font = this.font(Math.min(42, w * 0.045), 820);
    ctx.fillText("HELLGATE MANOR", w / 2, y + 72);
    ctx.fillStyle = C.muted;
    ctx.font = this.font(16, 650);
    ctx.fillText("THE GATES ARE OPEN. KEEP THE MANOR SAFE.", w / 2, y + 118);
    this.button("START", w / 2 - 110, y + 160, 220, 62, () => this.callbacks.onStart?.());
  }

  drawHUD(w, h) {
    const ctx = this.ctx;
    const margin = 22;

    this.panel(margin, margin, 200, 78, 8);
    ctx.textAlign = "left";
    ctx.fillStyle = C.orangeLight;
    ctx.font = this.font(17, 820);
    ctx.fillText(`WAVE ${this.wave} / ${this.waveTotal}`, margin + 16, margin + 30);
    ctx.fillStyle = C.text;
    ctx.font = this.font(14, 650);
    ctx.fillText(`HUSKS REMAINING: ${this.remaining}`, margin + 16, margin + 57);

    const healthW = Math.min(440, w * 0.34);
    const healthX = (w - healthW) / 2;
    this.panel(healthX, margin, healthW, 78, 8);
    ctx.textAlign = "center";
    ctx.fillStyle = C.text;
    ctx.font = this.font(14, 760);
    ctx.fillText("MANOR HEALTH", w / 2, margin + 25);

    const barX = healthX + 18;
    const barY = margin + 39;
    const barW = healthW - 36;
    const barH = 20;
    const ratio = Math.max(0, Math.min(1, this.health / this.maxHealth));
    ctx.fillStyle = "rgba(255,255,255,.08)";
    ctx.fillRect(barX, barY, barW, barH);
    ctx.fillStyle = this.healthFlash > 0 || ratio <= 0.35 ? C.red : C.orange;
    ctx.fillRect(barX, barY, barW * ratio, barH);
    ctx.strokeStyle = "rgba(255,255,255,.18)";
    ctx.strokeRect(barX, barY, barW, barH);
    ctx.fillStyle = C.text;
    ctx.font = this.font(12, 800);
    ctx.fillText(`${Math.ceil(this.health)} / ${this.maxHealth}`, w / 2, barY + 15);

    const soulW = 150;
    const soulX = w - margin - soulW;
    const pulse = this.soulPulse > 0 ? 1 + this.soulPulse * 0.18 : 1;
    ctx.save();
    ctx.translate(soulX + soulW / 2, margin + 39);
    ctx.scale(pulse, pulse);
    ctx.translate(-(soulX + soulW / 2), -(margin + 39));
    this.panel(soulX, margin, soulW, 78, 8);
    ctx.fillStyle = C.orange;
    ctx.beginPath();
    ctx.arc(soulX + 28, margin + 39, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = C.orange;
    ctx.shadowBlur = 14;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = C.text;
    ctx.textAlign = "left";
    ctx.font = this.font(23, 820);
    ctx.fillText(String(this.souls), soulX + 50, margin + 48);
    ctx.restore();

    if (this.bombs > 0) {
      this.button(
        `HELL BOMB × ${this.bombs}`,
        w - margin - 190,
        h - margin - 58,
        190,
        58,
        () => this.callbacks.onBomb?.(),
        this.remaining <= 0
      );
    }
  }

  drawBanner(w, h) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = Math.min(1, this.bannerTimer / 0.35);
    ctx.textAlign = "center";
    ctx.fillStyle = C.text;
    ctx.font = this.font(Math.min(48, w * 0.055), 860);
    ctx.fillText(this.bannerTitle, w / 2, h * 0.42);
    if (this.bannerSubtitle) {
      ctx.fillStyle = C.orangeLight;
      ctx.font = this.font(18, 700);
      ctx.fillText(this.bannerSubtitle, w / 2, h * 0.42 + 42);
    }
    ctx.restore();
  }

  drawIntermission(w, h) {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,.58)";
    ctx.fillRect(0, 0, w, h);
    const pw = Math.min(880, w - 34);
    const ph = Math.min(580, h - 44);
    const x = (w - pw) / 2;
    const y = (h - ph) / 2;
    this.panel(x, y, pw, ph, 12);

    ctx.textAlign = "center";
    ctx.fillStyle = C.text;
    ctx.font = this.font(35, 860);
    ctx.fillText(`WAVE ${this.wave} SURVIVED`, w / 2, y + 54);
    ctx.fillStyle = C.muted;
    ctx.font = this.font(15, 650);
    ctx.fillText(
      this.purchaseUsed ? "PURCHASE COMPLETE — CONTINUE WHEN READY" : "CHOOSE ONE REPAIR OR UPGRADE",
      w / 2,
      y + 83
    );

    const gap = 16;
    const cardW = (pw - 64 - gap * 2) / 3;
    const cardY = y + 112;
    const cardH = 310;

    this.card({
      x: x + 16, y: cardY, w: cardW, h: cardH,
      title: "REPAIR MANOR",
      description: `Restore ${CONFIG.manor.repairAmount} health.`,
      cost: CONFIG.manor.repairCost,
      status: `${Math.ceil(this.health)} / ${this.maxHealth}`,
      disabled: this.purchaseUsed || this.souls < CONFIG.manor.repairCost || this.health >= this.maxHealth,
      onClick: () => this.callbacks.onPurchase?.("repair")
    });

    const turretCost = CONFIG.defence.turretCosts[Math.min(this.turretLevel, CONFIG.defence.turretCosts.length - 1)];
    this.card({
      x: x + 16 + cardW + gap, y: cardY, w: cardW, h: cardH,
      title: "HELLFIRE DEFENCE",
      description: this.turretLevel === 0
        ? "Mount a defence that fires every 5 seconds."
        : "Add another Hellfire shot to each volley.",
      cost: turretCost,
      status: `LEVEL ${this.turretLevel} / ${CONFIG.defence.turretMaxLevel}`,
      disabled: this.purchaseUsed || this.turretLevel >= CONFIG.defence.turretMaxLevel || this.souls < turretCost,
      onClick: () => this.callbacks.onPurchase?.("turret")
    });

    this.card({
      x: x + 16 + (cardW + gap) * 2, y: cardY, w: cardW, h: cardH,
      title: "HELL BOMB",
      description: "Adds one charge. During a wave it destroys every active Husk.",
      cost: CONFIG.defence.bombCost,
      status: `${this.bombs} / ${CONFIG.defence.bombMaxCharges} CHARGES`,
      disabled: this.purchaseUsed || this.bombs >= CONFIG.defence.bombMaxCharges || this.souls < CONFIG.defence.bombCost,
      onClick: () => this.callbacks.onPurchase?.("bomb")
    });

    this.button("CONTINUE", w / 2 - 120, y + ph - 76, 240, 56, () => this.callbacks.onContinue?.());
  }

  card({ x, y, w, h, title, description, cost, status, disabled, onClick }) {
    const ctx = this.ctx;
    this.panel(x, y, w, h, 9, C.panel2);
    ctx.textAlign = "center";
    ctx.fillStyle = disabled ? "#777" : C.orangeLight;
    ctx.font = this.font(18, 850);
    ctx.fillText(title, x + w / 2, y + 38);
    ctx.fillStyle = disabled ? "#6f6f72" : C.text;
    ctx.font = this.font(14, 600);
    this.wrap(description, x + w / 2, y + 80, w - 34, 21);
    ctx.fillStyle = disabled ? "#666" : C.muted;
    ctx.font = this.font(13, 700);
    ctx.fillText(status, x + w / 2, y + h - 105);
    ctx.fillStyle = disabled ? "#666" : C.orange;
    ctx.font = this.font(25, 850);
    ctx.fillText(`${cost} SOULS`, x + w / 2, y + h - 72);
    this.button("PURCHASE", x + 18, y + h - 52, w - 36, 38, onClick, disabled);
  }

  wrap(text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    let yy = y;
    for (const word of words) {
      const test = `${line}${word} `;
      if (this.ctx.measureText(test).width > maxWidth && line) {
        this.ctx.fillText(line.trim(), x, yy);
        line = `${word} `;
        yy += lineHeight;
      } else line = test;
    }
    this.ctx.fillText(line.trim(), x, yy);
  }

  drawGameOver(w, h) {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,.68)";
    ctx.fillRect(0, 0, w, h);
    const pw = Math.min(560, w - 34);
    const ph = 310;
    const x = (w - pw) / 2;
    const y = (h - ph) / 2;
    this.panel(x, y, pw, ph, 12);
    ctx.textAlign = "center";
    ctx.fillStyle = C.red;
    ctx.font = this.font(39, 860);
    ctx.fillText("THE MANOR HAS FALLEN", w / 2, y + 70);
    ctx.fillStyle = C.muted;
    ctx.font = this.font(15, 650);
    ctx.fillText("Retry the wave with the state you had when it began.", w / 2, y + 111);
    this.button("RETRY WAVE", w / 2 - 190, y + 165, 180, 58, () => this.callbacks.onRetry?.());
    this.button("RESTART GAME", w / 2 + 10, y + 165, 180, 58, () => this.callbacks.onRestart?.());
  }

  drawComplete(w, h) {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,.65)";
    ctx.fillRect(0, 0, w, h);
    const pw = Math.min(650, w - 34);
    const ph = 380;
    const x = (w - pw) / 2;
    const y = (h - ph) / 2;
    this.panel(x, y, pw, ph, 12);
    ctx.textAlign = "center";
    ctx.fillStyle = C.orangeLight;
    ctx.font = this.font(35, 860);
    ctx.fillText("WAVE 5 SURVIVED", w / 2, y + 70);
    ctx.fillStyle = C.text;
    ctx.font = this.font(27, 820);
    ctx.fillText("THANK YOU FOR TRYING OUR GAME", w / 2, y + 132);
    ctx.fillStyle = C.muted;
    ctx.font = this.font(18, 650);
    ctx.fillText("THE FULL GAME IS COMING SOON", w / 2, y + 176);
    this.button("PLAY AGAIN", w / 2 - 120, y + 240, 240, 62, () => this.callbacks.onRestart?.());
  }

  dispose() {
    window.removeEventListener("pointerdown", this.onPointerDown, true);
    window.removeEventListener("resize", this.resize);
  }
}
