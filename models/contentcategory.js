'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContentCategory extends Model {
    static associate(models) {
      ContentCategory.belongsTo(models.Content, {
        foreignKey: 'contentId',
        onDelete: 'CASCADE',
      });

      ContentCategory.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        onDelete: 'CASCADE',
      });
    }
  }
  ContentCategory.init({
    contentId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ContentCategory',
  });
  return ContentCategory;
};