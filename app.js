const express = require('express');
const router = require('./routes');
const { handlerErrors } = require('./handlerErrors');

const app = express();

app.use(express.json());
app.use(express.static('public'));

//router
app.use('/', router);
// if we have admin panel
// app.use('/admin', adminRouter);

//handlerError
app.use(handlerErrors);

module.exports = app;
