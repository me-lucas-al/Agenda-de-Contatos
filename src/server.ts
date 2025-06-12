import fastify, { FastifyInstance } from "fastify";
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { userRoutes } from "./routes/user.routes";
import { contactRoutes } from "./routes/contact.routes";

const app: FastifyInstance = fastify();

app.register(userRoutes, {
  prefix: "/users",
})
app.register(contactRoutes, {
  prefix: "/contacts",
})


app.listen(
  {
    port: 3100,
  },
  () => console.log("server is running"),
);
