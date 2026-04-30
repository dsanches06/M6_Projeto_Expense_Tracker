# Publicar Expense Tracker no Vercel

## Passos para Deploy no Vercel

### 1. Criar conta no Vercel (se não tiver)
- Acesse: https://vercel.com
- Faça login com GitHub

### 2. Importar projeto no Vercel
- Clique em "Add New..." → "Project"
- Selecione o repositório `M6_Projeto_Expense_Tracker`
- Clique em "Import"

### 3. Configurar variáveis de ambiente
Na página de configuração do Vercel, adicione as variáveis necessárias:

```
VITE_API_URL=http://localhost:3001
```

Você pode deixar em branco ou adicionar a URL completa quando souber qual será.

### 4. Build Configuration
- **Framework Preset**: Vite
- **Build Command**: `cd client && npm install && npm run build`
- **Output Directory**: `client/dist`
- **Install Command**: `npm install`

### 5. Deploy
- Clique em "Deploy"
- Aguarde o build finalizar (2-5 minutos)

### 6. Acessar o projeto
- Após o deploy, você receberá uma URL como: `https://seu-projeto.vercel.app`

## Variáveis de Ambiente Importantes

Para o cliente React (VITE):
```
VITE_API_URL=https://sua-api.com
```

## Troubleshooting

**Build fail**: Verifique se todas as dependências estão em `package.json`
**404 ao acessar rotas**: O `vercel.json` está configurado para rotas SPA

## Links Úteis
- Dashboard Vercel: https://vercel.com/dashboard
- Documentação: https://vercel.com/docs
