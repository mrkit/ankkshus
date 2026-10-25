import { Game } from './game.js';
import { TitleScene } from './scenes/title.js';

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const game = new Game(canvas);
game.setScene(new TitleScene(game));
game.start();

// Exposed for debugging from the console.
window.luciGame = game;
