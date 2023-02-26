import Phaser from "./lib/phaser.js";

console.dir(Phaser);

export default new Phaser.Game({
  type: Phaser.AUTO,
  parent: "gameDiv",
  width: 480,
  height: 640,
});
