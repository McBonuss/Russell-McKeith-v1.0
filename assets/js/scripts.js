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
  const buildings = [];
  for (let index = 0; index < 8; index++) {
    const previousBuilding = buildings[index - 1];

    const x = previousBuilding
      ? previousBuilding.x + previousBuilding.width + 4
      : 0;

    const minWidth = 80;
    const maxWidth = 130;
    const width = minWidth + Math.random() * (maxWidth - minWidth);

    const platformWithGorilla = index === 1 || index === 6;

    const minHeight = 40;
    const maxHeight = 300;
    const minHeightGorilla = 30;
    const maxHeightGorilla = 150;

    const height = platformWithGorilla
      ? minHeightGorilla + Math.random() * (maxHeightGorilla - minHeightGorilla)
      : minHeight + Math.random() * (maxHeight - minHeight);

    buildings.push({ x, width, height });
  }
  return buildings;
}

function initializeBombPosition() {
  // TODO: Set initial bomb position based on current player and buildings
}

function draw() {
  const canvas = document.getElementById("game");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  ctx.save();
  // Flip coordinate system upside down
  ctx.translate(0, window.innerHeight);
  ctx.scale(1, -1);

  drawBackground(ctx);
  drawBuildings(ctx);
  drawGorilla(ctx, 1);
  drawGorilla(ctx, 2);
  // drawBomb(ctx);

  ctx.restore();
}

function drawBackground(ctx) {
  ctx.fillStyle = "#58A8D8";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

function drawBuildings(ctx) {
  state.buildings.forEach((building) => {
    ctx.fillStyle = "#152A47";
    ctx.fillRect(building.x, 0, building.width, building.height);
  });
}

function drawGorilla(ctx, player) {
  ctx.save();
  // Get the correct building for each player
  const building =
    player === 1
      ? state.buildings.at[1] // Second building
      : state.buildings.at[-2]; // Second to last building

  
  ctx.translate(
    building.x + building.width / 2,
    building.height
  );

  drawGorillaBody(ctx);
  drawGorillaLeftArm(ctx, player);
  drawGorillaRightArm(ctx, player);
  drawGorillaFace(ctx);

  ctx.restore();
}

function drawGorillaBody(ctx) {
  ctx.fillStyle = "black";
  ctx.beginPath();

  // Starting Position
  ctx.moveTo(0, 15);

  // Left Leg
  ctx.lineTo(-7, 0);
  ctx.lineTo(-20, 0);

  // Main Body
  ctx.lineTo(-13, 77);
  ctx.lineTo(0, 84);
  ctx.lineTo(13, 77);

  // Right Leg
  ctx.lineTo(20, 0);
  ctx.lineTo(7, 0);

  ctx.closePath();
  ctx.fill();
}

function drawGorillaLeftArm(ctx, player) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 18;

  ctx.beginPath();
  ctx.moveTo(-13, 50);

  if (
    (state.phase === "aiming" && state.currentPlayer === 1 && player === 1) ||
    (state.phase === "celebrating" && state.currentPlayer === player)
  ) {
    ctx.quadraticCurveTo(-44, 63, -28, 107);
  } else {
    ctx.quadraticCurveTo(-44, 45, -28, 12);
  }

  ctx.stroke();
}

function drawGorillaRightArm(ctx, player) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 18;

  ctx.beginPath();
  ctx.moveTo(13, 50);

  if (
    (state.phase === "aiming" && state.currentPlayer === 2 && player === 2) ||
    (state.phase === "celebrating" && state.currentPlayer === player)
  ) {
    ctx.quadraticCurveTo(44, 63, 28, 107);
  } else {
    ctx.quadraticCurveTo(44, 45, 28, 12);
  }

  ctx.stroke();
}

function drawGorillaFace(ctx) {
  ctx.strokeStyle = "lightgray";
  ctx.lineWidth = 3;

  ctx.beginPath();

  // Left Eye
  ctx.moveTo(-5, 70);
  ctx.lineTo(-2, 70);

  // Right Eye
  ctx.moveTo(2, 70);
  ctx.lineTo(5, 70);

  // Mouth
  ctx.moveTo(-5, 62);
  ctx.lineTo(5, 62);

  ctx.stroke();
}

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
// function throwBomb() { ... }
// function animate(timestamp) { ... }