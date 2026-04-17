import { useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bar, Doughnut, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { getTransactions, getCategories } from "../services/api";
import { useTheme } from "../context/ThemeContext";
import { PreferencesContext } from "../context/PreferencesContext";
import Loader from "../components/ui/TrophySpin";
import "../styles/statistics.css";

// Registo dos componentes do Chart.js necessários para os gráficos
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

ChartJS.defaults.devicePixelRatio = window.devicePixelRatio || 2;

// Página de estatísticas
// Apresenta gráficos visuais: barras (receitas vs despesas por dia da semana),
// doughnut (despesas por categoria), pie (receitas por categoria)
// e gráfico de linha (evolução do saldo e despesas ao longo do tempo)
const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const { theme } = useTheme();
  const { currency } = useContext(PreferencesContext);

  // Conversão de moeda com base nas taxas de câmbio (base: EUR)
  const exchangeRates = { EUR: 1, USD: 1.08, GBP: 0.86 };
  const rate = exchangeRates[currency] || 1;

  const convertAmount = (value) => value * rate;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: currency,
    }).format(convertAmount(value));
  };

  // Formatar valor já convertido (para gráficos cujos dados já foram convertidos)
  const formatConverted = (value) => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const { data: allTransactions = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Filtrar transações com base nos filtros selecionados
  const getFilteredTransactions = () => {
    return allTransactions.filter((tx) => {
      // Filtro de categoria
      if (selectedCategory && tx.category !== selectedCategory) {
        return false;
      }

      // Filtro de data
      const txDate = new Date(tx.date);
      if (dateStart) {
        const start = new Date(dateStart);
        if (txDate < start) {
          return false;
        }
      }
      if (dateEnd) {
        const end = new Date(dateEnd);
        end.setHours(23, 59, 59, 999); // Include the entire day
        if (txDate > end) {
          return false;
        }
      }

      return true;
    });
  };

  const filteredTransactions = getFilteredTransactions();

  // Mapa de slug para nome legível das categorias
  const categoryMap = {};
  categories.forEach((cat) => {
    categoryMap[cat.slug] = cat.name || cat.label;
  });
  const getCategoryName = (slug) => {
    if (categoryMap[slug]) return categoryMap[slug];
    // Capitalizar fallback para slugs sem mapeamento
    return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
  };

  // Cores adaptadas ao tema atual (claro/escuro)
  const getThemeColors = () => {
    if (theme === "dark") {
      return {
        text: "#e8eaed",
        grid: "#2c3142",
        primary: "#5a8aff",
        secondary: "#b0b5c1",
      };
    }
    return {
      text: "#212529",
      grid: "#e0e4ea",
      primary: "#4a78e0",
      secondary: "#5a6473",
    };
  };

  const colors = getThemeColors();

  // Paleta de cores para gráficos de pizza/doughnut
  const chartColors = [
    "#4a78e0",
    "#5a8aff",
    "#ff6b6b",
    "#ffd93d",
    "#6bcf7f",
    "#ff8566",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
    "#f59e0b",
  ];

  // ==================== DADOS PARA BAR CHART ====================
  // Agrupa despesas e receitas por dia da semana
  const getExpenseAndIncomeByDay = () => {
    const dayData = {
      "Segunda": { expenses: 0, income: 0 },
      "Terça": { expenses: 0, income: 0 },
      "Quarta": { expenses: 0, income: 0 },
      "Quinta": { expenses: 0, income: 0 },
      "Sexta": { expenses: 0, income: 0 },
      "Sábado": { expenses: 0, income: 0 },
      "Domingo": { expenses: 0, income: 0 },
    };

    filteredTransactions.forEach((tx) => {
      const date = new Date(tx.date);
      const dayIndex = date.getDay();
      const dayName = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"][dayIndex];
      
      if (tx.amount < 0) {
        dayData[dayName].expenses += Math.abs(tx.amount);
      } else {
        dayData[dayName].income += tx.amount;
      }
    });

    return dayData;
  };

  const dayData = getExpenseAndIncomeByDay();
  const barChartData = {
    labels: Object.keys(dayData),
    datasets: [
      {
        label: "Despesas",
        data: Object.values(dayData).map(d => convertAmount(d.expenses)),
        backgroundColor: "#ff6b6b",
        borderColor: "#ff6b6b",
        borderWidth: 1,
      },
      {
        label: "Receitas",
        data: Object.values(dayData).map(d => convertAmount(d.income)),
        backgroundColor: "#6bcf7f",
        borderColor: "#6bcf7f",
        borderWidth: 1,
      },
    ],
  };

  // ==================== DADOS PARA DOUGHNUT EXPENSES ====================
  // Distribuição de despesas por categoria
  const getExpensesByCategory = () => {
    const expensesByCategory = {};

    filteredTransactions.forEach((tx) => {
      if (tx.amount < 0) {
        const category = tx.category || "Sem categoria";
        expensesByCategory[category] =
          (expensesByCategory[category] || 0) + Math.abs(tx.amount);
      }
    });

    return expensesByCategory;
  };

  const expensesByCategory = getExpensesByCategory();
  const totalExpenses = Object.values(expensesByCategory).reduce((a, b) => a + b, 0);
  
  const expensesDoughnutData = {
    labels: Object.keys(expensesByCategory).map(getCategoryName),
    datasets: [
      {
        data: Object.values(expensesByCategory).map(v => convertAmount(v)),
        backgroundColor: chartColors.slice(0, Object.keys(expensesByCategory).length),
        borderColor: colors.grid,
        borderWidth: 2,
      },
    ],
  };

  // ==================== DADOS PARA DOUGHNUT INCOME ====================
  // Distribuição de receitas por categoria
  const getIncomeByCategory = () => {
    const incomeByCategory = {};

    filteredTransactions.forEach((tx) => {
      if (tx.amount > 0) {
        const category = tx.category || "Sem categoria";
        incomeByCategory[category] =
          (incomeByCategory[category] || 0) + tx.amount;
      }
    });

    return incomeByCategory;
  };

  const incomeByCategory = getIncomeByCategory();
  const totalIncome = Object.values(incomeByCategory).reduce((a, b) => a + b, 0);
  
  const incomeDoughnutData = {
    labels: Object.keys(incomeByCategory).map(getCategoryName),
    datasets: [
      {
        data: Object.values(incomeByCategory).map(v => convertAmount(v)),
        backgroundColor: chartColors.slice(0, Object.keys(incomeByCategory).length),
        borderColor: colors.grid,
        borderWidth: 2,
      },
    ],
  };

  // ==================== DADOS PARA LINE CHART ====================
  // Evolução do saldo ao longo do tempo
  const getBalanceEvolution = () => {
    const sortedTransactions = [...filteredTransactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    let balance = 0;
    const balanceByDate = {};

    sortedTransactions.forEach((tx) => {
      balance += tx.amount;
      const date = tx.date;
      balanceByDate[date] = balance;
    });

    return balanceByDate;
  };

  // Evolução de despesas acumuladas ao longo do tempo
  const getExpenseEvolution = () => {
    const sortedTransactions = [...filteredTransactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    let totalExpense = 0;
    const expenseByDate = {};

    sortedTransactions.forEach((tx) => {
      if (tx.amount < 0) {
        totalExpense += Math.abs(tx.amount);
      }
      const date = tx.date;
      expenseByDate[date] = totalExpense;
    });

    return expenseByDate;
  };

  const balanceEvolution = getBalanceEvolution();
  const expenseEvolution = getExpenseEvolution();
  const allDates = [...new Set([...Object.keys(balanceEvolution), ...Object.keys(expenseEvolution)])].sort();
  
  const lineChartData = {
    labels: allDates,
    datasets: [
      {
        label: "Evolução do Saldo",
        data: allDates.map(date => balanceEvolution[date] != null ? convertAmount(balanceEvolution[date]) : null),
        borderColor: colors.primary,
        backgroundColor: `${colors.primary}20`,
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: colors.primary,
        pointBorderColor: colors.primary,
        pointRadius: 4,
      },
      {
        label: "Evolução de Despesas",
        data: allDates.map(date => expenseEvolution[date] != null ? convertAmount(expenseEvolution[date]) : null),
        borderColor: "#ff6b6b",
        backgroundColor: "#ff6b6b20",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: "#ff6b6b",
        pointBorderColor: "#ff6b6b",
        pointRadius: 4,
      },
    ],
  };

  // Detectar mobile
  const isMobile = window.innerWidth <= 768;

  // Opções compartilhadas dos gráficos
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: "easeInOutQuad",
    },
    plugins: {
      legend: {
        labels: {
          color: colors.text,
          font: {
            size: isMobile ? 11 : 14,
          },
        },
      },
      tooltip: {
        backgroundColor: colors.grid,
        titleColor: colors.text,
        bodyColor: colors.text,
        borderColor: colors.primary,
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y ?? context.parsed;
            return `${context.dataset.label}: ${formatConverted(value)}`;
          },
        },
      },
    },
  };

  const barOptions = {
    ...commonOptions,
    scales: {
      y: {
        ticks: {
          color: colors.text,
          callback: (value) => formatConverted(value),
          font: { size: isMobile ? 10 : 12 },
          maxTicksLimit: isMobile ? 6 : 10,
        },
        grid: { color: colors.grid },
      },
      x: {
        ticks: {
          color: colors.text,
          font: { size: isMobile ? 9 : 12 },
          maxRotation: isMobile ? 45 : 0,
        },
        grid: { color: colors.grid },
      },
    },
  };

  const lineOptions = {
    ...commonOptions,
    scales: {
      y: {
        ticks: {
          color: colors.text,
          callback: (value) => formatConverted(value),
          font: { size: isMobile ? 10 : 12 },
          maxTicksLimit: isMobile ? 6 : 10,
        },
        grid: { color: colors.grid },
      },
      x: {
        ticks: {
          color: colors.text,
          font: { size: isMobile ? 9 : 12 },
          maxRotation: isMobile ? 45 : 0,
          maxTicksLimit: isMobile ? 8 : 20,
        },
        grid: { color: colors.grid },
      },
    },
  };

  const doughnutOptions = {
    ...commonOptions,
    maintainAspectRatio: true,
    plugins: {
      ...commonOptions.plugins,
      legend: {
        ...commonOptions.plugins.legend,
        position: "bottom",
        labels: {
          ...commonOptions.plugins.legend.labels,
          font: { size: isMobile ? 11 : 14 },
        },
      },
    },
  };

  const pieOptions = {
    ...commonOptions,
    maintainAspectRatio: true,
    plugins: {
      ...commonOptions.plugins,
      legend: {
        ...commonOptions.plugins.legend,
        position: isMobile ? "bottom" : "right",
        labels: {
          ...commonOptions.plugins.legend.labels,
          font: { size: isMobile ? 11 : 14 },
        },
      },
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="statistics-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: '0' }}>Estatísticas</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: showFilters ? '#4a78e0' : '#5a8aff',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4a78e0'}
          onMouseLeave={(e) => e.target.style.backgroundColor = showFilters ? '#4a78e0' : '#5a8aff'}
        >
          <span>{showFilters ? '✕' : '⚙️'}</span>
          {showFilters ? 'Fechar Filtros' : 'Abrir Filtros'}
        </button>
      </div>

      {/* Filtros Colapsáveis */}
      {showFilters && (
        <>
      {/* Filtro por Data */}
      <div className="filter-section" style={{
        backgroundColor: theme === 'dark' ? '#252d3d' : '#f5f7fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '25px'
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '15px', marginTop: '0' }}>Filtrar por Data</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '15px',
          alignItems: 'flex-end'
        }}>
          {/* Filtro Data Início */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', textTransform: 'uppercase', fontSize: '12px', opacity: '0.8' }}>
              Data Início
            </label>
            <input
              type="date"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: `1px solid ${theme === 'dark' ? '#3a4454' : '#ddd'}`,
                backgroundColor: theme === 'dark' ? '#1e232f' : '#fff',
                color: theme === 'dark' ? '#e8eaed' : '#212529'
              }}
            />
          </div>

          {/* Filtro Data Fim */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', textTransform: 'uppercase', fontSize: '12px', opacity: '0.8' }}>
              Data Fim
            </label>
            <input
              type="date"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: `1px solid ${theme === 'dark' ? '#3a4454' : '#ddd'}`,
                backgroundColor: theme === 'dark' ? '#1e232f' : '#fff',
                color: theme === 'dark' ? '#e8eaed' : '#212529'
              }}
            />
          </div>

          {/* Botão Limpar Filtros */}
          <button
            onClick={() => {
              setSelectedCategory("");
              setDateStart("");
              setDateEnd("");
            }}
            style={{
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#5a8aff',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#4a78e0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#5a8aff'}
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* Filtro por Categoria */}
      <div className="filter-section" style={{
        backgroundColor: theme === 'dark' ? '#252d3d' : '#f5f7fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '25px'
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '15px', marginTop: '0' }}>Filtrar por Categoria</h2>
        
        {/* Despesas */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ color: '#ff6b6b', fontWeight: '600', fontSize: '14px', marginBottom: '10px', textTransform: 'uppercase' }}>DESPESAS</p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            {categories
              .filter((cat) => cat.type === 'expense')
              .map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(selectedCategory === cat.slug ? "" : cat.slug)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '20px',
                    border: `2px solid ${selectedCategory === cat.slug ? '#5a8aff' : theme === 'dark' ? '#3a4454' : '#ddd'}`,
                    backgroundColor: selectedCategory === cat.slug ? '#5a8aff' : 'transparent',
                    color: selectedCategory === cat.slug ? '#fff' : theme === 'dark' ? '#e8eaed' : '#212529',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '13px',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== cat.slug) {
                      e.target.style.borderColor = '#5a8aff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== cat.slug) {
                      e.target.style.borderColor = theme === 'dark' ? '#3a4454' : '#ddd';
                    }
                  }}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
          </div>
        </div>

        {/* Receitas */}
        <div>
          <p style={{ color: '#6bcf7f', fontWeight: '600', fontSize: '14px', marginBottom: '10px', textTransform: 'uppercase' }}>RECEITAS</p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            {categories
              .filter((cat) => cat.type === 'income')
              .map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(selectedCategory === cat.slug ? "" : cat.slug)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '20px',
                    border: `2px solid ${selectedCategory === cat.slug ? '#5a8aff' : theme === 'dark' ? '#3a4454' : '#ddd'}`,
                    backgroundColor: selectedCategory === cat.slug ? '#5a8aff' : 'transparent',
                    color: selectedCategory === cat.slug ? '#fff' : theme === 'dark' ? '#e8eaed' : '#212529',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '13px',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== cat.slug) {
                      e.target.style.borderColor = '#5a8aff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== cat.slug) {
                      e.target.style.borderColor = theme === 'dark' ? '#3a4454' : '#ddd';
                    }
                  }}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
          </div>
        </div>
      </div>
        </>
      )}

      {/* Mensagem quando não há dados */}
      {filteredTransactions.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          backgroundColor: theme === 'dark' ? '#252d3d' : '#f5f7fa',
          borderRadius: '8px',
          color: theme === 'dark' ? '#b0b5c1' : '#5a6473'
        }}>
          <p>Nenhuma transação encontrada com os filtros selecionados.</p>
        </div>
      ) : (
        <>
      <div className="chart-card full-width">
        <h2>Visão Geral Financeira</h2>
        <div className="chart-wrapper">
          <Bar data={barChartData} options={barOptions} />
        </div>
      </div>

      {/* Two Doughnut Charts Side by Side */}
      <div className="charts-grid-two">
        {/* Expenses Doughnut */}
        <div className="chart-card">
          <h2>Despesas por Categoria</h2>
          <div className="doughnut-wrapper">
            <Doughnut data={expensesDoughnutData} options={doughnutOptions} />
          </div>
          <div className="chart-total">
            <div className="total-amount">{formatCurrency(totalExpenses)}</div>
            <div className="total-label">Total</div>
          </div>
        </div>

        {/* Income Pie Chart */}
        <div className="chart-card">
          <h2>Receitas por Categoria</h2>
          <div className="doughnut-wrapper">
            <Pie data={incomeDoughnutData} options={pieOptions} />
          </div>
          <div className="chart-total">
            <div className="total-amount">{formatCurrency(totalIncome)}</div>
            <div className="total-label">Total</div>
          </div>
        </div>
      </div>

      {/* Line Chart - Full Width */}
      <div className="chart-card full-width">
        <h2>Evolução do Saldo</h2>
        <div className="chart-wrapper">
          <Line data={lineChartData} options={lineOptions} />
        </div>
      </div>
        </>
      )}
    </div>
  );
};

export default Statistics;
