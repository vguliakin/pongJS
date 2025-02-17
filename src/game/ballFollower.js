/**
 * Class representing a Ball Follower that moves a paddle to follow a ball.
 */
export default class BallFollower {
  /**
   * Create a BallFollower.
   *
   * @param {Ball} ball
   * @param {Paddle} paddle
   * @param {Number} speed
   * @param {Number} canvasHeight
   */
  constructor({ ball, paddle, speed = 5, canvasHeight }) {
    this.ball = ball;
    this.paddle = paddle;
    this.speed = speed;
    this.canvasHeight = canvasHeight;
  }

  /**
   * Update the left paddle's vertical position so that it follows the ball.
   *
   * @param {Number} deltaTime - The time delta to scale the paddle movement
   */
  followBall(deltaTime = 1) {
    const movement = this.speed * deltaTime;
    const distance = Math.abs(this.ball.y - this.paddle.y);

    if (distance <= movement) {
      this.paddle.y = this.ball.y;
    } else if (this.ball.y < this.paddle.y) {
      this.paddle.y -= movement;
    } else if (this.ball.y > this.paddle.y) {
      this.paddle.y += movement;
    }

    // Keep the paddle's position within the canvas bondaries.
    this.paddle.y = Math.max(
      0,
      Math.min(this.paddle.y, this.canvasHeight - this.paddle.height),
    );
  }
}
