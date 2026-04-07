// um item individual (verde/vermelho)

const TransactionItem = ({ transaction, onDelete }) => {
  const isIncome = transaction.type === "income";
  const colorClass = isIncome ? "income" : "expense";

  return (
    <div className={`transaction-item ${colorClass}`}>
      <div className="transaction-content">
        <div className="transaction-info">
          <h4>{transaction.description}</h4>
          <p className="transaction-date">{transaction.date}</p>
        </div>
        <div className={`transaction-amount ${colorClass}`}>
          {isIncome ? "+" : "-"}
          {transaction.amount.toFixed(2)}€
        </div>
      </div>

      <button className="btn-delete" onClick={onDelete}>
        Apagar
      </button>
    </div>
  );
};

export default TransactionItem;
