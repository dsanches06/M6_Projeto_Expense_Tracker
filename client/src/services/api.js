// src/api.js - VERSÃO COMPLETA PARA A V2
const API_URL = 'http://localhost:3001'

// Buscar todas as transações (GET)
// A filtragem por datas é feita no frontend com .filter()
// A API devolve TODAS as transações e nós filtramos no componente
export const getTransactions = () =>
  fetch(`${API_URL}/api/transactions`).then(res => res.json())

// Criar uma transação (POST)
export const createTransaction = (data) =>
  fetch(`${API_URL}/api/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json())

// Apagar uma transação (DELETE)
export const deleteTransaction = (id) =>
  fetch(`${API_URL}/api/transactions/${id}`, { method: 'DELETE' })

// Buscar categorias (GET)
export const getCategories = () =>
  fetch(`${API_URL}/api/categories`).then(res => res.json())