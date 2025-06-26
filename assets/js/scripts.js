// The state of the game
let state = {};

// References to HTML elements
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Left info panel
const angle1DOM = document.querySelector("#info-left .angle");
const velocity1DOM = document.querySelector("#info-left .velocity");

// Right info panel
const angle2DOM = document.querySelector("#info-right .angle");
const velocity2DOM = document.querySelector("#info-right .velocity");

// The bomb's grab area
const bombGrabAreaDOM = document.getElementById("bomb-grab-area");
const congratulationsDOM = document.getElementById("congratulations");
const winnerDOM = document.getElementById("winner");
const newGameButtonDOM = document.getElementById("new-game");

// New Game Button
newGameButtonDOM.addEventListener("click", newGame);

// Now call newGame() after all DOM references are set
newGame();

function newGame() {
  // Initialize game state
  state = {
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    phase: "aiming", // aiming | in flight | celebrating
    currentPlayer: 1,
    bomb: {
      x: undefined,
      y: undefined,
      velocity: { x: 0, y: 0 },
    },
    buildings: generateBuildings(),
  };

  calculateScale();

  initializeBombPosition();

  // Reset HTML elements
  congratulationsDOM.style.visibility = "hidden";
  angle1DOM.innerText = 0;
  velocity1DOM.innerText = 0;
  angle2DOM.innerText = 0;
  velocity2DOM.innerText = 0;

  draw();
}

function draw() {
  ctx.save();
  // Flip coordinate system upside down
  ctx.translate(0, canvas.height); // Use canvas.height, not window.innerHeight
  ctx.scale(1, -1);

  // Draw scene
  drawBackground();
  drawBuildings();
  drawGorilla(1);
  drawGorilla(2);
  drawBomb();

  // Restore transformation
  ctx.restore();
}

function calculateScale() {
  const lastBuilding = state.buildings.at(-1);
  const totalWidthOfTheCity = lastBuilding.x + lastBuilding.width;
  const maxBuildingHeight = Math.max(...state.buildings.map((b) => b.height));
  state.scale = Math.min(
    canvas.width / totalWidthOfTheCity,
    canvas.height / (maxBuildingHeight + 200) // 200 for gorilla/trajectory space
  );
  state.offsetX = (canvas.width - totalWidthOfTheCity * state.scale) / 2;
  state.offsetY = (canvas.height - (maxBuildingHeight + 200) * state.scale) / 2;
}

function generateBuildings() {
  const buildings = [];
  for (let index = 0; index < 9; index++) {
    const previousBuilding = buildings[index - 1];

    const x = previousBuilding
      ? previousBuilding.x + previousBuilding.width + 4
      : 0;

    const minWidth = 80;
    const maxWidth = 120;
    const width = minWidth + Math.random() * (maxWidth - minWidth);

    const platformWithGorilla = index === 1 || index === 6;

    const minHeight = 40;
    const maxHeight = 300;
    const minHeightGorilla = 30;
    const maxHeightGorilla = 150;

    const height = platformWithGorilla
      ? minHeightGorilla + Math.random() * (maxHeightGorilla - minHeightGorilla)
      : minHeight + Math.random() * (maxHeight - minHeight);

    // Draw from the bottom: y = 0
    const y = 0;

    buildings.push({ x, y, width, height });
  }
  return buildings;
}

function drawBackground() {
  ctx.fillStyle = "#58A8D8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBuildings() {
  state.buildings.forEach((building) => {
    ctx.fillStyle = "#152A47";
    ctx.fillRect(building.x, building.y, building.width, building.height);
  });
}

function drawGorilla(player) {
  ctx.save();
  const building =
    player === 1
      ? state.buildings.at(1)
      : state.buildings.at(-2);

  // Place gorilla on top of building
  ctx.translate(building.x + building.width / 2, building.y + building.height);

  drawGorillaBody();
  drawGorillaLeftArm(player);
  drawGorillaRightArm(player);
  drawGorillaFace();

  ctx.restore();
}

function drawGorillaBody() {
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

  ctx.fill();
}


function drawGorillaLeftArm(player) {
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

function drawGorillaRightArm(player) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 18;

  ctx.beginPath();
  ctx.moveTo(+13, 50);

  if (
    (state.phase === "aiming" && state.currentPlayer === 2 && player === 2) ||
    (state.phase === "celebrating" && state.currentPlayer === player)
  ) {
    ctx.quadraticCurveTo(+44, 63, +28, 107);
  } else {
    ctx.quadraticCurveTo(+44, 45, +28, 12);
  }

  ctx.stroke();
}

