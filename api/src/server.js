https://m6-projeto-expense-tracker.vercel.app/api/transactionsconst express = require("express");
const cors = require("cors");
const { initDB } = require("./data/db");

const transactionsRouter = require("./routes/transactions");
const categoriesRouter = require("./routes/categories");

const app = express();

// ─── Middleware ───────────────────────────────
app.use(cors()); // Permite pedidos do React (localhost:3000, etc.)
app.use(express.json()); // Interpreta JSON no body dos pedidos

// ─── Initialize Database ──────────────────────
initDB().catch((err) => {
  console.error("⚠️  Aviso ao inicializar BD:", err.message);
  // Don't exit - the app can still start, but DB operations will fail
});

// ─── Rotas ───────────────────────────────────
app.use("/api/transactions", transactionsRouter);
app.use("/api/categories", categoriesRouter);

// ─── Rota raiz com guia rápido ────────────────
app.get("/", (req, res) => {
  const response = {
    message: "Expense Tracker API",
    version: "1.0.0",
    status: process.env.DATABASE_URL ? "✅ BD Configurada" : "⚠️  DATABASE_URL não configurada",
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
  };

  if (!process.env.DATABASE_URL) {
    response.warning = {
      message: "⚠️  DATABASE_URL não está configurada!",
      steps: [
        "1. Cria um banco de dados (Neon, Vercel Postgres, ou Supabase)",
        "2. Copia a Connection String",
        "3. Em Vercel: Settings → Environment Variables → DATABASE_URL",
        "4. Faz Redeploy",
        "📖 Mais detalhes: Vê o ficheiro VERCEL_NEON_SETUP.md no repositório"
      ]
    };
  }

  res.json(response);
});

// ─── 404 handler ─────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Rota '${req.path}' não encontrada` });
});

// ─── Export for Vercel serverless function ────
module.exports = app;

// ─── Start server for local development ──────
if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`\nServidor a correr em http://localhost:${PORT}`);
    console.log(`Documentação:       http://localhost:${PORT}/`);
    console.log(`Transações:         http://localhost:${PORT}/api/transactions`);
    console.log(`Categorias:         http://localhost:${PORT}/api/categories\n`);
  });
}
