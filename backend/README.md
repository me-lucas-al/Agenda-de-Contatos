## 🔗 Endpoints da API

### Usuários
- `POST /users` → Cadastrar novo usuário
- `POST /users/login` → Login por e-mail

### Contatos (necessário header: email)
- `GET /contacts` → Listar todos os contatos
- `POST /contacts` → Criar novo contato
- `PUT /contacts/:id` → Atualizar contato existente
- `DELETE /contacts/:id` → Deletar contato

### 📖 Documentação Swagger
A API possui documentação interativa completa com Swagger UI, onde você pode:
- Visualizar todos os endpoints disponíveis
- Testar as rotas diretamente no navegador
- Ver exemplos de requisições e respostas
- Entender a estrutura dos dados

**Acesse em:** [http://localhost:3100/docs](http://localhost:3100/docs)