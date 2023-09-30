import * as fs from "fs";
const path = require("node:path");

import * as dotenv from "dotenv";
dotenv.config();

import { routes } from "./routes";
import Fastify from "fastify";
import { clerkClient, clerkPlugin, getAuth } from "@clerk/fastify";
import fastifyStatic from "@fastify/static";

interface IQuerystring {
  username: string;
  password: string;
}

interface IReply {
  200: { success: boolean };
  302: { url: string };
  "4xx": { error: string };
}

const fastify = Fastify();
fastify.register(clerkPlugin);
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/", // optional: default '/'
  constraints: {}, // optional: default {}
});

fastify.register(routes, { prefix: "/api" });

fastify.get("/", async (req, reply) => {
  const indexPage = fs.readFileSync(
    path.join(__dirname, "public", "index.html")
  );
  reply.type("text/html");
  reply.send(indexPage);
});

fastify.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
