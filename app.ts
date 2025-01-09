import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

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

fastify.addSchema({
  $id: "getuser",
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string",
    },
  },
})

fastify.post(
  "/user", {
  schema: {
    body: {
      $ref: "getuser#"
    }
  }
}, async function handler(
  request: FastifyRequest<{
    Body: { name: string; age: string };
  }>,
  reply: FastifyReply
) {
  const user = request.body;
  return reply.code(201).send(user);
}
);

const followers = async (fastify: FastifyInstance) => {
  fastify.get(
    "/",
    async function handler(request: FastifyRequest, reply: FastifyReply) {
      return ["Rolando", "Messi", "Tumon"];
    }
  );

}

fastify.register(followers, { prefix: "/api/getfollowers" })

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
