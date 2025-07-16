# 🚀 Star Seg Challenge - Agenda de Contatos

Uma aplicação Full Stack moderna para gerenciamento de contatos com autenticação de usuários, preenchimento automático de endereços via CEP e interface responsiva.

## 🧪 Tecnologias Utilizadas

### Frontend
- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend
- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [Prisma ORM](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [Axios](https://axios-http.com/)
- [Docker](https://www.docker.com/)

## ✨ Funcionalidades

### Para Usuários
- ✅ Cadastro e login com autenticação por e-mail
- ✅ Gerenciamento completo de contatos (criar, editar, excluir, visualizar)
- ✅ Filtro e pesquisa em tempo real
- ✅ Preenchimento automático de endereço via CEP
- ✅ Dark mode para conforto visual
- ✅ Interface moderna e responsiva

### Para Desenvolvedores
- ✅ API REST completa com documentação Swagger
- ✅ CRUD de contatos com validações
- ✅ Autenticação via contexto (e-mail salvo localmente)
- ✅ Banco de dados MySQL com ORM Prisma
- ✅ Containerização Docker para facilitar execução

## 📋 Pré-requisitos

### Para execução SEM Docker
- Node.js (versão 18 ou superior)
- MySQL instalado e rodando
- Git

### Para execução COM Docker (Recomendado)
- Node.js (versão 18 ou superior)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado e rodando

## 📁 Estrutura do Projeto

```
star-seg-challenge/
├── backend/           # API REST (Fastify + Prisma + MySQL)
│   ├── src/
│   ├── prisma/
│   └── .env
├── frontend/          # Aplicação Web (Next.js + Tailwind)
│   ├── src/
│   └── public/
└── README.md
```

## 🔗 Endpoints da API

### Usuários
- `POST /users` → Cadastrar novo usuário
- `POST /users/login` → Login por e-mail

### Contatos (necessário header: email)
- `GET /contacts` → Listar todos os contatos
- `POST /contacts` → Criar novo contato
- `PUT /contacts/:id` → Atualizar contato existente
- `DELETE /contacts/:id` → Deletar contato

## ⚙️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/star-seg-challenge.git
cd star-seg-challenge
```

### 2. Instale as dependências

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd ../backend
npm install
```

### 3. Configure o ambiente

Copie o arquivo de exemplo e configure as variáveis de ambiente:

```bash
cp backend/.env.example backend/.env
```

Edite o arquivo `.env` com suas configurações:

#### Para execução SEM Docker:
```env
DATABASE_URL="mysql://SEU_USUARIO:SUA_SENHA@localhost:3306/agenda"
```

#### Para execução COM Docker:
```env
DATABASE_URL="mysql://SEU_USUARIO:SUA_SENHA@host.docker.internal:3306/agenda"
```

### 4. Prepare o banco de dados

#### Sem Docker:
1. Crie o banco de dados no MySQL:
```sql
CREATE DATABASE agenda;
USE agenda;
```

2. Execute as migrações:
```bash
cd backend
npx prisma migrate dev
```

#### Com Docker:
1. Certifique-se que o Docker Desktop está rodando
2. Execute as migrações:
```bash
cd backend
npx prisma migrate dev
```

3. Construa a imagem Docker:
```bash
docker build -t agenda-api .
```

## 🚀 Como Executar

### Opção 1: Com Docker (Recomendado)

1. **Inicie o backend:**
```bash
cd backend
docker run -d \
  --name agenda-api-container \
  -p 3100:3100 \
  --env-file .env \
  agenda-api
```

2. **Inicie o frontend (em outro terminal):**
```bash
cd frontend
npm run dev
```

### Opção 2: Sem Docker

1. **Inicie o backend:**
```bash
cd backend
npm run dev
```

2. **Inicie o frontend (em outro terminal):**
```bash
cd frontend
npm run dev
```

## 🌐 URLs de Acesso

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:3100](http://localhost:3100)
- **Documentação Swagger:** [http://localhost:3100/docs](http://localhost:3100/docs)
