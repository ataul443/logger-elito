import { logsDispatcher, registerLogClient, syncLog } from "../handlers";
import { authStatus } from "../middlewares";

export async function routes(fastify, options) {
  fastify.post("/register", registerLogClient);
  fastify.post("/sync", { beforeHandler: [authStatus] }, syncLog);
  fastify.post("/logs", logsDispatcher);
}
