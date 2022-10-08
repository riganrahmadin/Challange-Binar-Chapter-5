'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Car.init({
    car_name: DataTypes.STRING,
    car_price: DataTypes.INTEGER,
    car_size: DataTypes.STRING,
    car_photo: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};