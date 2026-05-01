const app = require('./src/server.js');

module.exports = (req, res) => {
  // Rewrite the URL to match Express routes
  req.url = (req.url.replace(/^\/api/, '') || '/');
  return app(req, res);
};
