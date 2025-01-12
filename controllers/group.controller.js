const createError = require('http-errors');
const _ = require('lodash');
const { User, Group } = require('../models');

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

//дістати юзерів з групи за допомогою методу findByPk властивість include--->>>(option.incluide[].model)
module.exports.getGroup = async (req, res, next) => {
    try {
        const { userInstance, params: { groupId } } = req;
        const group = await Group.findByPk(groupId, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'email'],
                    through: { attributes: [] } //through:{ attributes:[]}->>incluide поле users_to_groups{attributes:[vazio]}
                }
            ]
        });
        if (!group) {
            return next(createError(404, 'Group does not exist for this user'));
        }
        res.status(200).send({ data: group });
    } catch (error) {
        next(error);
    }
};

/**module.exports.getGroup = async (req, res, next) => {
    try {
        const { userInstance, params: { groupId } } = req;

        // Пошук групи за ID
        const [group] = await userInstance.getGroups({
            where: { id: groupId },
        });
        if (!group) {
            return next(createError(404, 'Group does not exist for this user'));
        }
        // Видаляємо поле users_to_groups з відповіді
        group.dataValues.users_to_groups = undefined;

        res.status(200).send({ data: group });
    } catch (error) {
        next(error);
    }
};
*/
/**module.exports.getGroup = async (req, res, next) => {
    try {
        const { userInstance, params: { groupId } } = req;
        const [group] = await userInstance.getGroups({
            through: {
                where: { groupId: groupId },
            },
        });
        if(!group) {
            return next(createError(404, 'Group does not exists for this user'));
        }
        group.dataValues.users_to_groups = undefined;    //not send users_to_groups in response
        res.status(200).send({ data: group });
    } catch (error) {
        next(error);
    }
};
*/
/**erro na aula ====>>>>> 1h15min
 const group = await userInstance.getGroups({
    through: { where: { id: groupId } },
});
Тут through: { where: { id: groupId } } намагається фільтрувати дані у таблиці асоціації (users_to_groups), але поле id належить таблиці Group, а не users_to_groups. Через це фільтрація виконується неправильно, і метод повертає всі групи користувача, ігноруючи переданий groupId.
Метод getGroups приймає where на верхньому рівні, а не в through. */

module.exports.addUserToGroup = async (req, res, next) => {
    try {
        const { userInstance, groupInstance, body } = req;
        if (body.idUser) {
            const user = await User.findByPk(body.idUser);
            if (!user) {
                return next(createError(404, 'User not found'));
            }
            await groupInstance.addUser(body.idUser);
        } else {
            await groupInstance.addUser(userInstance.id);
        }
        res.status(201).send({ data: 'add user to group success' });
    } catch (error) {
        next(error);
    }
};

 
