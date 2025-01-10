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
        console.log('newGroup===>>>', newGroup);
        res.status(201).send({ data: newGroup });
    } catch (error) {
        next(error);
    }
};