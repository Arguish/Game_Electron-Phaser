import Phaser from "../lib/phaser.js";

export default class Spawner extends Phaser.Physics.Arcade.Group {
  constructor(world, scene, children) {
    super(world, scene, children);
  }
  addCollider(obj) {
    this.scene.physics.add.collider(this, obj);
  }
  addOverlap(obj, func) {
    this.scene.physics.add.overlap(this, obj, func, undefined, this.scene);
  }
}
