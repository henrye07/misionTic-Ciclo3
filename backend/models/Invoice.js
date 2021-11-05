'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    
    static associate(models) {
      this.belongsTo(models.Vendor,{as:'Vendedor',foreignKey:'vendorID'})
      this.belongsToMany(models.Product,{ as:'items',
                                          through:models.SaleDetails,
                                          foreignKey:'invoiceID',
                                          otherKey:'productID',
                                          onDelete: 'CASCADE',
                                          hooks: true
                                        }
                        ) 
    }
  }
  Invoice.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name_customer: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    id_customer:{ 
      type:DataTypes.INTEGER,
      allowNull:false
    },
    vendorID:{
      allowNull:false,
      type:DataTypes.INTEGER,
      references:{
        model:'vendors',
        key:'id'
      }
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  }, {
    sequelize,
    tableName:"invoices",
    modelName: 'Invoice',
    freezeTableName:true,
  });
  return Invoice;
};