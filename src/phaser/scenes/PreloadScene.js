import Phaser from 'phaser';
import { logLoadErrors } from '../loadErrors.js';

// Loads the game assets and shows a loading bar that fills as files arrive.
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    logLoadErrors(this);
    this.cameras.main.setBackgroundColor('#000000');

    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    this.preloadBar = this.add
      .sprite(centerX, centerY + 128, 'preloadBar')
      .setOrigin(0.5)
      .setScale(0.8);

    // Phaser 2 setPreloadSprite cropped the bar to the loaded fraction.
    this.load.on('progress', (value) => {
      const bar = this.preloadBar;
      bar.setCrop(0, 0, bar.width * value, bar.height);
    });

    this.add
      .text(centerX, centerY, 'Loading...', {
        fontFamily: 'American Typewriter',
        fontSize: '45px',
        color: 'blue',
      })
      .setOrigin(0.5)
      .setShadow(1, 1, '#ffffff', 1, true, true);

    this.load.image('logo', '/images/luci/logo.png');
    this.load.image('background', '/images/luci/background.png');
    this.load.image('ground', '/images/luci/ground.png');
    this.load.image('boulder', '/images/luci/boulder.png');
    this.load.spritesheet('luci', '/images/luci/spritesheets/alien.png', {
      frameWidth: 332,
      frameHeight: 407,
      endFrame: 10,
    });
    this.load.spritesheet('blue', '/images/luci/spritesheets/blue.png', {
      frameWidth: 332,
      frameHeight: 407,
      endFrame: 10,
    });
    this.load.image('goal', '/images/luci/goal.png');
    this.load.audio('song', '/audio/song.mp3');
  }

  create() {
    this.time.delayedCall(500, () => {
      this.scene.start('HomeScene');
    });
  }
}
