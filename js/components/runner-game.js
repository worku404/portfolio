/* Pure 2D Arcade Runner Engine (Exact Match to RunnerGame.tsx) */
export function initRunnerGame() {
  const canvas = document.getElementById('game-canvas');
  const container = document.getElementById('game-container');
  const scoreEl = document.getElementById('game-score');
  const bestEl = document.getElementById('game-best');
  const startOverlay = document.getElementById('game-overlay-start');
  const overOverlay = document.getElementById('game-overlay-over');
  const startBtn = document.getElementById('start-game-btn');
  const replayBtn = document.getElementById('replay-game-btn');
  const finalScoreVal = document.getElementById('final-score-val');

  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');
  const GAME_WIDTH = 1040;
  const GAME_HEIGHT = 320;
  const GROUND_Y = 220;
  const PLAYER_SIZE = 40;
  const PLAYER_START_X = 70;
  const PLAYER_START_Y = GROUND_Y - PLAYER_SIZE;
  const BEST_SCORE_KEY = 'bestScore';
  const JUMP_BUFFER_MS = 140;
  const COYOTE_TIME_MS = 80;

  let score = 0;
  let bestScore = parseInt(localStorage.getItem(BEST_SCORE_KEY) || '0');
  let gameStarted = false;
  let isGameOver = false;
  let animId = null;
  let gameSpeed = 5;

  let jumpBufferedUntil = 0;
  let lastGroundedAt = performance.now();

  bestEl.textContent = bestScore;

  const player = {
    x: PLAYER_START_X,
    y: PLAYER_START_Y,
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    dy: 0,
    jumpStrength: -13.5,
    gravity: 0.72,
    isJumping: false,
  };

  let obstacles = [];

  function focusGameFrame() {
    container.focus();
  }

  function performJump() {
    player.dy = player.jumpStrength;
    player.isJumping = true;
    jumpBufferedUntil = 0;
  }

  function resetGame() {
    score = 0;
    gameSpeed = 5;
    isGameOver = false;
    gameStarted = true;
    player.y = PLAYER_START_Y;
    player.dy = 0;
    player.isJumping = false;
    obstacles = [];
    jumpBufferedUntil = 0;
    lastGroundedAt = performance.now();

    scoreEl.textContent = '0';
    startOverlay.classList.add('hidden');
    overOverlay.classList.add('hidden');
    focusGameFrame();
  }

  function queueJump() {
    const now = performance.now();
    jumpBufferedUntil = now + JUMP_BUFFER_MS;

    if (!player.isJumping || now - lastGroundedAt <= COYOTE_TIME_MS) {
      performJump();
    }
  }

  function triggerGameAction() {
    if (isGameOver || !gameStarted) {
      resetGame();
    } else {
      queueJump();
    }
  }

  function spawnObstacle() {
    const height = Math.random() * 40 + 30;
    obstacles.push({
      x: GAME_WIDTH,
      width: 30,
      height,
      speed: gameSpeed + Math.random() * 2,
    });
  }

  function update() {
    if (!gameStarted || isGameOver) return;

    const now = performance.now();

    player.dy += player.gravity;
    player.y += player.dy;

    if (player.y > PLAYER_START_Y) {
      player.y = PLAYER_START_Y;
      player.dy = 0;
      player.isJumping = false;
      lastGroundedAt = now;
    }

    if (!player.isJumping && jumpBufferedUntil > now) {
      performJump();
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      const obs = obstacles[i];
      obs.x -= obs.speed;

      // AABB Bounding Box Collision
      if (
        player.x < obs.x + obs.width &&
        player.x + player.width > obs.x &&
        player.y < GROUND_Y &&
        player.y + player.height > GROUND_Y - obs.height
      ) {
        isGameOver = true;
        bestScore = Math.max(score, bestScore);
        localStorage.setItem(BEST_SCORE_KEY, bestScore.toString());
        bestEl.textContent = bestScore;
        finalScoreVal.textContent = score;
        overOverlay.classList.remove('hidden');
      }

      if (obs.x + obs.width < 0) {
        obstacles.splice(i, 1);
        score += 1;
        scoreEl.textContent = score;
        gameSpeed += 0.1;
      }
    }

    if (Math.random() < 0.02) {
      if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < GAME_WIDTH - 320) {
        spawnObstacle();
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Ground Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(GAME_WIDTH, GROUND_Y);
    ctx.stroke();

    // Player Box (#00f2ff with neon glow)
    ctx.fillStyle = '#00f2ff';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00f2ff';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Obstacles (#ff4d4d with neon glow)
    ctx.fillStyle = '#ff4d4d';
    ctx.shadowColor = '#ff4d4d';
    obstacles.forEach((obs) => {
      ctx.fillRect(obs.x, GROUND_Y - obs.height, obs.width, obs.height);
    });

    ctx.shadowBlur = 0;
  }

  function loop() {
    update();
    draw();
    animId = requestAnimationFrame(loop);
  }

  // Pointer Down listener on Canvas (focuses frame and triggers jump/restart)
  canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    focusGameFrame();
    triggerGameAction();
  });

  startBtn.addEventListener('click', resetGame);
  replayBtn.addEventListener('click', resetGame);

  // Global Keyboard Listener (Space / W / ArrowUp)
  window.addEventListener('keydown', (e) => {
    if (['Space', 'KeyW', 'ArrowUp'].includes(e.code)) {
      const activeElement = document.activeElement;
      const isGameActive =
        activeElement === document.body ||
        (activeElement instanceof Node && container.contains(activeElement));

      if (!isGameActive) return;

      e.preventDefault();
      triggerGameAction();
    }
  });

  loop();
}
