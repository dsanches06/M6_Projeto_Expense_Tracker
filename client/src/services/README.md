# Serviços (API) - Documentação

---

## api.js

> Funções que comunicam com a API REST do servidor (localhost:3001). Usadas pelo React Query nos componentes.

```js
const API_URL = 'http://localhost:3001'                              // URL base do servidor backend

// Buscar todas as transações (GET /api/transactions)
// Retorna uma Promise com o array de transações
// A filtragem por datas é feita no frontend (no Dashboard e History), não na API
export const getTransactions = () =>
  fetch(`${API_URL}/api/transactions`).then(res => res.json())       // faz GET e converte a resposta JSON em objeto JS

// Criar uma transação (POST /api/transactions)
// Recebe um objeto "data" com { description, amount, category, date }
export const createTransaction = (data) =>
  fetch(`${API_URL}/api/transactions`, {
    method: 'POST',                                                  // método HTTP POST (criar recurso)
    headers: { 'Content-Type': 'application/json' },                 // indica que o body é JSON
    body: JSON.stringify(data),                                      // converte o objeto JS em string JSON
  }).then(res => res.json())                                         // retorna a transação criada

// Apagar uma transação (DELETE /api/transactions/:id)
// Recebe o id da transação a apagar
export const deleteTransaction = (id) =>
  fetch(`${API_URL}/api/transactions/${id}`, { method: 'DELETE' })   // método HTTP DELETE (sem body)

// Buscar todas as categorias (GET /api/categories)
// Retorna uma Promise com o array de categorias { id, name, slug, type, icon, iconUrl }
export const getCategories = () =>
  fetch(`${API_URL}/api/categories`).then(res => res.json())         // faz GET e converte JSON
```
