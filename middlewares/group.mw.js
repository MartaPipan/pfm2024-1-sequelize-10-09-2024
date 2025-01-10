const createError = require('http-errors');
const { Group } = require('../models');
const { User } = require('../models');

module.exports.checkGroup = async (req, res, next) => {
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


