import Phaser , {Types} from 'phaser';
import {PlatformBuilder} from "./platform.builder";
import {ASSETS_BOMB, ASSETS_CHARACTER, ASSETS_GROUND, ASSETS_SKY, ASSETS_STAR} from "./constants";

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
    PlatformBuilder
        .clone(this.physics)
        .setAssets(ASSETS_GROUND)
        .add(400,568,2)
        .add(600,400)
        .add(50,250)
        .add(750,220).build();
  }
}
