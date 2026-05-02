require('dotenv').config({ path: '.env.local' });
const { Pool } = require("pg");
const categories = require("./server/src/data/categories");

// Configuração da conexão com o banco Neon
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL não configurada. Verifique o arquivo .env.local");
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function migrateCategories() {
  try {
    console.log("🔄 Iniciando migração de categorias...");

    // Testar conexão
    await pool.query("SELECT NOW();");
    console.log("✅ Conectado ao banco de dados");

    // Criar tabela de categorias se não existir (mesma estrutura do db.js)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        slug TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        icon_name TEXT,
        color TEXT
      );
    `);
    console.log("✅ Tabela 'categories' criada/verificada");

    // Inserir categorias (ajustado para a estrutura real da tabela)
    for (const category of categories) {
      try {
        await pool.query(`
          INSERT INTO categories (slug, name, icon_name, color)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (slug) DO NOTHING;
        `, [
          category.slug,
          category.label,
          category.slug, // Usando slug como icon_name por enquanto
          category.color
        ]);
        console.log(`✅ Inserida categoria: ${category.label}`);
      } catch (error) {
        console.error(`❌ Erro ao inserir ${category.label}:`, error.message);
      }
    }

    console.log("🎉 Migração concluída com sucesso!");

  } catch (error) {
    console.error("❌ Erro na migração:", error);
  } finally {
    await pool.end();
  }
}

// Executar migração
migrateCategories();