et canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

const MAX_COMPUTER_SPEED = 2;

// BALL
const BALL_SIZE = 4;
let ballPositions;
let xSpeed;
let ySpeed;

// PADDLE
const PADDLE_WIDTH = 5;
const PADDLE_HEIGHT = 20;
const PADDLE_OFFSET = 10;

let leftPaddleTop = 10;
let rightPaddleTop = 30;

// Score
let leftScore = 0;
let rightScore = 0;
let gameOver = false;
let winner;

function initBall() {
  ballPositions = { x: 100, y: 20 };

  xSpeed = 4;
  ySpeed = 2;
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "white";
  ctx.fillRect(ballPositions.x, ballPositions.y, BALL_SIZE, BALL_SIZE);

  ctx.fillRect(PADDLE_OFFSET, leftPaddleTop, PADDLE_WIDTH, PADDLE_HEIGHT);

  ctx.fillRect(
    width - PADDLE_WIDTH - PADDLE_OFFSET,
    rightPaddleTop,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
  );

  ctx.font = "30px monospace";
  ctx.textAlign = "left";
  ctx.fillText(leftScore.toString(), 50, 50);
  ctx.textAlign = "right";
  ctx.fillText(rightScore.toString(), width - 50, 50);
}

function followBall() {
  let ball = {
    top: ballPositions.y,
    bottom: ballPositions.y + BALL_SIZE,
  };

  let leftPaddle = {
    top: leftPaddleTop,
    bottom: leftPaddleTop + PADDLE_HEIGHT,
  };

  if (ball.top < leftPaddleTop) {
    leftPaddleTop -= MAX_COMPUTER_SPEED;
  } else if (ball.bottom > leftPaddle.bottom) {
    leftPaddleTop += MAX_COMPUTER_SPEED;
  }
}

function update() {
  ballPositions.x += xSpeed;
  ballPositions.y += ySpeed;

  followBall();
}

function checkCollision() {
  let ball = {
    left: ballPositions.x,
    right: ballPositions.x + BALL_SIZE,
    top: ballPositions.y,
    bottom: ballPositions.y + BALL_SIZE,
  };

  let leftPaddle = {
    left: PADDLE_OFFSET,
    right: PADDLE_OFFSET + PADDLE_WIDTH,
    top: leftPaddleTop,
    bottom: leftPaddleTop + PADDLE_HEIGHT,
  };

  let rightPaddle = {
    left: width - PADDLE_OFFSET - PADDLE_WIDTH,
    right: width - PADDLE_OFFSET,
    top: rightPaddleTop,
    bottom: rightPaddleTop + PADDLE_HEIGHT,
  };

  if (rightScore > 9) {
    gameOver = true;
    winner = "Player 2";
  } else if (leftScore > 9) {
    gameOver = true;
    winner = "Player 1";
  }

  if (checkPaddleCollision(ball, leftPaddle)) {
    let distanceFromTop = ball.top - leftPaddle.top;
    let distanceFromBottom = leftPaddle.bottom - ball.bottom;

    adjustAngle(distanceFromTop, distanceFromBottom);

    xSpeed = Math.abs(xSpeed);
  }

  if (checkPaddleCollision(ball, rightPaddle)) {
    let distanceFromTop = ball.top - rightPaddle.top;
    let distanceFromBottom = rightPaddle.bottom - ball.bottom;

    adjustAngle(distanceFromTop, distanceFromBottom);

    xSpeed = -Math.abs(xSpeed);
  }

  if (ball.left < 0) {
    rightScore++;
    initBall();
  }

  if (ball.right > width) {
    leftScore++;
    initBall();
  }

  if (ball.top < 0 || ball.bottom > height) {
    ySpeed = -ySpeed;
  }
}

function checkPaddleCollision(ball, paddle) {
  return (
    ball.left < paddle.right &&
    ball.right > paddle.left &&
    ball.top < paddle.bottom &&
    ball.bottom > paddle.top
  );
}

function adjustAngle(distanceFromTop, distanceFromBottom) {
  if (distanceFromTop < 0) {
    ySpeed -= 0.5;
  } else if (distanceFromBottom < 0) {
    ySpeed += 0.5;
  }
}

document.addEventListener("mousemove", (e) => {
  rightPaddleTop = e.y - canvas.offsetTop;
});

function drawGameOver() {
  ctx.fillStyle = "white";
  ctx.font = "50px monospace";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", width / 2, height / 2);
  ctx.font = "30px monospace";
  ctx.fillText(`${winner} won`, width / 2, height / 2 + 50);
}

function gameLoop() {
  draw();
  update();
  checkCollision();

  if (gameOver) {
    draw();
    drawGameOver();
  } else {
    setTimeout(gameLoop, 30);
  }
}

initBall();
gameLoop();
