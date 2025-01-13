const createError = require('http-errors');
const _ = require('lodash');
const { User, Group } = require('../models');

const attributes = [
    'name',
    'imagePath',
    'description'];

module.exports.updateGroup = async (req, res, next) => {
    try {
        const {
            groupInstance, file, body} = req;

        let values = _.pick(body, attributes);
        if (file) {
            values = { ...values, imagePath: file.filename };    
        }
        const updatedGroup = await groupInstance.update(values);
        
        res.status(201).send({ data: updatedGroup });  
    } catch (error) {
        next(error);
    }
};   

module.exports.createGroup = async (req, res, next) => {
    try {
        const { userInstance, file, body} = req;
        let values = _.pick(body, attributes);
        if (file) {
            values = { ...values, imagePath: file.filename };
        }
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
        // Перевіряємо, чи є userInstance учасником групи, лише користувачі, які вже є частиною групи, можуть додавати інших користувачів до тієї ж групи
        const isMember = await groupInstance.hasUser(userInstance.id);
        if (!isMember) {
            return next(createError(403, 'You must be a member of the group to add other users.'));
        }
        // Якщо передано поле idUser у запиті
        if (body.idUser) {
            // Знаходимо користувача в базі даних за його ID
            const user = await User.findByPk(body.idUser);
            if (!user) {
                // Якщо користувача з таким ID не знайдено, повертаємо помилку з кодом 404
                return next(createError(404, 'User not found'));
            }
            // Додаємо знайденого користувача до групи
            await groupInstance.addUser(body.idUser);
        } else {
            // Якщо поле idUser у запиті не передано, додаємо користувача до групи
            await groupInstance.addUser(userInstance.id);
        }
        res.status(201).send({ data: 'add user to group success' });
    } catch (error) {
        next(error);
    }
};


module.exports.deleteOrLeaveGroup =  async (req, res, next) => {
    try {
        const { groupInstance, userInstance } = req;

        // Видаляємо користувача з групи
        await groupInstance.removeUser(userInstance.id);

        // Перевіряємо кількість користувачів, які залишились
        const remainingUserCount = await groupInstance.countUsers();

        if (remainingUserCount === 0) {
            // Якщо більше користувачів немає, видаляємо групу
            await groupInstance.destroy();
            return res.status(200).send({ message: 'User has been removed, and the group was deleted because it no longer has any members.' });
        }

        res.status(200).send({ message: 'User has left the group successfully.' });
    } catch (error) {
        next(error);
    }
};
/**module.exports.deleteGroupWithOnlyMember = async (req, res, next) => {
    try {
        const { groupInstance, userInstance } = req;

        // Отримуємо кількість користувачів у групі
        const userCount = await groupInstance.countUsers();

        // Перевіряємо, чи користувач єдиний,iнакше видаляємо групу
        if (userCount === 1) {
            await groupInstance.destroy();
            return res.status(200).send({ message: 'Group deleted as the owner was the only member.' });
        }

        return res.status(400).send({ message: 'Group cannot be deleted because there are other members.' });
    } catch (error) {
        next(error);
    }
};*/
 
/**method deleteGroupWithOnlyMember and userLeaveGroup used method .getUsers();
 * 
 * module.exports.deleteGroupWithOnlyMember = async (req, res, next) => {
    try {
        const { groupInstance, userInstance } = req;

        // Отримуємо всіх користувачів, які належать до групи
        const users = await groupInstance.getUsers();

        // Якщо тільки один користувач (той, хто створив групу)
        if (users.length === 1) {
            await groupInstance.destroy();
            return res.status(200).send({ message: 'Group deleted as the owner was the only member.' });
        }

        return res.status(400).send({ message: 'Group cannot be deleted because there are other members.' });
    } catch (error) {
        next(error);
    }
};   

module.exports.userLeaveGroup = async (req, res, next) => {
    try {
        const { groupInstance, userInstance } = req;

        // Видаляємо користувача з групи
        await groupInstance.removeUser(userInstance.id);

        // Перевіряємо, чи залишились інші користувачі у групі
        const remainingUsers = await groupInstance.getUsers();

        if (remainingUsers.length === 0) {
            // Якщо жодного користувача не залишилось, видаляємо групу
            await groupInstance.destroy();
            return res.status(200).send({ message: 'User has been removed, and the group was deleted because it no longer has any members.' });
        }

        res.status(200).send({ message: 'User has left the group successfully.' });
    } catch (error) {
        next(error);
    }
};*/
