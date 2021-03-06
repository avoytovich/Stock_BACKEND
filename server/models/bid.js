'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bid.belongsTo(models.User, {
        foreignKey: 'UserId'
      });
      Bid.belongsTo(models.Ask, {
        foreignKey: 'AskId'
      });
    }
  };
  Bid.init({
    title: DataTypes.STRING,
    proposal: DataTypes.STRING,
    offered_price: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    AskId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bid',
  });
  return Bid;
};