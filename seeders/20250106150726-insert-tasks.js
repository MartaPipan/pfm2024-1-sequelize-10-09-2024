'use strict';
const _ = require ('lodash');
//генерації випадкового числа задач для кожного користувача  _.random(1,10).

const { User } = require('../models');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User .findAll({
            attributes: ['id']
    });
    //users = [{id:1},{id:2}, {id:3}, .....]

    const tasks = users.map((user) => {
  return new Array(_.random(1, 10, false)) // генеруємо масив з випадковою кількістю елементів (від 1 до 10)
    .fill(null)                     // заповнюємо масив значеннями `null`
    .map((task, i) => ({
      user_id: user.id,             // прив'язуємо задачу до конкретного користувача
      content: `Content for task number(${ i+1}) by user id = ${user.id}`, // зміст задачі
      deadline: new Date(),         // дедлайн — поточна дата
      is_done: false,               // задача не виконана
      created_at: new Date(),       // дата створення
      updated_at: new Date()        // дата оновлення
    }));
}).flat(2); // розгладжуємо вкладені масиви [{ task1 }, { task2 }, { task3 }, ...]
    
    await queryInterface.bulkInsert('tasks', tasks);
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('tasks', null);
  }
};


/**Цей код є міграцією для Sequelize, яка створює "задачі" (tasks) для кожного користувача (users) у базі даних. Міграція складається з двох основних методів: up (для додавання даних) та down (для їх видалення).
 * Метод findAll отримує всіх користувачів з бази даних, але лише їхні ідентифікатори (id).
 * Повертається масив об’єктів виду: [{id: 1}, {id: 2}, {id: 3}, ...].
 *  tasks user with method .map =  [ 
 * [{id:1, user_id: 1, content, deadline, is_done, created_at, updated_at }], 
 * [{id:2, user_id: 1, content, ...}],[id:3,...],[],... [{id:10, user_id: 1, ... }]]; 
 */