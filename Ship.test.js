const Ship = require('./Ship');

describe('Ship factory', () => {
  test('Ship has correct length', () => {
    const ship = Ship(4);
    expect(ship.length).toBe(4);
  });

  test('Ship can be hit', () => {
    const ship = Ship(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test('Ship sinks after enough hits', () => {
    const ship = Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
