const { Router } = require('express');
const { createUser,
    findAllUsers,
    findUserByPk,
    deleteUserByPk, 
    deleteUserInstance,
    updateUserByPkInstance,
    updateUserByPkStatic } = require('../controllers/user.controller');

    const {
  createTask,
  findAllTasks,
  updateTask,
  findTask,
  deleteTask,
} = require('../controllers/task.controller');


const router = Router();

// routing
// http://localhost:3000/


router.post('/users', createUser);
router.get('/users', findAllUsers);
router.get('/users/:userId', findUserByPk);
//router.delete('/users/:userId', deleteUserByPk);
router.delete('/users/:userId', deleteUserInstance);
//router.patch('/users/:userId', updateUserByPkInstance);
router.patch('/users/:userId', updateUserByPkStatic);




router.post('/users/:userId/tasks', createTask);
//router.get('/users/:userId/tasks', paginate, findAllTasks);

//router.get('/users/:userId/tasks/:taskId', checkTask, findTask);
//router.patch('/users/:userId/tasks/:taskId', checkTask, updateTask);
//router.delete('/users/:userId/tasks/:taskId', checkTask, deleteTask);


module.exports = router;
