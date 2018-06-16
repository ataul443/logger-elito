"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify = require("fastify");
const pino = require("pino");
const dotenv = require("dotenv");
const path = require("path");
const routes_1 = require("./routes");
if (!process.env.REDIS_URL) {
    dotenv.config({ path: path.join(__dirname, "..", ".env") });
}
const logger = pino({
    serializers: {
        err: pino.stdSerializers.err,
        fatal: pino.stdSerializers.err
    }
});
const server = fastify({ logger: logger });
server.register(routes_1.routes);
server
    .ready()
    .then(data => {
    let PORT = process.env.PORT || 1337;
    let HOST = process.env.HOST || "0.0.0.0";
    server.listen(PORT, HOST, error => {
        if (error) {
            throw error;
        }
        console.log(`Log microservice started at port ${process.env.PORT}...\n`);
    });
})
    .catch(e => {
    throw e;
});
