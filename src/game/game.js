import Renderer from './pongRenderer.js';
import Ball from './ball.js';
import Paddle from './paddle.js';
import BallFollower from './ballFollower.js';

/**
 * Class representing a Game.
 * Creates all game objects on the canvas and handles the game logic.
 */
export default class Game {
  /**
   *
   * @param {Number} width - The Canvas width.
   * @param {Number} height - The Canvas height.
   */
  constructor(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;

    this.renderer = new Renderer({ width: width, height: height });
    this.ball = new Ball({
      x: 20,
      y: 30,
      xSpeed: 4,
      ySpeed: 2,
      width: 5,
      height: 5,
    });
    this.leftPaddle = new Paddle({
      x: 20,
      y: height / 2 - 30,
      width: 10,
      height: 30,
    });
    this.rightPaddle = new Paddle({
      x: width - 20,
      y: height / 2 - 130,
      width: 10,
      height: 30,
    });

    this.ballFollower = new BallFollower({
      ball: this.ball,
      paddle: this.leftPaddle,
      canvasHeight: this.canvasHeight,
    });

    this.ball.init({
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
    });

    this.leftScore = 0;
    this.rightScore = 0;
    this.scoreToWin = 10;

    this.isGameOver = false;
  }

  /**
   * Update the game state.
   * Updates the ball's position and checks for score changes.
   */
  update() {
    const result = this.ball.update({
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
      leftPaddle: this.leftPaddle,
      rightPaddle: this.rightPaddle,
    });

    this.handleScore(result);
    this.checkWinScore();
  }

  /**
   * Resets the ball position.
   */
  resetBall() {
    this.ball.init({
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
    });
  }

  /**
   * Handles the scoring logic when the ball goes out of bounds
   *
   * @param {string} result - The result of the ball update
   */
  handleScore(result) {
    if (result === 'OUT_RIGHT') {
      this.leftScore++;
      this.resetBall();
    } else if (result === 'OUT_LEFT') {
      this.rightScore++;
      this.resetBall();
    }
  }

  /**
   * Checks if the game is over.
   */
  checkWinScore() {
    if (
      this.leftScore >= this.scoreToWin ||
      this.rightScore >= this.scoreToWin
    ) {
      this.isGameOver = true;
    }
  }

  /**
   * The main game loop.
   */
  loop() {
    if (this.isGameOver) {
      this.renderer.drawGameOver({});
      return;
    }

    this.renderer.clear();
    this.update();
    this.ballFollower.followBall();
    this.renderer.drawGame(this.ball, this.leftPaddle, this.rightPaddle);
    this.renderer.drawScore({ score: this.leftScore, x: 50, y: 50 });
    this.renderer.drawScore({
      score: this.rightScore,
      x: this.canvasWidth - 50,
      y: 50,
    });

    setTimeout(() => this.loop(), 30);
  }
}
