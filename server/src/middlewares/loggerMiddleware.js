/* Função para registrar logs das requisições */
function logger(req, res, next) {
  console.log(`${req.method.padEnd(6)} ${req.url}`);
  next();
}

module.exports = logger;
