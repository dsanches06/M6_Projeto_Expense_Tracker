const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

// Check if DATABASE_URL is available
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL não está configurada!");
  console.error("Configura em Vercel: Settings → Environment Variables → DATABASE_URL");
}

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

// Flag to track if DB has been initialized
let dbInitialized = false;

// Initialize the database table
async function initDB() {
  if (dbInitialized) return;
  
  try {
    // Test connection first
    await pool.query("SELECT NOW();");
    console.log("✅ Conectado ao PostgreSQL");
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        description TEXT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        category TEXT NOT NULL,
        type TEXT NOT NULL,
        date TEXT NOT NULL,
        "createdAt" TEXT NOT NULL
      );
    `);
    console.log("✅ Tabela 'transactions' inicializada");

    // Migrate data from JSON if table is empty
    await migrateData();
    dbInitialized = true;
  } catch (error) {
    console.error("❌ Erro ao inicializar DB:", error.message);
    // Don't throw - let the app start anyway, but errors will occur on first request
  }
}

// Migrate data from transactions.json to PostgreSQL (one-time operation)
async function migrateData() {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM transactions;");
    const count = parseInt(result.rows[0].count, 10);

    if (count === 0) {
      const jsonPath = path.join(__dirname, "transactions.json");
      if (fs.existsSync(jsonPath)) {
        const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
        
        for (const transaction of data.transactions || []) {
          await pool.query(
            `INSERT INTO transactions 
             (id, description, amount, category, type, date, "createdAt") 
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             ON CONFLICT (id) DO NOTHING;`,
            [
              transaction.id,
              transaction.description,
              transaction.amount,
              transaction.category,
              transaction.type,
              transaction.date,
              transaction.createdAt,
            ]
          );
        }
        console.log(`📦 ${data.transactions.length} transações migradas para PostgreSQL`);
      }
    }
  } catch (error) {
    console.error("⚠️  Erro ao migrar dados:", error.message);
  }
}

// --- Transactions ---

async function getAllTransactions() {
  // Ensure DB is initialized
  await initDB();
  
  try {
    const result = await pool.query("SELECT * FROM transactions ORDER BY date DESC;");
    return result.rows;
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return [];
  }
}

async function getTransactionById(id) {
  try {
    const result = await pool.query("SELECT * FROM transactions WHERE id = $1;", [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Erro ao buscar transação:", error);
    return null;
  }
}

async function createTransaction(transaction) {
  try {
    const result = await pool.query(
      `INSERT INTO transactions 
       (id, description, amount, category, type, date, "createdAt") 
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *;`,
      [
        transaction.id,
        transaction.description,
        transaction.amount,
        transaction.category,
        transaction.type,
        transaction.date,
        transaction.createdAt,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    throw error;
  }
}

async function updateTransaction(id, updates) {
  try {
    const fields = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(updates)) {
      fields.push(`"${key}" = $${paramCount}`);
      values.push(value);
      paramCount++;
    }

    values.push(id);

    const query = `UPDATE transactions SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING *;`;
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Erro ao atualizar transação:", error);
    throw error;
  }
}

async function deleteTransaction(id) {
  try {
    const result = await pool.query("DELETE FROM transactions WHERE id = $1;", [id]);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Erro ao deletar transação:", error);
    throw error;
  }
}

module.exports = {
  initDB,
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  pool, // Export pool for direct queries if needed
};
