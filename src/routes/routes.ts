import {
  logsDispatcher,
  registerLogClient,
  syncLog,
  heartBeatRegister,
  registerLog
} from "../handlers";
import { authStatus } from "../middlewares";

export async function routes(fastify, options) {
  fastify.post("/register", registerLogClient);
  fastify.post("/sync", { beforeHandler: [authStatus] }, syncLog);
  fastify.post("/logs", { beforeHandler: [authStatus] }, logsDispatcher);
  fastify.post("/register-error", { beforeHandler: [authStatus] }, registerLog);
  fastify.get("/8707458299/incoming-heartbeat", heartBeatRegister);
}
