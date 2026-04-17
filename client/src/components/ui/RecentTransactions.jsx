// Componente para exibir transações recentes em formato de cards
// Mostra as últimas transações ordenadas por data de criação (mais recentes primeiro)
// Cada transação é apresentada com descrição, categoria, data e valor formatado
import { useContext } from 'react'
import { PreferencesContext } from '../../context/PreferencesContext'
import TransactionListCard from './TransactionListCard'

const RecentTransactions = ({ transactions = [], categories = [] }) => {
  const { currency } = useContext(PreferencesContext)

  // Formatar valores monetários de acordo com a moeda selecionada
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: currency,
    }).format(value)
  }

  // Obter os dados da categoria a partir do slug
  const getCategory = (categorySlug) => {
    return categories.find(cat => cat.slug === categorySlug)
  }

  // Formatar data para o formato português (dd/mm/aaaa)
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
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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
                      {isIncome ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
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
