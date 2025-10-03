# Deploy TimeRight - Netlify

## 🚀 Deploy Frontend (Netlify)

### 1. Preparação
- ✅ `netlify.toml` configurado
- ✅ `.env.production` criado
- ✅ `_redirects` para SPA routing

### 2. Deploy no Netlify
1. Acesse [netlify.com](https://netlify.com)
2. Conecte seu repositório GitHub
3. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** `frontend`

### 3. Variáveis de Ambiente
No painel do Netlify, adicione:
- `VITE_API_BASE_URL` = URL do seu backend

### 4. URL Final
Após deploy: `https://seu-site.netlify.app`

## ⚙️ Deploy Backend (Heroku/Railway)

### Heroku
```bash
# No diretório backend
heroku create timeright-backend
git subtree push --prefix=backend heroku main
```

### Railway
1. Conecte repositório
2. Configure pasta `backend`
3. Variáveis: `DATABASE_URL`, `PORT`

## 🔗 Configuração Final
1. Atualize `.env.production` com URL do backend
2. Redeploy no Netlify
3. Teste todas as funcionalidades