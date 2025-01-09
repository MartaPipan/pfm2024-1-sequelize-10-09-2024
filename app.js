const express = require('express');
const router = require('./routes');
const { handlerErrors } = require('./handlerErrors');

const app = express();

app.use(express.json());

//router
app.use('/', router);

//handlerError
app.use(handlerErrors);

module.exports = app;
