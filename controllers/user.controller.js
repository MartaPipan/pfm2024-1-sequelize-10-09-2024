const { Op } = require('sequelize');    //Op ->operator: + = - */
const { User } = require('../models');

 module.exports.createUser = async (req, res, next) => {
     try {
         const { body } = req;          //{ first_name, last_name, email, password, birthday } = req.body;
         const newUser = await User.create(body);   //->doc.API->Model-> static method async create
         //console.log(newUser);
         if (newUser) {
             return res.status(201).send({ data: newUser });
         }
         next(new Error('Error:bad request'));
} catch (error) {
    // Tratamento de erros

    // Erros de validação
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).send({
        error: 'Validation error',
        details: error.errors.map((e) => e.message), // Lista os erros de validação
      });
    }

    // Erros do banco de dados
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).send({
        error: 'Conflict error',
        message: 'Email must be unique',
      });
    }

    // Outros erros
    console.error('Error while creating user:', error);
    return res.status(500).send({
      error: 'Internal server error',
      message: error.message,
    });
  }
 };

module.exports.findAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.findAll({
            // where:{'isMale':false},
            //where: {
            //    'id': {
            //        [Op.lt]:10
            //    }
            //},
    
            attributes: {
                exclude:['password','createdAt', 'updatedAt']
            },
            order: [['firstName', 'DESC'],['id', 'DESC']]
        });
        return res.status(200).send({ data: allUsers });
    } catch (error) {
        next(error);
    }
};

module.exports.findAllUsersFemaleAndIdMenosCinco = async (req, res, next) => {
    try {
        const allUsers = await User.findAll({
            where:{'isMale':false},
            where: {
                'id': {
                    [Op.lt]:5
                }
            },
            attributes: {
                exclude:['password','createdAt', 'updatedAt']
            },
            order: [['firstName', 'DESC'],['id', 'DESC']]
        });
        return res.status(200).send({ data: allUsers });
    } catch (error) {
        next(error);
    }
};

module.exports.findUserByPk = async (req, res, next) => {
    try {
        const { params: { userId } } = req;
        const user = await User.findByPk(userId)
        return res.status(200).send({ data: user });
    } catch (error) {
        next(error);
    }
};

//DROP ->delete table; TRUNCATE->delete rows
module.exports.deleteUserByPk = async (req, res, next) => {
    try {
        const { params: { userId } } = req;
        //const user = await User.findByPk(userId);     //se precisa recuperar info sobre user
        const deletedUser = await User.destroy({
            where: {'id': userId }
        })
        //return res.status(200).send({ data: user });  //se precisa recuperar info sobre user
        return res.status(200).send('User deleted');
        console.log({ data: deletedUser });
        
    } catch (error) {
        next(error);
    }
};

module.exports.deleteUserInstance = async (req, res, next) => {
    try {
        const { params: { userId } } = req;
        const userInstance = await User.findByPk(userId);     //se precisa recuperar info sobre user
        const userDeleted =await User.destroy({
            where: {'id': userId }
        })
        //return res.status(200).send({ data: user });  //se precisa recuperar info sobre user
        return res.status(200).send({data:userDeleted, message:'User deleted'});
        
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