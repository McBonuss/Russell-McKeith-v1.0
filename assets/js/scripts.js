// --- Constants ---
const GORILLA_BODY_CENTER_Y = 50;    // Y offset for the gorilla's body center (from feet)
const GORILLA_BODY_RADIUS = 50;      // Radius of the gorilla's body hitbox
const BOMB_RADIUS = 10;              // Radius of the bomb
const DEBUG = true;
let debugSamples = [];

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
window.addEventListener("resize", resizeCanvasToContainer);
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
document.addEventListener("DOMContentLoaded", () => {
  newGame();
  resizeCanvasToContainer();
  checkOrientation();
});

// --- New Game ---
function newGame() {
  state = {
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    phase: "aiming",       // aiming | in flight | celebrating
    currentPlayer: 1,
    bomb: { x: 0, y: 0, velocity: { x: 0, y: 0 } },
    buildings: generateBuildings(),
  };
  calculateScale();
  initializeBombPosition();
  hideCongrats();
  resetInfoDisplays();
  draw();
}

// --- Utility ---
function getGorillaBuilding(player) {
  // Player 1 on second building, Player 2 on seventh (one to the right)
  const idx = player === 1 ? 1 : state.buildings.length - 2;
  return state.buildings[idx];
}

function getGorillaOrigin(player) {
  const b = getGorillaBuilding(player);
  return { x: b.x + b.width / 2, y: b.y + b.height };
}

// --- Drawing ---


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawBuildings();
  drawGorilla(1);
  drawGorilla(2);
  drawBomb();
}

function drawBackground() {
  // Sky gradient
  let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#90d0f0');
  gradient.addColorStop(1, '#3180c5');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Sun
  let sunX = canvas.width - 100;
  let sunY = 100;
  let sunRadius = 40;
  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunRadius, 0, 2 * Math.PI);
  ctx.fillStyle = 'yellow';
  ctx.shadowColor = 'yellow';
  ctx.shadowBlur = 40;
  ctx.fill();
  ctx.globalAlpha = 1.0;
  ctx.restore();
}

