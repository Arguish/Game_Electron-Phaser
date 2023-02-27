import Phaser from "../lib/phaser.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game"); //Every Scene has to define a unique key. We do that on line 7 in the constructor by calling super('game').
  }

  preload() {
    this.load.image("background", "../Phaser/Assets/Test/bg_layer1.png");
  }

  create() {
    this.add.image(240, 320, "background");
  }
}
