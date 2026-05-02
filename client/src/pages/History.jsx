import { lazy, Suspense, useState, useEffect, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTransactions,
  deleteTransaction,
  getCategories,
} from "../services/api";
import { PreferencesContext } from "../context/PreferencesContext";
import TransactionListCard from "../components/ui/TransactionListCard";
import CategoryFilter from "../components/CategoryFilter";
import DateRangePicker from "../components/DateRangePicker";
import Loader from "../components/ui/TrophySpin";
import "../styles/history.css";

// Carregamento lazy do modal de confirmação para otimização
const ModalConfirm = lazy(() => import("../components/ui/ModalConfirm"));

// Página de histórico de transações
// Apresenta todas as transações numa tabela com pesquisa, filtros por tipo,
// ordenação por colunas e possibilidade de apagar transações
const History = () => {
  const queryClient = useQueryClient();
  const { currency } = useContext(PreferencesContext);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: currency,
    }).format(value);
  };
  // Estado para pesquisa, filtro de tipo, modal de confirmação e ordenação
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeCategoryType, setActiveCategoryType] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [minLoading, setMinLoading] = useState(true);
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    const timer = setTimeout(() => setMinLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Buscar transações
  const {
    data: transactions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  // Buscar categorias
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Mutação para apagar transação e invalidar o cache
  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  // Filtrar transações por texto de pesquisa, tipo e categoria
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" ||
      (filterType === "income" && tx.amount > 0) ||
      (filterType === "expense" && tx.amount < 0);

    const matchesCategory =
      activeCategory === null ||
      (tx.category === activeCategory &&
        (activeCategoryType === null ||
          (activeCategoryType === "expense" ? tx.amount < 0 : tx.amount > 0)));

    return matchesSearch && matchesType && matchesCategory;
  });

  // Ordenar transações pela coluna e direção selecionadas
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case "date":
        aValue = new Date(a.date);
        bValue = new Date(b.date);
        break;
      case "description":
        aValue = a.description.toLowerCase();
        bValue = b.description.toLowerCase();
        break;
      case "category":
        const catA = categories.find((cat) => cat.slug === a.category);
        const catB = categories.find((cat) => cat.slug === b.category);
        aValue = (catA?.name || a.category || "-").toLowerCase();
        bValue = (catB?.name || b.category || "-").toLowerCase();
        break;
      case "amount":
        aValue = Math.abs(a.amount);
        bValue = Math.abs(b.amount);
        break;
      default:
        return 0;
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  // Alternar a ordenação ao clicar no cabeçalho da coluna
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  // Mostrar indicador visual da direção de ordenação (seta)
  const getSortIndicator = (column) => {
    if (sortBy !== column) return "";
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  // Abrir modal de confirmação antes de apagar
  const handleDeleteTransaction = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    deleteMutation.mutate(deleteId);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  // Handler para mudança de categoria
  const handleCategoryChange = (category) => {
    setActiveCategory(category.slug);
    setActiveCategoryType(category.type);
  };

  if (isLoading || minLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="error">Erro ao carregar histórico</div>;
  }

  return (
    <div className="history-container">
      <div className="history-card">
        <h1 className="history-title">Histórico de Transações</h1>

        {/* Filtros */}
        <section className="history-filters">
          <input
            type="text"
            placeholder="Pesquisar por descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <div className="filter-buttons">
            <button
              className={`filter-btn ${filterType === "all" ? "active" : ""}`}
              onClick={() => setFilterType("all")}
            >
              Todas
            </button>
            <button
              className={`filter-btn ${filterType === "income" ? "active" : ""}`}
              onClick={() => setFilterType("income")}
            >
              Receitas
            </button>
            <button
              className={`filter-btn ${filterType === "expense" ? "active" : ""}`}
              onClick={() => setFilterType("expense")}
            >
              Despesas
            </button>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="history-category-filter">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                activeCategoryType={activeCategoryType}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          )}
        </section>

        {/* Transactions List */}
        {sortedTransactions.length > 0 ? (
          <TransactionListCard className="history-transactions-card">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th 
                    onClick={() => handleSort("date")}
                    style={{ cursor: "pointer", userSelect: "none" }}
                  >
                    Data{getSortIndicator("date")}
                  </th>
                  <th 
                    onClick={() => handleSort("description")}
                    style={{ cursor: "pointer", userSelect: "none" }}
                  >
                    Descrição{getSortIndicator("description")}
                  </th>
                  <th 
                    onClick={() => handleSort("category")}
                    style={{ cursor: "pointer", userSelect: "none" }}
                  >
                    Categoria{getSortIndicator("category")}
                  </th>
                  <th 
                    onClick={() => handleSort("amount")}
                    style={{ cursor: "pointer", userSelect: "none" }}
                  >
                    Valor{getSortIndicator("amount")}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedTransactions.map((tx) => {
                  const category = categories.find(
                    (cat) => cat.slug === tx.category,
                  );
                  const categoryName = category?.name || tx.category || "-";
                  const categoryIcon = category?.iconUrl;

                  return (
                    <tr
                      key={tx.id}
                      className={tx.amount > 0 ? "income-row" : "expense-row"}
                    >
                      <td data-label="Data">{new Date(tx.date).toLocaleDateString("pt-PT")}</td>
                      <td data-label="Descrição">{tx.description}</td>
                      <td data-label="Categoria">
                        {categoryIcon && (
                          <img
                            src={categoryIcon}
                            alt={categoryName}
                            style={{
                              width: "20px",
                              height: "20px",
                              marginRight: "8px",
                              verticalAlign: "middle",
                            }}
                          />
                        )}
                        {categoryName}
                      </td>
                      <td
                        data-label="Valor"
                        className={
                          tx.amount > 0 ? "amount-positive" : "amount-negative"
                        }
                      >
                        {tx.amount > 0 ? "+" : ""}{" "}
                        {formatCurrency(Math.abs(tx.amount))}
                      </td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteTransaction(tx.id)}
                          disabled={deleteMutation.isPending}
                        >
                          🗑️ Apagar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TransactionListCard>
        ) : (
          <div className="empty-state">
            <p>Nenhuma transação encontrada</p>
          </div>
        )}
      </div>

      {deleteId !== null && (
        <Suspense fallback={<Loader />}>
          <ModalConfirm cancel={cancelDelete} confirm={confirmDelete} />
        </Suspense>
      )}
    </div>
  );
};

export default History;
