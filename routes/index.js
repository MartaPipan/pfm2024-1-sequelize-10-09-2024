const { Router } = require('express');

const { checkUser } = require('../middlewares/user.mw');
const { checkTask } = require('../middlewares/task.mw');

const userRouter = require('./user.router');
const taskRouter = require('./task.router');

const router = Router();
router.use('/users', userRouter);
router.use('/users/:userId/tasks',checkUser, taskRouter);

module.exports = router;
