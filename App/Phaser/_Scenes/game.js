import Phaser from "../lib/phaser.js";
import Carrot from "../__GameObjects/Carrot.js";
import Pawn from "../__GameObjects/Player.js";

export default class Game extends Phaser.Scene {
  carrotsCollected = 0;
  carrotCollectedText;

  /**
   * @param {Phaser.Physics.Arcade.Sprite} player
   * @param {Carrot} carrot
   */
  handleCollectCarrot(player, carrot) {
    // hide from display
    this.GroupOfCarrots.killAndHide(carrot);

    // disable from physics world
    this.physics.world.disableBody(carrot.body);
    this.carrotsCollected++;
    this.carrotCollectedText.text = `Carrots: ${this.carrotsCollected}`;
  }

  constructor() {
    super("game"); //Every Scene has to define a unique key. We do that on line 7 in the constructor by calling super('game').
    this.player;
    this.GroupOfPlatforms;
    this.GroupOfCarrots;
    this.bottomPlatform;
  }

  findBottomItemFrom(array) {
    const group = array.getChildren();
    let bottomFromGroup = group[0];

    for (let i = 1; i < group.length; ++i) {
      const item = group[i];

      // discard any group that are above current
      if (item.y < bottomFromGroup.y) {
        continue;
      }

      bottomFromGroup = item;
    }

    return bottomFromGroup;
  }

  addAbove(sprite, somthing, image) {
    /** @type {Phaser.Physics.Arcade.Sprite} */
    const thing = somthing.get(
      sprite.x,
      sprite.y - sprite.displayHeight,
      image
    );

    thing.setActive(true);
    thing.setVisible(true);

    this.add.existing(thing);

    // update the physics body size
    thing.body.setSize(thing.width, thing.height);

    // make sure body is enabed in the physics world
    this.physics.world.enable(thing);

    return thing;
  }

  instanciateSome(num, group, image, xmin, xmax, every) {
    for (let i = 0; i < num; ++i) {
      const x = Phaser.Math.Between(xmin, xmax);
      const y = every * i;

      /** @type {Phaser.Physics.Arcade.Sprite} */
      const item = group.create(x, y, image);
      item.scale = 0.5;

      /** @type {Phaser.Physics.Arcade.StaticBody} */
      const body = item.body;
      body.updateFromGameObject();
    }
  }

  tpPlatforms(ymin, ymax) {
    this.GroupOfPlatforms.children.iterate((platform) => {
      if (platform.y >= this.cameras.main.scrollY + 700) {
        platform.y =
          this.cameras.main.scrollY - Phaser.Math.Between(ymin, ymax);
        platform.body.updateFromGameObject();
        // create a carrot above the platform being reused
        this.addAbove(platform, this.GroupOfCarrots, "carrot");
      }
    });
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

    this.GroupOfPlatforms = this.physics.add.staticGroup();

    this.instanciateSome(5, this.GroupOfPlatforms, "platform", 100, 300, 150);

    this.player = new Pawn(this, 240, 320, "bunny-stand");
    this.player.addColision(this.GroupOfPlatforms);

    this.cameras.main.startFollow(this.player);
    // set the horizontal dead zone to 1.5x game width
    this.cameras.main.setDeadzone(this.scale.width * 1.5);

    //Carrot
    //Aqui se establece el gameObject del cual se iran intanciando copias dentro del "group"
    this.GroupOfCarrots = this.physics.add.group({
      classType: Carrot,
    });

    this.physics.add.collider(this.GroupOfPlatforms, this.GroupOfCarrots);
    this.player.addOverlap(this.GroupOfCarrots, this.handleCollectCarrot);

    const style = { color: "#000", fontSize: 24 };
    this.carrotCollectedText = this.add
      .text(240, 10, "Carrots:0", style)
      .setScrollFactor(0)
      .setOrigin(0.5, 0);
  }

  update(t, dt) {
    this.tpPlatforms(50, 80);

    this.player.update();

    this.bottomPlatform = this.findBottomItemFrom(this.GroupOfPlatforms);
    if (this.player.y > this.bottomPlatform.y + 200) {
      console.log("game over");
      this.scene.start("game-over");
    }
  }
}
