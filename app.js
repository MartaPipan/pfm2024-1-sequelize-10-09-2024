const express = require("express");
const router = require("./routes");
const { handleErrors } = require("./handleErrors");

const app = express();

app.use(express.json());
app.use(express.static("public"));

//router
app.use("/", router);
// if we have admin panel
// app.use('/admin', adminRouter);

//handleError
app.use(handleErrors);

module.exports = app;
