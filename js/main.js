import { Game } from "./Game.js";

const container = document.getElementById("game-shell");

const game = new Game(container);
game.start();

window.addEventListener("beforeunload", () => game.dispose());
