import Fastify, { FastifyReply, FastifyRequest } from "fastify";

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

// Declare a route
fastify.get(
  "/",
  async function handler(request: FastifyRequest, reply: FastifyReply) {
    return { hello: "world" };
  }
);

fastify.post(
  "/user",
  async function handler(
    request: FastifyRequest<{
      Body: { name: string; age: string };
    }>,
    reply: FastifyReply
  ) {
    const user = request.body;
    return reply.code(201).send(user);
  }
);

// Run the server!
const run = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
run();