function drawGorillaFace() {
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
function drawBomb() {
  // Draw throwing trajectory
  if (state.phase === "aiming") {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
    ctx.setLineDash([3, 8]);
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(state.bomb.x, state.bomb.y);
    ctx.lineTo(
      state.bomb.x + state.bomb.velocity.x,
      state.bomb.y + state.bomb.velocity.y
    );
    ctx.stroke();
  }

  // Draw circle
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(state.bomb.x, state.bomb.y, 6, 0, 2 * Math.PI);
  ctx.fill();
}

function initializeBombPosition() {
  const building =
    state.currentPlayer === 1
      ? state.buildings.at(1)
      : state.buildings.at(-2);

  const gorillaX = building.x + building.width / 2;
  const gorillaY = building.y + building.height;

  const gorillaHandOffsetX = state.currentPlayer === 1 ? -28 : 28;
  const gorillaHandOffsetY = 107;

  state.bomb.x = gorillaX + gorillaHandOffsetX;
  state.bomb.y = gorillaY + gorillaHandOffsetY;
  state.bomb.velocity.x = 0;
  state.bomb.velocity.y = 0;

  updateBombGrabArea();
}

function updateBombGrabArea() {
  const grabAreaRadius = 100; // or whatever size needed for card

  // Find the gorilla/building for the current player
  const building =
    state.currentPlayer === 1
      ? state.buildings.at(1)
      : state.buildings.at(-2);

  // Gorilla body center: on top of building, offset up by half the gorilla's height
  const gorillaBodyCenterX = building.x + building.width / 2;
  const gorillaBodyCenterY = building.y + building.height + 20; // Adjust 42 as needed

  // Convert to canvas coordinates
  const centerCanvasX = gorillaBodyCenterX * state.scale + (state.offsetX || -2);
  const centerCanvasY = gorillaBodyCenterY * state.scale + (state.offsetY || 80);

  // Flip Y for DOM overlay and center the grab area
  const left = centerCanvasX - grabAreaRadius;
  const top = canvas.height - centerCanvasY - grabAreaRadius;

  bombGrabAreaDOM.style.left = `${left}px`;
  bombGrabAreaDOM.style.top = `${top}px`;
  bombGrabAreaDOM.style.width = `190px`;
  bombGrabAreaDOM.style.height = `190px`;
}

// Event handlers
let isDragging = false;
let dragStartX = undefined;
let dragStartY = undefined;

// Mouse event handlers for the bomb grab area
bombGrabAreaDOM.addEventListener("mousedown", function (e) {
  if (state.phase === "aiming") {
    isDragging = true;

    dragStartX = e.clientX;
    dragStartY = e.clientY;

    document.body.style.cursor = "grabbing";
  }
});

window.addEventListener("mousemove", function (e) {
  if (isDragging) {
    let deltaX = (e.clientX - dragStartX) / state.scale;
    let deltaY = (dragStartY - e.clientY) / state.scale; // Flip y-axis

    state.bomb.velocity.x = -deltaX;
    state.bomb.velocity.y = -deltaY; // Flip y-axis to match canvas
    setInfo(deltaX, deltaY);

    updateBombGrabArea(); // Update grab area position
    draw();
  }
});

window.addEventListener("mouseup", function () {
  if (isDragging) {
    isDragging = false;

    document.body.style.cursor = "default";

    throwBomb();
  }
});

// Used Velocity calculator online to calculate the angle and velocity, also queried with copilot to check the maths
function setInfo(deltaX, deltaY) {
  const hypotenuse = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  const angleInRadians = Math.atan2(-deltaY, deltaX); // Use -deltaY for flipped canvas
  const angleInDegrees = (angleInRadians / Math.PI) * 180;

  if (state.currentPlayer === 1) {
    angle1DOM.innerText = Math.round(angleInDegrees);
    velocity1DOM.innerText = Math.round(hypotenuse);
  } else {
    angle2DOM.innerText = Math.round(angleInDegrees);
    velocity2DOM.innerText = Math.round(hypotenuse);
  }
}

let previousAnimationTimestamp = undefined;

// Function to throw the bomb
function throwBomb() {
  state.phase = "in flight";
  previousAnimationTimestamp = undefined;
  requestAnimationFrame(animate);
}

// Function to move the bomb based on the elapsed time
function moveBomb(elapsedTime) {
  const multiplier = elapsedTime / 200; // Adjust trajectory by gravity

  state.bomb.velocity.y -= 20 * multiplier; // Gravity pulls the bomb downward
  state.bomb.x += state.bomb.velocity.x * multiplier;
  state.bomb.y += state.bomb.velocity.y * multiplier;
}

// Animation loop
function animate(timestamp) {
  if (!previousAnimationTimestamp) {
    previousAnimationTimestamp = timestamp;
    requestAnimationFrame(animate);
    return;
  }

  const elapsedTime = timestamp - previousAnimationTimestamp;

  const hitDetectionPrecision = 10;
  for (let i = 0; i < hitDetectionPrecision; i++) {
    moveBomb(elapsedTime / hitDetectionPrecision); // Hit detection

    const miss = checkFrameHit() || checkBuildingHit();
    const hit = checkGorillaHit();

    // Handle the case when we hit a building or the bomb got off-screen
    if (miss) {
      state.currentPlayer = state.currentPlayer === 1 ? 2 : 1; // Switch players
      state.phase = "aiming";
      initializeBombPosition();
      draw();
      return;
    }

    // Handle the case when we hit the enemy
    if (hit) {
      state.phase = "celebrating";
      announceWinner();
      draw();
      return;
    }
  }

  updateBombGrabArea(); // Update grab area position
  draw();

  // Continue the animation loop
  previousAnimationTimestamp = timestamp;
  requestAnimationFrame(animate);
}

function checkBuildingHit() {
  for (const building of state.buildings) {
    if (
      state.bomb.x >= building.x &&
      state.bomb.x <= building.x + building.width &&
      state.bomb.y >= building.y &&
      state.bomb.y <= building.y + building.height
    ) {
      return true; // Bomb hit a building
    }
  }
  return false;
}

function checkFrameHit() {
  // Out of bounds (left, right, or below ground)
  return (
    state.bomb.x < 0 ||
    state.bomb.x > canvas.width / state.scale ||
    state.bomb.y < 0
  );
}

function checkGorillaHit() {
  const enemyPlayer = state.currentPlayer === 1 ? 2 : 1;
  const enemyBuilding =
    enemyPlayer === 1
      ? state.buildings.at(1) // Second building
      : state.buildings.at(-2); // Second last building

  ctx.save();

  ctx.translate(
    enemyBuilding.x + enemyBuilding.width / 2,
    enemyBuilding.y // <-- FIXED: was enemyBuilding.height
  );

  drawGorillaBody();
  // Check if the bomb circle overlaps the gorilla body
  ctx.save();
  ctx.beginPath();
  ctx.arc(state.bomb.x, state.bomb.y, 6, 0, 2 * Math.PI); // 6 is bomb radius
  ctx.closePath();
  let hit = ctx.isPointInPath(state.bomb.x, state.bomb.y) || ctx.isPointInPath(state.bomb.x + 6, state.bomb.y) || ctx.isPointInPath(state.bomb.x - 6, state.bomb.y) || ctx.isPointInPath(state.bomb.x, state.bomb.y + 6) || ctx.isPointInPath(state.bomb.x, state.bomb.y - 6);
  ctx.restore();

  // For arms, use isPointInStroke with the bomb's circle
  drawGorillaLeftArm(enemyPlayer);
  ctx.save();
  ctx.beginPath();
  ctx.arc(state.bomb.x, state.bomb.y, 6, 0, 2 * Math.PI);
  ctx.closePath();
  hit ||= ctx.isPointInStroke(state.bomb.x, state.bomb.y) || ctx.isPointInStroke(state.bomb.x + 6, state.bomb.y) || ctx.isPointInStroke(state.bomb.x - 6, state.bomb.y) || ctx.isPointInStroke(state.bomb.x, state.bomb.y + 6) || ctx.isPointInStroke(state.bomb.x, state.bomb.y - 6);
  ctx.restore();

  drawGorillaRightArm(enemyPlayer);
  ctx.save();
  ctx.beginPath();
  ctx.arc(state.bomb.x, state.bomb.y, 6, 0, 2 * Math.PI);
  ctx.closePath();
  hit ||= ctx.isPointInStroke(state.bomb.x, state.bomb.y) || ctx.isPointInStroke(state.bomb.x + 6, state.bomb.y) || ctx.isPointInStroke(state.bomb.x - 6, state.bomb.y) || ctx.isPointInStroke(state.bomb.x, state.bomb.y + 6) || ctx.isPointInStroke(state.bomb.x, state.bomb.y - 6);
  ctx.restore();

  ctx.restore();

  return hit;
}

function announceWinner() {
  winnerDOM.innerText = `Player ${state.currentPlayer}`;
  congratulationsDOM.style.visibility = "visible";
  congratulationsDOM.setAttribute('tabindex', '-1');
  congratulationsDOM.focus();
}

function resizeCanvasToContainer() {
  const container = document.querySelector('.game-container');
  if (!container) return;
  const rect = container.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  calculateScale();
  initializeBombPosition();
  draw();
  updateBombGrabArea();
}

// Call this after DOM loaded and after newGame
window.addEventListener('resize', resizeCanvasToContainer);
document.addEventListener('DOMContentLoaded', resizeCanvasToContainer);

function checkOrientation() {
  const rotateMsg = document.getElementById('rotate-message');
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile && window.innerWidth < window.innerHeight) {
    rotateMsg.style.display = 'flex';
  } else {
    rotateMsg.style.display = 'none';
  }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
document.addEventListener('DOMContentLoaded', checkOrientation);

document.addEventListener('keydown', function(e) {
  if (state.phase === "aiming") {
    if (e.key === "ArrowUp") { /* increase angle */ }
    if (e.key === "ArrowDown") { /* decrease angle */ }
    if (e.key === "ArrowLeft") { /* decrease velocity */ }
    if (e.key === "ArrowRight") { /* increase velocity */ }
    if (e.key === " ") { /* throw */ }
  }
});