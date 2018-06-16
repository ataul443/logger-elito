"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pino = require("pino");
const pino_redis_1 = require("./pino-redis");
const redisClent_1 = require("./redisClent");
const pinoRedisPipe = pino_redis_1.pinoRedis({
    redisClient: redisClent_1.redis,
    includeLevels: ["fatal", "error"],
    expireDuration: 60 * 60 * 24
});
exports.logger = pino({
    serializers: {
        err: pino.stdSerializers.err,
        fatal: pino.stdSerializers.err
    }
}, pinoRedisPipe);
