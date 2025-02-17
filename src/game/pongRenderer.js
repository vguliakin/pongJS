/**
 * Class representing a Render for drawing game elements on a canvas.
 */
export default class Renderer {
  /** @type {HTMLCanvasElement} */
  #canvas;
  /** @type {CanvasRenderingContext2D} */
  #ctx;

  /**
   * Create a Renderer.
   *
   * @param {string} canvas - The ID of the canvas element.
   * @param {number} width
   * @param {number} height
   */
  constructor({ canvasId = 'canvas', width = 450, height = 500 }) {
    this.#canvas = document.getElementById(canvasId);
    this.#ctx = this.#canvas.getContext('2d');
    this.width = width;
    this.height = height;
  }

  /**
   * Draws the canvas background.
   *
   * @param {string} color
   */
  drawCanvas({ color = 'black' }) {
    this.#ctx.fillStyle = color;
    this.#ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   * Clears the canvas.
   *
   */
  clear() {
    this.#ctx.fillStyle = 'black';
    this.#ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   * Draws the score on the canvas.
   *
   * @param {number} fontSize
   * @param {string} fontStyle
   * @param {number} score
   * @param {number} x
   * @param {number} y
   */
  drawScore({ fontSize = 32, fontStyle = 'monospace', score = 0, x, y }) {
    this.#ctx.font = `${fontSize}px ${fontStyle}`;
    // TODO: text-align
    this.#ctx.fillText(score, x, y);
  }

  /**
   * Draws a gameover text at the center of the canvas.
   *
   * @param {number} fontSize
   * @param {string} fontStyle
   */
  drawGameOver({ fontSize = 48, fontStyle = 'monospace' }) {
    this.#ctx.font = `${fontSize}px ${fontStyle}`;
    this.#ctx.textAlign = 'center';
    this.#ctx.fillText(
      `GAMEOVER`,
      this.#canvas.width / 2,
      this.#canvas.height / 2,
    );
  }

  /**
   * Draws the game elemtns by clearing the canvas.
   *
   * @param {...Object} elements - the game elements to draw. Each element must have a draw method.
   */
  drawGame(...elements) {
    this.clear();

    elements.forEach((elem) => {
      elem.draw(this.#ctx);
    });
  }
}
