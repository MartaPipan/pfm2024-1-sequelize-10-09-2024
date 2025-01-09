const createError = require('http-errors'); 

const { Task } = require('../models');
const { userInstance } = require('../middlewares/user.mw');
const { taskInstance } = require('../middlewares/task.mw');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const newTask = await userInstance.createTask(body);// ->doc.API->Model->magic method createChild
     if (!newTask) {
  return next(createError(400, 'Task could not be created.'));
} 
    res.status(201).send({ data: newTask });
  } catch (error) {
    next(error);
  }
};

module.exports.findAllTasks = async (req, res, next) => {
  try {
    const { userInstance } = req; // отримуємо userInstance з middleware
    const { pagination } = req;

    const totalTasks = await userInstance.countTasks(); // Contar o total de tarefas do usuário
     if (pagination.offset >= totalTasks) {
      return res.status(404).send({
        message: "The user does not have enough tasks to display this page.",
        page: Math.ceil(pagination.offset / pagination.limit) + 1, // Página solicitada
        availablePages: Math.ceil(totalTasks / pagination.limit), // Páginas disponíveis
        totalTasks: totalTasks,
      });
    }
    const tasks = await userInstance.getTasks({
      attributes: {
        exclude: ['createdAt', 'updatedAt']  // Виключаємо зайві поля
      },
      ...pagination // Параметри пагінації: limit та offset
    }); // отримуємо всі завдання користувача

/**const tasks = await userInstance.getTasks({
  attributes: ['id', 'content', 'deadline', 'isDone'],
  offset: pagination.offset,
  limit: pagination.limit,
});
 */

     // Verificar se nenhuma tarefa foi encontrada
    if (!tasks || tasks.length === 0) {
      return res.status(404).send({
        message: "The user has no tasks available."
      });
    }
  
    res.status(200).send({ data: tasks }); 
    
  } catch (error) {
    next(error);// Передаємо помилку до handlerErrors
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      taskInstance,
      body
    } = req;
    const task = await taskInstance.update(body);
    res.status(200).send({ data: task})
} catch (error) {
 next(error);
}
};

module.exports.findTask = async (req, res, next) => {
  try {
    const {taskInstance} = req;
    res.status(200).send({ data: taskInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const { taskInstance } = req;
    await taskInstance.destroy();
    res.status(200).send({ data: taskInstance });
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