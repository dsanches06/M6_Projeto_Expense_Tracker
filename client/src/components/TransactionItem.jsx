// um item individual (verde/vermelho) com botões de editar e apagar

const TransactionItem = ({ transaction, onDelete, onEdit }) => {
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

      <div className="transaction-actions">
        <button className="btn-edit" onClick={onEdit}>
          Editar
        </button>
        <button className="btn-delete" onClick={onDelete}>
          Apagar
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
