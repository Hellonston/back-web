/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Troops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      troopType: {
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
      strength: {
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
    await queryInterface.dropTable('Troops');
  },
};
