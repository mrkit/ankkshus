var game = new Phaser.Game(1920, 900, Phaser.AUTO, 'game');

game.state.add('GameState', GameState);
game.state.add('HomeState', HomeState);
game.state.add('PreloadState', PreloadState);
game.state.add('BootState', BootState);
game.state.add('GameOverState', GameOverState);
game.state.add('YouWonState', YouWonState);
game.state.start('BootState');