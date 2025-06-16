// The state of the game
let state = {};

// Start a new game on load
newGame();

function newGame() {
  // Initialize game state
  state = {
    phase: "aiming", // aiming | in flight | celebrating
    currentPlayer: 1,
    bomb: {
      x: undefined,
      y: undefined,
      velocity: { x: 0, y: 0 },
    },
    buildings: generateBuildings(),
  };

  initializeBombPosition();
  draw();
}

function generateBuildings() {
  // TODO: Implement building generation logic
  return [];
}

function initializeBombPosition() {
  // TODO: Set initial bomb position based on current player and buildings
}

function draw() {
  // Get the canvas element and its drawing context
  const canvas = document.getElementById("game");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  // Example: Draw a quadratic curve
  ctx.strokeStyle = "#58A8D8";
  ctx.lineWidth = 30;
  ctx.beginPath();
  ctx.moveTo(200, 300);
  ctx.quadraticCurveTo(500, 400, 800, 300);
  ctx.stroke();

  // Set the background color
  ctx.fillStyle = "#58A8D8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // filled polygon
  ctx.fillStyle = "#58A8D8";
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(500, 350);
  ctx.lineTo(200, 500);
  ctx.closePath();
  ctx.fill();

  // stroked polygon
  ctx.strokeStyle = "#58A8D8";
  ctx.lineWidth = 30;
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(500, 350);
  ctx.lineTo(200, 500);
  ctx.closePath();
  ctx.stroke();



  // TODO: Draw buildings, bomb, and other game elements
}

// Event handlers (to be implemented)
// function throwBomb() { ... }
// function animate(timestamp) { ... }