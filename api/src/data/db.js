const fs = require("fs");
const path = require("path");

// Use /tmp for Vercel, or local path for development
const DB_PATH = process.env.VERCEL 
  ? "/tmp/transactions.json"
  : path.join(__dirname, "transactions.json");

// Initialize the database file if it doesn't exist
function initDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify({ transactions: [] }, null, 2));
      console.log("📁 Base de dados criada em", DB_PATH);
    }
  } catch (error) {
    console.error("Erro ao inicializar DB:", error);
    throw error;
  }
}

function readDB() {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Erro ao ler DB:", error);
    return { transactions: [] };
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Erro ao escrever DB:", error);
    throw error;
  }
}

// --- Transactions ---

function getAllTransactions() {
  return readDB().transactions;
}

function getTransactionById(id) {
  const { transactions } = readDB();
  return transactions.find((t) => t.id === id) || null;
}

function createTransaction(transaction) {
  const db = readDB();
  db.transactions.push(transaction);
  writeDB(db);
  return transaction;
}

function updateTransaction(id, updates) {
  const db = readDB();
  const index = db.transactions.findIndex((t) => t.id === id);
  if (index === -1) return null;
  db.transactions[index] = { ...db.transactions[index], ...updates };
  writeDB(db);
  return db.transactions[index];
}

function deleteTransaction(id) {
  const db = readDB();
  const index = db.transactions.findIndex((t) => t.id === id);
  if (index === -1) return false;
  db.transactions.splice(index, 1);
  writeDB(db);
  return true;
}

module.exports = {
  initDB,
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
