import Phaser from 'phaser';

// Title screen. Clicking the background starts the game.
export default class HomeScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HomeScene' });
  }

  init(data) {
    this.message = data?.message;
  }

  create() {
    this.cameras.main.setBackgroundColor('#0052e7');

    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    this.background = this.add
      .image(0, -250, 'background')
      .setOrigin(0, 0)
      .setScale(0.7)
      .setInteractive();
    this.background.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    this.tweens.add({
      targets: this.background,
      y: -550,
      duration: 1000,
      ease: 'Linear',
    });

    this.logo = this.add.image(centerX, centerY, 'logo').setOrigin(0.5);

    this.tweens.add({
      targets: this.logo,
      scaleX: 1.6,
      scaleY: 1.6,
      duration: 1000,
      ease: 'Linear',
    });

    this.add
      .text(centerX, centerY + 140, 'TOUCH TO START', {
        fontFamily: 'Arial',
        fontSize: '35px',
        color: 'black',
      })
      .setOrigin(0.5)
      .setShadow(2, 2, '#333333', 2, true, true);

    if (this.message) {
      this.add
        .text(960, 250, this.message, {
          fontFamily: 'Arial',
          fontSize: '35px',
          color: 'red',
        })
        .setOrigin(0.5);
    }
  }
}
