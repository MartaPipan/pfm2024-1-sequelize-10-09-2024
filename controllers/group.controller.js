
module.exports.createGroup = async (req, res, next) => {
    try {
        const { body, userInstance } = req;
        const newGroup = await userInstance.createGroup(body);
        console.log('newGroup===>>>', newGroup);
        res.status(201).send({ data: newGroup });
    } catch (error) {
        next(error);
    }
};