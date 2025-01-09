const { Router } = require('express');

const {
    createUser,
    findAllUsers,
    findUserByPk,
    deleteUserByPk,
    updateUserByPkInstance,
    deleteUserInstance,
    updateUserByPkStatic
} = require('../controllers/user.controller');

const { checkUser } = require('../middlewares/user.mw');
const { paginate } = require('../middlewares/paginate.mw');

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/',paginate, findAllUsers);

userRouter 
  .route('/:userId')
  .all(checkUser)
  .get(findUserByPk)
  .delete(deleteUserByPk)
  .patch(updateUserByPkInstance);

module.exports = userRouter;
