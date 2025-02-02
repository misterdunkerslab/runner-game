console.log("Game script loaded successfully!");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game Variables
let player = { x: 50, y: 150, width: 30, height: 30, velocityY: 0, gravity: 0.5, jumpStrength: -10 };
let obstacles = [];
let isJumping = false;
let gameSpeed = 3;
let score = 0;

// Handle Jump
document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !isJumping) {
        player.velocityY = player.jumpStrength;
        isJumping = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
        isJumping = false;
    }
});

// Generate Obstacles
function spawnObstacle() {
    let height = 30 + Math.random() * 20;
    obstacles.push({ x: canvas.width, y: canvas.height - height, width: 20, height: height });
    setTimeout(spawnObstacle, 2000);
}
spawnObstacle();

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Player Physics
    player.velocityY += player.gravity;
    player.y += player.velocityY;
    if (player.y > canvas.height - player.height) {
        player.y = canvas.height - player.height;
        player.velocityY = 0;
    }

    // Draw Player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Move & Draw Obstacles
    ctx.fillStyle = "red";
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= gameSpeed;
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);

        // Collision Detection
        if (
            player.x < obstacles[i].x + obstacles[i].width &&
            player.x + player.width > obstacles[i].x &&
            player.y + player.height > obstacles[i].y
        ) {
            alert("Game Over! Your score: " + score);
            document.location.reload();
        }
    }

    // Increase Score
    score++;
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 10, 20);

    requestAnimationFrame(gameLoop);
}

gameLoop();
