'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    static associate(models) {
      Content.belongsToMany(models.Category, {
        through: 'ContentCategory',
        foreignKey: 'contentId',
      });
    }
  }
  Content.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    slug: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Content',
  });
  return Content;
};