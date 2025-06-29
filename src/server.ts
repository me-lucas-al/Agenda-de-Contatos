import fastify, { FastifyInstance } from "fastify";
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import fastifyCors from "@fastify/cors";
import { userRoutes } from "./routes/user.routes";
import { contactRoutes } from "./routes/contact.routes";

const app = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

app.register(cors);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors,{ origin: '*' })
app.register(swagger, {
  openapi: {
    info: {
      title: "Agenda API",
      description: "Documentação da API de contatos e usuários",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});
app.register(swaggerUI, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: 'list', 
    deepLinking: true,    
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
});

app.register(contactRoutes, { prefix: "/contacts" });
app.register(userRoutes, { prefix: "/users" });

const start = async () => {
  try {
    await app.listen({ port: 3100, host: '0.0.0.0' });
    console.log("🚀 Server running at http://localhost:3100");
    console.log("📚 Swagger docs at http://localhost:3100/docs");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();