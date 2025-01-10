const { Router } = require('express');
const { createGroup } = require('../controllers/group.controller');

const groupRouter = Router();


groupRouter.post('/', createGroup);

module.exports = groupRouter; 
