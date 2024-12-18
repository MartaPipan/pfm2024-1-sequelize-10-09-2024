const { Router } = require('express');
const { createUser, findAllUsers,findUserByPk} = require('../controllers/user.controller');

const router = Router();

// routing
// http://localhost:3000/


router.post('/users', createUser);
router.get('/users', findAllUsers);
router.get('/users/:userId', findUserByPk);


module.exports = router;
