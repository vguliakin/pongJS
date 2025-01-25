import { Entity } from "./Entity.js";

export default class Ball extends Entity {
  static SIZE = 5;

  constructor() {
    super(0, 0, Ball.SIZE, Ball.SIZE);
    this.init();
  }

  init() {
    this.x = 20;
    this.y = 30;
    this.xSpeed = 4;
    this.ySpeed = 2;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  adjustAngle(distanceFromTop, distanceFromBottom) {
    if (distanceFromTop < 0) {
      this.ySpeed -= 0.5;
    } else if (distanceFromBottom < 0) {
      this.ySpeed += 0.5;
    }
  }

  checkPaddleCollision(paddle, xSpeedAfterBounce) {
    let ballBox = this.boundingBox();
    let paddleBox = paddle.boundingBox();

    let collisionOccured =
      ballBox.left < paddleBox.right &&
      ballBox.right > paddleBox.left &&
      ballBox.top < paddleBox.bottom &&
      ballBox.bottom > paddleBox.top;

    if (collisionOccured) {
      let distanceFromTop = ballBox.top - paddleBox.top;
      let distanceFromBottom = paddleBox.bottom - ballBox.bottom;

      this.adjustAngle(distanceFromTop, distanceFromBottom);
      this.xSpeed = xSpeedAfterBounce;
    }
  }

  checkWallCollision(width, height, scores) {
    let ballBox = this.boundingBox();

    if (ballBox.left < 0) {
      scores.rightScore++;
      this.init();
    }
    if (ballBox.right > width) {
      scores.leftScore++;
      this.init();
    }

    if (ballBox.top < 0 || ballBox.bottom > height) {
      this.ySpeed = -this.ySpeed;
    }
  }
}
