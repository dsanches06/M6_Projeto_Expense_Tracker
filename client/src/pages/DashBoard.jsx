import { useReducer, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTransactions, getCategories } from "../services/api";
import {
  filtersReducer,
  initialFiltersState,
} from "../reducers/filtersReducer";
import { PreferencesContext } from "../context/PreferencesContext";
import DateRangePicker from "../components/DateRangePicker";
import CategoryFilter from "../components/CategoryFilter";
import Summary from "../components/Summary";
import RecentTransactions from "../components/ui/RecentTransactions";
import Loader from "../components/ui/TrophySpin";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [filters, dispatch] = useReducer(filtersReducer, initialFiltersState);
  const { userName } = useContext(PreferencesContext);

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
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Filtragem no frontend aplicando os filtros sobre dados em cache
  const filteredTransactions = allTransactions
    .filter((t) => {
      const txDate = t.date;
      const isInDateRange = txDate >= filters.startDate && txDate <= filters.endDate;
      const isMatchingCategory =
        filters.activeCategory === null ||
        (t.category === filters.activeCategory &&
          (filters.activeCategoryType === null ||
            (filters.activeCategoryType === "expense" ? t.amount < 0 : t.amount > 0)));

      return isInDateRange && isMatchingCategory;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Calcular os totais a partir das transações filtradas
  const balance = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);

  const income = filteredTransactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = Math.abs(
    filteredTransactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0),
  );

  // Handlers que usam dispatch
  const handleDateChange = (startDate, endDate) => {
    dispatch({
      type: "SET_DATE_RANGE",
      payload: { startDate, endDate },
    });
  };

  const handleCategoryChange = (category) => {
    dispatch({
      type: "SET_CATEGORY",
      payload: category,
    });
  };

  const handleResetFilters = () => {
    dispatch({ type: "RESET" });
  };

  if (txLoading || minLoading) {
    return <Loader />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Olá, {userName}! 👋</h1>
        <p>Bem-vindo ao teu painel de gestão de despesas</p>
      </div>

      {/* Summary Cards */}
      <Summary balance={balance} income={income} expenses={expenses} />

      {/* Filtros */}
      <section className="filters-section">
        <h2>Filtrar por Data</h2>
        <div className="filters-controls">
          <DateRangePicker
            startDate={filters.startDate}
            endDate={filters.endDate}
            onDateChange={handleDateChange}
          />
          <button onClick={handleResetFilters} className="reset-btn">
            Limpar Filtros
          </button>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <section className="categories-section">
          <h2>Filtrar por Categoria</h2>
          <CategoryFilter
            categories={categories}
            activeCategory={filters.activeCategory}
            activeCategoryType={filters.activeCategoryType}
            onCategoryChange={handleCategoryChange}
          />
        </section>
      )}

      {/* Transactions List */}
      <section className="transactions-section">
        <h2>{filters.activeCategory ? "Transações Filtradas" : "Transações Recentes"}</h2>
        <RecentTransactions
          transactions={filters.activeCategory ? filteredTransactions : filteredTransactions.slice(0, 10)}
          categories={categories}
        />
      </section>
    </div>
  );
};

export default Dashboard;
