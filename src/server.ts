import fastify, { FastifyInstance } from "fastify";
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { userRoutes } from "./routes/user.routes";
import { contactRoutes } from "./routes/contact.routes";

const app: FastifyInstance = fastify({
  logger: true,
});

app.register(swagger, {
  swagger: {
    info: {
      title: 'Agenda API',
      description: 'Documentação da API de contatos e usuários',
      version: '1.0.0',
    },
    host: 'localhost:3100',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
});

app.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
});

app.register(userRoutes, { prefix: "/users" });
app.register(contactRoutes, { prefix: "/contacts" });

const start = async () => {
  try {
    await app.listen({ port: 3100 });
    console.log("🚀 Server running at http://localhost:3100");
    console.log("📚 Swagger docs at http://localhost:3100/docs");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
