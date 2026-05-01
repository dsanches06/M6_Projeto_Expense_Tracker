// Serverless function entry point for Vercel
const app = require('./src/server.js');

module.exports = (req, res) => {
  // Remove '/api' prefix if it exists so Express routes match correctly
  req.url = req.url.replace(/^\/api/, '') || '/';
  return app(req, res);
};


