import Phaser from "./lib/phaser.js";
import Game from "./_Scenes/game.js";

//console.dir(Phaser);

const gameConfig = {
  type: Phaser.AUTO,
  parent: "gameDiv",
  width: 480,
  height: 640,
  scene: Game,
};

export default new Phaser.Game(gameConfig);
