'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_name: {
        type:Sequelize.STRING,
        allowNull: false,
        require:true
      },
      description: {
        type:Sequelize.STRING,
        allowNull:true,
        require:false
      },
      price: {
        type:Sequelize.INTEGER,
        allowNull: false,
        require:true
      },
      state: {
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false,
        require:false
      },
      quantity: {
        type:Sequelize.INTEGER,
        require:true,
        allowNull:false
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
    await queryInterface.dropTable('products');
  }
};
