// Componente contentor reutilizável para listas de transações
// Envolve o conteúdo num card com scroll, utilizado em várias páginas da aplicação
const TransactionListCard = ({ children, className = "" }) => {
  return <div className={`transaction-list-card ${className}`}>{children}</div>;
};

export default TransactionListCard;
