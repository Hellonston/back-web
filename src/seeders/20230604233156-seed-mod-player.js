module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Players', [
    {
      name: 'Hellonston',
      userId: 1,
      gameId: 1,
      gold: 20,
      actionPoint: 30,
      archersQuantity: 0,
      knightQuantity: 0,
      soldierQuantity: 0,
      urbanCenter: 0,
      barracksQuantity: 0,
      stableQuantity: 0,
      archeryQuantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'MartoSW',
      userId: 2,
      gameId: 1,
      gold: 20,
      actionPoint: 20,
      archersQuantity: 0,
      knightQuantity: 0,
      soldierQuantity: 0,
      urbanCenter: 0,
      barracksQuantity: 0,
      stableQuantity: 0,
      archeryQuantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Haliax',
      userId: 3,
      gameId: 1,
      gold: 20,
      actionPoint: 20,
      archersQuantity: 0,
      knightQuantity: 0,
      soldierQuantity: 0,
      urbanCenter: 0,
      barracksQuantity: 0,
      stableQuantity: 0,
      archeryQuantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Carowo',
      userId: 4,
      gameId: 1,
      gold: 20,
      actionPoint: 20,
      archersQuantity: 0,
      knightQuantity: 0,
      soldierQuantity: 0,
      urbanCenter: 0,
      barracksQuantity: 0,
      stableQuantity: 0,
      archeryQuantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'MartoSW',
      userId: 2,
      gameId: 2,
      gold: 20,
      actionPoint: 20,
      archersQuantity: 0,
      knightQuantity: 0,
      soldierQuantity: 0,
      urbanCenter: 0,
      barracksQuantity: 0,
      stableQuantity: 0,
      archeryQuantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Haliax',
      userId: 3,
      gameId: 2,
      gold: 20,
      actionPoint: 20,
      archersQuantity: 0,
      knightQuantity: 0,
      soldierQuantity: 0,
      urbanCenter: 0,
      barracksQuantity: 0,
      stableQuantity: 0,
      archeryQuantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Carowo',
      userId: 4,
      gameId: 2,
      gold: 20,
      actionPoint: 20,
      archersQuantity: 0,
      knightQuantity: 0,
      soldierQuantity: 0,
      urbanCenter: 0,
      barracksQuantity: 0,
      stableQuantity: 0,
      archeryQuantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'MartoSW',
      userId: 2,
      gameId: 3,
      gold: 20,
      actionPoint: 20,
      archersQuantity: 0,
      knightQuantity: 0,
      soldierQuantity: 0,
      urbanCenter: 0,
      barracksQuantity: 0,
      stableQuantity: 0,
      archeryQuantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Haliax',
      userId: 3,
      gameId: 3,
      gold: 20,
      actionPoint: 20,
      archersQuantity: 0,
      knightQuantity: 0,
      soldierQuantity: 0,
      urbanCenter: 0,
      barracksQuantity: 0,
      stableQuantity: 0,
      archeryQuantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Carowo',
      userId: 4,
      gameId: 3,
      gold: 20,
      actionPoint: 20,
      archersQuantity: 0,
      knightQuantity: 0,
      soldierQuantity: 0,
      urbanCenter: 0,
      barracksQuantity: 0,
      stableQuantity: 0,
      archeryQuantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

  ]),
  down: (queryInterface) => queryInterface.bulkInsert('Players', null, {}),
};
