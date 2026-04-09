import TransactionItem from "./TransactionItem";

// lista transações
const TransactionList = ({ transactions, onDeleteTransaction, onEditTransaction }) => {
  return (
    <div className="transaction-list-container">
      <h3>Transações</h3>
      <div className="transaction-list">
        {transactions.length === 0 ? (
          <p className="no-transactions">Nenhuma transação encontrada</p>
        ) : (
          transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDelete={() => onDeleteTransaction(transaction.id)}
              onEdit={() => onEditTransaction(transaction)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;