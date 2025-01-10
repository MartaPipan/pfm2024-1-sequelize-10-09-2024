const { Router } = require('express');
const { checkUser } = require('../middlewares/user.mw');  

const userRouter = require('./user.router');
const taskRouter = require('./task.router');
const groupRouter = require('./group.router');

const router = Router();
router.use('/users', userRouter);
router.use('/users/:userId/tasks', checkUser, taskRouter);
router.use('/users/:userId/groups', checkUser, groupRouter);

module.exports = router;
