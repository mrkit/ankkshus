var GameOverState = {
  
  preload(){
    this.game.load.image('logo', '../../assets/images/logo.png');
  },
  
  create(){
    this.game.sound.stopAll();

    this.game.stage.backgroundColor = '#ffffff';
    this.game.add.text(960, 450, 'GAME OVER!', { font: '105px Arial', fill: 'red'}).anchor.setTo(0.5);
    this.game.time.events.add(2000, function(){
      this.state.start('HomeState');
    }, this);
  }
};