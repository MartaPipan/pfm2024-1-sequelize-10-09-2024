const { Op } = require("sequelize"); //Op ->operator: + = - */
const createError = require("http-errors");
const _ = require("lodash");
const { User } = require("../models");
const attributes = [
  "firstName",
  "lastName",
  "email",
  "password",
  "birthday",
  "isMale",
  "avatar",
];

module.exports.createUser = async (req, res, next) => {
  try {
    const { body, file } = req;
    let values = _.pick(body, attributes);
    if (file) {
      values = { ...values, avatar: file.filename };
    }
    const newUser = await User.create(values);
    console.log(newUser);
    if (!newUser) {
      return next(createError(400, "User not created, fixed your data"));
    }
    console.log("newUser instance------", newUser);
    newUser.dataValues.password = undefined;

    res.status(201).send({ data: newUser });
  } catch (error) {
    next(error);
  }
};

module.exports.findAllUsers = async (req, res, next) => {
  try {
    const { pagination } = req;
    const allUsers = await User.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"], // Виключаємо тільки непотрібні поля
      },
      ...pagination,
    });
    if (!allUsers) {
      return next(createError(404, "Users not found."));
    }
    res.status(200).send({ data: allUsers });
  } catch (error) {
    next(error);
  }
};

module.exports.findUserByPk = async (req, res, next) => {
  try {
    const { userInstance } = req;
    userInstance.dataValues.password = undefined; //don't send password
    if (!userInstance) {
      return next(createError(404, "User not found."));
    }
    res.status(200).send({ data: userInstance });
  } catch (error) {
    next(error);
  }
};
module.exports.deleteUserByPk = async (req, res, next) => {
  try {
    const { userInstance } = req;
    userInstance.dataValues.password = undefined; //don't send password
    const result = await userInstance.destroy();
    if (!result) {
      return next(createError(404, "User not found."));
    }
    return res
      .status(200)
      .send({ message: "User deleted: ", data: userInstance });
  } catch (error) {
    next(error);
  }
};
module.exports.updateUserByPkInstance = async (req, res, next) => {
  try {
    const { userInstance, body, file } = req;
    let values = _.pick(body, attributes);
    if (file) {
      values = { ...values, avatar: file.filename };
    }
    const updatedUser = await userInstance.update(values);
    if (!updatedUser) {
      return next(createError(400, "User not updated, fixed your data"));
    }
    updatedUser.dataValues.password = undefined; //don't send password
    res.status(200).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserByPkStatic = async (req, res, next) => {
  try {
    const {
      params: { userId },
      body,
    } = req;
    const values = _.pick(body, attributes);
    const [, [updatedUser]] = await User.update(values, {
      where: { id: userId },
      returning: true,
    });
    if (!updatedUser) {
      return next(createError(400, "User not updated, fixed your data"));
    }
    console.log("updatedUser static", updatedUser);
    updatedUser.dataValues.password = undefined; //don't send password
    res.status(200).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
}; //const updatedUser return rows affected, not info about user  const updatedUser =[rows affected] doc.API->Model->static method update
//const updatedUser return rows affected+info about user; we need info -> do destructing const[,[updatedUser]]

/* module.exports.createUser = async (req, res, next) => {
     try {
         const { body } = req;          //{ first_name, last_name, email, password, birthday } = req.body;
         const newUser = await User.create(body);   //->doc.API->Model-> static method async create
         console.log(newUser);
         if (newUser) {
             return res.status(201).send({ data: newUser });
         }
         next(new Error('Error: bad request'));
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
*/
/*module.exports.findAllUsers = async (req, res, next) => {
    try {
    //query ---> where
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
*/

/**module.exports.findAllUsersFemaleAndIdMenosCinco = async (req, res, next) => {
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
*/

//module.exports.findUserByPk = async (req, res, next) => {
//    try {
//        const { params: { userId } } = req;
//        const user = await User.findByPk(userId)
//        return res.status(200).send({ data: user });
//    } catch (error) {
//        next(error);
//    }
//};   findUserByPk we used middleware checkUser  ====>>>>

//DROP ->delete table; TRUNCATE->delete rows

//module.exports.deleteUserByPk = async (req, res, next) => {
//    try {
//        const { params: { userId } } = req;
//        //const user = await User.findByPk(userId);     //se precisa recuperar info sobre user
//        const deletedUser = await User.destroy({
//            where: {'id': userId }
//        })
//        //return res.status(200).send({ data: user });  //se precisa recuperar info sobre user
//        return res.status(200).send('User deleted');
//        console.log({ data: deletedUser });
//
//    } catch (error) {
//        next(error);
//    }
//};

//module.exports.deleteUserInstance = async (req, res, next) => {
//    try {
//        const { params: { userId } } = req;
//        const userInstance = await User.findByPk(userId);     //se precisa recuperar info sobre user
//        const [userDeleted] =await userInstance.destroy()
//        //return res.status(200).send({ data: user });  //se precisa recuperar info sobre user
//        return res.status(200).send({data:userInstance, message:'User deleted'});
//
//    } catch (error) {
//        next(error);
//    }
//};

//module.exports.updateUserByPkInstance = async (req, res, next) => {
//    try {
//        const { params: { userId }, body } = req;
//        const values = _.pick(body, attributes);
//        const userInstance = await User.findByPk(userId);
//        const updatedUser = await userInstance.update(values);
//        console.log('updatedUser instance', updatedUser);
//
//        res.status(200).send({data:updatedUser});
//    } catch (error) {
//       next(error);
//    }
//};

/**module.exports.name = async (req, res, next) => {
    try {
    
    } catch (error) {
        next(error);
    }
};
*/
