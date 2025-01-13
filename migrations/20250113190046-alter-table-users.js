'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('users','avatar', Sequelize.TEXT); //STRING dont suficient 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'avatar');
  }
};

// look in queryInterface end choise what to do( here we need add column 'avatar' to table 'users' ==> queryInterface.addColumn()   end remove column ==> queryInterface.removeColumn() )