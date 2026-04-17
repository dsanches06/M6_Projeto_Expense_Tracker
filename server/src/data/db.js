const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "transactions.json");

// Initialize the database file if it doesn't exist
function initDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ transactions: [] }, null, 2));
  }
}

function readDB() {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// --- Transactions ---

function getAllTransactions() {
  return readDB().transactions;
}

function createTransaction(transaction) {
  const db = readDB();
  db.transactions.push(transaction);
  writeDB(db);
  return transaction;
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
  createTransaction,
  deleteTransaction,
};
