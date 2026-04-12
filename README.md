# 💰 Expense Tracker

Uma aplicação web completa para gerenciar despesas e receitas pessoais, desenvolvida como projeto final do Módulo 6 - Front-End Developer do Curso UpSkill.

## 🎯 Visão Geral

**Expense Tracker** é uma solução full-stack moderna para controle financeiro pessoal com:
- 🎨 Interface intuitiva e responsiva
- 🌓 Tema escuro/claro
- 📊 Dashboard com análise visual
- 💾 Backend em Node.js com JSON como banco de dados
- ⚡ Frontend em React com Vite

## 🏗️ Arquitetura

```
Expense Tracker/
├── client/                    # Frontend React + Vite
│   ├── src/
│   │   ├── pages/            # Dashboard, History, Settings, etc.
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── context/          # Context API (tema, preferências)
│   │   ├── services/         # API client
│   │   ├── styles/           # CSS organizado por feature
│   │   └── App.jsx           # Roteamento principal
│   ├── vite.config.js        # Configuração Vite
│   └── package.json          # Dependências client
│
└── server/                    # Backend Node.js + Express
    ├── src/
    │   ├── routes/           # API routes (transactions, categories)
    │   ├── data/
    │   │   ├── db.js         # Lógica de arquivo JSON
    │   │   ├── categories.js # Dados das categorias
    │   │   └── transactions.json # Base de dados
    │   └── server.js         # Servidor Express
    ├── package.json          # Dependências server
    └── README.md             # Documentação server
```

## 🚀 Início Rápido

### Requisitos
- Node.js 16+
- npm ou yarn
- Terminal com acesso aos dois diretórios

### 1️⃣ Setup do Server

```bash
cd server
npm install
npm start
```

O servidor iniciará em `http://localhost:3001`

### 2️⃣ Setup do Client

Em outro terminal:

```bash
cd client
npm install
npm run dev
```

A aplicação abrirá em `http://localhost:5173`

## ✨ Funcionalidades Principais

### 📊 Dashboard
- Resumo com saldo, total de receitas e despesas
- Filtro por intervalo de datas
- Filtro por categorias
- Lista de transações recentes em formato de cards
- Cálculos automáticos em tempo real

### ➕ Adicionar Transação
- Formulário intuitivo
- Campos: Descrição, Valor, Tipo (receita/despesa), Categoria, Data
- Categorização automática com ícones
- Validação de dados
- Redirecionamento automático após salvamento

### 📜 Histórico
- Tabela completa com todas as transações
- Busca por descrição
- Filtro por tipo (receita, despesa, todas)
- Ordenaçao por data (mais recente primeiro)
- Ações: eliminar transações
- Lista scrollable para muitas transações

### ⚙️ Configurações
- Definir nome do utilizador
- Escolher moeda preferida
- Persistência com localStorage
- Suporte a temas

### 🎨 Tema
- Alternância entre tema claro e escuro
- Persistência de preferência
- Cores personalizáveis via CSS variables

## 🔄 Fluxo de Dados

```
User Action
    ↓
Component (React)
    ↓
API Client (fetch)
    ↓
Express Server
    ↓
JSON Database
    ↓
Response JSON
    ↓
React Query (cache)
    ↓
UI Update
```

## 📡 API REST

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### Transações
```
GET    /transactions          # Listar todas
POST   /transactions          # Criar nova
DELETE /transactions/:id      # Remover por ID
```

#### Categorias
```
GET    /categories                # Listar categorias
GET    /categories/:slug/icon     # Obter ícone (SVG)
```

### Exemplo de Request

```bash
# Criar transação
curl -X POST http://localhost:3001/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Supermercado",
    "amount": -45.50,
    "category": "alimentacao",
    "date": "2026-04-12"
  }'

# Resposta
{
  "id": "1712937600000",
  "description": "Supermercado",
  "amount": -45.50,
  "category": "alimentacao",
  "date": "2026-04-12",
  "createdAt": "2026-04-12T10:30:00.000Z"
}
```

## 📂 Estrutura de Dados

