import fastify, { FastifyInstance } from "fastify";
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { userRoutes } from "./routes/user.routes";
import { contactRoutes } from "./routes/contact.routes";

const app: FastifyInstance = fastify({
  logger: true,
});

app.register(swagger, {
  openapi: {
    info: {
      title: 'Agenda API',
      description: 'Documentação da API de contatos e usuários',
      version: '1.0.0',
    },
    servers: [
      { url: 'http://localhost:3100', description: 'Local server' },
      { url: 'http://0.0.0.0:3100', description: 'Docker server' },
    ],
    tags: [
      { name: 'users', description: 'Operações relacionadas a usuários' },
      { name: 'contacts', description: 'Operações relacionadas a contatos' },
    ],
  },
});

app.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list', 
    deepLinking: true,    
  },
  theme: {
    title: "Agenda API Docs",
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