import TransactionItem from "./TransactionItem";

// Componente que renderiza a lista completa de transações
// Itera sobre o array de transações e renderiza um TransactionItem para cada uma
// Mostra uma mensagem quando não existem transações
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
