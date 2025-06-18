const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;

let buildings = [];
let playerIndex = 0;
let gorillas = [];
let banana = null;
let gameOver = false;

// Generate cityscape
function generateBuildings() {
  const buildings = [];
  for (let index = 0; index < 8; index++) {
    const previousBuilding = buildings[index - 1];

    const x = previousBuilding
      ? previousBuilding.x + previousBuilding.w + 4
      : 0;

    const minWidth = 80;
    const maxWidth = 130;
    const w = minWidth + Math.random() * (maxWidth - minWidth);

    const platformWithGorilla = index === 1 || index === 6;

    const minHeight = 40;
    const maxHeight = 300;
    const minHeightGorilla = 30;
    const maxHeightGorilla = 150;

    const h = platformWithGorilla
      ? minHeightGorilla + Math.random() * (maxHeightGorilla - minHeightGorilla)
      : minHeight + Math.random() * (maxHeight - minHeight);

    // Y coordinate should be from the bottom of the canvas
    const y = canvas.height - h;

    buildings.push({ x, w, y, h });
  }
  return buildings;
}


// Draw background and buildings
function drawScene() {
state.buildings.forEach((building) => {
    ctx.fillStyle = "#152A47";
    ctx.fillRect(building.x, 0, building.width, building.height);
  });
}

// Place gorillas
function placeGorillas() {
  gorillas = [];
  [1, 6].forEach((i) => {
    const b = buildings[i];
    gorillas.push({
      x: b.x + b.w / 2,
      y: b.y - 10,
      radius: 10,
      buildingIndex: i,
    });
  });
}

// Draw gorillas
function drawGorillas() {
  gorillas.forEach((g) => {
    ctx.fillStyle = "brown";
    ctx.beginPath();
    ctx.arc(g.x, g.y, g.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Throw banana
function throwBanana(angle, velocity) {
  const g = gorillas[playerIndex];
  const rad = (angle * Math.PI) / 180;
  banana = {
    x: g.x,
    y: g.y,
    vx: velocity * Math.cos(rad),
    vy: -velocity * Math.sin(rad),
    t: 0,
    startX: g.x,
    startY: g.y,
  };
}

// Animate banana
function animateBanana() {
  if (!banana) return;

  banana.t += 0.1;
  banana.x = banana.startX + banana.vx * banana.t;
  banana.y =
    banana.startY + banana.vy * banana.t + 0.5 * 9.81 * banana.t * banana.t;

  draw();

  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(banana.x, banana.y, 5, 0, Math.PI * 2);
  ctx.fill();

  if (
    banana.x < 0 ||
    banana.x > canvas.width ||
    banana.y > canvas.height ||
    checkCollision(banana)
  ) {
    banana = null;
    playerIndex = 1 - playerIndex;
  } else {
    requestAnimationFrame(animateBanana);
  }
}

// Check for hits
function checkCollision(b) {
  for (let g of gorillas) {
    const dx = b.x - g.x;
    const dy = b.y - g.y;
    if (Math.sqrt(dx * dx + dy * dy) < g.radius + 5) {
      gameOver = true;
      alert("Gorilla hit! Player " + (playerIndex + 1) + " wins!");
      return true;
    }
  }

  for (let bld of buildings) {
    if (
      b.x > bld.x &&
      b.x < bld.x + bld.w &&
      b.y > bld.y &&
      b.y < bld.y + bld.h
    ) {
      return true;
    }
  }

  return false;
}

// Redraw everything
function draw() {
  drawScene();
  drawGorillas();
}

// Launch with click
canvas.addEventListener("click", (e) => {
  if (gameOver || banana) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const g = gorillas[playerIndex];
  const dx = mouseX - g.x;
  const dy = g.y - mouseY;

  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  const velocity = Math.sqrt(dx * dx + dy * dy) / 5;

  throwBanana(angle, velocity);
  animateBanana();
});

// Start game
function startGame() {
  buildings = generateBuildings();
  placeGorillas();
  draw();
}

startGame();
