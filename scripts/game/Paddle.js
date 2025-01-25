import { Entity } from "./Entity.js";

export class Paddle extends Entity {
  static WIDTH = 5;
  static HEIGHT = 20;
  static OFFSET = 10;

  constructor(x, y) {
    super(x, y, Paddle.WIDTH, Paddle.HEIGHT);
  }
}
