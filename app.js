const express = require('express');
const router = require('./routes/router');
const app = express();

app.use(express.json());
//router
app.use('/', router);

//handlerError
app.use((err, req, res) => {
    console.log(err.message);
    res.status(500).send(err.message);
});

module.exports = app;
