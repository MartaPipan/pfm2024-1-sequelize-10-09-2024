const {Task} = require('../models');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, params: { userId } } = req;
    const newTask = await Task.create({ ...body, userId:userId });   //->doc.API->Model-> static method async create
    //console.log(newUser);
    if (newTask) {
      res.status(201).send({ data: newTask });
    }
  } catch (error) {
    next(error);
  }
};


/**module.exports.name = async (req, res, next) => {
    try {
    
    } catch (error) {
        next(error);
    }
};
*/