const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Building extends Model {
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
  Building.init({
    buildingType: DataTypes.STRING,
    playerId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    xCoordinate: DataTypes.INTEGER,
    yCoordinate: DataTypes.INTEGER,
    health: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Building',
  });
  return Building;
};
