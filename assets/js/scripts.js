// --- Constants ---
const LEFT_GORILLA_INDEX = 1;
const RIGHT_GORILLA_INDEX = -3; // 6th building from the left is the right gorilla's building
const GORILLA_BODY_CENTER_Y = 50; // Y offset for the gorilla's body center (from feet)
const GORILLA_BODY_RADIUS = 50;   // Radius of the gorilla's body hitbox
const BOMB_RADIUS = 10;           // Radius of the bomb

// --- State ---
let state = {};

// --- DOM References ---
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const angle1DOM = document.querySelector("#info-left .angle");
const velocity1DOM = document.querySelector("#info-left .velocity");
const angle2DOM = document.querySelector("#info-right .angle");
const velocity2DOM = document.querySelector("#info-right .velocity");
const bombGrabAreaDOM = document.getElementById("bomb-grab-area");
const congratulationsDOM = document.getElementById("congratulations");
const winnerDOM = document.getElementById("winner");
const newGameButtonDOM = document.getElementById("new-game");

canvas.style.touchAction = "none";

// --- Initialization ---
newGameButtonDOM.addEventListener("click", newGame);
window.addEventListener('resize', resizeCanvasToContainer);
document.addEventListener('DOMContentLoaded', () => {
  newGame();
  resizeCanvasToContainer();
  checkOrientation();
});
window.addEventListener('orientationchange', checkOrientation);
window.addEventListener('resize', checkOrientation);

function newGame() {
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
  congratulationsDOM.style.visibility = "hidden";
  angle1DOM.innerText = 0;
  velocity1DOM.innerText = 0;
  angle2DOM.innerText = 0;
  velocity2DOM.innerText = 0;
  draw();
}

// --- Utility Functions ---
function getGorillaBuilding(player) {
  return player === 1
    ? state.buildings.at(LEFT_GORILLA_INDEX)
    : state.buildings.at(RIGHT_GORILLA_INDEX);
}

function getGorillaOrigin(player) {
  const building = getGorillaBuilding(player);
  return {
    x: building.x + building.width / 2,
    y: building.y + building.height
  };
}

function getBombLocalCoords(targetPlayer) {
  const origin = getGorillaOrigin(targetPlayer);
  return {
    x: state.bomb.x - origin.x,
    y: state.bomb.y - origin.y
  };
}

// --- Drawing Functions ---
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawBuildings();
  drawGorilla(1);
  drawGorilla(2);
  drawBomb();
}

function drawBackground() {
  ctx.fillStyle = "#58A8D8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBuildings() {
  state.buildings.forEach((building) => {
    ctx.fillStyle = "#152A47";
    // Draw from bottom up (canvas Y=0 is top, so subtract from canvas.height)
    ctx.fillRect(
      building.x * state.scale + state.offsetX,
      canvas.height - (building.height * state.scale + state.offsetY),
      building.width * state.scale,
      building.height * state.scale
    );
  });
}

