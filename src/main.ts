import Game from "./classes/Game";
import Interface from "./classes/Interface";

import "./style.css";

const game = new Game(7);

game.init();

const gameInterface = new Interface(game);
