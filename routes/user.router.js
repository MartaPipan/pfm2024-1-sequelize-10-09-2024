const { Router } = require('express');
const { checkUser } = require('../middlewares/user.mw');
const { pagination } = require('../middlewares/pagination.mw');

const {
    createUser,
    findAllUsers,
    findUserByPk,
    deleteUserByPk,
    updateUserByPkInstance,
    deleteUserInstance,
    updateUserByPkStatic
} = require('../controllers/user.controller');

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/',pagination, findAllUsers);

userRouter 
  .route('/:userId')
  .all(checkUser)
  .get(findUserByPk)
  .delete(deleteUserByPk)
  .patch(updateUserByPkInstance);

module.exports = userRouter;
