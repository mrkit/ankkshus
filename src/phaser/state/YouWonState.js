var YouWonState = {
  
  preload(){
    this.game.load.image('logo', '../../assets/images/logo.png');
  },
  
  create(){
    this.game.stage.backgroundColor = '#ffffff';
    this.game.add.text(960, 450, 'YOU WON!', { font: '105px Arial', fill: 'green'}).anchor.setTo(0.5);
    this.game.time.events.add(2000, function(){
      this.state.start('HomeState');
    }, this);
  }
};