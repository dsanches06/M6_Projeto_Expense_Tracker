import { useRef, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { createTransaction, getCategories } from "../services/api";

// Página para adicionar uma nova transação
// Formulário com campos de descrição, valor, tipo (receita/despesa), categoria e data
// Após submissão, invalida o cache e redireciona para o Dashboard
const AddTransaction = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const descriptionInputRef = useRef(null);
  const [descriptionError, setDescriptionError] = useState("");
  const [amountError, setAmountError] = useState("");

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "income",
    category_id: "",
    date: new Date().toISOString().split("T")[0],
  });

  // Buscar categorias
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Mutação para criar transação - converte o tipo em valor com sinal
  const mutation = useMutation({
    mutationFn: (data) => {
      // Converter type em amount com sinal
      const amount =
        data.type === "income"
          ? parseFloat(data.amount)
          : -parseFloat(data.amount);

      // Encontrar a categoria pelo id para pegar o slug
      const selectedCategory = categories.find(
        (cat) => String(cat.id) === String(data.category_id),
      );
      const categorySlug = selectedCategory?.slug || "outro";

      const payload = {
        description: data.description,
        amount,
        category: categorySlug,
        date: data.date,
      };

      return createTransaction(payload).then((res) => {
        return res;
      });
    },
    onSuccess: () => {
      // Invalida o cache - da próxima vez que o Dashboard abrir,
      // o useQuery vai buscar dados frescos à API
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      navigate('/');
    },
    onError: (error) => {
    },
  });

  // Focar no input de descrição quando a página monta
  useEffect(() => {
    descriptionInputRef.current?.focus();
  }, []);

  // Atualizar os dados do formulário (limpa a categoria ao mudar o tipo)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Limpar categoria quando muda o tipo
      ...(name === "type" ? { category_id: "" } : {}),
    }));
  };

  // Submeter o formulário com validação dos campos obrigatórios
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação adicional
    if (!formData.description.trim()) {
      setDescriptionError("A descrição é obrigatória");
      return;
    }
    
    if (formData.description.trim().length < 3) {
      setDescriptionError("A descrição deve ter no mínimo 3 caracteres");
      return;
    }
    
    setDescriptionError("");
    
    if (!formData.amount) {
      setAmountError("O valor é obrigatório");
      return;
    }
    
    if (parseFloat(formData.amount) === 0) {
      setAmountError("O valor não pode ser zero");
      return;
    }
    
    setAmountError("");
    
    if (!formData.category_id) {
      alert("Por favor, seleciona uma categoria");
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <div className="add-transaction-container">
      <form onSubmit={handleSubmit} className="add-transaction-form">
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <input
            ref={descriptionInputRef}
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) => {
              handleChange(e);
              setDescriptionError("");
            }}
            placeholder="Ex: Compras no supermercado"
            required
            style={descriptionError ? { borderColor: "#e74c3c" } : {}}
          />
          {descriptionError && (
            <span style={{ color: "#e74c3c", fontSize: "0.85rem", marginTop: "0.25rem", display: "block" }}>
              {descriptionError}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="amount">Valor</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={(e) => {
              handleChange(e);
              setAmountError("");
            }}
            placeholder="0.00"
            step="0.01"
            required
            style={amountError ? { borderColor: "#e74c3c" } : {}}
          />
          {amountError && (
            <span style={{ color: "#e74c3c", fontSize: "0.85rem", marginTop: "0.25rem", display: "block" }}>
              {amountError}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="type">Tipo</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="income">Receita</option>
            <option value="expense">Despesa</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category_id">Categoria</label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecionar categoria</option>
            {categories
              .filter((cat) => cat.type === formData.type)
              .map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Data</label>
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
            {mutation.isPending ? "A guardar..." : "Guardar Transação"}
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
