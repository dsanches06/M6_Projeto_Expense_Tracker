const app = require('./src/server.js');

module.exports = (req, res) => {
  req.url = req.url.replace(/^\/api/, '') || '/';
  return app(req, res);
};
