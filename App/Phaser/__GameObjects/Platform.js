import Phaser from "../lib/phaser.js";

export default class PLatform extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
  }
}
