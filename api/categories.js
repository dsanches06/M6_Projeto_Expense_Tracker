const categoriesRouter = require('../server/src/routes/categories');
const express = require('express');

const app = express();

app.use(categoriesRouter);

module.exports = (req, res) => {
  app(req, res);
};
