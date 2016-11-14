import Game from './game.js';
import GameView from './game_view.js';

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById('game-canvas');
  canvas.width = Game.X_COORD;
  canvas.height = Game.Y_COORD;
  const ctx = canvas.getContext("2d");
  let game = new Game();
  let gv = new GameView(game, ctx);
  gv.start();
});
