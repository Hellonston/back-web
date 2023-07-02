/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
      },
      gameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Games', key: 'id' },
      },
      gold: {
        type: Sequelize.INTEGER,
      },
      actionPoint: {
        type: Sequelize.INTEGER,
      },
      archersQuantity: {
        type: Sequelize.INTEGER,
      },
      knightQuantity: {
        type: Sequelize.INTEGER,
      },
      soldierQuantity: {
        type: Sequelize.INTEGER,
      },
      urbanCenter: {
        type: Sequelize.INTEGER,
      },
      barracksQuantity: {
        type: Sequelize.INTEGER,
      },
      stableQuantity: {
        type: Sequelize.INTEGER,
      },
      archeryQuantity: {
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
    await queryInterface.dropTable('Players');
  },
};
