import Phaser from 'phaser';
import levelData from '../data/level.json';

const WORLD_WIDTH = 10000;
const WORLD_HEIGHT = 1000;
const RUNNING_SPEED = 1000;
const JUMPING_SPEED = 550;
const BOULDER_SPEED = 500;
const PEASANT_COUNT = 20;

// Animations are global to the game, so define each one once. Skip any whose
// spritesheet failed to load, so Phaser does not warn about missing frames.
function createAnimations(scene) {
  const define = (key, sheet, frameList, frameRate, repeat) => {
    if (scene.anims.exists(key) || !scene.textures.exists(sheet)) return;
    scene.anims.create({
      key,
      frames: frameList.map((frame) => ({ key: sheet, frame })),
      frameRate,
      repeat,
    });
  };

  define('luci-walking', 'luci', [6, 2, 6, 2], 6, -1);
  define('luci-jumping', 'luci', [3, 2, 10], 5, 0);
  define('blue-walking', 'blue', [6, 2, 6, 2], 6, -1);
  define('blue-hurting', 'blue', [7, 8], 2, 0);
}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.playerHealth = 100;
    this.ending = false;

    this.cameras.main.setBackgroundColor('#0052e7');
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    createAnimations(this);

    if (this.cache.audio.exists('song')) {
      this.music = this.sound.add('song');
      this.music.play();
    } else {
      console.error('[luci] Audio "song" is missing, so the music is skipped.');
    }

    /* ----- Platforms from level data ----- */
    this.platforms = this.physics.add.staticGroup();
    levelData.platformData.forEach((element) => {
      this.platforms
        .create(element.x, element.y, 'ground')
        .setOrigin(0, 0)
        .refreshBody();
    });

    /* ----- Goal ----- */
    this.goal = this.add.sprite(9400, 700, 'goal').setOrigin(0, 0).setScale(2);
    this.physics.add.existing(this.goal);

    /* ----- Peasants ----- */
    this.peasants = this.physics.add.group();
    for (let i = 0; i < PEASANT_COUNT; i++) {
      const peasant = this.add
        .sprite(
          Math.floor(Math.random() * WORLD_WIDTH),
          Math.floor(Math.random() * WORLD_HEIGHT),
          'blue',
          Math.floor(Math.random() * 11),
        )
        .setOrigin(0, 0)
        .setScale(0.4)
        .setTint(Math.floor(Math.random() * 0xc93535));
      this.physics.add.existing(peasant);
      this.peasants.add(peasant);
    }

    /* ----- Luci ----- */
    this.luci = this.add
      .sprite(levelData.playerStart.x, levelData.playerStart.y, 'luci')
      .setScale(0.4);
    this.physics.add.existing(this.luci);
    this.luci.setInteractive(this.input.makePixelPerfect());
    this.input.setDraggable(this.luci);
    this.luci.on('pointerdown', () => this.youWon());

    /* ----- Boulder ----- */
    this.boulder = this.add.sprite(-200, -200, 'boulder');
    this.physics.add.existing(this.boulder);
    this.boulder.body.setSize(500, 708, false);
    this.boulder.body.setOffset(0, 0);
    this.boulder.setInteractive(this.input.makePixelPerfect());
    this.input.setDraggable(this.boulder);

    // Dragged sprites also move their physics body.
    this.input.on('drag', (_pointer, gameObject, dragX, dragY) => {
      if (gameObject === this.luci || gameObject === this.boulder) {
        gameObject.body.reset(dragX, dragY);
      }
    });

    this.cameras.main.startFollow(this.luci);

    /* ----- Collisions ----- */
    this.physics.add.collider(this.luci, this.platforms);
    this.physics.add.collider(this.boulder, this.platforms);
    this.physics.add.collider(this.peasants, this.platforms);
    this.physics.add.collider(this.goal, this.platforms);
    this.physics.add.collider(this.luci, this.goal, () => this.youWon());
    this.physics.add.collider(this.luci, this.boulder, () => this.killPlayer());
    // Phaser passes (boulder, peasant) for a group collision.
    this.physics.add.collider(
      this.peasants,
      this.boulder,
      (boulder, peasant) => {
        this.deadPeasant(boulder, peasant);
      },
    );
  }

  update() {
    if (this.playerHealth <= 0) this.gameOver();

    const luciBody = this.luci.body;
    luciBody.setVelocityX(0);

    /* ----- Keyboard controls ----- */
    if (this.cursors.left.isDown) {
      luciBody.setVelocityX(-RUNNING_SPEED);
      this.luci.setFlipX(true);
      if (luciBody.touching.down) {
        this.luci.anims.play('luci-walking', true);
      } else {
        this.luci.setFrame(9);
      }
    } else if (this.cursors.right.isDown) {
      this.luci.setFlipX(false);
      luciBody.setVelocityX(RUNNING_SPEED);
      if (luciBody.touching.down) {
        this.luci.anims.play('luci-walking', true);
      } else {
        this.luci.setFrame(9);
      }
    } else {
      this.luci.anims.stop();
      this.luci.setFrame(0);
    }

    if (this.cursors.down.isDown) {
      this.luci.setFrame(3);
    }

    if (this.cursors.up.isDown) {
      luciBody.setVelocityY(-JUMPING_SPEED);
      this.luci.anims.play('luci-jumping', true);
    }

    this.peasants.getChildren().forEach((peasant) => {
      if (peasant.body.touching.down) {
        peasant.body.setVelocityX(RUNNING_SPEED);
        peasant.anims.play('blue-walking', true);
      }
    });

    const boulderBody = this.boulder.body;
    boulderBody.setVelocityX(BOULDER_SPEED);
    if (boulderBody.touching.down) {
      boulderBody.setVelocityX(BOULDER_SPEED + 870);
    }
    this.boulder.angle += 25;
  }

  gameOver() {
    if (this.ending) return;
    this.ending = true;
    this.time.delayedCall(2000, () => {
      this.scene.start('HomeScene', { message: 'You Died' });
    });
  }

  youWon() {
    if (this.ending) return;
    this.ending = true;
    this.sound.stopAll();
    console.log('You won!');
    this.scene.start('YouWonScene');
  }

  deadPeasant(_boulder, peasant) {
    peasant.anims.play('blue-hurting', true);
    this.time.delayedCall(300, () => {
      peasant.destroy();
    });
  }

  killPlayer() {
    if (this.ending) return;
    this.ending = true;
    this.scene.start('GameOverScene', { message: 'You Dead' });
  }
}
