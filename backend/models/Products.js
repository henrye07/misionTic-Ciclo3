'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        //
    }
  }
  Products.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    product_name: {
      type:DataTypes.STRING,
      allowNull: false,
      require:true
    },
    description: {
      type:DataTypes.STRING,
      allowNull:true,
      require:false
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull: false,
      require:true
    },
    state: {
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false,
      require:false
    },
    quantity: {
      type:DataTypes.INTEGER,
      require:true,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'products',
    modelName: 'Product',
  });
  return Products;
};