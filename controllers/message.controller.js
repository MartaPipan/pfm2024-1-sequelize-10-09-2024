const createError = require('http-errors');
const _ = require('lodash');
const { userInstance } = require('../middlewares/user.mw'); // Отримуємо користувача
const { Message } = require('../models');
const { Group } = require('../models');
const { User } = require('../models');

const attributes = [
  'content'
];

module.exports.createMessage = async (req, res, next) => {
  try {
    const { body, userInstance, groupInstance } = req;
    const values = _.pick(body, attributes);
    
    if (!userInstance || !groupInstance) {
      return next(createError(400, 'User instance and Group instance are required.'));
    }
    const userId = userInstance.id;
    const groupId = groupInstance.id;

    if (!userId || !groupId) {
      return next(createError(400, 'User ID and Group ID are required.'));
    }
    const newMessage = await userInstance.createMessage({
      ...values,
      userId,
      groupId
    });

    if (!newMessage) {
      return next(createError(400, 'Message could not be created.'));
    }

    res.status(201).send({ data: newMessage });
  } catch (error) {
    next(error);
  }
};


module.exports.getGroupMessages = async (req, res, next) => {
  try {
    const { groupInstance } = req;
    const groupId = groupInstance.id;

    const groupWithMessages = await Group.findByPk(groupId, {
      include: [
        {
          model: User,
          through: { attributes: [] },
          include: [
            {
              model: Message,
              attributes: ['id', 'content', 'createdAt'],
            },
          ],
        },
      ],
    });
    if (!groupWithMessages) {
      return res.status(404).json({ error: 'Group not found' });
    }
    const messages = groupWithMessages.Users.flatMap((user) => user.Messages);
    res.status(200).json({ data: messages });
  } catch (error) {
    next(error);
  }
};

module.exports.updateMessage = async (req, res, next) => {
  try {
    const {
      messageInstance,
      body
    } = req;
    const values = _.pick(body, attributes);
    const message = await messageInstance.update(values);
    res.status(200).send({ data: task})
} catch (error) {
 next(error);
}
};

module.exports.deleteMessage = async (req, res, next) => {
  try {
    const { messageInstance } = req;
    await messageInstance.destroy();
    res.status(200).send({ data: messageInstance });
  } catch (error) {
    next(error);
  }
};
/**module.exports.updateMessage = async (req, res, next) => {
  const { messageId } = req.params;
  const { content } = req.body;
  const values = _.pick(body, attributes);
  try {
    const message = await Message.findByPk(messageId);

    if (!message) {
      return res.status(404).send({ message: 'Message not found.' });
    }

    // Оновлюємо зміст повідомлення
    message.content = content;
    await message.save();

    res.status(200).send({ data: message });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteMessage = async (req, res, next) => {
  const { messageId } = req.params;

  try {
    const message = await Message.findByPk(messageId);

    if (!message) {
      return res.status(404).send({ message: 'Message not found.' });
    }

    // Видаляємо повідомлення
    await message.destroy();

    res.status(200).send({ message: 'Message deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
*/

