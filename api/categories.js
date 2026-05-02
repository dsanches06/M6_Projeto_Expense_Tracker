const db = require('./src/data/db');
const staticCategories = require('./src/data/categories');

const encodeSvg = (svg) =>
  encodeURIComponent(svg);

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      const categoriesFromDb = await db.getAllCategories();
      const categories = categoriesFromDb.map((dbCategory) => {
        const staticCategory = staticCategories.find((cat) => cat.slug === dbCategory.slug) || {};
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
          type: staticCategory.type || 'expense',
          label: staticCategory.label || dbCategory.name,
          labelEn: staticCategory.labelEn || dbCategory.name,
          iconUrl,
        };
      });
      res.status(200).json(categories);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
