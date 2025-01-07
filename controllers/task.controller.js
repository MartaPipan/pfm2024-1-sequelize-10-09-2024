const { Task } = require('../models');
const {userInstance}= require('../middlewares/user.mw')

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const newTask = await userInstance.createTask(body);// ->doc.API->Model->magic method createChild
      res.status(201).send({ data: newTask });
  } catch (error) {
    next(error);
  }
};

module.exports.findAllTasks = async (req, res, next) => {
  try {
    const { userInstance } = req; // отримуємо userInstance з middleware
    const tasks = await userInstance.getTasks(); // отримуємо всі завдання користувача
    res.status(200).send({ data: tasks }); 
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { taskId },
      body
    } = req;
    //const result = await userInstance.hasTask(taskId);
    //console.log(result);
    const [taskInstance] = await userInstance.getTasks({ where: { id: taskId } });//hasMany->>method .get
    if (!taskInstance) {
      throw new Error('Task not found');
    }
    const task = await taskInstance.update(body);
    res.status(200).send({ data: task})
} catch (error) {
 next(error);
}
};



/**module.exports.createTask = async (req, res, next) => {
  try {
    const { body, params: { userId } } = req;
    //check if user exists
    const newTask = await Task.create({ ...body, userId:userId });   //->doc.API->Model-> static method async create
    //console.log(newUser);
    if (newTask) {
      res.status(201).send({ data: newTask });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.name = async (req, res, next) => {
    try {
    
    } catch (error) {
        next(error);
    }
};
*/