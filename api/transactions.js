const express = require("express");
const cors = require("cors");
const { initDB } = require("./src/data/db");
const transactionsRouter = require("./src/routes/transactions");

const app = express();

app.use(cors());
app.use(express.json());

initDB().catch((err) => {
  console.error("Erro ao inicializar BD:", err);
});

app.use("/", transactionsRouter);
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

module.exports = app;
