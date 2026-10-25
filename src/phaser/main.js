import Phaser from 'phaser';
import BootScene from './scenes/BootScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import GameScene from './scenes/GameScene.js';
import HomeScene from './scenes/HomeScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import YouWonScene from './scenes/YouWonScene.js';

// The first scene in the list is started automatically, so BootScene runs first.
new Phaser.Game({
  type: Phaser.AUTO,
  width: 1920,
  height: 900,
  backgroundColor: '#ffffff',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: { gravity: { x: 0, y: 1000 } },
  },
  scene: [
    BootScene,
    PreloadScene,
    HomeScene,
    GameScene,
    GameOverScene,
    YouWonScene,
  ],
});
