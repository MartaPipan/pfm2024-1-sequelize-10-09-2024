const { Router } = require('express');

const {
    createGroup,
    getAllGroupsByUser,
    getGroup, 
    addUserToGroup,
    deleteOrLeaveGroup,
    updateGroup,
} = require('../controllers/group.controller');

const { checkGroup } = require('../middlewares/group.mw');
const { singleUpload } = require('../middlewares/upload.mw');



const groupRouter = Router();


groupRouter.post('/',singleUpload('image'), createGroup);
groupRouter.get('/', getAllGroupsByUser);

groupRouter.get('/:groupId', getGroup);
groupRouter.post('/:groupId', checkGroup, addUserToGroup);
groupRouter.delete('/:groupId', checkGroup, deleteOrLeaveGroup);
groupRouter.patch('/:groupId', checkGroup, singleUpload('image'), updateGroup);

module.exports = groupRouter; 
