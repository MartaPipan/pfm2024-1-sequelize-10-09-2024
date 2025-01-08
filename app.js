const express = require('express');
const router = require('./routes');
const app = express();

app.use(express.json());
//router
app.use('/', router);

//handlerError
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send(err.message);
});

module.exports = app;
