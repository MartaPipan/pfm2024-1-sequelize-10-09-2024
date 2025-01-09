const { Router } = require('express');

const {
    createTask,
    findAllTasks,
    updateTask,
    findTask,
    deleteTask,
} = require('../controllers/task.controller');

const { checkTask } = require('../middlewares/task.mw');
const { paginate } = require('../middlewares/paginate.mw');
 
const taskRouter = Router();

taskRouter.post('/', createTask);
taskRouter.get('/', paginate, findAllTasks);

taskRouter.get('/:taskId', checkTask, findTask);
taskRouter.patch('/:taskId', checkTask, updateTask);
taskRouter.delete('/:taskId',checkTask, deleteTask);

module.exports = taskRouter;