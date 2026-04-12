import TransactionItem from "./TransactionItem";

// lista transações - simples, apenas mostra a lista
const TransactionList = ({ transactions, categories = [], onDelete }) => {
  return (
    <div className="transaction-list-container">
      <div className="transaction-list">
        {transactions.length === 0 ? (
          <p className="no-transactions">Nenhuma transação encontrada</p>
        ) : (
          transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              categories={categories}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;