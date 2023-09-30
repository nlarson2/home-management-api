import fastify, { FastifyInstance, FastifyPluginOptions } from "fastify";
import { clerkClient, clerkPlugin, getAuth } from "@clerk/fastify";

const userRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any
) => {
  fastify.get("/get", async (req, reply) => {
    /**
     * Access the auth state for this request.
     * In this example, the userId loads the whole User object
     * from the Clerk servers
     */
    const { userId } = getAuth(req);
    const user = userId ? await clerkClient.users.getUser(userId) : null;
    return { user };
  });

  done();
};

export { userRoutes };
