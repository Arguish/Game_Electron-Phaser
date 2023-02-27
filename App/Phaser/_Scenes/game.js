import Phaser from "../lib/phaser.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game"); //Every Scene has to define a unique key. We do that on line 7 in the constructor by calling super('game').
  }

  preload() {
    this.load.image("background", "../Phaser/Assets/Test/bg_layer1.png");
    this.load.image("platform", "../Phaser/Assets/Test/ground_grass.png");
  }

  create() {
    this.add.image(240, 320, "background");
    this.physics.add.image(240, 320, "platform").setScale(0.5);
  }
}