function drawGorilla(player) {
  ctx.save();
  const { x, y } = getGorillaOrigin(player);
  // Convert to canvas coordinates
  const cx = x * state.scale + state.offsetX;
  const cy = canvas.height - (y * state.scale + state.offsetY);
  ctx.translate(cx, cy);
  drawGorillaBody();
  drawGorillaLeftArm(player);
  drawGorillaRightArm(player);
  drawGorillaFace();

  // Debug: Draw hitbox
  ctx.beginPath();
  ctx.arc(0, -GORILLA_BODY_CENTER_Y * state.scale, GORILLA_BODY_RADIUS * state.scale, 0, 2 * Math.PI);
  ctx.strokeStyle = "lime";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

function drawGorillaBody() {
  ctx.fillStyle = "black";
  ctx.beginPath();
  // Adjusted polygon to better fit the visible gorilla
  ctx.moveTo(0, -20 * state.scale);
  ctx.lineTo(-12 * state.scale, 0);
  ctx.lineTo(-22 * state.scale, 10 * state.scale);
  ctx.lineTo(-18 * state.scale, -70 * state.scale);
  ctx.lineTo(0, -95 * state.scale);
  ctx.lineTo(18 * state.scale, -70 * state.scale);
  ctx.lineTo(22 * state.scale, 10 * state.scale);
  ctx.lineTo(12 * state.scale, 0);
  ctx.closePath();
  ctx.fill();
}

function drawGorillaLeftArm(player) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 18 * state.scale;
  ctx.beginPath();
  ctx.moveTo(-13 * state.scale, -50 * state.scale);
  if (
    (state.phase === "aiming" && state.currentPlayer === 1 && player === 1) ||
    (state.phase === "celebrating" && state.currentPlayer === player)
  ) {
    ctx.quadraticCurveTo(-44 * state.scale, -63 * state.scale, -28 * state.scale, -107 * state.scale);
  } else {
    ctx.quadraticCurveTo(-44 * state.scale, -45 * state.scale, -28 * state.scale, -12 * state.scale);
  }
  ctx.stroke();
}

function drawGorillaRightArm(player) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 18 * state.scale;
  ctx.beginPath();
  ctx.moveTo(13 * state.scale, -50 * state.scale);
  if (
    (state.phase === "aiming" && state.currentPlayer === 2 && player === 2) ||
    (state.phase === "celebrating" && state.currentPlayer === player)
  ) {
    ctx.quadraticCurveTo(44 * state.scale, -63 * state.scale, 28 * state.scale, -107 * state.scale);
  } else {
    ctx.quadraticCurveTo(44 * state.scale, -45 * state.scale, 28 * state.scale, -12 * state.scale);
  }
  ctx.stroke();
}

function drawGorillaFace() {
  ctx.strokeStyle = "lightgray";
  ctx.lineWidth = 3 * state.scale;
  ctx.beginPath();
  ctx.moveTo(-5 * state.scale, -70 * state.scale); ctx.lineTo(-2 * state.scale, -70 * state.scale); // Left Eye
  ctx.moveTo(2 * state.scale, -70 * state.scale); ctx.lineTo(5 * state.scale, -70 * state.scale);   // Right Eye
  ctx.moveTo(-5 * state.scale, -62 * state.scale); ctx.lineTo(5 * state.scale, -62 * state.scale);  // Mouth
  ctx.stroke();
}

function drawBomb() {
  ctx.save();
  // Convert bomb to canvas coordinates
  const bx = state.bomb.x * state.scale + state.offsetX;
  const by = canvas.height - (state.bomb.y * state.scale + state.offsetY);

  if (state.phase === "aiming") {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.setLineDash([3, 8]);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(
      bx + state.bomb.velocity.x * state.scale,
      by - state.bomb.velocity.y * state.scale
    );
    ctx.stroke();
    ctx.setLineDash([]);
  }
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(bx, by, BOMB_RADIUS * state.scale, 0, 2 * Math.PI);
  ctx.fill();

  // Debug: bomb center
  ctx.beginPath();
  ctx.arc(bx, by, 2, 0, 2 * Math.PI);
  ctx.fillStyle = "lime";
  ctx.fill();
  ctx.restore();
}

// --- Game Logic ---
function calculateScale() {
  const lastBuilding = state.buildings.at(-1);
  const totalWidthOfTheCity = lastBuilding.x + lastBuilding.width;
  const maxBuildingHeight = Math.max(...state.buildings.map((b) => b.height));
  state.scale = Math.min(
    canvas.width / totalWidthOfTheCity,
    canvas.height / (maxBuildingHeight + 200)
  );
  state.offsetX = (canvas.width - totalWidthOfTheCity * state.scale) / 2;
  state.offsetY = 0; // No vertical offset needed, since we draw from bottom up
}

