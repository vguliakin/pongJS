/**
 * Class representing a Paddle
 */
export default class Paddle {
  /**
   * Creates a Paddle
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  constructor({ x, y, width, height }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * Draw the object on the canvas
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveUp() {
    this.y -= 10;
  }

  moveDown() {
    this.y += 10;
  }
}
