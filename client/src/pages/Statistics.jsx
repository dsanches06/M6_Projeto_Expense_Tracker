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

    allTransactions.forEach((tx) => {
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

    allTransactions.forEach((tx) => {
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

    allTransactions.forEach((tx) => {
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
    const sortedTransactions = [...allTransactions].sort(
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
    const sortedTransactions = [...allTransactions].sort(
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

  // Opções compartilhadas dos gráficos
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: 800,
      easing: "easeInOutQuad",
    },
    plugins: {
      legend: {
        labels: {
          color: colors.text,
          font: {
            size: 14,
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
        ticks: { color: colors.text, callback: (value) => formatConverted(value) },
        grid: { color: colors.grid },
      },
      x: {
        ticks: { color: colors.text },
        grid: { color: colors.grid },
      },
    },
  };

  const lineOptions = {
    ...commonOptions,
    scales: {
      y: {
        ticks: { color: colors.text, callback: (value) => formatConverted(value) },
        grid: { color: colors.grid },
      },
      x: {
        ticks: { color: colors.text },
        grid: { color: colors.grid },
      },
    },
  };

  const doughnutOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      legend: {
        ...commonOptions.plugins.legend,
        position: "bottom",
        labels: {
          ...commonOptions.plugins.legend.labels,
          font: { size: 14 },
        },
      },
    },
  };

  const pieOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      legend: {
        ...commonOptions.plugins.legend,
        position: "right",
        labels: {
          ...commonOptions.plugins.legend.labels,
          font: { size: 14 },
        },
      },
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="statistics-container">
      <h1>Estatísticas</h1>

      {/* Bar Chart - Full Width */}
      <div className="chart-card full-width">
        <h2>Visão Geral Financeira</h2>
        <Bar data={barChartData} options={barOptions} />
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
        <Line data={lineChartData} options={lineOptions} />
      </div>
    </div>
  );
};

export default Statistics;
