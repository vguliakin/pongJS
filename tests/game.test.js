import Game from "../src/game/game.js";


jest.mock("../src/game/pongRenderer.js", () => {
  return jest.fn().mockImplementation(() => ({
    drawGame: jest.fn(),
    clear: jest.fn(),
    drawScore: jest.fn()
  }));
});

describe("The Game Class", () => {
  it("increments left score when ball bounce the right boundary", () => {
    const game = new Game(100, 100);
    game.ball.x = 101;

    game.update();

    expect(game.leftScore).toBe(1);
    expect(game.rightScore).toBe(0);
  });

  it("increments right score when ball bounce the left boundary", () => {
    const game = new Game(100, 100);
    game.ball.x = -5;

    game.update();

    expect(game.leftScore).toBe(0);
    expect(game.rightScore).toBe(1);
  });

  it("resets ball when bounce the right boundary", () => {
    const game = new Game(100, 100);
    game.ball.x = 101;

    game.update();

    expect(game.ball.x).toBe(50);
  });

  it("resets ball when bounce the left boundary", () => {
    const game = new Game(100, 100);
    game.ball.xSpeed = -5
    game.ball.x = -2;

    game.update();

    expect(game.ball.x).toBe(50);
  });

  it("finishes the game when right player scores a certain number of points", () => {
    const game = new Game(100, 100);
    game.rightScore = 10;

    game.update();

    expect(game.isGameOver).toBe(true);
  }); 

  it("finishes the game when left player scores a certain number of points", () => {
    const game = new Game(100, 100);
    game.leftScore = 10;

    game.update();

    expect(game.isGameOver).toBe(true);
  }); 

  
});
