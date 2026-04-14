const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("../data/db");

const router = express.Router();

// ─────────────────────────────────────────────
// GET /api/transactions
// Devolve todas as transações
// ─────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const transactions = await db.getAllTransactions();
    res.json(transactions);
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    res.status(500).json({ error: "Erro ao buscar transações" });
  }
});

// ─────────────────────────────────────────────
// GET /api/transactions/:id
// Devolve uma transação pelo id
// ─────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const transaction = await db.getTransactionById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: "Transação não encontrada" });
    }
    res.json(transaction);
  } catch (error) {
    console.error("Erro ao buscar transação:", error);
    res.status(500).json({ error: "Erro ao buscar transação" });
  }
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
router.post("/", async (req, res) => {
  try {
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

    const created = await db.createTransaction(newTransaction);
    res.status(201).json(created);
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    res.status(500).json({ error: "Erro ao criar transação" });
  }
});

// ─────────────────────────────────────────────
// PUT /api/transactions/:id
// Atualiza uma transação existente
// ─────────────────────────────────────────────
router.put("/:id", async (req, res) => {
  try {
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

    const updated = await db.updateTransaction(req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ error: "Transação não encontrada" });
    }
    res.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar transação:", error);
    res.status(500).json({ error: "Erro ao atualizar transação" });
  }
});

// ─────────────────────────────────────────────
// DELETE /api/transactions/:id
// Elimina uma transação
// ─────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await db.deleteTransaction(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Transação não encontrada" });
    }
    res.json({ message: "Transação eliminada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar transação:", error);
    res.status(500).json({ error: "Erro ao deletar transação" });
  }
});

module.exports = router;
