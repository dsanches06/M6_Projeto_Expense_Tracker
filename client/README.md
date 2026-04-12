# Expense Tracker - Client

Uma aplicação web moderna para gerenciar despesas e receitas com interface intuitiva, tema escuro/claro e análise visual de gastos.

## 🎯 Funcionalidades

- ✅ Dashboard interativo com resumo financeiro
- ✅ Adicionar, editar e remover transações
- ✅ Categorização automática de transações
- ✅ Filtrage por data e categoria
- ✅ Histórico completo de transações com busca
- ✅ Tema escuro e claro
- ✅ Interface responsiva
- ✅ Ícones visuais para categorias
- ✅ Cálculo automático de saldos, receitas e despesas
- ✅ Preferências do utilizador (nome, moeda)

## 🛠️ Tecnologias

- **React 18** - Framework UI
- **Vite** - Build tool e dev server
- **React Router** - Navegação entre páginas
- **TanStack React Query** - Gerenciamento de data fetching e cache
- **CSS3** - Estilos com variáveis e tema dinâmico
- **Fetch API** - Requisições HTTP

## 📋 Pré-requisitos

- Node.js 16+
- npm ou yarn
- Servidor backend rodando em `http://localhost:3001`

## 🚀 Como começar

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar em modo desenvolvimento (reinicia automaticamente ao guardar)
npm run dev

# 3. Ou iniciar em modo normal
npm start
```

O servidor inicia em **http://localhost:5173**

## 📁 Estrutura de Arquivos

```
src/
├── pages/                      # Páginas principais
│   ├── DashBoard.jsx          # Dashboard com resumo e filtros
│   ├── AddTransaction.jsx      # Formulário para adicionar transação
│   ├── History.jsx             # Histórico com tabela e filtros
│   ├── Settings.jsx            # Configurações do utilizador
│   └── MainLayout.jsx          # Layout com navegação
│
├── components/                 # Componentes reutilizáveis
│   ├── RecentTransactions.jsx  # Cards de transações recentes
│   ├── TransactionList.jsx     # Lista simples de transações
│   ├── TransactionItem.jsx     # Item individual de transação
│   ├── TransactionListCard.jsx # Wrapper scrollable para listas
│   ├── Summary.jsx             # Cards de resumo (saldo, receita, despesa)
│   ├── CategoryFilter.jsx      # Filtro por categorias
│   ├── DateRangePicker.jsx     # Seletor de intervalo de datas
│   └── ui/
│       └── Card.jsx            # Componente card base
│
├── context/                    # Context API
│   ├── ThemeContext.jsx        # Gerenciamento do tema
│   └── PreferencesContext.jsx  # Preferências do utilizador
│
├── services/                   # Serviços API
│   └── api.js                  # Funções de fetch para o backend
│
├── reducers/                   # Reducers para estado completo
│   └── filtersReducer.js       # Gerenciar filtros do dashboard
│
├── styles/                     # Arquivos CSS
│   ├── index.css               # Estilos globais
│   ├── dashboard.css           # Estilos do dashboard
│   ├── card.css                # Estilos dos cards
│   ├── history.css             # Estilos da histório
│   ├── theme.css               # Estilos do tema escuro/claro
│   ├── MainLayout.css          # Estilos do layout principal
│   ├── settings.css            # Estilos das configurações
│   ├── about.css               # Estilos da página about
│   ├── contact.css             # Estilos da página contact
│
├── App.jsx                     # Aplicação principal com rotas
├── main.jsx                    # Ponto de entrada
└── assets/                     # Imagens e assets estáticos

public/                         # Arquivos estáticos servidos diretamente
```

## 🔄 Fluxo de Dados

1. **Componentes** fazem requisições via `services/api.js`
2. **React Query** gerencia cache e sincronização
3. **Context API** gerencia estado global (tema, preferências)
4. **Reducers** gerenciam filtros locais
5. **Componentes** se atualizam com os dados

## 🎨 Tema

O projeto suporta tema claro e escuro com variáveis CSS:

```css
:root {
  --primary-color: #4a78e0;
  --secondary-color: #5a6473;
  --background-color: #f4f6fa;
  --text-color: #212529;
}

.app.dark {
  --background-color: #0f1419;
  --text-color: #e8eaed;
  /* ... mais cores */
}
```

Mude o tema clicando no botão de tema no header.

## 🔐 Autenticação

Atualmente, a aplicação funciona sem autenticação. O utilizador pode:
- Definir seu nome nas configurações
- Escolher a moeda preferida

Para adicionar autenticação no futuro:
1. Implemente login/registro
2. Salve tokens no localStorage
3. Adicione headers de autorização nas requisições

## 📱 Responsivo

A aplicação é otimizada para:
- Desktop (1920px+)
- Laptop (1200px - 1920px)
- Tablet (768px - 1200px)
- Mobile (320px - 768px)

## 🐛 Debugging

### Ferramentas Recomendadas

- **React Developer Tools** (Chrome/Firefox extension)
- **Redux DevTools** (para debugging de state)
- **Network tab** do navegador

### Comandos Úteis

```bash
# Lint do código (ESLint)
npm run lint

# Verificar erros
npm run check

# Limpar node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Push o código para GitHub
2. Conecte o repositório ao Vercel
3. Vercel detectará Vite automaticamente
4. Configure variáveis de ambiente para API

### Netlify

```bash
npm run build
# Faça upload da pasta dist/
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📚 Endpoints da API

A aplicação consome os seguintes endpoints:

```
GET    /api/transactions         # Listar transações
POST   /api/transactions         # Criar transação
DELETE /api/transactions/:id     # Remover transação

GET    /api/categories           # Listar categorias
GET    /api/categories/:slug/icon # Ícone de categoria
```

## 🎓 Aprendizados

Este projeto demonstra:
- ✅ Componentização em React
- ✅ Gerenciamento de estado com Context + Reducers
- ✅ Integração com APIs REST
- ✅ Caching e sincronização com React Query
- ✅ Tema dinâmico com CSS variables
- ✅ Roteamento com React Router
- ✅ Formulários controlados
- ✅ Busca e filtros em tempo real
- ✅ Responsividade e acessibilidade

## 📝 Licença

Projeto educacional - Módulo 6 do Curso UpSkill

## 👨‍💻 Autor

Desenvolvido como projeto final do módulo de Front-End Developer

## 🔗 Links Úteis

- [Documentação React](https://react.dev)
- [Documentação Vite](https://vitejs.dev)
- [React Query Docs](https://tanstack.com/query/latest)
- [React Router Docs](https://reactrouter.com)