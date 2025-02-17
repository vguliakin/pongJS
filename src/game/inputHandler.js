/**
 * Class representing a Input Handler.
 * Handles the input conrol
 */
export default class InputHandler {
  constructor(game) {
    this.game = game;
  }

  /**
   * Initializes an event listeners for keyboard and mouse control.
   * - On 'keydown', it delegates to handleKeyDown().
   * - On 'mousemove', it updates the right paddle's vertical position based on the mouse
   */
  init() {
    document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    document.addEventListener(
      'mousemove',
      (event) => (this.game.rightPaddle.y = event.offsetY),
    );
  }

  /**
   * Handles keydown events to change the vertical position of the right paddle.
   *
   * @param {KeyboardEvent} event
   */
  handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
        this.game.rightPaddle.moveUp();
        break;
      case 'ArrowDown':
        this.game.rightPaddle.moveDown();
        break;
    }
  }
}
