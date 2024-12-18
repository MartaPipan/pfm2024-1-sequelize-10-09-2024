const { Router } = require('express');
const { createUser, findAllUsers } = require('../controllers/user.controller');

const router = Router();

// routing
// http://localhost:3000/

router.get('/users', findAllUsers);
router.post('/users', createUser);

module.exports = router;
