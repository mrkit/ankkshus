import Phaser from 'phaser';

// Shown after Luci is hit by the boulder. Returns to the title screen.
export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  create() {
    this.sound.stopAll();
    this.cameras.main.setBackgroundColor('#ffffff');

    this.add
      .text(this.scale.width / 2, this.scale.height / 2, 'GAME OVER!', {
        fontFamily: 'Arial',
        fontSize: '105px',
        color: 'red',
      })
      .setOrigin(0.5);

    this.time.delayedCall(2000, () => {
      this.scene.start('HomeScene');
    });
  }
}
