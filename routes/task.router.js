const { Router } = require('express');
const { checkTask } = require('../middlewares/task.mw');

const {
    createTask,
    findAllTasks,
    updateTask,
    findTask,
    deleteTask,
} = require('../controllers/task.controller');
 
const taskRouter = Router();

taskRouter.post('/', createTask);
taskRouter.get('/', findAllTasks);

taskRouter.get('/:taskId', checkTask, findTask);
taskRouter.patch('/:taskId', checkTask, updateTask);
taskRouter.delete('/:taskId',checkTask, deleteTask);

module.exports = taskRouter;