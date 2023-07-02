const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Troop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Player, {
        foreignKey: 'playerId',
      });
    }
  }
  Troop.init({
    troopType: DataTypes.STRING,
    playerId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    xCoordinate: DataTypes.INTEGER,
    yCoordinate: DataTypes.INTEGER,
    health: DataTypes.INTEGER,
    strength: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Troop',
  });
  return Troop;
};
