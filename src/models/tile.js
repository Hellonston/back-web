const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Game, {
        foreignKey: 'gameId',
      });
    }
  }
  Tile.init({
    gameId: DataTypes.INTEGER,
    elementType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    elementId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    xCoordinate: DataTypes.INTEGER,
    yCoordinate: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Tile',
  });
  return Tile;
};
