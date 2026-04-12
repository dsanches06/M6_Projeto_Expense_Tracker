// Componente reutilizável para envolver listas de transações em um card scrollable
const TransactionListCard = ({ children, className = '' }) => {
  return (
    <div className={`transaction-list-card ${className}`}>
      {children}
    </div>
  )
}

export default TransactionListCard
