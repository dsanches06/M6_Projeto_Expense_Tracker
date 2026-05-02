import { useTheme } from "../context/ThemeContext";

// Componente reutilizável de filtro de data colapsável
// Apresenta inputs de data início e fim com botão de limpar
const CollapsibleDateFilter = ({ startDate, endDate, onDateChange, onClear }) => {
  const { theme } = useTheme();

  const handleStartDateChange = (e) => {
    onDateChange(e.target.value, endDate);
  };

  const handleEndDateChange = (e) => {
    onDateChange(startDate, e.target.value);
  };

  return (
    <div
      className="collapsible-date-filter"
      style={{
        backgroundColor: theme === "dark" ? "#252d3d" : "#f5f7fa",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "25px",
      }}
    >
      <h2 style={{ fontSize: "18px", marginBottom: "15px", marginTop: "0" }}>
        Filtrar por Data
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "15px",
          alignItems: "flex-end",
        }}
      >
        {/* Data Início */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "500",
              textTransform: "uppercase",
              fontSize: "12px",
              opacity: "0.8",
            }}
          >
            Data Início
          </label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: `1px solid ${
                theme === "dark" ? "#3a4454" : "#ddd"
              }`,
              backgroundColor: theme === "dark" ? "#1e232f" : "#fff",
              color: theme === "dark" ? "#e8eaed" : "#212529",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Data Fim */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "500",
              textTransform: "uppercase",
              fontSize: "12px",
              opacity: "0.8",
            }}
          >
            Data Fim
          </label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: `1px solid ${
                theme === "dark" ? "#3a4454" : "#ddd"
              }`,
              backgroundColor: theme === "dark" ? "#1e232f" : "#fff",
              color: theme === "dark" ? "#e8eaed" : "#212529",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Clear Button */}
        <button
          onClick={onClear}
          style={{
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#5a8aff",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "600",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#4a78e0")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#5a8aff")}
        >
          Limpar Datas
        </button>
      </div>
    </div>
  );
};

export default CollapsibleDateFilter;
