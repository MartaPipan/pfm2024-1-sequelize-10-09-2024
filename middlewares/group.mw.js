const createError = require('http-errors');
const { Group } = require('../models');

module.exports.checkGroupByUser = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { groupId },
      } = req;
    const [groupInstance] = await userInstance.getGroups({ where: { id: groupId } });//hasMany>>method .get
    if (!groupInstance) {
      return next(createError(404, 'Group not found'));
    }
    
    req.groupInstance = groupInstance;
    next();
  } catch (error) {
    next(error);
  }
};


module.exports.checkGroup = async (req, res, next) => {
  try {
    const {
      params: { groupId },
    } = req;
    const groupInstance = await Group.findByPk(groupId);
    if (!groupInstance) {
      return next(createError(404, 'Group not found'));
    }
    req.groupInstance = groupInstance;
    next();
  } catch (error) {
    next(error);
  }
};

/**
Перший варіант: Перевірка зв’язку між користувачем і групою. Потрібен об'єкт userInstance
Сфера застосування: Доступ до груп користувача.
Використовуй перший варіант для логіки, яка залежить від користувача і його зв'язків із групами.


Другий варіант: Пошук групи незалежно від користувача,Перевіряє лише існування групи.
Пошук групи незалежно від користувача.
Використовуй другий варіант, коли перевірка стосується загального існування групи в базі даних.
 */