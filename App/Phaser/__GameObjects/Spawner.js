import Phaser from "../lib/phaser.js";

export default class Spawner extends Phaser.Physics.Arcade.Group {
  constructor() {
    super();
  }
  addCollider(obj) {
    this.scene.physics.add.collider(this, obj);
  }
  addOverlap(obj, func) {
    this.scene.physics.add.overlap(this, obj, func, undefined, this.scene);
  }
}
