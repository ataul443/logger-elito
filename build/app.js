"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify = require("fastify");
const pino = require("pino");
const dotenv = require("dotenv");
const path = require("path");
const routes_1 = require("./routes");
dotenv.config({ path: path.join(__dirname, "..", ".env") });
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
    server.listen(PORT, error => {
        if (error) {
            throw error;
        }
        console.log(`Log microservice started at port ${process.env.PORT}...`);
    });
})
    .catch(e => {
    throw e;
});