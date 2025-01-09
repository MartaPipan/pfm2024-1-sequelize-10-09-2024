'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users_to_groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      groupId: {
        field: 'group_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'groups',          
          key: 'id'
        },

        onDelete: 'cascade',
        onUpdate: 'cascade',
      },      
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE        
      },          
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE  

      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users_to_groups');
  }
};
