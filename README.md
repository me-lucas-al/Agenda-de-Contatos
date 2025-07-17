# 🚀 Star Seg Challenge - Agenda de Contatos

Esta Agenda de Contatos é uma aplicação Full Stack moderna para gerenciamento de contatos com autenticação de usuários, preenchimento automático de endereços via CEP e interface responsiva, que está disponível em [https://agenda-de-contatos-starseg.vercel.app](https://agenda-de-contatos-starseg.vercel.app) !

## 🧪 Tecnologias Utilizadas

### Frontend
- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

### Backend
- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger](https://swagger.io/) (Documentação da API)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/) (Containerização)

## ✨ Funcionalidades

### Para Usuários
- ✅ Cadastro e login com autenticação por e-mail
- ✅ Gerenciamento completo de contatos (criar, editar, excluir, visualizar)
- ✅ Filtro e pesquisa em tempo real
- ✅ Preenchimento automático de endereço via CEP
- ✅ Dark mode para conforto visual
- ✅ Interface moderna e responsiva

### Para Desenvolvedores
- ✅ API REST completa com documentação Swagger interativa
- ✅ CRUD de contatos com validações
- ✅ Autenticação via contexto (e-mail salvo localmente)
- ✅ Banco de dados PostgreSQL com ORM Prisma
- ✅ Containerização Docker para facilitar execução
- ✅ Tipagem completa com TypeScript

## 🚀 Deploy

### Frontend  
A aplicação frontend está hospedada no **Vercel** e pode ser acessada pelo link:  
➡️ [https://agenda-de-contatos-starseg.vercel.app](https://agenda-de-contatos-starseg.vercel.app)

### Backend  
O backend está hospedado no **Render** e está disponível em:  
➡️ [https://agenda-de-contatos.onrender.com](https://agenda-de-contatos.onrender.com)

---

### ⚠️ Importante sobre a hospedagem gratuita do Render

O backend no Render utiliza o plano gratuito, que suspende a aplicação após períodos de inatividade para economizar recursos (modo "sleep"). Isso faz com que a primeira requisição após esse período leve mais tempo para ser processada (cold start).  

Isso pode afetar principalmente funcionalidades que dependem de autenticação, como o login de usuários.  

**Recomendações para o usuário final:**  
- Aguarde alguns segundos na primeira tentativa para o backend "acordar".  
- Caso demore muito, atualize a página e tente novamente.  
- Após o servidor estar "ativo", as requisições seguintes terão resposta rápida normalmente.

---

## 📋 Pré-requisitos

### Para execução SEM Docker
- Node.js (versão 18 ou superior)
- PostgreSQL (versão 12 ou superior)
- pgAdmin4 (para gerenciar o banco)
- Git

### Para execução COM Docker (Recomendado)
- Node.js (versão 18 ou superior)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado e rodando
- Git

## 📁 Estrutura do Projeto

```
agenda-de-contatos/
├── backend/           # API REST (Fastify + Prisma + PostgreSQL)
│   ├── src/
│   ├── prisma/
│   ├── Dockerfile
│   └── .env
├── frontend/          # Aplicação Web (Next.js + Tailwind)
│   ├── src/
│   └── public/
└── README.md
```

## ⚙️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone github.com/me-lucas-al/Agenda-de-Contatos.git
cd agenda-de-contatos # ou abra a pasta agenda-de-contatos
```

### 2. Instale as Dependências

#### Frontend
```bash
cd frontend # ou apenas abra a pasta frontend 
npm install
npm install next react react-dom -D @eslint/eslintrc @types/node @types/react @types/react-dom autoprefixer eslint eslint-config-next postcss tailwindcss typescript
```

#### Backend
```bash
cd backend # ou apenas abra a pasta backend 
npm install
npm install @fastify/cors @fastify/swagger @fastify/swagger-ui @prisma/client axios fastify -D @types/node prisma ts-node tsx typescript
```

**Nota:** O comando `npm install` irá instalar automaticamente todas as dependências listadas no arquivo `package.json` de cada projeto. Todos os comandos podem ser executados diretamente no terminal integrado do VS Code (Ctrl+` ou Ctrl+Shift+`).

## 🐳 Opção 1: Executar COM Docker (Recomendado)

### 1. Instale o Docker Desktop

#### Windows:
1. Baixe o Docker Desktop em: https://www.docker.com/products/docker-desktop
2. Execute o instalador e siga as instruções
3. **Importante:** Abra o Docker Desktop após a instalação

### 2. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend` com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@host.docker.internal:5432/agenda"
PORT=3100
NODE_ENV=development
```

### 3. Build da Imagem Docker

```bash
cd backend # ou apenas abra a pasta backend 
docker build -t agenda .
```

### 4. Execute o Container

```bash
docker run -d --name agenda -p 3100:3100 --env-file .env agenda
```

### 5. Inicie o Frontend

```bash
cd frontend # ou apenas abra a pasta frontend 
npm run dev
```

## 💻 Opção 2: Executar SEM Docker

### 1. Instale o PostgreSQL

#### Windows:
1. Baixe o PostgreSQL em: https://www.postgresql.org/download/windows/
2. Execute o instalador e defina uma senha para o usuário `postgres`
3. Instale o pgAdmin4 (geralmente incluído no instalador)

### 2. Configure o Banco de Dados

1. **Abra o pgAdmin4** e conecte ao servidor PostgreSQL
2. **Crie um novo banco de dados** chamado `agenda`:
   - Clique com botão direito em "Databases"
   - Selecione "Create" → "Database..."
   - Nome: `agenda`
   - Clique em "Save"

### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend` com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/agenda"
PORT=3100
NODE_ENV=development
```

###**Importante:** Substitua `SUA_SENHA` pela senha que você definiu para o usuário `postgres` durante a instalação.

### 4. Inicie o Backend

```bash
cd backend  # ou apenas abra a pasta backend 
npm run dev
```

### 5. Inicie o Frontend (em outro terminal)

```bash
cd frontend # ou apenas abra a pasta frontend
npm run dev
```

## 🌐 URLs de Acesso

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:3100](http://localhost:3100)
- **Documentação Swagger:** [http://localhost:3100/docs](http://localhost:3100/docs)

## 📝 Notas Importantes

### Para Docker:
1. **Docker Desktop:** Certifique-se de que o Docker Desktop está rodando antes de executar comandos Docker
2. **Porta:** O backend roda na porta 3100 e o frontend na porta 3000

### Para execução sem Docker:
1. **PostgreSQL:** Certifique-se de que o serviço PostgreSQL está rodando antes de iniciar a aplicação
2. **pgAdmin4:** Use para gerenciar o banco de dados graficamente

### Geral:
- **Swagger:** Use a documentação interativa para testar a API facilmente
  
## 🐛 Solução de Problemas

### Problemas com Docker

#### "Docker daemon is not running"
- Abra o Docker Desktop
- Aguarde o Docker inicializar completamente

#### "Port already in use"
```bash
# Verificar o que está usando a porta
docker ps
# No Windows (PowerShell): netstat -ano | findstr :3100
# No terminal VS Code: lsof -i :3100

# Parar container se necessário
docker stop agenda-api-container
```

#### "Cannot connect to database"
- Verifique se o arquivo `.env` está correto
- Para Docker, use `host.docker.internal` ao invés de `localhost`

**Dica:** Para comandos Docker no Windows, prefira o terminal integrado do VS Code. Se usar PowerShell, execute o comando `docker run` em uma única linha sem quebras.

### Problemas sem Docker

#### Erro de Conexão com PostgreSQL
- Verifique se o PostgreSQL está rodando
- Confirme se a senha no arquivo `.env` está correta
- Teste a conexão usando pgAdmin4

#### Erro "Port already in use"
- Verifique se já existe algum processo rodando nas portas 3000 ou 3100
- Use `lsof -i :3000` ou `lsof -i :3100` para identificar processos
- Encerre os processos ou altere as portas nos arquivos de configuração

### Problemas Gerais

#### Problemas com Dependências
- Delete as pastas `node_modules` e execute `npm install` novamente
- Certifique-se de estar usando Node.js versão 18 ou superior
