module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Troops', [
    
    {
      troopType: 'Knight',
      playerId: 2,
      gameId: 1,
      xCoordinate: 1,
      yCoordinate: 0,
      health: 10,
      strength: 4,
      value: 3,
      createdAt: new Date(),
      updatedAt: new Date() 
    }, 
    {
      troopType: 'Archer',
      playerId: 1,
      gameId: 2,
      xCoordinate: 2,
      yCoordinate: 1,
      health: 5,
      strength: 5,
      value: 2,
      createdAt: new Date(),
      updatedAt: new Date() 
    },
    {
      troopType: 'Soldier',
      playerId: 2,
      gameId: 2,
      xCoordinate: 0,
      yCoordinate: 1,
      health: 1,
      strength: 3,
      value: 1,
      createdAt: new Date(),
      updatedAt: new Date() 
    }, 
    {
      troopType: 'Knight',
      playerId: 1,
      gameId: 3,
      xCoordinate: 3,
      yCoordinate: 3,
      health: 10,
      strength: 5,
      value: 2,
      createdAt: new Date(),
      updatedAt: new Date() 
    }, 
    
  ]),
  down: (queryInterface) => queryInterface.bulkInsert('Troops', null, {}),
};