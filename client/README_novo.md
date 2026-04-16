# Documentação do Cliente (React)

## App.jsx
Componente raiz. Monta a hierarquia de providers: `QueryClientProvider` (React Query) > `ThemeProvider` (tema) > `PreferencesProvider` (moeda/nome) > `BrowserRouter` (rotas). Define as rotas da app e usa lazy loading para Dashboard, History e Statistics.

## main.jsx
Ponto de entrada. Liga o React ao HTML — encontra o `<div id="root">` e renderiza `<App />` dentro de `StrictMode`.

---

## Componentes

| Componente | O que faz |
|---|---|
| **CategoryFilter** | Mostra botões (pills) de categorias agrupados por despesas/receitas. Ao clicar, filtra as transações no Dashboard. |
| **DateRangePicker** | Dois inputs de data (início/fim) que filtram transações por intervalo de datas no Dashboard. |
| **Summary** | Renderiza 3 Cards lado a lado — saldo, receitas e despesas — com valores formatados na moeda selecionada. |

## Componentes UI

| Componente | O que faz |
|---|---|
| **Card** | Card reutilizável que mostra um ícone (emoji), título e valor. Usado pelo Summary. |
| **ModalConfirm** | Modal de confirmação ao apagar transação. Tem overlay escuro, botão cancelar e botão apagar. Carregado com lazy loading. |
| **RecentTransactions** | Mostra transações recentes em cards coloridos (verde/vermelho). Ordena por data, mostra categoria, ícone e valor formatado. |
| **TransactionListCard** | Div wrapper simples com classe scrollable. Usado pelo RecentTransactions e History. |
| **TrophySpin** | Animação de loading (troféu giratório). Adapta cores ao tema dark/light. |

---

## Páginas

| Página | O que faz |
|---|---|
| **DashBoard** | Página principal. Usa `useReducer` para filtros (datas + categoria). Mostra saudação, Summary, filtros e transações recentes. |
| **AddTransaction** | Formulário para criar transação (descrição, valor, tipo, categoria, data). Faz POST via `useMutation` e redireciona ao Dashboard. |
| **History** | Tabela com todas as transações. Tem pesquisa por texto, filtro por tipo, ordenação por colunas e eliminação com modal de confirmação. |
| **Statistics** | 4 gráficos Chart.js — barras (por dia da semana), doughnut (despesas por categoria), pie (receitas por categoria), linha (evolução do saldo). Converte moedas e adapta cores ao tema. |
| **Settings** | Permite alterar tema (dark/light), moeda (EUR/USD/GBP) e nome do utilizador. Tudo persistido no localStorage via contextos. |
| **MainLayout** | Layout que envolve todas as páginas. Contém sidebar com navegação, botão hamburger (mobile), toggle de tema e `<Outlet />` onde as páginas renderizam. |

---

## Contextos

| Contexto | O que faz |
|---|---|
| **ThemeContext** | Gere o tema (`"light"` / `"dark"`). Fornece `theme` e `toggleTheme`. Persiste no localStorage. Exporta o hook `useTheme()`. |
| **PreferencesContext** | Gere `currency` (EUR/USD/GBP) e `userName`. Fornece valores + setters. Persiste no localStorage. |

---

## Reducer

| Reducer | O que faz |
|---|---|
| **filtersReducer** | Gere os filtros do Dashboard com 3 ações: `SET_DATE_RANGE` (muda datas), `SET_CATEGORY` (muda categoria ativa), `RESET` (repõe para mês atual). Estado: `{ startDate, endDate, activeCategory, activeCategoryType }`. |
