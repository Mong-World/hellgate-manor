import "../style.css";
import { Game } from "./Game.js";

const container = document.getElementById("game-shell");
const game = new Game(container);

game.start().catch((error) => {
  console.error("Hellgate Manor startup failed:", error);
  const loading = document.getElementById("loading");
  if (loading) {
    loading.innerHTML = `
      <div class="loading-panel">
        <div class="loading-title">Hellgate Manor</div>
        <div id="loading-status">FAILED TO OPEN THE GATE</div>
        ${error?.assetFilename ? `<div style="margin-top:14px;font:900 15px/1.4 Segoe UI,Arial,sans-serif;color:#ff9a5d;letter-spacing:.04em">ASSET: ${String(error.assetFilename).replace(/[<>&]/g, "")}</div>` : ""}
        <div style="margin-top:10px;font:700 11px/1.4 Segoe UI,Arial,sans-serif;color:#b9aaa2;max-width:520px">
          ${String(error?.message ?? "Unknown startup error").replace(/[<>&]/g, "")}
        </div>
      </div>`;
  }
});

window.addEventListener("beforeunload", () => game.dispose());
