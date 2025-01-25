import { GameView } from "./GameView.js";
import { Computer } from "./Computer.js";
import Ball from "./Ball.js";
import { Paddle } from "./Paddle.js";
import { Scores } from "./Scores.js";

export default class Game {
  constructor() {
    this.gameView = new GameView();
    this.ball = new Ball();
    this.leftPaddle = new Paddle(Paddle.OFFSET, 10);
    this.rightPaddle = new Paddle(
      this.gameView.width - Paddle.OFFSET - Paddle.WIDTH,
      30,
    );
    this.scores = new Scores();
    this.gameOver = false;

    document.addEventListener("mousemove", (e) => {
      this.rightPaddle.y = e.y - this.gameView.offsetTop;
    });
  }

  draw() {
    this.gameView.draw(this.ball, this.leftPaddle, this.rightPaddle);

    this.gameView.drawScores(this.scores);
  }

  checkCollision() {
    this.ball.checkPaddleCollision(this.leftPaddle, Math.abs(this.ball.xSpeed));
    this.ball.checkPaddleCollision(
      this.rightPaddle,
      -Math.abs(this.ball.xSpeed),
    );

    this.ball.checkWallCollision(
      this.gameView.width,
      this.gameView.height,
      this.scores,
    );

    if (this.scores.leftScore > 9 || this.scores.rightScore > 9) {
      this.gameOver = true;
    }
  }

  update() {
    this.ball.update();
    Computer.followBall(this.leftPaddle, this.ball);
  }

  loop() {
    this.draw();
    this.update();
    this.checkCollision();

    if (this.gameOver) {
      this.draw();
      this.gameView.drawGameOver();
    } else {
      setTimeout(() => this.loop(), 30);
    }
  }
}
