'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscriber extends Model {
    static associate(models) {
      Subscriber.belongsToMany(models.Category, {
        through: 'SubscriberCategory', // Junction table
        foreignKey: 'subscriberId',
      });
    }
  }
  Subscriber.init({
    phone: DataTypes.STRING,
    app: DataTypes.TEXT // Use TEXT if it can contain multiple categories
  }, {
    sequelize,
    modelName: 'Subscriber',
  });
  return Subscriber;
};