function generateBuildings() {
  const buildings = [];
  for (let index = 0; index < 9; index++) {
    const previousBuilding = buildings[index - 1];
    const x = previousBuilding
      ? previousBuilding.x + previousBuilding.width + 4
      : 0;
    const minWidth = 80, maxWidth = 120;
    const width = minWidth + Math.random() * (maxWidth - minWidth);
    const platformWithGorilla = index === 1 || index === 6;
    const minHeight = 40, maxHeight = 300;
    const minHeightGorilla = 30, maxHeightGorilla = 150;
    const height = platformWithGorilla
      ? minHeightGorilla + Math.random() * (maxHeightGorilla - minHeightGorilla)
      : minHeight + Math.random() * (maxHeight - minHeight);
    const y = 0;
    buildings.push({ x, y, width, height });
  }
  return buildings;
}

function initializeBombPosition() {
  const building = getGorillaBuilding(state.currentPlayer);
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
  const grabAreaRadius = 80 * state.scale;
  const building = getGorillaBuilding(state.currentPlayer);
  const gorillaBodyCenterX = building.x + building.width / 2;
  const gorillaBodyCenterY = building.y + building.height + GORILLA_BODY_CENTER_Y;
  const centerCanvasX = gorillaBodyCenterX * state.scale + (state.offsetX || 0);
  const centerCanvasY = canvas.height - (gorillaBodyCenterY * state.scale + (state.offsetY || 0));
  const left = centerCanvasX - grabAreaRadius;
  const top = centerCanvasY - grabAreaRadius;
  bombGrabAreaDOM.style.left = `${left}px`;
  bombGrabAreaDOM.style.top = `${top}px`;
  bombGrabAreaDOM.style.width = `${grabAreaRadius * 2}px`;
  bombGrabAreaDOM.style.height = `${grabAreaRadius * 2}px`;
}

// --- Event Handlers ---
let isDragging = false;
let dragStartX, dragStartY;

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
    let deltaY = (dragStartY - e.clientY) / state.scale;
    state.bomb.velocity.x = -deltaX;
    state.bomb.velocity.y = -deltaY;
    setInfo(deltaX, deltaY);
    updateBombGrabArea();
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

function setInfo(deltaX, deltaY) {
  const hypotenuse = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  const angleInRadians = Math.atan2(-deltaY, deltaX);
  const angleInDegrees = (angleInRadians / Math.PI) * 180;
  if (state.currentPlayer === 1) {
    angle1DOM.innerText = Math.round(angleInDegrees);
    velocity1DOM.innerText = Math.round(hypotenuse);
  } else {
    angle2DOM.innerText = Math.round(angleInDegrees);
    velocity2DOM.innerText = Math.round(hypotenuse);
  }
}

// --- Bomb Flight ---
let previousAnimationTimestamp = undefined;

function throwBomb() {
  state.phase = "in flight";
  previousAnimationTimestamp = undefined;
  requestAnimationFrame(animate);
}

function moveBomb(elapsedTime) {
  const multiplier = elapsedTime / 200;
  state.bomb.velocity.y -= 20 * multiplier;
  state.bomb.x += state.bomb.velocity.x * multiplier;
  state.bomb.y += state.bomb.velocity.y * multiplier;
}

function animate(timestamp) {
  if (!previousAnimationTimestamp) {
    previousAnimationTimestamp = timestamp;
    requestAnimationFrame(animate);
    return;
  }
  const elapsedTime = timestamp - previousAnimationTimestamp;
  const hitDetectionPrecision = 50;
  for (let i = 0; i < hitDetectionPrecision; i++) {
    moveBomb(elapsedTime / hitDetectionPrecision);

    // 1) check for frame-out first
    if (checkFrameHit()) {
      state.currentPlayer = 3 - state.currentPlayer; // swap 1⇄2
      state.phase = "aiming";
      initializeBombPosition();
      draw();
      return;
    }

    // 2) check whether we actually hit the enemy gorilla
    if (checkGorillaHit()) {
      state.phase = "celebrating";
      announceWinner();
      draw();
      return;
    }

    // 3) only now check for building hits (skipping the enemy’s building)
    if (checkBuildingHit(3 - state.currentPlayer)) {
      state.currentPlayer = 3 - state.currentPlayer;
      state.phase = "aiming";
      initializeBombPosition();
      draw();
      return;
    }
  }
  updateBombGrabArea();
  draw();
  previousAnimationTimestamp = timestamp;
  requestAnimationFrame(animate);
}

