const CategoryFilter = ({ categories, activeCategory, activeCategoryType, onCategoryChange }) => {
  const expenseCategories = categories.filter((cat) => cat.type === "expense");
  const incomeCategories = categories.filter((cat) => cat.type === "income");

  const isActive = (category) =>
    activeCategory === category.slug && activeCategoryType === category.type;

  const handleClick = (category) => {
    // Se já está ativo, desseleciona (volta a mostrar tudo)
    if (isActive(category)) {
      onCategoryChange({ slug: null, type: null });
    } else {
      onCategoryChange({ slug: category.slug, type: category.type });
    }
  };

  const renderPill = (category) => (
    <button
      key={`${category.type}-${category.slug}`}
      className={`category-pill ${isActive(category) ? "active" : ""}`}
      onClick={() => handleClick(category)}
      title={category.name}
    >
      {category.iconUrl && (
        <img
          src={category.iconUrl}
          alt={category.name}
          style={{
            width: "18px",
            height: "18px",
            marginRight: "6px",
            verticalAlign: "middle",
          }}
        />
      )}
      {category.name}
    </button>
  );

  return (
    <div className="category-filter">
      {expenseCategories.length > 0 && (
        <div className="category-group">
          <span className="category-group-label expense">Despesas</span>
          {expenseCategories.map(renderPill)}
        </div>
      )}

      {incomeCategories.length > 0 && (
        <div className="category-group">
          <span className="category-group-label income">Receitas</span>
          {incomeCategories.map(renderPill)}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
