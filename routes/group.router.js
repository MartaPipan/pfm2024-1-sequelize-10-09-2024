const { Router } = require('express');
const {
    createGroup,
    getAllGroupsByUser,
    getGroup, 
    addUserToGroup,
    deleteGroup
} = require('../controllers/group.controller');

const { checkGroup } = require('../middlewares/group.mw');

const groupRouter = Router();


groupRouter.post('/', createGroup);
groupRouter.get('/', getAllGroupsByUser);

groupRouter.get('/:groupId', getGroup);
groupRouter.post('/:groupId', checkGroup, addUserToGroup);
groupRouter.delete('/:groupId', deleteGroup);

module.exports = groupRouter; 
