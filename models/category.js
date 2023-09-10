'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsToMany(models.Subscriber, {
        through: 'SubscriberCategory', // Junction table
        foreignKey: 'categoryId',
      });
      Category.belongsToMany(models.Content, {
        through: 'ContentCategory', // Junction table
        foreignKey: 'categoryId',
      });
    }
  }
  Category.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
