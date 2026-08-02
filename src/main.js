import "../style.css";
import { Game } from "./Game.js";

const container = document.getElementById("game-shell");
const game = new Game(container);

game.start().catch((error) => {
  console.error(error);
  const loading = document.getElementById("loading");
  loading.textContent = "FAILED TO OPEN THE GATE";
});

window.addEventListener("beforeunload", () => game.dispose());
