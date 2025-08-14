const Gameboard = require('./Gameboard.js');

test('place ship correctly', () => {
  const gameboard = Gameboard();
  const ship = gameboard.placeShip(3, [0, 0]);
  expect(gameboard.board[0][0]).toBe(ship);
  expect(gameboard.board[0][1]).toBe(ship);
  expect(gameboard.board[0][2]).toBe(ship);
});

test('receive attack hits ship', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(2, [0, 0]);
  expect(gameboard.receiveAttack(0, 0)).toBe(true);
});

test('receive attack misses', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(2, [0, 0]);
  expect(gameboard.receiveAttack(5, 5)).toBe(false);
  expect(gameboard.missedShots).toContainEqual([5, 5]);
});

test('all ships sunk returns true when all ships sunk', () => {
  const gameboard = Gameboard();
  const ship = gameboard.placeShip(2, [0, 0]);
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(1, 0);
  expect(ship.isSunk()).toBe(true);
  expect(gameboard.allShipsSunk()).toBe(true);
});
