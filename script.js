// Canvas and context setup
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 400;

// Game objects
const paddleWidth = 10;
const paddleHeight = 80;
const ballSize = 7;

let gameRunning = false;

// Paddle object
const leftPaddle = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    maxSpeed: 6
};

const rightPaddle = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    maxSpeed: 5
};

// Ball object
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 5,
    dy: 5,
    radius: ballSize,
    speed: 5,
    maxSpeed: 8
};

// Score
let playerScore = 0;
let computerScore = 0;

// Input handling
const keys = {};
let mouseY = canvas.height / 2;

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseY = e.clientY - rect.top;
});

// Button handlers
document.getElementById('startBtn').addEventListener('click', () => {
    if (!gameRunning) {
        gameRunning = true;
        resetBall();
        gameLoop();
    }
});

document.getElementById('resetBtn').addEventListener('click', () => {
    gameRunning = false;
    playerScore = 0;
    computerScore = 0;
    updateScore();
    resetGame();
});

// Update score display
function updateScore() {
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
}

// Reset ball to center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * 5;
    ball.dy = (Math.random() - 0.5) * 6;
}

// Reset game state
function resetGame() {
    leftPaddle.y = canvas.height / 2 - paddleHeight / 2;
    rightPaddle.y = canvas.height / 2 - paddleHeight / 2;
    resetBall();
}

// Update player paddle (left) - mouse and arrow keys
function updateLeftPaddle() {
    if (keys['ArrowUp'] || keys['w'] || keys['W']) {
        leftPaddle.dy = -leftPaddle.maxSpeed;
    } else if (keys['ArrowDown'] || keys['s'] || keys['S']) {
        leftPaddle.dy = leftPaddle.maxSpeed;
    } else {
        // Move towards mouse Y
        const paddleCenter = leftPaddle.y + leftPaddle.height / 2;
        if (mouseY < paddleCenter - 5) {
            leftPaddle.dy = -leftPaddle.maxSpeed;
        } else if (mouseY > paddleCenter + 5) {
            leftPaddle.dy = leftPaddle.maxSpeed;
        } else {
            leftPaddle.dy = 0;
        }
    }

    leftPaddle.y += leftPaddle.dy;

    // Boundary collision
    if (leftPaddle.y < 0) {
        leftPaddle.y = 0;
    }
    if (leftPaddle.y + leftPaddle.height > canvas.height) {
        leftPaddle.y = canvas.height - leftPaddle.height;
    }
}

// Update computer paddle (right) - AI
function updateRightPaddle() {
    const paddleCenter = rightPaddle.y + rightPaddle.height / 2;
    const difficulty = 0.04; // Adjust for difficulty (0.03 = hard, 0.05 = easy)

    // AI tries to hit the ball center
    if (Math.abs(ball.y - paddleCenter) > 15) {
        if (ball.y < paddleCenter) {
            rightPaddle.dy = -rightPaddle.maxSpeed * difficulty;
        } else {
            rightPaddle.dy = rightPaddle.maxSpeed * difficulty;
        }
    } else {
        rightPaddle.dy *= 0.8; // Smooth deceleration
    }

    rightPaddle.y += rightPaddle.dy;

    // Boundary collision
    if (rightPaddle.y < 0) {
        rightPaddle.y = 0;
    }
    if (rightPaddle.y + rightPaddle.height > canvas.height) {
        rightPaddle.y = canvas.height - rightPaddle.height;
    }
}

// Update ball position
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Top and bottom wall collision
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy *= -1;
        ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y));
    }

    // Left paddle collision
    if (
        ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
        ball.y > leftPaddle.y &&
        ball.y < leftPaddle.y + leftPaddle.height &&
        ball.dx < 0
    ) {
        ball.dx *= -1;
        ball.x = leftPaddle.x + leftPaddle.width + ball.radius;
        
        // Add spin based on paddle movement
        const collidePoint = ball.y - (leftPaddle.y + leftPaddle.height / 2);
        ball.dy = (collidePoint / (leftPaddle.height / 2)) * 5;
        
        // Increase ball speed gradually
        if (Math.abs(ball.dx) < ball.maxSpeed) {
            ball.dx *= 1.05;
        }
        if (Math.abs(ball.dy) < ball.maxSpeed) {
            ball.dy *= 1.02;
        }
    }

    // Right paddle collision
    if (
        ball.x + ball.radius > rightPaddle.x &&
        ball.y > rightPaddle.y &&
        ball.y < rightPaddle.y + rightPaddle.height &&
        ball.dx > 0
    ) {
        ball.dx *= -1;
        ball.x = rightPaddle.x - ball.radius;
        
        // Add spin based on paddle movement
        const collidePoint = ball.y - (rightPaddle.y + rightPaddle.height / 2);
        ball.dy = (collidePoint / (rightPaddle.height / 2)) * 5;
        
        // Increase ball speed gradually
        if (Math.abs(ball.dx) < ball.maxSpeed) {
            ball.dx *= 1.05;
        }
        if (Math.abs(ball.dy) < ball.maxSpeed) {
            ball.dy *= 1.02;
        }
    }

    // Score points
    if (ball.x < 0) {
        computerScore++;
        updateScore();
        resetBall();
    }
    if (ball.x > canvas.width) {
        playerScore++;
        updateScore();
        resetBall();
    }
}

// Draw functions
function drawPaddle(paddle) {
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.shadowColor = 'rgba(0, 255, 136, 0.5)';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
    ctx.fillStyle = '#ff00ff';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = 'rgba(255, 0, 255, 0.5)';
    ctx.shadowBlur = 15;
    ctx.strokeStyle = '#ff00ff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.shadowBlur = 0;
}

function drawCenter() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw center line
    drawCenter();

    // Draw paddles and ball
    drawPaddle(leftPaddle);
    drawPaddle(rightPaddle);
    drawBall();
}

// Main game loop
function gameLoop() {
    if (!gameRunning) return;

    updateLeftPaddle();
    updateRightPaddle();
    updateBall();
    draw();

    requestAnimationFrame(gameLoop);
}

// Initial draw
draw();
updateScore();
