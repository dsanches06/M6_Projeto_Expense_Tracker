# 🔧 Fix: Configurar Neon/PostgreSQL no Vercel

## ❌ Problema
A aplicação não consegue conectar ao banco de dados no Vercel porque a variável de ambiente `DATABASE_URL` não está configurada.

---

## ✅ Solução: Configurar Banco de Dados

### Opção 1️⃣: Usar Neon (Recomendado - Gratuito)

#### Passo 1: Criar Banco no Neon
```
1. Acede a https://console.neon.tech (ou faz login)
2. Clica "New Project"
3. Escolhe a região mais próxima
4. Aguarda a criação (leva ~1 minuto)
```

#### Passo 2: Copiar Connection String
```
1. No painel Neon, clica no projeto
2. Vai a "Connection details" (canto superior direito)
3. Seleciona o role "postgres" ou o que quiseres usar
4. Copia a "Connection string" (começa com postgresql://)
5. IMPORTANTE: A string já vem com ?sslmode=require (é preciso)
```

#### Passo 3: Adicionar no Vercel
```
1. Acede a https://vercel.com/dashboard
2. Clica no projeto "Expense Tracker"
3. Settings → Environment Variables
4. Clica "Add Variable"
5. Nome: DATABASE_URL
6. Valor: [Cola a connection string do Neon]
7. Clica "Save"
8. Clica "Redeploy"
```

#### Passo 4: Verificar Logs
```
1. Volta a https://vercel.com/dashboard
2. Clica no projeto
3. "Deployments" → Clica no deployment mais recente
4. "View Logs"
5. Procura por "✅ Conectado ao PostgreSQL"
```

---

### Opção 2️⃣: Usar Vercel Postgres

#### Passo 1: Criar Banco no Vercel
```
1. https://vercel.com/dashboard
2. Clica no projeto
3. Settings → Storage
4. Clica "Create Database"
5. Escolhe "Postgres"
6. Confirma
```

#### Passo 2: Copiar Connection String
```
1. Settings → Storage → Seu banco Postgres
2. Clica em ".env.local"
3. Copia o valor de DATABASE_URL (a linha completa da URL)
```

#### Passo 3: Adicionar Variável
```
1. Settings → Environment Variables
2. Add Variable: DATABASE_URL = [o valor que copiaste]
3. Clica "Save"
4. Clica "Redeploy"
```

---

### Opção 3️⃣: Usar Supabase

#### Passo 1: Criar Banco no Supabase
```
1. Acede a https://supabase.com
2. Clica "New Project"
3. Escolhe a região
4. Aguarda a criação
```

#### Passo 2: Copiar Connection String
```
1. Project Settings → Database → Connection String
2. Seleciona "URI (psycopg2)"
3. Copia a string
```

#### Passo 3: Adicionar no Vercel
```
1. https://vercel.com/dashboard → Projeto
2. Settings → Environment Variables
3. DATABASE_URL = [string do Supabase]
4. Save → Redeploy
```

---

## 🧪 Testar a Conexão

### Test 1: Via Terminal
```bash
curl https://seu-dominio-vercel.vercel.app/api/transactions
```
Deve retornar um JSON com as transações.

### Test 2: Verificar Logs Vercel
```
1. https://vercel.com/dashboard
2. Clica no projeto → "Deployments"
3. Último deployment → "View Logs"
4. Procura por:
   - "✅ Conectado ao PostgreSQL" (sucesso)
   - Ou erros de conexão se houver
```

### Test 3: No Dashboard da Aplicação
```
1. Acede a https://seu-dominio-vercel.vercel.app
2. Tenta criar uma transação
3. Se funcionar, a BD está conectada ✅
```

---

## 🛠️ Desenvolvimento Local

### Passo 1: Configurar .env local
```bash
# Na pasta api/, copia .env.example para .env
cp api/.env.example api/.env

# Edita api/.env e adiciona:
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
```

### Passo 2: Instalar Dependências
```bash
cd api
npm install
cd ..
```

### Passo 3: Executar
```bash
# Terminal 1: API
cd api && npm run dev

# Terminal 2: Client
cd client && npm run dev
```

---

## 🚨 Troubleshooting

### ❌ Erro: "ECONNREFUSED" ou "connect timeout"
**Causa:** A conexão ao banco é rejeitada
**Solução:**
- Verifica se a connection string está correta
- Se usas Neon, certifica-se que tem `?sslmode=require` no final
- Se usas Supabase, certifica-se de usar a URI (psycopg2), não a versão JavaScript

### ❌ Erro: "SSL connection failed"
**Causa:** SSL não está ativado
**Solução:**
- Adiciona `?sslmode=require` no final da connection string

### ❌ Erro: "password authentication failed"
**Causa:** Credenciais erradas
**Solução:**
- Copia a connection string novamente (inteira, com a password)

### ❌ Erro: "database does not exist"
**Causa:** Banco não foi criado ou nome errado
**Solução:**
- Verifica se o banco existe no painel (Neon, Supabase, ou Vercel)
- Copia a connection string correta com o nome exato do banco

### ✅ Logs mostram "Conectado ao PostgreSQL" mas API retorna erro
**Causa:** Tabela ainda não foi criada
**Solução:**
- Espera alguns segundos e tenta novamente
- Ou faz Redeploy no Vercel

---

## 📝 Ficheiros Relevantes
- `/api/src/data/db.js` - Conexão PostgreSQL
- `/api/src/routes/transactions.js` - Endpoints de transações
- `/api/.env.example` - Template de variáveis (copia para `.env` local)
- `/vercel.json` - Configuração Vercel

---

## ✨ Próximos Passos (Opcional)
- Configurar backup automático do BD
- Adicionar monitoramento de erros
- Implementar connection pooling avançado