function drawBuildings() {
  state.buildings.forEach(b => {
    // Building body
    ctx.fillStyle = '#24384c';
    ctx.fillRect(
      b.x * state.scale + state.offsetX,
      canvas.height - (b.height * state.scale + state.offsetY),
      b.width * state.scale,
      b.height * state.scale
    );

    // Windows
    const winRows = Math.floor(b.height / 30);
    const winCols = Math.floor(b.width / 22);
    for (let row = 0; row < winRows; row++) {
      for (let col = 0; col < winCols; col++) {
        if (Math.random() < 0.75) {
          ctx.fillStyle = Math.random() < 0.85 ? '#f6f6a7' : '#bcd9ee';
          ctx.fillRect(
            b.x * state.scale + state.offsetX + 5 + col * 18,
            canvas.height - (b.height * state.scale + state.offsetY) + 6 + row * 22,
            12,
            10
          );
        }
      }
    }

    // Rooftop antenna for random buildings
    if (Math.random() < 0.25) {
      ctx.beginPath();
      ctx.moveTo(
        (b.x + b.width / 2) * state.scale + state.offsetX,
        canvas.height - (b.height * state.scale + state.offsetY)
      );
      ctx.lineTo(
        (b.x + b.width / 2) * state.scale + state.offsetX,
        canvas.height - (b.height * state.scale + state.offsetY) - 16
      );
      ctx.strokeStyle = '#b7b7b7';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  });
}

function drawGorilla(player) {
  ctx.save();
  const { x, y } = getGorillaOrigin(player);
  const cx = x * state.scale + state.offsetX;
  const cy = canvas.height - (y * state.scale + state.offsetY);
  ctx.translate(cx, cy);
  drawGorillaBody();
  drawGorillaLeftArm(player);
  drawGorillaRightArm(player);
  drawGorillaFace();
  ctx.restore();
}

function drawGorillaBody() {
  ctx.fillStyle = 'black';
  ctx.beginPath();
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
  // Left arm is up only if Player 1 is aiming or if celebrating and this player won
  const raising =
    (state.phase === 'aiming' && state.currentPlayer === 1 && player === 1) ||
    (state.phase === 'celebrating' && state.currentPlayer === player);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 18 * state.scale;
  ctx.beginPath();
  ctx.moveTo(-13 * state.scale, -50 * state.scale);
  ctx.quadraticCurveTo(
    -44 * state.scale,
    -(raising ? 63 : 45) * state.scale,
    -28 * state.scale,
    -(raising ? 107 : 12) * state.scale
  );
  ctx.stroke();
}

function drawGorillaRightArm(player) {
  // Right arm is up only if Player 2 is aiming or if celebrating and this player won
  const raising =
    (state.phase === 'aiming' && state.currentPlayer === 2 && player === 2) ||
    (state.phase === 'celebrating' && state.currentPlayer === player);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 18 * state.scale;
  ctx.beginPath();
  ctx.moveTo(13 * state.scale, -50 * state.scale);
  ctx.quadraticCurveTo(
    44 * state.scale,
    -(raising ? 63 : 45) * state.scale,
    28 * state.scale,
    -(raising ? 107 : 12) * state.scale
  );
  ctx.stroke();
}

function drawGorillaFace() {
  ctx.strokeStyle = 'lightgray';
  ctx.lineWidth = 3 * state.scale;
  ctx.beginPath();
  ctx.moveTo(-5 * state.scale, -70 * state.scale);
  ctx.lineTo(-2 * state.scale, -70 * state.scale);
  ctx.moveTo(2 * state.scale, -70 * state.scale);
  ctx.lineTo(5 * state.scale, -70 * state.scale);
  ctx.moveTo(-5 * state.scale, -62 * state.scale);
  ctx.lineTo(5 * state.scale, -62 * state.scale);
  ctx.stroke();
}

function drawBomb() {
  ctx.save();
  const bx = state.bomb.x * state.scale + state.offsetX;
  const by = canvas.height - (state.bomb.y * state.scale + state.offsetY);

  if (state.phase === 'aiming') {
    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    ctx.setLineDash([3,8]);
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

  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(bx, by, BOMB_RADIUS * state.scale, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
}

// --- Layout & Scaling ---
function calculateScale() {
  const last = state.buildings[state.buildings.length - 1];
  const totalW = last.x + last.width;
  const maxH   = Math.max(...state.buildings.map(b => b.height));
  state.scale   = Math.min(canvas.width / totalW, canvas.height / (maxH + 200));
  state.offsetX = (canvas.width - totalW * state.scale) / 2;
  state.offsetY = 0;
}

function generateBuildings() {
  const arr = [];
  for (let i = 0; i < 9; i++) {
    const prev = arr[i - 1];
    const x    = prev ? prev.x + prev.width + 4 : 0;
    const w    = 80 + Math.random() * 40;
    const plat = (i === 1 || i === 6);
    const h    = plat ? 30 + Math.random() * 120 : 40 + Math.random() * 260;
    arr.push({ x, y: 0, width: w, height: h });
  }
  return arr;
}

// --- Bomb & Grab Area Setup ---
function initializeBombPosition() {
  const b = getGorillaBuilding(state.currentPlayer);
  const offset = state.currentPlayer === 1 ? -28 : 28;
  state.bomb.x = b.x + b.width / 2 + offset;
  state.bomb.y = b.y + b.height + 107;
  state.bomb.velocity = { x: 0, y: 0 };
  updateBombGrabArea();
}

function updateBombGrabArea() {
  const r = 80 * state.scale;
  const b = getGorillaBuilding(state.currentPlayer);
  const cx = (b.x + b.width / 2) * state.scale + state.offsetX;
  const cy = canvas.height - ((b.y + b.height + GORILLA_BODY_CENTER_Y) * state.scale + state.offsetY);
  bombGrabAreaDOM.style.left   = `${cx - r}px`;
  bombGrabAreaDOM.style.top    = `${cy - r}px`;
  bombGrabAreaDOM.style.width  = `${r * 2}px`;
  bombGrabAreaDOM.style.height = `${r * 2}px`;
}

// --- Input Handling ---
let isDragging = false, startX, startY;

bombGrabAreaDOM.addEventListener('mousedown', e => {
  if (state.phase === 'aiming') {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    document.body.style.cursor = 'grabbing';
  }
});

window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const dx = (e.clientX - startX) / state.scale;
  const dy = (startY - e.clientY) / state.scale;
  state.bomb.velocity.x = -dx;
  state.bomb.velocity.y = -dy;
  updateInfo(dx, dy);
  updateBombGrabArea();
  draw();
});

window.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  document.body.style.cursor = 'default';
  throwBomb();
});

