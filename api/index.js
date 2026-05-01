const express = require("express");
const cors = require("cors");
const { initDB } = require("./src/data/db");

const transactionsRouter = require("./src/routes/transactions");
const categoriesRouter = require("./src/routes/categories");

const app = express();

// ─── Middleware ───────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Initialize Database ──────────────────────
initDB().catch((err) => {
  console.error("Erro ao inicializar BD:", err);
});

// ─── Rotas ───────────────────────────────────
app.use("/transactions", transactionsRouter);
app.use("/categories", categoriesRouter);

// ─── Rota raiz com guia rápido ────────────────
app.get("/", (req, res) => {
  res.json({
    message: "Expense Tracker API",
    version: "1.0.0",
    endpoints: {
      transactions: {
        "GET    /transactions": "Listar todas as transações",
        "GET    /transactions/:id": "Obter uma transação",
        "POST   /transactions": "Criar uma transação",
        "PUT    /transactions/:id": "Atualizar uma transação",
        "DELETE /transactions/:id": "Eliminar uma transação",
      },
      categories: {
        "GET /categories": "Listar todas as categorias",
        "GET /categories/:slug": "Obter uma categoria",
        "GET /categories/:slug/icon": "Obter o ícone SVG de uma categoria",
      },
    },
  });
});

// ─── 404 handler ─────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

module.exports = app;
