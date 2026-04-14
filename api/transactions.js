const transactionsRouter = require('../server/src/routes/transactions');
const express = require('express');

const app = express();

app.use(express.json());
app.use(transactionsRouter);

module.exports = (req, res) => {
  app(req, res);
};
