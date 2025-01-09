module.exports.handlerErrors = (err, req, res, next) => {
    console.log('---in handlerError--->>>', err.message, err.status);
    const status = err.status || 500;
    res.status(status).send({
        errors: [{
            detail: err.message,
            status: status || 'Server Error'
        }]  
    });
};


/**https://jsonapi.org/format/#errors  see--->>>11.2 Error Object  -->>> create object errors[{detail:stringstatus:string, title:string}]  */