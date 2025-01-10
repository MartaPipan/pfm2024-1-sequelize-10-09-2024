const { Router } = require('express');
const {
    createMessage,
    getGroupMessages,
    updateMessage,
    deleteMessage 
} = require('../controllers/message.controller');

const messageRouter = Router();

messageRouter.post('/', createMessage);
messageRouter.get('/', getGroupMessages); 
messageRouter.patch('/:messageId', updateMessage);
messageRouter.delete('/:messageId', deleteMessage);

module.exports = messageRouter;
