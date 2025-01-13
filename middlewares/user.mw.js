const createError = require('http-errors');
const { User } = require('../models');

module.exports.checkUser = async (req, res, next) => {
    try {
        const { params: { userId } } = req;
        const userInstance = await User.findByPk(userId);
        if (!userInstance) {
            return next(createError(404, 'User not found'));    
        }
        console.log('mw CheckUser: userInstance===>>>>', userInstance);
        
        req.userInstance = userInstance;
        next();
} catch (error) {
 next(error);
}
};