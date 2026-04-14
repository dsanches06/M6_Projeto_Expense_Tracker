const express = require("express");
const categories = require("../data/categories");

const router = express.Router();
const API_URL = process.env.API_URL || "http://localhost:3001";

// ─────────────────────────────────────────────
// GET /api/categories
// Devolve todas as categorias (sem os SVGs para manter a resposta leve)
// ─────────────────────────────────────────────
router.get("/", (req, res) => {
  const list = categories.map(({ slug, label, labelEn, color }, index) => ({
    id: index,
    slug,
    name: label,
    label,
    labelEn,
    color,
    iconUrl: `${API_URL}/api/categories/${slug}/icon`,
  }));
  res.json(list);
});

// ─────────────────────────────────────────────
// GET /api/categories/:slug
// Devolve uma categoria específica (sem o SVG)
// ─────────────────────────────────────────────
router.get("/:slug", (req, res) => {
  const category = categories.find((c) => c.slug === req.params.slug);
  if (!category) {
    return res.status(404).json({ error: "Categoria não encontrada" });
  }
  const { icon, ...rest } = category;
  res.json({ ...rest, iconUrl: `${API_URL}/api/categories/${category.slug}/icon` });
});

// ─────────────────────────────────────────────
// GET /api/categories/:slug/icon
// Devolve o ícone SVG da categoria
//
// Podes usar diretamente no HTML:
//   <img src="http://localhost:3001/api/categories/alimentacao/icon" />
// ─────────────────────────────────────────────
router.get("/:slug/icon", (req, res) => {
  const category = categories.find((c) => c.slug === req.params.slug);
  if (!category) {
    return res.status(404).json({ error: "Categoria não encontrada" });
  }

  // Injeta a cor da categoria como currentColor para o SVG ficar colorido
  const coloredSvg = category.icon.replace(
    "<svg ",
    `<svg style="color: ${category.color}" `
  );

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=86400"); // cache 1 dia
  res.send(coloredSvg);
});

module.exports = router;
