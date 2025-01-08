const { Router } = require('express');
const {
  createUser,
  findAllUsers,
  findUserByPk,
  deleteUserByPk,
  updateUserByPkInstance,
  deleteUserInstance,
  updateUserByPkStatic } = require('../controllers/user.controller');

    const {
  createTask,
  findAllTasks,
  updateTask,
  findTask,
  deleteTask,
} = require('../controllers/task.controller');

const { checkUser } = require('../middlewares/user.mw');
const { checkTask } = require('../middlewares/task.mw');

const router = Router();

// routing
// http://localhost:3000/


router.post('/users', createUser);
router.get('/users', findAllUsers);

//router.get('/users/:userId',checkUser, findUserByPk);
//router.delete('/users/:userId',checkUser, deleteUserByPk);
//router.patch('/users/:userId', checkUser, updateUserByPkInstance);
//router.delete('/users/:userId',checkUser, deleteUserInstance);
//router.patch('/users/:userId',checkUser, updateUserByPkStatic);   ------>>>>>>
//------>>>>>>
router
  .route('/users/:userId')
  .all(checkUser)
  .get(findUserByPk)
  .delete(deleteUserByPk)
  .patch(updateUserByPkInstance);


router.post('/users/:userId/tasks', checkUser, createTask);
router.get('/users/:userId/tasks', checkUser, findAllTasks);

router.get('/users/:userId/tasks/:taskId', checkUser, checkTask, findTask);
router.patch('/users/:userId/tasks/:taskId', checkUser, checkTask, updateTask);
router.delete('/users/:userId/tasks/:taskId', checkUser, checkTask, deleteTask);

module.exports = router;
