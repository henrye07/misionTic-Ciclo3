'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_customer: {
        type:Sequelize.STRING,
        allowNull:false,
      },
      id_customer:{ 
        type:Sequelize.INTEGER,
        allowNull:false
      },
      vendorID:{
        allowNull:false,
        type:Sequelize.INTEGER,
        references:{
          model:'vendors',
          key:'id'
        }
      },
      state: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('invoices');
  }
};
