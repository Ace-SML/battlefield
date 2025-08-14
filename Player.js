const Gameboard = require('./Gameboard');

function Player(type = 'human') {
  const gameboard = Gameboard();
  const previousMoves = new Set(); // Track moves for computer

  function attack(enemyBoard, x, y) {
    enemyBoard.receiveAttack(x, y);
  }

  function randomAttack(enemyBoard) {
    let x, y, key;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      key = `${x},${y}`;
    } while (previousMoves.has(key));

    previousMoves.add(key);
    enemyBoard.receiveAttack(x, y);
    return { x, y };
  }

  return {
    type,
    gameboard,
    attack: type === 'human' ? attack : undefined,
    randomAttack: type === 'computer' ? randomAttack : undefined,
  };
}

module.exports = Player;
