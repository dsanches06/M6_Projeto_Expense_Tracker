const categories = require('../../src/data/categories');

module.exports = function handler(req, res) {
  const { slug } = req.query;
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return res.status(404).json({ error: 'Categoria não encontrada' });
  }

  const coloredSvg = category.icon.replace(
    '<svg ',
    `<svg style="color: ${category.color}" `,
  );

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.send(coloredSvg);
};