### Transação
```javascript
{
  id: String,
  description: String,
  amount: Number,           // Positivo = receita, Negativo = despesa
  category: String,         // slug (alimentacao, transporte, etc)
  date: String,            // ISO format (YYYY-MM-DD)
  createdAt: String        // ISO datetime
}
```

### Categoria
```javascript
{
  id: Number,
  name: String,            // "Alimentação"
  slug: String,            // "alimentacao"
  label: String,           // "Alimentação"
  icon: String,            // "🍔" ou emoji
  color: String,           // "#FF6B6B"
  iconUrl: String          // "http://localhost:3001/api/categories/alimentacao/icon"
}
```

## 🛠️ Tecnologias

### Frontend
- **React 18** - Framework UI
- **Vite** - Build tool e dev server
- **React Router** - Roteamento
- **TanStack React Query** - Data fetching & cache
- **CSS3** - Estilos com variables
- **Fetch API** - HTTP requests

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **cors** - Middleware CORS
- **File System** - JSON como BD
- **File Serving** - Ícones SVG

## 🎓 Conceitos Demonstrados

### Frontend
✅ Componentização React
✅ Hooks (useState, useContext, useReducer, useEffect)
✅ Context API para estado global
✅ Roteamento com React Router
✅ Data fetching com React Query
✅ Formulários controlados
✅ Tema dinâmico com CSS variables
✅ Busca e filtros em tempo real
✅ Responsive design
✅ Organização CSS modular

### Backend
✅ Criação de API REST
✅ Middleware Express
✅ CORS configuration
✅ Leitura/escrita de arquivos
✅ Manipulação de JSON
✅ Roteamento Express
✅ Servir arquivos estáticos
✅ Error handling

## 🐛 Troubleshooting

### "Failed to resolve import"
Verifique os caminhos dos imports, especialmente em componentes em subpastas.

### "Cannot GET /api/transactions"
Certifique-se que o servidor está rodando em `localhost:3001`

### CORS Error
O servidor tem CORS configurado para aceitar requests de `localhost:5173`

### Transações não aparecem
- Verifique se `transactions.json` existe em `server/src/data/`
- Certifique-se que o servidor tem permissão de leitura/escrita

##  Segurança

### Considerações Atuais
- ❌ Sem autenticação (todos podem ver todas as transações)
- ⚠️ Dados em arquivo JSON (não é production-ready)

### Melhorias para Produção
- ✅ Implementar JWT authentication
- ✅ Usar banco de dados real (MongoDB, PostgreSQL)
- ✅ Hashear senhas
- ✅ Validação de entrada com schemas
- ✅ Rate limiting
- ✅ HTTPS forcing

## 📚 Recursos Adicionais

### Documentação
- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Express Docs](https://expressjs.com)
- [React Router](https://reactrouter.com)
- [React Query](https://tanstack.com/query/latest)

### Ferramentas Úteis
- [VS Code](https://code.visualstudio.com)
- [Thunder Client](https://www.thunderclient.com/) - API testing
- [Postman](https://www.postman.com/) - API testing
- [React DevTools](https://react-devtools-tutorial.vercel.app/)

## 📋 Checklist de Features

- [x] Dashboard com resumo
- [x] Adicionar transações
- [x] Listar transações (history)
- [x] Eliminar transações
- [x] Filtro por data
- [x] Filtro por categoria
- [x] Busca por descrição
- [x] Tema escuro/claro
- [x] Ícones de categorias
- [x] Preferências do utilizador
- [x] API REST
- [x] Responsividade
- [x] Documentação

## 🚀 Próximos Passos (Melhorias Futuras)

- [ ] Bar Chart - Despesas por dia/semana
- [ ] Doughnut Chart no Dashboard - Distribuição de despesas por categoria
- [ ] Pie Chart - Distribuição percentual de gastos
- [ ] Line Chart - Evolução do saldo/patrimônio


## 👨‍💻 Desenvolvimento

Este projeto é para fins educacionais.

## 👥 Autores

Desenvolvido como projeto final do Módulo 6 - Front-End Developer do Curso UpSkill.

- **Abel Pinto**
- **Danilson Sanches**

