import Phaser from "../lib/phaser.js";

export default class Spawner {
  constructor(scene, children) {
    this.scene = scene;
    this.children = children;
    this.scene.physics.add.group({ classType: this.children });
  }
  addCollider(obj) {
    this.scene.physics.add.collider(this, obj);
  }
  addOverlap(obj, func) {
    this.scene.physics.add.overlap(this, obj, func, undefined, this.scene);
  }
}
