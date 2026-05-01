# 🔧 Guia de Conexão do Banco de Dados no Vercel

## ❌ Problema
A variável `DATABASE_URL` não está configurada no Vercel. Sem ela, a aplicação não consegue conectar ao banco de dados.

## ✅ Solução - Opção 1: Usar Vercel Postgres (Recomendado)

### 1. Configurar no Painel Vercel
```
1. Acessa: https://vercel.com/dashboard
2. Seleciona o projeto "Expense Tracker"
3. Settings → Storage → Create Database
4. Escolhe "Postgres" 
5. Confirma e aguarda a criação
```

### 2. Copiar Connection String
```
1. No painel, vai a "Storage" → Seu banco Postgres
2. Copia a "Connection String"
3. Vai a Settings → Environment Variables
4. Adiciona nova variável:
   - Nome: DATABASE_URL
   - Valor: [cole a connection string que copiou]
5. Clica "Save"
```

### 3. Fazer Deploy Novamente
```bash
git push  # ou faz redeploy no Vercel
```

---

## ✅ Solução - Opção 2: Usar Supabase (Alternativa Gratuita)

### 1. Criar Banco no Supabase
```
1. Acessa: https://supabase.com
2. Clica "New Project"
3. Escolhe a região mais próxima
4. Aguarda a criação
```

### 2. Copiar Connection String
```
1. Vai a "Settings" → "Database"
2. Procura por "Connection String"
3. Seleciona a opção "URI" (psycopg2)
4. Copia a string completa
```

### 3. Adicionar no Vercel
```
1. https://vercel.com/dashboard
2. Settings → Environment Variables
3. Adiciona:
   - Nome: DATABASE_URL
   - Valor: [connection string do Supabase]
4. Clica "Save"
```

### 4. Deploy
```bash
git push
```

---

## 🔍 Verificar se Funcionou

### Testar via Terminal
```bash
curl https://seu-projeto.vercel.app/api/transactions
```

Deve retornar um JSON com as transações (ou um array vazio).

### Verificar Logs Vercel
```
1. https://vercel.com/dashboard
2. Clica no projeto
3. "Deployments" → Último deployment → "View Logs"
4. Procura por "✅ Conectado ao PostgreSQL"
```

---

## 📝 Arquivo Relevante
- `api/src/data/db.js` - Já está configurado para PostgreSQL
- O código faz automática migração dos dados de `transactions.json` na primeira vez

---

## 🚨 Troubleshooting

### Erro: "DATABASE_URL não está configurada!"
→ Volta aos passos acima e certifica-se que adicionou a variável no Vercel

### Erro: "SSL connection failed"
→ Verifica se a connection string tem `?sslmode=require` no final

### Erro: "Too many connections"
→ Aumenta o `max_connections` no banco Supabase/Vercel Postgres

---

## 💡 Resumo Rápido

| O que fazer | Onde fazer |
|-----------|-----------|
| Criar banco PostgreSQL | Vercel Postgres OU Supabase |
| Copiar connection string | Storage/Supabase Settings |
| Configurar DATABASE_URL | Vercel Dashboard → Settings → Env Variables |
| Verificar se funciona | `curl https://seu-projeto.vercel.app/api/transactions` |

