// componente home
// página inicial com resumo, lista, pesquisa e edição de transações
import Summary from "../components/Summary.jsx";
import AddTransaction from "../components/AddTransaction.jsx";
import EditTransaction from "../components/EditTransaction.jsx";
import SearchTransaction from "../components/SearchTransaction.jsx";
import TransactionList from "../components/TransactionList.jsx";
import { useState } from "react";
import { initialTransactions } from "../data/mockData.js";

const Home = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("all");

  // calcular receitas totais
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  // calcular despesas totais
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  // calcular saldo
  const balance = totalIncome - totalExpenses;

  // filtrar transações por texto e tipo
  const filteredTransactions = transactions.filter((t) => {
    const matchesText = t.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = filterType === "all" || t.type === filterType;
    return matchesText && matchesType;
  });

  // pesquisar transações
  const handleSearch = (text, type) => {
    setSearchText(text);
    setFilterType(type);
  };

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

  // abrir modal de edição
  const handleStartEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  // guardar edição
  const handleEditTransaction = (updatedTransaction) => {
    setTransactions(
      transactions.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
    setEditingTransaction(null);
  };

  return (
    <div className="container">
      {/* cabeçalho com pesquisa e botão adicionar */}
      <div className="page-header">
        <SearchTransaction onSearch={handleSearch} />
        <button
          className="btn btn-add-transaction"
          onClick={() => setShowModal(true)}
        >
          + Adicionar transação
        </button>
      </div>
      {/* grid com resumo e lista de transações */}
      <div className="page-grid">
        <section className="summary-panel">
          <Summary saldo={balance} receitas={totalIncome} despesas={totalExpenses} />
        </section>
        <section className="transactions-panel">
          <TransactionList
            transactions={filteredTransactions}
            onDeleteTransaction={handleDeleteTransaction}
            onEditTransaction={handleStartEdit}
          />
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
      {/* modal para editar transação */}
      {editingTransaction && (
        <div className="modal-overlay" onClick={() => setEditingTransaction(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setEditingTransaction(null)}>
              ×
            </button>
            <EditTransaction
              transaction={editingTransaction}
              onEditTransaction={handleEditTransaction}
              onCancel={() => setEditingTransaction(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
