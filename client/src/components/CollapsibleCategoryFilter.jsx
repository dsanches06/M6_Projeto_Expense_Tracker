import { useTheme } from "../context/ThemeContext";

// Componente reutilizável de filtro de categoria colapsável
// Permite selecionar múltiplas categorias
// selectedCategories é um array de slugs de categorias selecionadas
const CollapsibleCategoryFilter = ({
  categories,
  selectedCategories = [],
  onCategoryChange,
}) => {
  const { theme } = useTheme();

  // Separar categorias por tipo
  const expenseCategories = categories.filter((cat) => cat.type === "expense");
  const incomeCategories = categories.filter((cat) => cat.type === "income");

  const handleCategoryClick = (categorySlug) => {
    const newSelected = [...selectedCategories];
    const index = newSelected.indexOf(categorySlug);

    if (index > -1) {
      // Remove se já está selecionado
      newSelected.splice(index, 1);
    } else {
      // Adiciona se não está selecionado
      newSelected.push(categorySlug);
    }

    onCategoryChange(newSelected);
  };

  const isSelected = (categorySlug) => selectedCategories.includes(categorySlug);

  const renderCategoryButton = (category) => (
    <button
      key={category.slug}
      onClick={() => handleCategoryClick(category.slug)}
      style={{
        padding: "8px 14px",
        borderRadius: "20px",
        border: `2px solid ${
          isSelected(category.slug)
            ? "#5a8aff"
            : theme === "dark"
            ? "#3a4454"
            : "#ddd"
        }`,
        backgroundColor: isSelected(category.slug)
          ? "#5a8aff"
          : "transparent",
        color: isSelected(category.slug)
          ? "#fff"
          : theme === "dark"
          ? "#e8eaed"
          : "#212529",
        cursor: "pointer",
        fontWeight: "500",
        fontSize: "13px",
        transition: "all 0.2s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (!isSelected(category.slug)) {
          e.target.style.borderColor = "#5a8aff";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected(category.slug)) {
          e.target.style.borderColor = theme === "dark" ? "#3a4454" : "#ddd";
        }
      }}
    >
      {category.icon || "📌"} {category.name}
    </button>
  );

  return (
    <div
      className="collapsible-category-filter"
      style={{
        backgroundColor: theme === "dark" ? "#252d3d" : "#f5f7fa",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "25px",
      }}
    >
      <h2 style={{ fontSize: "18px", marginBottom: "15px", marginTop: "0" }}>
        Filtrar por Categoria
      </h2>

      {/* DESPESAS */}
      {expenseCategories.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <p
            style={{
              color: "#ff6b6b",
              fontWeight: "600",
              fontSize: "14px",
              marginBottom: "10px",
              textTransform: "uppercase",
            }}
          >
            DESPESAS
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {expenseCategories.map(renderCategoryButton)}
          </div>
        </div>
      )}

      {/* RECEITAS */}
      {incomeCategories.length > 0 && (
        <div>
          <p
            style={{
              color: "#6bcf7f",
              fontWeight: "600",
              fontSize: "14px",
              marginBottom: "10px",
              textTransform: "uppercase",
            }}
          >
            RECEITAS
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {incomeCategories.map(renderCategoryButton)}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollapsibleCategoryFilter;
