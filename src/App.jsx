import { useState } from "react";
import Summary from "./components/Summary";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import { initialTransactions } from "./data/mockData.js";

const App = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showModal, setShowModal] = useState(false);

  // Calcular receitas totais
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  // Calcular despesas totais
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // Calcular saldo
  const balance = totalIncome - totalExpenses;

  // Adicionar nova transação
  const handleAddTransaction = (newTransaction) => {
    const transaction = {
      ...newTransaction,
      id:
        transactions.length > 0
          ? Math.max(...transactions.map((t) => t.id)) + 1
          : 1,
    };
    setTransactions([...transactions, transaction]);
    setShowModal(false); // Fechar modal após adicionar
  };

  // Apagar transação por id
  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <main className="container">
      <div className="page-header">
        <button
          className="btn btn-add-transaction"
          onClick={() => setShowModal(true)}
        >
          + Adicionar transação
        </button>
      </div>

      <div className="page-grid">
        <section className="summary-panel">
          <Summary
            saldo={balance}
            receitas={totalIncome}
            despesas={totalExpenses}
          />
        </section>

        <section className="transactions-panel">
          <TransactionList
            transactions={transactions}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </section>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ×
            </button>
            <AddTransaction onAddTransaction={handleAddTransaction} />
          </div>
        </div>
      )}
    </main>
  );
};

export default App;
