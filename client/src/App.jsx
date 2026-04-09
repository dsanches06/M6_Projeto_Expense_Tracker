
// importar componentes do react-router-dom
import { Routes, Route } from "react-router-dom";

// componente principal da aplicação
import { useState } from "react";
import Summary from "./components/Summary.jsx";
import AddTransaction from "./components/AddTransaction.jsx";
import TransactionList from "./components/TransactionList.jsx";
import { initialTransactions } from "./data/mockData.js";
import MainLayout from "./pages/MainLayout.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";

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

  // retornar as rotas da aplicação
  return (
    <Routes>
      {/* layout principal para todas as páginas */}
      <Route path="/" element={<MainLayout />}>
        {/* página inicial (home) */}
        <Route index element={<Home />} />
        {/* página about */}
        <Route path="about" element={<About />} />
        {/* página contact */}
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
};

// exportar componente principal
export default App;
