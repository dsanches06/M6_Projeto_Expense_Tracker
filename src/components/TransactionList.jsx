import TransactionItem from "./TransactionItem.jsx";

// lista transações
const TransactionList = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className="transaction-list-container">
      <h3>Transações</h3>
      <div className="transaction-list">
        {transactions.length === 0 ? (
          <p className="no-transactions">Nenhuma transação adicionada</p>
        ) : (
          transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDelete={() => onDeleteTransaction(transaction.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;