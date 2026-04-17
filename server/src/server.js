const express = require("express");
const cors = require("cors");
const { initDB } = require("./data/db");
const logger = require("./middlewares/loggerMiddleware");

const transactionsRouter = require("./routes/transactions");
const categoriesRouter = require("./routes/categories");

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ───────────────────────────────
app.use(logger);
app.use(express.json());
app.use(cors());

// ─── Rotas ───────────────────────────────────
app.use("/api/transactions", transactionsRouter);
app.use("/api/categories", categoriesRouter);

// ─── Rota raiz com guia rápido ────────────────
app.get("/", (req, res) => {
  res.json({
    message: "Expense Tracker API",
    version: "1.0.0",
    endpoints: {
      transactions: {
        "GET    /api/transactions": "Listar todas as transações",
        "GET    /api/transactions/:id": "Obter uma transação",
        "POST   /api/transactions": "Criar uma transação",
        "PUT    /api/transactions/:id": "Atualizar uma transação",
        "DELETE /api/transactions/:id": "Eliminar uma transação",
      },
      categories: {
        "GET /api/categories": "Listar todas as categorias",
        "GET /api/categories/:slug": "Obter uma categoria",
        "GET /api/categories/:slug/icon": "Obter o ícone SVG de uma categoria",
      },
    },
    exemplo_transacao: {
      description: "Almoço no restaurante",
      type: "expense",
      amount: 12.5,
      category: "restaurantes",
      date: "2026-04-09",
    },
  });
});

// ─── 404 handler ─────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Rota '${req.path}' não encontrada` });
});

// ─── Iniciar servidor ─────────────────────────
initDB();
app.listen(PORT, () => {
  console.log(`\n✅ Servidor a correr em http://localhost:${PORT}`);
  console.log(`📚 Documentação:       http://localhost:${PORT}/`);
  console.log(`💸 Transações:         http://localhost:${PORT}/api/transactions`);
  console.log(`📂 Categorias:         http://localhost:${PORT}/api/categories\n`);
});
