import { useRef, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createTransaction, getCategories } from '../services/api';

const AddTransaction = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const descriptionInputRef = useRef(null);

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'income',
    category_id: '',
    date: new Date().toISOString().split('T')[0],
  });

  // Buscar categorias
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  // Mutação para criar transação
  const mutation = useMutation({
    mutationFn: (data) => {
      // Converter type em amount com sinal
      const amount = data.type === 'income' 
        ? parseFloat(data.amount)
        : -parseFloat(data.amount);

      // Encontrar a categoria pelo id para pegar o slug
      const selectedCategory = categories.find(cat => String(cat.id) === String(data.category_id));
      const categorySlug = selectedCategory?.slug || 'outro';

      return createTransaction({
        description: data.description,
        amount,
        category: categorySlug,
        date: data.date,
      });
    },
    onSuccess: () => {
      // Invalidar cache de transações
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      // Redirecionar para dashboard
      navigate('/');
    },
  });

  // Focar no input de descrição quando a página monta
  useEffect(() => {
    descriptionInputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.description.trim() && formData.amount) {
      mutation.mutate(formData);
    }
  };

  return (
    <div className="add-transaction-container">
      <form onSubmit={handleSubmit} className="add-transaction-form">
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            ref={descriptionInputRef}
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ex: Supermarket purchase"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category_id">Category</label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn-submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Saving...' : 'Save Transaction'}
          </button>
        </div>

        {mutation.isError && (
          <div className="error-message">
            Erro ao criar transação: {mutation.error.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddTransaction;
