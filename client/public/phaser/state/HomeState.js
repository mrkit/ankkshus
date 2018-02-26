var HomeState = {
  
  init(message){
    this.message = message;
  },
  
  preload(){
    this.game.stage.backgroundColor = '#0052e7';
  },
  
  create(){
    
    //Background
    this.background = this.game.add.sprite(0,-250,'background');
    this.background.scale.setTo(0.7);
    this.background.inputEnabled = true;
    this.background.events.onInputDown.add(function(){
      this.state.start('GameState');
    }, this);
    
    //Background animation
    var backgroundSlide = this.game.add.tween(this.background);
    backgroundSlide.to({y: '-300'});
    backgroundSlide.start();
    
    //Logo
    this.logo = this.add.sprite(960, 450, 'logo');
    this.logo.anchor.setTo(0.5);
    
    //Logo animation
    var logoGrow = this.game.add.tween(this.logo.scale);
    logoGrow.to({x: '+.6', y: '+.6'});
    logoGrow.start();
    
    //Text styles
    var styleStart = { font: '35px Arial', fill: 'black' };
    var styleEnd = { font: '35px Arial', fill: 'red' };
    
    // Text
    var startText = this.game.add.text(this.game.world.centerX, this.game.world.centerY+140, 'TOUCH TO START', styleStart)
    startText.anchor.setTo(0.5);
    startText.setShadow(2, 2, "#333333", 2, true, true);
    
    if(this.message){
      var gameOverText = this.game.add.text(960, 250, this.message, styleEnd)
      gameOverText.anchor.setTo(0.5);
      this.game.time.events.add(3000, function(){
//        gameOverText.destroy();
      }, this)
    }
  }
}