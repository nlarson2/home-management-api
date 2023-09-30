import fs from "fs";
import path from "path";

import fastify, { FastifyInstance, FastifyPluginOptions } from "fastify";
import fastifyStatic from "@fastify/static";

import { userRoutes } from "./user";

const routes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any
) => {
  //register all api routes here
  fastify.register(userRoutes, { prefix: "user" });

  done();
};

export { routes };
