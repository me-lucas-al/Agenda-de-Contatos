import { FastifyInstance } from "fastify";

export async function contactRoutes(fastify: FastifyInstance) {
  const contactUseCase = new ContactUseCase();
  fastify.post<{ Body: ContactCreate }>("/", async (req, reply) => {
    const { name, email } = req.body;
    try {
      const data = await contactUseCase.create({
        
      });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get("/", (req, reply) => {
    reply.send("hello world");
  });
}
