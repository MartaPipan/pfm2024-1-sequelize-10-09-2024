const { User } = require('../models');

module.exports.checkTask = async (req, res, next) => {
    try {
        const {
            userInstance,
            params: { taskId },
            body
        } = req;
        const [taskInstance] = await userInstance.getTasks({ where: { id: taskId } });//hasMany>>method .get
    if (!taskInstance) {
      throw new Error('Task not found');
    }
        req.taskInstance = taskInstance;
        next();
    } catch (error) {
        next(error);
    }
};