const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      <button
        className={`category-pill ${activeCategory === null ? 'active' : ''}`}
        onClick={() => onCategoryChange(null)}
      >
        Todas
      </button>
      {categories.map((category) => (
        <button
          key={category.slug}
          className={`category-pill ${activeCategory === category.slug ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.slug)}
          title={category.name}
        >
          {category.iconUrl && <img src={category.iconUrl} alt={category.name} style={{ width: '18px', height: '18px', marginRight: '6px', verticalAlign: 'middle' }} />}
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
