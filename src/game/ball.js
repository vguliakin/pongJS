const OUT_LEFT = 'OUT_LEFT';
const OUT_RIGHT = 'OUT_RIGHT';

/**
 * Class representing a ball in the game.
 */
export default class Rall {
  /**
   * Create a Ball.
   *
   * @param {Object} options - Options for creating the ball.
   * @param {Number} - The initial x-coord.
   * @param {Number} - The initial y-coord.
   * @param {Number} - The intial horizontal speed.
   * @param {Number} - The initial verical speed.
   * @param {Number} - The width of the ball.
   * @param {Number} - The height of the ball.
   */
  constructor({
    x = 20,
    y = 30,
    xSpeed = 4,
    ySpeed = 2,
    width = 5,
    height = 5,
  }) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.width = width;
    this.height = height;
  }

  /**
   * Initialize the ball's position and speed
   *
   * @param {Number} canvasWidth
   * @param {Number} canvasHeight
   */
  init({ canvasWidth, canvasHeight }) {
    this.x = canvasWidth / 2;
    this.y = 20;

    this.xSpeed = Math.abs(this.xSpeed);
    this.ySpeed = Math.abs(this.ySpeed);
  }

  /**
   * Draw the ball on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  /**
   * Update the ball's position
   *
   * @param {Number} canvasWidth
   * @param {Number} canvasHeight
   * @param {Paddle} leftPaddle
   * @param {Paddle} rightPaddl
   * @returns {string|undefined} Returns OUT_LEFT or OUT_RIGHT if the ball goes out, undefined in other case
   */
  update({ canvasWidth, canvasHeight, leftPaddle, rightPaddle }) {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    [leftPaddle, rightPaddle].forEach((paddle) => {
      if (paddle) {
        this.checkCollision(paddle);
      }
    });

    if (this.x + this.width >= canvasWidth) {
      return OUT_RIGHT;
    }

    if (this.x <= 0) {
      return OUT_LEFT;
    }

    this.handleBoundaryCollision(canvasHeight);

    return undefined;
  }

  /**
   * Handle collisions with the top and bottom boundaties of the canvas.
   *
   * @param {Number} canvasHeight
   */
  handleBoundaryCollision(canvasHeight) {
    if (this.y + this.height >= canvasHeight) {
      this.y = canvasHeight - this.height;
      this.ySpeed = -Math.abs(this.ySpeed);
    }

    if (this.y <= 0) {
      this.y = 0;
      this.ySpeed = Math.abs(this.ySpeed);
    }
  }

  /**
   * Check for collision between the ball and a paddle
   *
   * @param {Paddle} paddle - The paddle to check collision with.
   */
  checkCollision(paddle) {
    const {
      x: paddleX,
      y: paddleY,
      width: paddleWidth,
      height: paddleHeight,
    } = paddle;
    const ballRight = this.x + this.width;
    const ballBottom = this.y + this.height;
    const paddleRight = paddle.x + paddle.width;
    const paddleBottom = paddle.y + paddle.height;

    const isCollision =
      ballRight >= paddleX &&
      this.x <= paddleRight &&
      ballBottom >= paddleY &&
      this.y <= paddleBottom;

    if (isCollision) {
      if (this.xSpeed > 0) {
        this.x = paddleX - this.width;
        this.xSpeed = -Math.abs(this.xSpeed);
      } else {
        this.x = paddleX + paddleWidth;
        this.xSpeed = Math.abs(this.xSpeed);
      }
    }
  }
}
