import Phaser from "../lib/phaser.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game"); //Every Scene has to define a unique key. We do that on line 7 in the constructor by calling super('game').
  }

  preload() {}

  create() {}
}
