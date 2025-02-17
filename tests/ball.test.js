import Ball from "../src/game/ball.js";
import Paddle from "../src/game/paddle.js";


describe("The Ball class", () => {

  it("changing the location of ball when it updates", () => {
    const ball = new Ball({ x: 20, y: 30, xSpeed: 5, ySpeed: 3 });

    ball.update({});

    expect(ball.x).toBe(25);
    expect(ball.y).toBe(33);
  });

  it("bounce off the bottom boundary", () => {
    const ball = new Ball({ x: 50, y: 95, ySpeed: 5, height: 10 });

    ball.update({ canvasWidth: 100, canvasHeight: 100 });

    expect(ball.y).toBe(90);
    expect(ball.ySpeed).toBe(-5);
  });

  it("bounce off the top boundary", () => {
    const ball = new Ball({ x: 50, y: 0, ySpeed: -3, height: 5 });

    ball.update({ canvasWidth: 100, canvasHeight: 100 });

    expect(ball.y).toBe(0);
    expect(ball.ySpeed).toBe(3);
  });

  describe("The Paddle collision", () => {
    it("reverses direction when colliding with the right paddle", () => {
      const ball = new Ball({
        x: 90,
        y: 45,
        xSpeed: 5,
        ySpeed: 0,
        width: 5,
        height: 5,
      });
      const paddle = new Paddle({
        x: 95,
        y: 50,
        width: 10,
        height: 30,
      });

      ball.update({ canvasWidth: 100, canvasHeight: 100, rightPaddle: paddle });

      expect(ball.x).toBe(paddle.x - ball.width);
      expect(ball.xSpeed).toBeLessThan(0);
    });

    it("reverses direction when colliding with the left paddle", () => {
      const ball = new Ball({
        x: 10,
        y: 45,
        xSpeed: -5,
        ySpeed: 0,
        width: 5,
        height: 5,
      });
      const paddle = new Paddle({
        x: 5,
        y: 50,
        width: 10,
        height: 30,
      });

      ball.update({ canvasWidth: 100, canvasHeight: 100, leftPaddle: paddle });

      expect(ball.x).toBe(paddle.x + paddle.width);
      expect(ball.xSpeed).toBeGreaterThan(0);
    });

    it("checks collision for left and right paddle", () => {
      const checkCollision = jest.spyOn(Ball.prototype, "checkCollision");

      const ball = new Ball({
        x: 10,
        y: 45,
        xSpeed: -5,
        ySpeed: 0,
        width: 5,
        height: 5,
      });
      const leftPaddle = new Paddle({
        x: 5,
        y: 50,
        width: 10,
        height: 30,
      });

      const rightPaddle = new Paddle({
        x: 95,
        y: 50,
        width: 10,
        height: 30,
      });

      ball.update({ canvasHeight: 100, canvasWidth: 100, leftPaddle: leftPaddle, rightPaddle: rightPaddle });

      expect(checkCollision).toHaveBeenCalledTimes(2);
      expect(checkCollision).toHaveBeenCalledWith(leftPaddle);
      expect(checkCollision).toHaveBeenCalledWith(rightPaddle);

      checkCollision.mockRestore();
    });
  });
});
