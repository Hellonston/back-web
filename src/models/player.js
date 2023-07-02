const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      this.belongsTo(models.Game, {
        foreignKey: 'gameId',
      });
      this.hasMany(models.Building, {
        foreignKey: 'id',
      });
      this.hasMany(models.Troop, {
        foreignKey: 'id',
      });
    }
  }
  Player.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    gold: DataTypes.INTEGER,
    actionPoint: DataTypes.INTEGER,
    archersQuantity: DataTypes.INTEGER,
    knightQuantity: DataTypes.INTEGER,
    soldierQuantity: DataTypes.INTEGER,
    urbanCenter: DataTypes.INTEGER,
    barracksQuantity: DataTypes.INTEGER,
    stableQuantity: DataTypes.INTEGER,
    archeryQuantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};
