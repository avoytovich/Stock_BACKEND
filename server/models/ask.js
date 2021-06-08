'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ask.hasMany(models.Bid, {
        foreignKey: 'AskId'
      });
      Ask.belongsTo(models.User, {
        foreignKey: 'UserId'
      });
    }
  };
  Ask.init({
    title: DataTypes.STRING,
    preferred_price: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    photo: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ask',
  });
  return Ask;
};