function updateInfo(dx, dy) {
  const speed = Math.hypot(dx, dy);
  const angle = Math.atan2(-dy, dx) * 180 / Math.PI;
  if (state.currentPlayer === 1) {
    angle1DOM.innerText    = Math.round(angle);
    velocity1DOM.innerText = Math.round(speed);
  } else {
    angle2DOM.innerText    = Math.round(angle);
    velocity2DOM.innerText = Math.round(speed);
  }
}

function resetInfoDisplays() {
  angle1DOM.innerText = 0;
  velocity1DOM.innerText = 0;
  angle2DOM.innerText = 0;
  velocity2DOM.innerText = 0;
}

function hideCongrats() {
  congratulationsDOM.style.visibility = 'hidden';
}

// --- Simulation & Collision ---
let lastTs = null;

function throwBomb() {
  state.phase = 'in flight';
  lastTs = null;
  requestAnimationFrame(animate);
}

function moveBomb(dt) {
  const m = dt / 200;
  state.bomb.velocity.y -= 20 * m;
  state.bomb.x += state.bomb.velocity.x * m;
  state.bomb.y += state.bomb.velocity.y * m;
}

function animate(ts) {
  if (lastTs === null) {
    lastTs = ts;
    requestAnimationFrame(animate);
    return;
  }

  const dt = ts - lastTs;
  const steps = 50;
  const enemy = 3 - state.currentPlayer;

  for (let i = 0; i < steps; i++) {
    moveBomb(dt / steps);

    if (checkFrameHit())   return handleMiss();
    if (checkGorillaHit()) return handleHit();
    if (checkBuildingHit(enemy)) return handleMiss();
  }

  updateBombGrabArea();
  draw();
  if (DEBUG) drawDebugDots();
  lastTs = ts;
  requestAnimationFrame(animate);
}

function handleMiss() {
  state.currentPlayer = 3 - state.currentPlayer;
  state.phase = 'aiming';
  initializeBombPosition();
  draw();
}

function handleHit() {
  state.phase = 'celebrating';
  announceWinner();
  draw();
}

function checkFrameHit() {
  return (
    state.bomb.x < 0 ||
    state.bomb.x > canvas.width / state.scale ||
    state.bomb.y < 0
  );
}

function checkBuildingHit(skipPlayer) {
  const skipB = getGorillaBuilding(skipPlayer);
  return state.buildings.some(b =>
    b !== skipB &&
    state.bomb.x >= b.x && state.bomb.x <= b.x + b.width &&
    state.bomb.y >= b.y && state.bomb.y <= b.y + b.height
  );
}

function checkGorillaHit() {
  const enemy = 3 - state.currentPlayer;
  const { x: ox, y: oy } = getGorillaOrigin(enemy);
  // Compute distance in *game units* (not canvas coords!)
  const dx = state.bomb.x - ox;
  const dy = state.bomb.y - (oy + GORILLA_BODY_CENTER_Y);
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist <= GORILLA_BODY_RADIUS + BOMB_RADIUS) {
    return true;
  }
  return false;
}


// --- UI Helpers ---
function announceWinner() {
  winnerDOM.innerText = `Player ${state.currentPlayer}`;
  congratulationsDOM.style.visibility = 'visible';
  congratulationsDOM.setAttribute('tabindex','-1');
  congratulationsDOM.focus();
}

function resizeCanvasToContainer() {
  const container = document.querySelector('.game-container');
  if (!container) return;
  const rect = container.getBoundingClientRect();
  canvas.width  = rect.width;
  canvas.height = rect.height;
  calculateScale();
  initializeBombPosition();
  draw();
  updateBombGrabArea();
}


function checkOrientation() {
  const msg = document.getElementById('rotate-message');
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  msg.style.display = (isMobile && window.innerWidth < window.innerHeight) ? 'flex' : 'none';
}

// Add this function at the end of your file:
function drawDebugDots() {
  ctx.save();
  debugSamples.forEach(({ x, y, hit }) => {
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = hit ? 'red' : 'blue';
    ctx.globalAlpha = 0.7;
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  ctx.restore();
}