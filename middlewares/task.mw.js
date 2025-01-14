//const createError = require('http-errors');
const NotFoundError = require('../errors/NotFoundError');

module.exports.checkTask = async (req, res, next) => {
    try {
        const {
            userInstance,
            params: { taskId },
            body
        } = req;
        const [taskInstance] = await userInstance.getTasks({ where: { id: taskId } });//hasMany>>method .get
        if (!taskInstance) {
            //return next(createError(404, 'Task not found'));
            return next(new NotFoundError('Task not found'));
    }
        req.taskInstance = taskInstance;
        next();
    } catch (error) {
        next(error);
    }
};