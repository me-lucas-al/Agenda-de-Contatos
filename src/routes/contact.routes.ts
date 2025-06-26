import { FastifyInstance } from "fastify";
import { ContactUseCase } from "../usecases/contact.usecase";
import { authMiddleware } from "../middlewares/auth.middleware";
import { z } from "zod";
import { ContactCreateSchema } from "../schemas/contact.schema";

export async function contactRoutes(fastify: FastifyInstance) {
  const contactUseCase = new ContactUseCase();

  fastify.addHook("preHandler", authMiddleware);

  const ContactResponseSchema = ContactCreateSchema.extend({
    id: z.string(),
    userId: z.string(),
  });

  fastify.post(
    "/",
    {
      schema: {
        summary: "Cria um novo contato",
        tags: ["Contatos"],
        body: ContactCreateSchema.omit({ userEmail: true }),
        response: {
          200: ContactResponseSchema,
        },
      },
    },
    async (req, reply): Promise<void> => {
      const body = req.body as z.infer<typeof ContactCreateSchema>;
      const email = req.headers["email"] as string;
      const data = {
        ...body,
        userEmail: email,
      };

      const result = await contactUseCase.create(data);
      return reply.send(result);
    }
  );

  fastify.get(
    "/",
    {
      schema: {
        summary: "Lista contatos",
        tags: ["Contatos"],
        response: {
          200: z.array(ContactResponseSchema),
        },
      },
    },
    async (req, reply) => {
      const email = req.headers["email"];
      if (!email || Array.isArray(email)) {
        return reply.status(400).send({ error: "Cabeçalho 'email' ausente ou inválido" });
      }
      const data = await contactUseCase.listAllContacts(email);
      return reply.send(data);
    }
  );
}
