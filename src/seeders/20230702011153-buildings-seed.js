module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Buildings', [
    
    {
      buildingType: 'UrbanCenter',
      playerId: 1,
      gameId: 1,
      xCoordinate: 0,
      yCoordinate: 0,
      health: 1,
      value: 3,
      createdAt: new Date(),
      updatedAt: new Date() 
    }, 
    {
      buildingType: 'UrbanCenter',
      playerId: 1,
      gameId: 2,
      xCoordinate: 0,
      yCoordinate: 0,
      health: 10,
      value: 3,
      createdAt: new Date(),
      updatedAt: new Date() 
    }, 
    {
      buildingType: 'UrbanCenter',
      playerId: 2,
      gameId: 2,
      xCoordinate: 9,
      yCoordinate: 0,
      health: 10,
      value: 3,
      createdAt: new Date(),
      updatedAt: new Date() 
    }, 
    {
      buildingType: 'UrbanCenter',
      playerId: 3,
      gameId: 2,
      xCoordinate: 9,
      yCoordinate: 9,
      health: 10,
      value: 3,
      createdAt: new Date(),
      updatedAt: new Date() 
    }, 
    {
      buildingType: 'Barracks',
      playerId: 2,
      gameId: 3,
      xCoordinate: 3,
      yCoordinate: 2,
      health: 1,
      value: 3,
      createdAt: new Date(),
      updatedAt: new Date() 
    }, 
    
  ]),
  down: (queryInterface) => queryInterface.bulkInsert('Buildings', null, {}),
};