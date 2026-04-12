import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTransactions, deleteTransaction, getCategories } from '../services/api';
import TransactionListCard from '../components/ui/TransactionListCard';
import '../styles/history.css';

const History = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Buscar transações
  const { data: transactions = [], isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });

  // Buscar categorias
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  // Mutação para apagar transação
  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  // Filtrar transações
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === 'all' ||
      (filterType === 'income' && tx.amount > 0) ||
      (filterType === 'expense' && tx.amount < 0);

    return matchesSearch && matchesType;
  });

  // Ordenar por data decrescente
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const handleDeleteTransaction = (id) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="loading">A carregar histórico...</div>;
  }

  if (error) {
    return <div className="error">Erro ao carregar histórico</div>;
  }

  return (
    <div className="history-container">
      <div className="history-card">
        <h1 className="history-title">Transaction History</h1>

        {/* Filters */}
        <section className="history-filters">
          <input
            type="text"
            placeholder="Search by description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <div className="filter-buttons">
            <button
              className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filterType === 'income' ? 'active' : ''}`}
              onClick={() => setFilterType('income')}
            >
              Income
            </button>
            <button
              className={`filter-btn ${filterType === 'expense' ? 'active' : ''}`}
              onClick={() => setFilterType('expense')}
            >
              Expenses
            </button>
          </div>
        </section>

        {/* Transactions List */}
        {sortedTransactions.length > 0 ? (
          <TransactionListCard className="history-transactions-card">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((tx) => {
                const category = categories.find(cat => cat.slug === tx.category);
                const categoryName = category?.name || tx.category || '-';
                const categoryIcon = category?.iconUrl;
                
                return (
                  <tr key={tx.id} className={tx.amount > 0 ? 'income-row' : 'expense-row'}>
                    <td>{new Date(tx.date).toLocaleDateString('en-GB')}</td>
                    <td>{tx.description}</td>
                    <td>
                      {categoryIcon && <img src={categoryIcon} alt={categoryName} style={{ width: '20px', height: '20px', marginRight: '8px', verticalAlign: 'middle' }} />}
                      {categoryName}
                    </td>
                    <td className={tx.amount > 0 ? 'amount-positive' : 'amount-negative'}>
                      {tx.amount > 0 ? '+' : ''} {Math.abs(tx.amount).toFixed(2)}€
                    </td>
                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteTransaction(tx.id)}
                        disabled={deleteMutation.isPending}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </TransactionListCard>
        ) : (
          <div className="empty-state">
            <p>No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
