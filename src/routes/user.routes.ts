import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/user.interface";

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();
 fastify.post<{ Body: UserCreate }>("/", {
    schema: {
      tags: ["users"],
      summary: "Cria um novo usuário",
      description: "Cadastra um novo usuário no sistema (email deve ser único)",
      body: {
        type: "object",
        required: ["name", "email"],
        properties: {
          name: { 
            type: "string", 
            examples: [{
              value: "Carlos Silva",
              description: "Nome completo do usuário"
            }]
          },
          email: { 
            type: "string", 
            format: "email",
            examples: [{
              value: "carlos@empresa.com",
              description: "Email válido e único"
            }]
          }
        }
      },
      response: {
        201: {
          description: "Usuário criado com sucesso",
          type: "object",
          properties: {
            id: { 
              type: "string", 
              examples: [{
                value: "550e8400-e29b-41d4-a716-446655440000"
              }]
            },
            name: { 
              type: "string", 
              examples: [{
                value: "Carlos Silva"
              }]
            },
            email: { 
              type: "string", 
              examples: [{
                value: "carlos@empresa.com"
              }]
            },
            createdAt: { 
              type: "string", 
              format: "date-time", 
              examples: [{
                value: "2024-05-01T12:00:00Z"
              }]
            }
          }
        },
        400: {
          description: "Erro na requisição",
          type: "object",
          properties: {
            error: { 
              type: "string", 
              examples: [{
                value: "Usuário já existente"
              }]
            }
          }
        }
      }
    }
    }, async (req, reply) => {
    const { name, email } = req.body;
    try {
      const data = await userUseCase.create({
        name,
        email,
      });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

    fastify.get("/", {
    schema: {
      tags: ["users"],
      summary: "Health check",
      description: "Rota simples para testar se a API está funcionando",
      response: {
        200: {
          description: 'Mensagem de saúde',
          type: 'string',
          examples: [{
            value: 'hello world'
          }]
        }
      }
    }
  }, (req, reply) => {
    reply.send("hello world");
  });
}
