const { Router } = require('express');
const { createUser,
    findAllUsers,
    findUserByPk,
    deleteUserByPk } = require('../controllers/user.controller');

const router = Router();

// routing
// http://localhost:3000/


router.post('/users', createUser);
router.get('/users', findAllUsers);
router.get('/users/:userId', findUserByPk);
router.delete('/users/:userId', deleteUserByPk)

module.exports = router;
