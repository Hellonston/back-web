module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Games', [
    
    {
      turn: 0,
      winner: null,
      createdAt: new Date(),
      updatedAt: new Date() 
      
    }, 
    {
      turn: 0,
      winner: null,
      createdAt: new Date(),
      updatedAt: new Date() 
      
    },
    {
      turn: 0,
      winner: null,
      createdAt: new Date(),
      updatedAt: new Date() 
      
    }
    
  ]),
  down: (queryInterface) => queryInterface.bulkInsert('Games', null, {}),
};