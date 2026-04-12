import { useReducer, useContext } from "react";
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
import "../styles/dashboard.css";

const Dashboard = () => {
  const [filters, dispatch] = useReducer(filtersReducer, initialFiltersState);
  const { userName } = useContext(PreferencesContext);

  // Buscar transações - uma única vez, depois fica em cache
  const { data: allTransactions = [], isLoading: txLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  // Buscar categorias
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Filtragem no frontend aplicando os filtros sobre dados em cache
  const filteredTransactions = allTransactions.filter((t) => {
    const txDate = new Date(t.date);
    const filterStartDate = new Date(filters.startDate);
    const filterEndDate = new Date(filters.endDate);

    const isInDateRange = txDate >= filterStartDate && txDate <= filterEndDate;
    const isMatchingCategory =
      filters.activeCategory === null || t.category === filters.activeCategory;

    return isInDateRange && isMatchingCategory;
  });

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

  if (txLoading) {
    return <div className="loading">A carregar dados...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Hello, {userName}! 👋</h1>
        <p>Welcome to your expense management dashboard</p>
      </div>

      {/* Summary Cards */}
      <Summary balance={balance} income={income} expenses={expenses} />

      {/* Filtros */}
      <section className="filters-section">
        <h2>Filter by Date</h2>
        <div className="filters-controls">
          <DateRangePicker
            startDate={filters.startDate}
            endDate={filters.endDate}
            onDateChange={handleDateChange}
          />
          <button onClick={handleResetFilters} className="reset-btn">
            Clear Filters
          </button>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <section className="categories-section">
          <h2>Filter by Category</h2>
          <CategoryFilter
            categories={categories}
            activeCategory={filters.activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </section>
      )}

      {/* Transactions List */}
      <section className="transactions-section">
        <h2>Recent Transactions</h2>
        <RecentTransactions
          transactions={filteredTransactions.slice(0, 10)}
          categories={categories}
        />
      </section>
    </div>
  );
};

export default Dashboard;
