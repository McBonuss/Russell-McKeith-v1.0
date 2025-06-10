// filepath: vscode-copilot-workspace://8309a7fa-dda0-431e-8c35-c7b243e6aac8/raylibjs-game/raylibjs-game/src/index.js
// This file serves as the entry point for the application. It imports the Script.js file and starts the game loop.

import { main } from './Script.js';
import './raylib/raylib.js';

window.onload = () => {
    main();
};