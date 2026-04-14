const express = require("express");
const cors = require("cors");
const transactionsRouter = require("../../server/src/routes/transactions");
const categoriesRouter = require("../../server/src/routes/categories");
const { initDB } = require("../../server/src/data/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
try {
  initDB();
} catch (error) {
  console.error("Database initialization error:", error);
}

// Routes (without /api prefix - Vercel handles that)
app.use("/transactions", transactionsRouter);
app.use("/categories", categoriesRouter);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Expense Tracker API",
    version: "1.0.0",
    status: "online",
  });
});

// Export for Vercel
module.exports = app;
