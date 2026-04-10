// componente home
// página inicial com resumo, lista, pesquisa e edição de transações
import Summary from "../components/Summary";
import AddTransaction from "../components/AddTransaction";
import EditTransaction from "../components/EditTransaction";
import SearchTransaction from "../components/SearchTransaction";
import TransactionList from "../components/TransactionList";
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
      {/* cards de resumo no topo */}
      <section className="summary-panel">
        <Summary saldo={balance} receitas={totalIncome} despesas={totalExpenses} />
      </section>
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
      {/* lista de transações */}
      <section className="transactions-panel">
        <TransactionList
          transactions={filteredTransactions}
          onDeleteTransaction={handleDeleteTransaction}
          onEditTransaction={handleStartEdit}
        />
      </section>
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
