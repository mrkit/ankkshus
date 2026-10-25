import Phaser from 'phaser';

// Shown after Luci reaches the goal or is clicked. Returns to the title screen.
export default class YouWonScene extends Phaser.Scene {
  constructor() {
    super({ key: 'YouWonScene' });
  }

  create() {
    this.cameras.main.setBackgroundColor('#ffffff');

    this.add
      .text(this.scale.width / 2, this.scale.height / 2, 'YOU WON!', {
        fontFamily: 'Arial',
        fontSize: '105px',
        color: 'green',
      })
      .setOrigin(0.5);

    this.time.delayedCall(2000, () => {
      this.scene.start('HomeScene');
    });
  }
}
