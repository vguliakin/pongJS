export class Computer {
  static followBall(paddle, ball) {
    const MAX_SPEED = 2;

    let ballBox = ball.boundingBox();
    let paddleBox = paddle.boundingBox();

    if (ballBox.top < paddleBox.top) {
      paddle.y -= MAX_SPEED;
    } else if (ballBox.bottom > paddleBox.bottom) {
      paddle.y += MAX_SPEED;
    }
  }
}
