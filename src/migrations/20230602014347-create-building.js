/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Buildings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      buildingType: {
        type: Sequelize.STRING,
      },
      playerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Players', key: 'id' },
      },
      gameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Games', key: 'id' },
      },
      xCoordinate: {
        type: Sequelize.INTEGER,
      },
      yCoordinate: {
        type: Sequelize.INTEGER,
      },
      health: {
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Buildings');
  },
};
