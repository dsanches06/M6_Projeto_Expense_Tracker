# 💰 Expense Tracker API

API simples para o projeto **Expense Tracker** do curso de React.

Utiliza um ficheiro JSON como base de dados — sem necessidade de instalar nada extra!

---

## 🚀 Como começar

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar em modo desenvolvimento (reinicia automaticamente ao guardar)
npm run dev

# 3. Ou iniciar em modo normal
npm start
```

O servidor inicia em **http://localhost:3001**

---

## 📡 Endpoints

### Transações

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/transactions` | Listar todas as transações |
| `GET` | `/api/transactions/:id` | Obter uma transação pelo ID |
| `POST` | `/api/transactions` | Criar uma nova transação |
| `PUT` | `/api/transactions/:id` | Atualizar uma transação |
| `DELETE` | `/api/transactions/:id` | Eliminar uma transação |

### Categorias

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/categories` | Listar todas as categorias |
| `GET` | `/api/categories/:slug` | Obter uma categoria |
| `GET` | `/api/categories/:slug/icon` | Obter o ícone SVG |

---

## 📝 Exemplos

### Criar uma transação (POST /api/transactions)

```json
{
  "description": "Almoço no restaurante",
  "amount": -12.50,
  "category": "restaurantes",
  "date": "2024-03-15"
}
```

> 💡 **Convenção:** `amount` negativo = despesa, `amount` positivo = receita

**Resposta (201):**
```json
{
  "id": "a3f2c1d4-...",
  "description": "Almoço no restaurante",
  "amount": -12.50,
  "category": "restaurantes",
  "type": "expense",
  "date": "2024-03-15",
  "createdAt": "2024-03-15T10:30:00.000Z"
}
```

---

### Listar todas as transações (GET /api/transactions)

```json
[
  {
    "id": "a3f2c1d4-...",
    "description": "Almoço no restaurante",
    "amount": -12.50,
    "category": "restaurantes",
    "type": "expense",
    "date": "2024-03-15",
    "createdAt": "..."
  }
]
```

---

### Listar categorias (GET /api/categories)

```json
[
  {
    "slug": "alimentacao",
    "label": "Alimentação",
    "labelEn": "Food & Dining",
    "color": "#F97316",
    "iconUrl": "/api/categories/alimentacao/icon"
  },
  ...
]
```

---

### Usar ícones no React

```jsx
// Opção 1: usar diretamente como <img>
<img src="http://localhost:3001/api/categories/alimentacao/icon" alt="Alimentação" />

// Opção 2: buscar a lista de categorias e usar o iconUrl
const [categories, setCategories] = useState([]);

useEffect(() => {
  fetch("http://localhost:3001/api/categories")
    .then(res => res.json())
    .then(data => setCategories(data));
}, []);

return (
  <select>
    {categories.map(cat => (
      <option key={cat.slug} value={cat.slug}>
        {cat.label}
      </option>
    ))}
  </select>
);
```

---

## 🏷️ Categorias disponíveis

| Slug | Label | Cor |
|------|-------|-----|
| `alimentacao` | Alimentação | 🟠 |
| `transporte` | Transporte | 🔵 |
| `saude` | Saúde | 🔴 |
| `bem-estar` | Bem-estar | 🟣 |
| `habitacao` | Habitação | 🟢 |
| `lazer` | Lazer | 🟡 |
| `compras` | Compras | 🩷 |
| `educacao` | Educação | 🔵 |
| `tecnologia` | Tecnologia | 🟣 |
| `viagens` | Viagens | 🟢 |
| `restaurantes` | Restaurantes | 🟠 |
| `outro` | Outro | ⚫ |

---

## 📁 Estrutura do projeto

```
expense-api/
├── server.js              # Entrada principal
├── data/
│   ├── db.js              # Funções de leitura/escrita no JSON
│   ├── categories.js      # Categorias e ícones SVG
│   └── transactions.json  # Base de dados (criado automaticamente)
└── routes/
    ├── transactions.js    # Rotas CRUD das transações
    └── categories.js      # Rotas das categorias
```

---

## 🛠️ Onde estão os dados?

Os dados ficam guardados em `data/transactions.json`. Podes abrir esse ficheiro para ver as tuas transações — é apenas JSON normal!
