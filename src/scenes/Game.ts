import Phaser , {Types} from 'phaser';
import {PlatformBuilder} from "./platform.builder";
import {ASSETS_BOMB, ASSETS_CHARACTER, ASSETS_GROUND, ASSETS_SKY, ASSETS_STAR} from "./constants";
import handleAllKeys from "./cursor";

let gameOver = false;
let score = 0;
let scoreText : any;
export default class Main extends Phaser.Scene {
  player ?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  platform ?: Phaser.Physics.Arcade.StaticGroup;
  stars ?: any;
  bombs ?: any;

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

  hitBomb (player : any, bomb : any)
  {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
  }

  collectStar (player : any, star: any) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
    if (this.stars.countActive(true) === 0)    {
      this.stars.children.iterate(function (child : any) {

        child.enableBody(true, child.x, 0, true, true);

      });

      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      var bomb = this.bombs.create(x, 16, ASSETS_BOMB);
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
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

    this.player = this.physics.add.sprite(20, 400, ASSETS_CHARACTER);

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

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', color: '#00000' });

    this.physics.add.collider(this.player, platform);

    this.stars = this.physics.add.group({
      key: ASSETS_STAR,
      repeat: 5,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.stars.children.iterate(function (child : any) {
      //@ts-ignore
      child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.2)
      );
    });

    this.bombs = this.physics.add.group();

    this.physics.add.collider(this.stars, platform);
    this.physics.add.collider(this.bombs, platform);

    this.physics.add.overlap(this.player, this.stars, this.collectStar.bind(this) , () => null);


    this.physics.add.collider(this.player, this.bombs, this.hitBomb.bind(this))
  }

  update(time: number, delta: number) {
    super.update(time, delta);
    const cursors = this.input.keyboard.createCursorKeys();

    handleAllKeys(cursors , {player : this.player!})
  }
}
