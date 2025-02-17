import Paddle from "../src/game/paddle.js";
import Ball from "../src/game/ball.js";
import BallFollower from "../src/game/ballFollower.js";


describe("The Paddle Class", () => {
  it("Placed the paddle at initialization", () => {
    const paddle = new Paddle({x: 95, y: 40});
  });

  it("The Left Player moves up when the ball is above him", () => {
    const paddle = new Paddle({ x: 5, y: 100, height: 10});
    const ball = new Ball({ x: 30, y: 40});
    const ballFollower = new BallFollower({ball: ball, paddle: paddle, canvasHeight: 100, speed: 10});

    ballFollower.followBall();

    expect(paddle.y).toBe(90);
  });

});