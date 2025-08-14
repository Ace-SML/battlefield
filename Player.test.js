const Player = require('./Player');
const Gameboard = require('./Gameboard');

jest.mock('./Gameboard'); // Mock Gameboard to avoid dependency complexity

describe('Player Factory', () => {
  let mockEnemyBoard;

  beforeEach(() => {
    mockEnemyBoard = { receiveAttack: jest.fn() };
    Gameboard.mockReturnValue({ receiveAttack: jest.fn() });
  });

  test('creates a human player with attack method', () => {
    const player = Player('human');
    expect(player.type).toBe('human');
    expect(player.attack).toBeDefined();
    expect(player.randomAttack).toBeUndefined();
  });

  test('creates a computer player with randomAttack method', () => {
    const player = Player('computer');
    expect(player.type).toBe('computer');
    expect(player.randomAttack).toBeDefined();
    expect(player.attack).toBeUndefined();
  });

  test('human player can attack enemy board', () => {
    const player = Player('human');
    player.attack(mockEnemyBoard, 3, 5);
    expect(mockEnemyBoard.receiveAttack).toHaveBeenCalledWith(3, 5);
  });

  test('computer player randomAttack calls enemyBoard.receiveAttack', () => {
    const player = Player('computer');
    const move = player.randomAttack(mockEnemyBoard);
    expect(mockEnemyBoard.receiveAttack).toHaveBeenCalledWith(move.x, move.y);
    expect(move.x).toBeGreaterThanOrEqual(0);
    expect(move.x).toBeLessThan(10);
    expect(move.y).toBeGreaterThanOrEqual(0);
    expect(move.y).toBeLessThan(10);
  });

  test('computer player does not repeat random moves', () => {
    const player = Player('computer');
    const moves = new Set();

    for (let i = 0; i < 50; i++) {
      const move = player.randomAttack(mockEnemyBoard);
      const key = `${move.x},${move.y}`;
      expect(moves.has(key)).toBe(false);
      moves.add(key);
    }
  });
});
