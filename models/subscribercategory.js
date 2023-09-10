'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubscriberCategory extends Model {
    static associate(models) {
      SubscriberCategory.belongsTo(models.Subscriber, {
        foreignKey: 'subscriberId',
        onDelete: 'CASCADE',
      });

      SubscriberCategory.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        onDelete: 'CASCADE',
      });
    }
  }
  SubscriberCategory.init({
    subscriberId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SubscriberCategory',
  });
  return SubscriberCategory;
};
