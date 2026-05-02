# 🗄️ Migração de Categorias para Neon

Este script migra todas as categorias do arquivo `api/src/data/categories.js` para o banco de dados Neon PostgreSQL.

## 📋 Categorias Incluídas

### Despesas (12 categorias):
- Alimentação
- Transporte
- Saúde
- Bem-estar
- Habitação
- Lazer
- Compras
- Educação
- Tecnologia
- Viagens
- Restaurantes
- Entretenimento
- Outros

### Receitas (10 categorias):
- Salário
- Vendas
- Investimentos
- Freelance
- Reembolso
- Cashback
- Aluguel
- Presentes
- Outros

## 🚀 Como Executar

### Pré-requisitos:
1. Ter o Node.js instalado
2. Configurar a variável `DATABASE_URL` no arquivo `.env.local`
3. Instalar dependências: `npm install`

### Executar migração:
```bash
npm run migrate
```

## 📊 Estrutura da Tabela

A migração cria/usa a tabela `categories` com a seguinte estrutura:
- `slug` (TEXT, PRIMARY KEY) - Identificador único
- `name` (TEXT, NOT NULL) - Nome da categoria em português
- `icon_name` (TEXT) - Nome do ícone (atualmente usa o slug)
- `color` (TEXT) - Cor da categoria em hexadecimal

## ✅ Status

✅ Migração executada com sucesso - 22 categorias inseridas no banco Neon.