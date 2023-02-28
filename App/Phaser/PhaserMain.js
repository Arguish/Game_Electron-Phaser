import Phaser from "./lib/phaser.js";
import Game from "./_Scenes/game.js";
import GameOver from "./_Scenes/GameOver.js";

//console.dir(Phaser);

const gameConfig = {
  type: Phaser.AUTO,
  parent: "gameDiv",
  width: 480,
  height: 640,
  scene: [Game, GameOver],
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 200,
      },
      debug: true,
    },
  },
};

export default new Phaser.Game(gameConfig);
