'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoiceID:{
        allowNull:false,
        type:Sequelize.INTEGER,
        references:{
          model:'invoices',
          key:'id'
        }
      },
      productID:{
        allowNull:false,
        type:Sequelize.INTEGER,
        references:{
          model:'products',
          key:'id'
        }
      },
      quantity: {
        type:Sequelize.INTEGER,
        allowNull:false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sales');
  }
};
