import Phaser from "../lib/phaser.js";

export default class Pawn extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.texture = texture;
    this.scale = 0.5;
    this.scene.physics.add.existing(this);
    this.body.checkCollision.up = false;
    this.body.checkCollision.right = false;
    this.body.checkCollision.left = false;
    this.addToDisplayList();
    this.xWarp = true;
  }
  addColision(obj) {
    this.scene.physics.add.collider(this, obj);
  }
  addOverlap(obj, func) {
    this.scene.physics.add.overlap(this, obj, func, undefined, this.scene);
  }
  autojump() {
    // find out from Arcade Physics if the player's physics body
    // is touching something below it
    if (this.body.touching.down) {
      this.setVelocityY(-300);
    }
  }
  moveLR() {
    if (this.scene.cursors.left.isDown && !this.body.touching.down) {
      this.setVelocityX(-200);
    } else if (this.scene.cursors.right.isDown && !this.body.touching.down) {
      this.setVelocityX(200);
    } else {
      // stop movement if not left or right
      this.setVelocityX(0);
    }
  }
  horizontalWarp() {
    if (this.xWarp) {
      const halfWidth = this.displayWidth * 0.5;
      const gameWidth = this.scene.scale.width;
      if (this.x < -halfWidth) {
        this.x = gameWidth + halfWidth;
      } else if (this.x > gameWidth + halfWidth) {
        this.x = -halfWidth;
      }
    }
  }
  update() {
    this.autojump();
    this.moveLR();
    this.horizontalWarp();
  }
}
