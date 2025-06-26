import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreateSchema, UserResponseSchema } from "../schemas/user.schema";
import { z } from "zod";


export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();

  fastify.post(
    "/",
    {
      schema: {
        summary: "Cria um novo usuário",
        tags: ["Usuários"],
        body: UserCreateSchema,
        response: {
          200: UserResponseSchema,
        },
      },
    },
    async (req, reply): Promise<void> => {
      const body = req.body as z.infer<typeof UserCreateSchema>;
      const result = await userUseCase.create(body);
      reply.send(result);
    }
  );

  fastify.get("/", {
    schema: {
      summary: "Ping de rota de usuários",
      tags: ["Usuários"],
      response: {
        200: z.literal("route users running"),
      },
    },
    handler: async (_, reply) => {
      reply.send("route users running");
    },
  });
}

