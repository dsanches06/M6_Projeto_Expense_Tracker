const db = require("../src/data/db");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const { id } = req.query;

    if (req.method === "DELETE") {
      const deleted = await db.deleteTransaction(id);
      if (!deleted) {
        return res.status(404).json({ error: "Transação não encontrada" });
      }
      return res.status(200).json({ message: "Transação eliminada com sucesso" });
    }

    if (req.method === "GET") {
      const transaction = await db.getTransactionById(id);
      if (!transaction) {
        return res.status(404).json({ error: "Transação não encontrada" });
      }
      return res.status(200).json(transaction);
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};
