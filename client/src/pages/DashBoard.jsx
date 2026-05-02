import { useReducer, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTransactions, getCategories } from "../services/api";
import {
  filtersReducer,
  initialFiltersState,
} from "../reducers/filtersReducer";
import { PreferencesContext } from "../context/PreferencesContext";
import CollapsibleDateFilter from "../components/CollapsibleDateFilter";
import CollapsibleCategoryFilter from "../components/CollapsibleCategoryFilter";
import Summary from "../components/Summary";
import RecentTransactions from "../components/ui/RecentTransactions";
import Loader from "../components/ui/TrophySpin";
import "../styles/dashboard.css";

// Página principal do Dashboard
// Apresenta o resumo financeiro (saldo, receitas, despesas),
// filtros por data e categoria, e as transações recentes
const Dashboard = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, dispatch] = useReducer(filtersReducer, initialFiltersState);
  const { userName } = useContext(PreferencesContext);

  // Tempo mínimo de loading para melhor experiência visual
  const [minLoading, setMinLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setMinLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Buscar transações - refetch sempre que o Dashboard monta
  const { data: allTransactions = [], isLoading: txLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
    staleTime: 0,
    refetchOnMount: "always",
  });

  // Buscar categorias
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Filtrar transações no frontend com base nos filtros de data e categoria ativos
  const filteredTransactions = allTransactions
    .filter((t) => {
      const txDate = t.date || t.createdAt;
      const isInDateRange =
        (!filters.startDate || txDate >= filters.startDate) &&
        (!filters.endDate || txDate <= filters.endDate);
      
      // Filtro de múltiplas categorias
      const isMatchingCategory =
        filters.activeCategories.length === 0 ||
        filters.activeCategories.includes(t.category);

      return isInDateRange && isMatchingCategory;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Calcular os totais financeiros a partir das transações filtradas
  const balance = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);

  const income = filteredTransactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = Math.abs(
    filteredTransactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0),
  );

  // Handlers de filtros - enviam ações ao reducer para atualizar os filtros
  const handleDateChange = (startDate, endDate) => {
    dispatch({
      type: "SET_DATE_RANGE",
      payload: { startDate, endDate },
    });
  };

  const handleDateClear = () => {
    dispatch({
      type: "SET_DATE_RANGE",
      payload: { startDate: "", endDate: "" },
    });
  };

  const handleCategoryChange = (categoryArray) => {
    dispatch({
      type: "SET_CATEGORIES",
      payload: categoryArray,
    });
  };

  // Repor todos os filtros para o estado inicial (mês atual)
  const handleResetFilters = () => {
    dispatch({ type: "RESET" });
  };

  if (txLoading || categoriesLoading || minLoading) {
    return <Loader />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Olá, {userName}! 👋</h1>
          <p>Bem-vindo ao teu painel de gestão de despesas</p>
        </div>
        <button
          className={`dashboard-settings-button ${showFilters ? 'open' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
          aria-label={showFilters ? 'Close filters' : 'Open filters'}
          title={showFilters ? 'Fechar Filtros' : 'Abrir Filtros'}
        >
          <span className="button-icon">{showFilters ? '✕' : '⚙️'}</span>
          <span className="button-label">
            {showFilters ? 'Fechar Filtros' : 'Abrir Filtros'}
          </span>
        </button>
      </div>

      {/* Summary Cards */}
      <Summary balance={balance} income={income} expenses={expenses} />

      {/* Filtros Colapsáveis */}
      {showFilters && (
        <>
          <CollapsibleDateFilter
            startDate={filters.startDate}
            endDate={filters.endDate}
            onDateChange={handleDateChange}
            onClear={handleDateClear}
          />

          <CollapsibleCategoryFilter
            categories={categories}
            selectedCategories={filters.activeCategories}
            onCategoryChange={handleCategoryChange}
          />
        </>
      )}

      {/* Transactions List */}
      <section className="transactions-section">
        <h2>{filters.activeCategories.length > 0 ? "Transações Filtradas" : "Transações Recentes"}</h2>
        <RecentTransactions
          transactions={filters.activeCategory ? filteredTransactions : filteredTransactions.slice(0, 10)}
          categories={categories}
        />
      </section>
    </div>
  );
};

export default Dashboard;
