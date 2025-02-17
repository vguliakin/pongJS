import Game from './game/game.js';
import InputHandler from './game/inputHandler.js';

const game = new Game(500, 500);
const inputHandler = new InputHandler(game);

inputHandler.init();
game.loop();
