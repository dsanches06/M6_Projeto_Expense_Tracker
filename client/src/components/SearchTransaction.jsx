// componente de pesquisa de transações
// permite filtrar por texto e por tipo (todas, receitas, despesas)

import { useState } from "react";

const SearchTransaction = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("all");

  // atualizar pesquisa quando o texto ou tipo muda
  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    onSearch(text, filterType);
  };

  const handleFilterChange = (e) => {
    const type = e.target.value;
    setFilterType(type);
    onSearch(searchText, type);
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Pesquisar transações..."
          value={searchText}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <select
        value={filterType}
        onChange={handleFilterChange}
        className="search-filter"
      >
        <option value="all">Todas</option>
        <option value="income">Receitas</option>
        <option value="expense">Despesas</option>
      </select>
    </div>
  );
};

export default SearchTransaction;
