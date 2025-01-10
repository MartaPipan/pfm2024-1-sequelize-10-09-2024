const createError = require('http-errors');
const _ = require('lodash');
const { Group, User } = require('../models');
const attributes = [
    'name',
    'imagePath',
    'description',
    ];
module.exports.createGroup = async (req, res, next) => {
    try {
        const { body, userInstance } = req;
        const values = _.pick(body, attributes);
        const newGroup = await userInstance.createGroup(values);
        if (!newGroup) {
            return next(createError(400, 'Group could not be created.'));
        }
        console.log('newGroup===>>>', newGroup);
        res.status(201).send({ data: newGroup });
    } catch (error) {
        next(error);
    }
};

module.exports.getAllGroupsByUser = async (req, res, next) => {
    try {
        const { userInstance } = req;
        const groups = await userInstance.getGroups();
        if (groups.length === 0) {
            return res.status(200).send({
                message: 'User does not belong to any groups.',
                data: [],
            });
        }
        res.status(200).send({ data: groups });
    } catch (error) {
        next(error);
    }
};

module.exports.getGroup = async (req, res, next) => {
    try {
        const { groupInstance } = req;
        if (!groupInstance) {
            return next(createError(404, 'Group not found.'));
        }
        res.status(200).send({ data: groupInstance });
    } catch (error) {
        next(error);
    }
}; 



module.exports.deleteGroup = async (req, res, next) => {
    try {
        const { groupInstance } = req;
        await groupInstance.destroy();
        res.status(200).send({ data: groupInstance });
    } catch (error) {
        next(error);
    }
};      