const express = require("express");
const cors = require("cors");
const { initDB } = require("./src/data/db");
const transactionsRouter = require("./src/routes/transactions");

const app = express();

app.use(cors());
app.use(express.json());

// Initialize DB
initDB().catch((err) => {
  console.error("❌ Erro ao inicializar BD:", err);
});

console.log("✅ Handler de transações carregado");

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Handler de transações está funcionando!" });
});

// All transaction routes
app.use("/", transactionsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: "Rota não encontrada", 
    path: req.path,
    method: req.method 
  });
});

module.exports = app;

