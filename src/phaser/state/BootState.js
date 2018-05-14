var BootState = {
  
  init(){
    
    //game initiation functions in boot state
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHoritontally = true;
    this.scale.pageAlignVertically = true;
    
    //physics system initiation
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;
    
  },
  
  preload(){
    this.game.load.image('preloadBar', '../../assets/images/luci/preloadBar.png');
  },
  
  create(){
    this.game.stage.backgroundColor = '#ffffff';
    this.state.start('PreloadState');
  }
};