import Phaser from 'phaser';
import { logLoadErrors } from '../loadErrors.js';

// Loads only the loading-bar image, then hands over to PreloadScene.
export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    logLoadErrors(this);
    this.load.image('preloadBar', '/images/luci/preloadBar.png');
  }

  create() {
    this.cameras.main.setBackgroundColor('#ffffff');
    this.scene.start('PreloadScene');
  }
}