function checkBuildingHit(skipPlayer = null) {
  return state.buildings.some((building, idx) => {
    // skip the building under the given player
    if (skipPlayer === 1 && idx === LEFT_GORILLA_INDEX)  return false;
    if (skipPlayer === 2 && idx === RIGHT_GORILLA_INDEX) return false;

    return (
      state.bomb.x >= building.x &&
      state.bomb.x <= building.x + building.width &&
      state.bomb.y >= building.y &&
      state.bomb.y <= building.y + building.height
    );
  });
}

function checkFrameHit() {
  return (
    state.bomb.x < 0 ||
    state.bomb.x > canvas.width / state.scale ||
    state.bomb.y < 0
  );
}

function checkGorillaHit() {
  const enemyPlayer = state.currentPlayer === 1 ? 2 : 1;
  const { x: gorillaOriginX, y: gorillaOriginY } = getGorillaOrigin(enemyPlayer);
  // Convert to canvas coordinates
  const cx = gorillaOriginX * state.scale + state.offsetX;
  const cy = canvas.height - (gorillaOriginY * state.scale + state.offsetY);
  // Bomb in canvas coordinates
  const bx = state.bomb.x * state.scale + state.offsetX;
  const by = canvas.height - (state.bomb.y * state.scale + state.offsetY);
  // Local to gorilla
  const bombLocalX = bx - cx;
  const bombLocalY = by - cy;

  ctx.save();
  ctx.translate(cx, cy);

  // Draw body path for hit detection
  drawGorillaBody();

  // Check the bomb's center and 8 points around its edge for body
  let hit = false;
  for (let a = 0; a < 2 * Math.PI; a += Math.PI / 4) {
    const px = bombLocalX + BOMB_RADIUS * state.scale * Math.cos(a);
    const py = bombLocalY + BOMB_RADIUS * state.scale * Math.sin(a);
    if (ctx.isPointInPath(px, py)) {
      hit = true;
      break;
    }
  }

  // Check left arm (stroke)
  if (!hit) {
    drawGorillaLeftArm(enemyPlayer);
    for (let a = 0; a < 2 * Math.PI; a += Math.PI / 4) {
      const px = bombLocalX + BOMB_RADIUS * state.scale * Math.cos(a);
      const py = bombLocalY + BOMB_RADIUS * state.scale * Math.sin(a);
      if (ctx.isPointInStroke(px, py)) {
        hit = true;
        break;
      }
    }
  }

  // Check right arm (stroke)
  if (!hit) {
    drawGorillaRightArm(enemyPlayer);
    for (let a = 0; a < 2 * Math.PI; a += Math.PI / 4) {
      const px = bombLocalX + BOMB_RADIUS * state.scale * Math.cos(a);
      const py = bombLocalY + BOMB_RADIUS * state.scale * Math.sin(a);
      if (ctx.isPointInStroke(px, py)) {
        hit = true;
        break;
      }
    }
  }

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

function checkOrientation() {
  const rotateMsg = document.getElementById('rotate-message');
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile && window.innerWidth < window.innerHeight) {
    rotateMsg.style.display = 'flex';
  } else {
    rotateMsg.style.display = 'none';
  }
}

// --- Keyboard Controls (optional, for accessibility) ---
document.addEventListener('keydown', function (e) {
  if (state.phase === "aiming") {
    // Implement keyboard aiming/throwing if desired
  }
});