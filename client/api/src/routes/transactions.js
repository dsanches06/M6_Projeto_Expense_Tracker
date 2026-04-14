const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("../data/db");

const router = express.Router();

// ─────────────────────────────────────────────
// GET /api/transactions
// Devolve todas as transações
// ─────────────────────────────────────────────
router.get("/", (req, res) => {
  const transactions = db.getAllTransactions();
  res.json(transactions);
});

// ─────────────────────────────────────────────
// GET /api/transactions/:id
// Devolve uma transação pelo id
// ─────────────────────────────────────────────
router.get("/:id", (req, res) => {
  const transaction = db.getTransactionById(req.params.id);
  if (!transaction) {
    return res.status(404).json({ error: "Transação não encontrada" });
  }
  res.json(transaction);
});

// ─────────────────────────────────────────────
// POST /api/transactions
// Cria uma nova transação
//
// Body esperado:
// {
//   description: string   (obrigatório)
//   amount: number        (obrigatório, positivo = receita, negativo = despesa)
//   category: string      (slug da categoria, ex: "alimentacao")
//   date: string          (ISO 8601, ex: "2024-03-15" — opcional, usa data atual)
//   type: "expense" | "income"  (opcional, inferido pelo sinal do amount)
// }
// ─────────────────────────────────────────────
router.post("/", (req, res) => {
  const { description, amount, category, date, type } = req.body;

  // Validação
  if (!description || description.trim() === "") {
    return res.status(400).json({ error: "O campo 'description' é obrigatório" });
  }
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return res.status(400).json({ error: "O campo 'amount' é obrigatório e deve ser um número" });
  }

  const parsedAmount = Number(amount);

  const newTransaction = {
    id: uuidv4(),
    description: description.trim(),
    amount: parsedAmount,
    category: category || "outro",
    type: type || (parsedAmount >= 0 ? "income" : "expense"),
    date: date || new Date().toISOString().split("T")[0],
    createdAt: new Date().toISOString(),
  };

  const created = db.createTransaction(newTransaction);
  res.status(201).json(created);
});

// ─────────────────────────────────────────────
// PUT /api/transactions/:id
// Atualiza uma transação existente
// ─────────────────────────────────────────────
router.put("/:id", (req, res) => {
  const { description, amount, category, date, type } = req.body;

  const updates = {};
  if (description !== undefined) updates.description = description.trim();
  if (amount !== undefined) {
    if (isNaN(Number(amount))) {
      return res.status(400).json({ error: "'amount' deve ser um número" });
    }
    updates.amount = Number(amount);
  }
  if (category !== undefined) updates.category = category;
  if (date !== undefined) updates.date = date;
  if (type !== undefined) updates.type = type;
  updates.updatedAt = new Date().toISOString();

  const updated = db.updateTransaction(req.params.id, updates);
  if (!updated) {
    return res.status(404).json({ error: "Transação não encontrada" });
  }
  res.json(updated);
});

// ─────────────────────────────────────────────
// DELETE /api/transactions/:id
// Elimina uma transação
// ─────────────────────────────────────────────
router.delete("/:id", (req, res) => {
  const deleted = db.deleteTransaction(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: "Transação não encontrada" });
  }
  res.json({ message: "Transação eliminada com sucesso" });
});

module.exports = router;
