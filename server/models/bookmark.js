'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
    link: DataTypes.STRING,
    title: DataTypes.STRING,
    search_words: DataTypes.ARRAY(DataTypes.STRING),
    UserId: DataTypes.INTEGER
  }, {});
  Bookmark.associate = function(models) {
    Bookmark.belongsTo(models.User, {
      foreignKey: 'UserId'
    });
  };
  return Bookmark;
};