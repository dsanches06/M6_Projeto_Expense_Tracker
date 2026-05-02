const express = require("express");
const cors = require("cors");
const {
  initDB,
  getAllTransactions,
  getTransactionById,
  createTransaction,
  deleteTransaction,
  getAllCategories,
} = require("./data/db");
const categoriesData = require("./data/categories");

const app = express();
app.use(cors());
app.use(express.json());

initDB().catch((err) => {
  console.error("⚠️ Aviso ao inicializar DB:", err.message);
});

const encodeSvg = (svg) =>
  encodeURIComponent(svg)
    .replace(/%20/g, ' ')
    .replace(/%3D/g, '=')
    .replace(/%3A/g, ':')
    .replace(/%2F/g, '/')
    .replace(/%22/g, '"')
    .replace(/%2C/g, ',')
    .replace(/%3B/g, ';')
    .replace(/%2B/g, '+')
    .replace(/%27/g, "'");

const buildCategoryResponse = (req, dbCategory) => {
  const staticCategory = categoriesData.find((cat) => cat.slug === dbCategory.slug) || {};
  const iconSvg = staticCategory.icon || '';
  const coloredSvg = iconSvg.replace(
    '<svg ',
    `<svg style="color: ${dbCategory.color}" `,
  );
  const iconUrl = iconSvg
    ? `data:image/svg+xml;utf8,${encodeSvg(coloredSvg)}`
    : undefined;

  return {
    slug: dbCategory.slug,
    name: dbCategory.name,
    icon_name: dbCategory.icon_name,
    color: dbCategory.color,
    type: staticCategory.type || "expense",
    label: staticCategory.label || dbCategory.name,
    labelEn: staticCategory.labelEn || dbCategory.name,
    iconUrl,
  };
};

app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await getAllTransactions();
    res.json(transactions);
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    res.status(500).json({ error: "Erro ao buscar transações" });
  }
});

app.get("/api/transactions/:id", async (req, res) => {
  try {
    const transaction = await getTransactionById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: "Transação não encontrada" });
    }
    res.json(transaction);
  } catch (error) {
    console.error("Erro ao buscar transação:", error);
    res.status(500).json({ error: "Erro ao buscar transação" });
  }
});

app.post("/api/transactions", async (req, res) => {
  try {
    const { description, amount, category, date, type } = req.body;
    if (!description || description.trim() === "") {
      return res.status(400).json({ error: "O campo 'description' é obrigatório" });
    }
    if (amount === undefined || amount === null || isNaN(Number(amount))) {
      return res.status(400).json({ error: "O campo 'amount' é obrigatório e deve ser um número" });
    }

    const created = await createTransaction({
      description: description.trim(),
      amount: Number(amount),
      category: category || "outro",
      type: type || (Number(amount) >= 0 ? "income" : "expense"),
      date: date || new Date().toISOString().split("T")[0],
    });

    res.status(201).json(created);
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    res.status(500).json({ error: "Erro ao criar transação" });
  }
});

app.delete("/api/transactions/:id", async (req, res) => {
  try {
    const deleted = await deleteTransaction(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Transação não encontrada" });
    }
    res.json({ message: "Transação eliminada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar transação:", error);
    res.status(500).json({ error: "Erro ao deletar transação" });
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    let categories = [];
    if (process.env.DATABASE_URL) {
      categories = await getAllCategories();
    }

    if (!categories || categories.length === 0) {
      categories = categoriesData.map((cat) => ({
        slug: cat.slug,
        name: cat.label,
        icon_name: cat.slug,
        color: cat.color,
      }));
    }

    res.json(categories.map((category) => buildCategoryResponse(req, category)));
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
});

app.get("/api/categories/:slug/icon", (req, res) => {
  const category = categoriesData.find((cat) => cat.slug === req.params.slug);
  if (!category) {
    return res.status(404).json({ error: "Categoria não encontrada" });
  }

  const coloredSvg = category.icon.replace(
    "<svg ",
    `<svg style="color: ${category.color}" `,
  );

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(coloredSvg);
});

app.listen(3001, () => {
  console.log("Servidor API local iniciado em http://localhost:3001");
});
