// Componente para exibir transações recentes em formato de cards
import TransactionListCard from './TransactionListCard'

const RecentTransactions = ({ transactions = [], categories = [] }) => {
  const getCategory = (categorySlug) => {
    return categories.find(cat => cat.slug === categorySlug)
  }

  const formatDate = (dateString) => {
    return new Date(dateString || new Date()).toLocaleDateString('pt-PT')
  }

  if (transactions.length === 0) {
    return (
      <TransactionListCard>
        <p className="no-transactions">Nenhuma transação encontrada</p>
      </TransactionListCard>
    )
  }

  return (
    <TransactionListCard className="recent-transactions-card">
      <div className="recent-transactions">
        {[...transactions]
          .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
          .map(transaction => {
            const isIncome = transaction.amount > 0
            const category = getCategory(transaction.category)
            const categoryName = category?.name || transaction.category || 'Sem categoria'
            const categoryIcon = category?.iconUrl

            return (
              <div 
                key={transaction.id} 
                className={`recent-transaction-card ${isIncome ? 'income' : 'expense'}`}
              >
                <div className="card-left-border"></div>
                
                <div className="card-content">
                  <h4 className="transaction-title">{transaction.description}</h4>
                  
                  <div className="card-details">
                    <div className="transaction-meta">
                      <p className="transaction-category">
                        {categoryIcon && (
                          <img 
                            src={categoryIcon} 
                            alt={categoryName} 
                            className="category-icon"
                          />
                        )}
                        <span>{categoryName}</span>
                      </p>
                      <p className="transaction-date">{formatDate(transaction.date || transaction.createdAt)}</p>
                    </div>
                    
                    <div className={`transaction-amount ${isIncome ? 'income' : 'expense'}`}>
                      {isIncome ? '+' : ''}{Math.abs(transaction.amount).toFixed(2)}€
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </TransactionListCard>
  )
}

export default RecentTransactions;
