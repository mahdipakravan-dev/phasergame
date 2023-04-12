import Phaser , {Types} from 'phaser';
import {PlatformBuilder} from "./platform.builder";
import {ASSETS_BOMB, ASSETS_CHARACTER, ASSETS_GROUND, ASSETS_SKY, ASSETS_STAR} from "./constants";
import handleAllKeys from "./cursor";

export default class Main extends Phaser.Scene {
  player ?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  platform ?: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super("Game-Scene");
    this.player = undefined

  }
  preload() {
    this.load.image(ASSETS_SKY, 'assets/sky.png');
    this.load.image(ASSETS_GROUND, 'assets/platform.png');
    this.load.image(ASSETS_STAR, 'assets/star.png');
    this.load.image(ASSETS_BOMB, 'assets/bomb.png');
    this.load.spritesheet(ASSETS_CHARACTER,
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );

  }


  create() {
    this.add.image(400, 300, ASSETS_SKY);
    const platform = this.physics.add.staticGroup();
    PlatformBuilder
        .clone(platform)
        .setAssets(ASSETS_GROUND)
        .add(400,568,2)
        .add(600,400)
        .add(50,250)
        .add(750,220).build();

    this.player = this.physics.add.sprite(0, 0, ASSETS_CHARACTER);

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(false);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(ASSETS_CHARACTER, { start: 0, end: 3 }),
      frameRate: 10,
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: ASSETS_CHARACTER, frame: 4 } ],
      frameRate: 10000
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers(ASSETS_CHARACTER, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.physics.add.collider(this.player, platform);
  }

  update(time: number, delta: number) {
    super.update(time, delta);
    const cursors = this.input.keyboard.createCursorKeys();

    handleAllKeys(cursors , {player : this.player})
  }
}
