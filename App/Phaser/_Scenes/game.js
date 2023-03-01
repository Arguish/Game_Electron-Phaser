import Phaser from "../lib/phaser.js";
import Carrot from "../__GameObjects/Carrot.js";

export default class Game extends Phaser.Scene {
  carrotsCollected = 0;
  carrotCollectedText;

  /**
   * @param {Phaser.Physics.Arcade.Sprite} player
   * @param {Carrot} carrot
   */
  handleCollectCarrot(player, carrot) {
    // hide from display
    this.carrots.killAndHide(carrot);

    // disable from physics world
    this.physics.world.disableBody(carrot.body);
    this.carrotsCollected++;
    this.carrotCollectedText.text = `Carrots: ${this.carrotsCollected}`;
  }

  findBottomMostPlatform() {
    const platforms = this.platforms.getChildren();
    let bottomPlatform = platforms[0];

    for (let i = 1; i < platforms.length; ++i) {
      const platform = platforms[i];

      // discard any platforms that are above current
      if (platform.y < bottomPlatform.y) {
        continue;
      }

      bottomPlatform = platform;
    }

    return bottomPlatform;
  }

  /**
   * @param {Phaser.GameObjects.Sprite} sprite
   */
  addAbove(sprite, somthing) {
    /** @type {Phaser.Physics.Arcade.Sprite} */
    const carrot = somthing.get(
      sprite.x,
      sprite.y - sprite.displayHeight,
      "carrot"
    );

    carrot.setActive(true);
    carrot.setVisible(true);

    this.add.existing(carrot);

    // update the physics body size
    carrot.body.setSize(carrot.width, carrot.height);

    // make sure body is enabed in the physics world
    this.physics.world.enable(carrot);

    return carrot;
  }

  /** @type {Phaser.Physics.Arcade.Sprite} */
  player;
  platforms;
  carrots;
  constructor() {
    super("game"); //Every Scene has to define a unique key. We do that on line 7 in the constructor by calling super('game').
  }

  preload() {
    this.load.image("background", "../Phaser/Assets/Test/bg_layer1.png");
    this.load.image("platform", "../Phaser/Assets/Test/ground_grass.png");
    this.load.image("bunny-stand", "../Phaser/Assets/Test/bunny2_stand.png");
    this.load.image("carrot", "../Phaser/Assets/Test/carrot.png");
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.add.image(240, 320, "background").setScrollFactor(1, 0);

    this.platforms = this.physics.add.staticGroup();

    for (let i = 0; i < 5; ++i) {
      const x = Phaser.Math.Between(100, 300);
      const y = 150 * i;

      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = this.platforms.create(x, y, "platform");
      platform.scale = 0.5;

      /** @type {Phaser.Physics.Arcade.StaticBody} */
      const body = platform.body;
      body.updateFromGameObject();
    }
    this.player = this.physics.add
      .sprite(240, 320, "bunny-stand")
      .setScale(0.5);

    this.physics.add.collider(this.platforms, this.player);
    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    this.cameras.main.startFollow(this.player);
    // set the horizontal dead zone to 1.5x game width
    this.cameras.main.setDeadzone(this.scale.width * 1.5);

    //Carrot
    const carrot = new Carrot(this, 240, 320, "carrot");
    this.add.existing(carrot);
    this.carrots = this.physics.add.group({
      classType: Carrot,
    });
    this.carrots.get(240, 320, "carrot");
    this.physics.add.collider(this.platforms, this.carrots);
    this.physics.add.overlap(
      this.player,
      this.carrots,
      this.handleCollectCarrot,
      undefined,
      this
    );

    const style = { color: "#000", fontSize: 24 };
    this.carrotCollectedText = this.add
      .text(240, 10, "Carrots:0", style)
      .setScrollFactor(0)
      .setOrigin(0.5, 0);
  }

  update(t, dt) {
    this.platforms.children.iterate((child) => {
      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = child;

      const scrollY = this.cameras.main.scrollY;
      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100);
        platform.body.updateFromGameObject();

        // create a carrot above the platform being reused
        this.addAbove(platform, this.carrots);
      }
    });

    this.platforms.children.iterate((child) => {
      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = child;

      const scrollY = this.cameras.main.scrollY;
      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100);
        platform.body.updateFromGameObject();
      }
    });
    // find out from Arcade Physics if the player's physics body
    // is touching something below it
    const touchingDown = this.player.body.touching.down;

    if (touchingDown) {
      // this makes the bunny jump straight up
      this.player.setVelocityY(-300);
    }
    // left and right input logic
    if (this.cursors.left.isDown && !touchingDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown && !touchingDown) {
      this.player.setVelocityX(200);
    } else {
      // stop movement if not left or right
      this.player.setVelocityX(0);
    }
    this.horizontalWrap(this.player);

    const bottomPlatform = this.findBottomMostPlatform();
    if (this.player.y > bottomPlatform.y + 200) {
      console.log("game over");
      this.scene.start("game-over");
    }
  }
  /**
   * @param {Phaser.GameObjects.Sprite} sprite
   */
  horizontalWrap(sprite) {
    const halfWidth = sprite.displayWidth * 0.5;
    const gameWidth = this.scale.width;
    if (sprite.x < -halfWidth) {
      sprite.x = gameWidth + halfWidth;
    } else if (sprite.x > gameWidth + halfWidth) {
      sprite.x = -halfWidth;
    }
  }
}
