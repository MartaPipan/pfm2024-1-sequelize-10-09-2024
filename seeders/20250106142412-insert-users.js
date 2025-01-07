'use strict';

const generateUser = (key) => ({
  first_name: `Name${key}`,
  last_name: `LastName${key}`,
  email:`email${key}`,
  password_hash: `password_hash${key}`,
  birthday: new Date(1970, key, key),
  is_male: Math.random()>0.5,
  created_at: new Date(),
  updated_at: new Date()
});
const generateUsers = (amount = 50) => {
  return new Array(amount > 500 ? 500 : amount).fill(null).map((e, i) => generateUser(i));
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /** Add seed commands here. Example:
     * await queryInterface.bulkInsert('People', 
     * [{name: 'John Doe',
     *   isBetaMember: false}], {});*/
    
    await queryInterface.bulkInsert(
      'users', generateUsers(),
    )
  },

  async down (queryInterface, Sequelize) {
    /** Add seed here. Example: await queryInterface.bulkDelete('People', null, {});*/
    await queryInterface.bulkDelete('users', null, {});
  }
};
