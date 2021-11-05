'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SaleDetails extends Model {
    
    static associate(models) {
     //
    }
  }
  SaleDetails.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    invoiceID:{
      allowNull:false,
      type:DataTypes.INTEGER,
      references:{
        model:'invoices',
        key:'id'
      }
    },
    productID:{
      allowNull:false,
      type:DataTypes.INTEGER,
      references:{
        model:'products',
        key:'id'
      }
    },
    quantity: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
  }, {
    sequelize,
    tableName:'sales',
    modelName: 'SaleDetails',
    timestamps:false,
  });
  return SaleDetails;
};