const { Router } = require('express');
const {
    createGroup,
    getAllGroupsByUser,
    getGroup, 
    deleteGroup} = require('../controllers/group.controller');

const groupRouter = Router();


groupRouter.post('/', createGroup);
groupRouter.get('/', getAllGroupsByUser);

groupRouter.get('/:groupId', getGroup);
groupRouter.delete('/:groupId', deleteGroup);

module.exports = groupRouter; 
