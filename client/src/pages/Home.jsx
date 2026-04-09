// componente home
// página inicial com resumo, lista e botão de adicionar transação
import Summary from "../components/Summary.jsx";
import AddTransaction from "../components/AddTransaction.jsx";
import TransactionList from "../components/TransactionList.jsx";
import { useState } from "react";
import { initialTransactions } from "../data/mockData.js";

const Home = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showModal, setShowModal] = useState(false);

  // calcular receitas totais
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  // calcular despesas totais
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  // calcular saldo
  const balance = totalIncome - totalExpenses;

  // adicionar nova transação
  const handleAddTransaction = (newTransaction) => {
    const transaction = {
      ...newTransaction,
      id: transactions.length > 0 ? Math.max(...transactions.map((t) => t.id)) + 1 : 1,
    };
    setTransactions([...transactions, transaction]);
    setShowModal(false);
  };

  // apagar transação por id
  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      {/* cabeçalho com botão para adicionar transação */}
      <div className="page-header">
        <button
          className="btn btn-add-transaction"
          onClick={() => setShowModal(true)}
        >
          + adicionar transação
        </button>
      </div>
      {/* grid com resumo e lista de transações */}
      <div className="page-grid">
        <section className="summary-panel">
          <Summary saldo={balance} receitas={totalIncome} despesas={totalExpenses} />
        </section>
        <section className="transactions-panel">
          <TransactionList transactions={transactions} onDeleteTransaction={handleDeleteTransaction} />
        </section>
      </div>
      {/* modal para adicionar transação */}
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
    </div>
  );
};

export default Home;
