# 🚀 Star Seg Challenge - Agenda de Contatos
Esta agenda de contatos é uma aplicação Full Stack (frontend + backend) criada para gerenciar contatos de forma completa, incluindo endereços automáticos via CEP, autenticação de usuários e interface moderna.
---
## 🧪 Tecnologias Utilizadas
### 🖥 Frontend
* [Next.js (App Router)](https://nextjs.org/)
* [React](https://react.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
### 🔙 Backend
* [Node.js](https://nodejs.org/)
* [Fastify](https://fastify.dev/)
* [Prisma ORM](https://www.prisma.io/)
* [MySQL](https://www.mysql.com/)
* [Axios](https://axios-http.com/)
* [Docker](https://www.docker.com/)
  
---
## 🧠 Funcionalidades
* ✅ Cadastro e login com autenticação por e-mail
* ✅ Gerenciamento completo de contatos (criar, editar, excluir, visualizar)
* ✅ Filtro e pesquisa em tempo real
* ✅ Dark mode para conforto visual
* ✅ Interface moderna e responsiva

##💻 Para desenvolvedores:

* API REST completa com documentação Swagger
* CRUD de contatos com preenchimento automático de endereço via CEP
* Autenticação  via contexto (e-mail salvo localmente)
* Banco de dados MySQL com ORM Prisma
* Containerização Docker para facilitar execução
---
## 📋 Pré-requisitos
### 💻 Para execução SEM Docker:
* Node.js (versão 18 ou superior)
* MySQL instalado e rodando
* Git
### 🐳 Para execução COM Docker:
* Node.js (versão 18 ou superior)
* Docker Desktop instalado e rodando (https://www.docker.com/products/docker-desktop)
---
## 🚀 Escolha seu método de execução
### 🐳 Opção 1: Com Docker (Recomendado)
* ✅ Não precisa instalar MySQL localmente
* ✅ Ambiente isolado e padronizado
* ✅ Fácil de reproduzir em qualquer máquina
### 💻 Opção 2: Sem Docker (Tradicional)
* ✅ Controle total sobre o ambiente
* ✅ Mais rápido para desenvolvimento
* ❌ Precisa configurar MySQL manualmente
---
## 📁 Estrutura do Projeto
bash
star-seg-challenge/
├── backend/           # API REST (Fastify + Prisma + MySQL)
│   ├── src/
│   ├── prisma/
│   └── .env
├── frontend/          # Aplicação Web (Next.js + Tailwind)
│   ├── src/
│   └── public/
└── README.md

---
## 🔗 Endpoints da API
### Usuários
* POST   /users          → Cadastrar novo usuário
* POST   /users/login    → Login por e-mail
### Contatos (necessário header: email)
* GET    /contacts       → Listar todos os contatos
* POST   /contacts       → Criar novo contato
* PUT    /contacts/:id   → Atualizar contato existente
* DELETE /contacts/:id   → Deletar contato
---
## ⚙ Instalação Completa
### 1. Clone o repositório no terminal do seu Visual Studio Code
bash
git clone https://github.com/seu-usuario/star-seg-challenge.git
cd star-seg-challenge

### 2. Instale dependências
### 📁 Frontend
bash
cd frontend
npm install next react react-dom
npm install -D @eslint/eslintrc @types/node @types/react @types/react-dom autoprefixer eslint eslint-config-next postcss tailwindcss typescript

### 📁 Backend
bash
cd ../backend
npm install @fastify/cors @fastify/swagger @fastify/swagger-ui \
  @prisma/client axios fastify \
  -D @types/node prisma ts-node tsx typescript

### 3. Configure o backend
bash
cp backend/.env.example backend/.env

### Edite o arquivo .env e configure a variável DATABASE_URL com os dados do seu banco MySQL:
### Sem o Docker:
bash
DATABASE_URL="mysql://SEU_USUARIO:SUA_SENHA@localhost:3306/agenda"

Abra o seu MySQL e rode este código: 
bash
CREATE DATABASE agenda;
USE agenda;

### Com o Docker:
bash
DATABASE_URL="mysql://SEU_USUARIO:SUA_SENHA@host.docker.internal:3306/agenda"

Abra o seu app Docker Desktop e deixe rodando
### 4. Rode as migrações
### Sem o Docker:
bash
cd backend
npx prisma migrate dev

### Com o Docker:
bash
cd backend
npx prisma migrate dev
docker build -t agenda-api .

### 5. Inicie o backend
### Sem o Docker:
bash
npm run dev

### Com o Docker:
bash
docker run -d \
  --name agenda-api-container \
  -p 3100:3100 \
  --env-file .env \
  agenda-api

### 6. Em outro terminal, inicie o frontend
bash
cd ../frontend
npm run dev

---
## 🌐 URLs de Acesso
* Frontend: http://localhost:3000
* Backend API: http://localhost:3100
* Documentação Swagger: http://localhost:3100/docs
