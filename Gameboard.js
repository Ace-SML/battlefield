const Ship = require ('./Ship.js');

function Gameboard() {
  const board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null)); // 10x10 grid
  const ships = [];
  const missedShots = [];

  function placeShip(length, coordinates, isHorizontal = true) {
    const ship = Ship(length);

    // Validate placement (within bounds)
    const [x, y] = coordinates;
    if (isHorizontal) {
      if (x + length > 10) throw new Error('Ship goes out of bounds');
      for (let i = 0; i < length; i++) {
        if (board[y][x + i] !== null) throw new Error('Position already occupied');
      }
      for (let i = 0; i < length; i++) {
        board[y][x + i] = ship;
      }
    } else {
      if (y + length > 10) throw new Error('Ship goes out of bounds');
      for (let i = 0; i < length; i++) {
        if (board[y + i][x] !== null) throw new Error('Position already occupied');
      }
      for (let i = 0; i < length; i++) {
        board[y + i][x] = ship;
      }
    }

    ships.push(ship);
    return ship;
  }

  function receiveAttack(x, y) {
    const target = board[y][x];
    if (target && typeof target.hit === 'function') {
      target.hit();
      return true; // hit
    } else {
      missedShots.push([x, y]);
      return false; // miss
    }
  }

  function allShipsSunk() {
    return ships.every(ship => ship.isSunk());
  }

  return {
    placeShip,
    receiveAttack,
    allShipsSunk,
    missedShots,
    get board() {
      return board;
    },
  };
}

module.exports = Gameboard;
