import { useContext } from "react";
import { PreferencesContext } from "../context/PreferencesContext";

// um item individual (verde/vermelho) com botão de apagar
const TransactionItem = ({ transaction, categories = [], onDelete }) => {
  const { currency } = useContext(PreferencesContext);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: currency,
    }).format(value);
  };
  const isIncome = transaction.amount > 0;
  const colorClass = isIncome ? "income" : "expense";
  const displayDate = new Date(
    transaction.date || transaction.createdAt,
  ).toLocaleDateString("pt-PT");

  // Encontrar categoria pelo slug
  const category = categories.find((cat) => cat.slug === transaction.category);
  const categoryName =
    category?.name || transaction.category || "Sem categoria";
  const categoryIcon = category?.iconUrl;

  return (
    <div className={`transaction-item ${colorClass}`}>
      <div className="transaction-content">
        <div className="transaction-info">
          <h4>{transaction.description}</h4>
          <p className="transaction-category">
            {categoryIcon && (
              <img
                src={categoryIcon}
                alt={categoryName}
                style={{
                  width: "16px",
                  height: "16px",
                  marginRight: "6px",
                  verticalAlign: "middle",
                }}
              />
            )}
            {categoryName}
          </p>
          <p className="transaction-date">{displayDate}</p>
        </div>
        <div className={`transaction-amount ${colorClass}`}>
          {isIncome ? "+" : ""}
          {formatCurrency(Math.abs(transaction.amount))}
        </div>
      </div>

      {onDelete && (
        <div className="transaction-actions">
          <button
            className="btn-delete"
            onClick={() => onDelete(transaction.id)}
          >
            🗑️ Apagar
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionItem;
