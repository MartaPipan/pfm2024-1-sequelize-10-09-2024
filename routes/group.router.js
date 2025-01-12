const { Router } = require('express');
const {
    createGroup,
    getAllGroupsByUser,
    getGroup, 
    addUserToGroup,
    deleteGroupWithOnlyMember,
    userLeaveGroup
} = require('../controllers/group.controller');

const { checkGroup } = require('../middlewares/group.mw');

const groupRouter = Router();


groupRouter.post('/', createGroup);
groupRouter.get('/', getAllGroupsByUser);

groupRouter.get('/:groupId', getGroup);
groupRouter.post('/:groupId', checkGroup, addUserToGroup);
groupRouter.delete('/:groupId', checkGroup, deleteGroupWithOnlyMember);
groupRouter.patch('/:groupId', checkGroup, userLeaveGroup);// PATCH,дозволяє показати, що змінює стан ресурсу(членства в групі),уникаєте конфлікту з існуючим методом DELETE, який видаляє групу.

module.exports = groupRouter; 
