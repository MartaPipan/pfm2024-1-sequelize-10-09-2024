const { UniqueConstraintError, ValidationError } = require("sequelize");
const ApplicationError = require("../errors/ApplicationError");


module.exports.handleErrors = (err, req, res, next) => {
    console.log('---in handlerError--->>>', err);
    if (err instanceof UniqueConstraintError) {
        return res.status(409).send({
            errors: [{detail: 'User with this email already exists'}],
        });
    }if (err instanceof ValidationError) {
        return res.status(400).send({
            errors: [{detail: err.message}],
        });
    } if (err instanceof ApplicationError) {
        return res.status(400).send({
            errors: [{detail: err.message}]
        });
    }   
    const status = err.status || 500;
    res.status(status).send({
        errors: [{
            detail: err.message,
            status: status || 'Server Error'
        }]  
    });
};


/**https://jsonapi.org/format/#errors  see--->>>11.2 Error Object  -->>> create object errors[{detail:stringstatus:string, title:string}]  */