import { FastifyInstance } from "fastify";
import { ContactUseCase } from "../usecases/contact.usecase";
import { Contact, ContactCreate } from "../interfaces/contacts.interface";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function contactRoutes(fastify: FastifyInstance) {
  const contactUseCase = new ContactUseCase();
  fastify.addHook("preHandler", authMiddleware);
  
  fastify.post<{ Body: ContactCreate }>(
    "/",
    {
      schema: {
        tags: ["contacts"],
        summary: "Cria um novo contato",
        description: "Associa um contato ao usuário autenticado (via email no header)",
        headers: {
          type: "object",
          required: ["email"],
          properties: {
            email: {
              type: "string",
              format: "email",
              examples: [{
                value: "usuario_logado@empresa.com",
                description: "Email do usuário logado"
              }]
            },
          },
        },
        body: {
          type: "object",
          required: ["name", "email", "phone"],
          properties: {
            name: {
              type: "string",
              examples: [{
                value: "Maria Souza",
                description: "Nome do contato"
              }]
            },
            email: {
              type: "string",
              format: "email",
              examples: [{
                value: "maria@contato.com",
                description: "Email do contato"
              }]
            },
            phone: {
              type: "string",
              examples: [{
                value: "11987654321",
                description: "Telefone com DDD"
              }]
            },
          },
        },
        response: {
          201: {
            description: "Contato criado com sucesso",
            type: "object",
            properties: {
              id: {
                type: "string",
                examples: [{
                  value: "660e8400-e29b-41d4-a716-446655440000"
                }]
              },
              name: { 
                type: "string", 
                examples: [{
                  value: "Maria Souza"
                }]
              },
              email: { 
                type: "string", 
                examples: [{
                  value: "maria@contato.com"
                }]
              },
              phone: { 
                type: "string", 
                examples: [{
                  value: "11987654321"
                }]
              },
              userId: {
                type: "string",
                examples: [{
                  value: "550e8400-e29b-41d4-a716-446655440000"
                }]
              },
            },
          },
          400: {
            description: "Erro na requisição",
            type: "object",
            properties: {
              error: {
                type: "string",
                examples: [{
                  value: "Cabeçalho 'email' ausente ou inválido"
                }]
              },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const { name, email, phone } = req.body;
      const emailUserHeader = req.headers["email"];

      if (!emailUserHeader || Array.isArray(emailUserHeader)) {
        return reply
          .status(400)
          .send({ error: "Cabeçalho 'email' ausente ou inválido" });
      }

      const emailUser = emailUserHeader as string;

      try {
        const data = await contactUseCase.create({
          email,
          name,
          phone,
          userEmail: emailUser,
        });
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.get(
    "/",
    {
      schema: {
        tags: ["contacts"],
        summary: "Lista todos os contatos",
        description: "Retorna os contatos do usuário autenticado",
        headers: {
          type: "object",
          required: ["email"],
          properties: {
            email: {
              type: "string",
              format: "email",
              examples: [{
                value: "usuario_logado@empresa.com",
                description: "Email do usuário logado"
              }]
            },
          },
        },
        response: {
          200: {
            description: "Lista de contatos",
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  examples: [{
                    value: "660e8400-e29b-41d4-a716-446655440000"
                  }]
                },
                name: { 
                  type: "string", 
                  examples: [{
                    value: "Maria Souza"
                  }]
                },
                email: { 
                  type: "string", 
                  examples: [{
                    value: "maria@contato.com"
                  }]
                },
                phone: { 
                  type: "string", 
                  examples: [{
                    value: "11987654321"
                  }]
                },
              },
            },
          },
          404: {
            description: "Usuário não encontrado",
            type: "object",
            properties: {
              error: {
                type: "string",
                examples: [{
                  value: "User not found"
                }]
              },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const emailUserHeader = req.headers["email"];

      if (!emailUserHeader || Array.isArray(emailUserHeader)) {
        return reply
          .status(400)
          .send({ error: "Cabeçalho 'email' ausente ou inválido" });
      }

      const emailUser = emailUserHeader as string;

      try {
        const data = await contactUseCase.listAllContacts(emailUser);
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.put<{ Body: Contact; Params: { id: string } }>(
    "/:id",
    {
      schema: {
        tags: ["contacts"],
        summary: "Atualiza um contato",
        description: "Edita os dados de um contato existente",
        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: {
              type: "string",
              examples: [{
                value: "660e8400-e29b-41d4-a716-446655440000",
                description: "ID do contato"
              }]
            },
          },
        },
        body: {
          type: "object",
          required: ["name", "email", "phone"],
          properties: {
            name: { 
              type: "string", 
              examples: [{
                value: "Maria Souza Costa"
              }]
            },
            email: {
              type: "string",
              format: "email",
              examples: [{
                value: "maria.nova@contato.com"
              }]
            },
            phone: { 
              type: "string", 
              examples: [{
                value: "11999998888"
              }]
            },
          },
        },
        response: {
          200: {
            description: "Contato atualizado",
            type: "object",
            properties: {
              id: {
                type: "string",
                examples: [{
                  value: "660e8400-e29b-41d4-a716-446655440000"
                }]
              },
              name: { 
                type: "string", 
                examples: [{
                  value: "Maria Souza Costa"
                }]
              },
              email: { 
                type: "string", 
                examples: [{
                  value: "maria.nova@contato.com"
                }]
              },
              phone: { 
                type: "string", 
                examples: [{
                  value: "11999998888"
                }]
              },
            },
          },
          404: {
            description: "Contato não encontrado",
            type: "object",
            properties: {
              error: {
                type: "string",
                examples: [{
                  value: "Contact not found"
                }]
              },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params;
      const { name, email, phone } = req.body;
      try {
        const data = await contactUseCase.updateContact({
          id,
          name,
          email,
          phone,
        });
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>(
    "/:id",
    {
      schema: {
        tags: ["contacts"],
        summary: "Remove um contato",
        description: "Deleta um contato existente",
        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: {
              type: "string",
              examples: [{
                value: "660e8400-e29b-41d4-a716-446655440000",
                description: "ID do contato"
              }]
            },
          },
        },
        response: {
          200: {
            description: "Confirmação de exclusão",
            type: "object",
            properties: {
              success: {
                type: "boolean",
                examples: [{
                  value: true
                }]
              },
              message: {
                type: "string",
                examples: [{
                  value: "Contact deleted"
                }]
              },
            },
          },
          404: {
            description: "Contato não encontrado",
            type: "object",
            properties: {
              error: {
                type: "string",
                examples: [{
                  value: "Contact not found"
                }]
              },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params;

      try {
        const data = await contactUseCase.delete(id);
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    }
  );
}