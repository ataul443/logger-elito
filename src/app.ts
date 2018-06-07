import * as fastify from "fastify";
import * as pino from "pino";
import * as dotenv from "dotenv";
import path = require("path");
import { routes } from "./routes";
import { authStatus } from "./middlewares";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const logger = pino({
  serializers: {
    err: pino.stdSerializers.err,
    fatal: pino.stdSerializers.err
  }
});

const server = fastify({ logger: logger });
server.register(routes);

server
  .ready()
  .then(data => {
    let PORT: any = process.env.PORT || 1337;
    let HOST: any = process.env.HOST || "0.0.0.0";
    server.listen(PORT, HOST, error => {
      if (error) {
        throw error;
      }
      console.log(`Log microservice started at port ${process.env.PORT}...`);
    });
  })
  .catch(e => {
    throw e;
  });
